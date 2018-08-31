'use strict';!function(require,directRequire){async function a(){const a=document.querySelector('.simulator'),b=a.getBoundingClientRect(),c=a.children[0].offsetHeight,d=a.children[1].offsetHeight;I=parseInt((c+d)*y),J=parseInt((b.height-c-d-28)*y),window._captured=E={},F=global.contentWindow.innerWidth*y,G=global.contentWindow.innerHeight*y,H=F*G,console.warn('init attr',F,G,I,J);const e=new l(F,G,4294967295);K=await new Promise((a,b)=>e.getBuffer(l.MIME_PNG,(c,d)=>{c?b(c):a(d)})),window.blankImg=e,window.blankImgBuffer=K,r.saveScreenShot('./tmp/blank.png',K,{encoding:null});const f=nw.App.argv.indexOf('--capture-interval');if(0<f){const a=parseInt(nw.App.argv[f+1]);a&&(A=a)}const g=nw.App.argv.indexOf('--phash');if(0<g){const a=parseInt(nw.App.argv[g+1]);a&&(B=a)}const h=nw.App.argv.indexOf('--pixel-match');if(0<h){const a=parseInt(nw.App.argv[h+1]);a&&(C=a)}console.warn('[data-graber] init done')}function b({withSimilarity:b=!1,threshold:a}={}){return new Promise(async(d)=>{try{const e={},f=x(),h=f.simulator,i=h.currentWebviewID,j=h.webviewInfos;let k=j[i];e.currentPagePath=k.pathName,e.currentPageTitle=k.navigationBar.title,e.currentPageQuery=o.stringify(k.query||{});let l=20;const m=[k.pathName];for(;-1!=k.parent&&(k=j[k.parent],m.unshift(k.pathName),!(0>=--l)););e.pageStack=m,e.waitRequestTime=+new Date,await w.manager.onceWebviewStable(i),e.waitRequestTime=+new Date-e.waitRequestTime,global.appConfig.isDev&&console.warn('done waiting request',(e.waitRequestTime/1e3).toFixed(1)),global.Win.capturePage(async(f)=>{if(e.screenshot=f,b){let b=1;if(E[e.currentPagePath]&&E[e.currentPagePath].length)try{b=await g(E[e.currentPagePath][E[e.currentPagePath].length-1].screenshot,e.screenshot)}catch(a){s.error(`[data-grabber] compute similarity catch error: ${a.toString()}`)}if(void 0!==a){if(b<a)return d({result:{screenshot:'',percent:b,similar:!0}});e.similar=!1}e.percent=b,d({result:e})}else d({result:e});c(e.currentPagePath,e)},{format:'png',datatype:'datauri'})}catch(a){d({err:a})}})}function c(a,b){E[a]||(E[a]=[]),E[a].push(b),3<E[a].length&&E[a].shift()}function d(a,b){return`auto-${a.fid}-${a.force?'f':''}-${a.timings.startTime}.${b}`}async function e(a){function b(a){return new Promise((b)=>{p(a,async()=>{b()})})}return await b(a),await b(k.join(a,'screenshot')),await b(k.join(a,'html')),!0}function f(){const a=[];for(const b in E)for(const c of E[b])a.push({pagestack:c.pageStack,path:c.currentPagePath,pic:c.imgPath,html:c.htmlPath,level:c.pageStack.length,title:c.currentPageTitle});return JSON.stringify(a,null,2)}async function g(a,b){const{buffer:c}=h(a),{buffer:d}=h(b);let e,f;await Promise.all([i(c).then((a)=>e=a),i(d).then((a)=>f=a)]);const g=e.bitmap.width*y*(e.bitmap.height*y),j=n(e.bitmap.data,f.bitmap.data,null,e.bitmap.width,e.bitmap.height,{threshold:0.05});return console.warn(j,g),j/g}function h(a){const b=a.match(M),c=b[1],d=Buffer.from(b[2],'base64');return{buffer:d,fileType:c}}function i(a){return new Promise((b,c)=>{l.read(a,(a,d)=>{a?c(a):b(d)})})}const j=require('fs'),k=require('path'),l=require('jimp'),m=require('jimp/phash'),n=require('pixelmatch'),o=require('querystring'),p=require('mkdir-p'),q=require('./a7261ee5e1a26dddf8d07b048ad1c94d.js'),r=require('./9ead4f4fcb341fc49568df129b578fa7.js'),s=require('./72653d4b93cdd7443296229431a7aa9a.js'),t=require('./bc78839ccca8df9e5ceeb7fae11b7be2.js'),u=require('./48132d4235aa3724c9c3c6ed22f39e63.js'),v=require('./3bfffbe88b3d923921f851c0697974fe.js'),w=require('./87822abadd12d18b00ea00716f2410f6.js'),x=t.getState.bind(this),y=window.devicePixelRatio;let z,A=500,B=0.01,C=0.01;let D='./tmp',E={};window._captured=E;let F,G,H,I,J,K,L=1;const M=/^data:image\/(.+);base64,(.+)$/;module.exports={start:async function(){if(!z){try{await a()}catch(b){s.error(`[data-grabber] init datagrabber failed, try again...\nreason: ${b.toString()}`);try{await a()}catch(a){return void s.error(`[data-grabber] init datagrabber failed again, exit...\nreason:${a.toString()}`)}}return z=setInterval(async()=>{try{await b()}catch(a){global.appConfig.isDev&&console.error(a)}},A),z}},stop:async function(){function a(a){return a.map((a)=>new Promise((b)=>{j.writeFile(a.path,a.data,{encoding:null},(c)=>{c&&s.error(`[data-grabber] write file ${a.path} failed with error : ${c.toString()}`),b()})}))}if(!z)return;if(clearInterval(z),z=null,global.online){const a=v.getCurrent();a&&(D=k.join(a.projectpath,'../result'))}await e(D);let b=0,c=0;for(const a in E){for(let d=0,e=E[a].length;d<e;d++){c++;try{if(E[a][d].mustKeep)continue;const c=E[a][d].image.bitmap;for(let f=d+1;f<e;f++){const e=E[a][f].image.bitmap,g=n(c.data,e.data,null,c.width,c.height,{threshold:0.05});if(g/H<=C){global.appConfig.isDev?E[a][d].fid+=`-d-${E[a][f].fid}-${(g/H).toFixed(5)}.png`:E[a][d]=null,b++;break}}}catch(b){console.error(`[data-grabber] error while finalizing: ${b}`,E[a][d])}}E[a]=E[a].filter((a)=>a)}s.info('[data-grabber] num of images discarded',b,'out of',c);let g=+new Date;const h=[];for(const a in E)for(const b of E[a])h.push({path:k.join(D,'screenshot',d(b,'png')),data:b.buffer}),h.push({path:k.join(D,'html',d(b,'html')),data:b.html});for(const b in await Promise.all(a(h)),E)for(const a of E[b])delete a.image,delete a.buffer,delete a.html;await r.saveText(k.join(D,'ide-result-map.json'),JSON.stringify(E,null,2)),await r.saveText(k.join(D,'ide-result.json'),f()),g=+new Date-g,s.info(`[data-grabber] save result time: ${g}`)},capture:b,waitUntilGrabberCaptured:async function(){return u.statusManager.current===u.STATUS.FREE?void 0:await Promise.race([u.statusManager.onceEnterStatus(u.STATUS.FREE),new Promise((a)=>setTimeout(a,1e3))])}}}(require('lazyload'),require);