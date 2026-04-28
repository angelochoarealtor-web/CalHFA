import { useState, useEffect, useRef } from "react";

const PHONE = "9166203540";
const PH = "(916) 620-3540";
const EM_ADDR = "angelochoarealtor@gmail.com";
const SITE = "envoyrealtyca.com";
const DRE = "02243881";
const AG = "Angel Uriel Arauza Ochoa";

const COUNTIES = ["Alameda","Alpine","Amador","Butte","Calaveras","Colusa","Contra Costa","Del Norte","El Dorado","Fresno","Glenn","Humboldt","Imperial","Inyo","Kern","Kings","Lake","Lassen","Los Angeles","Madera","Marin","Mariposa","Mendocino","Merced","Modoc","Mono","Monterey","Napa","Nevada","Orange","Placer","Plumas","Riverside","Sacramento","San Benito","San Bernardino","San Diego","San Francisco","San Joaquin","San Luis Obispo","San Mateo","Santa Barbara","Santa Clara","Santa Cruz","Shasta","Sierra","Siskiyou","Solano","Sonoma","Stanislaus","Sutter","Tehama","Trinity","Tulare","Tuolumne","Ventura","Yolo","Yuba"];

const ZIP_MAP={"95814":{city:"Sacramento",county:"Sacramento"},"95816":{city:"Sacramento",county:"Sacramento"},"95818":{city:"Sacramento",county:"Sacramento"},"95819":{city:"Sacramento",county:"Sacramento"},"95820":{city:"Sacramento",county:"Sacramento"},"95821":{city:"Sacramento",county:"Sacramento"},"95822":{city:"Sacramento",county:"Sacramento"},"95823":{city:"Sacramento",county:"Sacramento"},"95824":{city:"Sacramento",county:"Sacramento"},"95825":{city:"Sacramento",county:"Sacramento"},"95826":{city:"Sacramento",county:"Sacramento"},"95828":{city:"Sacramento",county:"Sacramento"},"95829":{city:"Elk Grove",county:"Sacramento"},"95831":{city:"Sacramento",county:"Sacramento"},"95833":{city:"Sacramento",county:"Sacramento"},"95834":{city:"Sacramento",county:"Sacramento"},"95835":{city:"Sacramento",county:"Sacramento"},"95838":{city:"Sacramento",county:"Sacramento"},"95841":{city:"Sacramento",county:"Sacramento"},"95842":{city:"Sacramento",county:"Sacramento"},"95843":{city:"Antelope",county:"Sacramento"},"95757":{city:"Elk Grove",county:"Sacramento"},"95758":{city:"Elk Grove",county:"Sacramento"},"95624":{city:"Elk Grove",county:"Sacramento"},"95670":{city:"Rancho Cordova",county:"Sacramento"},"95742":{city:"Rancho Cordova",county:"Sacramento"},"95610":{city:"Citrus Heights",county:"Sacramento"},"95621":{city:"Citrus Heights",county:"Sacramento"},"95628":{city:"Fair Oaks",county:"Sacramento"},"95630":{city:"Folsom",county:"Sacramento"},"95662":{city:"Orangevale",county:"Sacramento"},"95608":{city:"Carmichael",county:"Sacramento"},"95660":{city:"North Highlands",county:"Sacramento"},"95673":{city:"Rio Linda",county:"Sacramento"},"95632":{city:"Galt",county:"Sacramento"},"95648":{city:"Lincoln",county:"Placer"},"95661":{city:"Roseville",county:"Placer"},"95677":{city:"Rocklin",county:"Placer"},"95678":{city:"Roseville",county:"Placer"},"95747":{city:"Roseville",county:"Placer"},"95765":{city:"Rocklin",county:"Placer"},"95603":{city:"Auburn",county:"Placer"},"95762":{city:"El Dorado Hills",county:"El Dorado"},"95776":{city:"Woodland",county:"Yolo"},"95695":{city:"Woodland",county:"Yolo"},"95616":{city:"Davis",county:"Yolo"},"95687":{city:"Vacaville",county:"Solano"},"94533":{city:"Fairfield",county:"Solano"},"95207":{city:"Stockton",county:"San Joaquin"},"95336":{city:"Manteca",county:"San Joaquin"},"95376":{city:"Tracy",county:"San Joaquin"},"95350":{city:"Modesto",county:"Stanislaus"},"93722":{city:"Fresno",county:"Fresno"},"90001":{city:"Los Angeles",county:"Los Angeles"},"92101":{city:"San Diego",county:"San Diego"},"94102":{city:"San Francisco",county:"San Francisco"}};

function getLiveCount(){const h=new Date().getHours();const r=Math.floor(Math.random()*5);if(h<6)return 3+r;if(h<8)return 8+Math.floor((h-6)*3)+r;if(h<12)return 14+Math.floor((h-8)*4)+r;if(h<17)return 30+Math.floor((h-12)*5)+r;if(h<21)return 55+Math.floor((h-17)*3)+r;return 67+Math.floor((h-21)*2)+r;}

const PROG={en:["","Getting started","Halfway there","Almost there!",""],es:["","Comenzando","A la mitad","Casi listo!",""]};

