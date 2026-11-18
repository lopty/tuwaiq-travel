# Website leads: setup (about 5 minutes)

Both websites (tuwaiq.ae and albaselrealestate.ae) save every enquiry into **one Google Sheet** that you own.
There is no server and no new account: it runs on your Google account, free.

## How it works

1. A visitor clicks **Book**, **Request a quote**, **Enquire** or any **WhatsApp** button.
2. A short form asks only for **name and phone** (required) and **email** (optional).
3. The details are saved as a new row in the Google Sheet with the date and time, the service or car they chose, the button they clicked and the page.
4. "Book" buttons then let the visitor choose **WhatsApp or a call**. WhatsApp buttons open WhatsApp straight away, with the visitor's name in the message.
5. You and your team see the leads in:
   - **The Google Sheet itself** (filter, sort, File > Download > Microsoft Excel), or
   - **The admin page**: `https://tuwaiq.ae/admin/leads/` or `https://albaselrealestate.ae/admin/leads/` (password login, filters, status, salesperson, notes, Download Excel).

Phone (tel:) links are not blocked. Visitors who prefer to call can still call directly.

## One-time setup

1. Go to <https://sheets.google.com> with the Google account that should own the leads. Create a blank spreadsheet and name it **Website Leads**.
2. In the sheet, open **Extensions > Apps Script**.
3. Delete everything in `Code.gs` and paste the whole content of `docs/leads-apps-script.gs`. Click **Save**.
4. Click the gear icon (**Project Settings**):
   - Set **Time zone** to `(GMT+04:00) Dubai`.
   - Under **Script properties**, click **Add script property**: name `ADMIN_PASSWORD`, value a strong password (at least 10 characters). This is the password for the admin page. Share it only with people who should see leads.
5. Click **Deploy > New deployment**. Select type **Web app**:
   - Description: `Website leads`
   - Execute as: **Me**
   - Who has access: **Anyone** (this is what lets the websites send leads; nobody can read leads without the password)
   - Click **Deploy**, then **Authorize access** and allow it with your Google account. (Google may say the app is unverified because you wrote it yourself. Click **Advanced > Go to project**.)
6. Copy the **Web app URL**. It looks like `https://script.google.com/macros/s/AKfy.../exec`.
7. Paste that URL into `endpoint: ''` in **both** files:
   - `tuwaiq-travel/public/leads/config.js`
   - `abre2/public/leads/config.js`
8. Rebuild and deploy both sites. Send yourself a test enquiry from each site and check the **Leads** tab in the sheet.

The **Leads** tab, its headers and filter are created automatically on the first enquiry.

## Day to day

- **Statuses:** New, Contacted, Follow up, Booked / Closed, Not interested, Spam. Change them in the admin page or directly in the sheet.
- **Salesperson:** type the name in the admin page. The filter then lets you see each person's leads, or the ones still "Not assigned".
- **Checking a salesperson:** search the customer's name or the last digits of their phone in the admin page to see when they enquired, about what, and the current status.
- **Excel:** "Download Excel" exports exactly the rows you have filtered.
- **Sharing with the team:** give them the admin page link and password, or share the Google Sheet with their Google account (Share button). Sharing the sheet gives full access, so use the admin page for salespeople.

## Changing the script later

After editing the script, use **Deploy > Manage deployments > Edit (pencil) > Version: New version > Deploy**. The URL stays the same, so the websites do not need to change.

## Changing the password

Edit `ADMIN_PASSWORD` in Script properties. It takes effect immediately; anyone signed in is asked to sign in again.
