
const WEBSITE_VERSION = "2.1.1";
const SAMARA_WHATSAPP = "917395961616";
const SAMARA_PHONE = "073959 61616";


const SAMARA_INVITATION_END = new Date(2026, 8, 1, 0, 0, 0); // Visible through 31-Aug-2026; stops from 01-Sep-2026.
const SAMARA_INVITATION_SESSION_KEY = 'samara_grand_opening_invitation_aug2026_v10';
const SAMARA_GRAND_BANNER_MS = 9000; // Grand Opening stage stays on screen for 9 seconds.
const SAMARA_INVITATION_SCROLL_MS = 24000; // Invitation gently scrolls through the full screen.

function showSamaraInaugurationInvitation(){
  try{
    if(new Date() >= SAMARA_INVITATION_END)return;
    if(sessionStorage.getItem(SAMARA_INVITATION_SESSION_KEY)==='shown')return;
    if(document.getElementById('samara-inauguration-modal'))return;
    if(!document.body)return;

    if(!document.getElementById('samara-inauguration-style')){
      const style=document.createElement('style');
      style.id='samara-inauguration-style';
      style.textContent=`
        #samara-inauguration-modal{
          position:fixed;inset:0;z-index:2147483500;overflow:hidden;
          background:#4a1708;animation:samaraInviteFade .45s ease both;
        }
        #samara-inauguration-modal .samara-opening-stage{position:absolute;inset:0;overflow:hidden}
        #samara-inauguration-modal .samara-opening-banner{
          position:absolute;inset:0;z-index:4;display:flex;align-items:center;justify-content:center;
          overflow:hidden;padding:clamp(12px,2vw,28px);
          background:
            radial-gradient(circle at 50% 38%,rgba(255,255,224,.92) 0%,rgba(255,224,120,.82) 19%,transparent 44%),
            radial-gradient(circle at 50% 55%,#f7ce65 0%,#d99a22 52%,#8b500a 100%);
          box-shadow:inset 0 0 120px rgba(88,37,0,.32);
          transition:opacity 1.15s ease,visibility 1.15s ease;
        }
        #samara-inauguration-modal .samara-opening-banner.banner-done{opacity:0;visibility:hidden;pointer-events:none}
        #samara-inauguration-modal .samara-grand-banner-art{
          position:absolute;left:50%;top:50%;z-index:4;width:auto!important;height:auto!important;max-width:100vw!important;max-height:100dvh!important;display:block;object-fit:contain!important;object-position:center center;transform:translate(-50%,-50%);
          background:#8b500a;filter:saturate(1.02) contrast(1.01);
        }
        #samara-inauguration-modal .samara-grand-banner-art.mobile{display:none!important}
        #samara-inauguration-modal .samara-opening-banner::before{
          content:'';position:absolute;inset:2.2%;border:2px solid rgba(255,242,177,.82);border-radius:26px;
          box-shadow:inset 0 0 0 4px rgba(130,39,26,.18),0 0 36px rgba(255,221,117,.25);pointer-events:none
        }
        #samara-inauguration-modal .samara-opening-banner::after{
          content:'';position:absolute;left:5%;right:5%;bottom:4%;height:9px;
          background:repeating-linear-gradient(90deg,#7d153a 0 18px,#f8d274 18px 25px,transparent 25px 36px);
          opacity:.62;border-radius:999px
        }
        #samara-inauguration-modal .samara-curtain{
          position:absolute;top:0;bottom:0;width:53%;z-index:10;pointer-events:none;
          background:
            linear-gradient(90deg,rgba(255,255,255,.08),transparent 18%,rgba(0,0,0,.12) 35%,rgba(255,255,255,.08) 52%,rgba(0,0,0,.19) 72%,rgba(255,255,255,.08)),
            repeating-linear-gradient(90deg,#640723 0 8%,#a80d43 8% 17%,#73062a 17% 26%);
          box-shadow:inset 0 0 55px rgba(255,206,92,.2),0 0 45px rgba(48,0,15,.45);
          transition:transform 4.8s cubic-bezier(.52,.02,.18,1);
        }
        #samara-inauguration-modal .samara-curtain::after{
          content:'';position:absolute;top:0;bottom:0;width:14px;background:linear-gradient(#ffe6a0,#b67a18,#f8d26f,#8d5a0b,#ffe6a0)
        }
        #samara-inauguration-modal .samara-curtain.left{left:0}.samara-curtain.right{right:0}
        #samara-inauguration-modal .samara-curtain.left::after{right:0} #samara-inauguration-modal .samara-curtain.right::after{left:0}
        #samara-inauguration-modal .samara-opening-banner.curtains-open .samara-curtain.left{transform:translateX(-96%)}
        #samara-inauguration-modal .samara-opening-banner.curtains-open .samara-curtain.right{transform:translateX(96%)}
        #samara-inauguration-modal .samara-toran{
          position:absolute;top:2%;left:50%;transform:translateX(-50%);z-index:3;width:min(94vw,1200px);
          text-align:center;color:#7c1238;font-size:clamp(20px,3.2vw,42px);letter-spacing:.2em;
          filter:drop-shadow(0 3px 3px rgba(255,235,162,.55));white-space:nowrap
        }
        #samara-inauguration-modal .samara-grand-panel{
          position:relative;z-index:4;width:min(92vw,1120px);min-height:min(82dvh,820px);
          display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
          padding:clamp(24px,4vw,58px) clamp(16px,4vw,56px);
          border:2px solid rgba(122,25,55,.38);border-radius:clamp(18px,3vw,36px);
          background:linear-gradient(180deg,rgba(255,249,218,.70),rgba(255,223,130,.40));
          box-shadow:0 32px 88px rgba(84,35,0,.32),inset 0 0 42px rgba(255,255,255,.25);
          animation:samaraGrandArrive 1.25s cubic-bezier(.16,.9,.26,1.15) both;
        }
        #samara-inauguration-modal .samara-banner-logo{
          display:block;width:min(70vw,500px);max-height:25vh;object-fit:contain;margin:0 auto clamp(6px,1.3vh,14px);
          filter:drop-shadow(0 7px 14px rgba(95,23,48,.16));
        }
        #samara-inauguration-modal .samara-vanakkam{
          font:700 clamp(18px,2.2vw,29px)/1.2 Georgia,'Times New Roman',serif;color:#7c143b;
          letter-spacing:.08em;margin-bottom:clamp(8px,1.5vh,16px)
        }
        #samara-inauguration-modal .samara-grand-word{
          font:800 clamp(48px,9.6vw,124px)/.9 Georgia,'Times New Roman',serif;color:#7b1038;
          letter-spacing:.035em;text-transform:uppercase;text-shadow:0 2px 0 #f6d875,0 5px 0 rgba(95,37,0,.18),0 12px 28px rgba(76,28,0,.28)
        }
        #samara-inauguration-modal .samara-opening-word{
          margin-top:clamp(8px,1vh,14px);font:800 clamp(30px,5.8vw,72px)/1 Georgia,'Times New Roman',serif;
          color:#8d153f;letter-spacing:.14em;text-transform:uppercase;text-shadow:0 3px 16px rgba(88,34,0,.22)
        }
        #samara-inauguration-modal .samara-grand-date{
          margin-top:clamp(20px,3vh,36px);padding:clamp(10px,1.4vw,16px) clamp(24px,4vw,52px);
          border:2px solid rgba(130,27,56,.34);border-radius:999px;background:rgba(126,20,56,.92);
          font:800 clamp(27px,4.4vw,54px)/1 Georgia,'Times New Roman',serif;color:#ffe59a;letter-spacing:.06em;
          box-shadow:0 8px 22px rgba(95,34,0,.22),inset 0 0 0 2px rgba(255,220,120,.22)
        }
        #samara-inauguration-modal .samara-grand-sub{
          margin-top:clamp(15px,2.4vh,26px);font:600 clamp(14px,1.6vw,20px)/1.35 Georgia,'Times New Roman',serif;
          color:#731136;letter-spacing:.04em
        }
        #samara-inauguration-modal .samara-countdown{
          margin-top:clamp(12px,2vh,20px);font:600 clamp(12px,1.3vw,16px)/1 Arial,sans-serif;color:#784318;
          letter-spacing:.08em;text-transform:uppercase
        }
        #samara-inauguration-modal .samara-kuthu{
          position:absolute;z-index:5;bottom:4%;width:clamp(90px,14vw,190px);height:clamp(170px,27vw,350px);
          opacity:.96;filter:drop-shadow(0 12px 12px rgba(74,39,0,.22));pointer-events:none
        }
        #samara-inauguration-modal .samara-kuthu.left{left:2.2%}.samara-kuthu.right{right:2.2%;transform:scaleX(-1)}
        #samara-inauguration-modal .samara-kuthu::before{
          content:'';position:absolute;left:45%;bottom:0;width:10%;height:64%;border-radius:50% 50% 16% 16%;
          background:linear-gradient(90deg,#7a4a09,#ffd777 35%,#9d6612 65%,#f4c55a);box-shadow:0 0 0 2px rgba(119,73,5,.25)
        }
        #samara-inauguration-modal .samara-kuthu::after{
          content:'🪔';position:absolute;left:50%;top:0;transform:translateX(-50%);font-size:clamp(70px,11vw,145px);line-height:1;
          filter:saturate(.75) sepia(.12)
        }
        #samara-inauguration-modal .samara-invite-scroll-stage{
          position:absolute;inset:0;z-index:2;overflow:hidden;display:none;align-items:flex-start;justify-content:center;
          background:radial-gradient(circle at 50% 20%,#fff8eb 0%,#f6ead7 55%,#d7b576 100%)
        }
        #samara-inauguration-modal .samara-invite-scroll-stage.ready{display:flex}
        #samara-inauguration-modal .samara-invite-card{
          position:absolute;top:100dvh;left:50%;width:min(100vw,980px);transform:translateX(-50%);
          background:#fff7f7;box-shadow:0 18px 70px rgba(69,24,0,.36);will-change:transform;
        }
        #samara-inauguration-modal .samara-invite-card.scrolling{
          animation:samaraInvitationScroll ${SAMARA_INVITATION_SCROLL_MS}ms linear forwards
        }
        #samara-inauguration-modal .samara-invite-card img{display:block;width:100%;height:auto}
        #samara-inauguration-modal .samara-scroll-note{
          position:fixed;left:50%;bottom:max(10px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:6;
          padding:8px 14px;border-radius:999px;background:rgba(106,16,51,.88);color:#fff4d0;
          font:600 clamp(11px,1.2vw,14px)/1 Arial,sans-serif;letter-spacing:.04em;box-shadow:0 6px 20px rgba(0,0,0,.2);
          opacity:0;transition:opacity .4s ease;pointer-events:none
        }
        #samara-inauguration-modal .samara-invite-scroll-stage.ready .samara-scroll-note{opacity:1}
        @keyframes samaraInviteFade{from{opacity:0}to{opacity:1}}
        @keyframes samaraGrandArrive{0%{opacity:0;transform:translateY(28px) scale(.93)}75%{opacity:1;transform:translateY(-4px) scale(1.008)}100%{opacity:1;transform:none}}
        @keyframes samaraInvitationScroll{
          from{transform:translate(-50%,0)}
          to{transform:translate(-50%,calc(-100% - 100dvh))}
        }
        @media(max-width:600px){
          #samara-inauguration-modal .samara-grand-banner-art.desktop{display:none!important}
          #samara-inauguration-modal .samara-grand-banner-art.mobile{display:block!important;max-width:100vw!important;max-height:100dvh!important}
          #samara-inauguration-modal .samara-grand-panel{width:94vw;min-height:80dvh;padding:30px 14px 25px}
          #samara-inauguration-modal .samara-banner-logo{width:min(82vw,430px);max-height:21vh}
          #samara-inauguration-modal .samara-opening-word{letter-spacing:.08em}
          #samara-inauguration-modal .samara-kuthu{width:88px;height:170px;bottom:2%;opacity:.8}
          #samara-inauguration-modal .samara-invite-card{width:100vw}
          #samara-inauguration-modal .samara-scroll-note{font-size:10px;padding:7px 11px}
        }
        @media(prefers-reduced-motion:reduce){
          #samara-inauguration-modal .samara-curtain{transition-duration:.5s}
          #samara-inauguration-modal .samara-invite-card.scrolling{animation-duration:12000ms}
        }
      `;
      document.head.appendChild(style);
    }

    const modal=document.createElement('div');
    modal.id='samara-inauguration-modal';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-label','Samara Assisted Living grand opening presentation and inauguration invitation');

    const stage=document.createElement('div');
    stage.className='samara-opening-stage';

    const banner=document.createElement('div');
    banner.className='samara-opening-banner';
    banner.innerHTML=`
      <img class="samara-grand-banner-art desktop" src="./assets/samara-grand-opening-banner-27-08-2026.png?v=20260811-v10" alt="Samara Assisted Living Grand Opening on 27 August 2026">
      <img class="samara-grand-banner-art mobile" src="./assets/samara-grand-opening-banner-mobile-27-08-2026.png?v=20260811-v10" alt="Samara Assisted Living Grand Opening on 27 August 2026">
      <div class="samara-curtain left" aria-hidden="true"></div><div class="samara-curtain right" aria-hidden="true"></div>`;

    const scrollStage=document.createElement('div');
    scrollStage.className='samara-invite-scroll-stage';

    const card=document.createElement('div');
    card.className='samara-invite-card';
    const image=document.createElement('img');
    image.src='./assets/samara-inauguration-27-08-2026.png?v=20260812-v8';
    image.alt='Invitation to the inauguration of Samara Assisted Living on 27 August 2026, Mogappair, Chennai';
    image.decoding='async';
    card.appendChild(image);

    const note=document.createElement('div');
    note.className='samara-scroll-note';
    note.textContent='Inauguration Invitation';
    scrollStage.append(card,note);
    stage.append(banner,scrollStage);
    modal.appendChild(stage);
    document.body.appendChild(modal);
    sessionStorage.setItem(SAMARA_INVITATION_SESSION_KEY,'shown');

    // Slowly part the ceremonial curtains while the 9-second Grand Opening stage remains visible.
    window.setTimeout(()=>banner.classList.add('curtains-open'),700);

    // After 9 seconds, the invitation enters from below and gently scrolls upward through the full screen.
    window.setTimeout(()=>{
      scrollStage.classList.add('ready');
      requestAnimationFrame(()=>requestAnimationFrame(()=>card.classList.add('scrolling')));
      banner.classList.add('banner-done');
    },SAMARA_GRAND_BANNER_MS);

    // Once the invitation has fully passed, close the entire presentation automatically and reveal the website.
    window.setTimeout(()=>{
      modal.style.opacity='0';
      modal.style.transition='opacity .85s ease';
      window.setTimeout(()=>modal.remove(),900);
    },SAMARA_GRAND_BANNER_MS + SAMARA_INVITATION_SCROLL_MS + 350);
  }catch(error){
    console.warn('Samara inauguration invitation could not be displayed.',error);
  }
}

