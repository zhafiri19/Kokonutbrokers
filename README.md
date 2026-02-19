# 🥥 Kokonut Insurance Brokers Website

Website Company Profile untuk Kokonut Insurance Brokers - The Next Level of Insurance Brokers

## 📋 Deskripsi

Website modern dan profesional untuk perusahaan pialang asuransi dengan fitur-fitur lengkap:
- Desain corporate yang elegan dan terpercaya
- Animasi interaktif yang smooth
- Responsive design untuk semua device
- Single Page Application (SPA) dengan routing
- Form kontak dengan validasi
- FAQ accordion
- Counter animation
- Hover effects dan micro-interactions

## 🛠️ Teknologi

- **HTML5** - Semantic markup
- **TailwindCSS** - Utility-first CSS framework
- **JavaScript Vanilla** - ES6+ features
- **Font Awesome** - Icons
- **Google Fonts** - Inter font family

## 📁 Struktur Proyek

```
kokonut/
├── index.html                 # Halaman utama
├── src/
│   ├── components/
│   │   ├── Navbar.html        # Komponen navigasi
│   │   └── Footer.html        # Komponen footer
│   ├── pages/
│   │   ├── home.html          # Halaman beranda
│   │   ├── tentang.html       # Halaman tentang kami
│   │   ├── produk.html        # Halaman produk
│   │   ├── corporate.html     # Halaman corporate trust
│   │   └── kontak.html        # Halaman kontak
│   └── assets/
│       ├── css/
│       │   └── style.css      # Custom styles
│       ├── js/
│       │   ├── main.js        # Main functionality
│       │   └── router.js      # SPA router
│       └── images/            # Asset images
└── README.md                  # Dokumentasi
```

## 🎨 Fitur Desain

### Warna Utama
- **Primary**: Emerald Green (bg-emerald-700/800)
- **Secondary**: White
- **Accent**: Gold soft / Light green
- **Background**: Gradient white to soft green

### Komponen
- **Navbar**: Sticky dengan scroll active highlight
- **Hero Section**: Headline besar dengan CTA buttons
- **Cards**: Rounded-xl dengan shadow lembut
- **Accordions**: Smooth expand/collapse animation
- **Counters**: Animated number counting
- **Forms**: Validasi real-time dengan error handling

### Animasi
- **Fade-in**: Scroll reveal animation
- **Slide-up**: Bottom to top animation
- **Hover effects**: Card lift dan shadow enhancement
- **Smooth scroll**: Navigation scrolling
- **Parallax**: Light parallax effect
- **Logo effects**: Grayscale to color on hover

## 📱 Halaman

### 1. Home (#home)
- Hero section dengan headline "Kokonut Insurance Brokers"
- Trust badges (OJK, Kemenkumham, APPARINDO, APARI)
- About highlight dengan 4 keunggulan
- Education section tentang pentingnya broker resmi
- Statistics dengan animated counters
- Testimonial cards
- CTA section

### 2. Tentang Kami (#tentang)
- Company history
- Visi dengan 5 pilar
- Misi dengan 4 fokus
- Team profiles dengan hover effects
- Awards timeline
- Penghargaan prestise

### 3. Produk (#produk)
- Grid layout untuk 6 kategori produk:
  - Asuransi Alat Berat
  - Asuransi Jaminan Proyek
  - Asuransi Kendaraan
  - Asuransi Kredit
  - Bank Garansi
  - Asuransi Kesehatan
- Accordion untuk detail produk
- FAQ section

### 4. Corporate Trust (#corporate)
- Awards & achievements
- Client logos grid
- Insurance partners
- Statistics credibility
- Partner testimonials
- Partnership CTA

### 5. Kontak (#kontak)
- Contact form dengan validasi
- Contact information cards
- Google Maps integration
- Quick contact buttons
- Social media links
- FAQ section

## 🚀 Cara Menjalankan

1. **Clone atau download repository**
2. **Buka file index.html di browser**
   - Double click file `index.html`
   - Atau gunakan live server di VS Code
3. **Atau gunakan web server lokal**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (jika ada http-server)
   npx http-server
   ```

## 📱 Responsive Design

Website ini fully responsive:
- **Desktop**: 1024px+ - Full layout dengan grid
- **Tablet**: 768px-1023px - Adapted grid layout
- **Mobile**: <768px - Single column dengan hamburger menu

## ⚡ Performance Features

- **Lazy loading** untuk images
- **Debounced scroll events**
- **Intersection Observer** untuk scroll animations
- **Optimized animations** dengan CSS transforms
- **Minimal JavaScript** bundle size

## 🎯 Konversi & UX

### Trust Building
- Logo OJK dan sertifikasi
- Penghargaan dan prestasi
- Statistik dan social proof
- Testimoni klien

### CTA Strategy
- Multiple CTA buttons per section
- Sticky WhatsApp button
- Clear value propositions
- Easy contact options

### Micro Interactions
- Hover states pada semua interactive elements
- Smooth transitions
- Loading states
- Success/error feedback

## 🔧 Customization

### Mengubah Warna
Edit file `src/assets/css/style.css`:
```css
:root {
    --primary-color: #10b981;
    --secondary-color: #ffffff;
    --accent-color: #fbbf24;
}
```

### Mengubah Font
Edit `index.html` di bagian Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

### Menambah Halaman Baru
1. Buat file HTML baru di `src/pages/`
2. Tambahkan route di `src/assets/js/router.js`
3. Tambahkan link di `src/components/Navbar.html`

## 📝 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 📞 Contact

- **Email**: info@kokonutinsurance.com
- **Phone**: +62 21 1234 5678
- **WhatsApp**: +62 812 3456 7890

---

🥥 **Kokonut Insurance Brokers** - The Next Level of Insurance Brokers
