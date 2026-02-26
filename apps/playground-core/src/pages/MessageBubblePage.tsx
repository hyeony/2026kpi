import React, { useState } from "react";
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

function EditModeDemo() {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("아니 우리는 라이브러리니까. 메세지관련해서는 뭐 아예모르지. 사용하는사람들이 알아서 데이터넣지않을까");
  const [files, setFiles] = useState<{ fileName: string; fileType?: string }[]>([
    { fileName: "보고서.pdf", fileType: "PDF 문서" },
    { fileName: "정리.docx", fileType: "Word 문서" },
  ]);

  return (
    <>
      {!isEditing ? (
        <UserMessageBubble
          editInitialText={text}
          files={files}
          onCopy={() => {}}
          onEdit={() => setIsEditing(true)}
          onBookmark={() => {}}
        >
          {text}
        </UserMessageBubble>
      ) : (
        <UserMessageBubble
          isEditing
          editInitialText={text}
          files={files}
          onCancelEdit={() => setIsEditing(false)}
          onConfirmEdit={(nextText) => {
            setText(nextText);
            setIsEditing(false);
          }}
          onDeleteFile={(i) => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
        />
      )}
    </>
  );
}

function EditModeImageDemo() {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("이미지 올릴게요");
  const [images, setImages] = useState<{ src: string; alt?: string }[]>([
    { src: "https://placehold.co/120x120?text=1" },
    { src: "https://placehold.co/120x120?text=2" },
    { src: "https://placehold.co/120x120?text=3" },
  ]);

  return (
    <>
      {!isEditing ? (
        <UserMessageBubble
          images={images}
          editInitialText={text}
          onCopy={() => {}}
          onEdit={() => setIsEditing(true)}
          onBookmark={() => {}}
        >
          {text}
        </UserMessageBubble>
      ) : (
        <UserMessageBubble
          isEditing
          images={images}
          editInitialText={text}
          onCancelEdit={() => setIsEditing(false)}
          onConfirmEdit={(nextText) => {
            setText(nextText);
            setIsEditing(false);
          }}
          onDeleteImage={(i) => setImages((prev) => prev.filter((_, idx) => idx !== i))}
        />
      )}
    </>
  );
}

function EditModeSingleImageDemo() {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("사진 하나 올렸어요");
  const [images, setImages] = useState<{ src: string; alt?: string }[]>([
    { src: "https://placehold.co/280x180?text=가로형" },
  ]);

  return (
    <>
      {!isEditing ? (
        <UserMessageBubble
          images={images}
          editInitialText={text}
          onCopy={() => {}}
          onEdit={() => setIsEditing(true)}
          onBookmark={() => {}}
        >
          {text}
        </UserMessageBubble>
      ) : (
        <UserMessageBubble
          isEditing
          images={images}
          editInitialText={text}
          onCancelEdit={() => setIsEditing(false)}
          onConfirmEdit={(nextText) => {
            setText(nextText);
            setIsEditing(false);
          }}
          onDeleteImage={(i) => setImages((prev) => prev.filter((_, idx) => idx !== i))}
        />
      )}
    </>
  );
}

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
          1장: 비율에 따라 가로형(landscape) 또는 세로형(portrait). 2장~: 120×120 그리드. 이미지+텍스트 동시 시 이미지 말풍선 아래 텍스트 말풍선으로 분리.
        </p>
        <div style={chatContainerStyle}>
          <UserMessageBubble
            images={[{ src: "https://placehold.co/280x180?text=가로" }]}
            onCopy={() => {}}
            onEdit={() => {}}
            onBookmark={() => {}}
          >
            이미지 1장 (가로형)
          </UserMessageBubble>
          <UserMessageBubble
            images={[{ src: "https://placehold.co/180x280?text=세로" }]}
            onCopy={() => {}}
            onEdit={() => {}}
            onBookmark={() => {}}
          >
            이미지 1장 (세로형)
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
        <h2>User 메시지 — 말풍선 내 파일 첨부</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "16px" }}>
          파일은 개별 블록(파일 하나당 말풍선 하나). 왼쪽 파일 아이콘, 오른쪽 파일명(2줄 말줄임) + 하단 파일형식(옅은 색). 이미지 → 파일들 → 텍스트 순으로 말풍선 분리.
        </p>
        <div style={chatContainerStyle}>
          <UserMessageBubble
            files={[
              { fileName: "보고서.pdf", fileType: "PDF 문서" },
              { fileName: "2024_프로젝트_요약_및_결과_정리_문서.docx", fileType: "Word 문서" },
            ]}
            onCopy={() => {}}
          >
            파일만 (2개 파일 = 2개 말풍선)
          </UserMessageBubble>
          <UserMessageBubble
            images={[{ src: "https://placehold.co/200x200?text=IMG" }]}
            files={[{ fileName: "첨부.pdf", fileType: "PDF" }]}
            onCopy={() => {}}
          >
            이미지 말풍선 → 파일 말풍선 → 텍스트 말풍선
          </UserMessageBubble>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>User 메시지 — 편집 모드</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "16px" }}>
          isEditing 시 wrapper 배경 변경, 하단 취소/확인, 텍스트 textarea. 이미지는 그리드 + 우측 상단 원형 X 삭제, 파일은 행마다 삭제. 데이터 유지는 호출측(onConfirmEdit, onDeleteImage, onDeleteFile)에서.
        </p>
        <div style={chatContainerStyle}>
          <EditModeDemo />
          <EditModeImageDemo />
          <EditModeSingleImageDemo />
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
