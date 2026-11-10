
const baseTools=[
["ChatGPT","💬","Chat","AI chatbot","https://chatgpt.com"],
["Gemini","✨","Chat","Google AI assistant","https://gemini.google.com"],
["DeepSeek","🧠","Chat","Reasoning and chat","https://chat.deepseek.com"],
["Grok","🚀","Chat","AI assistant","https://grok.com"],
["Claude","🤖","Chat","Writing and reasoning","https://claude.ai"],
["Perplexity","🔎","Chat","AI search engine","https://perplexity.ai"],
["NotebookLM","📚","Study","AI study notebook","https://notebooklm.google.com"],
["Khan Academy","🎓","Study","Learn subjects","https://khanacademy.org"],
["Quizlet","📝","Study","Flashcards","https://quizlet.com"],
["Replit","💻","Coding","Online coding","https://replit.com"],
["AI Studio","🛠️","Coding","Google AI development","https://aistudio.google.com"],
["Hugging Face","🤗","Coding","AI models and demos","https://huggingface.co"],
["GitHub","🐙","Coding","Code repositories","https://github.com"],
["Leonardo AI","🎨","Image","AI image generation","https://leonardo.ai"],
["Canva","🖌️","Image","Design and graphics","https://canva.com"],
["Photoroom","📸","Image","Photo editing","https://photoroom.com"],
["Remove.bg","✂️","Image","Remove background","https://remove.bg"],
["Ideogram","🖼️","Image","AI image creation","https://ideogram.ai"],
["PixVerse","🎬","Video","AI video creation","https://pixverse.ai"],
["Pika","🎥","Video","AI video generation","https://pika.art"],
["Runway","🎞️","Video","AI video tools","https://runwayml.com"],
["Poe","🗨️","Chat","Multiple AI bots","https://poe.com"],
["Gamma","📊","Productivity","AI presentations","https://gamma.app"],
["Copilot","🌐","Chat","Microsoft AI","https://copilot.microsoft.com"],
["Suno","🎵","Music","AI music creation","https://suno.com"],
["ElevenLabs","🎙️","Voice","AI voice and audio","https://elevenlabs.io"],
["Luma AI","🌌","Video","AI creative video","https://lumalabs.ai"],
["Lovable","💗","Coding","AI website builder","https://lovable.dev"],
["Bolt.new","⚡","Coding","AI coding and websites","https://bolt.new"],
["Kling AI","🎬","Video","AI video generation","https://klingai.com"],
["Udio","🎼","Music","AI music generation","https://udio.com"],
["Spline","🧊","3D","3D design","https://spline.design"],
["Cursor","🖱️","Coding","AI coding editor","https://cursor.com"],
["Notion AI","📓","Productivity","AI workspace","https://notion.so"],
["v0","⚙️","Coding","AI UI builder","https://v0.dev"],
["You.com","🔍","Research","AI research and search","https://you.com"],
["Mistral","🌬️","Chat","Mistral AI assistant","https://chat.mistral.ai"]
];

let custom=JSON.parse(localStorage.getItem("customTools")||"[]");
let favorites=JSON.parse(localStorage.getItem("favorites")||"[]");
let recent=JSON.parse(localStorage.getItem("recent")||"[]");
let tools=baseTools.map((x,i)=>({id:i,name:x[0],icon:x[1],cat:x[2],desc:x[3],url:x[4],custom:false}));

custom.forEach(t=>{
if(!tools.some(x=>x.url===t.url))tools.push(t);
});

let active="All";
const categories=["All","Chat","Study","Coding","Image","Video","Voice","Music","3D","Research","Productivity","Favorites"];

function save(){
localStorage.setItem("customTools",JSON.stringify(custom));
localStorage.setItem("favorites",JSON.stringify(favorites));
localStorage.setItem("recent",JSON.stringify(recent));
}

function makeTabs(){
document.getElementById("categoryTabs").innerHTML=categories.map(c=>
`<button class="category-btn ${active===c?'active':''}" onclick="setCategory('${c}')">${c}</button>`
).join("");
}

function setCategory(c){
active=c;makeTabs();render();
document.getElementById("toolsSection").scrollIntoView({behavior:"smooth"});
}
function exploreTools(){setCategory("All")}

function render(){
const q=document.getElementById("searchInput").value.toLowerCase();
const list=tools.filter(t=>
(active==="All"||t.cat===active||(active==="Favorites"&&favorites.includes(t.id)))&&
(t.name.toLowerCase().includes(q)||t.desc.toLowerCase().includes(q)||t.cat.toLowerCase().includes(q))
);
document.getElementById("toolGrid").innerHTML=list.length?list.map(t=>`
<div class="tool-card" onclick="details(${t.id})">
<div class="tool-icon">${t.icon}</div><h3>${t.name}</h3><p>${t.desc}</p>
<div class="tool-actions">
<button onclick="event.stopPropagation();toggleFav(${t.id})">${favorites.includes(t.id)?"⭐":"☆"}</button>
<button class="launch" onclick="event.stopPropagation();launch(${t.id})">Launch ↗</button>
${t.custom?`<button onclick="event.stopPropagation();deleteTool(${t.id})">✕</button>`:""}
</div></div>`).join(""):"<p>No tools found.</p>";
updateDashboard();
}

