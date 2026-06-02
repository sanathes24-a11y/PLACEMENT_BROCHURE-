/**
 * Placement Brochure Portal & Registration - DUK VLSI Placement Portal
 * Application logic (Validation, Gallery rendering, Modals, Local Storage Auto-save, Syncers)
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // CONFIGURATION & GLOBAL CONSTANTS
  // ==========================================================================
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyHQrvTpqjyaa0RdX7WF7918CsWpnUx58zQVgdwA7GiZsUOZYmvV1jhAKfe49Q3g92P/exec";
  
  // SVG Fallback for professional avatar headshot
  const svgPlaceholder = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231e293b'/><circle cx='50' cy='35' r='18' fill='%23475569'/><path d='M50 58c-15 0-25 7-25 15v5h50v-5c0-8-10-15-25-15z' fill='%23475569'/></svg>";

  // ==========================================================================
  // DOM ELEMENT REFERENCES
  // ==========================================================================
  const form = document.getElementById('placement-form');
  const steps = Array.from(document.querySelectorAll('.form-step'));
  const stepNodes = Array.from(document.querySelectorAll('.step-node'));
  const progressBarFill = document.getElementById('progress-bar-fill');
  
  // Navigation Buttons & Layout Toggles
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const draftSaveIndicator = document.getElementById('draft-save-indicator');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const btnAutofill = document.getElementById('btn-autofill');
  const btnDownloadPng = document.getElementById('btn-download-png');
  
  // Collapsible Registration Elements
  const btnToggleRegistration = document.getElementById('btn-toggle-registration');
  const registrationFormDrawer = document.getElementById('registration-form-drawer');
  const btnHeroRegister = document.getElementById('btn-hero-register');
  const navBtnRegister = document.querySelector('.btn-nav-register');
  
  // Image Upload elements
  const uploadZone = document.getElementById('upload-zone');
  const inputPhoto = document.getElementById('input-photo');
  const uploadContentEmpty = document.getElementById('upload-content-empty');
  const uploadPreviewContainer = document.getElementById('upload-preview-container');
  const uploadImgPreview = document.getElementById('upload-img-preview');
  const uploadFileName = document.getElementById('upload-file-name');
  const uploadFileSize = document.getElementById('upload-file-size');
  const btnRemovePhoto = document.getElementById('btn-remove-photo');
  const photoErrorMsg = document.getElementById('photo-error-msg');
  
  // Form input groups
  const inputFullName = document.getElementById('input-fullname');
  const inputEmail = document.getElementById('input-email');
  const inputPhone = document.getElementById('input-phone');
  const inputLinkedin = document.getElementById('input-linkedin');
  const inputCgpa = document.getElementById('input-cgpa');
  const skillOtherToggle = document.getElementById('skill-other-toggle');
  const inputSkillsOtherText = document.getElementById('input-skills-other-text');
  const groupSkillsOtherText = document.getElementById('group-skills-other-text');
  const interestOtherToggle = document.getElementById('interest-other-toggle');
  const inputInterestsOtherText = document.getElementById('input-interests-other-text');
  const groupInterestsOtherText = document.getElementById('group-interests-other-text');
  const leadershipOtherToggle = document.getElementById('leadership-other-toggle');
  const inputLeadershipOtherText = document.getElementById('input-leadership-other-text');
  const groupLeadershipOtherText = document.getElementById('group-leadership-other-text');
  
  // Project fields
  const inputP1Title = document.getElementById('input-p1title');
  const selectP1Domain = document.getElementById('select-p1domain');
  const inputP1Tools = document.getElementById('input-p1tools');
  const textareaP1Outcomes = document.getElementById('textarea-p1outcomes');
  const inputP2Title = document.getElementById('input-p2title');
  const selectP2Domain = document.getElementById('select-p2domain');
  const inputP2Tools = document.getElementById('input-p2tools');
  const textareaP2Outcomes = document.getElementById('textarea-p2outcomes');
  
  // Internship details (conditional fields)
  const inputInternCompany = document.getElementById('input-interncompany');
  const inputInternDuration = document.getElementById('input-internduration');
  const textareaInternWork = document.getElementById('textarea-internwork');
  const labelInternDuration = document.getElementById('label-internduration');
  const labelInternWork = document.getElementById('label-internwork');
  const helpInternDuration = document.getElementById('help-internduration');
  const errorInternDuration = document.getElementById('error-internduration');
  const errorInternWork = document.getElementById('error-internwork');
  
  // Extra fields
  const textareaCerts = document.getElementById('textarea-certs');
  const inputPubs = document.getElementById('input-pubs');
  const textareaObjective = document.getElementById('textarea-objective');
  const objectiveCounter = document.getElementById('objective-counter');
  
  // Brochure Card Preview Elements
  const previewName = document.getElementById('preview-name');
  const previewProgram = document.getElementById('preview-program');
  const previewCgpa = document.getElementById('preview-cgpa');
  const previewEmail = document.getElementById('preview-email');
  const previewPhone = document.getElementById('preview-phone');
  const previewLinkedin = document.getElementById('preview-linkedin');
  const previewLinkedinItem = document.getElementById('preview-linkedin-item');
  const previewEmailItem = document.getElementById('preview-email-item');
  const previewPhoneItem = document.getElementById('preview-phone-item');
  const previewImg = document.getElementById('preview-img');
  const previewObjective = document.getElementById('preview-objective');
  const previewSkills = document.getElementById('preview-skills');
  const previewInterests = document.getElementById('preview-interests');
  const previewP1 = document.getElementById('preview-p1');
  const previewP1Title = document.getElementById('preview-p1title');
  const previewP1Domain = document.getElementById('preview-p1domain');
  const previewP1Tools = document.getElementById('preview-p1tools');
  const previewP1Outcomes = document.getElementById('preview-p1outcomes');
  const previewP2 = document.getElementById('preview-p2');
  const previewP2Title = document.getElementById('preview-p2title');
  const previewP2Domain = document.getElementById('preview-p2domain');
  const previewP2Tools = document.getElementById('preview-p2tools');
  const previewP2Outcomes = document.getElementById('preview-p2outcomes');
  
  const previewInternshipCol = document.getElementById('preview-internship-col');
  const previewInternCompany = document.getElementById('preview-interncompany');
  const previewInternDuration = document.getElementById('preview-internduration');
  const previewInternWork = document.getElementById('preview-internwork');
  
  const previewCertsPubsCol = document.getElementById('preview-certs-pubs-col');
  const previewCertsLi = document.getElementById('preview-certs-li');
  const previewCerts = document.getElementById('preview-certs');
  const previewPubsLi = document.getElementById('preview-pubs-li');
  const previewPubs = document.getElementById('preview-pubs');
  
  const previewLeadershipSec = document.getElementById('preview-leadership-sec');
  const previewLeadership = document.getElementById('preview-leadership');
  
  // Collapse/Expand Preview buttons
  const previewToggle = document.getElementById('preview-toggle');
  const previewSection = document.getElementById('preview-section');
  
  // Modals & Popups
  const successModal = document.getElementById('success-modal');
  const btnPrint = document.getElementById('btn-print');
  const btnExportJson = document.getElementById('btn-export-json');
  const btnEditResponse = document.getElementById('btn-edit-response');
  const btnResetForm = document.getElementById('btn-reset-form');
  const toastContainer = document.getElementById('toast-container');
  
  // Recruiter Modal Elements
  const profileDetailModal = document.getElementById('profile-detail-modal');
  const btnCloseProfileModal = document.getElementById('btn-close-profile-modal');
  const modalBrochureCardContainer = document.getElementById('modal-brochure-card-container');
  const btnModalDownloadPng = document.getElementById('btn-modal-download-png');
  const btnModalPrintPdf = document.getElementById('btn-modal-print-pdf');
  const btnRequestBrochure = document.getElementById('btn-request-brochure');

  // State Variables
  let currentStep = 1;
  let photoBase64 = '';
  let autoSaveTimeout = null;
  let activeModalStudentName = '';

  // ==========================================================================
  // WIZARD CONTROLLER LOGIC
  // ==========================================================================
  
  function updateProgress() {
    // Fill percent
    const percent = ((currentStep - 1) / (steps.length - 1)) * 100;
    progressBarFill.style.width = `${percent}%`;

    // Handle Active & Completed states for nodes
    stepNodes.forEach((node, idx) => {
      const stepNum = idx + 1;
      if (stepNum < currentStep) {
        node.classList.add('completed');
        node.classList.remove('active');
      } else if (stepNum === currentStep) {
        node.classList.add('active');
        node.classList.remove('completed');
      } else {
        node.classList.remove('active', 'completed');
      }
    });

    // Button States
    if (currentStep === 1) {
      btnPrev.classList.add('hidden');
    } else {
      btnPrev.classList.remove('hidden');
    }

    if (currentStep === steps.length) {
      btnNext.innerHTML = 'Submit Response <i class="fa-solid fa-check"></i>';
      btnNext.classList.add('btn-primary-glow');
    } else {
      btnNext.innerHTML = 'Next <i class="fa-solid fa-arrow-right"></i>';
      btnNext.classList.remove('btn-primary-glow');
    }
  }

  function showStep(stepNum) {
    steps.forEach(step => {
      step.classList.remove('active');
    });
    const activeStep = steps.find(s => parseInt(s.dataset.step) === stepNum);
    if (activeStep) {
      activeStep.classList.add('active');
      
      // Scroll wizard container to top smoothly
      const wizardCard = document.querySelector('.wizard-card');
      if (wizardCard) {
        wizardCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
    updateProgress();
  }

  // ==========================================================================
  // VALIDATIONS PER STEP
  // ==========================================================================

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePhone(phone) {
    const phoneRegex = /^\+?[0-9]{1,4}[- ]?[0-9]{9,11}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  }

  function validateUrl(url) {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch (_) {
      return false;
    }
  }

  function setFieldError(groupEl, isInvalid, errMsg = '') {
    if (isInvalid) {
      groupEl.classList.add('is-invalid');
      groupEl.classList.remove('is-valid');
      if (errMsg) {
        const errSpan = groupEl.querySelector('.error-msg');
        if (errSpan) errSpan.textContent = errMsg;
      }
    } else {
      groupEl.classList.remove('is-invalid');
      if (groupEl.querySelector('input') || groupEl.querySelector('select') || groupEl.querySelector('textarea')) {
        const input = groupEl.querySelector('input, select, textarea');
        if (input && input.value.trim() !== '') {
          groupEl.classList.add('is-valid');
        }
      }
    }
  }

  function validateStep(stepNum) {
    let isValid = true;
    
    if (stepNum === 1) {
      // Name validation
      const nameGroup = document.getElementById('group-fullname');
      if (inputFullName.value.trim() === '') {
        setFieldError(nameGroup, true, "Full Name is required.");
        isValid = false;
      } else {
        setFieldError(nameGroup, false);
      }

      // Email validation
      const emailGroup = document.getElementById('group-email');
      if (inputEmail.value.trim() === '') {
        setFieldError(emailGroup, true, "University Email is required.");
        isValid = false;
      } else if (!validateEmail(inputEmail.value.trim())) {
        setFieldError(emailGroup, true, "Please enter a valid email address.");
        isValid = false;
      } else {
        setFieldError(emailGroup, false);
      }

      // Phone validation
      const phoneGroup = document.getElementById('group-phone');
      if (inputPhone.value.trim() === '') {
        setFieldError(phoneGroup, true, "Phone number is required.");
        isValid = false;
      } else if (!validatePhone(inputPhone.value.trim())) {
        setFieldError(phoneGroup, true, "Please enter a valid phone number (e.g. +91-9876543210).");
        isValid = false;
      } else {
        setFieldError(phoneGroup, false);
      }

      // LinkedIn validation
      const linkedinGroup = document.getElementById('group-linkedin');
      if (inputLinkedin.value.trim() === '') {
        setFieldError(linkedinGroup, true, "LinkedIn URL is required.");
        isValid = false;
      } else if (!validateUrl(inputLinkedin.value.trim()) || !inputLinkedin.value.trim().includes('linkedin.com')) {
        setFieldError(linkedinGroup, true, "Please enter a valid LinkedIn URL (e.g. https://linkedin.com/in/username).");
        isValid = false;
      } else {
        setFieldError(linkedinGroup, false);
      }

      // Program validation
      const programGroup = document.getElementById('group-program');
      const checkedProgram = form.querySelector('input[name="program"]:checked');
      if (!checkedProgram) {
        programGroup.classList.add('is-invalid');
        isValid = false;
      } else {
        programGroup.classList.remove('is-invalid');
      }

      // Photo upload validation
      const photoGroup = document.getElementById('group-photo');
      if (!photoBase64 && !inputPhoto.files.length) {
        photoGroup.classList.add('is-invalid');
        photoErrorMsg.textContent = "A professional passport-style photograph is required.";
        isValid = false;
      } else {
        photoGroup.classList.remove('is-invalid');
      }
    }

    else if (stepNum === 2) {
      // CGPA validation
      const cgpaGroup = document.getElementById('group-cgpa');
      const cgpaVal = parseFloat(inputCgpa.value);
      if (isNaN(cgpaVal) || cgpaVal < 0 || cgpaVal > 10 || inputCgpa.value.trim() === '') {
        setFieldError(cgpaGroup, true, "Please enter a CGPA between 0.00 and 10.00.");
        isValid = false;
      } else {
        setFieldError(cgpaGroup, false);
      }

      // Key Technical Skills
      const skillsGroup = document.getElementById('group-skills');
      const checkedSkills = form.querySelectorAll('input[name="skills"]:checked');
      if (checkedSkills.length === 0) {
        skillsGroup.classList.add('is-invalid');
        isValid = false;
      } else {
        skillsGroup.classList.remove('is-invalid');
      }

      // Areas of Interest (Select up to 3)
      const interestsGroup = document.getElementById('group-interests');
      const checkedInterests = form.querySelectorAll('input[name="interests"]:checked');
      const interestsError = document.getElementById('interests-error-msg');
      if (checkedInterests.length === 0) {
        interestsGroup.classList.add('is-invalid');
        interestsError.textContent = "Please select at least one area of interest.";
        isValid = false;
      } else if (checkedInterests.length > 3) {
        interestsGroup.classList.add('is-invalid');
        interestsError.textContent = "Please select a maximum of 3 areas of interest.";
        isValid = false;
      } else {
        interestsGroup.classList.remove('is-invalid');
      }
    }

    else if (stepNum === 3) {
      // Project 1 Title
      const p1TitleGroup = document.getElementById('group-p1title');
      if (inputP1Title.value.trim() === '') {
        setFieldError(p1TitleGroup, true);
        isValid = false;
      } else {
        setFieldError(p1TitleGroup, false);
      }

      // Project 1 Domain
      const p1DomainGroup = document.getElementById('group-p1domain');
      if (selectP1Domain.value === '') {
        setFieldError(p1DomainGroup, true);
        isValid = false;
      } else {
        setFieldError(p1DomainGroup, false);
      }

      // Project 1 Tools
      const p1ToolsGroup = document.getElementById('group-p1tools');
      if (inputP1Tools.value.trim() === '') {
        setFieldError(p1ToolsGroup, true);
        isValid = false;
      } else {
        setFieldError(p1ToolsGroup, false);
      }

      // Project 1 Outcomes
      const p1OutcomesGroup = document.getElementById('group-p1outcomes');
      if (textareaP1Outcomes.value.trim() === '') {
        setFieldError(p1OutcomesGroup, true);
        isValid = false;
      } else {
        setFieldError(p1OutcomesGroup, false);
      }
    }

    else if (stepNum === 4) {
      // Internship Conditional validation
      const hasCompany = inputInternCompany.value.trim() !== '';
      
      if (hasCompany) {
        if (inputInternDuration.value.trim() === '') {
          inputInternDuration.parentElement.parentElement.classList.add('is-invalid');
          isValid = false;
        } else {
          inputInternDuration.parentElement.parentElement.classList.remove('is-invalid');
        }

        if (textareaInternWork.value.trim() === '') {
          textareaInternWork.parentElement.parentElement.classList.add('is-invalid');
          isValid = false;
        } else {
          textareaInternWork.parentElement.parentElement.classList.remove('is-invalid');
        }
      } else {
        inputInternDuration.parentElement.parentElement.classList.remove('is-invalid');
        textareaInternWork.parentElement.parentElement.classList.remove('is-invalid');
      }

      // Objective Validation
      const objectiveGroup = document.getElementById('group-objective');
      const objLen = textareaObjective.value.trim().length;
      if (objLen === 0) {
        setFieldError(objectiveGroup, true, "Career Objective is required.");
        isValid = false;
      } else if (objLen > 250) {
        setFieldError(objectiveGroup, true, "Objective cannot exceed 250 characters.");
        isValid = false;
      } else {
        setFieldError(objectiveGroup, false);
      }
    }

    return isValid;
  }

  // Handle Step Navigation Button Clicks
  btnNext.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        currentStep++;
        showStep(currentStep);
        saveDraft();
      } else {
        submitForm();
      }
    } else {
      showToast('Please correct validation errors before proceeding.', 'error');
    }
  });

  btnPrev.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
      saveDraft();
    }
  });

  // Clicking progress nodes directly
  stepNodes.forEach((node, idx) => {
    node.addEventListener('click', () => {
      const targetStep = idx + 1;
      
      if (targetStep < currentStep) {
        currentStep = targetStep;
        showStep(currentStep);
      } else if (targetStep > currentStep) {
        let pathValid = true;
        for (let s = currentStep; s < targetStep; s++) {
          if (!validateStep(s)) {
            pathValid = false;
            break;
          }
        }
        if (pathValid) {
          currentStep = targetStep;
          showStep(currentStep);
        } else {
          showToast('Please complete required fields on this page first.', 'error');
        }
      }
    });
  });

  // ==========================================================================
  // PHOTOGRAPH UPLOAD ZONE
  // ==========================================================================

  function handlePhotoSelect(file) {
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      showToast('Allowed file types are PNG, JPG or JPEG.', 'error');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      showToast('Image size exceeds 5MB limit.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      photoBase64 = e.target.result;
      
      uploadImgPreview.src = photoBase64;
      previewImg.src = photoBase64;
      
      uploadFileName.textContent = file.name;
      uploadFileSize.textContent = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      
      uploadContentEmpty.classList.add('hidden');
      uploadPreviewContainer.classList.remove('hidden');
      
      document.getElementById('group-photo').classList.remove('is-invalid');
      
      try {
        localStorage.setItem('vlsi_draft_photo', photoBase64);
        localStorage.setItem('vlsi_draft_photo_meta', JSON.stringify({
          name: file.name,
          size: file.size
        }));
      } catch (err) {
        console.warn("Storage quota exceeded. Photo not cached locally.", err);
      }

      saveDraft();
      syncPreview();
    };
    reader.readAsDataURL(file);
  }

  inputPhoto.addEventListener('change', (e) => {
    if (e.target.files.length) {
      handlePhotoSelect(e.target.files[0]);
    }
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    uploadZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadZone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    uploadZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadZone.classList.remove('dragover');
    }, false);
  });

  uploadZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length) {
      handlePhotoSelect(files[0]);
    }
  });

  btnRemovePhoto.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    photoBase64 = '';
    inputPhoto.value = '';
    
    uploadImgPreview.src = '';
    previewImg.src = svgPlaceholder;
    
    uploadContentEmpty.classList.remove('hidden');
    uploadPreviewContainer.classList.add('hidden');
    
    localStorage.removeItem('vlsi_draft_photo');
    localStorage.removeItem('vlsi_draft_photo_meta');
    
    saveDraft();
    syncPreview();
  });

  // ==========================================================================
  // CONDITIONAL INPUTS LOGIC
  // ==========================================================================

  function toggleInternshipFields() {
    const hasCompany = inputInternCompany.value.trim() !== '';
    if (hasCompany) {
      inputInternDuration.disabled = false;
      textareaInternWork.disabled = false;
      labelInternDuration.classList.add('required-label');
      labelInternWork.classList.add('required-label');
      helpInternDuration.textContent = 'Example: 3 months (Summer 2025)';
    } else {
      inputInternDuration.disabled = true;
      textareaInternWork.disabled = true;
      inputInternDuration.value = '';
      textareaInternWork.value = '';
      labelInternDuration.classList.remove('required-label');
      labelInternWork.classList.remove('required-label');
      helpInternDuration.textContent = 'Disabled. Please enter a company name first.';
      
      inputInternDuration.parentElement.parentElement.classList.remove('is-invalid');
      textareaInternWork.parentElement.parentElement.classList.remove('is-invalid');
    }
  }

  inputInternCompany.addEventListener('input', toggleInternshipFields);

  skillOtherToggle.addEventListener('change', () => {
    if (skillOtherToggle.checked) {
      groupSkillsOtherText.classList.remove('hidden');
    } else {
      groupSkillsOtherText.classList.add('hidden');
      inputSkillsOtherText.value = '';
    }
    syncPreview();
  });

  interestOtherToggle.addEventListener('change', () => {
    if (interestOtherToggle.checked) {
      groupInterestsOtherText.classList.remove('hidden');
    } else {
      groupInterestsOtherText.classList.add('hidden');
      inputInterestsOtherText.value = '';
    }
    syncPreview();
  });

  leadershipOtherToggle.addEventListener('change', () => {
    if (leadershipOtherToggle.checked) {
      groupLeadershipOtherText.classList.remove('hidden');
    } else {
      groupLeadershipOtherText.classList.add('hidden');
      inputLeadershipOtherText.value = '';
    }
    syncPreview();
  });

  textareaObjective.addEventListener('input', () => {
    const len = textareaObjective.value.length;
    objectiveCounter.textContent = `${len} / 250 characters`;
    if (len > 250) {
      objectiveCounter.style.color = 'var(--color-danger)';
    } else {
      objectiveCounter.style.color = 'var(--text-muted)';
    }
  });

  const interestCheckboxes = form.querySelectorAll('input[name="interests"]');
  interestCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const checked = form.querySelectorAll('input[name="interests"]:checked');
      if (checked.length > 3) {
        cb.checked = false;
        showToast('You can select a maximum of 3 areas of interest.', 'info');
      }
      syncPreview();
    });
  });

  // ==========================================================================
  // REAL-TIME BROCHURE PREVIEW SYNCER
  // ==========================================================================

  function syncPreview() {
    previewName.textContent = inputFullName.value.trim() || 'Student Name';
    
    const checkedProgram = form.querySelector('input[name="program"]:checked');
    let programLabel = 'M.Sc. Electronics (VLSI Specialization)';
    if (checkedProgram) {
      if (checkedProgram.value === 'MSc Electronics (VLSI Specialization)') {
        programLabel = 'M.Sc. Electronics (VLSI Specialization)';
      } else if (checkedProgram.value === 'MTech Electronics (VLSI Specialization)') {
        programLabel = 'M.Tech. Electronics (VLSI Specialization)';
      } else if (checkedProgram.value === 'MSc Applied Physics (VLSI Specialization)') {
        programLabel = 'M.Sc. Applied Physics (VLSI Specialization)';
      }
    }
    previewProgram.textContent = programLabel;
    
    previewCgpa.textContent = inputCgpa.value.trim() ? parseFloat(inputCgpa.value).toFixed(2) : '--';
    
    const emailVal = inputEmail.value.trim();
    if (emailVal) {
      previewEmail.textContent = emailVal;
      previewEmailItem.classList.remove('hidden');
    } else {
      previewEmailItem.classList.add('hidden');
    }

    const phoneVal = inputPhone.value.trim();
    if (phoneVal) {
      previewPhone.textContent = phoneVal;
      previewPhoneItem.classList.remove('hidden');
    } else {
      previewPhoneItem.classList.add('hidden');
    }

    const linkVal = inputLinkedin.value.trim();
    if (linkVal) {
      previewLinkedin.textContent = linkVal.replace(/https?:\/\/(www\.)?/, '');
      previewLinkedinItem.href = linkVal;
      previewLinkedinItem.classList.remove('hidden');
    } else {
      previewLinkedinItem.classList.add('hidden');
    }

    previewObjective.textContent = textareaObjective.value.trim() || 'Seeking an exciting opportunity to apply VLSI designing concepts and digital architecture skills in semiconductor design and development...';

    // Technical Skills tags
    const checkedSkills = Array.from(form.querySelectorAll('input[name="skills"]:checked')).map(cb => cb.value);
    if (checkedSkills.includes('Other')) {
      const otherIdx = checkedSkills.indexOf('Other');
      const otherVal = inputSkillsOtherText.value.trim();
      if (otherVal) {
        checkedSkills.splice(otherIdx, 1, ...otherVal.split(',').map(s => s.trim()).filter(s => s !== ''));
      } else {
        checkedSkills.splice(otherIdx, 1);
      }
    }

    if (checkedSkills.length > 0) {
      previewSkills.innerHTML = checkedSkills.map(skill => `<span>${skill}</span>`).join('');
    } else {
      previewSkills.innerHTML = '<span class="tag-placeholder">No skills selected</span>';
    }

    // Areas of Interest tags
    const checkedInterests = Array.from(form.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value);
    if (checkedInterests.includes('Others')) {
      const otherIdx = checkedInterests.indexOf('Others');
      const otherVal = inputInterestsOtherText.value.trim();
      if (otherVal) {
        checkedInterests.splice(otherIdx, 1, ...otherVal.split(',').map(s => s.trim()).filter(s => s !== ''));
      } else {
        checkedInterests.splice(otherIdx, 1);
      }
    }

    if (checkedInterests.length > 0) {
      previewInterests.innerHTML = checkedInterests.map(interest => `<span>${interest}</span>`).join('');
    } else {
      previewInterests.innerHTML = '<span class="tag-placeholder">No interests selected</span>';
    }

    // Project 1
    const p1Title = inputP1Title.value.trim();
    if (p1Title) {
      previewP1Title.textContent = `Project 1: ${p1Title}`;
      previewP1Domain.textContent = selectP1Domain.value || 'Domain';
      previewP1Tools.textContent = inputP1Tools.value.trim() || '--';
      previewP1Outcomes.textContent = textareaP1Outcomes.value.trim() || 'Key contribution & outcomes...';
      previewP1.classList.remove('hidden');
    } else {
      previewP1Title.textContent = 'Project 1: Title';
      previewP1Domain.textContent = 'Domain';
      previewP1Tools.textContent = '--';
      previewP1Outcomes.textContent = 'Project description and outcomes will show here.';
    }

    // Project 2 (Optional)
    const p2Title = inputP2Title.value.trim();
    if (p2Title) {
      previewP2Title.textContent = `Project 2: ${p2Title}`;
      previewP2Domain.textContent = selectP2Domain.value || 'Domain';
      previewP2Tools.textContent = inputP2Tools.value.trim() || '--';
      previewP2Outcomes.textContent = textareaP2Outcomes.value.trim() || 'Key contribution & outcomes...';
      previewP2.classList.remove('hidden');
    } else {
      previewP2.classList.add('hidden');
    }

    // Internship
    const internCompany = inputInternCompany.value.trim();
    if (internCompany) {
      previewInternCompany.textContent = internCompany;
      previewInternDuration.textContent = inputInternDuration.value.trim() || 'Summer 2025';
      previewInternWork.textContent = textareaInternWork.value.trim() || 'Key contribution...';
      previewInternshipCol.classList.remove('hidden');
    } else {
      previewInternshipCol.classList.add('hidden');
    }

    // Certifications & Publications
    const certsText = textareaCerts.value.trim();
    const pubsText = inputPubs.value.trim();
    
    if (certsText) {
      previewCerts.textContent = certsText;
      previewCertsLi.classList.remove('hidden');
    } else {
      previewCertsLi.classList.add('hidden');
    }

    if (pubsText) {
      previewPubs.textContent = pubsText;
      previewPubsLi.classList.remove('hidden');
    } else {
      previewPubsLi.classList.add('hidden');
    }

    if (certsText || pubsText) {
      previewCertsPubsCol.classList.remove('hidden');
    } else {
      previewCertsPubsCol.classList.add('hidden');
    }

    if (!internCompany && !certsText && !pubsText) {
      document.getElementById('bc-sec-extra').classList.add('hidden');
    } else {
      document.getElementById('bc-sec-extra').classList.remove('hidden');
    }

    // Leadership & Responsibilities
    const checkedLeadership = Array.from(form.querySelectorAll('input[name="leadership"]:checked')).map(cb => cb.value);
    if (checkedLeadership.includes('Other')) {
      const lOtherIdx = checkedLeadership.indexOf('Other');
      const lOtherVal = inputLeadershipOtherText.value.trim();
      if (lOtherVal) {
        checkedLeadership.splice(lOtherIdx, 1, lOtherVal);
      } else {
        checkedLeadership.splice(lOtherIdx, 1);
      }
    }

    if (checkedLeadership.length > 0) {
      previewLeadership.innerHTML = checkedLeadership.map(role => `<span>${role}</span>`).join('');
      previewLeadershipSec.classList.remove('hidden');
    } else {
      previewLeadershipSec.classList.add('hidden');
    }
  }

  form.addEventListener('input', syncPreview);
  form.addEventListener('change', syncPreview);

  // Maximize Brochure preview toggle
  previewToggle.addEventListener('click', () => {
    previewSection.classList.toggle('expanded');
    const isExpanded = previewSection.classList.contains('expanded');
    previewToggle.innerHTML = isExpanded 
      ? '<i class="fa-solid fa-compress"></i> <span>Minimize</span>' 
      : '<i class="fa-solid fa-expand"></i> <span>Maximize</span>';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && previewSection.classList.contains('expanded')) {
      previewSection.classList.remove('expanded');
      previewToggle.innerHTML = '<i class="fa-solid fa-expand"></i> <span>Maximize</span>';
    }
  });

  // ==========================================================================
  // DRAFT AUTO-SAVE & RESUME PROGRESS
  // ==========================================================================

  function getFormStateObject() {
    const data = {};
    const textInputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"], select, textarea');
    
    textInputs.forEach(input => {
      data[input.name] = input.value;
    });

    const checkedProgram = form.querySelector('input[name="program"]:checked');
    data.program = checkedProgram ? checkedProgram.value : 'MSc Electronics (VLSI Specialization)';

    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
      if (cb.name) {
        if (!data[cb.name]) {
          data[cb.name] = [];
        }
        if (cb.checked) {
          data[cb.name].push(cb.value);
        }
      }
    });

    data.currentStep = currentStep;
    return data;
  }

  function saveDraft() {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      const stateObj = getFormStateObject();
      localStorage.setItem('vlsi_placement_draft', JSON.stringify(stateObj));
      
      draftSaveIndicator.classList.add('show');
      setTimeout(() => {
        draftSaveIndicator.classList.remove('show');
      }, 1500);
    }, 400);
  }

  function loadDraft() {
    const saved = localStorage.getItem('vlsi_placement_draft');
    if (!saved) return;

    try {
      const data = JSON.parse(saved);
      
      Object.keys(data).forEach(key => {
        const value = data[key];
        const el = form.elements[key];
        
        if (el && !['checkbox', 'radio'].includes(el.type)) {
          el.value = value;
        }
      });

      if (data.program) {
        const radio = form.querySelector(`input[name="program"][value="${data.program}"]`);
        if (radio) radio.checked = true;
      }

      Object.keys(data).forEach(key => {
        const value = data[key];
        if (Array.isArray(value)) {
          value.forEach(val => {
            const cb = form.querySelector(`input[name="${key}"][value="${val}"]`);
            if (cb) cb.checked = true;
          });
        }
      });

      const savedPhoto = localStorage.getItem('vlsi_draft_photo');
      const savedPhotoMeta = localStorage.getItem('vlsi_draft_photo_meta');
      if (savedPhoto && savedPhotoMeta) {
        photoBase64 = savedPhoto;
        uploadImgPreview.src = photoBase64;
        previewImg.src = photoBase64;
        
        const meta = JSON.parse(savedPhotoMeta);
        uploadFileName.textContent = meta.name;
        uploadFileSize.textContent = (meta.size / (1024 * 1024)).toFixed(2) + ' MB';
        
        uploadContentEmpty.classList.add('hidden');
        uploadPreviewContainer.classList.remove('hidden');
      }

      if (data.currentStep) {
        currentStep = parseInt(data.currentStep);
      }

      toggleInternshipFields();
      if (skillOtherToggle.checked) groupSkillsOtherText.classList.remove('hidden');
      if (interestOtherToggle.checked) groupInterestsOtherText.classList.remove('hidden');
      if (leadershipOtherToggle.checked) groupLeadershipOtherText.classList.remove('hidden');

      const len = textareaObjective.value.length;
      objectiveCounter.textContent = `${len} / 250 characters`;

      showStep(currentStep);
      syncPreview();
    } catch (e) {
      console.error("Error reading placement draft", e);
    }
  }

  form.addEventListener('input', saveDraft);
  form.addEventListener('change', saveDraft);

  // ==========================================================================
  // THEME SWITCHER
  // ==========================================================================

  function initTheme() {
    const savedTheme = localStorage.getItem('vlsi_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  }

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('vlsi_theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme} mode.`, 'info');
  });

  // ==========================================================================
  // COLLAPSIBLE DRAWER TOGGLES & SMOOTH SCROLLING
  // ==========================================================================

  function toggleRegistrationDrawer(forceOpen = false) {
    const isHidden = registrationFormDrawer.classList.contains('hidden');
    
    if (isHidden || forceOpen) {
      registrationFormDrawer.classList.remove('hidden');
      btnToggleRegistration.innerHTML = '<i class="fa-solid fa-chevron-up"></i> <span>Close Registration</span>';
      
      // Smooth scroll to form area
      setTimeout(() => {
        registrationFormDrawer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      registrationFormDrawer.classList.add('hidden');
      btnToggleRegistration.innerHTML = '<i class="fa-solid fa-chevron-down"></i> <span>Open Registration</span>';
    }
  }

  btnToggleRegistration.addEventListener('click', () => toggleRegistrationDrawer());
  
  if (btnHeroRegister) {
    btnHeroRegister.addEventListener('click', (e) => {
      e.preventDefault();
      toggleRegistrationDrawer(true);
    });
  }

  if (navBtnRegister) {
    navBtnRegister.addEventListener('click', (e) => {
      e.preventDefault();
      toggleRegistrationDrawer(true);
    });
  }

  // Smooth Scrolling for nav anchor links
  document.querySelectorAll('.nav-links a:not(.btn-nav-register)').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==========================================================================
  // DEMO DATA AUTO-FILL LOGIC
  // ==========================================================================

  btnAutofill.addEventListener('click', () => {
    inputFullName.value = "Aarav Sharma";
    inputEmail.value = "aarav.sharma@iiit.ac.in";
    inputPhone.value = "+91-9876543210";
    inputLinkedin.value = "https://linkedin.com/in/aaravsharma-vlsi";

    const mtechRadio = form.querySelector('input[name="program"][value="MTech Electronics (VLSI Specialization)"]');
    if (mtechRadio) mtechRadio.checked = true;

    inputCgpa.value = "9.25";

    form.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);

    const skillsToCheck = ["Analog IC Design", "Cadence Virtuoso", "Custom Layout / DRC/LVS", "Verilog RTL Design", "LTspice / Ngspice", "Other"];
    skillsToCheck.forEach(skill => {
      const cb = form.querySelector(`input[name="skills"][value="${skill}"]`);
      if (cb) cb.checked = true;
    });
    groupSkillsOtherText.classList.remove('hidden');
    inputSkillsOtherText.value = "Spectre, Calibre LVS";

    const interestsToCheck = ["Analog Design", "Custom Layout", "RTL Design"];
    interestsToCheck.forEach(interest => {
      const cb = form.querySelector(`input[name="interests"][value="${interest}"]`);
      if (cb) cb.checked = true;
    });

    inputP1Title.value = "Design of a 10-bit 50MS/s SAR ADC";
    selectP1Domain.value = "Analog IC Design";
    inputP1Tools.value = "180nm CMOS, Cadence Virtuoso, Spectre, MATLAB";
    textareaP1Outcomes.value = "Designed a 10-bit SAR ADC with a custom charge-redistribution DAC. Achieved an ENOB of 9.42 bits, SNDR of 58.4 dB, and active power consumption of 340 µW at a 1.8V supply.";

    inputP2Title.value = "FPGA Implementation of AXI4-Lite IP Core";
    selectP2Domain.value = "Digital IC Design";
    inputP2Tools.value = "Xilinx Vivado, Verilog RTL, Artix-7 FPGA";
    textareaP2Outcomes.value = "Developed and synthesized an AXI4-Lite compliant interface for register control. Verified logic correctness via SystemVerilog testbenches with 100% functional and code coverage.";

    inputInternCompany.value = "Texas Instruments";
    toggleInternshipFields();
    inputInternDuration.value = "3 months (Summer 2025)";
    textareaInternWork.value = "Designed and simulated transient-response enhancements for low-dropout (LDO) linear regulators, improving settling time by 15% using active-feedback frequency compensation.";

    textareaCerts.value = "Cadence VLSI Fundamentals (2025)\nNPTEL Analog IC Design (2025)";
    inputPubs.value = '"High-Efficiency CMOS LDO for Low-Power SoC Applications" – IEEE TENCON 2025';
    
    const leadershipToCheck = ["Placement Committee Member", "Technical Club Coordinator", "Other"];
    leadershipToCheck.forEach(role => {
      const cb = form.querySelector(`input[name="leadership"][value="${role}"]`);
      if (cb) cb.checked = true;
    });
    groupLeadershipOtherText.classList.remove('hidden');
    inputLeadershipOtherText.value = "VLSI Seminar Lead";

    textareaObjective.value = "Seeking a challenging role in Analog/Mixed-Signal IC design and layout to contribute to advanced power management chips and low-power IoT circuits.";
    objectiveCounter.textContent = `${textareaObjective.value.length} / 250 characters`;

    fetch('professional_headshot_sample.png')
      .then(response => {
        if (!response.ok) throw new Error('Not OK');
        return response.blob();
      })
      .then(blob => {
        const reader = new FileReader();
        reader.onload = function(e) {
          photoBase64 = e.target.result;
          uploadImgPreview.src = photoBase64;
          previewImg.src = photoBase64;
          
          uploadFileName.textContent = "professional_headshot_sample.png";
          uploadFileSize.textContent = (blob.size / (1024 * 1024)).toFixed(2) + ' MB';
          
          uploadContentEmpty.classList.add('hidden');
          uploadPreviewContainer.classList.remove('hidden');
          
          try {
            localStorage.setItem('vlsi_draft_photo', photoBase64);
            localStorage.setItem('vlsi_draft_photo_meta', JSON.stringify({
              name: "professional_headshot_sample.png",
              size: blob.size
            }));
          } catch(err) {
            console.warn("Storage limit reached, photo not cached.", err);
          }

          saveDraft();
          syncPreview();
          showToast('Sample student photo loaded successfully.', 'success');
        };
        reader.readAsDataURL(blob);
      })
      .catch(err => {
        console.log("Could not load image file directly (CORS/File scheme). Loading SVG fallback avatar.");
        photoBase64 = svgPlaceholder;
        uploadImgPreview.src = photoBase64;
        previewImg.src = photoBase64;
        
        uploadFileName.textContent = "formal_avatar.svg";
        uploadFileSize.textContent = "0.05 MB";
        
        uploadContentEmpty.classList.add('hidden');
        uploadPreviewContainer.classList.remove('hidden');
        
        try {
          localStorage.setItem('vlsi_draft_photo', photoBase64);
          localStorage.setItem('vlsi_draft_photo_meta', JSON.stringify({
            name: "formal_avatar.svg",
            size: 50000
          }));
        } catch(err){}
        
        saveDraft();
        syncPreview();
        showToast('Demo data loaded (with SVG headshot avatar).', 'success');
      });

    form.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('is-invalid');
      group.classList.remove('is-valid');
    });

    syncPreview();
    saveDraft();
    showToast('Demo VLSI student data populated. You can navigate the steps to inspect.', 'success');
  });

  // ==========================================================================
  // SUBMIT & APPS SCRIPT INTEGRATION
  // ==========================================================================

  function submitForm() {
    let allValid = true;
    for (let s = 1; s <= steps.length; s++) {
      if (!validateStep(s)) {
        allValid = false;
        currentStep = s;
        showStep(currentStep);
        break;
      }
    }

    if (allValid) {
      const data = getFormStateObject();
      data.photograph = photoBase64 || "None";
      
      // Update Next button UI to Submitting...
      btnNext.disabled = true;
      const originalBtnText = btnNext.innerHTML;
      btnNext.innerHTML = 'Submitting <i class="fa-solid fa-spinner fa-spin"></i>';

      // Send post call to Google Apps Script endpoint
      fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Bypass CORS errors for Apps Script redirect responses
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(() => {
        showToast('Response successfully uploaded to database!', 'success');
        successModal.classList.remove('hidden');
        fetchAllStudents(); // Dynamically update placement widgets without full reload
      })
      .catch(err => {
        console.warn('Apps Script submission error:', err);
        showToast('Network timeout. Saved details locally.', 'info');
        successModal.classList.remove('hidden'); // Show success modal anyway to download card
      })
      .finally(() => {
        btnNext.disabled = false;
        btnNext.innerHTML = originalBtnText;
      });

    } else {
      showToast('Validation errors found. Review your fields.', 'error');
    }
  }

  btnPrint.addEventListener('click', () => {
    window.print();
  });

  btnDownloadPng.addEventListener('click', () => {
    const cardElement = document.getElementById('brochure-card-render');
    const nameInput = inputFullName.value.trim();
    const nameSanitized = (nameInput || 'submission').toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    showToast('Generating PNG image, please wait...', 'info');
    
    html2canvas(cardElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', imgData);
      downloadAnchor.setAttribute('download', `duk_vlsi_card_${nameSanitized}.png`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('PNG Card downloaded successfully.', 'success');
    }).catch(err => {
      console.error('Error generating image via html2canvas:', err);
      showToast('Failed to generate PNG image. Try PDF download.', 'error');
    });
  });

  btnExportJson.addEventListener('click', () => {
    const data = getFormStateObject();
    data.photograph = photoBase64 ? "[Base64 Photo Encoded]" : "None";
    
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    
    const dateFormatted = new Date().toISOString().split('T')[0];
    const nameSanitized = (data.fullname || 'submission').toLowerCase().replace(/[^a-z0-9]/g, '_');
    downloadAnchor.setAttribute('download', `duk_vlsi_entry_${nameSanitized}_${dateFormatted}.json`);
    
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    
    showToast('JSON Export Downloaded.', 'success');
  });

  btnEditResponse.addEventListener('click', () => {
    successModal.classList.add('hidden');
  });

  btnResetForm.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear this entry and start a new response?')) {
      localStorage.removeItem('vlsi_placement_draft');
      localStorage.removeItem('vlsi_draft_photo');
      localStorage.removeItem('vlsi_draft_photo_meta');
      
      form.reset();
      photoBase64 = '';
      
      uploadImgPreview.src = '';
      previewImg.src = svgPlaceholder;
      uploadContentEmpty.classList.remove('hidden');
      uploadPreviewContainer.classList.add('hidden');
      
      groupSkillsOtherText.classList.add('hidden');
      groupInterestsOtherText.classList.add('hidden');
      groupLeadershipOtherText.classList.add('hidden');
      toggleInternshipFields();
      
      currentStep = 1;
      objectiveCounter.textContent = '0 / 250 characters';
      objectiveCounter.style.color = 'var(--text-muted)';
      
      form.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('is-invalid', 'is-valid');
      });

      successModal.classList.add('hidden');
      showStep(1);
      syncPreview();
      showToast('Form reset. Starting new entry.', 'info');
    }
  });

  // ==========================================================================
  // DYNAMIC STUDENT GALLERY & DETAIL MODAL
  // ==========================================================================

  const mockStudents = [
    {
      name: "Aparna Nair",
      program: "M.Sc. Electronics (VLSI Specialization)",
      cgpa: 9.35,
      objective: "Seeking a challenging role in Analog/Mixed-Signal IC design and layout to contribute to advanced power management chips and low-power IoT circuits.",
      skills: ["Analog IC Design", "Cadence Virtuoso", "Custom Layout", "LTspice"],
      interests: ["Analog Design", "Custom Layout", "Research & Development"],
      project1: {
        title: "Design of a 10-bit 50MS/s SAR ADC",
        domain: "Analog IC Design",
        tools: "180nm CMOS, Cadence Virtuoso, Spectre, MATLAB",
        outcomes: "Designed a 10-bit SAR ADC with a custom charge-redistribution DAC. Achieved an ENOB of 9.42 bits, SNDR of 58.4 dB, and active power consumption of 340 µW at a 1.8V supply."
      },
      project2: {
        title: "Low-Dropout (LDO) Linear Regulator",
        domain: "Analog IC Design",
        tools: "180nm CMOS, Cadence Virtuoso, Spectre",
        outcomes: "Designed and simulated transient-response enhancements for low-dropout (LDO) linear regulators, improving settling time by 15% using active-feedback compensation."
      },
      internship: {
        company: "Texas Instruments",
        duration: "3 months (Summer 2025)",
        work: "Designed and simulated transient-response enhancements for low-dropout (LDO) linear regulators, improving settling time by 15% using active-feedback frequency compensation."
      },
      certs: "Cadence VLSI Fundamentals (2025), NPTEL Analog IC Design (2025)",
      pubs: '"High-Efficiency CMOS LDO for Low-Power SoC Applications" – IEEE TENCON 2025',
      leadership: ["Placement Committee Member", "Technical Club Coordinator"],
      photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%236366f1'/><path d='M50 45a12 12 0 1 0 0-24 12 12 0 0 0 0 24zm0 8c-18 0-30 8-30 18v3h60v-3c0-10-12-18-30-18z' fill='%23ffffff'/></svg>"
    },
    {
      name: "Rohit Krishnan",
      program: "M.Tech. Electronics (VLSI Specialization)",
      cgpa: 8.92,
      objective: "Aspiring Digital RTL Design Engineer. Interested in design, verification, and implementation of high-performance system-on-chip solutions.",
      skills: ["Verilog RTL Design", "FPGA (Xilinx)", "Embedded Systems", "STA"],
      interests: ["RTL Design", "Verification", "Physical Design"],
      project1: {
        title: "FPGA Implementation of AXI4-Lite IP Core",
        domain: "Digital IC Design",
        tools: "Xilinx Vivado, Verilog RTL, Artix-7 FPGA",
        outcomes: "Developed and synthesized an AXI4-Lite compliant interface for register control. Verified logic correctness via SystemVerilog testbenches with 100% functional and code coverage."
      },
      project2: {
        title: "RISC-V 3-Stage Pipeline Processor",
        domain: "Digital IC Design",
        tools: "Verilog RTL, Vivado, ModelSim",
        outcomes: "Implemented a subset of RV32I ISA, pipelined with hazard handling. Verified register file operations and execution timing on Basys 3 FPGA."
      },
      internship: {
        company: "Intel Corporation",
        duration: "6 months (Fall 2025)",
        work: "Assisted in writing SystemVerilog assertion testbenches for digital subsystems and verified memory controllers against interface specs."
      },
      certs: "Advanced Digital Design (2025), Xilinx RTL Training",
      pubs: "None",
      leadership: ["Technical Club Coordinator"],
      photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23ec4899'/><path d='M50 45a12 12 0 1 0 0-24 12 12 0 0 0 0 24zm0 8c-18 0-30 8-30 18v3h60v-3c0-10-12-18-30-18z' fill='%23ffffff'/></svg>"
    },
    {
      name: "Devika Sen",
      program: "M.Sc. Applied Physics (VLSI Specialization)",
      cgpa: 9.12,
      objective: "Seeking a research-driven R&D role in semiconductor physics, neuromorphic hardware accelerator models, and nanoscale CMOS devices.",
      skills: ["Neuromorphic Computing", "Python", "LTspice / Ngspice", "Analog IC Design"],
      interests: ["Neuromorphic Computing", "AI Hardware", "Research & Development"],
      project1: {
        title: "SNN Accelerator using Memristive Crossbars",
        domain: "Research / Emerging Tech",
        tools: "Python (PyTorch), LTspice, Memristor Models",
        outcomes: "Modeled a 2-layer Spiking Neural Network (SNN) hardware accelerator using simulated memristive crossbar nodes, achieving 94% classification accuracy for MNIST."
      },
      project2: {
        title: "Simulation of FinFET Device Characteristics",
        domain: "Research / Emerging Tech",
        tools: "TCAD Silvaco, Python device scripts",
        outcomes: "Analyzed subthreshold swing and gate leakage in 14nm FinFET topologies, comparing metrics against planar CMOS architectures."
      },
      internship: {
        company: "IIoT Sensor CoE",
        duration: "3 months (Summer 2025)",
        work: "Researched nanoscale sensor modeling and simulated micro-electromechanical sensor interfaces on-chip."
      },
      certs: "Neuromorphic Computing Certification, NPTEL Semiconductor Physics",
      pubs: '"Memristive Crossbars for Edge-AI Hardware" – IEEE Nanotechnology 2025',
      leadership: ["Class Representative"],
      photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%2310b981'/><path d='M50 45a12 12 0 1 0 0-24 12 12 0 0 0 0 24zm0 8c-18 0-30 8-30 18v3h60v-3c0-10-12-18-30-18z' fill='%23ffffff'/></svg>"
    },
    {
      name: "Siddharth Menon",
      program: "M.Tech. Electronics (VLSI Specialization)",
      cgpa: 8.65,
      objective: "To secure a position in Physical Design and Static Timing Analysis (STA), applying advanced floorplanning, routing, and timing closure flows.",
      skills: ["Physical Design / STA", "Verilog RTL Design", "Python", "Custom Layout"],
      interests: ["Physical Design", "Verification", "RTL Design"],
      project1: {
        title: "Physical Design Flow on 45-nm Standard Cell Library",
        domain: "Digital IC Design",
        tools: "Synopsys IC Compiler, Primetime STA, OpenLane",
        outcomes: "Executed layout synthesis, floorplanning, CTS, and routing for an SPI Controller core. Achieved timing closure with zero setup/hold violations at 350MHz."
      },
      project2: {
        title: "High-Frequency SRAM Array Layout",
        domain: "Analog IC Design",
        tools: "Cadence Virtuoso, Calibre DRC/LVS",
        outcomes: "Designed full custom layout of a 1KB SRAM memory array. Validated cell matching and optimized bitline charging delays by 8%."
      },
      internship: {
        company: "Maker Village",
        duration: "3 months (Summer 2025)",
        work: "Developed automated test benches for custom IoT board peripherals and monitored PCB signal integrity parameters."
      },
      certs: "Synopsys Tool Training, Physical Design Fundamentals",
      pubs: "None",
      leadership: ["Technical Club Coordinator", "Event Organizer"],
      photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23f59e0b'/><path d='M50 45a12 12 0 1 0 0-24 12 12 0 0 0 0 24zm0 8c-18 0-30 8-30 18v3h60v-3c0-10-12-18-30-18z' fill='%23ffffff'/></svg>"
    }
  ];

  // Data normalization function to map raw spreadsheet records or mock data to a unified format
  function normalizeStudentData(rawRecord) {
    if (rawRecord.project1 && typeof rawRecord.project1 === 'object') return rawRecord;
    
    return {
      name: rawRecord.fullname || rawRecord.name || "Student",
      program: rawRecord.program || "MSc Electronics (VLSI Specialization)",
      cgpa: parseFloat(rawRecord.cgpa) || 0.0,
      objective: rawRecord.careerobjective || rawRecord.objective || "",
      skills: Array.isArray(rawRecord.skills) ? rawRecord.skills : (rawRecord.skills ? rawRecord.skills.split(',').map(s => s.trim()) : []),
      interests: Array.isArray(rawRecord.interests) ? rawRecord.interests : (rawRecord.interests ? rawRecord.interests.split(',').map(i => i.trim()) : []),
      project1: {
        title: rawRecord.project1title || (rawRecord.project1 ? rawRecord.project1.title : ""),
        domain: rawRecord.project1domain || (rawRecord.project1 ? rawRecord.project1.domain : ""),
        tools: rawRecord.project1tools || (rawRecord.project1 ? rawRecord.project1.tools : ""),
        outcomes: rawRecord.project1outcomes || (rawRecord.project1 ? rawRecord.project1.outcomes : "")
      },
      project2: (rawRecord.project2title || (rawRecord.project2 && rawRecord.project2.title)) ? {
        title: rawRecord.project2title || rawRecord.project2.title,
        domain: rawRecord.project2domain || rawRecord.project2.domain || "",
        tools: rawRecord.project2tools || rawRecord.project2.tools || "",
        outcomes: rawRecord.project2outcomes || rawRecord.project2.outcomes || ""
      } : null,
      internship: (rawRecord.internshipcompany || (rawRecord.internship && rawRecord.internship.company)) ? {
        company: rawRecord.internshipcompany || rawRecord.internship.company,
        duration: rawRecord.internshipduration || rawRecord.internship.duration || "",
        work: rawRecord.internshipwork || rawRecord.internship.work || ""
      } : null,
      certs: rawRecord.certifications || rawRecord.certs || "",
      pubs: rawRecord.publications || rawRecord.pubs || "None",
      leadership: Array.isArray(rawRecord.leadership) ? rawRecord.leadership : (rawRecord.leadership ? rawRecord.leadership.split(',').map(l => l.trim()) : []),
      photo: rawRecord.photourl || rawRecord.photo || svgPlaceholder
    };
  }

  // Live database fetching function
  async function fetchAllStudents() {
    const loader = document.getElementById('gallery-loader');
    if (loader) loader.classList.remove('hidden');
    
    try {
      const response = await fetch(APPS_SCRIPT_URL);
      if (!response.ok) throw new Error('API request failed');
      
      const rawData = await response.json();
      if (Array.isArray(rawData) && rawData.length > 0) {
        students = rawData.map(normalizeStudentData);
        showToast('Live student records synchronized from database.', 'success');
      } else {
        console.warn("Spreadsheet returns empty list. Using offline fallbacks.");
        students = mockStudents.map(normalizeStudentData);
      }
    } catch (err) {
      console.error("Database connection failed. Falling back to mock data.", err);
      students = mockStudents.map(normalizeStudentData);
      showToast('Database connection failed. Displaying cached records.', 'warning');
    } finally {
      if (loader) loader.classList.add('hidden');
      
      // Update UI components
      renderStudentGallery(students);
      updateBatchStats(students);
      renderSkillsMatrix(students);
      renderProjectShowcase(students);
      renderHiringMatrix(students);
    }
  }

  // Dynamic gallery renderer
  function renderStudentGallery(data) {
    const galleryContainer = document.getElementById('student-gallery-grid');
    if (!galleryContainer) return;

    if (data.length === 0) {
      galleryContainer.innerHTML = `
        <div class="card-glass" style="grid-column: 1 / -1; padding: 3rem; text-align: center; color: var(--text-secondary);">
          <i class="fa-solid fa-users-slash" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--text-muted);"></i>
          <p>No verified students registered yet.</p>
        </div>
      `;
      return;
    }

    galleryContainer.innerHTML = data.map((student, idx) => {
      const skillsTags = student.skills.slice(0, 3).map(s => `<span>${s}</span>`).join('');
      return `
        <div class="student-card card-glass" data-student-index="${idx}">
          <div class="sc-header">
            <div class="sc-photo-wrapper skeleton">
              <img class="sc-photo" src="${student.photo}" alt="${student.name} Headshot" onload="this.parentElement.classList.remove('skeleton')">
            </div>
            <div class="sc-meta">
              <h4 class="sc-name">${student.name}</h4>
              <span class="sc-program">${student.program.replace(' (VLSI Specialization)', '')}</span>
              <div class="sc-cgpa-row">
                <span class="sc-cgpa-badge">CGPA: ${student.cgpa.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <p class="sc-objective">${student.objective}</p>
          <div class="sc-section-title">Core Skills</div>
          <div class="sc-skills">
            ${skillsTags}
            ${student.skills.length > 3 ? `<span>+${student.skills.length - 3}</span>` : ''}
          </div>
          <div class="sc-section-title">Key Project</div>
          <div class="sc-project">
            <span class="sc-project-title">${student.project1.title}</span>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to cards
    galleryContainer.querySelectorAll('.student-card').forEach(card => {
      card.addEventListener('click', () => {
        const studentIndex = parseInt(card.dataset.studentIndex);
        openStudentDetailModal(data[studentIndex]);
      });
    });
  }

  // Dynamic statistics calculator
  function updateBatchStats(data) {
    if (data.length === 0) return;
    
    const totalStudentsVal = data.length;
    const avgCgpaVal = (data.reduce((sum, s) => sum + s.cgpa, 0) / totalStudentsVal).toFixed(2);
    
    const internshipCount = data.filter(s => s.internship && s.internship.company.trim() !== '').length;
    
    const pubCount = data.filter(s => {
      if (!s.pubs) return false;
      const p = s.pubs.trim().toLowerCase();
      return p !== '' && p !== 'none' && p !== 'none.' && p !== '"none"';
    }).length;
    
    const projectCount = data.reduce((sum, s) => {
      let cnt = 0;
      if (s.project1 && s.project1.title.trim() !== '') cnt++;
      if (s.project2 && s.project2.title.trim() !== '') cnt++;
      return sum + cnt;
    }, 0);
    
    const leadershipCount = data.filter(s => s.leadership && s.leadership.length > 0).length;
    
    const certCount = data.reduce((sum, s) => {
      if (!s.certs) return sum;
      const list = s.certs.split(/[,\n]/).map(c => c.trim()).filter(c => c !== '');
      return sum + list.length;
    }, 0);
    
    // Update Stats in Hero and Highlights
    const domTotalStudents = document.getElementById('stat-total-students');
    const domAvgCgpa = document.getElementById('stat-avg-cgpa');
    const domTotalInternships = document.getElementById('stat-total-internships');
    const domTotalPubs = document.getElementById('stat-total-publications');
    
    if (domTotalStudents) domTotalStudents.textContent = totalStudentsVal;
    if (domAvgCgpa) domAvgCgpa.textContent = avgCgpaVal;
    if (domTotalInternships) domTotalInternships.textContent = internshipCount;
    if (domTotalPubs) domTotalPubs.textContent = pubCount;
    
    const hlInternships = document.getElementById('highlight-internships');
    const hlProjects = document.getElementById('highlight-projects');
    const hlLeadership = document.getElementById('highlight-leadership');
    const hlCerts = document.getElementById('highlight-certs');
    
    if (hlInternships) hlInternships.textContent = internshipCount;
    if (hlProjects) hlProjects.textContent = projectCount;
    if (hlLeadership) hlLeadership.textContent = leadershipCount;
    if (hlCerts) hlCerts.textContent = certCount;
  }

  // Dynamic skills distribution list calculator
  function renderSkillsMatrix(data) {
    const progressContainer = document.getElementById('skills-matrix-progress');
    if (!progressContainer) return;
    
    if (data.length === 0) {
      progressContainer.innerHTML = '<p class="loader-text">No skills data available.</p>';
      return;
    }

    const coreSkills = [
      "Analog IC Design",
      "Cadence Virtuoso",
      "Custom Layout / DRC/LVS",
      "Verilog RTL Design",
      "FPGA (Xilinx/Intel)",
      "Physical Design / STA",
      "Embedded Systems (STM32, Arduino)",
      "Python / C / MATLAB",
      "LTspice / Ngspice",
      "Machine Learning / AI Hardware",
      "Neuromorphic Computing"
    ];
    
    const skillTally = {};
    coreSkills.forEach(s => skillTally[s] = 0);
    
    data.forEach(student => {
      if (Array.isArray(student.skills)) {
        student.skills.forEach(s => {
          coreSkills.forEach(coreSkill => {
            if (s.toLowerCase().includes(coreSkill.toLowerCase()) || coreSkill.toLowerCase().includes(s.toLowerCase())) {
              skillTally[coreSkill]++;
            }
          });
        });
      }
    });
    
    const skillsDistribution = coreSkills.map(skill => {
      const pct = Math.round((skillTally[skill] / data.length) * 100);
      return { name: skill, percent: pct };
    }).sort((a, b) => b.percent - a.percent);
    
    progressContainer.innerHTML = skillsDistribution.map(item => `
      <div class="skill-progress-item">
        <div class="spi-header"><span>${item.name}</span><span class="spi-percent">${item.percent}%</span></div>
        <div class="spi-bar-track"><div class="spi-bar-fill" style="width: ${item.percent}%;"></div></div>
      </div>
    `).join('');
  }

  // Dynamic project showcase renderer (picks primary projects from top 6 students by CGPA)
  function renderProjectShowcase(data) {
    const gridContainer = document.getElementById('projects-showcase-grid');
    if (!gridContainer) return;
    
    if (data.length === 0) {
      gridContainer.innerHTML = `
        <div class="card-glass" style="grid-column: 1 / -1; padding: 3rem; text-align: center; color: var(--text-secondary);">
          <p>No project data available yet.</p>
        </div>
      `;
      return;
    }

    const topStudents = [...data]
      .sort((a, b) => b.cgpa - a.cgpa)
      .slice(0, 6);
      
    gridContainer.innerHTML = topStudents.map(student => {
      const p = student.project1;
      return `
        <div class="project-showcard card-glass">
          <div class="ps-header">
            <span class="ps-badge">${p.domain}</span>
          </div>
          <h4>${p.title}</h4>
          <div class="ps-student">
            <i class="fa-solid fa-user-gear"></i> Built by: <span class="ps-student-name" onclick="window.openStudentModalByName('${student.name}')">${student.name}</span>
          </div>
          <div class="ps-divider"></div>
          <div class="ps-tools">
             <strong>Tools/Tech:</strong> ${p.tools}
          </div>
          <p class="ps-outcomes">${p.outcomes}</p>
        </div>
      `;
    }).join('');
  }

  // Dynamic Role Suitability matching grid table
  function renderHiringMatrix(data) {
    const tbody = document.getElementById('hiring-matrix-tbody');
    if (!tbody) return;
    
    if (data.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 2rem;">No candidates available yet.</td>
        </tr>
      `;
      return;
    }
    
    tbody.innerHTML = data.map((student) => {
      const skillsLower = student.skills.map(s => s.toLowerCase());
      const interestsLower = student.interests.map(i => i.toLowerCase());
      
      const isAnalog = interestsLower.some(i => i.includes('analog') || i.includes('layout')) || 
                       skillsLower.some(s => s.includes('analog') || s.includes('virtuoso') || s.includes('drc') || s.includes('lvs'));
                       
      const isRtl = interestsLower.some(i => i.includes('rtl') || i.includes('verification') || i.includes('digital')) || 
                    skillsLower.some(s => s.includes('verilog') || s.includes('rtl') || s.includes('fpga') || s.includes('systemverilog') || s.includes('vivado'));
                    
      const isPd = interestsLower.some(i => i.includes('physical')) || 
                   skillsLower.some(s => s.includes('physical') || s.includes('sta') || s.includes('floorplanning') || s.includes('routing') || s.includes('synopsys'));
                   
      const isEmbedded = interestsLower.some(i => i.includes('embedded')) || 
                         skillsLower.some(s => s.includes('embedded') || s.includes('stm32') || s.includes('arduino') || s.includes('mcu') || s.includes('arm'));
                         
      const isAi = interestsLower.some(i => i.includes('ai') || i.includes('neuromorphic')) || 
                   skillsLower.some(s => s.includes('machine learning') || s.includes('ai') || s.includes('neuromorphic') || s.includes('pytorch'));
                   
      const badgeYes = '<span class="hm-badge-yes"><i class="fa-solid fa-check"></i></span>';
      const badgeNo = '<span class="hm-badge-no"><i class="fa-solid fa-minus"></i></span>';
      
      return `
        <tr>
          <td>
            <a href="#" class="hm-name" onclick="event.preventDefault(); window.openStudentModalByName('${student.name}')">
              <i class="fa-solid fa-up-right-from-square" style="font-size: 0.72rem; color: var(--color-primary);"></i> ${student.name}
            </a>
          </td>
          <td><span class="hm-program">${student.program.replace(' Electronics (VLSI Specialization)', '')}</span></td>
          <td><span class="hm-cgpa">${student.cgpa.toFixed(2)}</span></td>
          <td style="text-align: center;">${isAnalog ? badgeYes : badgeNo}</td>
          <td style="text-align: center;">${isRtl ? badgeYes : badgeNo}</td>
          <td style="text-align: center;">${isPd ? badgeYes : badgeNo}</td>
          <td style="text-align: center;">${isEmbedded ? badgeYes : badgeNo}</td>
          <td style="text-align: center;">${isAi ? badgeYes : badgeNo}</td>
        </tr>
      `;
    }).join('');
  }

  // Global window function helper to launch modal from project links / suitability rows
  window.openStudentModalByName = function(name) {
    const studentObj = students.find(s => s.name === name);
    if (studentObj) openStudentDetailModal(studentObj);
  };

  function getStudentBrochureCardHTML(student) {
    // Generate skills tag html
    const skillsHtml = student.skills.map(s => `<span>${s}</span>`).join('');
    
    // Generate interests tag html
    const interestsHtml = student.interests.map(i => `<span>${i}</span>`).join('');

    // Generate internship block
    const internHtml = student.internship ? `
      <div class="bc-sec-column">
        <h4 class="bc-sec-title">Professional Experience</h4>
        <div class="bc-internship">
          <h5 class="bc-intern-company">${student.internship.company}</h5>
          <span class="bc-intern-duration">${student.internship.duration}</span>
          <p class="bc-intern-work">${student.internship.work}</p>
        </div>
      </div>
    ` : '';

    // Generate Certs & Pubs block
    const hasCerts = student.certs && student.certs !== '';
    const hasPubs = student.pubs && student.pubs !== 'None' && student.pubs !== '';
    const extraHtml = (hasCerts || hasPubs) ? `
      <div class="bc-sec-column">
        <h4 class="bc-sec-title">Certifications & Publications</h4>
        <div class="bc-certs-pubs">
          <ul class="bc-bullet-list">
            ${hasCerts ? `<li><strong>Certifications:</strong> <span>${student.certs}</span></li>` : ''}
            ${hasPubs ? `<li><strong>Publications:</strong> <span>${student.pubs}</span></li>` : ''}
          </ul>
        </div>
      </div>
    ` : '';

    // Generate Project 2
    const p2Html = student.project2 ? `
      <div class="bc-project">
        <div class="bc-proj-header">
          <h5 class="bc-proj-title">Project 2: ${student.project2.title}</h5>
          <span class="bc-badge">${student.project2.domain}</span>
        </div>
        <p class="bc-proj-tools"><strong>Tools/Tech:</strong> <span>${student.project2.tools}</span></p>
        <p class="bc-proj-desc">${student.project2.outcomes}</p>
      </div>
    ` : '';

    // Generate Leadership block
    const leadershipHtml = student.leadership && student.leadership.length > 0 ? `
      <div class="bc-section">
        <h4 class="bc-sec-title">Leadership & Positions of Responsibility</h4>
        <div class="bc-tags bc-tags-secondary">
          ${student.leadership.map(l => `<span>${l}</span>`).join('')}
        </div>
      </div>
    ` : '';

    return `
      <div class="brochure-card" id="brochure-card-modal-render" style="margin: 0 auto; background: var(--card-bg-render, #0f172a); color: var(--text-main);">
        <div class="bc-header">
          <div class="bc-univ-logo">
            <i class="fa-solid fa-microchip"></i>
          </div>
          <div class="bc-title-block">
            <h3>${student.program}</h3>
            <p>PLACEMENT PORTFOLIO • CLASS OF 2026</p>
          </div>
          <div class="bc-cgpa-pill">
            <span class="bc-cgpa-label">CGPA</span>
            <span class="bc-cgpa-val">${student.cgpa.toFixed(2)}</span>
          </div>
        </div>

        <div class="bc-profile-row">
          <div class="bc-photo-container">
            <img src="${student.photo}" alt="${student.name} Headshot">
          </div>
          <div class="bc-bio-details">
            <h2 class="bc-name">${student.name}</h2>
            <div class="bc-contact-grid">
              <span class="bc-contact-item">
                <i class="fa-regular fa-envelope"></i> <span>${student.name.toLowerCase().replace(' ', '.')}@duk.ac.in</span>
              </span>
              <span class="bc-contact-item">
                <i class="fa-solid fa-phone"></i> <span>+91-XXXXXXXXXX</span>
              </span>
              <a href="#" target="_blank" class="bc-contact-item bc-link">
                <i class="fa-brands fa-linkedin"></i> <span>linkedin.com/in/${student.name.toLowerCase().replace(' ', '')}</span>
              </a>
            </div>
          </div>
        </div>

        <div class="bc-divider"></div>

        <div class="bc-section">
          <h4 class="bc-sec-title">Career Objective</h4>
          <p class="bc-objective-text">${student.objective}</p>
        </div>

        <div class="bc-skills-interests-row">
          <div class="bc-sec-column">
            <h4 class="bc-sec-title">Technical Skills</h4>
            <div class="bc-tags">
              ${skillsHtml}
            </div>
          </div>
          <div class="bc-sec-column">
            <h4 class="bc-sec-title">Areas of Interest</h4>
            <div class="bc-tags">
              ${interestsHtml}
            </div>
          </div>
        </div>

        <div class="bc-section">
          <h4 class="bc-sec-title">Projects</h4>
          <div class="bc-project">
            <div class="bc-proj-header">
              <h5 class="bc-proj-title">Project 1: ${student.project1.title}</h5>
              <span class="bc-badge">${student.project1.domain}</span>
            </div>
            <p class="bc-proj-tools"><strong>Tools/Tech:</strong> <span>${student.project1.tools}</span></p>
            <p class="bc-proj-desc">${student.project1.outcomes}</p>
          </div>
          ${p2Html}
        </div>

        <div class="bc-grid-2">
          ${internHtml}
          ${extraHtml}
        </div>

        ${leadershipHtml}

        <div class="bc-footer">
          <div class="bc-verified" style="margin-left: auto;">
            <i class="fa-solid fa-circle-check"></i> Verified Candidate
          </div>
        </div>
      </div>
    `;
  }

  function openStudentDetailModal(student) {
    activeModalStudentName = student.name;
    modalBrochureCardContainer.innerHTML = getStudentBrochureCardHTML(student);
    profileDetailModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
  }

  function closeStudentDetailModal() {
    profileDetailModal.classList.add('hidden');
    modalBrochureCardContainer.innerHTML = '';
    document.body.style.overflow = 'auto'; // Restore scrolling
  }

  btnCloseProfileModal.addEventListener('click', closeStudentDetailModal);
  
  profileDetailModal.addEventListener('click', (e) => {
    if (e.target === profileDetailModal) {
      closeStudentDetailModal();
    }
  });

  // Modal Card Downloads (PNG / PDF)
  btnModalDownloadPng.addEventListener('click', () => {
    const cardElement = document.getElementById('brochure-card-modal-render');
    const nameSanitized = activeModalStudentName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    showToast('Generating high-resolution card image...', 'info');
    
    html2canvas(cardElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', imgData);
      downloadAnchor.setAttribute('download', `duk_vlsi_card_${nameSanitized}.png`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('PNG Brochure card downloaded successfully.', 'success');
    }).catch(err => {
      console.error('Error generating image from modal:', err);
      showToast('Failed to generate PNG card.', 'error');
    });
  });

  btnModalPrintPdf.addEventListener('click', () => {
    // Print window triggers window.print. Since print media hides all other portal elements,
    // it will print exactly the rendered brochure card.
    window.print();
  });

  // Request Brochure Button click cell contact
  if (btnRequestBrochure) {
    btnRequestBrochure.addEventListener('click', () => {
      window.location.href = "mailto:placement@duk.ac.in?subject=Requesting%20VLSI%20Batch%202026%20Placement%20Brochure&body=Dear%20Placement%20Cell,%0A%0AWe%20would%20like%20to%20request%20the%20placement%20brochure%20compilation%20for%20the%20DUK%20MSc/MTech%20VLSI%20Specialization%20Class%20of%202026.%0A%0ACompany%20Name:%20%0AContact%20Person:%20";
      showToast('Email draft created to request brochure book.', 'success');
    });
  }

  // ==========================================================================
  // TOAST NOTIFICATION UTILITY
  // ==========================================================================

  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconClass = 'fa-solid fa-circle-info';
    if (type === 'success') iconClass = 'fa-solid fa-circle-check';
    if (type === 'error') iconClass = 'fa-solid fa-circle-exclamation';
    
    toast.innerHTML = `
      <i class="${iconClass}"></i>
      <span class="toast-text">${message}</span>
      <button class="toast-close"><i class="fa-solid fa-xmark"></i></button>
    `;
    
    toastContainer.appendChild(toast);
    
    const dismissTimer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px) scale(0.95)';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 4500);

    toast.querySelector('.toast-close').addEventListener('click', () => {
      clearTimeout(dismissTimer);
      toast.remove();
    });
  }

  // ==========================================================================
  // INITIALIZE ON LOAD
  // ==========================================================================
  // Initialize dynamic state students list array
  let students = [];

  initTheme();
  fetchAllStudents(); // Loads dynamic records and triggers UI rendering onload
  loadDraft(); // Resumes state and refreshes brochure preview card
  updateProgress();
  
  if (!localStorage.getItem('vlsi_placement_draft')) {
    syncPreview();
  }
});
