const adminWhatsApp = "6282361642705";
const initialProductCount = 6;

const brandLogos = [
  { name: "Universitas Negeri Medan", image: "assets/brandlogo/unimed.jpg" },
  { name: "SMAN 2 Tanjung", image: "assets/brandlogo/sman2tanjung.jpg" }
];

const testimonials = [
  {
    name: "Cak Susilo",
    role: "Master Coach Sekjen IPF Pusat",
    quote: "Special thanks untuk Hart Pickleball karena dari Sabang hingga Merauke bisa bermain pickleball.",
    photo: "assets/testimonials/cak-susilo.jpg",
    rating: 5
  },
  {
    name: "Dicky",
    role: "Pickleball Antusias, MPC Semarang",
    quote: "Overall secara keseluruhan lebih enak. Buat kontrol dan tenaga lebih oke, mukul nggak perlu banyak tenaga. Buat ding di depan net pun juga lebih oke.",
    photo: "assets/testimonials/dicky.jpg",
    rating: 5
  },
  {
    name: "Eli Susanti",
    role: "Pickleball Antusias, MPC Semarang",
    quote: "Baru coba keluaran terbaru, ternyata enak dipake. Lebih mantul.",
    photo: "assets/testimonials/eli-susanti.jpg",
    rating: 5
  },
  {
    name: "Helmi",
    role: "Pickleball Antusias",
    quote: "Saya menggunakan Hart Flash. Gripnya cukup panjang dan sangat pas, cocok buat saya mantan petenis. Power dan kontrolnya sangat cocok.",
    photo: "assets/testimonials/helmi.jpg",
    rating: 5
  },
  {
    name: "Ibu Evy",
    role: "Pickleball Antusias, MPC Semarang",
    quote: "Aku suka pakai ini, sangat nyaman digunakan dan lebih tertata. Bolanya melenting, tidak usah pakai power.",
    photo: "assets/testimonials/ibu-evy.png",
    rating: 5
  },
  {
    name: "Sapto Wibowo",
    role: "Dosen Prodi PJKR FIKK Unesa",
    quote: "Nyaman dipakai, kualitasnya oke, jos.",
    photo: "assets/testimonials/sapto-wibowo.jpg",
    rating: 5
  }
];

const communitySlides = [
  { image: "assets/community/courtservices-01.png", alt: "Tim layanan lapangan Andil Sport" },
  { image: "assets/community/courtservices-02.png", alt: "Wasit dan pelatih pickleball Andil Sport" },
  { image: "assets/community/courtservices-03.png", alt: "Komunitas layanan pickleball Andil Sport" }
];

const products = [
  {
    name: "Hart Club Pickleball",
    category: "paddle",
    price: "Rp 1.000.000",
    description: "Paddle Hart untuk pemain yang mulai rutin latihan dan butuh feel stabil.",
    image: "assets/products/hart-club-pickleball.jpg",
    badge: "Club"
  },
  {
    name: "Hart Tournament Pickle Ball (Injection Moulding)",
    category: "bola",
    price: "Rp 160.000",
    description: "Bola pickleball Hart untuk kebutuhan latihan, pertandingan, dan komunitas.",
    image: "assets/products/hart-tournament-pickle-ball-injection-moulding.jpg",
    badge: "Tournament"
  },
  {
    name: "Pickleball Paddle Hart Apache XT7",
    category: "paddle",
    price: "Rp 500.000",
    description: "Paddle entry-level untuk pemain baru yang ingin gear ringan dan mudah dikontrol.",
    image: "assets/products/pickleball-paddle-hart-apache-xt7.jpg",
    badge: "Starter"
  },
  {
    name: "Pickleball Paddle Hart Attacker S7",
    category: "paddle",
    price: "Rp 850.000",
    description: "Paddle untuk pemain yang mencari kombinasi power dan respons cepat.",
    image: "assets/products/pickleball-paddle-hart-attacker-s7.jpg",
    badge: "Power"
  },
  {
    name: "Pickleball Paddle Hart Drax D7",
    category: "paddle",
    price: "Rp 2.200.000",
    description: "Paddle premium untuk performa kompetitif dengan kontrol bola lebih presisi.",
    image: "assets/products/pickleball-paddle-hart-drax-d7.jpg",
    badge: "Premium"
  },
  {
    name: "Pickleball Paddle Hart Infinity 700",
    category: "paddle",
    price: "Rp 3.250.000",
    description: "Paddle high-end untuk pemain yang butuh stabilitas dan touch saat rally.",
    image: "assets/products/pickleball-paddle-hart-infinity-700.jpg",
    badge: "High-end"
  },
  {
    name: "Pickleball Paddle Hart Optimus RX IV",
    category: "paddle",
    price: "Rp 1.500.000",
    description: "Paddle serbaguna untuk kontrol, power, dan transisi permainan cepat.",
    image: "assets/products/pickleball-paddle-hart-optimus-rx-iv.jpg",
    badge: "All round"
  },
  {
    name: "Pickleball Paddle Hart X-Boost 117",
    category: "paddle",
    price: "Rp 2.750.000",
    description: "Paddle performa tinggi untuk pemain yang ingin pukulan agresif dan solid.",
    image: "assets/products/pickleball-paddle-hart-x-boost-117.jpg",
    badge: "Pro"
  }
];

