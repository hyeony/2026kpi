import React, { useState } from "react";
import { TopPrompt, PromptFile, PromptListItem } from "@hnineds/core";

const sectionStyle: React.CSSProperties = {
  padding: "24px",
  marginBottom: "24px",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#9ca3af",
  marginBottom: "8px",
};

const logStyle: React.CSSProperties = {
  marginTop: "12px",
  fontSize: "12px",
  color: "#6b7280",
  background: "#f9fafb",
  padding: "10px",
  borderRadius: "6px",
};

const RECOMMENDATIONS: PromptListItem[] = [
  { id: "r1", content: "React에서 상태 관리를 어떻게 하나요?" },
  { id: "r2", content: "TypeScript와 JavaScript의 차이점은?" },
  { id: "r3", content: "CSS-in-JS 방식의 장단점을 알려주세요." },
];

const SEARCH_RESULTS: PromptListItem[] = [
  { id: "s1", content: "React 공식 문서 — Getting Started" },
  { id: "s2", content: "TypeScript Deep Dive — 한국어 번역본" },
];

const MOCK_FILES: PromptFile[] = [
  { id: "f1", name: "report.pdf", status: "normal", size: 204800 },
  {
    id: "f2",
    name: "screenshot.png",
    status: "normal",
    thumbUrl: "https://placehold.co/80x80/e0e7ff/818cf8?text=IMG",
  },
];

// ── 섹션 1: 기본 ───────────────────────────────────────────────────────────
function BasicSection() {
  const [value, setValue] = useState("");
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) =>
    setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 4)]);

  return (
    <section style={sectionStyle}>
      <h2>TopPrompt — 기본</h2>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "12px" }}>
        Enter로 전송 · Shift+Enter로 줄바꿈 · + 버튼으로 파일 첨부 메뉴
      </p>
      <TopPrompt
        value={value}
        onChange={setValue}
        onSend={(v) => {
          addLog(`전송: "${v}"`);
          setValue("");
        }}
      />
      {log.length > 0 && <pre style={logStyle}>{log.join("\n")}</pre>}
    </section>
  );
}

// ── 섹션 2: responding 상태 ────────────────────────────────────────────────
function RespondingSection() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"default" | "responding">("default");

  const handleSend = (v: string) => {
    setStatus("responding");
    setTimeout(() => {
      setStatus("default");
      setValue("");
    }, 2500);
    console.log("전송:", v);
  };

  return (
    <section style={sectionStyle}>
      <h2>TopPrompt — responding 상태</h2>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "12px" }}>
        전송 시 2.5초간 로딩 아이콘으로 전환됩니다.
      </p>
      <TopPrompt
        value={value}
        onChange={setValue}
        onSend={handleSend}
        status={status}
        placeholder="메시지를 보내면 responding 상태로 전환됩니다..."
      />
    </section>
  );
}

// ── 섹션 3: 로고 + 검색 중 스피너 ─────────────────────────────────────────
function LogoSection() {
  const [value, setValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSend = (v: string) => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 2000);
    console.log("전송:", v);
    setValue("");
  };

  return (
    <section style={sectionStyle}>
      <h2>TopPrompt — 로고 & 검색 중 스피너</h2>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "4px" }}>
        <code>logoIcon</code>으로 커스텀 로고를 넣고, <code>isSearching=true</code>일 때 테두리 스피너가 표시됩니다.
      </p>
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <button
          onClick={() => setIsSearching((v) => !v)}
          style={{ padding: "4px 12px", borderRadius: "4px", border: "1px solid #d1d5db", cursor: "pointer", fontSize: "13px" }}
        >
          isSearching: {isSearching ? "true ✓" : "false"}
        </button>
      </div>
      <TopPrompt
        value={value}
        onChange={setValue}
        onSend={handleSend}
        isSearching={isSearching}
        logoIcon={<span style={{ fontSize: "20px" }}>🤖</span>}
        logoTooltip="AI 에이전트 로고"
      />
    </section>
  );
}

