(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[346],{6301:function(){},7274:function(){},2454:function(){},6812:function(){},1797:function(){},302:function(e,t,s){Promise.resolve().then(s.bind(s,2920)),Promise.resolve().then(s.bind(s,3467)),Promise.resolve().then(s.bind(s,6302)),Promise.resolve().then(s.bind(s,4661))},3467:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return g}});var r=s(7822),l=s(5250),n=s(5104),o=s(5849);s(2105);var a=e=>{let{dealId:t,docPayTypeName:s,total:n,tax:o,productCount:a,servingName:i}=e,[c,d]=(0,l.useState)(!1),h=()=>{console.log("clicked"),d(e=>!e)};return(0,r.jsxs)("div",{className:"bg-white z-50 shadow-md rounded-lg p-6 space-y-3",children:[(0,r.jsxs)("button",{onClick:()=>h(),children:[(0,r.jsxs)("h2",{className:"text-xs md:text-md md:text-lg font-semibold",children:["הזמנה: ",t]}),(0,r.jsx)("div",{className:"border-t border-gray-200"})]}),c&&(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-1",children:[(0,r.jsxs)("div",{dir:"rtl",className:"flex flex-row items-center ",children:[(0,r.jsx)("p",{className:"text-sm text-gray-500",children:"אמצעי תשלום"}),(0,r.jsx)("p",{className:"text-sm font-semibold",children:s}),(0,r.jsx)("p",{className:"text-sm mx-1 text-gray-500",children:" סה״כ "}),(0,r.jsxs)("p",{className:"text-sm font-semibold",children:[" ",n||0," ש״ח "]})]}),(0,r.jsxs)("div",{dir:"rtl",className:"flex flex-col",children:[(0,r.jsx)("p",{className:"text-sm font-semibold mx-1",children:i||"לשבת"}),(0,r.jsx)("p",{className:"text-sm text-gray-500 text-right mx-1",children:"מספר פריטים :  "}),(0,r.jsx)("p",{className:"text-sm font-semibold",children:a})]})]})]})},i=s(8429),c=s.n(i),d=s(7713),h=s(2375),x=s.n(h),f=s(7710).lW,m=e=>{let{onClose:t,file:s}=e,n=(0,l.useMemo)(()=>(0,r.jsx)(x(),{src:"data:image/jpeg;base64, ".concat(f.from(s.data).toString("base64")),width:window.innerWidth,height:20}),[s.data]);return(0,r.jsxs)("div",{className:"fixed inset-0 z-50 flex items-center justify-center",children:[(0,r.jsx)("div",{className:"fixed flex inset-0 bg-gray-500 bg-opacity-75 transition-opacity",onClick:t}),(0,r.jsxs)("div",{className:"relative h-auto w-full max-w-[80vw] mx-auto p-4 bg-white rounded-lg shadow-xl",children:[(0,r.jsx)("div",{className:"flex flex-wrap overflow-y-auto items-center justify-center h-[60vh] ",children:(0,r.jsx)("div",{className:" flex justify-center items-center w-full py-5 ",children:n})}),(0,r.jsx)("div",{className:"bg-gray-50 flex justify-center items-center px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6",children:(0,r.jsx)("button",{type:"button",className:"inline-flex w-full items-center justify-center rounded-full bg-red-600 px-12 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto",onClick:t,children:(0,r.jsx)("p",{className:"text-center",children:"סגור"})})})]})]})},p=s(7710).lW,g=e=>{let{id:t,bon:i}=e,[h,f]=(0,l.useState)(),[g,v]=(0,l.useState)(1),[w,b]=(0,l.useState)(!1),{data:j,setData:y}=(0,o.b)(),N=async()=>{if(i._id&&j.session)try{let e=await c().updateOrderStatus(i._id,j.session);if(!0===e){let e=j.orders;e.splice(t,1),y(t=>({...t,orders:e})),console.log(j.orders);return}console.log(e)}catch(e){console.log(e)}else console.log(i)},{dealId:k,docPayTypeName:S,total:C,tax:E,productCount:P,servingName:I,prnId:O,prnName:M,items:R,file:L}=i;console.log(L),d.Z.GlobalWorkerOptions.workerSrc=new s.U(s(7707)).toString();let z=(0,l.useMemo)(()=>(console.log(L),(0,r.jsx)(x(),{src:"data:image/jpeg;base64, ".concat(p.from(L.data).toString("base64")),width:window.innerWidth,height:20})),[L,g]);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{dir:"rtl",className:"flex flex-col p-4 h-fit relative",children:[(0,r.jsx)(a,{dealId:k}),(0,r.jsx)("div",{className:"flex border rounded-lg my-1",children:(0,r.jsx)("div",{className:"w-full  flex flex-wrap justify-center items-start mt-2 overflow-y-auto overflow-x-hidden h-44 bg-violet-50",onClick:()=>{console.log("CLIECKED"),b(e=>!e)},children:z})}),(0,r.jsx)("button",{onClick:()=>{let e=j.session;return N(i._id,e)},className:"rounded-full mx-3 absolute bottom-1.5 mt-1 left-1/2 transform -translate-x-1/2 px-12 py-1 w-auto text-white bg-[#e4004a]",children:"בוצע"})]}),w&&(0,n.createPortal)((0,r.jsx)(m,{file:L,onClose:()=>{b(!1)}}),window.document.body)]})}},2920:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return f}});var r=s(7822),l=s(900);s(98),s(126);var n=s(5250),o=s(3467);let a=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,s=[];for(let r=0;r<e;r++){let e=Math.ceil(4*Math.random())+1,l=r%t;s.push({i:r.toString(),x:l,y:Math.floor(r/t)*e,w:1,h:2,static:!1})}return s};var i=s(7713),c=s(5849),d=s(2105),h=s.n(d),x=s(7280),f=()=>{var e;let t=h()()?2:4,{data:d,setData:f}=(0,c.b)(),{layout:m,setLayout:p,layoutDraggable:g}=(0,x.l)(),v=null===(e=globalThis.window)||void 0===e?void 0:e.innerWidth;return i.Z.GlobalWorkerOptions.workerSrc=new s.U(s(7707)).toString(),(0,n.useEffect)(()=>{var e;let s=null==d?void 0:null===(e=d.orders)||void 0===e?void 0:e.length;if(s>0&&s!=m.length){let e=a(s,t);console.log(e),p(e)}else console.log("Nothing to change!")},[null==d?void 0:d.orders]),(0,r.jsx)("div",{className:" h-[100vh] overflow-x-hidden",children:(0,r.jsx)(l.Responsive,{className:"layout",compactType:"vertical",style:{paddingTop:5},breakpoints:{lg:1200,md:996,sm:768,xs:480,xxs:0},cols:{lg:4,md:4,sm:2,xs:2,xxs:2},layouts:{lg:m},margin:[15,20],isDraggable:g,onLayoutChange:e=>p(e),width:v,children:(null==d?void 0:d.orders)?d.orders.map((e,t)=>(0,r.jsx)("div",{className:" rounded-lg shadow-md bg-white",children:(0,r.jsx)(o.default,{id:t,bon:e})},t.toString())):null})})}},4661:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return d}});var r=s(7822),l=s(5250),n=s(3140),o=s(8429),a=s.n(o),i=s(5849),c=e=>{let{username:t=null,password:s=null}=e,o=(0,n.useRouter)(),[c,d]=(0,l.useState)(""),{setData:h}=(0,i.b)(),[x,f]=(0,l.useState)(""),[m,p]=(0,l.useState)(""),[g,v]=(0,l.useState)(!0);(0,l.useEffect)(()=>{console.log(t,s),t&&s&&w()},[]);let w=async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:s;if(!e||!r)return;let l=await a().login(e,r);l?(console.log("login result: ",l),g&&localStorage.setItem("session",JSON.stringify(l)),h(e=>({...e,session:l,isRememberMe:g})),setTimeout(()=>{o.push("/orders",{prefetch:!1})},500)):d("Login failed. Please check your credentials.")};return(0,r.jsx)("div",{dir:"rtl",className:"flex items-center justify-center min-h-screen bg-gray-100",children:(0,r.jsxs)("div",{className:"bg-white p-8 rounded shadow-md w-full max-w-md",children:[(0,r.jsx)("h2",{className:"text-2xl font-semibold mb-4",children:"התחברות"}),(0,r.jsxs)("form",{onSubmit:w,children:[(0,r.jsxs)("div",{className:"mb-4",children:[(0,r.jsx)("label",{htmlFor:"username",className:"block mb-1 font-medium",children:"שם משתמש"}),(0,r.jsx)("input",{type:"text",id:"username",value:x,className:"w-full border rounded px-3 py-2",onChange:e=>f(e.target.value),placeholder:"הזן מזהה לקוח"})]}),(0,r.jsxs)("div",{className:"mb-4",children:[(0,r.jsx)("label",{htmlFor:"password",className:"block mb-1 font-medium",children:"סיסמא"}),(0,r.jsx)("input",{type:"password",id:"password",value:m,onChange:e=>p(e.target.value),className:"w-full border rounded px-3 py-2",placeholder:"הזן מזהה מכשיר"})]}),(0,r.jsxs)("div",{className:"flex flex-col",children:[(0,r.jsxs)("div",{className:"inline-flex items-center",children:[(0,r.jsxs)("label",{className:"relative flex cursor-pointer items-center rounded-full p-3",htmlFor:"checkbox-1","data-ripple-dark":"true",children:[(0,r.jsx)("input",{type:"checkbox",className:"before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10",id:"checkbox-1",defaultChecked:!0,value:g,onChange:()=>v(e=>!e)}),(0,r.jsx)("div",{className:"pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100",children:(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-3.5 w-3.5",viewBox:"0 0 20 20",fill:"currentColor",stroke:"currentColor",strokeWidth:"1",children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",clipRule:"evenodd"})})})]}),(0,r.jsx)("p",{children:"שמור פרטי התחברות "})]}),(0,r.jsx)("button",{onClick:()=>w(x,m),className:"bg-pink-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors",children:"התחבר"})]}),c&&(0,r.jsx)("p",{className:"text-red-500 mt-2",children:c})]})]})})},d=()=>{let e,t;let s=(0,n.useSearchParams)();try{e=s.get("username"),t=s.get("password")}catch(s){e=null,t=null}return(0,r.jsx)("div",{className:"flex-col  w-full h-full flex bg-slate-500",children:(0,r.jsx)(c,{username:e,password:t})})}},6302:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return k}});var r=s(7822),l=s(2920),n=e=>{let{children:t}=e;return(0,r.jsx)("div",{className:"w-full h-full",children:t})},o=s(5250),a=s(5849);let i=(e,t)=>e.sort((e,s)=>{let r=new Date(e.tmOpen),l=new Date(s.tmOpen);if("ASC"===t)return r-l;if("DESC"===t)return l-r;throw Error('Invalid sort order. Please use "ASC" or "DESC".')}),c=()=>(0,r.jsxs)("svg",{className:"h-8 w-8 text-white",width:"24",height:"24",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:["  ",(0,r.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z"}),"  ",(0,r.jsx)("line",{x1:"4",y1:"6",x2:"11",y2:"6"}),"  ",(0,r.jsx)("line",{x1:"4",y1:"12",x2:"11",y2:"12"}),"  ",(0,r.jsx)("line",{x1:"4",y1:"18",x2:"13",y2:"18"}),"  ",(0,r.jsx)("polyline",{points:"15 9 18 6 21 9"}),"  ",(0,r.jsx)("line",{x1:"18",y1:"6",x2:"18",y2:"18"})]}),d=()=>(0,r.jsxs)("svg",{className:"h-8 w-8 text-white",width:"24",height:"24",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:["  ",(0,r.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z"}),"  ",(0,r.jsx)("line",{x1:"4",y1:"6",x2:"13",y2:"6"}),"  ",(0,r.jsx)("line",{x1:"4",y1:"12",x2:"11",y2:"12"}),"  ",(0,r.jsx)("line",{x1:"4",y1:"18",x2:"11",y2:"18"}),"  ",(0,r.jsx)("polyline",{points:"15 15 18 18 21 15"}),"  ",(0,r.jsx)("line",{x1:"18",y1:"6",x2:"18",y2:"18"})]});var h=()=>{let{data:e,setData:t}=(0,a.b)();return(0,r.jsx)("div",{className:"w-max flex justify-center items-center",children:(0,r.jsxs)("button",{className:"flex flex-row px-2 bg-green-300 rounded-full",onClick:()=>{let s=(null==e?void 0:e.sorted)==="DESC"?"ASC":"DESC";t(e=>({...e,sorted:s}));let r=i(e.orders,s);t(e=>({...e,orders:r}))},children:[(0,r.jsx)("p",{className:"whitespace-nowrap overflow-hidden text-white overflow-ellipsis mx-1",children:"מיון"}),(null==e?void 0:e.sorted)==="DESC"?c():d()]})})};let x=e=>e.hasOwnProperty("prnId")&&"number"==typeof e.prnId;var f=()=>{let[e,t]=(0,o.useState)([{name:"הכל",prnId:0}]),[s,l]=(0,o.useState)(void 0),{data:n,setData:i}=(0,a.b)();(0,o.useEffect)(()=>{if(console.log(n),n&&n.printers){let s=n.printers.filter(x).concat(e.filter(x));t(s)}},[n.printers]);let c=async t=>{let s=t.target.value;l(s);let r=e.find(e=>e.name===s);i(e=>({...e,printerSelected:r}))};return(0,r.jsx)("div",{className:"w-full bg-black flex items-center md:mr-28",children:(0,r.jsxs)("div",{className:"relative inline-block w-full text-left",children:[(0,r.jsx)("select",{value:s,onChange:c,className:"block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline",children:null==e?void 0:e.map(e=>(0,r.jsx)("option",{value:e.name||"",children:e.name||""},e.prnId))}),(0,r.jsx)("div",{className:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700",children:(0,r.jsx)("svg",{className:"fill-current h-4 w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",children:(0,r.jsx)("path",{d:"M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"})})})]})})},m=s(7280),p=()=>{let{layoutDraggable:e,setLayoutDraggable:t}=(0,m.l)(),s=()=>{t(e=>!e)};return(0,r.jsx)("div",{className:"flex justify-center w-max py-1 mr-1",children:e?(0,r.jsx)("button",{className:"flex items-center rounded-full px-5 bg-[#a70035]",onClick:()=>s(),children:(0,r.jsx)("p",{className:"whitespace-nowrap overflow-hidden text-white overflow-ellipsis",children:"שמור מיקום"})}):(0,r.jsx)("button",{className:"flex items-center rounded-full px-5 bg-emerald-400",onClick:()=>s(),children:(0,r.jsx)("p",{className:"whitespace-nowrap overflow-hidden text-white overflow-ellipsis",children:"שנה מיקום"})})})},g=()=>{let{data:e,setData:t}=(0,a.b)(),s=e.autoRefresh;return(0,r.jsx)("div",{className:"w-max flex items-center justify-center mx-1 rounded-full bg-lime-200 p-1",children:(0,r.jsxs)("label",{className:"relative  inline-flex items-center justify-center cursor-pointer",children:[(0,r.jsx)("input",{value:s,type:"checkbox",className:"sr-only peer",onClick:()=>t(e=>({...e,autoRefresh:!e.autoRefresh}))}),(0,r.jsx)("div",{className:"w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#a70035]"}),(0,r.jsx)("p",{className:"whitespace-nowrap overflow-hidden  overflow-ellipsis mx-1",children:"רענון אוטומטי (10 ש')"})]})})},v=s(3140),w=s(8429),b=s.n(w),j=s(2105),y=s.n(j),N=e=>{let{children:t}=e,[s,l]=(0,o.useState)(!1);return(0,r.jsxs)("div",{className:"relative text-left",children:[(0,r.jsx)("button",{onClick:()=>l(!s),className:" text-white px-4 py-2 rounded",children:(0,r.jsx)("svg",{class:"h-6 w-6 text-red-500",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,r.jsx)("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 6h16M4 12h16M4 18h16"})})}),s&&(0,r.jsx)("div",{className:"absolute right-1 mt-1 w-56 rounded-md shadow-lg bg-white",children:(0,r.jsx)("div",{className:"rounded-md bg-slate-700 p-1 shadow-xs",children:(0,r.jsx)("div",{className:"py-1 flex flex-col items-end justify-evenly",children:t})})})]})},k=()=>{let e,t;let{data:s,setData:i}=(0,a.b)(),{layoutDraggable:c,setLayoutDraggable:d}=(0,m.l)(),x=(0,v.useRouter)(),w=(0,o.useRef)(null),j=s.session,k=s.printerSelected,S=async function(t){let s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;e=await b().getOrders(t,s),i(t=>({...t,orders:e,sorted:"NONE"}))},C=async e=>{t=await b().getPrinters(e),i(e=>({...e,printers:t}))},E=()=>{let e=localStorage.getItem("session");if((e=JSON.parse(e)).token)return e;throw Error("No session found local storage!")};return(0,o.useEffect)(()=>{if(console.log(s),!s.session)try{j=E(),console.log("Session found: ".concat(j)),i(e=>({...e,session:j}))}catch(e){return console.log(e),x.push("/")}try{S(j),C(j)}catch(e){console.log(e)}},[null==s?void 0:s.session]),(0,o.useEffect)(()=>{var e;k=(null==s?void 0:null===(e=s.printerSelected)||void 0===e?void 0:e.prnId)||0;try{S(j,k)}catch(e){console.log(e)}},[null==s?void 0:s.printerSelected]),(0,o.useEffect)(()=>(!0===s.autoRefresh&&j?w.current=setInterval(()=>{try{S(j,k)}catch(e){console.log(e)}},1e4):clearInterval(w.current),()=>{clearInterval(w.current)}),[null==s?void 0:s.autoRefresh,j,s.session,k]),(0,r.jsxs)(n,{children:[(0,r.jsxs)("div",{className:"sticky top-14 bg-white  z-50 flex h-9 flex-row",children:[(0,r.jsx)(f,{}),y()()?(0,r.jsxs)(N,{children:[(0,r.jsx)(g,{}),(0,r.jsxs)("div",{className:"flex flex-row items-center justify-around mt-1",children:[(0,r.jsx)(h,{}),(0,r.jsx)(p,{action:d})]})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(h,{}),(0,r.jsx)(g,{}),(0,r.jsx)(p,{action:d})]})]}),(0,r.jsx)(l.default,{draggable:c})]})}},5849:function(e,t,s){"use strict";s.d(t,{b:function(){return a},w:function(){return o}});var r=s(7822),l=s(5250);let n=(0,l.createContext)(),o=e=>{let{children:t}=e,[s,o]=(0,l.useState)({session:null,orders:null,printers:null,printerSelected:0,isRememberMe:!0,sorted:"NONE",autoRefresh:!1});return console.log(s),(0,r.jsx)(n.Provider,{value:{data:s,setData:o},children:t})},a=()=>{let e=(0,l.useContext)(n);if(!e)throw Error("useAppContext must be used within an AppProvider");return e}},7280:function(e,t,s){"use strict";s.d(t,{a:function(){return o},l:function(){return a}});var r=s(7822),l=s(5250);let n=(0,l.createContext)(),o=e=>{let{children:t}=e,[s,o]=(0,l.useState)(!1),[a,i]=(0,l.useState)([]);return(0,r.jsx)(n.Provider,{value:{layoutDraggable:s,setLayoutDraggable:o,layout:a,setLayout:i},children:t})},a=()=>{let e=(0,l.useContext)(n);if(console.log(e.layout),!e)throw Error("useLayoutContext must be used within an LayoutProvider");return e}},8429:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});let r=s(1801),l=r._(s(4221));s(7342);let n="https://bonsrv.aviv-pos.co.il:6443";e.exports=new class{constructor(){this.login=async(e,t)=>{let s;let r=n+"/kitchen/client/".concat(e,"/login");return console.log(r),await l.default.post(r,{userId:t}).then(e=>{200===e.status&&(s=e.data)}).catch(e=>(console.log(e),null)),s},this.askForNewOrders=async function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;if((null==e?void 0:e.token)===void 0||(null==e?void 0:e.clientId)===void 0)return[];let r="/kitchen/order/".concat(u,"/askForNewOrders/").concat(s);await l.default.post(n+r,t).then(e=>e.data).catch(e=>(console.log(e),[]))},this.updateOrderStatus=async(e,t)=>{let s;let r="Bearer "+t.token,o=t.clientId,a="/kitchen/order/".concat(o,"/update/").concat(e);return console.log(r),await l.default.get(n+a,{headers:{Authorization:r}}).then(e=>{s=200===e.status}).catch(e=>{console.log(e),s=!1}),s},this.getOrders=async(e,t)=>{let s;let r="Bearer "+e.token,o=e.clientId,a="/kitchen/order/".concat(o,"/getOrders/").concat(t);return await l.default.get(n+a,{headers:{Authorization:r}}).then(e=>s=e?e.data:e).catch(e=>(console.log(e),[])),s},this.getPrinters=async e=>{let t;let{clientId:s,token:r}=e;try{await l.default.get(n+"/kitchen/client/".concat(s,"/getPrinters"),{headers:{Authorization:"Bearer ".concat(r)}}).then(e=>(console.log("GetPrinters: ",e.data),(null==e?void 0:e.status)===200)?t=e.data:(console.log("GetPrinteres failed:",e.status),null))}catch(e){return console.log(e),null}return t}}}}}]);