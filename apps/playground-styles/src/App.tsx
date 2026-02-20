import React, { useState } from "react";
import { ButtonPage } from "./pages/ButtonPage";
import { PromptInputPage } from "./pages/PromptInputPage";

// --- 타입 ---
type PageId = "button" | "prompt-input";

interface NavItem {
  id: PageId;
  label: string;
  description: string;
}

// --- 네비게이션 목록: 컴포넌트 추가 시 여기에 한 줄만 추가 ---
const NAV_ITEMS: NavItem[] = [
  { id: "button", label: "Button", description: "variant · size · icon" },
  { id: "prompt-input", label: "PromptInput", description: "AI 입력창 · size · actions" },
];

// --- 페이지 라우팅: 컴포넌트 추가 시 여기에 한 줄만 추가 ---
const PAGES: Record<PageId, React.ComponentType> = {
  "button": ButtonPage,
  "prompt-input": PromptInputPage,
};

// --- 사이드바 스타일 ---
const sidebarStyle: React.CSSProperties = {
  width: "220px",
  flexShrink: 0,
  borderRight: "1px solid #e5e7eb",
  padding: "24px 0",
  background: "#fafafa",
  minHeight: "100vh",
};

const navItemStyle = (active: boolean): React.CSSProperties => ({
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "10px 20px",
  border: "none",
  background: active ? "#f0f4ff" : "transparent",
  borderLeft: active ? "3px solid #6366f1" : "3px solid transparent",
  cursor: "pointer",
  fontFamily: "sans-serif",
  fontSize: "14px",
  fontWeight: active ? 600 : 400,
  color: active ? "#4338ca" : "#374151",
  transition: "background 0.15s",
});

const navDescStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  color: "#9ca3af",
  marginTop: "2px",
  fontWeight: 400,
};

export function App() {
  const [activePage, setActivePage] = useState<PageId>("button");
  const PageComponent = PAGES[activePage];

  return (
    <div style={{ display: "flex", fontFamily: "sans-serif" }}>
      {/* 사이드바 */}
      <nav style={sidebarStyle}>
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            @hnineds/styles
          </div>
        </div>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            style={navItemStyle(activePage === item.id)}
            onClick={() => setActivePage(item.id)}
          >
            {item.label}
            <span style={navDescStyle}>{item.description}</span>
          </button>
        ))}
      </nav>

      {/* 메인 콘텐츠 */}
      <main style={{ flex: 1, padding: "32px", minWidth: 0 }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ margin: "0 0 4px", fontSize: "22px" }}>
            {NAV_ITEMS.find((n) => n.id === activePage)?.label}
          </h1>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
            styles 패키지 enhanced 스타일 확인용 playground.
            Provider 없이도 styles 스타일이 자동 주입됩니다.
          </p>
        </div>
        <PageComponent />
      </main>
    </div>
  );
}
