# ID Card Panitia Generator

Sistem otomatis pembuatan kartu tanda pengenal panitia berbasis web statis. Aplikasi ini dirancang untuk mempercepat proses pembuatan ID card panitia dengan memanfaatkan teknologi HTML5 Canvas dan dapat diakses secara online melalui GitHub Pages.

## 📋 Fitur Utama

- **Input Data Dinamis**: Pengisian nama lengkap (max 40 karakter) dan pilihan divisi kepanitiaan
- **Upload Foto**: Dukungan format PNG, JPG, dan JPEG dengan validasi otomatis
- **Canvas Rendering**: Proses rendering gambar instan menggunakan HTML5 Canvas Context 2D
- **Auto-Cropping**: Pemotongan gambar otomatis dengan algoritma center-crop untuk menjaga proporsi wajah
- **Live Preview**: Pratinjau real-time hasil ID card sebelum diunduh
- **Download PNG**: Ekspor hasil rendering dalam format PNG berkualitas tinggi
- **Responsif**: Desain yang fully responsive untuk desktop dan mobile
- **Zero-Server**: Privasi terjamin - semua data diproses di browser pengguna, tidak ada upload ke server
- **Offline Ready**: Dapat diakses tanpa koneksi internet setelah halaman dimuat

## 🎯 Target Pengguna

1. **Divisi Desain / Pengurus Inti**: Mengelola konsep visual dan master template ID Card
2. **Anggota Panitia Event**: Mahasiswa yang membutuhkan ID card dengan interface yang intuitif

## 🛠️ Teknologi & Stack

- **HTML5**: Struktur markup semantik
- **CSS3**: Responsive design dengan Flexbox & Grid
- **JavaScript (ES6+)**: Canvas API, FileReader API, Blob API
- **No Dependencies**: Aplikasi pure vanilla tanpa framework eksternal
- **Deployment**: GitHub Pages (Static Hosting)

## 📦 Struktur Proyek

```
Id_card/
├── index.html          # File HTML utama
├── styles.css          # Stylesheet responsif
├── script.js           # Logic JavaScript & Canvas rendering
├── README.md           # Dokumentasi ini
├── .gitignore          # Git configuration
└── assets/             # (Optional) Folder untuk aset tambahan
    └── template.png    # Master template ID card (opsional)
```

## 🚀 Cara Menggunakan

### 1. Lokal (Development)

```bash
# Clone atau download repository
git clone https://github.com/username/id-card-generator.git
cd id-card-generator

# Buka dengan live server (recommended)
# Atau buka index.html langsung di browser
```

### 2. GitHub Pages (Production)

```bash
# 1. Push ke repository GitHub dengan nama 'id-card-generator'
git add .
git commit -m "Initial commit: ID Card Generator"
git push origin main

# 2. Settings > Pages > Source > Deploy from a branch (main)
# 3. Akses di: https://username.github.io/id-card-generator/
```

## 📝 Panduan Penggunaan

1. **Isi Nama Lengkap**: Masukkan nama panitia (maksimal 40 karakter)
2. **Pilih Divisi**: Pilih divisi kepanitiaan dari dropdown (BPH, Acara, Humas, dll)
3. **Upload Foto**: Klik area upload atau drag-drop foto pas (PNG/JPG)
4. **Pratinjau**: Klik "Buat ID Card" untuk melihat pratinjau
5. **Download**: Klik "Unduh ID Card (PNG)" untuk download file hasil

## ⚙️ Konfigurasi Teknis

Edit file `script.js` bagian `CONFIG` untuk mengatur:

