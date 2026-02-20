import React from "react";
import { HnineDSProvider, Button } from "@hnineds/styles";

const sectionStyle: React.CSSProperties = {
  padding: "24px",
  marginBottom: "24px",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  alignItems: "center",
  marginTop: "12px",
};

export function ButtonPage() {
  return (
    <>
      {/* Provider 없이 사용 → styles 스타일 자동 주입 */}
      <section style={sectionStyle}>
        <h2>Provider 없이 사용 — Enhanced Design 자동 적용</h2>
        <div style={rowStyle}>
          <Button variant="primary" size="sm">Primary SM</Button>
          <Button variant="primary" size="md">Primary MD</Button>
          <Button variant="primary" size="lg">Primary LG</Button>
        </div>
        <div style={rowStyle}>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </section>

      {/* 커스텀 prefix → 스타일 해제 (Provider 필요) */}
      <section style={sectionStyle}>
        <h2>커스텀 prefix ("custom") — 스타일 해제</h2>
        <p style={{ color: "#6b7280", fontSize: "14px" }}>
          prefix 변경 시 클래스명이 custom-btn으로 바뀌어 enhanced 스타일이 해제됩니다.
        </p>
        <HnineDSProvider prefix="custom">
          <div style={rowStyle}>
            <Button variant="primary">No style (prefix mismatch)</Button>
          </div>
        </HnineDSProvider>
      </section>

      {/* Icon 테스트 (Provider 없이) */}
      <section style={sectionStyle}>
        <h2>Icon 테스트 (Provider 없이)</h2>
        <div style={rowStyle}>
          <Button variant="primary" startIcon={<span>🚀</span>}>
            Start Icon
          </Button>
          <Button variant="secondary" endIcon={<span>✨</span>}>
            End Icon
          </Button>
          <Button variant="ghost" startIcon={<span>←</span>} endIcon={<span>→</span>}>
            Both Icons
          </Button>
        </div>
      </section>
    </>
  );
}
