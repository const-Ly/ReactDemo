import{u as e,a,r as s,j as c,N as n}from"./index-05e6b3e9.js";const i="_main_hf8ka_1",t="_uploadFileContainer_hf8ka_8",l="_uploadFile_hf8ka_8",r="_uploadImg_hf8ka_25",o="_avatar_hf8ka_32",m="_inputContainer_hf8ka_38",d="_title_hf8ka_46",h=["一名年轻的创业者，他性格坚毅果断，喜欢热爱工作，偶尔喜欢独自漫步。爱好读书和旅行。喜欢吃披萨和寿司，讨厌辣椒。梦想是建立自己的企业，成为行业领军人物。印象最深的事是在大学毕业典礼上，他收获了学业的硕果，感受到亲友的鼓励和祝福。","一名年轻的广告公司设计师，他性格活泼开朗，喜欢在工作中发挥创意，偶尔喜欢参加派对。爱好摄影和绘画。喜欢吃披萨和冰淇淋，讨厌苦瓜。梦想是成为国际知名的设计师，设计出影响人们生活的优秀作品。印象最深的事是在一次设计比赛中，他意外获得冠军，为自己赢得的荣誉而自豪。","一名年轻的医生，他性格温和善良，喜欢照顾患者，偶尔喜欢在医院花园散步。爱好音乐和绘画。喜欢吃寿司和水果沙拉，讨厌辣椒。梦想是成为一名卓越的医学专家，为更多的人带来健康和希望。印象最深的事是在一次紧急手术中，他成功挽救了一个患者的生命，让他意识到医生的责任和使命。","一名年轻的作家，他性格内向文静，喜欢独自创作，偶尔喜欢参加文学沙龙。爱好读书和写作。喜欢吃巧克力和披萨，讨厌洋葱。梦想是成为畅销书作家，让更多人读到他的文字。印象最深的事是在一次旅行中，他遇到一位独特的老人，老人的故事和智慧深深地触动了他。","一名程序员,他性格认真务实,喜欢写代码,偶尔出去跑步。爱好看科技资讯和听音乐。喜欢吃披萨和汉堡,讨厌苦瓜。梦想是创办一家科技公司。印象最深的事是第一次参加编程比赛获得冠军。"],g=["一名服装设计师,她性格活泼开朗,喜欢逛街购物,偶尔参加健身房运动。爱好绘画和打太极拳,喜欢吃土豆丝和火锅,讨厌苹果。梦想是开创自己的服装品牌。印象最深的事是高中参加校园歌唱大赛获得第二名的时刻。","一名时尚设计师,她性格活泼大方,喜欢逛街购物,偶尔参加化妆舞会。爱好时尚杂志和美食料理,喜欢吃法餐和甜品,讨厌青菜。梦想是成为知名品牌的首席设计师。印象最深的事是高中时第一次自己设计服装参加校园时装秀。",'一名时尚编辑,她性格傲气十足,喜欢购物消费,偶尔参加 PINN 模特大赛。爱好看时尚杂志和逛博览会,喜欢吃牛排和蛋糕,讨厌青菜。梦想是成为时尚界的女王。印象最深的事是高中时被同学评为"最有时尚品味"。',"一名画家,她性格热情大方,喜欢绘画写生,偶尔进行形式主义艺术创作。爱好听古典音乐和阅读文学名著,喜欢吃披萨和寿司,讨厌茄子。梦想是举办个人画展。印象最深的事是初中美术课上老师表扬她的绘画作品。","一名打工妹,她性格活泼开朗,喜欢逛街购物,偶尔参加舞蹈课。爱好唱歌和做美食,喜欢吃寿司和水果,讨厌芒果。梦想是成为一名歌手。印象最深的事是获得过歌唱比赛的冠军。"];let p=-1;function x(){const x=e(),[u,v]=a("agentData",{}),[j,f]=s.useState(u.avatar||""),[N,b]=s.useState(u.nickname||""),[_,w]=s.useState(u.characters.join("")),[k,A]=s.useState(""),[C,S]=s.useState(u.persona||""),[T,y]=s.useState(u.greeting||""),[F,I]=s.useState(!1);return s.useEffect((()=>{""!==u.gender&&A(u.gender?"M":"F")}),[]),s.useEffect((()=>{I(!!(j&&N&&_&&k&&C&&T))}),[j,N,_,k,C,T]),c.jsxs("div",{className:"add-model-page",children:[c.jsx(n,{isBack:!0,content:"创建AI角色基本信息"}),c.jsxs("main",{className:`${i} fl-center`,children:[c.jsxs("div",{className:t,children:[c.jsx("img",{src:j||"https://img.cacheserv.com/web/webai/upload-img-icon.png",className:`${r} ${j?o:""}`}),c.jsx("input",{className:l,type:"file",onChange:function(e){const a=e.target.files[0];if(!a)return;const s=new FileReader;s.onload=e=>{const a=e.target.result;f(a)},s.readAsDataURL(a)}})]}),c.jsxs("form",{style:{width:"100%"},onSubmit:function(e){e.preventDefault(),F&&(v({nickname:N,avatar:j,characters:_.split(" "),persona:C,gender:"M"==k,greeting:T,voice:"",createTime:""}),x("/profile?edit=1"))},children:[c.jsxs("div",{className:m,children:[c.jsx("div",{className:d,children:"TA的昵称"}),c.jsx("input",{value:N,style:{border:"none"},placeholder:"你的AI角色叫什么",onChange:e=>b(e.target.value)})]}),c.jsxs("div",{className:m,children:[c.jsx("div",{className:d,children:"TA的关键词"}),c.jsx("input",{value:_,style:{border:"none"},placeholder:"描述TA的关键词，用空格分隔",onChange:e=>w(e.target.value)})]}),c.jsxs("div",{className:"input-container",children:[c.jsx("div",{className:"title",children:"TA的性别"}),c.jsxs("div",{className:"fl-center geder-select",children:[c.jsxs("div",{onClick:()=>A("M"),className:"fl-center male",children:[c.jsx("img",{src:"M"==k?"https://img.cacheserv.com/web/webai/confirm-icon.png":"https://img.cacheserv.com/web/webai/aircle-icon.png",className:"icon"}),c.jsx("div",{className:"text",children:"男"}),c.jsx("img",{src:"https://img.cacheserv.com/web/webai/male-icon.png",className:"icon"})]}),c.jsxs("div",{onClick:()=>A("F"),className:"fl-center female",children:[c.jsx("img",{src:"F"==k?"https://img.cacheserv.com/web/webai/confirm-icon.png":"https://img.cacheserv.com/web/webai/aircle-icon.png",className:"icon"}),c.jsx("div",{className:"text",children:"女"}),c.jsx("img",{src:"https://img.cacheserv.com/web/webai/famale-icon.png",className:"icon"})]})]})]}),c.jsxs("div",{className:"input-container",children:[c.jsxs("div",{className:"title fl-center",children:[c.jsx("span",{children:"TA的人设"}),c.jsxs("div",{onClick:function(){p+=1,5==p&&(p=0),S("M"==k?h[p]:g[p])},className:"random-text fl-center",children:[c.jsx("img",{src:"https://img.cacheserv.com/web/webai/refresh-icon-18.png"}),c.jsx("span",{children:"随机生成"})]})]}),c.jsx("textarea",{value:C,style:{height:"140px"},placeholder:"AI角色的人物设定，包括性格、爱好、经历等",onChange:e=>S(e.target.value)})]}),c.jsxs("div",{className:"input-container",children:[c.jsx("div",{className:"title fl-center",children:c.jsx("span",{children:"TA的开场白"})}),c.jsx("textarea",{value:T,style:{maxHeight:"68px"},placeholder:"TA说的第一句话",onChange:e=>y(e.target.value)})]}),c.jsx("button",{className:"confrim-btn fl-center "+(F?"confrim-btn-active":""),type:"submit",children:"下一步"})]})]})]})}export{x as default};