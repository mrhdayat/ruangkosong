<p align="center">
  <strong>MUSEUM RUANG KOSONG</strong><br/>
  <em>Keheningan yang Berbicara</em>
</p>

<p align="center">
  Website museum seni kontemporer dengan desain ultra-minimalis yang percaya bahwa ruang kosong adalah elemen seni paling kuat.
</p>

---

## ✦ Tentang Proyek

**Museum Ruang Kosong** adalah website museum seni kontemporer yang dirancang untuk menciptakan pengalaman digital kontemplatif dan imersif. Setiap aspek — dari tipografi monumental hingga ruang kosong yang ekstrem — dirancang untuk mereplikasi perasaan berjalan masuk ke dalam galeri putih yang sunyi.

### Filosofi Desain

- **Negative space** sebagai elemen visual utama
- Palet warna **monokromatik** — hanya `#F8F8F8` (putih galeri) dan `#2B2B2B` (hitam arang)
- **Tidak ada warna aksen** — warna hanya berasal dari karya seni itu sendiri
- Tipografi **monumental** (hingga 12vw) untuk menciptakan dampak visual
- Animasi **halus dan disengaja** — tidak ada bounce atau elastic, hanya ease-out yang tenang

---

## ✦ Halaman

| Rute | Halaman | Deskripsi |
|------|---------|-----------|
| `/` | Beranda | Landing page dengan preloader sinematik, hero monumental, dan galeri karya seni full-viewport |
| `/pameran` | Pameran | Grid asimetris seluruh koleksi karya seni dengan animasi scroll |
| `/tentang` | Tentang | Filosofi, visi, statistik museum, dan kutipan pendiri |
| `/kontak` | Kontak | Formulir kontak, alamat, jam operasional, dan media sosial |

---

## ✦ Fitur Utama

### 🎬 Loading Screen Sinematik
- Counter animasi `000 → 100`
- Huruf judul muncul dengan rotasi 3D dari tengah
- Subtitle muncul dengan efek blur-in
- Layar terbelah dua (split-curtain wipe) untuk reveal konten

### 🧭 Floating Navigation
- Navigasi berbentuk pill dengan efek glass-morphism (backdrop blur)
- Selalu terlihat di tengah atas layar
- Indikator halaman aktif dengan underline animasi
- 4 link berfungsi penuh: Beranda, Pameran, Tentang, Kontak

### 🎨 Animasi Premium (GSAP)
| Elemen | Teknik Animasi |
|--------|---------------|
| Judul halaman | 3D mask-reveal per karakter (`rotateX -80°`) |
| Gambar karya seni | `clip-path: inset()` reveal + scale 1.3→1.0 |
| Hover gambar | Efek magnetik mengikuti posisi cursor |
| Blok teks | Blur-in: `filter: blur(8px)` → `blur(0px)` |
| Statistik | Counter animasi (0 → nilai target) |
| Kutipan | Word-by-word stagger reveal |
| Hero | Parallax scroll pada judul, subtitle, dan watermark tahun |
| Link | Underline tumbuh dari kiri ke kanan (0.6 detik) |
| Tombol | Garis horizontal expand on hover |

### 🖱️ Custom Cursor
- Lingkaran transparan dengan `mix-blend-mode: difference`
- Mengikuti mouse dengan interpolasi lerp (smooth delay)
- Membesar saat hover pada elemen interaktif
- Otomatis tersembunyi di perangkat sentuh

### 🔊 Audio Ambient
- Toggle suara ruangan galeri yang sunyi
- Menggunakan Web Audio API dengan low-pass filter
- Fade-in/fade-out transisi yang halus

### ♿ Aksesibilitas
- Navigasi keyboard penuh (Arrow keys, Tab, Escape)
- `prefers-reduced-motion` dihormati — semua animasi dimatikan
- Atribut ARIA pada semua elemen interaktif
- Focus ring visible pada keyboard navigation
- Cursor default pada perangkat sentuh

