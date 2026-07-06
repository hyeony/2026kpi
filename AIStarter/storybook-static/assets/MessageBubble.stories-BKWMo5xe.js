import{j as e}from"./jsx-runtime-D_zvdyIk.js";function s({role:u,children:N,status:r="default",timestamp:c,maxWidth:q=520,className:U="",...W}){const E=["message-bubble",`message-bubble--${u}`,r!=="default"&&`message-bubble--${r}`,U].filter(Boolean).join(" ");return e.jsxs("div",{className:E,style:{maxWidth:q},"data-role":u,"data-status":r,...W,children:[e.jsxs("div",{className:"message-bubble__inner",children:[e.jsx("div",{className:"message-bubble__content",children:N}),r==="streaming"&&e.jsx("span",{className:"message-bubble__cursor","aria-hidden":"true"})]}),c&&e.jsx("time",{className:"message-bubble__timestamp",children:c})]})}s.__docgenInfo={description:"",methods:[],displayName:"MessageBubble",props:{role:{required:!0,tsType:{name:"union",raw:"'user' | 'assistant'",elements:[{name:"literal",value:"'user'"},{name:"literal",value:"'assistant'"}]},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},status:{required:!1,tsType:{name:"union",raw:"'default' | 'streaming' | 'error'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'streaming'"},{name:"literal",value:"'error'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},timestamp:{required:!1,tsType:{name:"string"},description:""},maxWidth:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"520",computed:!1}},className:{defaultValue:{value:"''",computed:!1},required:!1}},composes:["HTMLAttributes"]};const K={title:"Components/MessageBubble",component:s,tags:["autodocs"],parameters:{layout:"padded"},argTypes:{role:{control:"radio",options:["user","assistant"]},status:{control:"select",options:["default","streaming","error"]}}},a={args:{role:"user",children:"이번 분기 KPI 보고서 요약해줘."}},t={args:{role:"assistant",children:"이번 분기 KPI는 매출 12% 성장, 고객 이탈률 3.2%로 전분기 대비 개선되었습니다. 자세한 내용은 첨부 리포트를 참고하세요."}},n={args:{role:"assistant",status:"streaming",children:"분석 결과를 정리하고 있습니다"}},o={args:{role:"assistant",children:"요약이 완료되었습니다. 추가 질문이 있으시면 말씀해 주세요.",timestamp:"오후 2:34"}},i={args:{role:"assistant",status:"error",children:"응답을 생성하지 못했습니다. 다시 시도해 주세요."}},l={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px",maxWidth:720},children:[e.jsx(s,{role:"user",children:"번역 AI 컴포넌트 가이드 초안 써줘."}),e.jsx(s,{role:"assistant",status:"streaming",children:"AI UI Starter Guide는 공통 레이아웃과 재사용 컴포넌트를"}),e.jsx(s,{role:"assistant",children:"AI UI Starter Guide는 공통 레이아웃과 재사용 컴포넌트를 정의하는 실무용 문서입니다."})]})};var d,m,p;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    role: 'user',
    children: '이번 분기 KPI 보고서 요약해줘.'
  }
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var g,b,f;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    role: 'assistant',
    children: '이번 분기 KPI는 매출 12% 성장, 고객 이탈률 3.2%로 전분기 대비 개선되었습니다. 자세한 내용은 첨부 리포트를 참고하세요.'
  }
}`,...(f=(b=t.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var h,x,v;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    role: 'assistant',
    status: 'streaming',
    children: '분석 결과를 정리하고 있습니다'
  }
}`,...(v=(x=n.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var I,y,j;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    role: 'assistant',
    children: '요약이 완료되었습니다. 추가 질문이 있으시면 말씀해 주세요.',
    timestamp: '오후 2:34'
  }
}`,...(j=(y=o.parameters)==null?void 0:y.docs)==null?void 0:j.source}}};var S,_,B;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    role: 'assistant',
    status: 'error',
    children: '응답을 생성하지 못했습니다. 다시 시도해 주세요.'
  }
}`,...(B=(_=i.parameters)==null?void 0:_.docs)==null?void 0:B.source}}};var M,A,T;l.parameters={...l.parameters,docs:{...(M=l.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: 720
  }}>\r
      <MessageBubble role="user">번역 AI 컴포넌트 가이드 초안 써줘.</MessageBubble>\r
      <MessageBubble role="assistant" status="streaming">\r
        AI UI Starter Guide는 공통 레이아웃과 재사용 컴포넌트를\r
      </MessageBubble>\r
      <MessageBubble role="assistant">\r
        AI UI Starter Guide는 공통 레이아웃과 재사용 컴포넌트를 정의하는 실무용 문서입니다.\r
      </MessageBubble>\r
    </div>
}`,...(T=(A=l.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};const P=["User","Assistant","Streaming","WithTimestamp","Error","Conversation"];export{t as Assistant,l as Conversation,i as Error,n as Streaming,a as User,o as WithTimestamp,P as __namedExportsOrder,K as default};
