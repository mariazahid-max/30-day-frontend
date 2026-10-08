"use strict";

// ---------- Element references ----------
const form = document.getElementById("signup-form");
const steps = Array.from(form.querySelectorAll(".step"));
const stepItems = Array.from(document.querySelectorAll("#stepper .step-item"));
const stepper = document.getElementById("stepper");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const success = document.getElementById("success");
const restartBtn = document.getElementById("restartBtn");

const stepNames = ["Account", "Profile", "Preferences"];
let currentStep = 0;

// Date of birth cannot be in the future
document.getElementById("dob").max = new Date().toISOString().split("T")[0];

// ---------- Validation rules (custom messages) ----------
function getMessage(field) {
  const value = field.value.trim();

  switch (field.name) {
    case "email":
      if (field.validity.valueMissing) return "Please enter your email address.";
      if (field.validity.typeMismatch) return "Please enter a valid email address.";
      break;

    case "password":
      if (field.validity.valueMissing) return "Please create a password.";
      if (field.value.length < 8) return "Password must be at least 8 characters.";
      break;

    case "confirmPassword":
      if (field.validity.valueMissing) return "Please confirm your password.";
      if (field.value !== form.elements.password.value) return "Passwords do not match.";
      break;

    case "fullName":
      if (!value) return "Please enter your full name.";
      if (value.length < 2) return "Your name must be at least 2 characters.";
      break;

    case "phone":
      if (!value) return "Please enter your phone number.";
      if (!/^\+?[0-9\s\-()]{7,20}$/.test(value)) {
        return "Please enter a valid phone number, for example +92 300 1234567.";
      }
      break;

    case "dob": {
      if (!field.value) return "Please enter your date of birth.";
      const dob = new Date(field.value);
      const today = new Date();
      const minAgeDate = new Date();
      minAgeDate.setFullYear(today.getFullYear() - 13);
      if (isNaN(dob.getTime())) return "Please enter a valid date of birth.";
      if (dob > today) return "Date of birth cannot be in the future.";
      if (dob > minAgeDate) return "You must be at least 13 years old to sign up.";
      break;
    }

    case "terms":
      if (!field.checked) return "Please accept the terms to continue.";
      break;
  }
  return "";
}

// Show or clear the error for one element (input or fieldset)
function setError(target, message) {
  const errorBox = document.getElementById(target.id + "-error");
  errorBox.textContent = message;
  target.classList.toggle("invalid", Boolean(message));
  if (target.tagName === "INPUT" || target.tagName === "SELECT") {
    target.setAttribute("aria-invalid", message ? "true" : "false");
  }
}

function validateField(field) {
  const message = getMessage(field);
  setError(field, message);
  return !message;
}

// Checkbox/radio groups: at least one must be selected
function validateGroup(group) {
  const checked = form.querySelectorAll('input[name="' + group.dataset.group + '"]:checked');
  const message = checked.length ? "" : group.dataset.msg;
  setError(group, message);
  return !message;
}

// Validate every field in a step. Returns the first invalid element (or null).
function validateStep(index) {
  const step = steps[index];
  let firstInvalid = null;

  step.querySelectorAll("input[required]:not([type=radio]):not([type=checkbox]), input#terms").forEach(function (field) {
    if (!validateField(field) && !firstInvalid) firstInvalid = field;
  });

  step.querySelectorAll("fieldset[data-group]").forEach(function (group) {
    if (!validateGroup(group) && !firstInvalid) {
      firstInvalid = group.querySelector("input");
    }
  });

  return firstInvalid;
}

// ---------- Step switching ----------
function showStep(index, moveFocus) {
  currentStep = index;

  // Only hide/show sections so typed data is never lost
  steps.forEach(function (step, i) { step.hidden = i !== index; });

  // Update step indicator
  stepItems.forEach(function (item, i) {
    const status = i < index ? "completed" : i === index ? "current step" : "upcoming";
    item.classList.toggle("is-complete", i < index);
    item.classList.toggle("is-current", i === index);
    if (i === index) {
      item.setAttribute("aria-current", "step");
    } else {
      item.removeAttribute("aria-current");
    }
    item.querySelector(".sr-only").textContent = " (" + status + ")";
  });

  // Update buttons
  backBtn.hidden = index === 0;
  nextBtn.hidden = index === steps.length - 1;
  submitBtn.hidden = index !== steps.length - 1;

  if (moveFocus) steps[index].querySelector("h2").focus();
}

function goNext() {
  const firstInvalid = validateStep(currentStep);
  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }
  if (currentStep < steps.length - 1) showStep(currentStep + 1, true);
}

function goBack() {
  if (currentStep > 0) showStep(currentStep - 1, true);
}

// ---------- Events ----------
nextBtn.addEventListener("click", goNext);
backBtn.addEventListener("click", goBack);

// Enter key: move to the next step (or submit on the last step)
form.addEventListener("keydown", function (event) {
  if (event.key !== "Enter" || event.target.tagName !== "INPUT") return;
  event.preventDefault();
  if (currentStep < steps.length - 1) {
    goNext();
  } else {
    form.requestSubmit();
  }
});

// Live feedback: re-check a field once it has an error, or when the user leaves it
form.addEventListener("input", function (event) {
  const field = event.target;
  if (field.classList.contains("invalid")) validateField(field);

  // Keep "Confirm password" in sync when the password changes
  if (field.name === "password") {
    const confirm = form.elements.confirmPassword;
    if (confirm.value || confirm.classList.contains("invalid")) validateField(confirm);
  }
});

form.addEventListener("focusout", function (event) {
  const field = event.target;
  if (field.matches("input[required]:not([type=radio]):not([type=checkbox])") && field.value !== "") {
    validateField(field);
  }
});

// Group fields: clear the error as soon as one option is chosen
form.addEventListener("change", function (event) {
  const group = event.target.closest("fieldset[data-group]");
  if (group && group.classList.contains("invalid")) validateGroup(group);
  if (event.target.id === "terms" && event.target.classList.contains("invalid")) {
    validateField(event.target);
  }
});

// Final submit
form.addEventListener("submit", function (event) {
  event.preventDefault(); // no page reload, no data sent anywhere

  // Re-check every step in case something changed
  for (let i = 0; i < steps.length; i++) {
    const firstInvalid = validateStep(i);
    if (firstInvalid) {
      showStep(i, false);
      firstInvalid.focus();
      return;
    }
  }

  const name = form.elements.fullName.value.trim();
  document.getElementById("success-text").textContent =
    "Welcome, " + name + ". We have set up your account for " + form.elements.email.value + ".";

  form.hidden = true;
  stepper.parentElement.hidden = true;
  success.hidden = false;
  document.getElementById("success-title").focus();
});

// Start over
restartBtn.addEventListener("click", function () {
  form.reset();
  form.querySelectorAll(".invalid").forEach(function (el) { el.classList.remove("invalid"); });
  form.querySelectorAll(".error").forEach(function (el) { el.textContent = ""; });
  form.querySelectorAll("[aria-invalid]").forEach(function (el) { el.removeAttribute("aria-invalid"); });

  success.hidden = true;
  form.hidden = false;
  stepper.parentElement.hidden = false;
  showStep(0, false);
  form.elements.email.focus();
});

// Initial state
showStep(0, false);
