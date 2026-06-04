const adminWhatsApp = "6282361642705";
const initialProductCount = 6;

const products = [
  {
    name: "Hart Pro Series Paddle",
    category: "paddle",
    price: "Rp 1.250.000",
    description: "Paddle premium untuk kontrol, power, dan feel stabil saat rally panjang.",
    image: "https://placehold.co/720x540/f5f9ee/172415?text=Hart+Pro+Paddle",
    badge: "Best seller"
  },
  {
    name: "Hart Lite Series Paddle",
    category: "paddle",
    price: "Rp 850.000",
    description: "Bobot ringan untuk pemain pemula sampai menengah yang butuh gerak cepat.",
    image: "https://placehold.co/720x540/f5f9ee/172415?text=Hart+Lite+Paddle",
    badge: "Ringan"
  },
  {
    name: "Hart Control Paddle",
    category: "paddle",
    price: "Rp 990.000",
    description: "Pilihan seimbang untuk drop shot, reset, dan permainan net.",
    image: "https://placehold.co/720x540/f5f9ee/172415?text=Hart+Control",
    badge: "Kontrol"
  },
  {
    name: "Hart Outdoor Balls Isi 3",
    category: "bola",
    price: "Rp 150.000",
    description: "Bola outdoor dengan pantulan konsisten untuk lapangan terbuka.",
    image: "https://placehold.co/720x540/f5f9ee/172415?text=Outdoor+Balls",
    badge: "Outdoor"
  },
  {
    name: "Hart Indoor Balls Isi 3",
    category: "bola",
    price: "Rp 150.000",
    description: "Bola indoor untuk kontrol lebih halus di permukaan lapangan tertutup.",
    image: "https://placehold.co/720x540/f5f9ee/172415?text=Indoor+Balls",
    badge: "Indoor"
  },
  {
    name: "Hart Training Balls Pack",
    category: "bola",
    price: "Rp 275.000",
    description: "Paket bola latihan untuk klub, kelas, dan sesi drilling rutin.",
    image: "https://placehold.co/720x540/f5f9ee/172415?text=Training+Balls",
    badge: "Paket"
  },
  {
    name: "Hart Pro Overgrip Isi 3",
    category: "aksesoris",
    price: "Rp 75.000",
    description: "Grip tambahan yang menyerap keringat dan menjaga pegangan tetap mantap.",
    image: "https://placehold.co/720x540/f5f9ee/172415?text=Overgrip",
    badge: "Aksesori"
  },
  {
    name: "Hart Sling Bag",
    category: "aksesoris",
    price: "Rp 350.000",
    description: "Tas ringkas untuk membawa paddle, bola, botol, dan barang kecil.",
    image: "https://placehold.co/720x540/f5f9ee/172415?text=Sling+Bag",
    badge: "Tas"
  },
  {
    name: "Hart Court Towel",
    category: "aksesoris",
    price: "Rp 95.000",
    description: "Handuk lapangan untuk latihan intens dan match day.",
    image: "https://placehold.co/720x540/f5f9ee/172415?text=Court+Towel",
    badge: "Latihan"
  }
];

let activeFilter = "all";
let expanded = false;

const productGrid = document.getElementById("productGrid");
const viewMoreBtn = document.getElementById("viewMoreBtn");
const filterButtons = document.querySelectorAll(".filter-btn");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const scrollTopBtn = document.getElementById("scrollTop");
const orderForm = document.getElementById("orderForm");

const categoryLabel = {
  paddle: "Paddle",
  bola: "Bola",
  aksesoris: "Aksesoris"
};

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
renderProducts();
observeReveals();
