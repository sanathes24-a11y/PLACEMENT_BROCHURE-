/**
 * Placement Brochure 2026 Registration - MSc Electronics (VLSI Specialization)
 * Application logic (Validation, Wizard wizard, Local Storage Auto-save, Preview Syncer)
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // DOM ELEMENT REFERENCES
  // ==========================================================================
  const form = document.getElementById('placement-form');
  const steps = Array.from(document.querySelectorAll('.form-step'));
  const stepNodes = Array.from(document.querySelectorAll('.step-node'));
  const progressBarFill = document.getElementById('progress-bar-fill');
  
  // Navigation Buttons
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const draftSaveIndicator = document.getElementById('draft-save-indicator');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const btnAutofill = document.getElementById('btn-autofill');
  const btnDownloadPng = document.getElementById('btn-download-png');
  
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

  // SVG Fallback for professional avatar headshot
  const svgPlaceholder = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231e293b'/><circle cx='50' cy='35' r='18' fill='%23475569'/><path d='M50 58c-15 0-25 7-25 15v5h50v-5c0-8-10-15-25-15z' fill='%23475569'/></svg>";

  // State Variables
  let currentStep = 1;
  let photoBase64 = '';
  let autoSaveTimeout = null;

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    updateProgress();
  }

  // ==========================================================================
  // VALIDATIONS PER STEP
  // ==========================================================================

  function validateEmail(email) {
    // Broad regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    
    // Google form explicitly requested university email. Show warning check but let standard format slide
    // Let's do a strict check for uni domain or just check if it has letters
    return true;
  }

  function validatePhone(phone) {
    // Example format: +91-9876543210
    // Allow spaces, dashes, numbers, starting plus. Let's make it robust but flexible
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
        // Only set is-valid if the field is not empty (for optional ones) or if it's explicitly filled
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
      } else if (!inputEmail.value.trim().endsWith('.edu') && !inputEmail.value.trim().endsWith('.ac.in') && !inputEmail.value.trim().includes('university')) {
        // Warning: Google Forms specifies "university email". Let's show warning or allow with a tip
        // We will accept it but we can add a warning class
        setFieldError(emailGroup, false);
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

      // Project 2 has no required fields, but if title is entered, domain, tools, and outcomes are nice-to-have but still optional as per Google Forms.
      // We will allow Project 2 to remain partial.
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
        // Form Complete - Submit
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
      
      // Allow moving backward freely, or forward if steps in between are valid
      if (targetStep < currentStep) {
        currentStep = targetStep;
        showStep(currentStep);
      } else if (targetStep > currentStep) {
        // Verify current step before stepping forward
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

    // Check File Type
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      showToast('Allowed file types are PNG, JPG or JPEG.', 'error');
      return;
    }

    // Check File Size (Max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      showToast('Image size exceeds 5MB limit.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      photoBase64 = e.target.result;
      
      // Update UI elements
      uploadImgPreview.src = photoBase64;
      previewImg.src = photoBase64;
      
      uploadFileName.textContent = file.name;
      uploadFileSize.textContent = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      
      uploadContentEmpty.classList.add('hidden');
      uploadPreviewContainer.classList.remove('hidden');
      
      document.getElementById('group-photo').classList.remove('is-invalid');
      
      // Save Photo to localStorage
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

  // Input file change listener
  inputPhoto.addEventListener('change', (e) => {
    if (e.target.files.length) {
      handlePhotoSelect(e.target.files[0]);
    }
  });

  // Drag and drop listeners
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

  // Remove photo click listener
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

  // Internship Company dependency
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
      
      // Reset errors if any
      inputInternDuration.parentElement.parentElement.classList.remove('is-invalid');
      textareaInternWork.parentElement.parentElement.classList.remove('is-invalid');
    }
  }

  inputInternCompany.addEventListener('input', toggleInternshipFields);

  // Other skills specify
  skillOtherToggle.addEventListener('change', () => {
    if (skillOtherToggle.checked) {
      groupSkillsOtherText.classList.remove('hidden');
    } else {
      groupSkillsOtherText.classList.add('hidden');
      inputSkillsOtherText.value = '';
    }
    syncPreview();
  });

  // Other interests specify
  interestOtherToggle.addEventListener('change', () => {
    if (interestOtherToggle.checked) {
      groupInterestsOtherText.classList.remove('hidden');
    } else {
      groupInterestsOtherText.classList.add('hidden');
      inputInterestsOtherText.value = '';
    }
    syncPreview();
  });

  // Other leadership specify
  leadershipOtherToggle.addEventListener('change', () => {
    if (leadershipOtherToggle.checked) {
      groupLeadershipOtherText.classList.remove('hidden');
    } else {
      groupLeadershipOtherText.classList.add('hidden');
      inputLeadershipOtherText.value = '';
    }
    syncPreview();
  });

  // Character Counter for Objective
  textareaObjective.addEventListener('input', () => {
    const len = textareaObjective.value.length;
    objectiveCounter.textContent = `${len} / 250 characters`;
    if (len > 250) {
      objectiveCounter.style.color = 'var(--color-danger)';
    } else {
      objectiveCounter.style.color = 'var(--text-muted)';
    }
  });

  // Limit Max Checked Interests to 3 (prevent checking more)
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
    // 1. Personal Details
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

    // 2. Career Objective
    previewObjective.textContent = textareaObjective.value.trim() || 'Seeking an exciting opportunity to apply VLSI designing concepts and digital architecture skills in semiconductor design and development...';

    // 3. Technical Skills tags
    const checkedSkills = Array.from(form.querySelectorAll('input[name="skills"]:checked')).map(cb => cb.value);
    
    // Replace "Other" tag with specific text if provided
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

    // 4. Areas of Interest tags
    const checkedInterests = Array.from(form.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value);
    
    // Replace "Others" tag with specific text if provided
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

    // 5. Projects
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
      previewP1Outcomes.textContent = 'Project description and metrics will show here.';
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

    // 6. Internship Column
    const internCompany = inputInternCompany.value.trim();
    if (internCompany) {
      previewInternCompany.textContent = internCompany;
      previewInternDuration.textContent = inputInternDuration.value.trim() || 'Summer 2025';
      previewInternWork.textContent = textareaInternWork.value.trim() || 'Key contribution...';
      previewInternshipCol.classList.remove('hidden');
    } else {
      previewInternshipCol.classList.add('hidden');
    }

    // 7. Certifications & Publications
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

    // If both internship and certs are empty, hide the entire row block
    if (!internCompany && !certsText && !pubsText) {
      document.getElementById('bc-sec-extra').classList.add('hidden');
    } else {
      document.getElementById('bc-sec-extra').classList.remove('hidden');
    }

    // 8. Leadership & Responsibilities
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

  // Trigger sync on input events
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

  // ESC key collapses expanded preview
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

    // Checkboxes
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
    // Debounce the auto save to avoid lagging on typing
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      const stateObj = getFormStateObject();
      localStorage.setItem('vlsi_placement_draft', JSON.stringify(stateObj));
      
      // Animate draft indicator
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
      
      // Restore standard text inputs
      Object.keys(data).forEach(key => {
        const value = data[key];
        const el = form.elements[key];
        
        if (el && !['checkbox', 'radio'].includes(el.type)) {
          el.value = value;
        }
      });

      // Restore Program radio button
      if (data.program) {
        const radio = form.querySelector(`input[name="program"][value="${data.program}"]`);
        if (radio) {
          radio.checked = true;
        }
      }

      // Restore Checkboxes
      Object.keys(data).forEach(key => {
        const value = data[key];
        if (Array.isArray(value)) {
          value.forEach(val => {
            const cb = form.querySelector(`input[name="${key}"][value="${val}"]`);
            if (cb) cb.checked = true;
          });
        }
      });

      // Restore photo upload if exists
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

      // Restore wizard step
      if (data.currentStep) {
        currentStep = parseInt(data.currentStep);
      }

      // Fire updates
      toggleInternshipFields();
      
      // Skills other visibility check
      if (skillOtherToggle.checked) groupSkillsOtherText.classList.remove('hidden');
      // Interests other visibility check
      if (interestOtherToggle.checked) groupInterestsOtherText.classList.remove('hidden');
      // Leadership other visibility check
      if (leadershipOtherToggle.checked) groupLeadershipOtherText.classList.remove('hidden');

      // Objective length check
      const len = textareaObjective.value.length;
      objectiveCounter.textContent = `${len} / 250 characters`;

      showStep(currentStep);
      syncPreview();
    } catch (e) {
      console.error("Error reading placement draft", e);
    }
  }

  // Register change listeners to fire draft auto save
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
  // DEMO DATA AUTO-FILL LOGIC
  // ==========================================================================

  btnAutofill.addEventListener('click', () => {
    // 1. Personal details
    inputFullName.value = "Aarav Sharma";
    inputEmail.value = "aarav.sharma@iiit.ac.in";
    inputPhone.value = "+91-9876543210";
    inputLinkedin.value = "https://linkedin.com/in/aaravsharma-vlsi";

    const mtechRadio = form.querySelector('input[name="program"][value="MTech Electronics (VLSI Specialization)"]');
    if (mtechRadio) mtechRadio.checked = true;

    // 2. Academics & skills
    inputCgpa.value = "9.25";

    // Reset all checkboxes first
    form.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);

    // Skills
    const skillsToCheck = ["Analog IC Design", "Cadence Virtuoso", "Custom Layout / DRC/LVS", "Verilog RTL Design", "LTspice / Ngspice", "Other"];
    skillsToCheck.forEach(skill => {
      const cb = form.querySelector(`input[name="skills"][value="${skill}"]`);
      if (cb) cb.checked = true;
    });
    groupSkillsOtherText.classList.remove('hidden');
    inputSkillsOtherText.value = "Spectre, Calibre LVS";

    // Interests (Max 3)
    const interestsToCheck = ["Analog Design", "Custom Layout", "RTL Design"];
    interestsToCheck.forEach(interest => {
      const cb = form.querySelector(`input[name="interests"][value="${interest}"]`);
      if (cb) cb.checked = true;
    });

    // 3. Projects
    inputP1Title.value = "Design of a 10-bit 50MS/s SAR ADC";
    selectP1Domain.value = "Analog IC Design";
    inputP1Tools.value = "180nm CMOS, Cadence Virtuoso, Spectre, MATLAB";
    textareaP1Outcomes.value = "Designed a 10-bit SAR ADC with a custom charge-redistribution DAC. Achieved an ENOB of 9.42 bits, SNDR of 58.4 dB, and active power consumption of 340 µW at a 1.8V supply.";

    inputP2Title.value = "FPGA Implementation of AXI4-Lite IP Core";
    selectP2Domain.value = "Digital IC Design";
    inputP2Tools.value = "Xilinx Vivado, Verilog RTL, Artix-7 FPGA";
    textareaP2Outcomes.value = "Developed and synthesized an AXI4-Lite compliant interface for register control. Verified logic correctness via SystemVerilog testbenches with 100% functional and code coverage.";

    // 4. Profile extra
    inputInternCompany.value = "Texas Instruments";
    toggleInternshipFields();
    inputInternDuration.value = "3 months (Summer 2025)";
    textareaInternWork.value = "Designed and simulated transient-response enhancements for low-dropout (LDO) linear regulators, improving settling time by 15% using active-feedback frequency compensation.";

    textareaCerts.value = "Cadence VLSI Fundamentals (2025)\nNPTEL Analog IC Design (2025)";
    inputPubs.value = '"High-Efficiency CMOS LDO for Low-Power SoC Applications" – IEEE TENCON 2025';
    
    // Leadership
    const leadershipToCheck = ["Placement Committee Member", "Technical Club Coordinator", "Other"];
    leadershipToCheck.forEach(role => {
      const cb = form.querySelector(`input[name="leadership"][value="${role}"]`);
      if (cb) cb.checked = true;
    });
    groupLeadershipOtherText.classList.remove('hidden');
    inputLeadershipOtherText.value = "VLSI Seminar Lead";

    // 5. Objective & Availability
    textareaObjective.value = "Seeking a challenging role in Analog/Mixed-Signal IC design and layout to contribute to advanced power management chips and low-power IoT circuits.";
    objectiveCounter.textContent = `${textareaObjective.value.length} / 250 characters`;

    // Load professional headshot image generated earlier
    fetch('professional_headshot_sample.png')
      .then(response => {
        if (!response.ok) throw new Error('Not OK');
        return response.blob();
      })
      .then(blob => {
        // Read photo as data URL
        const reader = new FileReader();
        reader.onload = function(e) {
          photoBase64 = e.target.result;
          uploadImgPreview.src = photoBase64;
          previewImg.src = photoBase64;
          
          uploadFileName.textContent = "professional_headshot_sample.png";
          uploadFileSize.textContent = (blob.size / (1024 * 1024)).toFixed(2) + ' MB';
          
          uploadContentEmpty.classList.add('hidden');
          uploadPreviewContainer.classList.remove('hidden');
          
          // Save Photo to localStorage
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
        // CORS/Direct file load fallback - use high quality SVG representation
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

    // Reset validations visuals
    form.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('is-invalid');
      group.classList.remove('is-valid');
    });

    syncPreview();
    saveDraft();
    showToast('Demo VLSI student data populated. You can navigate the steps to inspect.', 'success');
  });

  // ==========================================================================
  // SUBMIT & SUCCESS LOGIC
  // ==========================================================================

  function submitForm() {
    // Final check
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
      // Show Success Modal
      successModal.classList.remove('hidden');
      showToast('Brochure details submitted successfully!', 'success');
    } else {
      showToast('Validation errors found. Review your fields.', 'error');
    }
  }

  // Print Brochure PDF Trigger
  btnPrint.addEventListener('click', () => {
    // Print styling is handled via media query print
    window.print();
  });

  // Download Brochure Card as PNG Image
  btnDownloadPng.addEventListener('click', () => {
    const cardElement = document.getElementById('brochure-card-render');
    const nameInput = inputFullName.value.trim();
    const nameSanitized = (nameInput || 'submission').toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    showToast('Generating PNG image, please wait...', 'info');
    
    // Set html2canvas options to capture high resolution card
    html2canvas(cardElement, {
      scale: 2, // 2x density for high definition
      useCORS: true,
      allowTaint: true,
      backgroundColor: null // Transparent background around card rounded borders
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', imgData);
      downloadAnchor.setAttribute('download', `vlsi_placement_card_${nameSanitized}.png`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('PNG Card downloaded successfully.', 'success');
    }).catch(err => {
      console.error('Error generating image via html2canvas:', err);
      showToast('Failed to generate PNG image. Please try PDF download instead.', 'error');
    });
  });

  // Export submission as JSON file download
  btnExportJson.addEventListener('click', () => {
    const data = getFormStateObject();
    // Include photo
    data.photograph = photoBase64 ? "[Base64 Photo Encoded]" : "None";
    
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    
    const dateFormatted = new Date().toISOString().split('T')[0];
    const nameSanitized = (data.fullname || 'submission').toLowerCase().replace(/[^a-z0-9]/g, '_');
    downloadAnchor.setAttribute('download', `vlsi_placement_entry_${nameSanitized}_${dateFormatted}.json`);
    
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    
    showToast('JSON Export Downloaded.', 'success');
  });

  // Edit Response (returns to form)
  btnEditResponse.addEventListener('click', () => {
    successModal.classList.add('hidden');
  });

  // Submit Another Response (resets form completely)
  btnResetForm.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear this entry and start a new response?')) {
      // Clear storage
      localStorage.removeItem('vlsi_placement_draft');
      localStorage.removeItem('vlsi_draft_photo');
      localStorage.removeItem('vlsi_draft_photo_meta');
      
      // Reset form controls
      form.reset();
      photoBase64 = '';
      
      // Reset upload elements
      uploadImgPreview.src = '';
      previewImg.src = svgPlaceholder;
      uploadContentEmpty.classList.remove('hidden');
      uploadPreviewContainer.classList.add('hidden');
      
      // Hide conditional sections
      groupSkillsOtherText.classList.add('hidden');
      groupInterestsOtherText.classList.add('hidden');
      groupLeadershipOtherText.classList.add('hidden');
      toggleInternshipFields();
      
      // Reset indicators
      currentStep = 1;
      objectiveCounter.textContent = '0 / 250 characters';
      objectiveCounter.style.color = 'var(--text-muted)';
      
      // Remove visual validations
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
    
    // Auto dismiss
    const dismissTimer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px) scale(0.95)';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 4500);

    // Manual close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
      clearTimeout(dismissTimer);
      toast.remove();
    });
  }

  // ==========================================================================
  // INITIALIZE ON LOAD
  // ==========================================================================
  initTheme();
  loadDraft(); // Resumes state and refreshes brochure preview card
  updateProgress();
  
  if (!localStorage.getItem('vlsi_placement_draft')) {
    // If no draft is saved, sync preview with empty placeholder values
    syncPreview();
  }
});
