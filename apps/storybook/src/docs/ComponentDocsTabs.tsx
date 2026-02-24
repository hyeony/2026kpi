import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { extractSection } from "./parseChangelog";

interface ComponentDocsTabsProps {
  raw: string;
}

const TABS = ["Changelog", "API"] as const;
type Tab = (typeof TABS)[number];

export function ComponentDocsTabs({ raw }: ComponentDocsTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Changelog");

  const content = extractSection(raw, activeTab);

  return (
    <div style={{ padding: "32px", maxWidth: "800px", fontFamily: "sans-serif", lineHeight: "1.6" }}>
      <div style={{ display: "flex", gap: "0", marginBottom: "24px", borderBottom: "2px solid #e2e8f0" }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 20px",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? "#3b82f6" : "#64748b",
              borderBottom: activeTab === tab ? "2px solid #3b82f6" : "2px solid transparent",
              marginBottom: "-2px",
              transition: "color 0.15s, border-color 0.15s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || `*${activeTab} 섹션이 없습니다.*`}</ReactMarkdown>
      </div>
    </div>
  );
}
