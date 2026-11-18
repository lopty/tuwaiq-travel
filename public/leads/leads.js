/*
 * Lead capture for static sites (shared by tuwaiq.ae and albaselrealestate.ae).
 *
 * Any WhatsApp link on the page first opens a short form (name and phone required).
 * The details are saved as a row in the Google Sheet (via its Apps Script web app), then WhatsApp opens with the
 * visitor's details in the message. Phone links (tel:) are left alone.
 *
 * Settings come from /leads/config.js (window.SITE_LEADS).
 * The form asks only for name, phone (required) and email. The clicked button's text, the service
 * and the date are recorded automatically. "Book" buttons (choose: true) then offer WhatsApp or a call;
 * WhatsApp buttons go straight to WhatsApp.
 * Public API: window.SiteLeads.open({ subject, waText, source, details, choose })
 *             window.SiteLeads.capture(fields, { waText, source }) to save without the form.
 */
(function () {
  'use strict';
  var C = window.SITE_LEADS || {};
  var CONTACT_KEY = 'site-leads-contact';
  var QUEUE_KEY = 'site-leads-queue';
  var SENT_KEY = 'site-leads-sent';
  var ATTR_KEY = 'site-leads-attribution';
  // Google Apps Script web app URL.
  var configured = /^https:\/\/script\.google\.com\//.test(C.endpoint || '');

  function store(kind) {
    try { return window[kind]; } catch (e) { return null; }
  }
  function readJson(kind, key, fallback) {
    var s = store(kind);
    if (!s) return fallback;
    try { var v = JSON.parse(s.getItem(key)); return v == null ? fallback : v; } catch (e) { return fallback; }
  }
  function writeJson(kind, key, value) {
    var s = store(kind);
    if (!s) return;
    try { s.setItem(key, JSON.stringify(value)); } catch (e) { /* storage full or blocked */ }
  }
  function clean(value, max) {
    return String(value == null ? '' : value).replace(/\s+/g, ' ').trim().slice(0, max || 300);
  }
  function cleanMultiline(value, max) {
    return String(value == null ? '' : value).replace(/\r/g, '').trim().slice(0, max || 2000);
  }

  // Remember where the visitor first came from in this browser session.
  (function rememberAttribution() {
    if (readJson('sessionStorage', ATTR_KEY, null)) return;
    var params = new URLSearchParams(location.search);
    var referrerHost = '';
    try { referrerHost = document.referrer ? new URL(document.referrer).hostname : ''; } catch (e) { referrerHost = ''; }
    if (referrerHost === location.hostname) referrerHost = '';
    var bits = ['utm_source', 'utm_medium', 'utm_campaign']
      .map(function (k) { return params.get(k); })
      .filter(Boolean);
    if (params.get('gclid')) bits.push('google-ads');
    if (params.get('fbclid')) bits.push('facebook');
    var channel = bits.length ? bits.join(' / ') : (referrerHost || 'direct');
    writeJson('sessionStorage', ATTR_KEY, { channel: clean(channel, 200), landing: clean(location.pathname, 300) });
  })();

  // ---------- Saving ----------
  function sendLead(record) {
    if (!configured) return Promise.reject(new Error('Lead storage is not configured'));
    // Google Apps Script web app. text/plain + no-cors avoids a CORS preflight; the row is written
    // when the request arrives, so the opaque response is enough. keepalive lets it finish while
    // the visitor moves on to WhatsApp. The script ignores repeated client_ref values.
    return fetch(C.endpoint, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'add', lead: record })
    }).then(function () { /* opaque response: delivered */ });
  }

  function saveLead(record) {
    if (!configured) {
      if (window.console) console.warn('[SiteLeads] No Google Sheet endpoint in /leads/config.js. Lead not stored.', record);
      return;
    }
    var queue = readJson('localStorage', QUEUE_KEY, []);
    queue.push(record);
    writeJson('localStorage', QUEUE_KEY, queue.slice(-20));
    sendLead(record).then(function () {
      var q = readJson('localStorage', QUEUE_KEY, []).filter(function (r) { return r.client_ref !== record.client_ref; });
      writeJson('localStorage', QUEUE_KEY, q);
    }).catch(function () { /* kept in the queue and retried on the next page view */ });
  }

  // Retry any lead that could not be sent earlier (for example, the connection dropped).
  function flushQueue() {
    if (!configured) return;
    var queue = readJson('localStorage', QUEUE_KEY, []);
    queue.forEach(function (record) {
      sendLead(record).then(function () {
        var q = readJson('localStorage', QUEUE_KEY, []).filter(function (r) { return r.client_ref !== record.client_ref; });
        writeJson('localStorage', QUEUE_KEY, q);
      }).catch(function () { /* still offline: try again on the next page view */ });
    });
  }

  function makeRef() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  // Skip saving the same phone + enquiry twice within 30 minutes (double clicks, back button).
  function isDuplicate(phone, subject) {
    var key = phone.replace(/\D/g, '') + '|' + subject;
    var sent = readJson('localStorage', SENT_KEY, {});
    var now = Date.now();
    Object.keys(sent).forEach(function (k) { if (now - sent[k] > 30 * 60 * 1000) delete sent[k]; });
    var dup = Boolean(sent[key]);
    sent[key] = now;
    writeJson('localStorage', SENT_KEY, sent);
    return dup;
  }

  function buildRecord(f, source) {
    var attr = readJson('sessionStorage', ATTR_KEY, {}) || {};
    return {
      client_ref: makeRef(),
      site: C.site,
      name: clean(f.name, 100),
      phone: clean(f.phone, 30),
      email: clean(f.email, 200) || null,
      subject: clean(f.subject, 300) || null,
      interest: clean(f.interest, 100) || null,
      timeframe: clean(f.timeframe, 120) || null,
      travellers: clean(f.travellers, 100) || null,
      budget: clean(f.budget, 100) || null,
      notes: cleanMultiline(f.notes, 2000) || null,
      page_url: clean(location.origin + location.pathname, 500),
      page_title: clean(document.title, 300),
      source: clean(source || 'whatsapp-link', 60),
      channel: clean(attr.channel, 200) || null,
      landing_page: clean(attr.landing, 300) || null
    };
  }

  function waUrl(text) {
    return 'https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent(text);
  }

  function composeMessage(f, waText) {
    var base = waText || (C.greeting || 'Hi, I am from your website.') + (f.subject ? '\nI would like to enquire about: ' + f.subject : '');
    var lines = [base, '', 'Name: ' + f.name];
    var labels = fieldLabels();
    ['interest', 'timeframe', 'travellers', 'budget', 'notes'].forEach(function (k) {
      var v = clean(f[k], 400);
      if (v && base.indexOf(v) === -1) lines.push(labels[k] + ': ' + v);
    });
    return lines.join('\n');
  }

  function fieldLabels() {
    return C.kind === 'realestate'
      ? { interest: 'Looking to', timeframe: 'Timeframe', travellers: 'Party', budget: 'Budget', notes: 'Notes' }
      : { interest: 'Planning', timeframe: 'Dates', travellers: 'Travellers', budget: 'Budget', notes: 'Notes' };
  }

  function openWhatsApp(url) {
    // No 'noopener' feature here: with it, window.open returns null and we could not detect a blocked pop-up.
    var win = window.open(url, '_blank');
    if (win) { try { win.opener = null; } catch (e) { /* ignore */ } }
    else location.href = url;
  }

  // Save without showing the form (for forms that already ask for name and phone).
  function capture(fields, opts) {
    opts = opts || {};
    var f = Object.assign({}, fields);
    f.name = clean(f.name, 100);
    f.phone = clean(f.phone, 30);
    writeJson('localStorage', CONTACT_KEY, { name: f.name, phone: f.phone, email: clean(f.email, 200) });
    if (!isDuplicate(f.phone, clean(f.subject, 300))) saveLead(buildRecord(f, opts.source || 'contact-form'));
    if (opts.openWhatsApp !== false) openWhatsApp(waUrl(composeMessage(f, opts.waText)));
  }

  // ---------- Form dialog ----------
  var dialog, form, state = {};

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') node.textContent = attrs[k];
      else if (k === 'html') node.innerHTML = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function field(id, label, input, hint) {
    return el('div', { class: 'sl-field' }, [
      el('label', { for: id, text: label }),
      input,
      hint ? el('small', { class: 'sl-hint', text: hint }) : null
    ]);
  }

  function buildDialog() {
    var realEstate = C.kind === 'realestate';
    dialog = el('dialog', { class: 'sl-dialog', 'aria-labelledby': 'sl-title' });
    form = el('form', { class: 'sl-form', novalidate: '' });

    var closeBtn = el('button', { type: 'button', class: 'sl-close', 'aria-label': 'Close' });
    closeBtn.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
    closeBtn.addEventListener('click', function () { dialog.close(); });

    var trap = el('input', { type: 'text', name: 'company_website', tabindex: '-1', autocomplete: 'off', 'aria-hidden': 'true', class: 'sl-trap' });

    var privacy = el('p', { class: 'sl-privacy' });
    privacy.innerHTML = 'We keep these details so our team can follow up on your enquiry. We do not sell or share them.' +
      (C.privacyUrl ? ' <a href="' + C.privacyUrl + '">Privacy</a>' : '');

    form.append(
      el('span', { class: 'sl-eyebrow', text: realEstate ? 'SPEAK WITH OUR PROPERTY TEAM' : 'YOUR NEXT TRIP STARTS HERE' }),
      el('h2', { id: 'sl-title', text: realEstate ? 'A few details first.' : 'Your details, please.' }),
      el('div', { class: 'sl-subject', hidden: '' }, [el('span', { text: realEstate ? 'Your enquiry' : 'You selected' }), el('strong', { 'data-sl-subject': '' })]),
      field('sl-name', 'Your name', el('input', { id: 'sl-name', name: 'name', type: 'text', required: '', minlength: '2', maxlength: '100', autocomplete: 'name' })),
      field('sl-phone', 'Phone number', el('input', { id: 'sl-phone', name: 'phone', type: 'tel', required: '', maxlength: '30', autocomplete: 'tel', inputmode: 'tel' })),
      field('sl-email', 'Email (optional)', el('input', { id: 'sl-email', name: 'email', type: 'email', maxlength: '200', autocomplete: 'email' })),
      trap,
      el('p', { class: 'sl-error', role: 'alert', hidden: '' }),
      el('button', { type: 'submit', class: 'sl-submit', 'data-sl-submit': '' }),
      privacy
    );

    var arrow = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var done = el('div', { class: 'sl-done', hidden: '' }, [
      el('span', { class: 'sl-eyebrow', text: 'THANK YOU' }),
      el('h2', { 'data-sl-thanks': '' }),
      el('p', { 'data-sl-done-text': '' }),
      el('a', { class: 'sl-submit', 'data-sl-wa': '', target: '_blank', rel: 'noopener', html: '<span>Continue on WhatsApp</span>' + arrow }),
      el('a', { class: 'sl-choice', 'data-sl-tel': '', href: 'tel:' + (C.phoneTel || ''), html: '<span>Call us on <strong>' + (C.phoneDisplay || '') + '</strong></span>' + arrow }),
      el('button', { type: 'button', class: 'sl-link', text: 'Close', 'data-sl-close': '' })
    ]);
    done.querySelector('[data-sl-close]').addEventListener('click', function () { dialog.close(); });
    // The WhatsApp choice must not be re-intercepted by the link handler below.
    done.querySelector('[data-sl-wa]').setAttribute('data-lead-skip', '');

    dialog.append(closeBtn, form, done);
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    form.addEventListener('submit', onSubmit);
    document.body.appendChild(dialog);
  }

  function showError(message) {
    var box = form.querySelector('.sl-error');
    box.textContent = message;
    box.hidden = !message;
  }

  function onSubmit(e) {
    e.preventDefault();
    var data = new FormData(form);
    if (data.get('company_website')) { dialog.close(); return; } // bot
    // Only name, phone and email are asked. Anything a page already knows (dates or notes from a
    // quote form) is passed along through state.details.
    var d = state.details || {};
    var f = {
      name: clean(data.get('name'), 100),
      phone: clean(data.get('phone'), 30),
      email: clean(data.get('email'), 200),
      timeframe: clean(d.timeframe, 120),
      travellers: clean(d.travellers, 100),
      interest: clean(d.interest, 100),
      budget: clean(d.budget, 100),
      notes: cleanMultiline(d.notes, 2000),
      subject: state.subject
    };
    if (f.name.length < 2) { showError('Please enter your name.'); form.querySelector('#sl-name').focus(); return; }
    if (f.phone.replace(/\D/g, '').length < 7 || !/^[+0-9 ()\-.]+$/.test(f.phone)) {
      showError('Please enter a valid phone number, including the country code.');
      form.querySelector('#sl-phone').focus();
      return;
    }
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) { showError('Please check your email address.'); form.querySelector('#sl-email').focus(); return; }
    showError('');

    writeJson('localStorage', CONTACT_KEY, { name: f.name, phone: f.phone, email: f.email });
    if (!isDuplicate(f.phone, clean(f.subject, 300))) saveLead(buildRecord(f, state.source));

    var url = waUrl(composeMessage(f, state.waText));
    var done = dialog.querySelector('.sl-done');
    var tel = done.querySelector('[data-sl-tel]');
    var waBtn = done.querySelector('[data-sl-wa]');
    waBtn.setAttribute('href', url);
    done.querySelector('[data-sl-thanks]').textContent = 'Thank you, ' + f.name.split(' ')[0] + '.';

    if (state.choose) {
      // "Book" buttons: the visitor picks how to continue.
      done.querySelector('[data-sl-done-text]').textContent = 'How would you like to continue? Your details are already with our team.';
      waBtn.querySelector('span').textContent = 'Continue on WhatsApp';
      tel.hidden = false;
    } else {
      // WhatsApp buttons: go straight to WhatsApp.
      openWhatsApp(url);
      done.querySelector('[data-sl-done-text]').textContent = 'WhatsApp has opened with your details. Press send there and our team will reply shortly.';
      waBtn.querySelector('span').textContent = 'Open WhatsApp again';
      tel.hidden = true;
    }
    form.hidden = true;
    done.hidden = false;
  }

  function open(opts) {
    opts = opts || {};
    if (!dialog) buildDialog();
    state = {
      subject: clean(opts.subject, 300),
      waText: opts.waText || '',
      source: opts.source || 'WhatsApp button',
      details: opts.details || {},
      choose: Boolean(opts.choose)
    };
    form.reset();
    form.querySelector('[data-sl-submit]').innerHTML = '<span>' + (state.choose ? 'Continue' : 'Continue to WhatsApp') +
      '</span><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    form.hidden = false;
    dialog.querySelector('.sl-done').hidden = true;
    showError('');

    var subjectBox = form.querySelector('.sl-subject');
    subjectBox.hidden = !state.subject;
    form.querySelector('[data-sl-subject]').textContent = state.subject;

    var saved = readJson('localStorage', CONTACT_KEY, {}) || {};
    ['name', 'phone', 'email'].forEach(function (k) { if (saved[k]) form.elements[k].value = saved[k]; });

    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    var first = saved.name ? (saved.phone ? form.querySelector('.sl-submit') : form.elements.phone) : form.elements.name;
    if (first && window.matchMedia('(pointer: fine)').matches) first.focus();
  }

  // ---------- Intercept WhatsApp links ----------
  function subjectFromText(text) {
    var m = /(?:enquire about:?|enquire about)\s*(.+?)(?:\.\s*$|\n|$)/i.exec(text || '');
    if (m) return m[1].trim();
    var p = /Planning:\s*(.+)/i.exec(text || '');
    return p ? p[1].trim() : '';
  }

  // The visible text of the button that was clicked, so the sheet shows which button it was.
  function buttonLabel(node, fallback) {
    var t = clean(node.getAttribute('aria-label') || node.textContent, 60);
    return t || fallback;
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href*="wa.me/"], a[href*="api.whatsapp.com/"]');
    if (!a || a.hasAttribute('data-lead-skip') || a.closest('.sl-dialog')) return;
    e.preventDefault();

    var text = '';
    try { text = new URL(a.href).searchParams.get('text') || ''; } catch (err) { text = ''; }
    var ds = a.dataset || {};
    var parent = a.closest('dialog');
    if (parent && parent.open) parent.close();
    open({
      subject: ds.leadSubject || subjectFromText(text),
      waText: text,
      source: ds.leadSource || buttonLabel(a, 'WhatsApp button'),
      details: {
        timeframe: ds.leadTimeframe || '',
        travellers: ds.leadTravellers || '',
        interest: ds.leadInterest || '',
        budget: ds.leadBudget || '',
        notes: ds.leadNotes || ''
      }
    });
  });

  // Buttons can open the form directly: <button data-lead-open data-lead-subject="...">
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-lead-open]');
    if (!b) return;
    e.preventDefault();
    var parent = b.closest('dialog');
    if (parent && parent.open) parent.close();
    open({ subject: b.getAttribute('data-lead-subject') || '', source: b.getAttribute('data-lead-source') || buttonLabel(b, 'Book button'), choose: true });
  });

  window.SiteLeads = { open: open, capture: capture, configured: configured };
  if (document.readyState === 'complete') flushQueue();
  else window.addEventListener('load', flushQueue);
})();
