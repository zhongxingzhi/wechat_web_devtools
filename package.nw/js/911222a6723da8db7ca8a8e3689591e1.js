'use strict';!function(require,directRequire){const a=require('fs'),b=require('path'),c=require('mkdir-p'),d=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),e=require('./551bb965e1f344281d555a429cd2140c.js'),f=require('./aca8387a2744eff1c61b81cdb985e514.js'),g=require('./a89be4febc57a81e9865a060f74e14c8.js'),h=require('./1bd2563d13db26950ae47494b2c34454.js'),i=require('./3d1dfba33285839f5aa317a53698f4c5.js'),j=require('./1f28f42c846af07c2adfb1a5eb2d92b6.js'),k=require('./59a4de6f8f83ea2bc7d7a501d45d5c9d.js'),l=require('./3bfffbe88b3d923921f851c0697974fe.js'),m=require('./162bf2ee28b76d3b3d95b685cede4146.js'),n=require('./efc820e1b92d6e4063535296d4a24213.js'),o=require('./common/locales/index.js'),p=require('./949d8235c744ced2a80121e4dba34c28.js'),q=require('./9fdd4ac31a05c27355910f0d74accd4c.js'),{Weappdest:r}=require('./92320c1386e6db6a6f2556736a9bc280.js'),s=require('./da7c31daaf542cf1796023d8e344b98a.js'),t=()=>{};module.exports=function(a,h){if(a.attr&&a.attr.gameApp){const b=require('./d120b9f76f645b79bc31fb8dd10f8067.js');return b(a,h)}const m=h.onProgressUpdate||t;return new Promise(async(n,o)=>{let p=a.compileType;m('checkfilestart','\u6B63\u5728\u68C0\u67E5\u6587\u4EF6');try{await d(a,h),await e(a,h),await f(a,h),p==q.plugin&&(await g(a,h))}catch(a){return o(a)}m('checkfileend','\u68C0\u67E5\u6587\u4EF6\u5B8C\u6210');l.getCurrentConfig();const u=1*new Date;let v=b.join(r,`${+new Date}`);c.sync(v);try{m('compilejsfilestart','\u6B63\u5728\u7F16\u8BD1 JS \u6587\u4EF6'),await i(a,{distPath:v,onProgressUpdate:m,onFilesIgnored:h.onFilesIgnored||t}),m('compilejsfilestart','\u7F16\u8BD1 JS \u6587\u4EF6\u5B8C\u6210'),m('compileotherfilestart','\u6B63\u5728\u7F16\u8BD1\u5176\u4ED6\u6587\u4EF6'),await j(a,{distPath:v}),await k(a,{distPath:v}),m('compileotherfileend','\u7F16\u8BD1\u5176\u4ED6\u6587\u4EF6\u5B8C\u6210')}catch(a){return o(a)}const w=1*new Date;return s('client_pack_source_time',a.appid,`${w-u}`),n(v)})}}(require('lazyload'),require);