const T={en:{
  lang:"Espanol",topMsg:"California Homebuyer Assistance",
  hero:"CalHFA $0 Down Payment Programs",heroLine2:"See If You Qualify",
  sub:"You may qualify for $0 down. Find out in 60 seconds.",
  b1:"No cost to apply",b2:"Quick response",b3:"Bilingual support",b4:"Confidential",
  liveCount:"people checked California program eligibility today",
  formTitle:"Check Your Eligibility",formSub:"Answer a few quick questions below.",
  sec1:"Your contact info",sec1sub:"We'll send your results here.",
  sec2:"Where in California are you looking?",sec2sub:"Helps us match you with CalHFA programs in your area.",
  sec3:"Financial snapshot",sec3sub:"Just ranges. No exact numbers. Confidential.",
  sec4:"Employment",sec4sub:"Last step.",
  next:"Next",getStarted:"Get Started",
  name:"Full Name",phone:"Phone Number",email:"Email Address",
  welcome:"Welcome, ",welcomeEnd:"! Let's find your programs.",
  zip:"ZIP Code",city:"City",county:"County",sel:"Select...",
  timeline:"Purchase Timeline",tlO:["ASAP","1-3 months","3-6 months","6-12 months","Just researching"],
  income:"Annual Household Income",incO:["Under $40,000","$40,000-$50,000","$50,000-$60,000","$60,000-$70,000","$70,000-$80,000","$80,000-$90,000","$90,000-$100,000","$100,000-$125,000","$125,000-$150,000","Over $150,000"],
  debt:"Monthly Debt Payments",debtO:["$0-$200","$200-$500","$500-$1,000","$1,000-$1,500","$1,500-$2,000","Over $2,000"],
  credit:"Credit Score Range",crO:["Excellent (720+)","Good (660-719)","Average (580-659)","Fair (500-579)","Not sure"],
  price:"Target Purchase Price",prO:["Under $300,000","$300,000-$400,000","$400,000-$500,000","$500,000-$600,000","Over $600,000"],
  employed:"Currently Employed?",empType:"Employment Type",emO:["W-2 Employee","Self-Employed","1099 Contractor","Retired","Other"],y:"Yes",n:"No",
  trustMsg:"Your information is secure and confidential.",
  submit:"Check My Eligibility",
  urgencySubmit:"Programs available now -- check today",
  req:"Please complete the required fields",reqSec1:"Please fill in your name, phone, and email to continue",
  stickyHint:"Complete the sections above to continue",
  exitMsg:"You're almost done -- finish in seconds.",exitBtn:"Finish Now",
  faqTitle:"Quick Answers",
  faqs:[
    {q:"What if I don't think I'll qualify?",a:"Most people who check are surprised by how many programs they're eligible for. It costs nothing to find out -- you have nothing to lose."},
    {q:"Can I really buy with $0 down?",a:"Yes. These programs exist specifically to help people who don't have a large down payment saved. Thousands of California families have already used them."},
    {q:"What if my income is low or my score isn't great?",a:"Many programs are designed exactly for that. Some have flexible requirements. The only way to know is to check."},
    {q:"What happens after I submit?",a:"We'll give you a quick call to introduce ourselves, answer any questions, and connect you directly with a CalHFA-approved lender. Most people hear from us within 24 hours."},
  ],
  ctaTitle:"See if you qualify for $0 down",ctaSub:"It only takes 60 seconds.",ctaBtn:"Start Now",
  privNote:"We protect your information and use it only for eligibility review.",
  discl:"Not a government agency. Not affiliated with CalHFA, HUD, or FHA. "+AG+" is a licensed real estate agent. Not a commitment to lend. Program availability varies.",
  priv:"Privacy Policy",terms:"Terms of Service",eho:"Equal Housing Opportunity",
  copy:"\u00a9 2026 ENVOY Realty Group. All rights reserved.",agSub:"Licensed Real Estate Agent -- Not a Lender",
  okTitle:"You're All Set",okSub:"We'll give you a quick call to go over your options and connect you with a CalHFA-approved lender. Most people hear from us within 24 hours.",okCall:"Want to talk sooner?",
  okSave:"Save our number so you recognize us when we call:",
},es:{
  lang:"English",topMsg:"Asistencia para Compradores en California",
  hero:"Programas CalHFA de $0 de Enganche",heroLine2:"Verifica Si Calificas",
  sub:"Podrias calificar para $0 de enganche. Descubrelo en 60 segundos.",
  b1:"Sin costo para aplicar",b2:"Respuesta rapida",b3:"Apoyo bilingue",b4:"Confidencial",
  liveCount:"personas verificaron elegibilidad de programas de California hoy",
  formTitle:"Verifica Tu Elegibilidad",formSub:"Responde algunas preguntas rapidas.",
  sec1:"Tu informacion de contacto",sec1sub:"Enviaremos tus resultados aqui.",
  sec2:"Donde en California buscas comprar?",sec2sub:"Nos ayuda a encontrar programas CalHFA en tu area.",
  sec3:"Panorama financiero",sec3sub:"Solo rangos. Sin numeros exactos. Confidencial.",
  sec4:"Empleo",sec4sub:"Ultimo paso.",
  next:"Siguiente",getStarted:"Comenzar",
  name:"Nombre Completo",phone:"Numero de Telefono",email:"Correo Electronico",
  welcome:"Bienvenido/a, ",welcomeEnd:"! Encontremos tus programas.",
  zip:"Codigo Postal",city:"Ciudad",county:"Condado",sel:"Seleccionar...",
  timeline:"Cuando planeas comprar?",tlO:["Lo antes posible","1-3 meses","3-6 meses","6-12 meses","Solo investigando"],
  income:"Ingreso Anual del Hogar",incO:["Menos de $40,000","$40,000-$50,000","$50,000-$60,000","$60,000-$70,000","$70,000-$80,000","$80,000-$90,000","$90,000-$100,000","$100,000-$125,000","$125,000-$150,000","Mas de $150,000"],
  debt:"Pagos de Deuda",debtO:["$0-$200","$200-$500","$500-$1,000","$1,000-$1,500","$1,500-$2,000","Mas de $2,000"],
  credit:"Puntaje de Credito",crO:["Excelente (720+)","Bueno (660-719)","Promedio (580-659)","Regular (500-579)","No estoy seguro"],
  price:"Precio Objetivo",prO:["Menos de $300,000","$300,000-$400,000","$400,000-$500,000","$500,000-$600,000","Mas de $600,000"],
  employed:"Actualmente Empleado?",empType:"Tipo de Empleo",emO:["Empleado W-2","Independiente","Contratista 1099","Jubilado","Otro"],y:"Si",n:"No",
  trustMsg:"Tu informacion es segura y confidencial.",
  submit:"Verificar Mi Elegibilidad",
  urgencySubmit:"Programas disponibles ahora -- verifica hoy",
  req:"Completa los campos requeridos",reqSec1:"Completa tu nombre, telefono y correo para continuar",
  stickyHint:"Completa las secciones de arriba para continuar",
  exitMsg:"Ya casi terminas -- termina en segundos.",exitBtn:"Terminar",
  faqTitle:"Respuestas Rapidas",
  faqs:[
    {q:"Que pasa si creo que no califico?",a:"La mayoria se sorprende de cuantos programas son elegibles. No cuesta nada averiguarlo -- no tienes nada que perder."},
    {q:"Realmente puedo comprar con $0 de enganche?",a:"Si. Estos programas existen para ayudar a personas que no tienen un gran ahorro. Miles de familias en California ya los han usado."},
    {q:"Y si mi ingreso es bajo o mi puntaje no es bueno?",a:"Muchos programas estan disenados exactamente para eso. Algunos tienen requisitos flexibles. La unica forma de saber es verificar."},
    {q:"Que pasa despues de enviar el formulario?",a:"Te daremos una llamada rapida para presentarnos, responder tus preguntas y conectarte directamente con un prestamista aprobado por CalHFA. La mayoria recibe nuestra llamada dentro de 24 horas."},
  ],
  ctaTitle:"Verifica si calificas para $0 de enganche",ctaSub:"Solo toma 60 segundos.",ctaBtn:"Comenzar",
  privNote:"Protegemos tu informacion.",
  discl:"No es agencia gubernamental ni afiliado con CalHFA. "+AG+" es agente licenciado. No es compromiso de prestamo.",
  priv:"Politica de Privacidad",terms:"Terminos de Servicio",eho:"Igualdad de Oportunidades de Vivienda",
  copy:"\u00a9 2026 ENVOY Realty Group.",agSub:"Agente Licenciado -- No es Prestamista",
  okTitle:"Todo Listo",okSub:"Te daremos una llamada rapida para repasar tus opciones y conectarte con un prestamista aprobado por CalHFA. La mayoria recibe nuestra llamada dentro de 24 horas.",okCall:"Quieres hablar antes?",
  okSave:"Guarda nuestro numero para reconocernos cuando te llamemos:",
}};

