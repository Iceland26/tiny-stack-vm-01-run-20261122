const f=require('fs'),I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',T={1:17,2:65,3:4,4:6,5:10,6:11,7:15,16:9,17:9,18:9,19:9,20:9,21:9,22:9,23:5,24:9,25:9,26:9,27:5,28:9,29:9,30:9,32:9,33:9,34:9,48:32,49:36,50:36,51:32,52:0,64:5,65:8,80:4,81:4,82:1,83:4};
for(const d of f.readdirSync(I).sort()){
const p=f.readFileSync(I+'/'+d+'/program.bin'),n=p.length,q=f.readFileSync(I+'/'+d+'/input.bin');
let D=new Int32Array(256),s=0,C=new Int32Array(64),c=0,M=new Int32Array(256),o=new Uint8Array(65536),l=0,j=0,x=0,t=0,e=0;
for(;;){
if(t==1e6){e=10;break}
if(x<0||x>=n){e=9;break}
let k=p[x];
if(k==0){e=0;break}
let v=T[k];
if(v===undefined){e=5;break}
let m=v>>4,u=(v>>2)&3,w=v&3;
if(x+m>=n){e=9;break}
t++;
if(s<u){e=2;break}
if(s-u+w>256){e=3;break}
x+=1+m;
if(k==1)D[s++]=(p[x-1]<<24)>>24;
else if(k==2)D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;
else if(k==3)s--;
else if(k==4){D[s]=D[s-1];s++}
else if(k==5){let y=D[s-1];D[s-1]=D[s-2];D[s-2]=y}
else if(k==6){D[s]=D[s-2];s++}
else if(k==7){let a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a}
else if(k==23)D[s-1]=-D[s-1]|0;
else if(k==27)D[s-1]=~D[s-1];
else if(k>15&&k<35&&k!=31){let a=D[s-2],b=D[s-1];if(b==0&&(k==19||k==20||k==21||k==22)){e=4;break}s-=2;D[s++]=[a+b,a-b,Math.imul(a,b),(a/b)|0,a%b|0,Math.floor((a>>>0)/(b>>>0))|0,(a>>>0)%(b>>>0)|0,a&b,a|b,a^b,a<<b,a>>b,a>>>b,a==b?1:0,a<b?1:0,(a>>>0)<(b>>>0)?1:0][k-16-(k>23)-(k>27)-(k>31)]|0}
else if(k==48)x+=((p[x-2]|p[x-1]<<8)<<16)>>16;
else if(k==49||k==50){let y=D[--s];if((k==49)==(y==0))x+=((p[x-2]|p[x-1]<<8)<<16)>>16}
else if(k==51){if(c==64){e=7;break}C[c++]=x;x=p[x-2]|p[x-1]<<8}
else if(k==52){if(c==0){e=8;break}x=C[--c]}
else if(k==64){let a=D[s-1];if(a<0||a>255){e=6;break}D[s-1]=M[a]}
else if(k==65){let a=D[s-1];if(a<0||a>255){e=6;break}s-=2;M[a]=D[s]}
else if(k==80){let y=String(D[s-1]);if(l+y.length>65536){e=11;break}s--;for(let z=0;z<y.length;z++)o[l++]=y.charCodeAt(z)}
else if(k==81){if(l>=65536){e=11;break}o[l++]=D[--s]&255}
else if(k==82)D[s++]=j<q.length?q[j++]:-1;
else if(k==83){e=D[--s]&255;break}
}
f.mkdirSync(O+'/'+d,{recursive:true});
f.writeFileSync(O+'/'+d+'/stdout.bin',o.subarray(0,l));
f.writeFileSync(O+'/'+d+'/exit.txt',e+'\n');
}