function initSamaraInaugurationInvitation(){
  // Do not show the inauguration presentation on the Careers application page.
  const pagePath=(window.location.pathname||'').toLowerCase().replace(/\/+$/,'');
  if(pagePath.endsWith('/careers.html'))return;
  window.setTimeout(showSamaraInaugurationInvitation,500);
}


// v1.8.0 — iPhone / Android navigation and secure entry-point polish.
const SAMARA_ERP_URL = "https://app.samaraassistedliving.com/?source=website&v=2.8.32";
const SAMARA_FAMILY_URL = "https://family.samaraassistedliving.com";

// Always direct every public-site Staff Login link to the same live ERP root.
document.querySelectorAll('a[href*="app.samaraassistedliving.com"]').forEach(link => {
  link.href = SAMARA_ERP_URL;
  link.removeAttribute("target");
  link.setAttribute("aria-label", "Staff Login – Samara Care ERP");
});

// Keep every Family Portal link on the current custom domain.
document.querySelectorAll('a[href*="family.samaraassistedliving.com"]').forEach(link => {
  link.href = SAMARA_FAMILY_URL;
});

// On phones, Staff Login remains visible even when the main navigation is collapsed.
(() => {
  const headerInner = document.querySelector(".header .header-inner");
  const menuButton = headerInner?.querySelector(".menu-button");
  if (!headerInner || !menuButton || headerInner.querySelector(".mobile-staff-login")) return;

  const staff = document.createElement("a");
  staff.className = "mobile-staff-login";
  staff.href = SAMARA_ERP_URL;
  staff.textContent = "Staff Login";
  staff.setAttribute("aria-label", "Open Samara Care ERP Staff Login");
  headerInner.insertBefore(staff, menuButton);
})();

