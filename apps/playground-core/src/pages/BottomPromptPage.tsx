import React, { useState } from "react";
import { BottomPrompt, PromptFile, PromptListItem } from "@hnineds/core";

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

const HISTORY_ITEMS: PromptListItem[] = [
  { id: "h1", content: "React에서 상태 관리를 어떻게 하나요?" },
  { id: "h2", content: "TypeScript와 JavaScript의 차이점은?" },
  { id: "h3", content: "CSS-in-JS 방식의 장단점을 알려주세요." },
];

const BOOKMARK_ITEMS: PromptListItem[] = [
  { id: "b1", content: "자주 쓰는 Git 명령어 모음" },
  { id: "b2", content: "REST API vs GraphQL 비교" },
];

const MOCK_FILES: PromptFile[] = [
  { id: "f1", name: "report.pdf", status: "normal", size: 204800 },
  { id: "f2", name: "screenshot.png", status: "normal", thumbUrl: "https://placehold.co/80x80/e0e7ff/818cf8?text=IMG" },
];

// ── 섹션 1: 기본 ───────────────────────────────────────────────────────────
function BasicSection() {
  const [value, setValue] = useState("");
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) =>
    setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 4)]);

  return (
    <section style={sectionStyle}>
      <h2>BottomPrompt — 기본</h2>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "12px" }}>
        Enter로 전송 · Shift+Enter로 줄바꿈 · + 버튼으로 파일 첨부 메뉴
      </p>
      <div style={{ maxWidth: "640px" }}>
        <BottomPrompt
          value={value}
          onChange={setValue}
          onSend={(v) => { addLog(`전송: "${v}"`); setValue(""); }}
        />
      </div>
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
    setTimeout(() => { setStatus("default"); setValue(""); }, 2500);
    console.log("전송:", v);
  };

  return (
    <section style={sectionStyle}>
      <h2>BottomPrompt — responding 상태</h2>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "12px" }}>
        전송 시 2.5초간 로딩 아이콘으로 전환됩니다.
      </p>
      <div style={{ maxWidth: "640px" }}>
        <BottomPrompt
          value={value}
          onChange={setValue}
          onSend={handleSend}
          status={status}
          placeholder="메시지를 보내면 responding 상태로 전환됩니다..."
        />
      </div>
    </section>
  );
}

// ── 섹션 3: 히스토리 / 북마크 ─────────────────────────────────────────────
function ListSection() {
  const [value, setValue] = useState("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);

  return (
    <section style={sectionStyle}>
      <h2>BottomPrompt — 히스토리 & 북마크 목록</h2>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "4px" }}>
        현재는 외부에서 열림 상태를 제어하는 방식입니다. 아래 버튼으로 토글해보세요.
      </p>
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <button onClick={() => { setIsHistoryOpen((v) => !v); setIsBookmarkOpen(false); }}
          style={{ padding: "4px 12px", borderRadius: "4px", border: "1px solid #d1d5db", cursor: "pointer", fontSize: "13px" }}>
          히스토리 {isHistoryOpen ? "닫기" : "열기"}
        </button>
        <button onClick={() => { setIsBookmarkOpen((v) => !v); setIsHistoryOpen(false); }}
          style={{ padding: "4px 12px", borderRadius: "4px", border: "1px solid #d1d5db", cursor: "pointer", fontSize: "13px" }}>
          북마크 {isBookmarkOpen ? "닫기" : "열기"}
        </button>
      </div>
      <div style={{ maxWidth: "640px", marginTop: "80px" }}>
        <BottomPrompt
          value={value}
          onChange={setValue}
          onSend={(v) => { setValue(""); console.log("전송:", v); }}
          historyList={HISTORY_ITEMS}
          isHistoryOpen={isHistoryOpen}
          onHistoryToggle={setIsHistoryOpen}
          bookmarkList={BOOKMARK_ITEMS}
          isBookmarkOpen={isBookmarkOpen}
          onBookmarkToggle={setIsBookmarkOpen}
        />
      </div>
    </section>
  );
}

// ── 섹션 4: 파일 첨부 ─────────────────────────────────────────────────────
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
      <h2>BottomPrompt — 파일 첨부</h2>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "12px" }}>
        + 버튼 → 파일/이미지 업로드. X 클릭으로 삭제.
      </p>
      <div style={{ maxWidth: "640px" }}>
        <BottomPrompt
          value={value}
          onChange={setValue}
          onSend={(v) => { setValue(""); console.log("전송:", v); }}
          files={files}
          onFileDelete={handleFileDelete}
          onFileUpload={handleFileUpload}
        />
      </div>
    </section>
  );
}

// ── 섹션 5: 커스텀 아이콘 ─────────────────────────────────────────────────
const EmojiSendIcon = () => <span style={{ fontSize: "16px" }}>🚀</span>;
const EmojiLoadingIcon = () => <span style={{ fontSize: "16px", display: "inline-block", animation: "hnineds-bp-spin 1s linear infinite" }}>⏳</span>;
const EmojiPlusIcon = () => <span style={{ fontSize: "16px" }}>📎</span>;
const EmojiStarOutlined = () => <span style={{ fontSize: "16px" }}>☆</span>;
const EmojiStarFilled = () => <span style={{ fontSize: "16px" }}>★</span>;

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
      <h2>BottomPrompt — 커스텀 아이콘</h2>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "8px" }}>
        <code>icons</code> prop으로 각 아이콘을 외부에서 교체할 수 있습니다.
      </p>
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
        {[
          ["plus", "📎"],
          ["send", "🚀"],
          ["loading", "⏳"],
          ["starOutlined", "☆"],
          ["starFilled", "★"],
          ["fileText", "📄"],
          ["picture", "🖼️"],
        ].map(([key, emoji]) => (
          <code key={key} style={{ fontSize: "12px", background: "#f3f4f6", padding: "2px 6px", borderRadius: "4px" }}>
            {key}: {emoji}
          </code>
        ))}
      </div>
      <div style={{ maxWidth: "640px" }}>
        <BottomPrompt
          value={value}
          onChange={setValue}
          onSend={handleSend}
          status={status}
          icons={{
            plus: <EmojiPlusIcon />,
            send: <EmojiSendIcon />,
            loading: <EmojiLoadingIcon />,
            starOutlined: <EmojiStarOutlined />,
            starFilled: <EmojiStarFilled />,
            fileText: <span style={{ fontSize: "16px" }}>📄</span>,
            picture: <span style={{ fontSize: "16px" }}>🖼️</span>,
          }}
        />
      </div>
    </section>
  );
}

// ── 메인 페이지 ───────────────────────────────────────────────────────────
export function BottomPromptPage() {
  return (
    <>
      <BasicSection />
      <RespondingSection />
      <ListSection />
      <FileSection />
      <CustomIconSection />
    </>
  );
}
