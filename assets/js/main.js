// ── BACKGROUNDS ──
document.getElementById('heroBg').style.backgroundImage = "url('assets/img/hero.jpg')";

const bgSeaView = document.getElementById('bg-seaview');
const bgLandView = document.getElementById('bg-landview');
const bgShop = document.getElementById('bg-shop');
if(bgSeaView) bgSeaView.style.backgroundImage = "url('assets/img/sala-vista-mar-3.jpg')";
if(bgLandView) bgLandView.style.backgroundImage = "url('assets/img/sala-vista-montanha.jpg')";
if(bgShop) bgShop.style.backgroundImage = "url('assets/img/espaco-comercial-exterior-1.avif')";

// ── LANG ──
function setLang(l){
  document.documentElement.setAttribute('data-lang',l);
  document.getElementById('bpt').classList.toggle('active',l==='pt');
  document.getElementById('ben').classList.toggle('active',l==='en');
  document.getElementById('bpt2').classList.toggle('active',l==='pt');
  document.getElementById('ben2').classList.toggle('active',l==='en');
}

// ── CURSOR ──
if(window.matchMedia('(hover:hover)').matches){
  const cur=document.getElementById('cur'), curR=document.getElementById('curR');
  document.addEventListener('mousemove',e=>{
    cur.style.cssText+=`;left:${e.clientX-4}px;top:${e.clientY-4}px`;
    curR.style.cssText+=`;left:${e.clientX-17}px;top:${e.clientY-17}px`;
  });
  document.querySelectorAll('a,button,.sc2,.feat').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ cur.style.transform='scale(2.5)'; curR.style.transform='scale(1.5)'; });
    el.addEventListener('mouseleave',()=>{ cur.style.transform=''; curR.style.transform=''; });
  });
}

// ── SCROLL ──
const sprog=document.getElementById('sprog'), nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{
  const st=document.documentElement.scrollTop, sh=document.documentElement.scrollHeight-window.innerHeight;
  sprog.style.width=(st/sh*100)+'%';
  nav.classList.toggle('sc',st>50);
});

// ── REVEAL ──
const rvEls=document.querySelectorAll('.rv');
const obs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{ if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('vis'),i*60); obs.unobserve(e.target); }});
},{threshold:.08});
rvEls.forEach(el=>obs.observe(el));

// ── HERO ──
document.getElementById('hero').classList.add('loaded');

// ── HAMBURGER MENU ──
const mobMenu = document.getElementById('mob-menu');
const hbgBtn = document.getElementById('hbg-btn');
function toggleMenu(){
  const open = mobMenu.classList.toggle('open');
  hbgBtn.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
function closeMenu(){
  mobMenu.classList.remove('open');
  hbgBtn.classList.remove('open');
  document.body.style.overflow = '';
}

// ── CARDS → CONTACT ──
document.querySelectorAll('.sc2').forEach(c=>c.addEventListener('click',()=>document.getElementById('contact').scrollIntoView({behavior:'smooth'})));

// ── LIGHTBOX ──
const lbEl = document.getElementById('lb');
const lbImg = document.getElementById('lb-img');
let lbImgs = [], lbIdx = 0;

document.querySelectorAll('#intgall .ig img').forEach((img, i) => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    lbImgs = Array.from(document.querySelectorAll('#intgall .ig img'));
    lbIdx = i;
    lbShow();
  });
});

document.querySelectorAll('.planta-img').forEach((img, i) => {
  img.addEventListener('click', () => {
    lbImgs = Array.from(document.querySelectorAll('.planta-img'));
    lbIdx = i;
    lbShow();
  });
});

function lbShow() {
  lbImg.src = lbImgs[lbIdx].src;
  lbImg.alt = lbImgs[lbIdx].alt;
  lbEl.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function lbClose() {
  lbEl.style.display = 'none';
  document.body.style.overflow = '';
}

function lbNav(dir) {
  lbIdx = (lbIdx + dir + lbImgs.length) % lbImgs.length;
  lbShow();
}

lbEl.addEventListener('click', e => { if(e.target === lbEl) lbClose(); });
document.addEventListener('keydown', e => {
  if(lbEl.style.display === 'none') return;
  if(e.key === 'ArrowRight') lbNav(1);
  if(e.key === 'ArrowLeft') lbNav(-1);
  if(e.key === 'Escape') lbClose();
});

// ── CONTACT FORM ──
const contactForm = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');
if(contactForm){
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]:not([style*="none"])') || contactForm.querySelector('.fsub');
    const data = new FormData(contactForm);
    data.append('botcheck', '');
    try {
      btn.disabled = true;
      const res = await fetch('https://api.web3forms.com/submit', { method:'POST', body: data });
      const json = await res.json();
      if(json.success){
        formMsg.style.display = 'block';
        formMsg.style.color = '#4ade80';
        formMsg.style.borderColor = '#4ade80';
        formMsg.textContent = document.documentElement.dataset.lang === 'en'
          ? 'Message sent! We will get back to you shortly.'
          : 'Mensagem enviada! Entraremos em contacto brevemente.';
        contactForm.reset();
      } else {
        throw new Error();
      }
    } catch {
      formMsg.style.display = 'block';
      formMsg.style.color = '#f87171';
      formMsg.style.borderColor = '#f87171';
      formMsg.textContent = document.documentElement.dataset.lang === 'en'
        ? 'Something went wrong. Please try again.'
        : 'Ocorreu um erro. Por favor tente novamente.';
    } finally {
      btn.disabled = false;
    }
  });
}