// Close the mobile menu after tapping outside it.
document.addEventListener("click", event => {
  if (!nav?.classList.contains("open")) return;
  const header = document.querySelector(".header");
  if (header && !header.contains(event.target)) {
    nav.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
  }
});


// Add Careers to the public navigation on every page.
const contactNavLink = [...document.querySelectorAll(".nav a")]
  .find(link => link.getAttribute("href") === "./contact.html");
if (contactNavLink && !document.querySelector('.nav a[href="./careers.html"]')) {
  const careersLink = document.createElement("a");
  careersLink.href = "./careers.html";
  careersLink.textContent = "Careers";
  if (location.pathname.endsWith("/careers.html")) careersLink.classList.add("active");
  contactNavLink.insertAdjacentElement("afterend", careersLink);
}

const menu = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");

menu?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-year]").forEach(node => {
  node.textContent = new Date().getFullYear();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(node => observer.observe(node));

function clean(value) {
  return String(value || "").trim();
}


const SAMARA_WHATSAPP_LOGO_URL = "https://samaraassistedliving.com/assets/samara-logo.png";
function brandWhatsAppMessage(message) {
  const text = String(message || "").trim();
  if (text.includes(SAMARA_WHATSAPP_LOGO_URL)) return text;
  return `*SAMARA ASSISTED LIVING*\n${SAMARA_WHATSAPP_LOGO_URL}\n\n${text}`;
}

function whatsapp(message, statusNode) {
  localStorage.setItem("samara_public_last_request", JSON.stringify({
    message,
    created_at: new Date().toISOString()
  }));
  if (statusNode) statusNode.textContent = "Opening WhatsApp with your request…";
  window.open(`https://wa.me/${SAMARA_WHATSAPP}?text=${encodeURIComponent(brandWhatsAppMessage(message))}`, "_blank", "noopener,noreferrer");
}

function getSamaraPublicSupabase(){
  const cfg=window.SAMARA_PUBLIC_CONFIG||{};
  return window.supabase&&cfg.supabaseUrl&&cfg.supabasePublishableKey
    ? window.supabase.createClient(cfg.supabaseUrl,cfg.supabasePublishableKey)
    : null;
}

document.querySelector("#visit-form")?.addEventListener("submit", async event => {
  event.preventDefault();
  const form=event.currentTarget, data=new FormData(form), status=form.querySelector(".form-status"), button=form.querySelector('button[type="submit"]');
  const client=getSamaraPublicSupabase();
  if(!client){ status.className='form-status error'; status.textContent='Secure connection is unavailable. Please try again shortly.'; return; }
  button.disabled=true; button.textContent='Sending…'; status.className='form-status'; status.textContent='Sending your visit request securely to Samara…';
  try{
    const {data:result,error}=await client.rpc('public_submit_visit_request',{
      p_visitor_name:clean(data.get('name')), p_visitor_mobile:clean(data.get('mobile')),
      p_visit_date:clean(data.get('date')), p_visit_time:clean(data.get('time')), p_message:clean(data.get('message'))
    });
    if(error) throw error;
    form.reset(); status.className='form-status success';
    status.textContent='Visit request sent successfully. Samara Admin / Manager will review and confirm it.';
  }catch(error){ console.error('Visit request failed',error); status.className='form-status error'; status.textContent=error.message||'Unable to send visit request. Please try again.'; }
  finally{ button.disabled=false; button.textContent='Send Visit Request'; }
});

document.querySelector("#enquiry-form")?.addEventListener("submit", async event => {
  event.preventDefault();
  const form=event.currentTarget, data=new FormData(form), status=form.querySelector('.form-status'), button=form.querySelector('button[type="submit"]');
  const client=getSamaraPublicSupabase();
  if(!client){ status.className='form-status error'; status.textContent='Secure connection is unavailable. Please try again shortly.'; return; }
  button.disabled=true; button.textContent='Sending…'; status.className='form-status'; status.textContent='Sending your admission enquiry securely to Samara…';
  try{
    const ageRaw=clean(data.get('age'));
    const {data:result,error}=await client.rpc('public_submit_admission_enquiry',{
      p_resident_name:clean(data.get('resident')), p_age:ageRaw?Number(ageRaw):null,
      p_contact_person:clean(data.get('contact')), p_mobile:clean(data.get('mobile')),
      p_care_type:clean(data.get('care')), p_preferred_room:clean(data.get('room')), p_condition:clean(data.get('condition'))
    });
    if(error) throw error;
    form.reset(); status.className='form-status success';
    status.textContent='Admission enquiry sent successfully. It is now available to Samara Admin / Manager in ERP → Enquiries.';
  }catch(error){ console.error('Admission enquiry failed',error); status.className='form-status error'; status.textContent=error.message||'Unable to send admission enquiry. Please try again.'; }
  finally{ button.disabled=false; button.textContent='Send Admission Enquiry'; }
});

const MAX_CAREER_FILE_SIZE = 10 * 1024 * 1024;

function careerApplicationId() {
  const now = new Date();
  const date = [now.getFullYear(), String(now.getMonth()+1).padStart(2,"0"), String(now.getDate()).padStart(2,"0")].join("");
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const random = Array.from(bytes, b => alphabet[b % alphabet.length]).join("");
  return `SAM-HR-${date}-${random}`;
}

function selectedLanguages(form) {
  return [...form.querySelectorAll('input[name="languages_known"]:checked')].map(input => input.value);
}

function selectedNursingDepartments(form) {
  return [...form.querySelectorAll('input[name="nursing_departments"]:checked')].map(input => input.value);
}

function careerSkillsSummary(form) {
  const data = new FormData(form);
  const languages = [...(form.dataset.languages ? JSON.parse(form.dataset.languages) : [])];
  const otherLanguage = clean(data.get("other_language"));
  if (languages.includes("Others") && otherLanguage) languages[languages.indexOf("Others")] = otherLanguage;
  const departments = selectedNursingDepartments(form);
  const otherDepartment = clean(data.get("other_nursing_department"));
  const normalizedDepartments = departments.map(value => value === "Other Nursing Department" && otherDepartment ? otherDepartment : value);
  return [
    ...languages.map(value => `Language: ${value}`),
    clean(data.get("other_skills")) ? `Other Skills: ${clean(data.get("other_skills"))}` : "",
    clean(data.get("driving")) ? `Driving: ${clean(data.get("driving"))}` : "",
    clean(data.get("driving")) === "Yes" && clean(data.get("driving_license")) ? `Valid Driving Licence: ${clean(data.get("driving_license"))}` : "",
    ...normalizedDepartments.map(value => `Nursing Department: ${value}`)
  ].filter(Boolean);
}

