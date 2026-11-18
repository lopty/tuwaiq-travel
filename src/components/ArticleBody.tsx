export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  /** Optional checklist shown after the paragraphs. */
  list?: string[];
}

/**
 * Long-form article layout: a comfortable reading width, generous space between
 * sections and paragraphs, and one consistent heading size, so text reads calmly.
 */
export function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="max-w-[68ch] space-y-12 sm:space-y-14">
      {sections.map((sec) => (
        <section key={sec.heading}>
          <h2 className="text-[22px] sm:text-[26px] font-semibold tracking-[-0.02em] leading-[1.25] text-[#111318]">
            {sec.heading}
          </h2>
          <div className="mt-4 space-y-5 text-[16px] sm:text-[17px] leading-[1.8] text-[#2F3440]">
            {sec.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {sec.list && sec.list.length > 0 && (
            <ul className="mt-5 space-y-3">
              {sec.list.map((item) => (
                <li key={item} className="flex gap-3 text-[16px] sm:text-[17px] leading-[1.7] text-[#2F3440]">
                  <span className="mt-[11px] w-1.5 h-1.5 rounded-full bg-[#C31A20] shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
