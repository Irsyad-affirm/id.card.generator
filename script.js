// ============================================
// ID CARD GENERATOR - MAIN SCRIPT
// ============================================

/**
 * Configuration & Constants
 */
const CONFIG = {
    CANVAS_WIDTH: 1024,
    CANVAS_HEIGHT: 640,
    PHOTO_BOX_WIDTH: 200,
    PHOTO_BOX_HEIGHT: 240,
    PHOTO_BOX_X: 80,
    PHOTO_BOX_Y: 140,
    NAME_POSITION_X: 350,
    NAME_POSITION_Y: 240,
    DIVISION_POSITION_X: 350,
    DIVISION_POSITION_Y: 320,
    TEXT_COLOR: '#000000',
    NAME_FONT_SIZE: 48,
    DIVISION_FONT_SIZE: 36,
    MAX_NAME_LENGTH: 40,
    ALLOWED_EXTENSIONS: ['png', 'jpg', 'jpeg'],
    ALLOWED_MIME_TYPES: ['image/png', 'image/jpeg'],
};

/**
 * State Management
 */
const state = {
    fullName: '',
    division: '',
    photoDataUrl: null,
    photoImage: null,
};

/**
 * DOM Elements
 */
const elements = {
    form: document.getElementById('idCardForm'),
    fullNameInput: document.getElementById('fullName'),
    nameCharCount: document.getElementById('nameCharCount'),
    divisionSelect: document.getElementById('division'),
    photoUpload: document.getElementById('photoUpload'),
    clearPhotoBtn: document.getElementById('clearPhotoBtn'),
    photoInfo: document.getElementById('photoInfo'),
    photoFileName: document.getElementById('photoFileName'),
    photoError: document.getElementById('photoError'),
    generateBtn: document.getElementById('generateBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    canvas: document.getElementById('idCardCanvas'),
    placeholderMessage: document.getElementById('placeholderMessage'),
    toast: document.getElementById('toast'),
};

/**
 * Initialize Application
 */
function init() {
    setupEventListeners();
    drawPlaceholderTemplate();
}

/**
 * Setup Event Listeners
 */
function setupEventListeners() {
    // Form inputs
    elements.fullNameInput.addEventListener('input', handleNameInput);
    elements.divisionSelect.addEventListener('change', handleDivisionChange);
    elements.photoUpload.addEventListener('change', handlePhotoUpload);
    elements.clearPhotoBtn.addEventListener('click', handleClearPhoto);
    
    // Buttons
    elements.generateBtn.addEventListener('click', handleGenerate);
    elements.downloadBtn.addEventListener('click', handleDownload);
    elements.form.addEventListener('reset', handleFormReset);
}

/**
 * Event Handler: Name Input
 */
function handleNameInput(e) {
    const value = e.target.value;
    state.fullName = value;
    
    // Update character count
    elements.nameCharCount.textContent = value.length;
    
    // Real-time preview update
    if (state.photoDataUrl) {
        requestAnimationFrame(() => renderIDCard());
    }
}

/**
 * Event Handler: Division Change
 */
function handleDivisionChange(e) {
    state.division = e.target.value;
    
    // Real-time preview update
    if (state.photoDataUrl) {
        requestAnimationFrame(() => renderIDCard());
    }
}

/**
 * Event Handler: Photo Upload
 */
function handlePhotoUpload(e) {
    const file = e.target.files[0];
    
    // Clear previous error
    elements.photoError.style.display = 'none';
    elements.photoError.textContent = '';
    
    if (!file) {
        return;
    }
    
    // Validate file type
    if (!validatePhotoFile(file)) {
        showToast('Format file tidak didukung. Gunakan PNG, JPG, atau JPEG', 'error');
        elements.photoUpload.value = '';
        return;
    }
    
    // Validate file size (max 5MB)
    const maxSizeBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
        showToast('Ukuran file terlalu besar. Maksimal 5MB', 'error');
        elements.photoUpload.value = '';
        return;
    }
    
    // Read file
    const reader = new FileReader();
    
    reader.onload = (event) => {
        state.photoDataUrl = event.target.result;
        
        // Create image object
        const img = new Image();
        img.onload = () => {
            state.photoImage = img;
            updatePhotoInfo(file.name);
            updateFileUploadUI(true);
            showToast('Foto berhasil diunggah', 'success');
        };
        
        img.onerror = () => {
            showToast('Gagal memproses foto. Coba foto lain', 'error');
            handleClearPhoto();
        };
        
        img.src = state.photoDataUrl;
    };
    
    reader.onerror = () => {
        showToast('Gagal membaca file', 'error');
        handleClearPhoto();
    };
    
    reader.readAsDataURL(file);
}