function validateCareerFile(input, required = false) {
  const file = input?.files?.[0];
  if (!file) {
    if (required) throw new Error(`Please select ${input?.closest(".career-upload-card")?.querySelector("strong")?.textContent || "the required document"}.`);
    return null;
  }
  if (file.size > MAX_CAREER_FILE_SIZE) throw new Error(`${file.name} exceeds the maximum permitted size of 10 MB.`);
  return file;
}

const CAREER_DESIGNATIONS = {"Nursing": ["Nurse Manager", "Nursing Supervisor", "Staff Nurse", "ANM"], "Caregiving": ["Senior Caregiver", "Caregiver", "Nursing Assistant"], "Medical": ["Duty Medical Officer – Part Time", "Visiting Doctor", "Medical Officer"], "Physiotherapy & Rehabilitation": ["Physiotherapist", "Rehabilitation Assistant"], "Housekeeping": ["Housekeeping Supervisor", "Housekeeping Staff", "Laundry Staff"], "Food & Kitchen": ["Dietician", "Cook", "Kitchen Assistant", "Food Service Assistant"], "Administration": ["Facility Administrator", "Manager", "Receptionist", "Administrative Assistant"], "HR": ["HR Manager", "HR Executive", "HR Assistant"], "Operations": ["Operations Manager", "Operations Executive", "Facility Coordinator"], "Accounts & Finance": ["Accountant", "Accounts Executive", "Accounts Assistant"], "Maintenance": ["Maintenance Supervisor", "Technician", "Electrician / Plumber"], "Security": ["Security Supervisor", "Security Guard"], "Transport": ["Driver", "Transport Coordinator"], "Marketing & Outreach": ["Marketing Executive", "Community Outreach Executive"], "Other": ["General Application", "Volunteer", "Other"]};

const CAREER_TN_DISTRICT_TALUKS={
    'Ariyalur':['Andimadam','Ariyalur','Sendurai','Udayarpalayam'],
    'Chengalpattu':['Cheyyur','Madurantakam','Pallavaram','Tambaram','Thirukalukundram','Tiruporur','Vandalur'],
    'Chennai':['Alandur','Ambattur','Aminjikarai','Ayanavaram','Egmore','Guindy','Madhavaram','Maduravoyal','Mambalam','Mylapore','Perambur','Purasawalkam','Sholinganallur','Thiruvottriyur','Tondiarpet','Velachery'],
    'Coimbatore':['Anaimalai','Annur','Coimbatore North','Coimbatore South','Kinathukadavu','Madukkarai','Mettupalayam','Perur','Pollachi','Sulur','Valparai'],
    'Cuddalore':['Bhuvanagiri','Chidambaram','Cuddalore','Kattumannarkoil','Kurinjipadi','Panruti','Srimushnam','Tittakudi','Vepur','Virudhachalam'],
    'Dharmapuri':['Dharmapuri','Harur','Karimangalam','Nallampalli','Palacode','Pappireddipatti','Pennagaram'],
    'Dindigul':['Athoor','Dindigul East','Dindigul West','Gujiliamparai','Kodaikanal','Natham','Nilakottai','Oddanchatram','Palani','Vedasandur'],
    'Erode':['Anthiyur','Bhavani','Erode','Gobichettipalayam','Kodumudi','Modakkurichi','Nambiyur','Perundurai','Sathyamangalam','Thalavadi'],
    'Kallakurichi':['Chinnasalem','Kallakurichi','Kalvarayan Hills','Sankarapuram','Tirukoilur','Ulundurpet'],
    'Kancheepuram':['Kancheepuram','Kundrathur','Sriperumbudur','Uthiramerur','Walajabad'],
    'Kanniyakumari':['Agastheeswaram','Kalkulam','Killiyur','Thiruvattar','Thovalai','Vilavancode'],
    'Karur':['Aravakurichi','Kadavur','Karur','Krishnarayapuram','Kulithalai','Manmangalam','Pugalur'],
    'Krishnagiri':['Anchetty','Bargur','Denkanikottai','Hosur','Krishnagiri','Pochampalli','Shoolagiri','Uthangarai'],
    'Madurai':['Kalligudi','Madurai East','Madurai North','Madurai South','Madurai West','Melur','Peraiyur','Thirumangalam','Thirupparankundram','Usilampatti','Vadipatti'],
    'Mayiladuthurai':['Kuthalam','Mayiladuthurai','Sirkazhi','Tharangambadi'],
    'Nagapattinam':['Kilvelur','Nagapattinam','Thirukkuvalai','Vedaranyam'],
    'Namakkal':['Kolli Hills','Kumarapalayam','Mohanur','Namakkal','Paramathi Velur','Rasipuram','Sendamangalam','Tiruchengode'],
    'The Nilgiris':['Coonoor','Gudalur','Kotagiri','Kundah','Pandalur','Udhagamandalam'],
    'Perambalur':['Alathur','Kunnam','Perambalur','Veppanthattai'],
    'Pudukkottai':['Alangudi','Aranthangi','Avudaiyarkoil','Gandarvakottai','Iluppur','Karambakudi','Kulathur','Manamelkudi','Ponnamaravathi','Pudukkottai','Thirumayam','Viralimalai'],
    'Ramanathapuram':['Kadaladi','Kamuthi','Keelakarai','Mudukulathur','Paramakudi','Rajasingamangalam','Ramanathapuram','Rameswaram','Tiruvadanai'],
    'Ranipet':['Arakkonam','Arcot','Kalavai','Nemili','Sholinghur','Walajah'],
    'Salem':['Attur','Edappadi','Gangavalli','Kadayampatti','Mettur','Omalur','Pethanaickenpalayam','Salem','Salem South','Sankari','Vazhapadi','Yercaud'],
    'Sivaganga':['Devakottai','Ilayangudi','Kalaiyarkoil','Karaikudi','Manamadurai','Singampunari','Sivaganga','Thiruppathur','Tiruppuvanam'],
    'Tenkasi':['Alangulam','Kadayanallur','Sankarankovil','Shenkottai','Sivagiri','Tenkasi','Thiruvengadam','Veerakeralampudur'],
    'Thanjavur':['Budalur','Kumbakonam','Orathanadu','Papanasam','Pattukkottai','Peravurani','Thanjavur','Thiruvaiyaru','Thiruvidaimarudur'],
    'Theni':['Andipatti','Bodinayakanur','Periyakulam','Theni','Uthamapalayam'],
    'Thoothukudi':['Eral','Ettayapuram','Kayathar','Kovilpatti','Ottapidaram','Sathankulam','Srivaikuntam','Thoothukudi','Tiruchendur','Vilathikulam'],
    'Tiruchirappalli':['Lalgudi','Manachanallur','Manapparai','Marungapuri','Musiri','Srirangam','Thottiyam','Thuraiyur','Tiruchirappalli East','Tiruchirappalli West','Tiruverumbur'],
    'Tirunelveli':['Ambasamudram','Cheranmahadevi','Manur','Nanguneri','Palayamkottai','Radhapuram','Thisayanvilai','Tirunelveli'],
    'Tirupathur':['Ambur','Natrampalli','Tirupathur','Vaniyambadi'],
    'Tiruppur':['Avinashi','Dharapuram','Kangeyam','Madathukulam','Palladam','Tiruppur North','Tiruppur South','Udumalpet','Uthukuli'],
    'Tiruvallur':['Avadi','Gummidipoondi','Pallipet','Ponneri','Poonamallee','R.K. Pet','Tiruttani','Tiruvallur','Uthukottai'],
    'Tiruvannamalai':['Arani','Chengam','Chetpet','Cheyyar','Jamunamarathur','Kalasapakkam','Kilpennathur','Polur','Thandrampet','Tiruvannamalai','Vandavasi','Vembakkam'],
    'Tiruvarur':['Kodavasal','Koothanallur','Mannargudi','Muthupet','Nannilam','Needamangalam','Thiruthuraipoondi','Tiruvarur','Valangaiman'],
    'Vellore':['Anaicut','Gudiyatham','Katpadi','K.V. Kuppam','Pernambut','Vellore'],
    'Viluppuram':['Gingee','Kandachipuram','Marakkanam','Melmalayanur','Tindivanam','Vanur','Vikravandi','Viluppuram'],
    'Virudhunagar':['Aruppukkottai','Kariapatti','Rajapalayam','Sattur','Sivakasi','Srivilliputhur','Tiruchuli','Vembakottai','Virudhunagar','Watrap']
  };

