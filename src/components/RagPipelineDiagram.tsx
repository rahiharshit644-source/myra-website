import React, { useState } from "react";
import { FileText, Split, Database, Search, Sparkles, ArrowRight, Code, Image as ImageIcon, Archive } from "lucide-react";

export const RagPipelineDiagram: React.FC = () => {
  const [activeParser, setActiveParser] = useState<"pdf" | "code" | "text" | "image" | "zip">("code");

  const parserInfo = {
    pdf: {
      name: "PdfDocumentParser",
      target: ".pdf documents",
      details: "Extracts stream text, preserves headings and tabular figures while removing formatting noise.",
    },
    code: {
      name: "CodeDocumentParser",
      target: ".kt, .py, .java, .js, .ts source code",
      details: "Extracts class hierarchies, method signatures, imports, and docstrings for code-symbol search.",
    },
    text: {
      name: "TextDocumentParser",
      target: ".md, .txt, .csv notes & logs",
      details: "Cleans markdown headers, list markers, and CSV columns into contextual prose chunks.",
    },
    image: {
      name: "ImageVisionParser",
      target: ".png, .jpg, .webp diagrams & photos",
      details: "Invokes Gemini Vision to generate factual textual descriptions and scene summaries for indexing.",
    },
    zip: {
      name: "ZipArchiveParser",
      target: ".zip archives",
      details: "Safely decompresses authorized archive bundles and dispatches inner files to target parsers.",
    },
  };

  return (
    <div className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 lg:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <h3 className="text-xl font-semibold text-neutral-100">
            Local RAG Knowledge Engine Pipeline
          </h3>
          <p className="text-sm text-neutral-400 mt-1">
            How authorized documents are parsed, split, indexed, and retrieved as ground truth for MYRA.
          </p>
        </div>
        <span className="text-xs font-mono text-neutral-400 bg-neutral-950 border border-neutral-800 px-3 py-1 rounded">
          Storage Access Framework (SAF)
        </span>
      </div>

      {/* Parser Selection Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-neutral-950 rounded-lg border border-neutral-850 mt-6 overflow-x-auto">
        <button
          onClick={() => setActiveParser("code")}
          className={`py-1.5 px-3 text-xs font-medium rounded transition-colors whitespace-nowrap ${
            activeParser === "code"
              ? "bg-neutral-800 text-neutral-100 shadow-xs"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          CodeDocumentParser
        </button>
        <button
          onClick={() => setActiveParser("pdf")}
          className={`py-1.5 px-3 text-xs font-medium rounded transition-colors whitespace-nowrap ${
            activeParser === "pdf"
              ? "bg-neutral-800 text-neutral-100 shadow-xs"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          PdfDocumentParser
        </button>
        <button
          onClick={() => setActiveParser("text")}
          className={`py-1.5 px-3 text-xs font-medium rounded transition-colors whitespace-nowrap ${
            activeParser === "text"
              ? "bg-neutral-800 text-neutral-100 shadow-xs"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          TextDocumentParser
        </button>
        <button
          onClick={() => setActiveParser("image")}
          className={`py-1.5 px-3 text-xs font-medium rounded transition-colors whitespace-nowrap ${
            activeParser === "image"
              ? "bg-neutral-800 text-neutral-100 shadow-xs"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          ImageVisionParser
        </button>
        <button
          onClick={() => setActiveParser("zip")}
          className={`py-1.5 px-3 text-xs font-medium rounded transition-colors whitespace-nowrap ${
            activeParser === "zip"
              ? "bg-neutral-800 text-neutral-100 shadow-xs"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          ZipArchiveParser
        </button>
      </div>

      {/* 5-Stage Visual Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 my-6">
        {/* Stage 1: Document */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-neutral-500 uppercase">01. Source File</span>
            <h4 className="text-sm font-semibold text-neutral-200 mt-1">
              SAF Authorized
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              User picks file via system picker. Persistable URI granted.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-neutral-900 text-[10px] font-mono text-neutral-500">
            DocumentFile URI
          </div>
        </div>

        {/* Stage 2: Parser */}
        <div className="bg-neutral-950 border border-cyan-900/60 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase">02. Selected Parser</span>
            <h4 className="text-sm font-semibold text-cyan-300 mt-1">
              {parserInfo[activeParser].name}
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              {parserInfo[activeParser].details}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-neutral-900 text-[10px] font-mono text-cyan-400/80 truncate">
            {parserInfo[activeParser].target}
          </div>
        </div>

        {/* Stage 3: Splitter */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-blue-400 uppercase">03. Chunk Split</span>
            <h4 className="text-sm font-semibold text-neutral-200 mt-1">
              Recursive Splitter
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              Divides into 512-token chunks with 64-token semantic boundary overlap.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-neutral-900 text-[10px] font-mono text-neutral-500">
            List&lt;KnowledgeChunk&gt;
          </div>
        </div>

        {/* Stage 4: Index & Search */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-purple-400 uppercase">04. Local DB Search</span>
            <h4 className="text-sm font-semibold text-neutral-200 mt-1">
              KnowledgeDatabase
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              Room SQLite full-text & keyword indexing. Queries top-3 relevant chunks.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-neutral-900 text-[10px] font-mono text-neutral-500">
            Top-k Context Match
          </div>
        </div>

        {/* Stage 5: Generation */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase">05. Generation</span>
            <h4 className="text-sm font-semibold text-emerald-300 mt-1">
              Orchestrator Context
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              Retrieved chunks injected into Gemini reasoning prompt for verified answers.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-neutral-900 text-[10px] font-mono text-emerald-400/80">
            Grounded AI Output
          </div>
        </div>
      </div>
    </div>
  );
};