/**
 * Validate Photo File
 */
function validatePhotoFile(file) {
    const fileName = file.name.toLowerCase();
    const ext = fileName.split('.').pop();
    
    // Check extension
    if (!CONFIG.ALLOWED_EXTENSIONS.includes(ext)) {
        return false;
    }
    
    // Check MIME type
    if (!CONFIG.ALLOWED_MIME_TYPES.includes(file.type)) {
        return false;
    }
    
    return true;
}

/**
 * Update Photo Info Display
 */
function updatePhotoInfo(fileName) {
    elements.photoFileName.textContent = `✓ ${fileName}`;
    elements.photoInfo.style.display = 'flex';
}

/**
 * Update File Upload UI
 */
function updateFileUploadUI(hasFile) {
    const label = elements.photoUpload.parentElement.querySelector('.file-upload-label');
    
    if (hasFile) {
        label.classList.add('active');
    } else {
        label.classList.remove('active');
    }
}

/**
 * Event Handler: Clear Photo
 */
function handleClearPhoto(e) {
    if (e) e.preventDefault();
    
    state.photoDataUrl = null;
    state.photoImage = null;
    elements.photoUpload.value = '';
    elements.photoInfo.style.display = 'none';
    updateFileUploadUI(false);
    drawPlaceholderTemplate();
    showToast('Foto dihapus', 'warning');
}

/**
 * Event Handler: Generate ID Card
 */
function handleGenerate(e) {
    e.preventDefault();
    
    // Clear previous errors
    elements.photoError.style.display = 'none';
    elements.photoError.textContent = '';
    
    // Validate form inputs
    const validation = validateFormInputs();
    if (!validation.valid) {
        showToast(validation.message, 'error');
        elements.photoError.textContent = validation.message;
        elements.photoError.style.display = 'block';
        return;
    }
    
    // Render ID card
    renderIDCard();
    
    // Show download button
    elements.downloadBtn.style.display = 'flex';
    
    showToast('ID Card berhasil dibuat! Silakan unduh', 'success');
}

/**
 * Validate Form Inputs
 */
function validateFormInputs() {
    // Check name
    if (!state.fullName.trim()) {
        return {
            valid: false,
            message: 'Nama lengkap harus diisi'
        };
    }
    
    if (state.fullName.trim().length < 3) {
        return {
            valid: false,
            message: 'Nama minimal 3 karakter'
        };
    }
    
    // Check division
    if (!state.division) {
        return {
            valid: false,
            message: 'Pilih divisi kepanitiaan'
        };
    }
    
    // Check photo
    if (!state.photoDataUrl || !state.photoImage) {
        return {
            valid: false,
            message: 'Unggah foto pas (PNG, JPG, atau JPEG)'
        };
    }
    
    return {
        valid: true,
        message: ''
    };
}

/**
 * Render ID Card on Canvas
 */
function renderIDCard() {
    const ctx = elements.canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    
    // Draw master template (placeholder)
    drawMasterTemplate(ctx);
    
    // Draw photo
    if (state.photoImage) {
        drawCroppedPhoto(ctx, state.photoImage);
    }
    
    // Draw text
    drawText(ctx, state.fullName, CONFIG.NAME_POSITION_X, CONFIG.NAME_POSITION_Y, CONFIG.NAME_FONT_SIZE);
    drawText(ctx, state.division, CONFIG.DIVISION_POSITION_X, CONFIG.DIVISION_POSITION_Y, CONFIG.DIVISION_FONT_SIZE);
    
    // Show canvas, hide placeholder
    elements.canvas.classList.add('visible');
    elements.placeholderMessage.style.display = 'none';
}

/**
 * Draw Master Template
 * This draws a basic ID card template structure
 */
function drawMasterTemplate(ctx) {
    // Background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    
    // Add a subtle border
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    
    // Photo box border
    ctx.strokeStyle = '#999999';
    ctx.lineWidth = 3;
    ctx.strokeRect(
        CONFIG.PHOTO_BOX_X,
        CONFIG.PHOTO_BOX_Y,
        CONFIG.PHOTO_BOX_WIDTH,
        CONFIG.PHOTO_BOX_HEIGHT
    );
    
    // Header text (example: "ID PANITIA")
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 36px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('KARTU PENGENAL PANITIA', CONFIG.CANVAS_WIDTH / 2, 80);
    
    // Decorative line
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(150, 110);
    ctx.lineTo(CONFIG.CANVAS_WIDTH - 150, 110);
    ctx.stroke();
}