function populateCareerDesignations(department, selected="") {
  const designation = document.querySelector("#career-designation");
  if (!designation) return;
  const choices = CAREER_DESIGNATIONS[department] || [];
  designation.innerHTML = choices.length
    ? '<option value="">Select designation</option>' + choices.map(value => `<option>${value}</option>`).join("")
    : '<option value="">Select department first</option>';
  designation.disabled = !choices.length;
  if (selected && choices.includes(selected)) designation.value = selected;
}

function populateCareerTaluks(prefix) {
  const district = document.querySelector(`#career-${prefix}-district`);
  const taluk = document.querySelector(`#career-${prefix}-taluk`);
  if (!district || !taluk) return;
  const values = CAREER_TN_DISTRICT_TALUKS[district.value] || [];
  const current = taluk.value;
  taluk.innerHTML = values.length
    ? '<option value="">Select taluk</option>' + values.map(value => `<option>${value}</option>`).join("")
    : '<option value="">Select district first</option>';
  taluk.disabled = !values.length || (prefix === "permanent" && document.querySelector("#career-address-same")?.checked);
  if (values.includes(current)) taluk.value = current;
}

const CAREER_ADDRESS_KEYS = [
  "state","district","taluk","village_town","locality_area","street_name",
  "house_no","apartment_name","flat_no","landmark","pincode"
];

function composeCareerAddress(form,prefix) {
  const value = key => clean(new FormData(form).get(`${prefix}_${key}`));
  return [
    [value("flat_no"),value("apartment_name")].filter(Boolean).join(", "),
    value("house_no"),value("street_name"),value("locality_area"),value("village_town"),
    value("taluk"),value("district"),value("state"),value("pincode")
  ].filter(Boolean).join(", ");
}

function syncCareerAddress(form,prefix) {
  const output = form.elements[`${prefix}_address`];
  if (output) output.value = composeCareerAddress(form,prefix);
}

function copyCareerCurrentToPermanent(form) {
  CAREER_ADDRESS_KEYS.forEach(key => {
    const source = form.elements[`current_${key}`];
    const target = form.elements[`permanent_${key}`];
    if (source && target) target.value = source.value;
  });
  populateCareerTaluks("permanent");
  if (form.elements.permanent_taluk) form.elements.permanent_taluk.value = form.elements.current_taluk?.value || "";
  syncCareerAddress(form,"permanent");
}

function setCareerExperienceLevel(level) {
  const form = document.querySelector("#career-form");
  if (!form) return;
  const isFresher = level === "Fresher";
  const isExperienced = level === "Experienced";

  form.querySelectorAll(".career-fresher-only").forEach(label => {
    label.hidden = !isFresher;
    label.querySelectorAll("input,select,textarea").forEach(field => {
      field.disabled = !isFresher;
      field.required = isFresher && (field.name === "last_institution" || field.name === "course_details");
      if (!isFresher) field.value = "";
    });
  });

  form.querySelectorAll(".career-experienced-only").forEach(label => {
    label.hidden = !isExperienced;
    label.querySelectorAll("input,select,textarea").forEach(field => {
      field.disabled = !isExperienced;
      field.required = false;
      if (!isExperienced) {
        if (field.tagName === "SELECT") field.selectedIndex = 0;
        else field.value = "";
      }
    });
  });
}



function updateCareerReferenceDetails() {
  const form = document.querySelector("#career-form");
  if (!form) return;
  const show = form.elements.reference_type?.value === "Friends / Relatives / Seniors";
  form.querySelectorAll(".career-personal-reference-only").forEach(label => {
    label.hidden = !show;
    label.style.display = show ? "" : "none";
    label.querySelectorAll("input,select,textarea").forEach(field => {
      field.disabled = !show;
      field.required = show;
      field.setAttribute("aria-required", show ? "true" : "false");
      if (!show) field.value = "";
    });
  });
}

function updateCareerExperiencedNursing() {
  const form = document.querySelector("#career-form");
  if (!form) return;
  const show = form.elements.experience_level?.value === "Experienced" && form.elements.department?.value === "Nursing";
  form.querySelectorAll(".career-experienced-nursing-only").forEach(section => {
    section.hidden = !show;
    section.querySelectorAll("input,select,textarea").forEach(field => {
      field.disabled = !show;
      if (!show) {
        if (field.type === "checkbox") field.checked = false;
        else field.value = "";
      }
    });
  });
  updateCareerOtherNursingDepartment();
}

function updateCareerOtherNursingDepartment() {
  const form = document.querySelector("#career-form");
  if (!form) return;
  const wrap = document.querySelector("#career-other-nursing-dept-wrap");
  const field = form.elements.other_nursing_department;
  const checked = !!form.querySelector('input[name="nursing_departments"][value="Other Nursing Department"]:checked');
  if (wrap) wrap.hidden = !checked;
  if (field) {
    field.disabled = !checked;
    if (!checked) field.value = "";
  }
}

function addCareerLanguage(value) {
  const form = document.querySelector("#career-form");
  if (!form || !value) return;
  let values = [];
  try { values = JSON.parse(form.dataset.languages || "[]"); } catch (_) {}
  if (!values.includes(value)) values.push(value);
  form.dataset.languages = JSON.stringify(values);
  renderCareerLanguages();
}

function renderCareerLanguages() {
  const form = document.querySelector("#career-form");
  const holder = document.querySelector("#career-selected-languages");
  if (!form || !holder) return;
  let values = [];
  try { values = JSON.parse(form.dataset.languages || "[]"); } catch (_) {}
  const target = holder.querySelector("span");
  if (target) target.innerHTML = values.length ? values.map(value => `<button type="button" class="career-language-chip" data-remove-language="${value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}">${value} ×</button>`).join(" ") : "None";
  const otherWrap = document.querySelector("#career-other-language-wrap");
  const otherField = form.elements.other_language;
  const showOther = values.includes("Others");
  if (otherWrap) otherWrap.hidden = !showOther;
  if (otherField) {
    otherField.disabled = !showOther;
    if (!showOther) otherField.value = "";
  }
}

function updateCareerDriving() {
  const form = document.querySelector("#career-form");
  const wrap = document.querySelector("#career-driving-license-wrap");
  if (!form) return;
  const show = form.elements.driving?.value === "Yes";
  if (wrap) wrap.hidden = !show;
  if (form.elements.driving_license) {
    form.elements.driving_license.disabled = !show;
    if (!show) form.elements.driving_license.value = "";
  }
}

