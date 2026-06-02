# Panduan Deployment ke GitHub Pages

## 📌 Prerequisites

- Akun GitHub (gratis)
- Git terinstall di komputer
- Text Editor / IDE (VS Code recommended)

## 🚀 Langkah-Langkah Deployment

### 1. Persiapan Repository GitHub

#### a. Buat Repository Baru

1. Buka https://github.com/new
2. Nama repository: `id-card-generator` (atau nama lain pilihan Anda)
3. Deskripsi: "Sistem otomatis pembuatan ID Card Panitia"
4. Pilih "Public" agar bisa diakses umum
5. Jangan initialize README/gitignore (sudah ada)
6. Klik "Create repository"

#### b. Copy Repository URL

Setelah repository dibuat, copy HTTPS URL. Contoh:
```
https://github.com/username/id-card-generator.git
```

### 2. Setup Local Repository

#### a. Buka Terminal/Command Prompt

Navigate ke folder proyek:
```bash
cd d:\Projek\Id_card
```

#### b. Initialize Git (jika belum)

```bash
git init
git add .
git commit -m "Initial commit: ID Card Generator v1.0.0"
```

#### c. Connect ke Remote Repository

```bash
git branch -M main
git remote add origin https://github.com/username/id-card-generator.git
git push -u origin main
```

Ganti `username` dengan GitHub username Anda.

### 3. Enable GitHub Pages

#### a. Buka Repository Settings

1. Buka repository di GitHub
2. Klik tab "Settings"
3. Di sidebar kiri, cari "Pages"

#### b. Configure GitHub Pages

1. Source: Pilih "Deploy from a branch"
2. Branch: Pilih "main" (atau branch lain)
3. Folder: Pilih "/(root)"
4. Klik "Save"

GitHub Pages akan memproses deployment dalam beberapa detik.

### 4. Verifikasi Deployment

#### a. Cek Status Deployment

1. Kembali ke halaman Settings > Pages
2. Cari text: "Your site is published at: https://username.github.io/id-card-generator/"
3. Klik link tersebut

Jika tampil halaman aplikasi ID Card Generator, maka deployment **BERHASIL** ✅

#### b. Akses URL

Aplikasi siap diakses di:
```
https://username.github.io/id-card-generator/
```

## 📝 Workflow Update & Maintenance

### Setiap kali ada perubahan kode:

```bash
# 1. Staging changes
git add .

# 2. Commit dengan pesan deskriptif
git commit -m "Update: Deskripsi perubahan yang dibuat"

# 3. Push ke repository
git push origin main
```

GitHub Pages otomatis akan redeploy dalam 1-2 menit.

## 🔧 Customization & Branding

### 1. Ubah Judul Halaman

Edit `index.html`:
```html
<title>Generator ID Card - Nama Organisasi Anda</title>
```

### 2. Ubah Header Color

Edit `styles.css`:
```css
:root {
    --primary-color: #2563eb;      /* Ubah warna utama */
    --primary-dark: #1e40af;       /* Ubah warna hover */
}
```

### 3. Tambah Logo/Identitas

Buat folder `assets/` dan letakkan logo/gambar di dalamnya:

```html
<!-- Di index.html bagian header -->
<div class="header-content">
    <img src="assets/logo.png" alt="Logo" class="header-logo">
    <h1>ID Card Generator</h1>
</div>
```

Edit `styles.css`:
```css
.header-logo {
    height: 50px;
    margin-bottom: 1rem;
}
```

### 4. Tambah Divisi Baru

Edit `index.html`:
```html
<select id="division">
    <option value="">-- Pilih Divisi --</option>
    <option value="Divisi Baru">Divisi Baru Anda</option>
    <!-- ... options lainnya ... -->
</select>
```

## 🎨 Menggunakan Template ID Card Kustom

Jika ingin menggunakan desain ID card yang sudah ada:

### 1. Siapkan Gambar Template

- Buat/download desain ID card (PNG, 1024x640px recommended)
- Simpan di folder `assets/template.png`

### 2. Update JavaScript

Edit `script.js`, modifikasi fungsi `drawMasterTemplate()`:

```javascript
function drawMasterTemplate(ctx) {
    const templateImg = new Image();
    templateImg.onload = () => {
        ctx.drawImage(templateImg, 0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    };
    templateImg.onerror = () => {
        console.error('Template image tidak ditemukan');
        // Fallback ke template default
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    };
    templateImg.src = 'assets/template.png';
}
```

### 3. Adjust Koordinat

Update nilai CONFIG di `script.js` sesuai posisi di template:

```javascript
const CONFIG = {
    // ... existing config ...
    PHOTO_BOX_X: 80,        // Sesuaikan dengan template
    PHOTO_BOX_Y: 140,       // Sesuaikan dengan template
    NAME_POSITION_X: 350,   // Sesuaikan dengan template
    NAME_POSITION_Y: 240,   // Sesuaikan dengan template
    // ... rest of config ...
};
```

## 📊 Monitoring & Analytics

### Cek Traffic GitHub Pages

1. Settings > Pages
2. Lihat status dan analytics deployment

### Browser Console Logs

Buka DevTools (F12) → Console untuk debug jika ada masalah:

```
ID Card Generator initialized successfully
```

Pesan ini menunjukkan aplikasi berjalan normal.

## 🆘 Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Halaman 404 | Pastikan branch adalah "main", folder adalah "/(root)" |
| Perubahan tidak keluar | Tunggu 1-2 menit, lalu clear cache browser (Ctrl+Shift+Del) |
| File tidak ditemukan | Pastikan path file relatif benar (contoh: `assets/template.png`) |
| Custom domain tidak jalan | Buat file `CNAME` di root dengan domain Anda |

## 📌 Catatan Penting

- **File Size**: Total < 2 MB per PRD requirement
- **HTTPS**: GitHub Pages otomatis menggunakan HTTPS (aman)
- **Downtime**: Sangat jarang (99.9% uptime)
- **Limit**: GitHub Pages gratis untuk public repository
- **Build Time**: Instant, tanpa build process

## ✨ Best Practices

1. **Regular Commits**: Commit perubahan secara berkala dengan pesan yang jelas
2. **Version Control**: Gunakan tag untuk versi penting
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

3. **Documentation**: Update README.md setiap ada fitur baru

4. **Testing**: Test di berbagai browser sebelum push

5. **Backup**: Jaga backup local repository

## 📞 Resources & Support

- GitHub Pages Docs: https://pages.github.com/
- GitHub Help: https://docs.github.com/
- HTML5 Canvas: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

---

**Happy Deploying!** 🎉
