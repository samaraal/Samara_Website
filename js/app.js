
const WEBSITE_VERSION = "2.1.0";
const SAMARA_WHATSAPP = "917395961616";
const SAMARA_PHONE = "073959 61616";


const SAMARA_INVITATION_END = new Date(2026, 8, 1, 0, 0, 0); // Visible through 31-Aug-2026; stops from 01-Sep-2026.
const SAMARA_INVITATION_SESSION_KEY = 'samara_inauguration_invitation_aug2026_v2';

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
          position:fixed;inset:0;z-index:2147483500;
          display:flex;align-items:center;justify-content:center;
          padding:max(12px,env(safe-area-inset-top)) 12px max(12px,env(safe-area-inset-bottom));
          background:rgba(38,16,29,.78);
          backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
          animation:samaraInviteFade .28s ease both;
        }
        #samara-inauguration-modal .samara-invite-card{
          position:relative;display:flex;align-items:center;justify-content:center;
          width:min(94vw,780px);height:min(92vh,1080px);
          border-radius:18px;overflow:hidden;background:#fff;
          box-shadow:0 28px 80px rgba(0,0,0,.38);
          animation:samaraInviteRise .35s ease both;
        }
        #samara-inauguration-modal img{
          display:block;max-width:100%;max-height:100%;
          width:auto;height:auto;object-fit:contain;background:#fff;
        }
        #samara-inauguration-modal .samara-invite-close{
          position:absolute;top:10px;right:10px;z-index:2;
          min-width:46px;height:46px;padding:0 13px;border:0;border-radius:999px;
          display:flex;align-items:center;justify-content:center;
          background:rgba(255,255,255,.96);color:#7a1247;
          box-shadow:0 5px 20px rgba(40,10,28,.22);
          font:800 28px/1 Arial,sans-serif;cursor:pointer;
          opacity:0;visibility:hidden;transform:scale(.88);
          transition:.2s ease;
        }
        #samara-inauguration-modal .samara-invite-close.ready{
          opacity:1;visibility:visible;transform:scale(1);
        }
        #samara-inauguration-modal .samara-invite-close:focus-visible{
          outline:3px solid #f08ab9;outline-offset:3px;
        }
        @keyframes samaraInviteFade{from{opacity:0}to{opacity:1}}
        @keyframes samaraInviteRise{from{opacity:0;transform:translateY(12px) scale(.985)}to{opacity:1;transform:none}}
        @media(max-width:600px){
          #samara-inauguration-modal{padding:8px}
          #samara-inauguration-modal .samara-invite-card{
            width:96vw;height:92dvh;border-radius:14px;
          }
          #samara-inauguration-modal .samara-invite-close{
            top:8px;right:8px;min-width:44px;height:44px;font-size:26px;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const modal=document.createElement('div');
    modal.id='samara-inauguration-modal';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-label','Samara Assisted Living inauguration invitation');

    const card=document.createElement('div');
    card.className='samara-invite-card';

    const image=document.createElement('img');
    image.src='./assets/samara-inauguration-27-08-2026.png';
    image.alt='Invitation to the inauguration of Samara Assisted Living on 27 August 2026, Mogappair, Chennai';
    image.decoding='async';

    const close=document.createElement('button');
    close.type='button';
    close.className='samara-invite-close';
    close.setAttribute('aria-label','Close inauguration invitation');
    close.title='Close';
    close.textContent='×';

    const remove=()=>{
      modal.style.opacity='0';
      modal.style.transition='opacity .18s ease';
      window.setTimeout(()=>modal.remove(),190);
    };

    close.addEventListener('click',remove);
    document.addEventListener('keydown',function escHandler(event){
      if(event.key==='Escape'&&close.classList.contains('ready')){
        document.removeEventListener('keydown',escHandler);
        remove();
      }
    });

    card.append(image,close);
    modal.appendChild(card);
    document.body.appendChild(modal);
    sessionStorage.setItem(SAMARA_INVITATION_SESSION_KEY,'shown');

    window.setTimeout(()=>{
      if(document.body.contains(close)){
        close.classList.add('ready');
        close.focus({preventScroll:true});
      }
    },4000);
  }catch(error){
    console.warn('Samara inauguration invitation could not be displayed.',error);
  }
}

