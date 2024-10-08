(()=>{"use strict";var e,t={782:(e,t,s)=>{const l=window.wp.blocks,o=window.wp.i18n,n=window.React,a=window.wp.blockEditor,i=window.wp.components,r=window.wp.serverSideRender;var c=s.n(r);const p=window.wp.element,d=s.p+"images/placeholder-150x150.fcf7e1bf.png";function u(e){const{action:t,icon:s,setPosts:l,posts:a,setAttributes:i}=e;let{selectedPosts:r}=e;let c="add"===t?a:r;return!c||c.length<1?(0,n.createElement)(n.Fragment,null,(0,n.createElement)("div",{className:"post-list"},(0,o.__)("No Content Found.","content-views"))):(0,n.createElement)(n.Fragment,null,console.log(c.lastIndex,"sele"),(0,n.createElement)("div",{className:"post-list"},c?.length>0&&c.map(((e,o)=>(0,n.createElement)("article",{className:"post"},(0,n.createElement)("img",{className:"post-figure",src:e&&e?._embedded["wp:featuredmedia"]?e?._embedded["wp:featuredmedia"][0]?.media_details?.sizes?.thumbnail?.source_url:d}),(0,n.createElement)("span",{className:"post-body"},(0,n.createElement)("span",{className:"post-title"},e?.title?.rendered),(0,n.createElement)("span",{className:"post-meta"},(0,n.createElement)("span",{className:"post-date"},`Published On: ${window.moment(new Date(e?.date)).format("MMMM Do, YYYY")}`),(0,n.createElement)("span",{className:"post-author"},`By: ${e?._embedded.author[0]?.name}`))),"remove"===t&&(0,n.createElement)("span",{className:"button-directions"},o>0&&(0,n.createElement)("span",{className:"dashicons dashicons-arrow-up-alt",onClick:()=>{let e=[...r];e[o]=r[o-1],e[o-1]=r[o],i({selectedPosts:e}),console.log(r,"selectedPosts")}}),o+1<c.length&&(0,n.createElement)("span",{className:"dashicons dashicons-arrow-down-alt",onClick:()=>{let e=[...r];e[o]=r[o+1],e[o+1]=r[o],i({selectedPosts:e}),console.log(r,"selectedPosts")}})),(0,n.createElement)("button",{className:"button-action",type:"button",onClick:()=>"add"===t?(e=>{r.push(e);let t=a.filter((t=>t.id!==e.id));l(t)})(e):(e=>{let t=r?.findIndex((t=>t.id===e.id));r.splice(t,1),(e=>{if(-1===a.findIndex((t=>t.id===e.id))){let t=[...a];t.push(e),l(t)}})(e)})(e)},s))))))}function m(e){const{posts:t,selectedPosts:s,setPosts:l,attributes:i,setAttributes:r}=e,c=(0,n.createElement)(a.BlockIcon,{icon:"plus"}),d=(0,n.createElement)(a.BlockIcon,{icon:"minus"}),[m,v]=(0,p.useState)("");return(0,n.createElement)("div",{className:"post-selectorContainer"},(0,n.createElement)("div",{className:"post-selectorAdd"},(0,n.createElement)("div",{className:"searchbox"},(0,n.createElement)("label",{htmlFor:"searchinput"},(0,n.createElement)("input",{id:"searchinput",type:"search",placeholder:(0,o.__)("Please enter your search query...","content-views"),value:m,onChange:e=>{v(e.target.value);const{postType:t,postCount:s,orderBy:o,order:n}=i;let a="post"===t?"posts":"pages";wp.apiFetch({path:`/wp/v2/${a}?orderby=${o}&order=${n}&per_page=${s}&_embed=1&search=${e.target.value}`}).then((e=>{l(e)}))}}))),(0,n.createElement)(u,{posts:t,selectedPosts:s,action:"add",icon:c,setPosts:l})),(0,n.createElement)("div",{className:"post-selectorRemove"},(0,n.createElement)(u,{posts:t,selectedPosts:s,action:"remove",icon:d,setPosts:l,setAttributes:r})))}const v=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","name":"content-views/content-views-layouts","version":"0.1.0","title":"Content Layouts","category":"content-layouts","icon":"dashicons dashicons-screenoptions","description":"Displays different layouts for content types","keywords":["Content","content-types","layouts"],"supports":{"html":false},"textdomain":"content-views","attributes":{"postType":{"type":"string","default":"post"},"postView":{"type":"string","default":"all"},"postCount":{"type":"number","default":20},"postLayout":{"type":"string","default":"grid"},"selectedPosts":{"type":"array","default":[]},"orderBy":{"type":"string","default":"date"},"order":{"type":"string","default":"desc"},"displayDate":{"type":"boolean","default":true},"displayAuthor":{"type":"boolean","default":true},"displayTaxonomies":{"type":"boolean","default":true},"pagination":{"type":"string","default":"numbers"}},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":["file:./view.js"]}');(0,l.registerBlockType)(v,{edit:function({attributes:e,setAttributes:t,clientId:s}){const{postType:l,postView:r,postCount:d,postLayout:u,orderBy:v,order:b,displayDate:w,displayAuthor:h,displayTaxonomies:y,pagination:g}=e;let{selectedPosts:_}=e;const[f,E]=(0,p.useState)([]),[C,S]=(0,p.useState)(!1),[T,k]=(0,p.useState)({}),[P,N]=(0,p.useState)([]),j=e=>{let t=`/wp/v2/${"post"===e?"posts":"pages"}?orderby=${v}&order=${b}&_embed=1`;if(_?.length>0){let e=[];_.map((t=>{e.push(t.id)})),t=`${t}&exclude=${e.join()}`}"all"===l&&(t=`${t}&per_page=${d}`),wp.apiFetch({path:t}).then((e=>{N(e)}))};function x(){let e;"single-line-scroll"===u?e=jQuery(".wp-block-content-views-layouts-view.view-block.single-line-scroll").slick({infinite:!1,slidesToShow:3,slidesToScroll:1,arrows:!0,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]}):"double-line-scroll"===u&&(e=jQuery(".wp-block-content-views-layouts-view.view-block.double-line-scroll").slick({infinite:!1,slidesToShow:2,slidesToScroll:1,arrows:!0,responsive:[{breakpoint:1024,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]})),k(e)}(0,p.useEffect)((()=>{(()=>{let e=[],t=["attachment","nav_menu_item","wp_block","wp_template","wp_template_part","wp_navigation"];wp.apiFetch({path:"/wp/v2/types"}).then((s=>{Object.values(s).forEach((function(s){t.includes(s.slug)||(e.push({label:s.name,value:s.slug}),E(e))}))}))})(),"single-line-scroll"!==u&&"double-line-scroll"!==u||0===Object.keys(T).length&&setTimeout((()=>x()),1e3)}),[]),(0,p.useEffect)((()=>{"single-line-scroll"!==u&&"double-line-scroll"!==u||(T&&0===Object.keys(T).length?x():(T.slick("unslick"),setTimeout((()=>{x()}),1e3))),"collapsible"===u&&setTimeout((function(){jQuery(".collapsible-content").hide(),jQuery(".collapsible-header").on("click",(function(){jQuery(this).parent().siblings(".post-item").find(".collapsible-content").slideUp(),jQuery(this).parent().siblings(".post-item").find(".collapsible-header").removeClass("active"),jQuery(this).next(".collapsible-content").slideToggle(),jQuery(this).toggleClass("active")}))}),1e3)}),[u]);const O=(0,a.useBlockProps)();return(0,n.createElement)("div",{...O},(0,n.createElement)(a.InspectorControls,null,(0,n.createElement)(i.PanelBody,{title:(0,o.__)("Content Settings","content-views")},(0,n.createElement)(i.SelectControl,{label:(0,o.__)("Content Type","content-views"),value:l,onChange:e=>{t({postType:e,selectedPosts:[]}),C&&j(e)},options:f}),(0,n.createElement)(i.SelectControl,{label:(0,o.__)("Content Layout","content-views"),value:u,onChange:e=>{t({postLayout:e})},options:[{label:(0,o.__)("Tiles","content-views"),value:"tiles"},{label:(0,o.__)("Grid","content-views"),value:"grid"},{label:(0,o.__)("Single Row Scrollable","content-views"),value:"single-line-scroll"},{label:(0,o.__)("Double Row Scrollable","content-views"),value:"double-line-scroll"},{label:(0,o.__)("1-4 Posts Vertical Layout","content-views"),value:"vertical"},{label:(0,o.__)("1-4 Posts Horizontal Layout","content-views"),value:"horizontal"},{label:(0,o.__)("Collapsible","content-views"),value:"collapsible"}]}),("tiles"===u||"grid"===u)&&(0,n.createElement)(i.SelectControl,{label:(0,o.__)("Content Pagination","content-views"),value:g,onChange:e=>t({pagination:e}),options:[{label:(0,o.__)("1,2,..n","content-views"),value:"numbers"},{label:(0,o.__)("<<Prev Next>>","content-views"),value:"prevnext"},{label:(0,o.__)("Infinite Scroll","content-views"),value:"infinite-scroll"}]}),(0,n.createElement)(i.SelectControl,{label:(0,o.__)("Content View","content-views"),id:"content-type-selector",value:r,onChange:e=>t({postView:e}),options:[{label:(0,o.__)("Selected Posts","content-views"),value:"selected"},{label:(0,o.__)("All Posts","content-views"),value:"all"}]})),(0,n.createElement)(i.PanelBody,{title:(0,o.__)("Data Settings","content-views")},"all"===r&&(0,n.createElement)(i.RangeControl,{label:(0,o.__)("Number of Posts to display","content-views"),value:d,onChange:e=>t({postCount:parseInt(e)}),min:4,max:99,step:1}),(0,n.createElement)(i.SelectControl,{label:(0,o.__)("Order By","content-views"),value:v,onChange:e=>t({orderBy:e}),options:[{label:(0,o.__)("Published Date","content-views"),value:"date"},{label:(0,o.__)("Post Title","content-views"),value:"title"},{label:(0,o.__)("Selected Posts Order","content-views"),value:"include"}]}),(0,n.createElement)(i.SelectControl,{label:(0,o.__)("Order","content-views"),value:b,onChange:e=>t({order:e}),options:[{label:(0,o.__)("ASC","content-views"),value:"asc"},{label:(0,o.__)("DESC","content-views"),value:"desc"}]})),(0,n.createElement)(i.PanelBody,{title:(0,o.__)("Display Settings","content-views")},(0,n.createElement)(i.ToggleControl,{label:(0,o.__)("Display Date","content-views"),checked:w,onChange:e=>t({displayDate:e})}),(0,n.createElement)(i.ToggleControl,{label:(0,o.__)("Display Author","content-views"),checked:h,onChange:e=>t({displayAuthor:e})}),(0,n.createElement)(i.ToggleControl,{label:(0,o.__)("Display Taxonomies","content-views"),checked:y,onChange:e=>t({displayTaxonomies:e})}))),(0,n.createElement)("div",{className:"wp-block-content-views-layouts"},(0,n.createElement)("div",{className:"swap-buttons-wrapper"},"selected"===r&&(0,n.createElement)(n.Fragment,null,(0,n.createElement)("button",{className:"start-editing-btn is-primary components-button is-button is-default is-large",onClick:()=>{!1===C&&(j(l),S(!0),jQuery("#content-type-selector").attr("disabled",!0)),!0===C&&(S(!1),jQuery("#content-type-selector").attr("disabled",!1))}},!1===C?(0,o.__)("Select Posts","howmet"):(0,o.__)("Save","howmet")),C&&(0,n.createElement)("button",{className:"start-editing-btn cancel is-primary components-button is-button is-default is-large",onClick:()=>{!0===C&&(S(!1),jQuery("#content-type-selector").attr("disabled",!1))}},(0,o.__)("Cancel","howmet")),C&&(P?.length>0||_?.length>0)&&(0,n.createElement)(m,{posts:P,selectedPosts:_,setAttributes:t,setPosts:N,attributes:e}),!C&&_&&(0,n.createElement)(c(),{block:"content-views/content-views-layouts",httpMethod:"POST",attributes:{postType:l,postView:r,selectedPosts:_,postCount:d,postLayout:u,displayDate:w,displayAuthor:h,displayTaxonomies:y,pagination:g}})),"all"===r&&!C&&(0,n.createElement)(c(),{block:"content-views/content-views-layouts",httpMethod:"POST",attributes:{postType:l,postView:r,postCount:d,postLayout:u,orderBy:v,order:b,displayDate:w,displayAuthor:h,displayTaxonomies:y,pagination:g}}))))},save:function(){return null}})}},s={};function l(e){var o=s[e];if(void 0!==o)return o.exports;var n=s[e]={exports:{}};return t[e](n,n.exports,l),n.exports}l.m=t,e=[],l.O=(t,s,o,n)=>{if(!s){var a=1/0;for(p=0;p<e.length;p++){for(var[s,o,n]=e[p],i=!0,r=0;r<s.length;r++)(!1&n||a>=n)&&Object.keys(l.O).every((e=>l.O[e](s[r])))?s.splice(r--,1):(i=!1,n<a&&(a=n));if(i){e.splice(p--,1);var c=o();void 0!==c&&(t=c)}}return t}n=n||0;for(var p=e.length;p>0&&e[p-1][2]>n;p--)e[p]=e[p-1];e[p]=[s,o,n]},l.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return l.d(t,{a:t}),t},l.d=(e,t)=>{for(var s in t)l.o(t,s)&&!l.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},l.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;l.g.importScripts&&(e=l.g.location+"");var t=l.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var s=t.getElementsByTagName("script");if(s.length)for(var o=s.length-1;o>-1&&!e;)e=s[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),l.p=e+"../../../"})(),(()=>{var e={836:0,320:0};l.O.j=t=>0===e[t];var t=(t,s)=>{var o,n,[a,i,r]=s,c=0;if(a.some((t=>0!==e[t]))){for(o in i)l.o(i,o)&&(l.m[o]=i[o]);if(r)var p=r(l)}for(t&&t(s);c<a.length;c++)n=a[c],l.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return l.O(p)},s=globalThis.webpackChunkcontent_views=globalThis.webpackChunkcontent_views||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var o=l.O(void 0,[320],(()=>l(782)));o=l.O(o)})();