"use client";

import { Children, createContext, useContext, useId, useState } from "react";

// Which question is open (only one at a time). Shared by all the items of one FAQ list.
const FaqContext = createContext(null);

// Wraps the questions of one FAQ section
export function FaqList({ children }) {
  const [openId, setOpenId] = useState(null);
  return (
    <FaqContext.Provider value={{ openId, setOpenId }}>
      <div className="mt-4 space-y-3">{children}</div>
    </FaqContext.Provider>
  );
}

// One question. It gets two children: the question first, the answer second.
export function FaqItem({ children }) {
  const [question, answer] = Children.toArray(children);
  const id = useId();
  const { openId, setOpenId } = useContext(FaqContext);
  const open = openId === id;

  return (
    <div
      className={`rounded-lg border bg-white transition-[border-color,box-shadow] duration-500 ${
        open ? "border-accent/40 shadow-md" : "border-ink/10"
      }`}
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpenId(open ? null : id)}
          className={`flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3 text-left font-semibold transition-colors duration-300 hover:text-accent ${
            open ? "text-accent" : "text-ink"
          }`}
        >
          <span>{question}</span>
          <svg
            className={`h-4 w-4 shrink-0 text-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "rotate-180" : ""
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 9l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </h3>

      {/* Smooth open / close: a grid row can animate from 0fr (closed) to 1fr (the height of the answer),
          which plain "height: auto" cannot do. The answer also fades in.
          inert = while closed, the links inside the answer cannot be reached with the keyboard. */}
      <div
        id={id}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{answer}</div>
      </div>
    </div>
  );
}