document.querySelector("#career-experience-level")?.addEventListener("change", event => { setCareerExperienceLevel(event.target.value); updateCareerExperiencedNursing(); });
document.querySelector("#career-reference-source")?.addEventListener("change", updateCareerReferenceDetails);
document.querySelector("#career-department")?.addEventListener("change", event => { populateCareerDesignations(event.target.value); updateCareerExperiencedNursing(); });
document.querySelector("#career-language-select")?.addEventListener("change", event => { addCareerLanguage(event.target.value); event.target.value = ""; });
document.querySelector("#career-selected-languages")?.addEventListener("click", event => {
  const button = event.target.closest("[data-remove-language]");
  const form = document.querySelector("#career-form");
  if (!button || !form) return;
  let values = [];
  try { values = JSON.parse(form.dataset.languages || "[]"); } catch (_) {}
  values = values.filter(value => value !== button.dataset.removeLanguage);
  form.dataset.languages = JSON.stringify(values);
  renderCareerLanguages();
});
document.querySelector("#career-driving")?.addEventListener("change", updateCareerDriving);
document.querySelectorAll('input[name="nursing_departments"]').forEach(input => input.addEventListener("change", updateCareerOtherNursingDepartment));
document.querySelector("#career-current-district")?.addEventListener("change", () => { populateCareerTaluks("current"); syncCareerAddress(document.querySelector("#career-form"),"current"); });
document.querySelector("#career-permanent-district")?.addEventListener("change", () => { populateCareerTaluks("permanent"); syncCareerAddress(document.querySelector("#career-form"),"permanent"); });

document.querySelectorAll(".career-role-apply").forEach(button => {
  button.addEventListener("click", event => {
    // Keep the #career-application href as a no-JavaScript/mobile fallback,
    // but use an offset-aware scroll when JavaScript is available.
    event.preventDefault();

    const department = document.querySelector("#career-department");
    if (department) {
      department.value = button.dataset.careerDepartment || "";
      populateCareerDesignations(department.value, button.dataset.careerDesignation || "");
    }

    const target = document.querySelector("#career-application");
    const form = document.querySelector("#career-form");
    if (!target) return;

    // The careers page uses reveal-on-scroll. Make the application content
    // visible immediately so mobile browsers cannot land on an invisible form.
    target.querySelectorAll(".reveal").forEach(node => node.classList.add("visible"));
    form?.classList.add("visible");

    // Allow the browser one frame to finish any mobile layout changes before scrolling.
    requestAnimationFrame(() => {
      const header = document.querySelector(".header");
      const headerOffset = (header?.getBoundingClientRect().height || 72) + 12;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      try {
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      } catch (_) {
        window.scrollTo(0, Math.max(0, top));
      }
      history.replaceState(null, "", "#career-application");
    });
  });
});

const CAREER_SALUTATIONS_BY_GENDER = {
  Male: ["Mr.","Dr.","Prof.","Shri","Rev.","Fr.","Br.","Other"],
  Female: ["Mrs.","Ms.","Miss","Dr.","Prof.","Smt.","Rev.","Sr.","Other"],
  Other: ["Dr.","Prof.","Mx.","Rev.","Other"]
};

function normaliseCareerPhone(value) {
  return String(value || "").replace(/\D/g, "").slice(-10);
}

function updateCareerSalutations(form) {
  if (!form) return;
  const gender = form.elements.gender?.value || "";
  const title = form.elements.title;
  if (!title) return;
  const previous = title.value;
  const choices = CAREER_SALUTATIONS_BY_GENDER[gender] || [];
  title.innerHTML = `<option value="">${gender ? "Select salutation" : "Select gender first"}</option>` + choices.map(value => `<option value="${value}">${value}</option>`).join("");
  title.disabled = !gender;
  if (previous && choices.includes(previous)) title.value = previous;
}

function validateCareerIdentity(form, showPopup = true) {
  const mobile = normaliseCareerPhone(form.elements.mobile?.value);
  const emergency = normaliseCareerPhone(form.elements.emergency_contact?.value);
  if (mobile.length === 10 && emergency.length === 10 && mobile === emergency) {
    const message = "Applicant mobile number and Father / Mother / Guardian mobile number must be different. Please provide a different emergency contact number.";
    form.elements.emergency_contact?.setCustomValidity(message);
    if (showPopup) window.alert(message);
    form.elements.emergency_contact?.focus();
    return false;
  }
  form.elements.emergency_contact?.setCustomValidity("");
  const gender = form.elements.gender?.value || "";
  const title = form.elements.title?.value || "";
  const allowed = CAREER_SALUTATIONS_BY_GENDER[gender] || [];
  if (gender && title && !allowed.includes(title)) {
    const message = `The selected salutation (${title}) does not match the selected gender (${gender}). Please choose the correct salutation.`;
    if (showPopup) window.alert(message);
    form.elements.title?.focus();
    return false;
  }
  return true;
}

const careerForm = document.querySelector("#career-form");
if (careerForm) {
  careerForm.dataset.languages = "[]";
  updateCareerSalutations(careerForm);
  careerForm.elements.gender?.addEventListener("change", () => updateCareerSalutations(careerForm));
  careerForm.elements.mobile?.addEventListener("input", () => careerForm.elements.emergency_contact?.setCustomValidity(""));
  careerForm.elements.emergency_contact?.addEventListener("input", () => {
    careerForm.elements.emergency_contact.setCustomValidity("");
    const mobile = normaliseCareerPhone(careerForm.elements.mobile?.value);
    const emergency = normaliseCareerPhone(careerForm.elements.emergency_contact?.value);
    if (mobile.length === 10 && emergency.length === 10 && mobile === emergency) {
      careerForm.elements.emergency_contact.setCustomValidity("Applicant and emergency / guardian mobile numbers must be different.");
    }
  });
  careerForm.elements.emergency_contact?.addEventListener("blur", () => validateCareerIdentity(careerForm, true));
  setCareerExperienceLevel(careerForm.elements.experience_level?.value || "");
  updateCareerExperiencedNursing();
  updateCareerReferenceDetails();
  renderCareerLanguages();
  updateCareerDriving();
  careerForm.querySelectorAll('[name^="current_"],[name^="permanent_"]').forEach(input => {
    if (input.name.endsWith("_address")) return;
    input.addEventListener("input", () => {
      const prefix = input.name.startsWith("current_") ? "current" : "permanent";
      syncCareerAddress(careerForm,prefix);
      if (prefix === "current" && careerForm.elements.permanent_same_as_current?.checked) copyCareerCurrentToPermanent(careerForm);
    });
    input.addEventListener("change", () => {
      const prefix = input.name.startsWith("current_") ? "current" : "permanent";
      syncCareerAddress(careerForm,prefix);
      if (prefix === "current" && careerForm.elements.permanent_same_as_current?.checked) copyCareerCurrentToPermanent(careerForm);
    });
  });

  careerForm.elements.permanent_same_as_current?.addEventListener("change", event => {
    const same = event.target.checked;
    CAREER_ADDRESS_KEYS.forEach(key => {
      const target = careerForm.elements[`permanent_${key}`];
      if (target) target.disabled = same;
    });
    if (same) copyCareerCurrentToPermanent(careerForm);
  });
}

document.querySelectorAll('.career-upload-card input[type="file"]').forEach(input => {
  input.addEventListener("change", () => {
    const display = input.closest(".career-upload-card")?.querySelector(".career-file-name");
    if (!display) return;
    const file = input.files?.[0];
    display.textContent = file ? `${file.name} · ${(file.size / 1024 / 1024).toFixed(2)} MB` : "No file selected";
  });
});

