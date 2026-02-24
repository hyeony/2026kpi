import React from "react";
import { HnineDSProvider, UserMessageBubble, AgentMessageBubble } from "@hnineds/core";

const sectionStyle: React.CSSProperties = {
  padding: "24px",
  marginBottom: "24px",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
};

const chatContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  maxWidth: "1020px",
};

export function MessageBubblePage() {
  return (
    <>
      <section style={sectionStyle}>
        <h2>MessageBubble — showX로 표시 여부, onX로 동작</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "16px" }}>
          showCopy 등으로 버튼 표시 여부, onCopy 등으로 클릭 동작(없으면 noop/추후 기본 동작).
        </p>
        <div style={chatContainerStyle}>
          <AgentMessageBubble
            onCopy={() => console.log("Agent 복사")}
            onLike={() => console.log("좋아요")}
            onDislike={() => console.log("싫어요")}
            onRefresh={() => console.log("새로고침")}
            onBookmark={() => console.log("북마크")}
          >
            에이전트 응답입니다. showX 기본 true라 전부 표시.
          </AgentMessageBubble>
          <UserMessageBubble
            onCopy={() => console.log("User 복사")}
            onEdit={() => console.log("편집")}
            onBookmark={() => console.log("북마크")}
          >
            사용자 메시지. 복사·편집·북마크 기본 표시.사용자 메시지. 복사·편집·북마크 기본 표시.사용자 메시지. 복사·편집·북마크 기본 표시.사용자 메시지. 복사·편집·북마크 기본 표시.사용자 메시지. 복사·편집·북마크 기본 표시.사용자 메시지. 복사·편집·북마크 기본 표시.사용자 메시지. 복사·편집·북마크 기본 표시.
            사용자 메시지. 복사·편집·북마크 기본 표시.사용자 메시지. 복사·편집·북마크 기본 표시.사용자 메시지. 복사·편집·북마크 기본 표시.사용자 메시지. 복사·편집·북마크 기본 표시.사용자 메시지. 복사·편집·북마크 기본 표시.사용자 메시지. 복사·편집·북마크 기본 표시.사용자 메시지. 복사·편집·북마크 기본 표시.사용자 메시지. 복사·편집·북마크 기본 표시.
            사용자 메시지. 복사·편집·북마크 기본 표시.사용자 메시지. 복사·편집·북마크 기본 표시.사용자 메시지. 복사·편집·북마크 기본 표시.사용자 메시지. 복사·편집·북마크 기본 표시.
          </UserMessageBubble>
          <AgentMessageBubble
            showLike={false}
            showDislike={false}
            showBookmark={false}
            onCopy={() => console.log("복사")}
            onRefresh={() => console.log("재생성")}
          >
            showCopy·showRefresh만 true — 복사/새로고침 버튼만 표시, onX만 넘김.
          </AgentMessageBubble>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>User 메시지 — 말풍선 내 이미지</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "16px" }}>
          1장: 정사각(200×200). 2장~: 120×120 그리드. 크기는 말풍선에서 강제. 이미지+텍스트 동시 시 이미지 말풍선 아래 텍스트 말풍선으로 분리.
        </p>
        <div style={chatContainerStyle}>
          <UserMessageBubble
            images={[{ src: "https://placehold.co/200x200?text=1" }]}
            onCopy={() => {}}
            onEdit={() => {}}
            onBookmark={() => {}}
          >
            이미지 1장 (정사각 고정)
          </UserMessageBubble>
          <UserMessageBubble
            images={[
              { src: "https://placehold.co/120x120?text=A" },
              { src: "https://placehold.co/120x120?text=B" },
            ]}
            onCopy={() => {}}
          >
            이미지 2장 (120×120)
          </UserMessageBubble>
          <UserMessageBubble
            images={[
              { src: "https://placehold.co/120x120?text=1" },
              { src: "https://placehold.co/120x120?text=2" },
              { src: "https://placehold.co/120x120?text=3" },
              { src: "https://placehold.co/120x120?text=4" },
              { src: "https://placehold.co/120x120?text=5" },
            ]}
            onCopy={() => {}}
          >
            이미지 5장 (위3 아래2, 오른쪽 정렬)
          </UserMessageBubble>
          <UserMessageBubble
            images={[
              { src: "https://placehold.co/120x120?text=1" },
              { src: "https://placehold.co/120x120?text=2" },
              { src: "https://placehold.co/120x120?text=3" },
              { src: "https://placehold.co/120x120?text=4" },
              { src: "https://placehold.co/120x120?text=5" },
              { src: "https://placehold.co/120x120?text=6" },
              { src: "https://placehold.co/120x120?text=7" },
              { src: "https://placehold.co/120x120?text=8" },
            ]}
            onCopy={() => {}}
          >
            이미지 8장 (3열, 마지막 줄 오른쪽 정렬)
          </UserMessageBubble>
          <UserMessageBubble
            images={[{ src: "https://placehold.co/120x120?text=img" }]}
            onCopy={() => {}}
          >
            이미지 말풍선 + 텍스트 말풍선 분리 예시
          </UserMessageBubble>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>커스텀 prefix</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "16px" }}>
          HnineDSProvider로 prefix를 바꾸면 클래스명이 custom-message-bubble-* 로 적용됩니다.
        </p>
        <HnineDSProvider prefix="custom">
          <div style={chatContainerStyle}>
            <UserMessageBubble onCopy={() => {}} onEdit={() => {}} onBookmark={() => {}}>
              custom prefix 사용 시 User 메시지
            </UserMessageBubble>
            <AgentMessageBubble onCopy={() => {}} onLike={() => {}}>
              custom prefix 사용 시 Agent 메시지
            </AgentMessageBubble>
          </div>
        </HnineDSProvider>
      </section>
    </>
  );
}