let activeFilter = "all";
let expanded = false;
let testimonialScrollTimer;

const productGrid = document.getElementById("productGrid");
const viewMoreBtn = document.getElementById("viewMoreBtn");
const filterButtons = document.querySelectorAll(".filter-btn");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const scrollTopBtn = document.getElementById("scrollTop");
const orderForm = document.getElementById("orderForm");
const brandLogoTrack = document.getElementById("brandLogoTrack");
const testimonialTrack = document.getElementById("testimonialTrack");
const testimonialDots = document.getElementById("testimonialDots");
const testimonialPrev = document.getElementById("testimonialPrev");
const testimonialNext = document.getElementById("testimonialNext");
const serviceSlideTrack = document.getElementById("serviceSlideTrack");
const serviceWaBtn = document.getElementById("serviceWaBtn");

const categoryLabel = {
  paddle: "Paddle",
  bola: "Bola",
  aksesoris: "Aksesoris"
};

function renderBrandLogos() {
  const repeatCount = Math.max(8, Math.ceil(16 / brandLogos.length));
  const logoSet = Array.from({ length: repeatCount }, () => brandLogos).flat().map((logo) => `
    <figure class="brand-logo-item">
      <img src="${logo.image}" alt="${logo.name}" loading="lazy">
    </figure>
  `).join("");

  brandLogoTrack.innerHTML = `
    <div class="logo-set">${logoSet}</div>
    <div class="logo-set" aria-hidden="true">${logoSet}</div>
  `;
}

function visibleProducts() {
  const filtered = activeFilter === "all"
    ? products
    : products.filter((product) => product.category === activeFilter);

  return expanded ? filtered : filtered.slice(0, initialProductCount);
}

function renderProducts() {
  productGrid.innerHTML = visibleProducts().map((product, index) => `
    <article class="product-card reveal" style="--reveal-delay: ${Math.min(index * 45, 240)}ms">
      <div class="product-media">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="badge">${product.badge}</span>
      </div>
      <div class="product-body">
        <span class="product-category">${categoryLabel[product.category]}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-foot">
          <span class="price">${product.price}</span>
          <button class="icon-btn" type="button" data-product="${product.name}" aria-label="Pesan ${product.name}">
            <i class="ph ph-shopping-cart-simple"></i>
          </button>
        </div>
      </div>
    </article>
  `).join("");

  const totalFiltered = activeFilter === "all"
    ? products.length
    : products.filter((product) => product.category === activeFilter).length;

  viewMoreBtn.hidden = totalFiltered <= initialProductCount;
  viewMoreBtn.textContent = expanded ? "Tampilkan lebih sedikit" : "Lihat produk lainnya";
  wireProductButtons();
  observeReveals();
}

function wireProductButtons() {
  document.querySelectorAll("[data-product]").forEach((button) => {
    button.addEventListener("click", () => {
      const productName = button.dataset.product;
      const text = `Halo Andil Sport, saya ingin tanya stok dan harga untuk ${productName}.`;
      window.open(`https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(text)}`, "_blank");
    });
  });
}

function renderTestimonials() {
  const loopedTestimonials = [testimonials[testimonials.length - 1], ...testimonials, testimonials[0]];

  testimonialTrack.innerHTML = loopedTestimonials.map((item, index) => {
    const realIndex = (index - 1 + testimonials.length) % testimonials.length;

    return `
    <article class="testimonial-card" data-slide="${index}" data-real-index="${realIndex}">
      <div class="testimonial-photo">
        <img src="${item.photo}" alt="Foto ${item.name}" loading="lazy">
      </div>
      <div class="testimonial-content">
        <div class="stars" aria-label="${item.rating} bintang">${"★".repeat(item.rating)}</div>
        <p>"${item.quote}"</p>
        <div>
          <strong>${item.name}</strong>
          <span>${item.role}</span>
        </div>
      </div>
    </article>
  `;
  }).join("");

  testimonialDots.innerHTML = testimonials.map((item, index) => `
    <button class="slider-dot${index === 0 ? " active" : ""}" type="button" data-dot="${index}" aria-label="Lihat testimoni ${item.name}"></button>
  `).join("");

  testimonialDots.querySelectorAll("[data-dot]").forEach((button) => {
    button.addEventListener("click", () => scrollToTestimonial(Number(button.dataset.dot)));
  });

  window.requestAnimationFrame(() => {
    scrollToVisualTestimonial(1, "auto");
    updateTestimonialDots();
  });
}

function scrollToTestimonial(index) {
  scrollToVisualTestimonial(index + 1, "smooth");
}