---

## ✦ Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Bahasa** | TypeScript |
| **Styling** | CSS Modules + Custom Properties |
| **Smooth Scroll** | Lenis (`@studio-freight/lenis`) |
| **Animasi** | GSAP + ScrollTrigger |
| **Font** | Space Grotesk (display, weight 300) + Cormorant Garamond (body, weight 400) |
| **Gambar** | Next.js Image component (optimized) |
| **Audio** | Web Audio API (native) |

> **Catatan:** Proyek ini **tidak** menggunakan Tailwind CSS, Bootstrap, atau framework UI lainnya. Semua styling ditulis secara custom menggunakan CSS Modules untuk menjaga kode tetap bersih dan sesuai dengan filosofi minimalis.

---

## ✦ Struktur Proyek

```
src/
├── app/
│   ├── layout.tsx              # Root layout + Google Fonts
│   ├── page.tsx                # Beranda (home page)
│   ├── globals.css             # Design tokens & global styles
│   ├── pameran/page.tsx        # Halaman Pameran
│   ├── tentang/page.tsx        # Halaman Tentang
│   └── kontak/page.tsx         # Halaman Kontak
├── components/
│   ├── providers/
│   │   └── SmoothScroll.tsx    # Lenis + GSAP integration
│   ├── navigation/
│   │   └── Navigation.tsx      # Floating pill navbar
│   ├── sections/
│   │   ├── HeroSection.tsx     # Landing hero (10vw–12vw title)
│   │   ├── ArtworkSection.tsx  # Full-viewport artwork display
│   │   └── AboutSection.tsx    # Filosofi + email form
│   ├── animations/
│   │   ├── TextReveal.tsx      # Char-by-char reveal
│   │   ├── ImageReveal.tsx     # Clip-path mask reveal
│   │   ├── FadeSection.tsx     # Fade-in wrapper
│   │   └── PageTransition.tsx  # Page entrance animation
│   └── ui/
│       ├── Preloader.tsx       # Cinematic loading screen
│       ├── CustomCursor.tsx    # Blend-mode difference cursor
│       ├── ScrollProgress.tsx  # Vertical progress bar
│       ├── ArtworkModal.tsx    # Detail modal (blur + scale)
│       ├── ArtworkNav.tsx      # Prev/next navigation
│       └── AmbientAudio.tsx    # Gallery sound toggle
├── data/
│   └── artworks.ts             # Koleksi karya seni
└── public/
    └── artworks/               # Placeholder artwork SVGs
```

---

## ✦ Cara Menjalankan

### Prasyarat
- Node.js 18+
- npm atau yarn

### Instalasi

```bash
# Clone repository
git clone https://github.com/mrhdayat/ruangkosong.git
cd ruangkosong

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build Production

```bash
npm run build
npm start
```

---

## ✦ Design Tokens

```css
/* Warna */
--color-gallery:   #F8F8F8   /* Background — putih galeri */
--color-charcoal:  #2B2B2B   /* Teks utama — hitam arang */
--color-mist:      #E8E8E8   /* Border halus */
--color-smoke:     #C0C0C0   /* Label sekunder */
--color-ash:       #8A8A8A   /* Teks meta */
--color-stone:     #5A5A5A   /* Body text */

/* Spacing Ekstrem */
--space-section:    20vh     /* Padding section standar */
--space-section-lg: 30vh     /* Padding section besar */

/* Timing Animasi */
--duration-slow:    1200ms   /* Transisi section */
--duration-reveal:  1500ms   /* Fade reveal */
--duration-image:   2000ms   /* Image clip-path reveal */
```

---

## ✦ Lisensi

Proyek ini dibuat untuk keperluan demonstrasi dan portofolio.

---

<p align="center">
  <em>Seni terbaik adalah yang memberikan ruang bagi penikmatnya untuk bernafas.</em>
</p>
