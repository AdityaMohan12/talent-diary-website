"use client";

import { useState, type CSSProperties } from "react";
import {
  CATEGORIES,
  ENTRIES,
  category,
  type CategoryKey,
} from "@/components/site/diaries/entries";
import { CardArt, Star } from "@/components/site/diaries/doodles";

type Filter = CategoryKey | "all";

export function DiariesHub() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? ENTRIES : ENTRIES.filter((e) => e.category === filter);

  return (
    <>
      <section className="section wrap" id="latest">
        <div className="hub-head">
          <div>
            <span className="eyebrow">
              <span className="tri" />
              The archive
            </span>
            <h2>Latest entries</h2>
          </div>
          <p className="hub-dek">
            Field notes from inside startup hiring. Written by operators, for the people
            doing the hiring.
          </p>
        </div>

        <div className="filters" role="tablist" aria-label="Filter entries by section">
          <button
            role="tab"
            aria-selected={filter === "all"}
            className={`chip${filter === "all" ? " is-on" : ""}`}
            onClick={() => setFilter("all")}
          >
            All entries
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              role="tab"
              aria-selected={filter === c.key}
              className={`chip${filter === c.key ? " is-on" : ""}`}
              style={{ "--chip": c.tint, "--chip-ink": c.ink } as CSSProperties}
              onClick={() => setFilter(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <p className="hub-empty">No entries in this section yet. New pages are written every week.</p>
        ) : (
          <ul className="entry-list">
            {shown.map((e, i) => {
              const cat = category(e.category);
              return (
                <li key={e.id}>
                  <article className="entry">
                    <div
                      className="entry__thumb"
                      style={{ "--chip": cat.tint } as CSSProperties}
                    >
                      <CardArt name={e.art} />
                    </div>
                    <div className="entry__body">
                      <span
                        className="entry__cat"
                        style={{ "--chip": cat.tint, "--chip-ink": cat.ink } as CSSProperties}
                      >
                        {cat.label}
                      </span>
                      <h3>
                        <a href="#entry">{e.title}</a>
                      </h3>
                      <p>{e.excerpt}</p>
                      <div className="entry__meta">
                        <span>{e.readMins} min read</span>
                        <span className="entry__dot" />
                        <span>{e.date}</span>
                        <a className="entry__read" href="#entry">
                          Read entry
                        </a>
                      </div>
                    </div>
                    {e.note && i % 2 === 0 ? (
                      <span className="entry__note" aria-hidden>
                        <Star />
                        {e.note}
                      </span>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <Subscribe />
    </>
  );
}

function Subscribe() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="subscribe">
      <div className="wrap subscribe__inner">
        <div className="subscribe__copy">
          <h2>
            Stories, insights and hiring lessons,
            <br />
            straight to your inbox.
          </h2>
          <p>One considered email a week. No noise, unsubscribe whenever.</p>
        </div>
        {done ? (
          <p className="subscribe__done" role="status">
            You are on the list. The next entry lands in your inbox soon.
          </p>
        ) : (
          <form
            className="subscribe__form"
            onSubmit={(ev) => {
              ev.preventDefault();
              if (email.trim()) setDone(true);
            }}
          >
            <label className="sr-only" htmlFor="sub-email">
              Email address
            </label>
            <input
              id="sub-email"
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <button type="submit" className="btn btn-on-blue">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
