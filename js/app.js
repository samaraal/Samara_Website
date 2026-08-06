
const WEBSITE_VERSION = "2.0.0";
const SAMARA_WHATSAPP = "910000000000";
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");

menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
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

function openWhatsApp(message, statusNode) {
  localStorage.setItem("samara_public_last_request", JSON.stringify({
    message,
    created_at: new Date().toISOString()
  }));
  if (statusNode) statusNode.textContent = "Opening WhatsApp with your request…";
  window.open(
    `https://wa.me/${SAMARA_WHATSAPP}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer"
  );
}

function applicationId(prefix) {
  const now = new Date();
  const stamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("");
  return `${prefix}-${stamp}-${Math.floor(1000 + Math.random() * 9000)}`;
}

document.querySelector("#visit-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const status = form.querySelector(".form-status");
  const message = [
    "*Samara – Visit Request*",
    `Visitor: ${clean(data.get("name"))}`,
    `Mobile: ${clean(data.get("mobile"))}`,
    `Preferred Date: ${clean(data.get("date"))}`,
    `Preferred Time: ${clean(data.get("time"))}`,
    `Purpose: ${clean(data.get("message")) || "Not specified"}`
  ].join("\n");
  openWhatsApp(message, status);
});

document.querySelector("#enquiry-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const status = form.querySelector(".form-status");
  const enquiryId = applicationId("SAM-ENQ");
  const message = [
    "*Samara – Admission Enquiry*",
    `Enquiry ID: ${enquiryId}`,
    `Resident: ${clean(data.get("resident"))}`,
    `Age: ${clean(data.get("age")) || "Not specified"}`,
    `Contact Person: ${clean(data.get("contact"))}`,
    `Mobile: ${clean(data.get("mobile"))}`,
    `Care Type: ${clean(data.get("care"))}`,
    `Preferred Room: ${clean(data.get("room"))}`,
    `Condition / Requirements: ${clean(data.get("condition")) || "Not specified"}`
  ].join("\n");
  openWhatsApp(message, status);
});

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
    const file = input.files?.[0];
    if (!display) return;
    display.textContent = file
      ? `${file.name} · ${(file.size / 1024 / 1024).toFixed(2)} MB`
      : "No file selected";
  });
});

function validateFile(input, mandatory = false) {
  const file = input?.files?.[0];
  if (!file) {
    if (mandatory) throw new Error("Please select your Resume / CV.");
    return null;
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`${file.name} exceeds the maximum permitted size of 10 MB.`);
  }
  return file;
}

document.querySelector("#career-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector(".form-status");
  status.className = "form-status";
  status.textContent = "";

  const invalid = form.querySelector(":invalid");
  if (invalid) {
    invalid.focus();
    invalid.reportValidity();
    status.classList.add("status-error");
    status.textContent = "Please complete all mandatory fields before submitting.";
    return;
  }

  try {
    const resume = validateFile(form.elements.resume, true);
    const photo = validateFile(form.elements.photo);
    const certificate = validateFile(form.elements.certificate);
    const identity = validateFile(form.elements.identity);

    const data = new FormData(form);
    const id = applicationId("SAM-HR");
    const skills = [...form.querySelectorAll('input[name="skills"]:checked')]
      .map(input => input.value);

    const message = [
      "*Samara – Career Application*",
      `Application ID: ${id}`,
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
      "*Please attach the selected Resume and documents manually in this WhatsApp chat.*"
    ].join("\n");

    localStorage.setItem("samara_last_career_application", JSON.stringify({
      application_id: id,
      applicant: clean(data.get("name")),
      role: clean(data.get("role")),
      mobile: clean(data.get("mobile")),
      resume_name: resume.name,
      submitted_at: new Date().toISOString()
    }));

    status.classList.add("status-success");
    status.innerHTML = `Application prepared successfully. <strong>Application ID: ${id}</strong>. Opening WhatsApp…`;
    setTimeout(() => openWhatsApp(message, status), 350);
  } catch (error) {
    status.classList.add("status-error");
    status.textContent = error.message || "Unable to prepare the career application.";
  }
});

console.info(`Samara Website ${WEBSITE_VERSION}`);