/**
 * Draw Cropped Photo
 * Implements center-crop algorithm
 */
function drawCroppedPhoto(ctx, img) {
    const photoBoxWidth = CONFIG.PHOTO_BOX_WIDTH;
    const photoBoxHeight = CONFIG.PHOTO_BOX_HEIGHT;
    
    // Calculate target aspect ratio
    const targetRatio = photoBoxWidth / photoBoxHeight;
    const imgRatio = img.width / img.height;
    
    let sourceWidth, sourceHeight, sourceX, sourceY;
    
    if (imgRatio > targetRatio) {
        // Image is wider than target box - crop horizontally
        sourceHeight = img.height;
        sourceWidth = sourceHeight * targetRatio;
        sourceX = (img.width - sourceWidth) / 2;
        sourceY = 0;
    } else {
        // Image is taller than target box - crop vertically
        sourceWidth = img.width;
        sourceHeight = sourceWidth / targetRatio;
        sourceX = 0;
        sourceY = (img.height - sourceHeight) / 2;
    }
    
    // Draw cropped and scaled image
    ctx.drawImage(
        img,
        sourceX, sourceY, sourceWidth, sourceHeight,
        CONFIG.PHOTO_BOX_X, CONFIG.PHOTO_BOX_Y, photoBoxWidth, photoBoxHeight
    );
    
    // Draw border around photo
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.strokeRect(
        CONFIG.PHOTO_BOX_X,
        CONFIG.PHOTO_BOX_Y,
        CONFIG.PHOTO_BOX_WIDTH,
        CONFIG.PHOTO_BOX_HEIGHT
    );
}

/**
 * Draw Text on Canvas
 */
function drawText(ctx, text, x, y, fontSize) {
    ctx.fillStyle = CONFIG.TEXT_COLOR;
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    
    // Add text shadow for better readability
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillText(text, x + 2, y + 2);
    
    // Draw actual text
    ctx.fillStyle = CONFIG.TEXT_COLOR;
    ctx.fillText(text, x, y);
}

/**
 * Draw Placeholder Template
 */
function drawPlaceholderTemplate() {
    const ctx = elements.canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    
    // Draw master template only
    drawMasterTemplate(ctx);
    
    // Hide canvas, show placeholder
    elements.canvas.classList.remove('visible');
    elements.placeholderMessage.style.display = 'block';
}

/**
 * Event Handler: Download ID Card
 */
function handleDownload(e) {
    e.preventDefault();
    
    // Convert canvas to blob and download
    elements.canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 10);
        const fileName = `id-card-${state.fullName.replace(/\s+/g, '-').toLowerCase()}-${timestamp}.png`;
        
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showToast(`ID Card "${fileName}" berhasil diunduh`, 'success');
    }, 'image/png', 1.0);
}

/**
 * Event Handler: Form Reset
 */
function handleFormReset(e) {
    // Reset state
    state.fullName = '';
    state.division = '';
    state.photoDataUrl = null;
    state.photoImage = null;
    
    // Reset UI
    elements.nameCharCount.textContent = '0';
    elements.photoInfo.style.display = 'none';
    elements.downloadBtn.style.display = 'none';
    updateFileUploadUI(false);
    
    // Redraw placeholder
    drawPlaceholderTemplate();
    
    showToast('Form direset', 'warning');
}

/**
 * Show Toast Notification
 */
function showToast(message, type = 'info') {
    const toast = elements.toast;
    
    // Reset classes
    toast.className = 'toast show';
    
    // Add type class
    if (type === 'success') {
        toast.classList.add('success');
    } else if (type === 'error') {
        toast.classList.add('error');
    } else if (type === 'warning') {
        toast.classList.add('warning');
    }
    
    // Set message
    toast.textContent = message;
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

/**
 * Performance optimization: Use requestAnimationFrame for canvas rendering
 */
function optimizedRender() {
    if (state.photoDataUrl && state.fullName && state.division) {
        requestAnimationFrame(() => renderIDCard());
    }
}

/**
 * Event delegation for dynamic elements
 */
document.addEventListener('DOMContentLoaded', init);

/**
 * Handle browser back button - preserve state if needed
 */
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        // Page was restored from bfcache
        if (state.photoDataUrl) {
            updateFileUploadUI(true);
            updatePhotoInfo('Photo loaded');
        }
    }
});

/**
 * Prevent accidental navigation loss
 */
window.addEventListener('beforeunload', (event) => {
    if (state.fullName || state.division || state.photoDataUrl) {
        event.preventDefault();
        event.returnValue = '';
    }
});

// Log initialization
console.log('ID Card Generator initialized successfully');
