import React, { useState } from "react";
import { HnineDSProvider, PromptInput } from "@hnineds/styles";

const sectionStyle: React.CSSProperties = {
  padding: "24px",
  marginBottom: "24px",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
};

export function PromptInputPage() {
  const [log, setLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addLog = (msg: string) =>
    setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 4)]);

  const handleSubmit = (value: string) => {
    setLoading(true);
    addLog(`전송됨: "${value}"`);
    setTimeout(() => setLoading(false), 1800);
  };

  return (
    <>
      <section style={sectionStyle}>
        <h2>PromptInput — Enhanced 스타일 (Provider 없이)</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "12px" }}>
          Enter로 전송 · Shift+Enter로 줄바꿈 · gradient 전송 버튼 + focus glow
        </p>
        <div style={{ maxWidth: "640px" }}>
          <PromptInput
            placeholder="무엇이든 물어보세요..."
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>
        {log.length > 0 && (
          <pre style={{ marginTop: "12px", fontSize: "12px", color: "#6b7280", background: "#f8faff", padding: "10px", borderRadius: "6px" }}>
            {log.join("\n")}
          </pre>
        )}
      </section>

      <section style={sectionStyle}>
        <h2>PromptInput — 크기 변형</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "640px" }}>
          <div>
            <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "6px" }}>size="sm"</p>
            <PromptInput size="sm" placeholder="Small prompt..." onSubmit={addLog} />
          </div>
          <div>
            <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "6px" }}>size="md" (default)</p>
            <PromptInput size="md" placeholder="Medium prompt..." onSubmit={addLog} />
          </div>
          <div>
            <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "6px" }}>size="lg"</p>
            <PromptInput size="lg" placeholder="Large prompt..." onSubmit={addLog} />
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>PromptInput — 글자수 제한 + 액션 슬롯</h2>
        <div style={{ maxWidth: "640px" }}>
          <PromptInput
            placeholder="최대 200자까지 입력 가능합니다..."
            maxLength={200}
            onSubmit={addLog}
            actions={
              <>
                <button
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: "6px", color: "#6b7280", fontSize: "18px" }}
                  title="파일 첨부"
                >
                  📎
                </button>
                <button
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: "6px", color: "#6b7280", fontSize: "18px" }}
                  title="마이크"
                >
                  🎤
                </button>
              </>
            }
          />
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>PromptInput — 커스텀 prefix ("custom")</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "12px" }}>
          prefix 변경 시 enhanced CSS가 custom-prompt-* 클래스명으로 교체 주입됩니다.
        </p>
        <HnineDSProvider prefix="custom">
          <div style={{ maxWidth: "640px" }}>
            <PromptInput placeholder="custom prefix 적용됨..." onSubmit={addLog} />
          </div>
        </HnineDSProvider>
      </section>
    </>
  );
}