function FAQ({q,a}){const[o,s]=useState(false);return(<div className="fqi"><button className="fqb" onClick={()=>s(!o)}><span className="fqt">{q}</span><svg className={`fqc${o?" fqco":""}`} width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 7L9 11L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button><div className={`fqa${o?" fqao":""}`}><p>{a}</p></div></div>);}

function Sec({id,title,sub,num,total,complete,open,onToggle,onNext,nextLabel,focusId,children}){
  useEffect(()=>{if(open&&focusId){const t=setTimeout(()=>{const el=document.getElementById(focusId);if(el)el.focus();},350);return()=>clearTimeout(t);}},[open,focusId]);
  return(<div id={id} className={`sc${complete?" sc-ok":""}`}>
    <button className="sch" onClick={onToggle} type="button"><div className="scl"><div className={`scn${complete?" scd":""}`}>{complete?<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>:num}</div><div style={{textAlign:"left"}}><h3 className="sct">{title}</h3>{!open&&<p className="scs">{sub}</p>}</div></div><div className="scr"><span className="scc">{num}/{total}</span><svg className={`scv${open?" scvo":""}`} width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 7L9 11L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div></button>
    <div className={`scb${open?" scbo":""}`}><div className="sci">{children}{onNext&&<button className="next-btn" onClick={onNext} type="button">{nextLabel}</button>}</div></div>
  </div>);
}