function toggleFav(id){
favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];
save();render();
}
function launch(id){
const t=tools.find(x=>x.id===id);if(!t)return;
recent=[id,...recent.filter(x=>x!==id)].slice(0,8);
save();updateDashboard();
window.open(t.url,"_blank");
}
function details(id){
const t=tools.find(x=>x.id===id);if(!t)return;
document.getElementById("toolDetails").innerHTML=`
<h3>${t.icon} ${t.name}</h3><p>${t.desc}</p>
<p><b>Category:</b> ${t.cat}</p>
<p><b>Access:</b> Free/Paid features may vary.</p>
<button class="primary-btn" onclick="launch(${id})">Launch ↗</button>`;
document.querySelector(".details-section").scrollIntoView({behavior:"smooth"});
}
function findAI(){
const q=document.getElementById("finderInput").value.toLowerCase();
let cats=[];
if(/study|math|learn|school|quiz|notes/.test(q))cats.push("Study");
if(/code|website|program|app|developer/.test(q))cats.push("Coding");
if(/image|photo|logo|design|thumbnail/.test(q))cats.push("Image");
if(/video|edit|animation|reel/.test(q))cats.push("Video");
if(/voice|audio|speech/.test(q))cats.push("Voice");
if(/music|song|beat/.test(q))cats.push("Music");
if(/3d|model/.test(q))cats.push("3D");
if(/research|search|source/.test(q))cats.push("Research");
if(/presentation|organize|productivity/.test(q))cats.push("Productivity");
if(/chat|question|answer|write|explain/.test(q))cats.push("Chat");
if(!cats.length)cats=["Chat"];
const result=tools.filter(t=>cats.includes(t.cat)).slice(0,8);
document.getElementById("finderResults").innerHTML=result.map(t=>
`<div class="finder-result" onclick="launch(${t.id})">${t.icon} <b>${t.name}</b> — ${t.desc}</div>`
).join("");
}
function quickSearchAI(){
const q=document.getElementById("quickSearch").value.toLowerCase();
const result=tools.filter(t=>t.name.toLowerCase().includes(q)||t.desc.toLowerCase().includes(q)||t.cat.toLowerCase().includes(q)).slice(0,8);
document.getElementById("quickResults").innerHTML=q?result.map(t=>
`<div class="quick-item"><span>${t.icon} <b>${t.name}</b><br><small>${t.desc}</small></span><button onclick="launch(${t.id})">Launch ↗</button></div>`
).join(""):"";
}
function setupCompare(){
const opts=tools.map(t=>`<option value="${t.id}">${t.name}</option>`).join("");
document.getElementById("compareA").innerHTML=opts;
document.getElementById("compareB").innerHTML=opts;
if(tools.length>1)document.getElementById("compareB").selectedIndex=1;
}
function compareAI(){
const a=tools.find(t=>t.id===Number(document.getElementById("compareA").value));
const b=tools.find(t=>t.id===Number(document.getElementById("compareB").value));
if(!a||!b)return;
if(a.id===b.id)return alert("Select two different tools.");
document.getElementById("compareResult").innerHTML=`
<div class="compare-grid">
<div class="compare-card"><h3>${a.icon} ${a.name}</h3><p>Category: ${a.cat}</p><p>${a.desc}</p><button class="primary-btn" onclick="launch(${a.id})">Launch ↗</button></div>
<div class="compare-card"><h3>${b.icon} ${b.name}</h3><p>Category: ${b.cat}</p><p>${b.desc}</p><button class="primary-btn" onclick="launch(${b.id})">Launch ↗</button></div>
</div>`;
}
function openAddTool(){
const name=prompt("AI tool name?");if(!name)return;
const url=prompt("Website URL (https://...)");
if(!url||!url.startsWith("https://"))return alert("Enter valid HTTPS URL");
const cat=prompt("Category: Chat, Study, Coding, Image, Video, Voice, Music, 3D, Research, Productivity","Chat");
const id=Date.now();
const item={id,name,icon:"🌐",cat:categories.includes(cat)?cat:"Chat",desc:"Custom AI tool",url,custom:true};
custom.push(item);tools.push(item);save();render();setupCompare();
}
function deleteTool(id){
custom=custom.filter(t=>t.id!==id);tools=tools.filter(t=>t.id!==id);
favorites=favorites.filter(x=>x!==id);recent=recent.filter(x=>x!==id);
save();render();setupCompare();
}
function miniCard(t){
return `<div class="mini-tool" onclick="launch(${t.id})"><div class="tool-icon">${t.icon}</div><h3>${t.name}</h3><p>${t.desc}</p></div>`;
}
function updateDashboard(){
document.getElementById("totalTools").textContent=tools.length;
document.getElementById("totalFav").textContent=favorites.length;
const daily=tools[Math.floor(Date.now()/86400000)%tools.length];
document.getElementById("dailyTool").innerHTML=miniCard(daily);
const r=recent.map(id=>tools.find(t=>t.id===id)).filter(Boolean);
document.getElementById("recentTools").innerHTML=r.length?r.map(miniCard).join(""):"<p>No recent tools yet.</p>";
const trend=tools.filter(t=>["ChatGPT","Gemini","Claude","Copilot","Suno","Bolt.new"].includes(t.name));
document.getElementById("trendingTools").innerHTML=trend.map(miniCard).join("");
}
document.getElementById("themeBtn").onclick=()=>{
document.body.classList.toggle("light");
const light=document.body.classList.contains("light");
localStorage.setItem("theme",light?"light":"dark");
document.getElementById("themeBtn").textContent=light?"🌙":"☀️";
};
if(localStorage.getItem("theme")!=="light")document.body.classList.remove("light");
document.getElementById("themeBtn").textContent=document.body.classList.contains("light")?"🌙":"☀️";
makeTabs();setupCompare();render();