// ── 섹션 4: 추천/검색결과 드롭다운 ────────────────────────────────────────
function ListOverlaySection() {
  const [value, setValue] = useState("");

  return (
    <section style={{ ...sectionStyle, paddingBottom: "180px" }}>
      <h2>TopPrompt — 추천 & 검색결과 드롭다운</h2>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "4px" }}>
        입력창 포커스 시 + 값이 없으면 추천 목록, 값이 있으면 검색결과가 하향 전개됩니다.
      </p>
      <p style={labelStyle}>클릭하면 텍스트가 입력창으로 복사됩니다.</p>
      <TopPrompt
        value={value}
        onChange={setValue}
        onSend={(v) => { setValue(""); console.log("전송:", v); }}
        recommendations={RECOMMENDATIONS}
        searchResults={SEARCH_RESULTS}
        onRecommendationClick={(item) => console.log("추천 클릭:", item.content)}
        onSearchResultClick={(item) => console.log("검색결과 클릭:", item.content)}
      />
    </section>
  );
}

// ── 섹션 5: 파일 첨부 ─────────────────────────────────────────────────────
function FileSection() {
  const [value, setValue] = useState("");
  const [files, setFiles] = useState<PromptFile[]>(MOCK_FILES);

  const handleFileDelete = (id: string) =>
    setFiles((prev) => prev.filter((f) => f.id !== id));

  const handleFileUpload = (fileList: FileList) => {
    const newFiles: PromptFile[] = Array.from(fileList).map((f) => ({
      id: `${Date.now()}-${f.name}`,
      name: f.name,
      status: "normal" as const,
      size: f.size,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  return (
    <section style={sectionStyle}>
      <h2>TopPrompt — 파일 첨부</h2>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "12px" }}>
        + 버튼 → 파일/이미지 업로드. X 클릭으로 삭제.
      </p>
      <TopPrompt
        value={value}
        onChange={setValue}
        onSend={(v) => { setValue(""); console.log("전송:", v); }}
        files={files}
        onFileDelete={handleFileDelete}
        onFileUpload={handleFileUpload}
      />
    </section>
  );
}

// ── 섹션 6: 커스텀 아이콘 ─────────────────────────────────────────────────
const EmojiSendIcon = () => <span style={{ fontSize: "18px" }}>🚀</span>;
const EmojiLoadingIcon = () => (
  <span style={{ fontSize: "18px", display: "inline-block", animation: "hnineds-tp-spin 1s linear infinite" }}>
    ⏳
  </span>
);
const EmojiPlusIcon = () => <span style={{ fontSize: "18px" }}>📎</span>;
const EmojiBulbIcon = () => <span style={{ fontSize: "16px" }}>💡</span>;
const EmojiArrowIcon = () => <span style={{ fontSize: "16px" }}>↗</span>;

function CustomIconSection() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"default" | "responding">("default");

  const handleSend = (v: string) => {
    setStatus("responding");
    setTimeout(() => { setStatus("default"); setValue(""); }, 2000);
    console.log("전송:", v);
  };

  return (
    <section style={sectionStyle}>
      <h2>TopPrompt — 커스텀 아이콘</h2>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "8px" }}>
        <code>icons</code> prop으로 각 아이콘을 외부에서 교체할 수 있습니다.
      </p>
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
        {[
          ["plus", "📎"],
          ["send", "🚀"],
          ["loading", "⏳"],
          ["bulb", "💡"],
          ["arrowUpRight", "↗"],
          ["fileText", "📄"],
          ["picture", "🖼️"],
        ].map(([key, emoji]) => (
          <code key={key} style={{ fontSize: "12px", background: "#f3f4f6", padding: "2px 6px", borderRadius: "4px" }}>
            {key}: {emoji}
          </code>
        ))}
      </div>
      <TopPrompt
        value={value}
        onChange={setValue}
        onSend={handleSend}
        status={status}
        recommendations={RECOMMENDATIONS}
        searchResults={SEARCH_RESULTS}
        icons={{
          plus: <EmojiPlusIcon />,
          send: <EmojiSendIcon />,
          loading: <EmojiLoadingIcon />,
          bulb: <EmojiBulbIcon />,
          arrowUpRight: <EmojiArrowIcon />,
          fileText: <span style={{ fontSize: "16px" }}>📄</span>,
          picture: <span style={{ fontSize: "16px" }}>🖼️</span>,
        }}
      />
    </section>
  );
}

// ── 메인 페이지 ───────────────────────────────────────────────────────────
export function TopPromptPage() {
  return (
    <>
      <BasicSection />
      <RespondingSection />
      <LogoSection />
      <ListOverlaySection />
      <FileSection />
      <CustomIconSection />
    </>
  );
}
