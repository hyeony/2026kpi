import{j as e}from"./jsx-runtime-D_zvdyIk.js";function a({icon:p,label:u,size:V="md",variant:C="primary",position:E="inline",className:L="",disabled:M,...W}){const H=["fab-button",`fab-button--${V}`,`fab-button--${C}`,E==="fixed"&&"fab-button--fixed",u&&"fab-button--extended",L].filter(Boolean).join(" ");return e.jsxs("button",{type:"button",className:H,disabled:M,...W,children:[e.jsx("span",{className:"fab-button__icon","aria-hidden":"true",children:p}),u&&e.jsx("span",{className:"fab-button__label",children:u})]})}function d(){return e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M12 19V5"}),e.jsx("path",{d:"m5 12 7-7 7 7"})]})}function r(){return e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M12 5v14"}),e.jsx("path",{d:"M5 12h14"})]})}function m(){return e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"currentColor",children:e.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"2"})})}a.__docgenInfo={description:"",methods:[],displayName:"FabButton",props:{"aria-label":{required:!0,tsType:{name:"string"},description:"Accessible label (required for icon-only FAB)"},icon:{required:!0,tsType:{name:"ReactNode"},description:""},size:{required:!1,tsType:{name:"union",raw:"'md' | 'lg'",elements:[{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary' | 'danger'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'danger'"}]},description:"",defaultValue:{value:"'primary'",computed:!1}},label:{required:!1,tsType:{name:"string"},description:"Extended FAB with visible label"},position:{required:!1,tsType:{name:"union",raw:"'fixed' | 'inline'",elements:[{name:"literal",value:"'fixed'"},{name:"literal",value:"'inline'"}]},description:"",defaultValue:{value:"'inline'",computed:!1}},className:{defaultValue:{value:"''",computed:!1},required:!1}},composes:["ButtonHTMLAttributes"]};d.__docgenInfo={description:"Send / submit",methods:[],displayName:"SendIcon"};r.__docgenInfo={description:"New chat",methods:[],displayName:"PlusIcon"};m.__docgenInfo={description:"Stop generation",methods:[],displayName:"StopIcon"};const R={title:"Components/FabButton",component:a,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{size:{control:"radio",options:["md","lg"]},variant:{control:"radio",options:["primary","secondary","danger"]},position:{control:"radio",options:["inline","fixed"]}}},n={args:{"aria-label":"메시지 전송",icon:e.jsx(d,{}),variant:"primary"}},i={args:{"aria-label":"새 대화",icon:e.jsx(r,{}),variant:"secondary",size:"lg"}},o={args:{"aria-label":"생성 중지",icon:e.jsx(m,{}),variant:"danger"}},s={args:{"aria-label":"새 대화 시작",icon:e.jsx(r,{}),label:"새 대화",variant:"primary"}},t={args:{"aria-label":"메시지 전송",icon:e.jsx(d,{}),disabled:!0}},l={render:()=>e.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"},children:[e.jsx(a,{"aria-label":"전송",icon:e.jsx(d,{}),variant:"primary"}),e.jsx(a,{"aria-label":"새 대화",icon:e.jsx(r,{}),variant:"secondary"}),e.jsx(a,{"aria-label":"중지",icon:e.jsx(m,{}),variant:"danger"}),e.jsx(a,{"aria-label":"새 대화",icon:e.jsx(r,{}),label:"새 대화",variant:"primary"})]})},c={args:{"aria-label":"새 대화",icon:e.jsx(r,{}),position:"fixed",variant:"primary",size:"lg"},parameters:{layout:"fullscreen"},decorators:[p=>e.jsxs("div",{style:{minHeight:"320px",padding:"24px",position:"relative"},children:[e.jsx("p",{style:{color:"#6b7280",fontSize:"14px"},children:"우측 하단 고정 FAB (채팅 입력창 위 등)"}),e.jsx(p,{})]})]};var x,b,g;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    'aria-label': '메시지 전송',
    icon: <SendIcon />,
    variant: 'primary'
  }
}`,...(g=(b=n.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var f,y,v;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    'aria-label': '새 대화',
    icon: <PlusIcon />,
    variant: 'secondary',
    size: 'lg'
  }
}`,...(v=(y=i.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var h,j,S;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    'aria-label': '생성 중지',
    icon: <StopIcon />,
    variant: 'danger'
  }
}`,...(S=(j=o.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var I,w,B;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    'aria-label': '새 대화 시작',
    icon: <PlusIcon />,
    label: '새 대화',
    variant: 'primary'
  }
}`,...(B=(w=s.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};var _,F,N;t.parameters={...t.parameters,docs:{...(_=t.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    'aria-label': '메시지 전송',
    icon: <SendIcon />,
    disabled: true
  }
}`,...(N=(F=t.parameters)==null?void 0:F.docs)==null?void 0:N.source}}};var P,k,q;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>\r
      <FabButton aria-label="전송" icon={<SendIcon />} variant="primary" />\r
      <FabButton aria-label="새 대화" icon={<PlusIcon />} variant="secondary" />\r
      <FabButton aria-label="중지" icon={<StopIcon />} variant="danger" />\r
      <FabButton aria-label="새 대화" icon={<PlusIcon />} label="새 대화" variant="primary" />\r
    </div>
}`,...(q=(k=l.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};var z,A,T;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    'aria-label': '새 대화',
    icon: <PlusIcon />,
    position: 'fixed',
    variant: 'primary',
    size: 'lg'
  },
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [Story => <div style={{
    minHeight: '320px',
    padding: '24px',
    position: 'relative'
  }}>\r
        <p style={{
      color: '#6b7280',
      fontSize: '14px'
    }}>\r
          우측 하단 고정 FAB (채팅 입력창 위 등)\r
        </p>\r
        <Story />\r
      </div>]
}`,...(T=(A=c.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};const $=["Send","NewChat","Stop","Extended","Disabled","AllVariants","FixedPosition"];export{l as AllVariants,t as Disabled,s as Extended,c as FixedPosition,i as NewChat,n as Send,o as Stop,$ as __namedExportsOrder,R as default};