function initSamaraInaugurationInvitation(){
  window.setTimeout(showSamaraInaugurationInvitation,650);
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

document.querySelector("#visit-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = [
    "*Samara – Visit Request*",
    `Visitor: ${clean(data.get("name"))}`,
    `Mobile: ${clean(data.get("mobile"))}`,
    `Preferred Date: ${clean(data.get("date"))}`,
    `Preferred Time: ${clean(data.get("time"))}`,
    `Purpose: ${clean(data.get("message")) || "Not specified"}`
  ].join("\n");
  whatsapp(message, event.currentTarget.querySelector(".form-status"));
});

document.querySelector("#enquiry-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = [
    "*Samara – Admission Enquiry*",
    `Resident: ${clean(data.get("resident"))}`,
    `Age: ${clean(data.get("age")) || "Not specified"}`,
    `Contact Person: ${clean(data.get("contact"))}`,
    `Mobile: ${clean(data.get("mobile"))}`,
    `Care Type: ${clean(data.get("care"))}`,
    `Preferred Room: ${clean(data.get("room"))}`,
    `Condition / Requirements: ${clean(data.get("condition")) || "Not specified"}`
  ].join("\n");
  whatsapp(message, event.currentTarget.querySelector(".form-status"));
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

function selectedSkills(form) {
  return [...form.querySelectorAll('input[name="skills"]:checked')].map(input => input.value);
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
      field.required = isExperienced && field.name === "qualification";
      if (!isExperienced) {
        if (field.tagName === "SELECT") field.selectedIndex = 0;
        else field.value = "";
      }
    });
  });
}

document.querySelector("#career-experience-level")?.addEventListener("change", event => setCareerExperienceLevel(event.target.value));
document.querySelector("#career-department")?.addEventListener("change", event => populateCareerDesignations(event.target.value));
document.querySelector("#career-current-district")?.addEventListener("change", () => { populateCareerTaluks("current"); syncCareerAddress(document.querySelector("#career-form"),"current"); });
document.querySelector("#career-permanent-district")?.addEventListener("change", () => { populateCareerTaluks("permanent"); syncCareerAddress(document.querySelector("#career-form"),"permanent"); });

document.querySelectorAll(".career-role-apply").forEach(button => {
  button.addEventListener("click", () => {
    const department = document.querySelector("#career-department");
    if (department) {
      department.value = button.dataset.careerDepartment || "";
      populateCareerDesignations(department.value, button.dataset.careerDesignation || "");
    }
    document.querySelector("#career-application")?.scrollIntoView({ behavior: "smooth" });
  });
});

