
const WEBSITE_VERSION = "1.2.0";
const SAMARA_WHATSAPP = "910000000000";
const SAMARA_PHONE = "+91 00000 00000";


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

function whatsapp(message, statusNode) {
  localStorage.setItem("samara_public_last_request", JSON.stringify({
    message,
    created_at: new Date().toISOString()
  }));
  if (statusNode) statusNode.textContent = "Opening WhatsApp with your request…";
  window.open(`https://wa.me/${SAMARA_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
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
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("");
  const random = String(Math.floor(1000 + Math.random() * 9000));
  return `SAM-HR-${date}-${random}`;
}

function selectedSkills(form) {
  return [...form.querySelectorAll('input[name="skills"]:checked')]
    .map(input => input.value);
}

function validateCareerFile(input, required = false) {
  const file = input.files?.[0];
  if (!file) {
    if (required) throw new Error("Please select your Resume / CV.");
    return null;
  }
  if (file.size > MAX_CAREER_FILE_SIZE) {
    throw new Error(`${file.name} exceeds the maximum permitted size of 10 MB.`);
  }
  return file;
}

document.querySelectorAll(".career-role-apply").forEach(button => {
  button.addEventListener("click", () => {
    const role = document.querySelector("#career-role");
    if (role) role.value = button.dataset.careerRole || "";
    document.querySelector("#career-application")?.scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll('.career-upload-card input[type="file"]').forEach(input => {
  input.addEventListener("change", () => {
    const display = input.closest(".career-upload-card")?.querySelector(".career-file-name");
    if (!display) return;
    const file = input.files?.[0];
    display.textContent = file
      ? `${file.name} · ${(file.size / 1024 / 1024).toFixed(2)} MB`
      : "No file selected";
  });
});

document.querySelector("#career-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector(".form-status");
  status.className = "form-status career-form-status";
  status.textContent = "";

  const firstInvalid = form.querySelector(":invalid");
  if (firstInvalid) {
    firstInvalid.focus();
    firstInvalid.reportValidity();
    status.classList.add("error");
    status.textContent = "Please complete all mandatory fields before submitting.";
    return;
  }

  try {
    const resume = validateCareerFile(form.elements.resume, true);
    const photo = validateCareerFile(form.elements.photo);
    const certificate = validateCareerFile(form.elements.certificate);
    const identity = validateCareerFile(form.elements.identity);
    const data = new FormData(form);
    const applicationId = careerApplicationId();
    const skills = selectedSkills(form);

    const message = [
      "*Samara – Career Application*",
      `Application ID: ${applicationId}`,
      `Applicant: ${clean(data.get("name"))}`,
      `Gender: ${clean(data.get("gender"))}`,
      `Date of Birth: ${clean(data.get("dob")) || "Not specified"}`,
      `Mobile: ${clean(data.get("mobile"))}`,
      `WhatsApp: ${clean(data.get("whatsapp")) || clean(data.get("mobile"))}`,
      `Email: ${clean(data.get("email"))}`,
      `Address: ${clean(data.get("address"))}, ${clean(data.get("city"))}, ${clean(data.get("state"))} ${clean(data.get("pin"))}`,
      `Position: ${clean(data.get("role"))}`,
      `Qualification: ${clean(data.get("qualification"))}`,
      `Registration No.: ${clean(data.get("registration")) || "Not applicable / not specified"}`,
      `Experience: ${clean(data.get("experience")) || "Not specified"}`,
      `Employer: ${clean(data.get("employer")) || "Not specified"}`,
      `Current Salary: ${clean(data.get("current_salary")) || "Not specified"}`,
      `Expected Salary: ${clean(data.get("expected_salary")) || "Not specified"}`,
      `Notice Period: ${clean(data.get("notice_period"))}`,
      `Employment Type: ${clean(data.get("employment_type"))}`,
      `Preferred Shift: ${clean(data.get("shift"))}`,
      `Skills: ${skills.length ? skills.join(", ") : "Not specified"}`,
      `Additional Information: ${clean(data.get("additional")) || "Not specified"}`,
      `Resume selected: ${resume.name}`,
      `Photo selected: ${photo?.name || "No"}`,
      `Certificate selected: ${certificate?.name || "No"}`,
      `Identity Proof selected: ${identity?.name || "No"}`,
      "",
      "*Please attach the selected Resume and supporting files manually in this WhatsApp chat.*"
    ].join("\n");

    localStorage.setItem("samara_last_career_application", JSON.stringify({
      application_id: applicationId,
      applicant: clean(data.get("name")),
      role: clean(data.get("role")),
      mobile: clean(data.get("mobile")),
      submitted_at: new Date().toISOString(),
      resume_name: resume.name
    }));

    status.classList.add("success");
    status.innerHTML = `Application prepared successfully. <strong>Application ID: ${applicationId}</strong>. Opening WhatsApp…`;
    setTimeout(() => whatsapp(message, status), 350);
  } catch (error) {
    status.classList.add("error");
    status.textContent = error.message || "Unable to prepare the career application.";
  }
});

console.info(`Samara Website ${WEBSITE_VERSION}`);