function scrollToVisualTestimonial(index, behavior = "smooth") {
  const slide = testimonialTrack.querySelector(`[data-slide="${index}"]`);
  if (!slide) return;
  const centeredLeft = slide.offsetLeft - ((testimonialTrack.clientWidth - slide.clientWidth) / 2);
  testimonialTrack.scrollTo({ left: centeredLeft, behavior });
}

function getClosestTestimonial() {
  const slides = [...testimonialTrack.querySelectorAll("[data-slide]")];
  if (!slides.length) return null;

  const trackCenter = testimonialTrack.scrollLeft + (testimonialTrack.clientWidth / 2);
  const activeVisualIndex = slides.reduce((closestIndex, slide, index) => {
    const currentDistance = Math.abs(slide.offsetLeft + (slide.clientWidth / 2) - trackCenter);
    const closestDistance = Math.abs(slides[closestIndex].offsetLeft + (slides[closestIndex].clientWidth / 2) - trackCenter);
    return currentDistance < closestDistance ? index : closestIndex;
  }, 0);

  return { slides, slide: slides[activeVisualIndex], visualIndex: activeVisualIndex };
}

function updateTestimonialDots() {
  const closest = getClosestTestimonial();
  if (!closest) return;

  const activeIndex = Number(closest.slide.dataset.realIndex);

  testimonialDots.querySelectorAll(".slider-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex);
  });

  closest.slides.forEach((slide) => {
    slide.classList.toggle("is-active", slide === closest.slide);
  });
}

function normalizeTestimonialLoop() {
  const closest = getClosestTestimonial();
  if (!closest) return;

  if (closest.visualIndex === 0) {
    scrollToVisualTestimonial(testimonials.length, "auto");
  }

  if (closest.visualIndex === testimonials.length + 1) {
    scrollToVisualTestimonial(1, "auto");
  }

  updateTestimonialDots();
}

function moveTestimonial(direction) {
  const closest = getClosestTestimonial();
  if (!closest) return;
  scrollToVisualTestimonial(closest.visualIndex + direction);
}

function renderServiceSlides() {
  serviceSlideTrack.innerHTML = communitySlides.map((slide) => `
    <figure class="service-slide">
      <img src="${slide.image}" alt="${slide.alt}" loading="lazy">
    </figure>
  `).join("");

  const serviceMessage = "Halo Andil Sport, saya ingin informasi layanan wasit profesional bersertifikasi dan pelatih pickleball berpengalaman. Mohon detail paket, jadwal, dan biaya.";
  serviceWaBtn.href = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(serviceMessage)}`;
}

function startServiceSlider() {
  const totalSlides = communitySlides.length;
  let currentSlide = 0;

  if (totalSlides <= 1 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  window.setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    serviceSlideTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  }, 5000);
}

function observeReveals() {
  const revealItems = document.querySelectorAll(".reveal:not(.is-visible)");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, entryObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        entryObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16, rootMargin: "0px 0px -40px 0px" });

  revealItems.forEach((item, index) => {
    if (!item.style.getPropertyValue("--reveal-delay")) {
      item.style.setProperty("--reveal-delay", `${Math.min(index * 35, 210)}ms`);
    }
    observer.observe(item);
  });
}

function closeMobileNav() {
  navLinks.classList.remove("open");
  document.body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.innerHTML = '<i class="ph ph-list"></i>';
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    expanded = false;
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProducts();
  });
});

viewMoreBtn.addEventListener("click", () => {
  expanded = !expanded;
  renderProducts();
});

testimonialPrev.addEventListener("click", () => moveTestimonial(-1));
testimonialNext.addEventListener("click", () => moveTestimonial(1));
testimonialTrack.addEventListener("scroll", () => {
  window.requestAnimationFrame(updateTestimonialDots);
  window.clearTimeout(testimonialScrollTimer);
  testimonialScrollTimer = window.setTimeout(normalizeTestimonialLoop, 140);
}, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.innerHTML = isOpen ? '<i class="ph ph-x"></i>' : '<i class="ph ph-list"></i>';
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

window.addEventListener("scroll", () => {
  scrollTopBtn.classList.toggle("show", window.scrollY > 520);
}, { passive: true });

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(orderForm);
  const name = formData.get("name").trim();
  const phone = formData.get("phone").trim();
  const interest = formData.get("interest");
  const message = formData.get("message").trim();

  const text = [
    "Halo Andil Sport,",
    "",
    `Nama: ${name}`,
    `WhatsApp: ${phone}`,
    `Minat produk: ${interest}`,
    "",
    `Detail pesanan: ${message}`,
    "",
    "Mohon info stok dan langkah pemesanan. Terima kasih."
  ].join("\n");

  window.open(`https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(text)}`, "_blank");
  showToast("Membuka WhatsApp admin...");
  orderForm.reset();
});

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="ph-fill ph-check-circle"></i><span>${message}</span>`;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2600);
}

document.getElementById("year").textContent = new Date().getFullYear();
renderBrandLogos();
renderTestimonials();
renderServiceSlides();
renderProducts();
observeReveals();
startServiceSlider();