```javascript
const CONFIG = {
    CANVAS_WIDTH: 1024,              // Lebar canvas (px)
    CANVAS_HEIGHT: 640,              // Tinggi canvas (px)
    PHOTO_BOX_WIDTH: 200,            // Lebar kotak foto (px)
    PHOTO_BOX_HEIGHT: 240,           // Tinggi kotak foto (px)
    PHOTO_BOX_X: 80,                 // Posisi X foto (px)
    PHOTO_BOX_Y: 140,                // Posisi Y foto (px)
    NAME_POSITION_X: 350,            // Posisi X nama (px)
    NAME_POSITION_Y: 240,            // Posisi Y nama (px)
    DIVISION_POSITION_X: 350,        // Posisi X divisi (px)
    DIVISION_POSITION_Y: 320,        // Posisi Y divisi (px)
    NAME_FONT_SIZE: 48,              // Ukuran font nama (px)
    DIVISION_FONT_SIZE: 36,          // Ukuran font divisi (px)
};
```

Sesuaikan nilai-nilai ini berdasarkan master template ID card Anda.

## 🎨 Menggunakan Master Template Kustom

Untuk menggunakan desain ID card kustom:

1. Buat gambar template ID card dengan tools design (Photoshop, GIMP, Canva, dll)
2. Tentukan koordinat yang tepat untuk penempatan foto dan teks
3. Update nilai `CONFIG` di `script.js` sesuai koordinat template
4. Modifikasi fungsi `drawMasterTemplate()` untuk menggambar template custom

Contoh menggunakan gambar external:

```javascript
function drawMasterTemplate(ctx) {
    const templateImg = new Image();
    templateImg.src = 'assets/template.png';
    templateImg.onload = () => {
        ctx.drawImage(templateImg, 0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    };
}
```

## ✅ Testing & QA

Sesuai dengan PRD, testing yang telah dilakukan:

- **TC-01**: Validasi input kosong ✓
  - Memasukkan nama kosong + klik Generate → Sistem menolak dengan notifikasi
  
- **TC-02**: Validasi format file gambar ✓
  - Upload file selain gambar (.pdf, .docx) → Sistem menolak otomatis
  
- **TC-03**: Uji unduh hasil cetak ✓
  - Klik download → File PNG terupload dengan nama panitia & foto presisi

## 📊 Performance Metrics

- **Rendering Time**: < 2.0 detik (sesuai PR requirement)
- **Total Asset Size**: < 2 MB (HTML + CSS + JS)
- **Canvas Resolution**: 1024x640px
- **Export Format**: PNG 24-bit (lossless)

## 🌐 Browser Compatibility

| Browser | Support | Version |
|---------|---------|---------|
| Chrome | ✅ | Latest |
| Firefox | ✅ | Latest |
| Safari | ✅ | Latest |
| Edge | ✅ | Latest |
| Opera | ✅ | Latest |
| IE 11 | ❌ | Not supported |

## 🔒 Security & Privacy

- ✅ **Zero-Server Storage**: Tidak ada pengiriman data ke server
- ✅ **Client-Side Only**: Semua proses dijalankan di browser pengguna
- ✅ **No Cookies/Tracking**: Tidak ada penyimpanan cookie atau tracking
- ✅ **HTTPS Ready**: Aman untuk deployment di GitHub Pages (HTTPS by default)

## 🐛 Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Foto tidak tampil | Cek format (PNG/JPG), ukuran < 5MB |
| Teks terpotong | Adjust `NAME_FONT_SIZE` & `DIVISION_FONT_SIZE` di CONFIG |
| Canvas blank | Refresh browser, clear cache |
| Download gagal | Gunakan browser yang support Blob API (semua modern browser) |

## 📄 Lisensi

Aplikasi ini dibuat untuk keperluan organisasi intra kampus. Bebas digunakan dan dimodifikasi sesuai kebutuhan.

## 👨‍💻 Maintenance & Update

### Untuk menambah divisi baru:

Edit `index.html` di bagian `<select id="division">`:

```html
<option value="Divisi Baru">Divisi Baru</option>
```

### Untuk mengubah warna template:

Edit `script.js` fungsi `drawMasterTemplate()`:

```javascript
ctx.fillStyle = '#2563eb'; // Ubah warna sesuai kebutuhan
```

## 📞 Support & Contact

Untuk pertanyaan, saran, atau bug report, silakan buat issue di repository GitHub.

---

**Dibuat**: 2 Juni 2026  
**Versi**: 1.0.0  
**Status**: Production Ready ✅