const careerForm = document.querySelector("#career-form");
if (careerForm) {
  setCareerExperienceLevel(careerForm.elements.experience_level?.value || "");
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
    const experienceCert = validateCareerFile(form.elements.experience_certificate);
    const otherCert = validateCareerFile(form.elements.other_certificate);

    const data = new FormData(form);
    const applicationId = careerApplicationId();
    const uploadId = crypto.randomUUID();
    const skills = selectedSkills(form);

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
      qualification: clean(data.get("experience_level")) === "Fresher" ? clean(data.get("course_details")) : clean(data.get("qualification")),
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
      employment_type: clean(data.get("employment_type")),
      preferred_shift: clean(data.get("shift")),
      skills,
      additional_information: [
        `Experience Level: ${clean(data.get("experience_level"))}`,
        clean(data.get("experience_level")) === "Fresher" && clean(data.get("last_institution")) ? `Last Institution: ${clean(data.get("last_institution"))}` : "",
        clean(data.get("experience_level")) === "Fresher" && clean(data.get("course_details")) ? `Course Details: ${clean(data.get("course_details"))}` : "",
        clean(data.get("additional"))
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
    setCareerExperienceLevel("");
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



// v2.3.0 — Verified Website Feedback with WhatsApp OTP.
(() => {
  const form=document.querySelector('#feedback-form');
  if(!form)return;

  const replyRequested=form.querySelector('#feedback-reply-requested');
  const mobileInput=form.querySelector('#feedback-mobile');
  const otpBox=form.querySelector('#feedback-otp-box');
  const sendOtp=form.querySelector('#feedback-send-otp');
  const verifyOtp=form.querySelector('#feedback-verify-otp');
  const otpInput=form.querySelector('#feedback-otp-code');
  const verifiedState=form.querySelector('#feedback-verified-state');
  const status=form.querySelector('.form-status');
  const submitButton=form.querySelector('button[type="submit"]');

  let challengeId='';
  let verificationToken='';
  let verifiedMobile='';

  const invokeFeedback=async body=>{
    if(!publicSupabase)throw new Error('Secure feedback connection is unavailable.');
    const {data,error}=await publicSupabase.functions.invoke('feedback-public',{body});
    if(error)throw error;
    if(data?.error)throw new Error(data.error);
    return data;
  };

  function resetVerification(){
    challengeId='';verificationToken='';verifiedMobile='';
    if(verifiedState){verifiedState.textContent='Not verified';verifiedState.classList.remove('verified');}
  }

  replyRequested?.addEventListener('change',()=>{
    otpBox.hidden=!replyRequested.checked;
    if(replyRequested.checked)mobileInput?.focus();
    else resetVerification();
  });

  mobileInput?.addEventListener('input',()=>{
    if(verifiedMobile && String(mobileInput.value||'').replace(/\D/g,'')!==verifiedMobile.replace(/^91/,''))resetVerification();
  });

  sendOtp?.addEventListener('click',async()=>{
    try{
      const mobile=clean(mobileInput?.value);
      if(!mobile)throw new Error('Please enter your WhatsApp number.');
      sendOtp.disabled=true;sendOtp.textContent='Sending…';
      const result=await invokeFeedback({action:'send_otp',mobile});
      challengeId=result.challenge_id;
      otpBox.hidden=false;
      verifiedState.textContent='Verification code sent through WhatsApp. It expires in 10 minutes.';
      otpInput?.focus();
    }catch(error){status.className='form-status error';status.textContent=error.message||'Unable to send verification code.';}
    finally{sendOtp.disabled=false;sendOtp.textContent='Verify';}
  });

  verifyOtp?.addEventListener('click',async()=>{
    try{
      if(!challengeId)throw new Error('Please request a verification code first.');
      const mobile=clean(mobileInput?.value),code=clean(otpInput?.value);
      verifyOtp.disabled=true;verifyOtp.textContent='Checking…';
      const result=await invokeFeedback({action:'verify_otp',mobile,challenge_id:challengeId,code});
      verificationToken=result.verification_token;
      verifiedMobile=String(mobile||'').replace(/\D/g,'');
      verifiedState.textContent='✓ WhatsApp number verified';
      verifiedState.classList.add('verified');
      status.className='form-status success';status.textContent='WhatsApp number verified successfully.';
    }catch(error){status.className='form-status error';status.textContent=error.message||'Verification failed.';}
    finally{verifyOtp.disabled=false;verifyOtp.textContent='Confirm Code';}
  });

  form.addEventListener('submit',async event=>{
    event.preventDefault();
    const fd=new FormData(form);
    try{
      const wantsReply=!!fd.get('reply_requested');
      if(wantsReply && !verificationToken)throw new Error('Please verify your WhatsApp number before submitting feedback.');

      submitButton.disabled=true;submitButton.textContent='Submitting…';
      status.className='form-status';status.textContent='Saving your feedback securely…';
      const rating=fd.get('rating');

      const result=await invokeFeedback({
        action:'submit_feedback',
        respondent_name:clean(fd.get('name')),
        respondent_type:clean(fd.get('respondent_type'))||'Visitor',
        mobile:clean(fd.get('mobile')),
        email:clean(fd.get('email')),
        patient_code:clean(fd.get('patient_code')),
        category:clean(fd.get('category'))||'General',
        rating:rating?Number(rating):null,
        subject:clean(fd.get('subject')),
        message:clean(fd.get('message')),
        reply_requested:wantsReply,
        verification_token:verificationToken
      });

      form.reset();otpBox.hidden=true;resetVerification();
      status.className='form-status success';
      status.innerHTML=`Thank you. Your feedback has been submitted successfully. <strong>Reference: ${result.feedback_reference}</strong>${wantsReply?' Samara will reply through your verified WhatsApp number.':''}`;
    }catch(error){
      console.error(error);
      status.className='form-status error';
      status.textContent=error.message||'Feedback could not be submitted. Please try again.';
    }finally{
      submitButton.disabled=false;submitButton.textContent='Submit Feedback';
    }
  });
})();