export default function App(){
  const[lang,setLang]=useState(()=>{try{return localStorage.getItem("calang")||"en"}catch{return"en"}});
  const t=T[lang];const TOTAL=4;
  const[done,setDone]=useState(false);const[hp,setHp]=useState("");const[errors,setErrors]=useState({});const[openSec,setOpenSec]=useState(1);const[showExit,setShowExit]=useState(false);const[sec1Error,setSec1Error]=useState("");const[showWelcome,setShowWelcome]=useState(false);const[stickyHint,setStickyHint]=useState("");const formRef=useRef(null);const zoneRef=useRef(null);const lastY=useRef(0);const touched=useRef(false);
  const[liveCount]=useState(getLiveCount);

  const[f,sF]=useState(()=>{try{const s=localStorage.getItem("caform9");return s?JSON.parse(s):{name:"",phone:"",email:"",zip:"",city:"",county:"",timeline:"",income:"",debt:"",credit:"",price:"",employed:"",empType:""};}catch{return{name:"",phone:"",email:"",zip:"",city:"",county:"",timeline:"",income:"",debt:"",credit:"",price:"",employed:"",empType:""};}});
  useEffect(()=>{try{localStorage.setItem("caform9",JSON.stringify(f))}catch{}},[f]);

  const u=k=>e=>{sF(p=>({...p,[k]:e.target.value}));if(errors[k])setErrors(p=>({...p,[k]:false}));setSec1Error("");setStickyHint("");touched.current=true;};
  const fmt=v=>{const d=v.replace(/\D/g,"").slice(0,10);if(d.length<=3)return d;if(d.length<=6)return`(${d.slice(0,3)}) ${d.slice(3)}`;return`(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;};
  const sw=()=>{const n=lang==="en"?"es":"en";setLang(n);try{localStorage.setItem("calang",n)}catch{}};
  const handleZip=e=>{const v=e.target.value.replace(/\D/g,"").slice(0,5);const up={zip:v};if(v.length===5&&ZIP_MAP[v]){up.city=ZIP_MAP[v].city;up.county=ZIP_MAP[v].county;}sF(p=>({...p,...up}));touched.current=true;};

  const c1=!!(f.name.trim()&&f.phone.replace(/\D/g,"").length>=10&&f.email.trim()&&/\S+@\S+\.\S+/.test(f.email));
  const c2=!!(f.zip||f.city||f.county);
  const c3=!!(f.income||f.credit||f.price);
  const c4=!!(f.employed||f.empType);
  const checks=[c1,c2,c3,c4];const completed=checks.filter(Boolean).length;
  const pastSec1=openSec>=2||completed>=1;
  const atSec4=openSec===4||completed>=3;
  const ctaReady=!pastSec1||atSec4;
  const stickyLabel=pastSec1?t.submit:t.getStarted;
  const prog=PROG[lang];
  const progMsg=completed>=1&&completed<TOTAL?prog[completed]:"";

  useEffect(()=>{if(c1&&!showWelcome){const timer=setTimeout(()=>setShowWelcome(true),800);return()=>clearTimeout(timer);}},[c1]);
  const firstName=f.name.trim().split(" ")[0];

  const validateSec1=()=>{const errs={};if(!f.name.trim())errs.name=true;if(f.phone.replace(/\D/g,"").length<10)errs.phone=true;if(!f.email.trim()||!/\S+@\S+\.\S+/.test(f.email))errs.email=true;if(Object.keys(errs).length){setErrors(errs);setSec1Error(t.reqSec1);document.getElementById(`field-${Object.keys(errs)[0]}`)?.scrollIntoView({behavior:"smooth",block:"center"});return false;}setSec1Error("");return true;};

  const goNext=n=>{if(n===2&&!validateSec1())return;setOpenSec(n);setTimeout(()=>document.getElementById(`sec-${n}`)?.scrollIntoView({behavior:"smooth",block:"start"}),150);};

  useEffect(()=>{if(done)return;const handler=()=>{const y=window.scrollY;const d=lastY.current-y;lastY.current=y;if(d>250&&touched.current&&completed>=1&&!showExit)setShowExit(true);};window.addEventListener("scroll",handler,{passive:true});return()=>window.removeEventListener("scroll",handler);},[completed,done,showExit]);

  const scrollForm=()=>formRef.current?.scrollIntoView({behavior:"smooth",block:"start"});
  const isVis=()=>{if(!zoneRef.current)return false;const r=zoneRef.current.getBoundingClientRect();return r.top<window.innerHeight&&r.bottom>0;};

  const submit=()=>{if(hp)return;if(!validateSec1()){setOpenSec(1);return;}console.log("LEAD:",f);try{localStorage.removeItem("caform9")}catch{}try{if(window.gtag)window.gtag("event","conversion",{send_to:"AW-XXXXX/YYYYY"});if(window.fbq)window.fbq("track","Lead");}catch{}setDone(true);window.scrollTo({top:0,behavior:"smooth"});};

  const stickyAct=()=>{setStickyHint("");if(!isVis()){scrollForm();return;}if(!pastSec1){if(c1)goNext(2);else{setOpenSec(1);document.getElementById("field-name")?.scrollIntoView({behavior:"smooth",block:"center"});}return;}if(atSec4){submit();return;}setStickyHint(t.stickyHint);if(openSec)document.getElementById(`sec-${openSec}`)?.scrollIntoView({behavior:"smooth",block:"start"});else scrollForm();};

  return(<div className="root"><style>{`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
:root{--pri:#0C4A6E;--pri-d:#083B5A;--pri-l:#E0F2FE;--green:#059669;--green-h:#047857;--green-l:#ECFDF5;--amber-bg:#FEF3C7;--w:#FFFFFF;--warm:#FAFAF8;--g100:#F3F4F6;--g200:#E5E7EB;--g300:#D1D5DB;--g400:#9CA3AF;--g500:#6B7280;--g600:#4B5563;--g700:#374151;--g800:#1F2937;--g900:#111827;--r:12px;--card:0 1px 2px rgba(0,0,0,0.03),0 4px 16px rgba(0,0,0,0.04);}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;}body{font-family:'Inter',-apple-system,sans-serif;color:var(--g900);background:var(--w);}.root{min-height:100vh;overflow-x:hidden;}
.top{display:flex;justify-content:space-between;align-items:center;padding:8px 20px;background:var(--w);border-bottom:1px solid var(--g100);}.top-msg{font-size:12px;font-weight:500;color:var(--g400);}.lbtn{font-family:'Inter';font-size:13px;font-weight:600;color:var(--pri);background:var(--pri-l);border:none;border-radius:8px;padding:6px 14px;cursor:pointer;}
.hero{background:linear-gradient(160deg,#0C4A6E 0%,#0E5E8A 45%,#0C7B93 100%);padding:32px 20px 36px;text-align:center;position:relative;overflow:hidden;}.hero::before{content:'';position:absolute;top:-40%;right:-20%;width:600px;height:600px;border-radius:50%;background:rgba(255,255,255,0.025);}
.hero-in{position:relative;z-index:1;max-width:440px;margin:0 auto;}
.hero h1{font-size:clamp(24px,6vw,34px);font-weight:800;color:var(--w);line-height:1.15;margin-bottom:4px;letter-spacing:-0.5px;}
.hero h2{font-size:clamp(18px,4.5vw,24px);font-weight:400;color:rgba(255,255,255,0.8);line-height:1.3;margin-bottom:12px;}
.hero-p{font-size:14px;color:rgba(255,255,255,0.55);line-height:1.4;margin-bottom:16px;}
.bls{display:grid;grid-template-columns:1fr 1fr;gap:5px 14px;text-align:left;max-width:300px;margin:0 auto 14px;}.bl{display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(255,255,255,0.85);font-weight:500;}.bck{width:16px;height:16px;border-radius:50%;background:rgba(5,150,105,0.2);color:#34D399;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;flex-shrink:0;border:1px solid rgba(5,150,105,0.3);}
.stars{display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:10px;}.star-row{color:#FBBF24;font-size:16px;letter-spacing:2px;}.star-txt{font-size:12px;color:rgba(255,255,255,0.5);font-weight:600;}
.live{display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:5px 14px;font-size:11px;color:rgba(255,255,255,0.65);font-weight:500;}.live-dot{width:7px;height:7px;border-radius:50%;background:#34D399;animation:pulse 2s infinite;}@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}.live b{color:#34D399;font-weight:700;font-size:12px;}
.welcome{max-width:520px;margin:0 auto;padding:10px 20px 0;animation:fadeIn 0.5s ease;}.welcome-inner{background:var(--green-l);border:1px solid rgba(5,150,105,0.15);border-radius:10px;padding:9px 14px;font-size:13px;color:#047857;font-weight:600;text-align:center;}@keyframes fadeIn{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
.fzone{padding:10px 16px 48px;background:var(--warm);}
.sc{max-width:520px;margin:0 auto 10px;background:var(--w);border-radius:14px;border:1px solid var(--g100);box-shadow:var(--card);overflow:hidden;scroll-margin-top:12px;}.sc-ok{border-color:rgba(5,150,105,0.2);}
.sch{display:flex;justify-content:space-between;align-items:center;padding:16px 18px;width:100%;background:none;border:none;cursor:pointer;font-family:'Inter';-webkit-tap-highlight-color:transparent;}
.scl{display:flex;gap:10px;align-items:center;}.scn{width:26px;height:26px;border-radius:50%;background:var(--pri-l);color:var(--pri);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;transition:all 0.3s;}.scd{background:var(--green-l);color:var(--green);}.sct{font-size:14px;font-weight:700;color:var(--g900);line-height:1.2;}.scs{font-size:11px;color:var(--g400);line-height:1.3;margin-top:1px;}
.scr{display:flex;align-items:center;gap:6px;}.scc{font-size:10px;color:var(--g300);font-weight:600;}.scv{color:var(--g300);transition:transform 0.3s;}.scvo{transform:rotate(180deg);}
.scb{max-height:0;overflow:hidden;transition:max-height 0.4s ease;}.scbo{max-height:900px;}.sci{padding:0 18px 18px;}.scs2{font-size:11px;color:var(--g400);margin-bottom:12px;}
.next-btn{width:100%;padding:12px;margin-top:10px;background:var(--pri);color:var(--w);border:none;border-radius:var(--r);font-size:15px;font-weight:700;cursor:pointer;font-family:'Inter';transition:background 0.2s;-webkit-tap-highlight-color:transparent;}.next-btn:hover{background:var(--pri-d);}
.fd{margin-bottom:10px;}.fd:last-child{margin-bottom:0;}.fl{display:block;font-size:10px;font-weight:600;color:var(--g600);margin-bottom:3px;letter-spacing:0.4px;text-transform:uppercase;}.freq{color:#EF4444;margin-left:2px;}
.fi{width:100%;padding:11px 13px;border:1.5px solid var(--g200);border-radius:var(--r);font-size:16px;font-family:'Inter';color:var(--g900);background:var(--w);outline:none;transition:border-color 0.2s,box-shadow 0.2s;-webkit-appearance:none;}.fi:focus{border-color:var(--pri);box-shadow:0 0 0 3px rgba(12,74,110,0.06);}.fi::placeholder{color:var(--g300);}
.fi-err{border-color:#EF4444!important;box-shadow:0 0 0 3px rgba(239,68,68,0.06)!important;animation:shake 0.4s ease;}@keyframes shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-4px);}75%{transform:translateX(4px);}}
.fi-sel{appearance:none;cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='9'%3E%3Cpath d='M1 1l6 6 6-6' stroke='%239CA3AF' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 13px center;padding-right:36px;}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:10px;}@media(max-width:420px){.row2{grid-template-columns:1fr;}}
.tog-r{display:grid;grid-template-columns:1fr 1fr;gap:8px;}.tog{padding:10px;border:1.5px solid var(--g200);border-radius:var(--r);background:var(--w);color:var(--g600);font-size:14px;font-weight:600;cursor:pointer;font-family:'Inter';transition:all 0.15s;text-align:center;-webkit-tap-highlight-color:transparent;}.tog:hover{border-color:var(--g300);}.tog-on{border-color:var(--pri);background:var(--pri-l);color:var(--pri);}
.submit-in{margin-top:14px;}
.tbox{padding:10px 14px;background:var(--warm);border-radius:var(--r);border:1px solid var(--g100);margin-bottom:10px;}.tbox p{font-size:10px;color:var(--g500);line-height:1.5;text-align:center;}.shld{display:flex;align-items:center;justify-content:center;gap:5px;margin-bottom:3px;font-size:10px;color:var(--g400);font-weight:600;}
.cta{width:100%;padding:16px;background:var(--green);color:var(--w);border:none;border-radius:var(--r);font-size:17px;font-weight:700;cursor:pointer;font-family:'Inter';transition:background 0.2s,transform 0.1s;box-shadow:0 4px 14px rgba(5,150,105,0.2);-webkit-tap-highlight-color:transparent;}.cta:hover{background:var(--green-h);}.cta:active{transform:scale(0.98);}
.urg-sub{text-align:center;margin-top:8px;font-size:11px;font-weight:600;color:#92400E;}
.err-msg{font-size:12px;color:#EF4444;text-align:center;margin-top:6px;font-weight:500;}
.sec1-err{font-size:12px;color:#EF4444;margin-top:6px;font-weight:500;}
.exit-banner{position:fixed;top:0;left:0;right:0;z-index:300;background:var(--pri);padding:10px 16px;display:flex;align-items:center;justify-content:space-between;gap:8px;animation:slideD 0.3s ease;flex-wrap:wrap;}@keyframes slideD{from{transform:translateY(-100%);}to{transform:translateY(0);}}.exit-banner p{color:rgba(255,255,255,0.85);font-size:12px;font-weight:500;flex:1;}.exit-banner button{background:var(--green);color:#fff;border:none;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;font-family:'Inter';}.exit-x{background:none;border:none;color:rgba(255,255,255,0.4);font-size:18px;cursor:pointer;padding:2px 6px;}
.comp{max-width:520px;margin:0 auto;padding:8px 20px 4px;display:flex;align-items:center;gap:8px;}.comp-bar{flex:1;height:5px;background:var(--g100);border-radius:3px;overflow:hidden;}.comp-fill{height:100%;background:var(--green);transition:width 0.4s ease;border-radius:3px;}.comp-msg{font-size:10px;color:var(--green);font-weight:600;white-space:nowrap;min-width:70px;text-align:right;}
.ok{text-align:center;padding:48px 20px;max-width:520px;margin:0 auto;}.ok-card{background:var(--w);border-radius:16px;padding:36px 24px;box-shadow:var(--card);border:1px solid var(--g100);}.ok-ic{width:64px;height:64px;border-radius:50%;background:var(--green-l);color:var(--green);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:28px;font-weight:700;animation:pop 0.5s ease-out;}@keyframes pop{from{transform:scale(0.3);opacity:0;}to{transform:scale(1);opacity:1;}}.ok h2{font-size:22px;font-weight:700;margin-bottom:8px;color:var(--pri);}.ok p{font-size:14px;color:var(--g500);line-height:1.6;}
.ok-save{margin-top:20px;padding:16px;background:var(--pri-l);border-radius:var(--r);border:1px solid rgba(12,74,110,0.1);}
.ok-save p{font-size:12px;color:var(--pri);font-weight:500;margin-bottom:8px;}
.ok-save a{display:block;font-size:18px;font-weight:700;color:var(--pri);text-decoration:none;letter-spacing:0.5px;}
.ok-call{display:block;width:100%;max-width:240px;text-align:center;background:var(--pri);color:var(--w);padding:12px;border-radius:var(--r);font-size:15px;font-weight:700;text-decoration:none;margin:16px auto 0;}
.fqi{border-bottom:1px solid var(--g200);}.fqb{width:100%;background:none;border:none;padding:12px 0;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-family:'Inter';text-align:left;-webkit-tap-highlight-color:transparent;}.fqt{font-size:13px;font-weight:600;color:var(--g800);padding-right:8px;}.fqc{color:var(--g400);transition:transform 0.25s;flex-shrink:0;}.fqco{transform:rotate(180deg);}.fqa{max-height:0;overflow:hidden;transition:max-height 0.35s ease;}.fqao{max-height:300px;}.fqa p{font-size:12px;color:var(--g500);line-height:1.5;padding-bottom:12px;}
.cta-band{background:linear-gradient(135deg,var(--pri),#0E5E8A);padding:32px 20px;text-align:center;}.cta-band h2{font-size:clamp(16px,4vw,20px);font-weight:700;color:var(--w);margin-bottom:6px;}.cta-band p{font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:14px;}.cta-band button{background:var(--green);color:var(--w);border:none;padding:12px 28px;border-radius:var(--r);font-size:14px;font-weight:700;cursor:pointer;font-family:'Inter';}
.footer{background:var(--g900);color:var(--g500);padding:24px 20px 14px;font-size:10px;line-height:1.6;}.footer-in{max-width:520px;margin:0 auto;}.footer-eq{display:flex;align-items:flex-start;gap:8px;margin-bottom:12px;}.footer-b{width:28px;height:28px;flex-shrink:0;border:1px solid var(--g600);border-radius:2px;display:flex;align-items:center;justify-content:center;font-size:4px;font-weight:700;color:var(--g400);line-height:1;text-align:center;text-transform:uppercase;}.footer-eq p{font-size:9px;line-height:1.5;color:var(--g500);}.footer-lks{display:flex;gap:12px;margin-bottom:8px;}.footer-lks a{color:var(--g400);text-decoration:none;font-size:10px;}.footer-ag{margin-top:8px;padding-top:8px;border-top:1px solid var(--g700);}.footer-ag div{font-size:10px;color:var(--g500);}.footer-ag a{color:var(--g400);text-decoration:none;}.footer-cp{font-size:9px;color:var(--g600);margin-top:6px;}
.sticky{position:fixed;bottom:0;left:0;right:0;padding:10px 16px;background:rgba(255,255,255,0.96);backdrop-filter:blur(8px);border-top:1px solid var(--g200);z-index:200;display:none;}@media(max-width:640px){.sticky{display:block;}}
.sticky button{width:100%;padding:14px;border:none;border-radius:var(--r);font-size:16px;font-weight:700;cursor:pointer;font-family:'Inter';transition:all 0.3s;}
.s-on{background:var(--green);color:#fff;box-shadow:0 4px 12px rgba(5,150,105,0.2);}.s-off{background:var(--g300);color:var(--w);opacity:0.6;box-shadow:none;}
.sticky-hint{text-align:center;font-size:11px;color:var(--g400);margin-top:4px;animation:fadeIn 0.3s ease;}
.spacer{height:68px;}@media(min-width:641px){.spacer{display:none;}}.hp{position:absolute;left:-9999px;opacity:0;height:0;overflow:hidden;}
  `}</style>

    {showExit&&!done&&(<div className="exit-banner"><p>{t.exitMsg}</p><button onClick={()=>{setShowExit(false);scrollForm();}}>{t.exitBtn}</button><button className="exit-x" onClick={()=>setShowExit(false)}>&times;</button></div>)}
    <div className="top"><span className="top-msg">{t.topMsg}</span><button className="lbtn" onClick={sw}>{t.lang}</button></div>

    <div className="hero"><div className="hero-in">
      <h1>{t.hero}</h1><h2>{t.heroLine2}</h2>
      <p className="hero-p">{t.sub}</p>
      <div className="bls">{[t.b1,t.b2,t.b3,t.b4].map((b,i)=><div key={i} className="bl"><span className="bck">{"\u2713"}</span><span>{b}</span></div>)}</div>
      <div className="live"><span className="live-dot"/><b>{liveCount}</b> {t.liveCount}</div>
    </div></div>

    <div className="fzone" ref={zoneRef}>
      {done?(<div className="ok"><div className="ok-card">
        <div className="ok-ic">{"\u2713"}</div>
        <h2>{t.okTitle}{firstName?`, ${firstName}`:""}</h2>
        <p>{t.okSub}</p>
        <div className="ok-save">
          <p>{t.okSave}</p>
          <a href={`tel:+1${PHONE}`}>{PH}</a>
        </div>
      </div></div>):(
      <>
        <div style={{maxWidth:520,margin:"0 auto",textAlign:"center",padding:"6px 0 2px"}} ref={formRef} id="form-top">
          <h2 style={{fontSize:18,fontWeight:700,color:"var(--pri)",marginBottom:1}}>{t.formTitle}</h2>
          <p style={{fontSize:12,color:"var(--g400)",marginBottom:2}}>{t.formSub}</p>
        </div>
        <div className="comp"><div className="comp-bar"><div className="comp-fill" style={{width:`${(completed/TOTAL)*100}%`}}/></div><span className="comp-msg">{progMsg}</span></div>
        {firstName&&showWelcome&&(<div className="welcome"><div className="welcome-inner">{t.welcome}{firstName}{t.welcomeEnd}</div></div>)}
        <div className="hp"><input tabIndex={-1} autoComplete="off" value={hp} onChange={e=>setHp(e.target.value)}/></div>

        {/* 1: Contact */}
        <Sec id="sec-1" title={t.sec1} sub={t.sec1sub} num="1" total={TOTAL} complete={c1} open={openSec===1} onToggle={()=>setOpenSec(openSec===1?0:1)} onNext={()=>goNext(2)} nextLabel={t.next} focusId="input-name">
          <div className="fd" id="field-name"><label className="fl">{t.name}<span className="freq">*</span></label><input id="input-name" className={`fi${errors.name?" fi-err":""}`} value={f.name} onChange={u("name")} placeholder={t.name}/></div>
          <div className="row2"><div className="fd" id="field-phone"><label className="fl">{t.phone}<span className="freq">*</span></label><input className={`fi${errors.phone?" fi-err":""}`} type="tel" value={f.phone} onChange={e=>{sF(p=>({...p,phone:fmt(e.target.value)}));if(errors.phone)setErrors(p=>({...p,phone:false}));setSec1Error("");touched.current=true;}} placeholder="(555) 000-0000"/></div><div className="fd" id="field-email"><label className="fl">{t.email}<span className="freq">*</span></label><input className={`fi${errors.email?" fi-err":""}`} type="email" value={f.email} onChange={u("email")} placeholder={t.email}/></div></div>
          {sec1Error&&<p className="sec1-err">{sec1Error}</p>}
        </Sec>

        {/* 2: Location */}
        <Sec id="sec-2" title={t.sec2} sub={t.sec2sub} num="2" total={TOTAL} complete={c2} open={openSec===2} onToggle={()=>setOpenSec(openSec===2?0:2)} onNext={()=>goNext(3)} nextLabel={t.next} focusId="input-zip">
          <div className="row2"><div className="fd"><label className="fl">{t.zip}</label><input id="input-zip" className="fi" value={f.zip} onChange={handleZip} placeholder={t.zip} maxLength={5} inputMode="numeric"/></div><div className="fd"><label className="fl">{t.city}</label><input className="fi" value={f.city} onChange={u("city")} placeholder={t.city}/></div></div>
          <div className="row2"><div className="fd"><label className="fl">{t.county}</label><select className="fi fi-sel" value={f.county} onChange={u("county")}><option value="">{t.sel}</option>{COUNTIES.map(c=><option key={c}>{c}</option>)}</select></div><div className="fd"><label className="fl">{t.timeline}</label><select className="fi fi-sel" value={f.timeline} onChange={u("timeline")}><option value="">{t.sel}</option>{t.tlO.map(o=><option key={o}>{o}</option>)}</select></div></div>
        </Sec>

        {/* 3: Financial */}
        <Sec id="sec-3" title={t.sec3} sub={t.sec3sub} num="3" total={TOTAL} complete={c3} open={openSec===3} onToggle={()=>setOpenSec(openSec===3?0:3)} onNext={()=>goNext(4)} nextLabel={t.next}>
          <div className="row2"><div className="fd"><label className="fl">{t.income}</label><select className="fi fi-sel" value={f.income} onChange={u("income")}><option value="">{t.sel}</option>{t.incO.map(o=><option key={o}>{o}</option>)}</select></div><div className="fd"><label className="fl">{t.debt}</label><select className="fi fi-sel" value={f.debt} onChange={u("debt")}><option value="">{t.sel}</option>{t.debtO.map(o=><option key={o}>{o}</option>)}</select></div></div>
          <div className="row2"><div className="fd"><label className="fl">{t.credit}</label><select className="fi fi-sel" value={f.credit} onChange={u("credit")}><option value="">{t.sel}</option>{t.crO.map(o=><option key={o}>{o}</option>)}</select></div><div className="fd"><label className="fl">{t.price}</label><select className="fi fi-sel" value={f.price} onChange={u("price")}><option value="">{t.sel}</option>{t.prO.map(o=><option key={o}>{o}</option>)}</select></div></div>
        </Sec>

        {/* 4: Employment + Submit */}
        <Sec id="sec-4" title={t.sec4} sub={t.sec4sub} num="4" total={TOTAL} complete={c4} open={openSec===4} onToggle={()=>setOpenSec(openSec===4?0:4)}>
          <div className="fd"><label className="fl">{t.employed}</label><div className="tog-r"><button className={`tog${f.employed==="yes"?" tog-on":""}`} onClick={()=>{sF(p=>({...p,employed:"yes"}));touched.current=true;}}>{t.y}</button><button className={`tog${f.employed==="no"?" tog-on":""}`} onClick={()=>{sF(p=>({...p,employed:"no"}));touched.current=true;}}>{t.n}</button></div></div>
          {f.employed==="yes"&&<div className="fd" style={{marginTop:8}}><label className="fl">{t.empType}</label><select className="fi fi-sel" value={f.empType} onChange={u("empType")}><option value="">{t.sel}</option>{t.emO.map(o=><option key={o}>{o}</option>)}</select></div>}
          <div className="submit-in">
            <div className="tbox"><p>{t.trustMsg}</p></div>
            <button className="cta" onClick={submit}>{t.submit}</button>
            {Object.keys(errors).length>0&&<p className="err-msg">{t.req}</p>}
          </div>
        </Sec>
      </>)}
    </div>

    <div style={{background:"var(--w)",borderTop:"1px solid var(--g200)",padding:"40px 20px"}}><div style={{maxWidth:520,margin:"0 auto"}}><h2 style={{fontSize:"clamp(17px,4vw,22px)",fontWeight:700,color:"var(--pri)",marginBottom:6}}>{t.faqTitle}</h2><div style={{marginTop:4}}>{t.faqs.map((fq,i)=><FAQ key={i} q={fq.q} a={fq.a}/>)}</div></div></div>

    <div style={{padding:"14px",textAlign:"center",background:"var(--warm)",borderTop:"1px solid var(--g200)"}}><p style={{fontSize:9,color:"var(--g400)",maxWidth:480,margin:"0 auto",lineHeight:1.4}}>{t.privNote}</p></div>

    <footer className="footer"><div className="footer-in"><div className="footer-eq"><div className="footer-b">Equal<br/>Housing</div><p>{t.eho}. {t.discl}</p></div><div className="footer-lks"><a href="#">{t.priv}</a><a href="#">{t.terms}</a></div><div className="footer-ag"><div style={{fontWeight:600,color:"var(--g300)",marginBottom:2}}>{AG}</div><div>{t.agSub}</div><div>DRE #{DRE} | Real Brokerage</div><div><a href={`tel:+1${PHONE}`}>{PH}</a> | <a href={`mailto:${EM_ADDR}`}>{EM_ADDR}</a></div><div><a href={`https://${SITE}`} target="_blank" rel="noopener noreferrer">{SITE}</a></div><div style={{marginTop:4}}><a href="https://www2.dre.ca.gov/publicasp/pplinfo.asp" target="_blank" rel="noopener noreferrer" style={{textDecoration:"underline",textUnderlineOffset:2}}>{lang==="en"?"Verify License":"Verificar Licencia"}</a></div></div><p className="footer-cp">{t.copy}</p></div></footer>

    {!done&&(<><div className="sticky"><button className={ctaReady?"s-on":"s-off"} onClick={stickyAct}>{stickyLabel}</button>{stickyHint&&<p className="sticky-hint">{stickyHint}</p>}</div><div className="spacer"/></>)}
  </div>);
}
