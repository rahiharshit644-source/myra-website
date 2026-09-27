import React, { useState } from "react";
import { FAQ_DATA, FaqItem } from "../data/faqData";
import { ChevronDown, HelpCircle, CheckCircle2 } from "lucide-react";

export const FaqView: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", "Architecture", "Privacy & Security", "Permissions", "Hardware"];

  const filteredFaqs = FAQ_DATA.filter((f) => {
    if (activeCategory === "all") return true;
    return f.category === activeCategory;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
          <span>Technical FAQ</span>
          <span aria-hidden="true">·</span>
          <span>Architectural Insights</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-neutral-400 mt-2 leading-relaxed">
          Direct, technically accurate answers about how MYRA operates under the hood, Android constraints, and security architectures.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1 bg-neutral-900/60 border border-neutral-800 rounded-lg w-fit">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors capitalize ${
              activeCategory === cat
                ? "bg-neutral-800 text-neutral-100 shadow-xs"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            {cat === "all" ? "All Questions" : cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={faq.question}
              className="bg-neutral-900/40 border border-neutral-800 rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 text-sm font-semibold text-neutral-100 hover:text-cyan-400 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform ${
                    isOpen ? "rotate-180 text-cyan-400" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-850">
                  <p>{faq.answer}</p>
                  <div className="mt-3 pt-2 border-t border-neutral-900 text-[10px] font-mono text-neutral-500">
                    Category: {faq.category}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
