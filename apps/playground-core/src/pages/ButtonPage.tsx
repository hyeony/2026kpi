import React from "react";
import { HnineDSProvider, Button } from "@hnineds/core";

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
      {/* Provider 없이 사용 → Context 기본값(BUILD_PREFIX) 사용 → 기본 스타일 자동 적용 */}
      <section style={sectionStyle}>
        <h2>Provider 없이 사용 — 기본 스타일 자동 적용</h2>
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
        <div style={rowStyle}>
          <Button variant="primary" className="my-custom-class">
            className 추가 테스트
          </Button>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>커스텀 prefix ("custom") — 기본 스타일 prefix custom으로 변경</h2>
        <p style={{ color: "#6b7280", fontSize: "14px" }}>
          prefix가 BUILD_PREFIX와 다르므로 클래스명이 custom-btn으로 바뀌고 해당 스타일이 동적으로 변경됨 (Provider 필요)
        </p>
        <HnineDSProvider prefix="custom">
          <div style={rowStyle}>
            <Button variant="primary">No default style</Button>
            <Button variant="secondary">No default style</Button>
          </div>
        </HnineDSProvider>
      </section>

      {/* startIcon / endIcon 테스트 */}
      <section style={sectionStyle}>
        <h2>Icon 테스트 (Provider 없이)</h2>
        <div style={rowStyle}>
          <Button variant="primary" startIcon={<span>🚀</span>}>
            Start Icon
          </Button>
          <Button variant="secondary" endIcon={<span>✨</span>}>
            End Icon
          </Button>
          <Button
            variant="ghost"
            startIcon={<span>←</span>}
            endIcon={<span>→</span>}
          >
            Both Icons
          </Button>
        </div>
      </section>
    </>
  );
}