const publicCfg = window.SAMARA_PUBLIC_CONFIG || {};
const publicSupabase = window.supabase && publicCfg.supabaseUrl && publicCfg.supabasePublishableKey
  ? window.supabase.createClient(publicCfg.supabaseUrl, publicCfg.supabasePublishableKey) : null;

function safeCareerFilename(file) {
  return String(file?.name || "document").replace(/[^A-Za-z0-9._-]/g, "_");
}

async function uploadCareerDocument(uploadId, kind, file) {
  if (!file) return "";
  if (!publicSupabase) throw new Error("Secure application connection is unavailable. Please try again shortly.");
  const path = `public/${uploadId}/${kind}-${safeCareerFilename(file)}`;
  const { error } = await publicSupabase.storage.from("career-applications").upload(path, file, {
    upsert: false, contentType: file.type || undefined
  });
  if (error) throw new Error(`Unable to upload ${file.name}: ${error.message}`);
  return path;
}

document.querySelector("#career-form")?.addEventListener("submit", async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector(".form-status");
  const submitButton = form.querySelector('button[type="submit"]');
  status.className = "form-status career-form-status";
  status.textContent = "";

  if (!validateCareerIdentity(form, true)) {
    status.classList.add("error");
    status.textContent = "Please correct the identity / contact details before submitting.";
    return;
  }

  const firstInvalid = form.querySelector(":invalid");
  if (firstInvalid) {
    firstInvalid.focus(); firstInvalid.reportValidity();
    status.classList.add("error");
    status.textContent = "Please complete all mandatory fields before submitting.";
    return;
  }

  try {
    submitButton.disabled = true;
    submitButton.textContent = "Submitting securely…";
    if (!publicSupabase) throw new Error("Secure application connection is unavailable. Please refresh and try again.");

    if (form.elements.permanent_same_as_current?.checked) copyCareerCurrentToPermanent(form);
    syncCareerAddress(form,"current"); syncCareerAddress(form,"permanent");

    const resume = validateCareerFile(form.elements.resume, true);
    const photo = validateCareerFile(form.elements.photo, true);
    const identity = validateCareerFile(form.elements.identity, true);
    const qualificationCert = validateCareerFile(form.elements.qualification_certificate);
    const experienceCert = form.elements.experience_level?.value === "Experienced" ? validateCareerFile(form.elements.experience_certificate) : null;
    const otherCert = validateCareerFile(form.elements.other_certificate);

    const data = new FormData(form);
    const applicationId = careerApplicationId();
    const uploadId = crypto.randomUUID();
    const skills = careerSkillsSummary(form);

    status.textContent = "Uploading your employee documents securely…";
    const [resumePath,photoPath,identityPath,qualificationPath,experiencePath,otherPath] = await Promise.all([
      uploadCareerDocument(uploadId,"resume",resume),
      uploadCareerDocument(uploadId,"employee-photo",photo),
      uploadCareerDocument(uploadId,"identity",identity),
      uploadCareerDocument(uploadId,"qualification",qualificationCert),
      uploadCareerDocument(uploadId,"experience",experienceCert),
      uploadCareerDocument(uploadId,"other-certificate",otherCert)
    ]);

    status.textContent = "Saving your online application to Samara HR…";
    const payload = {
      application_id: applicationId,
      title: clean(data.get("title")),
      gender: clean(data.get("gender")),
      applicant_name: clean(data.get("name")),
      father_guardian_name: clean(data.get("father_guardian_name")),
      date_of_birth: clean(data.get("dob")),
      blood_group: clean(data.get("blood_group")),
      mobile: clean(data.get("mobile")),
      whatsapp: clean(data.get("mobile")),
      emergency_contact: clean(data.get("emergency_contact")),
      email: clean(data.get("email")),
      id_card_type: clean(data.get("id_card_type")),
      id_card_number: clean(data.get("id_card_number")),
      department: clean(data.get("department")),
      designation: clean(data.get("designation")),
      qualification: clean(data.get("qualification")),
      previous_workplace: clean(data.get("previous_workplace")),
      current_employer: clean(data.get("previous_workplace")),
      reference_type: clean(data.get("reference_type")) || "Direct",
      reference_name: clean(data.get("reference_name")),
      reference_contact: clean(data.get("reference_contact")),
      registration_no: clean(data.get("registration")),
      experience: clean(data.get("experience_level")) === "Fresher" ? "Fresher" : clean(data.get("experience")),
      current_salary: clean(data.get("current_salary")),
      expected_salary: clean(data.get("expected_salary")),
      notice_period: clean(data.get("notice_period")),
      employment_type: "",
      preferred_shift: "",
      skills,
      additional_information: [
        `Experience Level: ${clean(data.get("experience_level"))}`,
        clean(data.get("experience_level")) === "Fresher" && clean(data.get("last_institution")) ? `Last Institution: ${clean(data.get("last_institution"))}` : "",
        clean(data.get("experience_level")) === "Fresher" && clean(data.get("course_details")) ? `Course Details: ${clean(data.get("course_details"))}` : "",
        (() => { let v=[]; try { v=JSON.parse(form.dataset.languages||"[]"); } catch(_){}; const other=clean(data.get("other_language")); return v.length ? `Languages Known: ${v.map(x=>x==="Others"&&other?other:x).join(", ")}` : ""; })(),
        clean(data.get("other_skills")) ? `Other Skills: ${clean(data.get("other_skills"))}` : "",
        clean(data.get("driving")) ? `Driving: ${clean(data.get("driving"))}` : "",
        clean(data.get("driving")) === "Yes" && clean(data.get("driving_license")) ? `Valid Driving Licence: ${clean(data.get("driving_license"))}` : "",
        selectedNursingDepartments(form).length ? `Nursing Departments Worked In: ${selectedNursingDepartments(form).map(x=>x==="Other Nursing Department"&&clean(data.get("other_nursing_department"))?clean(data.get("other_nursing_department")):x).join(", ")}` : ""
      ].filter(Boolean).join("\n"),
      current_address: clean(data.get("current_address")),
      current_state: clean(data.get("current_state")) || "Tamil Nadu",
      current_district: clean(data.get("current_district")),
      current_taluk: clean(data.get("current_taluk")),
      current_village_town: clean(data.get("current_village_town")),
      current_locality_area: clean(data.get("current_locality_area")),
      current_street_name: clean(data.get("current_street_name")),
      current_house_no: clean(data.get("current_house_no")),
      current_apartment_name: clean(data.get("current_apartment_name")),
      current_flat_no: clean(data.get("current_flat_no")),
      current_landmark: clean(data.get("current_landmark")),
      current_pincode: clean(data.get("current_pincode")),
      permanent_same_as_current: !!form.elements.permanent_same_as_current?.checked,
      permanent_address: clean(data.get("permanent_address")),
      permanent_state: clean(data.get("permanent_state")) || "Tamil Nadu",
      permanent_district: clean(data.get("permanent_district")),
      permanent_taluk: clean(data.get("permanent_taluk")),
      permanent_village_town: clean(data.get("permanent_village_town")),
      permanent_locality_area: clean(data.get("permanent_locality_area")),
      permanent_street_name: clean(data.get("permanent_street_name")),
      permanent_house_no: clean(data.get("permanent_house_no")),
      permanent_apartment_name: clean(data.get("permanent_apartment_name")),
      permanent_flat_no: clean(data.get("permanent_flat_no")),
      permanent_landmark: clean(data.get("permanent_landmark")),
      permanent_pincode: clean(data.get("permanent_pincode")),
      resume_path: resumePath,
      photo_path: photoPath,
      identity_path: identityPath,
      qualification_certificate_path: qualificationPath,
      certificate_path: qualificationPath,
      experience_certificate_path: experiencePath,
      other_certificate_path: otherPath
    };

    const { data: result, error } = await publicSupabase.rpc("submit_career_application", { payload });
    if (error) throw error;
    const saved = Array.isArray(result) ? result[0] : result;
    const code = saved?.application_code || applicationId;

    localStorage.setItem("samara_last_career_application", JSON.stringify({
      application_id: code, applicant: payload.applicant_name,
      department: payload.department, designation: payload.designation,
      mobile: payload.mobile, submitted_at: new Date().toISOString()
    }));

    status.classList.add("success");
    status.innerHTML = `Online application submitted successfully to Samara HR. <strong>Application ID: ${code}</strong>. Please keep this reference for all recruitment communication.`;
    form.reset();
    form.dataset.languages = "[]";
    setCareerExperienceLevel("");
    updateCareerExperiencedNursing();
    renderCareerLanguages();
    updateCareerDriving();
    populateCareerDesignations("");
    populateCareerTaluks("current"); populateCareerTaluks("permanent");
    document.querySelectorAll(".career-file-name").forEach(node => node.textContent = "No file selected");
  } catch (error) {
    console.error("Career application submission failed", error);
    status.classList.add("error");
    status.textContent = error.message || "Unable to submit the online application. Please try again.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Submit Online Application";
  }
});

initSamaraInaugurationInvitation();
console.info(`Samara Website ${WEBSITE_VERSION}`);



// Automatic feedback sentiment classification — rating + written feedback.
function samaraClassifyFeedbackNature({rating,category,subject,message}){
  const r=Number(rating||0);
  const text=`${category||''} ${subject||''} ${message||''}`.toLowerCase();
  let score=0;
  if(r>=5) score+=4; else if(r===4) score+=3; else if(r===3) score+=0; else if(r===2) score-=3; else if(r===1) score-=4;
  const positive=[
    ['excellent',3],['very good',2],['good',1],['great',2],['wonderful',3],['fantastic',3],['superb',3],['happy',2],['satisfied',2],['thank',1],['thanks',1],['appreciate',2],['appreciation',2],['caring',2],['careful',1],['kind',2],['compassion',2],['comfortable',1],['helpful',2],['supportive',2],['professional',2],['clean',1],['prompt',1],['compliment',3],['improved',1],['well cared',3],['reassured',2]
  ];
  const negative=[
    ['bad',-2],['poor',-3],['terrible',-4],['worst',-4],['unhappy',-3],['dissatisfied',-3],['complaint',-3],['concern',-2],['problem',-2],['issue',-1],['delay',-2],['late',-1],['rude',-4],['unclean',-3],['dirty',-3],['pain',-1],['missed',-2],['not given',-3],['not done',-3],['no response',-3],['unresponsive',-3],['overcharge',-3],['wrong',-2],['disappointed',-3],['improve',-1],['improvement needed',-2],['unsafe',-4]
  ];
  positive.forEach(([term,val])=>{if(text.includes(term))score+=val});
  negative.forEach(([term,val])=>{if(text.includes(term))score+=val});
  if(String(category||'').toLowerCase().includes('compliment'))score+=3;
  if(String(category||'').toLowerCase().includes('complaint'))score-=3;
  // Strong star ratings remain decisive unless the written feedback strongly contradicts them.
  return score>=0?'Positive':'Negative';
}

// v2.3.2 — Website Feedback without WhatsApp OTP.
(() => {
  const form=document.querySelector('#feedback-form');
  if(!form)return;

  const replyRequested=form.querySelector('#feedback-reply-requested');
  const mobileInput=form.querySelector('#feedback-mobile');
  const status=form.querySelector('.form-status');
  const submitButton=form.querySelector('button[type="submit"]');

  const invokeFeedback=async body=>{
    if(!publicSupabase)throw new Error('Secure feedback connection is unavailable.');
    const {data,error}=await publicSupabase.functions.invoke('feedback-public',{body});
    if(error){
      const message=error?.context?.body?.error||error?.message||'Feedback service returned an error.';
      throw new Error(message);
    }
    if(data?.error)throw new Error(data.error);
    return data;
  };

  replyRequested?.addEventListener('change',()=>{
    if(replyRequested.checked)mobileInput?.focus();
  });

  form.addEventListener('submit',async event=>{
    event.preventDefault();
    const fd=new FormData(form);
    try{
      const wantsReply=!!fd.get('reply_requested');
      const mobile=clean(fd.get('mobile'));
      if(wantsReply && !mobile)throw new Error('Please enter your mobile number if you would like a WhatsApp reply.');

      submitButton.disabled=true;submitButton.textContent='Submitting…';
      status.className='form-status';status.textContent='Saving your feedback securely…';
      const rating=fd.get('rating');

      const result=await invokeFeedback({
        action:'submit_feedback',
        respondent_name:clean(fd.get('name')),
        respondent_type:clean(fd.get('respondent_type'))||'Public',
        feedback_nature:samaraClassifyFeedbackNature({rating:rating?Number(rating):null,category:clean(fd.get('category')),subject:clean(fd.get('subject')),message:clean(fd.get('message'))}),
        mobile,
        email:clean(fd.get('email')),
        patient_code:clean(fd.get('patient_code')),
        category:clean(fd.get('category'))||'General',
        rating:rating?Number(rating):null,
        subject:clean(fd.get('subject')),
        message:clean(fd.get('message')),
        reply_requested:wantsReply
      });

      form.reset();
      status.className='form-status success';
      status.innerHTML=`Thank you. Your feedback has been submitted successfully. <strong>Reference: ${result.feedback_reference}</strong>${wantsReply?' Samara will respond manually through the mobile/WhatsApp number provided.':''}`;
    }catch(error){
      console.error('Website feedback submission failed',error);
      status.className='form-status error';
      status.textContent=error.message||'Feedback could not be submitted. Please try again.';
    }finally{
      submitButton.disabled=false;submitButton.textContent='Submit Feedback';
    }
  });
})();

/* Samara Find Us + Location QR — restored on every public page */
(function(){
  function addLocationQr(){
    if(document.querySelector('.location-findus-float')) return;
    const whatsapp=document.querySelector('.whatsapp-float');
    if(!whatsapp) return;
    const button=document.createElement('button');
    button.type='button'; button.className='location-findus-float'; button.innerHTML='<span aria-hidden="true">⌖</span><b>Find Us</b>';
    button.setAttribute('aria-label','Show Samara location QR code');
    const modal=document.createElement('div'); modal.className='location-qr-modal'; modal.hidden=true;
    modal.innerHTML=`<div class="location-qr-card" role="dialog" aria-modal="true" aria-label="Samara Assisted Living location">
      <button type="button" class="location-qr-close" aria-label="Close">×</button>
      <h3>Find Samara Assisted Living</h3>
      <img src="./assets/location-qr.jpeg?v=20260813" alt="QR code for Samara Assisted Living location">
      <p>Scan the QR code or open Google Maps for directions.</p>
      <a class="btn btn-primary" href="https://maps.app.goo.gl/NwdW9T6WFnosJg8V7?g_st=iw" target="_blank" rel="noopener">Get Directions</a>
    </div>`;
    document.body.appendChild(modal); whatsapp.insertAdjacentElement('beforebegin',button);
    const close=()=>{modal.hidden=true;document.body.classList.remove('location-modal-open')};
    button.addEventListener('click',()=>{modal.hidden=false;document.body.classList.add('location-modal-open')});
    modal.querySelector('.location-qr-close').addEventListener('click',close);
    modal.addEventListener('click',e=>{if(e.target===modal)close()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close()});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',addLocationQr); else addLocationQr();
})();
