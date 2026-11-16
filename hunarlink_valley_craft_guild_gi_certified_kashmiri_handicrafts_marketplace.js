
/* ==========================================================================
   HunarLink — Valley Craft Guild (Team 16)
   100% Vanilla JavaScript Application Controller (No Frameworks, No Backend)
   State & Persistence via window.localStorage
   ========================================================================== */

const IMG_MAP = {
  jamawar: "assets/image_2.jpg",
  walnut: "assets/image_3.jpg",
  papier: "assets/image_4.jpg",
  ustad: "assets/image_1.jpg",
  silkrug: "assets/image_5.jpg",
  khudrang: "assets/image_6.jpg"
};

const SEED_PRODUCTS = [
  {
    id: "hl-pash-001",
    title: "Royal Khudrang Pashmina",
    guild: "pashmina",
    guildLabel: "Pashmina & Kani Guild",
    artisan: "Master Ghulam Qadir Mir",
    district: "Srinagar",
    price: 58500,
    mrp: 68000,
    rating: 4.9,
    reviewCount: 42,
    giId: "GI-JK-PASH-8821",
    giLevel: 3,
    purityMetric: "14.2 Micron Changthangi Fleece • 100% Hand-Spun",
    loomHours: 420,
    dimensions: "205 cm × 102 cm",
    stock: 4,
    image: IMG_MAP.khudrang,
    description: "Unbleached natural Khudrang Ladakhi Changthangi pashmina hand-woven on a traditional wooden loom in Srinagar and framed with a delicate floral Sozni hand-embroidered border."
  },
  {
    id: "hl-waln-002",
    title: "Chinar Shikara Jewel Chest",
    guild: "walnut",
    guildLabel: "Walnut Woodcarving",
    artisan: "Ustad Farooq Ahmad",
    district: "Anantnag",
    price: 34000,
    mrp: 41000,
    rating: 4.8,
    reviewCount: 29,
    giId: "GI-JK-WALN-4402",
    giLevel: 3,
    purityMetric: "Seasoned 300-Yr Kashmiri Walnut • Deep Undercut Relief",
    loomHours: 260,
    dimensions: "38 cm × 24 cm × 18 cm",
    stock: 3,
    image: IMG_MAP.walnut,
    description: "Heirloom bridal and jewelry chest hand-chiseled from naturally air-seasoned Kashmiri walnut wood featuring deep relief Chinar leaves and brass heritage clasp."
  },
  {
    id: "hl-papr-003",
    title: "Shahi Gulab-dan Urn",
    guild: "papier-mache",
    guildLabel: "Papier-Mâché Art",
    artisan: "Master Ali Mohammad",
    district: "Srinagar",
    price: 14800,
    mrp: 18500,
    rating: 4.9,
    reviewCount: 54,
    giId: "GI-JK-PAPR-3109",
    giLevel: 2,
    purityMetric: "Hand-Pounded Sakhta Pulp • 24K Gold Leaf Naqash",
    loomHours: 140,
    dimensions: "32 cm Height × 19 cm Dia",
    stock: 6,
    image: IMG_MAP.papier,
    description: "Museum-grade Kashmiri papier-mâché royal urn painted freehand with squirrel-hair Kalam brushes using natural mineral pigments and genuine gold leaf."
  },
  {
    id: "hl-kani-004",
    title: "Dar-i-Kani Jamawar Stole",
    guild: "sozni",
    guildLabel: "Kani Jamawar & Sozni",
    artisan: "Master Ghulam Qadir Mir",
    district: "Budgam",
    price: 92000,
    mrp: 112000,
    rating: 5.0,
    reviewCount: 31,
    giId: "GI-JK-KANI-9904",
    giLevel: 3,
    purityMetric: "13.9 Micron Fleece • 180 Wooden Tujis Bobbins",
    loomHours: 1820,
    dimensions: "210 cm × 105 cm",
    stock: 2,
    image: IMG_MAP.jamawar,
    description: "Woven over 1,800 hours using coded Talim notation and smooth wooden Tujis bobbins, this full-field Jamawar Kani stole carries a laser-etched GI authenticity seal."
  },
  {
    id: "hl-pash-005",
    title: "Jamawar Heirloom Stole",
    guild: "pashmina",
    guildLabel: "Pashmina & Kani Guild",
    artisan: "Master Ghulam Qadir Mir",
    district: "Srinagar",
    price: 76000,
    mrp: 89000,
    rating: 4.9,
    reviewCount: 37,
    giId: "GI-JK-PASH-8810",
    giLevel: 3,
    purityMetric: "14.5 Micron Changthangi • Natural Indigo & Madder Dyes",
    loomHours: 980,
    dimensions: "200 cm × 100 cm",
    stock: 3,
    image: IMG_MAP.jamawar,
    description: "Featured in the HunarLink Valley Showcase, this heirloom Kani-border wrap blends deep forest-emerald field work with traditional Badam (paisley) motifs."
  },
  {
    id: "hl-silk-006",
    title: "Silk-on-Silk Medallion Rug",
    guild: "silk-rugs",
    guildLabel: "Silk-on-Silk Rugs",
    artisan: "Ustad Abdul Rashid",
    district: "Budgam",
    price: 118000,
    mrp: 142000,
    rating: 4.9,
    reviewCount: 19,
    giId: "GI-JK-SILK-7712",
    giLevel: 3,
    purityMetric: "100% Mulberry Silk Warp & Weft • 625 Knots / Sq. Inch",
    loomHours: 2400,
    dimensions: "183 cm × 122 cm (6×4 ft)",
    stock: 2,
    image: IMG_MAP.silkrug,
    description: "Hand-knotted silk-on-silk Persian medallion carpet crafted according to traditional Kashmiri Talim script with luminous turquoise, emerald, and gold pile."
  },
  {
    id: "hl-waln-007",
    title: "Walnut Wood Lattice Screen",
    guild: "walnut",
    guildLabel: "Walnut Woodcarving",
    artisan: "Ustad Bashir Tarkhan",
    district: "Anantnag",
    price: 46500,
    mrp: 55000,
    rating: 4.7,
    reviewCount: 22,
    giId: "GI-JK-WALN-4418",
    giLevel: 2,
    purityMetric: "Kiln & Air Seasoned Walnut • Pinjrakari Jali Geometry",
    loomHours: 380,
    dimensions: "165 cm × 120 cm (3-Panel)",
    stock: 3,
    image: IMG_MAP.walnut,
    description: "Three-panel architectural room divider carved with geometric Pinjrakari lattice work and bordered by hand-relieved Kashmiri Chinar foliage."
  },
  {
    id: "hl-papr-008",
    title: "Persian Guldan Naqash Vase",
    guild: "papier-mache",
    guildLabel: "Papier-Mâché Art",
    artisan: "Master Tariq Hussain",
    district: "Baramulla",
    price: 19200,
    mrp: 24000,
    rating: 4.8,
    reviewCount: 33,
    giId: "GI-JK-PAPR-3155",
    giLevel: 2,
    purityMetric: "Layered Sakhta Pulp • Hazara Rose & Bulbul Motif",
    loomHours: 175,
    dimensions: "36 cm Height × 18 cm Dia",
    stock: 5,
    image: IMG_MAP.papier,
    description: "Classic long-necked Kashmiri Persian Guldan finished in deep forest black lacquer and illuminated with thousand-flower Hazara Naqash gold-leaf detailing."
  }
];

const COUPONS = {
  VALLEY10: { code: "VALLEY10", type: "percent", value: 10, desc: "10% Direct Valley Heritage Privilege" },
  FIRSTCRAFT: { code: "FIRSTCRAFT", type: "flat", value: 2500, desc: "₹2,500 First Collectors Grant" },
  HERITAGE5000: { code: "HERITAGE5000", type: "flat", value: 5000, desc: "₹5,000 Heirloom Loom Patronage" }
};

/* Safe localStorage Wrapper */
function loadStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    /* Ignore quota/sandbox storage restrictions */
  }
}

/* Global Application State */
const AppState = {
  customProducts: loadStorage("hunarlink_custom_products", []),
  cart: loadStorage("hunarlink_cart", [{ productId: "hl-pash-001", qty: 1 }]),
  savedLater: loadStorage("hunarlink_saved_later", []),
  wishlist: loadStorage("hunarlink_wishlist", ["hl-kani-004", "hl-papr-003"]),
  appliedCoupon: loadStorage("hunarlink_coupon", null),
  compareList: [],
  addresses: loadStorage("hunarlink_addresses", [
    {
      id: "addr-1",
      name: "Demo Collector",
      phone: "0000000000",
      pincode: "000000",
      locality: "Demo Address",
      city: "Sample City",
      type: "Home"
    }
  ]),
  selectedAddressId: "addr-1",
  orders: loadStorage("hunarlink_orders", [
    {
      id: "HL-ORD-2026-7814",
      date: "12 Nov 2026",
      items: [{ title: "Shahi Gulab-dan Urn", qty: 1, price: 14800, giId: "GI-JK-PAPR-3109" }],
      total: 14800,
      paymentMethod: "UPI Verified Escrow",
      address: "Demo Address, Sample City - 000000",
      stage: 3
    }
  ]),
  reviews: loadStorage("hunarlink_reviews", {
    "hl-pash-001": [
      { author: "Dr. Meenakshi Kaul", rating: 5, date: "08 Nov 2026", comment: "Verified the GI QR tag on receipt. Featherlight Changthangi warmth and extraordinary Sozni needlework." },
      { author: "Rohan Mehta", rating: 5, date: "02 Nov 2026", comment: "Direct from Master Ghulam Qadir Mir's loom with full lab micron report included." }
    ]
  }),
  b2bQuotes: loadStorage("hunarlink_b2b_quotes", []),
  filters: {
    search: "",
    guild: "all",
    artisan: "",
    maxPrice: 125000,
    minRating: 0,
    giTier: 0,
    district: "all",
    sortBy: "featured"
  },
  activeProductModalId: null,
  checkoutStep: 1
};

function getAllProducts() {
  return [...AppState.customProducts, ...SEED_PRODUCTS];
}

function getProductById(id) {
  return getAllProducts().find(p => p.id === id) || getAllProducts()[0];
}

function formatINR(num) {
  const n = Math.round(Number(num) || 0);
  return "₹" + n.toLocaleString("en-IN");
}

/* Toast Notification Helper */
function showToast(message) {
  const stack = document.getElementById("toast-container");
  if (!stack) return;
  const item = document.createElement("div");
  item.className = "toast-item";
  item.textContent = message;
  stack.appendChild(item);
  setTimeout(() => {
    item.remove();
  }, 3200);
}

/* ==========================================================================
   Catalog Filtering, Search & Rendering
   ========================================================================== */
function getFilteredProducts() {
  const f = AppState.filters;
  const q = f.search.trim().toLowerCase();

  let list = getAllProducts().filter(p => {
    if (q) {
      const hay = `${p.title} ${p.guildLabel} ${p.artisan} ${p.district} ${p.giId}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (f.guild !== "all" && p.guild !== f.guild) return false;
    if (f.artisan && p.artisan !== f.artisan) return false;
    if (p.price > f.maxPrice) return false;
    if (f.minRating > 0 && p.rating < f.minRating) return false;
    if (f.giTier > 0 && p.giLevel < f.giTier) return false;
    if (f.district !== "all" && p.district !== f.district) return false;
    return true;
  });

  if (f.sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (f.sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
  else if (f.sortBy === "rating-desc") list.sort((a, b) => b.rating - a.rating);
  else if (f.sortBy === "hours-desc") list.sort((a, b) => b.loomHours - a.loomHours);

  return list;
}

function renderMarketplace() {
  const grid = document.getElementById("product-grid");
  const summary = document.getElementById("results-summary");
  const chipsWrap = document.getElementById("active-filter-chips");
  if (!grid) return;

  const products = getFilteredProducts();
  if (summary) {
    summary.textContent = `Showing ${products.length} of ${getAllProducts().length} GI-Certified Valley Treasures`;
  }

  /* Update category pills */
  document.querySelectorAll(".cat-pill-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.cat === AppState.filters.guild);
  });

  /* Update guild bento highlight */
  document.querySelectorAll(".guild-bento-card").forEach(card => {
    card.classList.toggle("active-guild", card.dataset.guild === AppState.filters.guild);
  });

  /* Render active filter chips */
  if (chipsWrap) {
    const chips = [];
    if (AppState.filters.guild !== "all") chips.push(`Guild: ${AppState.filters.guild.toUpperCase()}`);
    if (AppState.filters.artisan) chips.push(`Artisan: ${AppState.filters.artisan}`);
    if (AppState.filters.search) chips.push(`Search: "${AppState.filters.search}"`);
    if (AppState.filters.maxPrice < 125000) chips.push(`Max: ${formatINR(AppState.filters.maxPrice)}`);
    if (AppState.filters.district !== "all") chips.push(`Cluster: ${AppState.filters.district}`);
    chipsWrap.innerHTML = chips.map(c => `<span class="filter-chip-tag">${c}</span>`).join("");
  }

  if (products.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; background: #FFF; padding: 42px; text-align: center; border-radius: 12px; border: 1px solid var(--border-light);">
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 8px;">No Matching Heirloom Crafts Found</h3>
        <p style="font-size: 0.86rem; color: var(--text-500); margin-bottom: 16px;">Try broadening your price slider or resetting active guild filters.</p>
        <button type="button" class="btn-primary-forest" onclick="resetAllFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(p => {
    const isWished = AppState.wishlist.includes(p.id);
    const isCompared = AppState.compareList.includes(p.id);
    const discountPct = Math.round(((p.mrp - p.price) / p.mrp) * 100);
    return `
      <article class="product-card" data-product-id="${p.id}">
        <div class="product-img-wrap" onclick="openProductModal('${p.id}')">
          <img src="${p.image}" alt="${p.title}">
          <span class="product-gi-pill">✓ ${p.giId}</span>
          <button type="button" class="product-wish-btn ${isWished ? "wishlisted" : ""}" onclick="event.stopPropagation(); toggleWishlist('${p.id}')" aria-label="Toggle Wishlist">
            ${isWished ? "♥" : "♡"}
          </button>
          <label class="product-compare-bar" onclick="event.stopPropagation();">
            <input type="checkbox" ${isCompared ? "checked" : ""} onchange="toggleCompare('${p.id}')">
            Compare
          </label>
        </div>
        <div class="product-body">
          <div class="product-meta-top">
            <span class="product-guild-tag">${p.guildLabel}</span>
            <span class="product-rating-badge">${p.rating.toFixed(1)} ★ (${p.reviewCount})</span>
          </div>
          <button type="button" class="product-title-btn" onclick="openProductModal('${p.id}')">${p.title}</button>
          <p class="product-artisan-line">by ${p.artisan} • ${p.district}</p>
          <div style="font-size: 0.7rem; color: var(--forest-700); background: var(--forest-50); padding: 4px 8px; border-radius: 4px; margin-bottom: 10px;">
            🔬 ${p.purityMetric}
          </div>
          <div class="product-footer-row">
            <div>
              <div class="price-kicker">Direct Artisan Price (${discountPct}% Off)</div>
              <div>
                <span class="price-main">${formatINR(p.price)}</span>
                <span class="price-mrp">${formatINR(p.mrp)}</span>
              </div>
            </div>
            <button type="button" class="btn-acquire" onclick="addToCart('${p.id}', 1)">Acquire</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function setCategoryFilter(guildKey, scrollToGrid = false) {
  AppState.filters.guild = guildKey;
  AppState.filters.artisan = "";
  renderMarketplace();
  if (scrollToGrid) {
    const el = document.getElementById("marketplace-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
}

function filterByMasterUstad() {
  AppState.filters.guild = "all";
  AppState.filters.artisan = "Master Ghulam Qadir Mir";
  renderMarketplace();
  const el = document.getElementById("marketplace-section");
  if (el) el.scrollIntoView({ behavior: "smooth" });
  showToast("Filtered catalog to Master Ghulam Qadir Mir's loom creations");
}

function resetAllFilters() {
  AppState.filters = {
    search: "",
    guild: "all",
    artisan: "",
    maxPrice: 125000,
    minRating: 0,
    giTier: 0,
    district: "all",
    sortBy: "featured"
  };
  const sInput = document.getElementById("global-search-input");
  if (sInput) sInput.value = "";
  const pSlider = document.getElementById("price-range-slider");
  if (pSlider) pSlider.value = "125000";
  const pLabel = document.getElementById("price-slider-val");
  if (pLabel) pLabel.textContent = "Up to ₹1,25,000";
  const rSelect = document.getElementById("rating-filter");
  if (rSelect) rSelect.value = "0";
  const gSelect = document.getElementById("gi-tier-filter");
  if (gSelect) gSelect.value = "0";
  const dSelect = document.getElementById("district-filter");
  if (dSelect) dSelect.value = "all";
  const sortSel = document.getElementById("sort-select");
  if (sortSel) sortSel.value = "featured";

  renderMarketplace();
  showToast("All marketplace filters reset");
}

/* ==========================================================================
   Cart, "Save for Later", Coupons & Wishlist
   ========================================================================== */
function updateHeaderBadges() {
  const cartCountEl = document.getElementById("cart-count");
  const wishCountEl = document.getElementById("wishlist-count");
  const totalCartQty = AppState.cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartCountEl) cartCountEl.textContent = String(totalCartQty);
  if (wishCountEl) wishCountEl.textContent = String(AppState.wishlist.length);
}

function calculateCartTotals() {
  let totalMrp = 0;
  let sellingSubtotal = 0;
  let itemCount = 0;

  AppState.cart.forEach(entry => {
    const p = getProductById(entry.productId);
    if (p) {
      totalMrp += p.mrp * entry.qty;
      sellingSubtotal += p.price * entry.qty;
      itemCount += entry.qty;
    }
  });

  const artisanDiscount = totalMrp - sellingSubtotal;
  let couponDiscount = 0;
  if (AppState.appliedCoupon && COUPONS[AppState.appliedCoupon] && sellingSubtotal > 0) {
    const c = COUPONS[AppState.appliedCoupon];
    couponDiscount = c.type === "percent" ? Math.round(sellingSubtotal * (c.value / 100)) : c.value;
    if (couponDiscount > sellingSubtotal * 0.4) couponDiscount = Math.round(sellingSubtotal * 0.4);
  }

  const netPayable = Math.max(0, sellingSubtotal - couponDiscount);
  return { totalMrp, sellingSubtotal, artisanDiscount, couponDiscount, netPayable, itemCount };
}

function addToCart(productId, qty = 1) {
  const existing = AppState.cart.find(item => item.productId === productId);
  if (existing) {
    existing.qty = Math.min(5, existing.qty + qty);
  } else {
    AppState.cart.push({ productId, qty });
  }
  saveStorage("hunarlink_cart", AppState.cart);
  updateHeaderBadges();
  renderCartDrawer();
  const p = getProductById(productId);
  showToast(`Added "${p.title}" to your Valley Acquisition Bag`);
}

function changeCartQty(productId, delta) {
  const idx = AppState.cart.findIndex(i => i.productId === productId);
  if (idx === -1) return;
  AppState.cart[idx].qty += delta;
  if (AppState.cart[idx].qty <= 0) {
    AppState.cart.splice(idx, 1);
  }
  saveStorage("hunarlink_cart", AppState.cart);
  updateHeaderBadges();
  renderCartDrawer();
}

function removeFromCart(productId) {
  AppState.cart = AppState.cart.filter(i => i.productId !== productId);
  saveStorage("hunarlink_cart", AppState.cart);
  updateHeaderBadges();
  renderCartDrawer();
  showToast("Removed item from cart");
}

function saveForLater(productId) {
  AppState.cart = AppState.cart.filter(i => i.productId !== productId);
  if (!AppState.savedLater.includes(productId)) {
    AppState.savedLater.push(productId);
  }
  saveStorage("hunarlink_cart", AppState.cart);
  saveStorage("hunarlink_saved_later", AppState.savedLater);
  updateHeaderBadges();
  renderCartDrawer();
  showToast("Moved item to Saved for Later");
}

function moveSavedToCart(productId) {
  AppState.savedLater = AppState.savedLater.filter(id => id !== productId);
  saveStorage("hunarlink_saved_later", AppState.savedLater);
  addToCart(productId, 1);
}

function applyCouponCode(rawCode) {
  const input = document.getElementById("coupon-code-input");
  const code = (rawCode || (input ? input.value : "")).trim().toUpperCase();
  if (!code || !COUPONS[code]) {
    showToast("Invalid code. Try VALLEY10, FIRSTCRAFT, or HERITAGE5000");
    return;
  }
  AppState.appliedCoupon = code;
  saveStorage("hunarlink_coupon", code);
  renderCartDrawer();
  showToast(`Applied ${code}: ${COUPONS[code].desc}`);
}

function removeCouponCode() {
  AppState.appliedCoupon = null;
  saveStorage("hunarlink_coupon", null);
  renderCartDrawer();
  showToast("Removed promotional code");
}

function renderCartDrawer() {
  const body = document.getElementById("cart-drawer-body");
  const footer = document.getElementById("cart-drawer-footer");
  if (!body || !footer) return;

  const totals = calculateCartTotals();

  const itemsHtml = AppState.cart.length === 0
    ? `<div style="text-align: center; padding: 32px 12px; color: var(--text-500);">
         <p style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--forest-900); margin-bottom: 6px;">Your Acquisition Bag is Empty</p>
         <p style="font-size: 0.8rem;">Explore GI-certified Kashmiri shawls, rugs, walnut wood, and papier-mâché treasures.</p>
       </div>`
    : AppState.cart.map(entry => {
        const p = getProductById(entry.productId);
        return `
          <div style="display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border-light);">
            <img src="${p.image}" alt="${p.title}" style="width: 68px; height: 68px; border-radius: 8px; object-fit: cover;">
            <div style="flex: 1;">
              <div style="font-weight: 700; font-size: 0.88rem; color: var(--forest-950);">${p.title}</div>
              <div style="font-size: 0.72rem; color: var(--text-500);">${p.giId} • ${p.artisan}</div>
              <div style="font-weight: 700; font-size: 0.86rem; color: var(--forest-900); margin-top: 4px;">
                ${formatINR(p.price * entry.qty)}
                <span style="font-size: 0.72rem; color: var(--text-400); text-decoration: line-through;">${formatINR(p.mrp * entry.qty)}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 10px; margin-top: 8px;">
                <div style="display: inline-flex; align-items: center; border: 1px solid var(--border-mid); border-radius: 4px;">
                  <button type="button" style="padding: 2px 8px; font-weight: 700;" onclick="changeCartQty('${p.id}', -1)">−</button>
                  <span style="padding: 2px 8px; font-size: 0.78rem; font-weight: 700;">${entry.qty}</span>
                  <button type="button" style="padding: 2px 8px; font-weight: 700;" onclick="changeCartQty('${p.id}', 1)">+</button>
                </div>
                <button type="button" style="font-size: 0.72rem; color: var(--forest-700); font-weight: 600;" onclick="saveForLater('${p.id}')">Save for Later</button>
                <button type="button" style="font-size: 0.72rem; color: var(--danger-600); font-weight: 600;" onclick="removeFromCart('${p.id}')">Remove</button>
              </div>
            </div>
          </div>
        `;
      }).join("");

  const savedHtml = AppState.savedLater.length > 0
    ? `<div style="margin-top: 18px; padding-top: 12px; border-top: 2px dashed var(--border-mid);">
         <div style="font-size: 0.76rem; font-weight: 700; text-transform: uppercase; color: var(--text-500); margin-bottom: 8px;">Saved for Later (${AppState.savedLater.length})</div>
         ${AppState.savedLater.map(id => {
           const p = getProductById(id);
           return `
             <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--bg-ivory); font-size: 0.8rem;">
               <div>
                 <div style="font-weight: 600;">${p.title}</div>
                 <div style="color: var(--text-500); font-size: 0.72rem;">${formatINR(p.price)}</div>
               </div>
               <button type="button" class="btn-outline-ivory" style="padding: 5px 10px; font-size: 0.7rem;" onclick="moveSavedToCart('${p.id}')">Move to Cart</button>
             </div>
           `;
         }).join("")}
       </div>`
    : "";

  body.innerHTML = `
    <div style="background: var(--forest-50); border: 1px solid var(--forest-600); padding: 9px 12px; border-radius: 8px; font-size: 0.74rem; color: var(--forest-900); margin-bottom: 12px;">
      🤝 <strong>Zero Commission Guarantee:</strong> 100% of net craft value goes directly to the registered Kashmiri artisan loom.
    </div>
    ${itemsHtml}
    <div style="margin-top: 14px; background: var(--bg-ivory); padding: 12px; border-radius: 8px; border: 1px solid var(--border-light);">
      <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; margin-bottom: 6px;">Apply Valley Privilege Coupon</div>
      <div style="display: flex; gap: 6px;">
        <input type="text" id="coupon-code-input" placeholder="e.g. VALLEY10 or FIRSTCRAFT" value="${AppState.appliedCoupon || ""}" style="flex: 1; padding: 7px 10px; border: 1px solid var(--border-mid); border-radius: 4px; font-size: 0.78rem;">
        <button type="button" class="btn-acquire" onclick="applyCouponCode()">Apply</button>
      </div>
      <div style="display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap;">
        <button type="button" style="font-size: 0.68rem; background: #FFF; border: 1px solid var(--border-mid); padding: 3px 8px; border-radius: 4px;" onclick="applyCouponCode('VALLEY10')">VALLEY10 (10% Off)</button>
        <button type="button" style="font-size: 0.68rem; background: #FFF; border: 1px solid var(--border-mid); padding: 3px 8px; border-radius: 4px;" onclick="applyCouponCode('FIRSTCRAFT')">FIRSTCRAFT (₹2,500 Off)</button>
        ${AppState.appliedCoupon ? `<button type="button" style="font-size: 0.68rem; color: var(--danger-600); font-weight: 700;" onclick="removeCouponCode()">Remove Coupon</button>` : ""}
      </div>
    </div>
    ${savedHtml}
  `;

  footer.innerHTML = `
    <div style="font-size: 0.78rem; display: flex; flex-direction: column; gap: 5px; margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between;">
        <span>Total MRP (${totals.itemCount} items)</span>
        <span>${formatINR(totals.totalMrp)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; color: var(--success-600);">
        <span>Direct Artisan Loom Savings</span>
        <span>− ${formatINR(totals.artisanDiscount)}</span>
      </div>
      ${totals.couponDiscount > 0 ? `
        <div style="display: flex; justify-content: space-between; color: var(--success-600); font-weight: 600;">
          <span>Coupon (${AppState.appliedCoupon})</span>
          <span>− ${formatINR(totals.couponDiscount)}</span>
        </div>
      ` : ""}
      <div style="display: flex; justify-content: space-between;">
        <span>Insured GI-Sealed Transit</span>
        <span style="color: var(--success-600); font-weight: 700;">FREE</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 1rem; font-weight: 700; color: var(--forest-950); padding-top: 8px; border-top: 1px solid var(--border-mid);">
        <span>Net Payable</span>
        <span>${formatINR(totals.netPayable)}</span>
      </div>
    </div>
    <button type="button" class="btn-primary-forest" style="width: 100%; justify-content: center;" ${AppState.cart.length === 0 ? "disabled" : ""} onclick="openCheckoutWizard()">
      Proceed to Insured Checkout →
    </button>
  `;
}

function toggleWishlist(productId) {
  const idx = AppState.wishlist.indexOf(productId);
  const p = getProductById(productId);
  if (idx > -1) {
    AppState.wishlist.splice(idx, 1);
    showToast(`Removed "${p.title}" from Wishlist`);
  } else {
    AppState.wishlist.push(productId);
    showToast(`Saved "${p.title}" to Wishlist`);
  }
  saveStorage("hunarlink_wishlist", AppState.wishlist);
  updateHeaderBadges();
  renderMarketplace();
  renderWishlistDrawer();
}

function renderWishlistDrawer() {
  const body = document.getElementById("wishlist-drawer-body");
  if (!body) return;
  if (AppState.wishlist.length === 0) {
    body.innerHTML = `<p style="text-align: center; padding: 36px 12px; color: var(--text-500); font-size: 0.85rem;">No heirloom pieces saved in your Wishlist yet.</p>`;
    return;
  }
  body.innerHTML = AppState.wishlist.map(id => {
    const p = getProductById(id);
    return `
      <div style="display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border-light); align-items: center;">
        <img src="${p.image}" alt="${p.title}" style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover;">
        <div style="flex: 1;">
          <div style="font-weight: 700; font-size: 0.86rem;">${p.title}</div>
          <div style="font-size: 0.72rem; color: var(--text-500);">${p.artisan} • ${formatINR(p.price)}</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 5px;">
          <button type="button" class="btn-acquire" style="font-size: 0.7rem; padding: 5px 10px;" onclick="addToCart('${p.id}', 1); toggleWishlist('${p.id}')">Move to Bag</button>
          <button type="button" style="font-size: 0.68rem; color: var(--danger-600);" onclick="toggleWishlist('${p.id}')">Remove</button>
        </div>
      </div>
    `;
  }).join("");
}

function toggleDrawer(drawerId, open) {
  const drawer = document.getElementById(drawerId);
  if (!drawer) return;
  if (drawerId === "cart-drawer") renderCartDrawer();
  if (drawerId === "wishlist-drawer") renderWishlistDrawer();
  drawer.classList.toggle("open", open);
}

/* ==========================================================================
   Product Detail Modal, Texture Zoom, Pincode Estimator & Reviews
   ========================================================================== */
function openProductModal(productId) {
  const p = getProductById(productId);
  if (!p) return;
  AppState.activeProductModalId = p.id;
  const modal = document.getElementById("product-detail-modal");
  const content = document.getElementById("product-detail-body");
  if (!modal || !content) return;

  const prodReviews = AppState.reviews[p.id] || [
    { author: "Verified Collector (New Delhi)", rating: 5, date: "19 Oct 2026", comment: "Authenticated via HunarLink GI Registry QR. Museum-grade craftsmanship." }
  ];

  content.innerHTML = `
    <div class="pdp-grid">
      <div>
        <div class="zoom-stage" id="pdp-zoom-stage" onmousemove="handleZoomMove(event)" onmouseleave="resetZoomMove()">
          <img src="${p.image}" id="pdp-main-img" alt="${p.title}">
          <span class="zoom-hint-pill">🔍 Hover to Inspect Macro Weave / Grain</span>
        </div>
        <div class="craft-passport-box">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="font-size: 0.78rem; color: var(--forest-900);">🛡️ DIGITAL CRAFT PASSPORT (3-TIER VERIFIED)</strong>
            <span style="font-size: 0.7rem; background: var(--forest-900); color: var(--gold-400); padding: 2px 8px; border-radius: 99px;">${p.giId}</span>
          </div>
          <div class="passport-grid">
            <div><strong>Master Artisan:</strong> ${p.artisan}</div>
            <div><strong>Valley Cluster:</strong> ${p.district}, J&K</div>
            <div><strong>Lab Purity Audit:</strong> ${p.purityMetric}</div>
            <div><strong>Loom / Chisel Hours:</strong> ${p.loomHours} hrs • ${p.dimensions}</div>
          </div>
        </div>
      </div>

      <div>
        <div style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--forest-700);">${p.guildLabel}</div>
        <h2 style="font-family: var(--font-serif); font-size: 1.9rem; color: var(--forest-950); margin: 4px 0;">${p.title}</h2>
        <div style="font-size: 0.82rem; color: var(--text-500); margin-bottom: 12px;">
          Crafted by <strong>${p.artisan}</strong> • <span style="color: var(--forest-800); font-weight: 700;">${p.rating.toFixed(1)} ★ (${p.reviewCount} Verified Reviews)</span>
        </div>

        <div style="background: var(--bg-ivory); padding: 12px 16px; border-radius: 8px; margin-bottom: 14px;">
          <div style="font-size: 0.68rem; text-transform: uppercase; color: var(--text-500);">Direct Loom Valuation (Zero Middleman Cut)</div>
          <div style="display: flex; align-items: baseline; gap: 10px;">
            <span style="font-family: var(--font-serif); font-size: 1.8rem; font-weight: 700; color: var(--forest-950);">${formatINR(p.price)}</span>
            <span style="text-decoration: line-through; color: var(--text-400); font-size: 0.9rem;">${formatINR(p.mrp)}</span>
            <span style="color: var(--success-600); font-size: 0.8rem; font-weight: 700;">Save ${formatINR(p.mrp - p.price)}</span>
          </div>
        </div>

        <p style="font-size: 0.85rem; color: var(--text-700); margin-bottom: 14px; line-height: 1.6;">${p.description}</p>

        <!-- Pincode Delivery Checker -->
        <div style="border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light); padding: 12px 0; margin-bottom: 16px;">
          <div style="font-size: 0.74rem; font-weight: 700; text-transform: uppercase; color: var(--text-700);">Check Insured Courier Delivery (Delhivery / India Post Speed Post)</div>
          <div class="pincode-checker-row">
            <input type="text" id="pdp-pincode-input" class="pincode-input" maxlength="6" placeholder="Enter 6-digit Pincode" value="000000">
            <button type="button" class="btn-acquire" onclick="checkPincodeEta()">Check ETA</button>
          </div>
          <div id="pdp-pincode-result" style="font-size: 0.76rem; color: var(--success-600); font-weight: 600;">
            ✓ Delhivery / India Post Insured Transit to 000000: Estimated delivery in 2–3 Days (Free GI-Sealed Box).
          </div>
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px;">
          <button type="button" class="btn-primary-forest" onclick="addToCart('${p.id}', 1); closeModal('product-detail-modal'); toggleDrawer('cart-drawer', true);">
            Acquire to Bag (${formatINR(p.price)})
          </button>
          <button type="button" class="btn-gold" onclick="addToCart('${p.id}', 1); closeModal('product-detail-modal'); openCheckoutWizard();">
            ⚡ Instant Buy Now
          </button>
          <button type="button" class="btn-outline-ivory" onclick="openGiVerifyModal('${p.giId}')">
            Verify GI Seal
          </button>
        </div>

        <!-- Customer Reviews Section -->
        <div>
          <h4 style="font-family: var(--font-serif); font-size: 1.15rem; margin-bottom: 8px;">Collector Reviews (${prodReviews.length})</h4>
          <div style="max-height: 135px; overflow-y: auto; margin-bottom: 10px; padding-right: 6px;">
            ${prodReviews.map(r => `
              <div style="background: var(--bg-ivory); padding: 8px 10px; border-radius: 6px; margin-bottom: 6px; font-size: 0.76rem;">
                <div style="display: flex; justify-content: space-between; font-weight: 700;">
                  <span>${r.author} <span style="color: var(--gold-600);">${"★".repeat(r.rating)}</span></span>
                  <span style="color: var(--text-400);">${r.date}</span>
                </div>
                <p style="color: var(--text-700); margin-top: 3px;">${r.comment}</p>
              </div>
            `).join("")}
          </div>
          <form onsubmit="submitProductReview(event, '${p.id}')" style="display: flex; gap: 6px; flex-wrap: wrap;">
            <input type="text" id="rev-author" placeholder="Your Name" required style="padding: 6px 8px; border: 1px solid var(--border-mid); border-radius: 4px; font-size: 0.76rem; width: 120px;">
            <select id="rev-rating" style="padding: 6px; border: 1px solid var(--border-mid); border-radius: 4px; font-size: 0.76rem;">
              <option value="5">5 ★</option>
              <option value="4">4 ★</option>
            </select>
            <input type="text" id="rev-comment" placeholder="Write a verified craft review..." required style="flex: 1; padding: 6px 8px; border: 1px solid var(--border-mid); border-radius: 4px; font-size: 0.76rem;">
            <button type="submit" class="btn-acquire" style="padding: 6px 12px; font-size: 0.74rem;">Post</button>
          </form>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("open");
}

function handleZoomMove(e) {
  const stage = document.getElementById("pdp-zoom-stage");
  const img = document.getElementById("pdp-main-img");
  if (!stage || !img) return;
  const rect = stage.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  img.style.transformOrigin = `${x}% ${y}%`;
  img.style.transform = "scale(2.15)";
}

function resetZoomMove() {
  const img = document.getElementById("pdp-main-img");
  if (img) img.style.transform = "scale(1)";
}

function checkPincodeEta() {
  const inp = document.getElementById("pdp-pincode-input");
  const out = document.getElementById("pdp-pincode-result");
  if (!inp || !out) return;
  const pin = inp.value.trim();
  if (!/^[1-9][0-9]{5}$/.test(pin)) {
    out.style.color = "var(--danger-600)";
    out.textContent = "Please enter a valid 6-digit Indian pincode.";
    return;
  }
  out.style.color = "var(--success-600)";
  if (pin.startsWith("18") || pin.startsWith("19")) {
    out.textContent = `✓ J&K Priority Corridor (${pin}): 2–3 Days via Delhivery / India Post with Tamper-Proof GI Seal.`;
  } else if (["11", "40", "56", "60", "70", "50"].some(p => pin.startsWith(p))) {
    out.textContent = `✓ Metro Air Express (${pin}): 3–5 Days via Delhivery Insured Heritage Transit (FREE).`;
  } else {
    out.textContent = `✓ National Insured Dispatch (${pin}): 5–7 Days via India Post Speed Post with GI Escrow Protection.`;
  }
}

function submitProductReview(e, productId) {
  e.preventDefault();
  const author = document.getElementById("rev-author").value.trim();
  const rating = parseInt(document.getElementById("rev-rating").value, 10) || 5;
  const comment = document.getElementById("rev-comment").value.trim();
  if (!author || !comment) return;

  if (!AppState.reviews[productId]) AppState.reviews[productId] = [];
  AppState.reviews[productId].unshift({
    author,
    rating,
    date: "15 Nov 2026",
    comment
  });
  saveStorage("hunarlink_reviews", AppState.reviews);
  openProductModal(productId);
  showToast("Thank you! Your review has been published.");
}

/* ==========================================================================
   Product Comparison Tray & Modal (Up to 3 Crafts)
   ========================================================================== */
function toggleCompare(productId) {
  const idx = AppState.compareList.indexOf(productId);
  if (idx > -1) {
    AppState.compareList.splice(idx, 1);
  } else {
    if (AppState.compareList.length >= 3) {
      showToast("You can compare up to 3 heirloom crafts at a time");
      renderMarketplace();
      return;
    }
    AppState.compareList.push(productId);
  }
  renderMarketplace();
  renderCompareBar();
}

function renderCompareBar() {
  const bar = document.getElementById("compare-floating-bar");
  const text = document.getElementById("compare-bar-text");
  if (!bar || !text) return;
  if (AppState.compareList.length === 0) {
    bar.classList.remove("visible");
    return;
  }
  bar.classList.add("visible");
  text.textContent = `${AppState.compareList.length} Craft(s) Selected for Side-by-Side Comparison`;
}

function openCompareModal() {
  const modal = document.getElementById("compare-modal");
  const body = document.getElementById("compare-modal-body");
  if (!modal || !body) return;
  const items = AppState.compareList.map(id => getProductById(id));
  if (items.length === 0) {
    showToast("Select at least 1 craft using the Compare checkbox on product cards");
    return;
  }
  body.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th>Specification</th>
          ${items.map(p => `<th>${p.title}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Preview</strong></td>
          ${items.map(p => `<td><img src="${p.image}" alt="${p.title}" style="width: 110px; height: 80px; object-fit: cover; border-radius: 6px;"></td>`).join("")}
        </tr>
        <tr>
          <td><strong>Direct Loom Price</strong></td>
          ${items.map(p => `<td style="font-weight: 700; color: var(--forest-900);">${formatINR(p.price)} <span style="text-decoration: line-through; color: var(--text-400); font-size: 0.72rem;">${formatINR(p.mrp)}</span></td>`).join("")}
        </tr>
        <tr>
          <td><strong>Craft Guild</strong></td>
          ${items.map(p => `<td>${p.guildLabel}</td>`).join("")}
        </tr>
        <tr>
          <td><strong>Master Artisan</strong></td>
          ${items.map(p => `<td>${p.artisan} (${p.district})</td>`).join("")}
        </tr>
        <tr>
          <td><strong>GI Registry Tag</strong></td>
          ${items.map(p => `<td><code>${p.giId}</code> (Level ${p.giLevel})</td>`).join("")}
        </tr>
        <tr>
          <td><strong>Lab Material Purity</strong></td>
          ${items.map(p => `<td>${p.purityMetric}</td>`).join("")}
        </tr>
        <tr>
          <td><strong>Craftsmanship Hours</strong></td>
          ${items.map(p => `<td>${p.loomHours} Hours • ${p.dimensions}</td>`).join("")}
        </tr>
        <tr>
          <td><strong>Action</strong></td>
          ${items.map(p => `<td><button type="button" class="btn-acquire" onclick="addToCart('${p.id}', 1); closeModal('compare-modal')">Acquire Now</button></td>`).join("")}
        </tr>
      </tbody>
    </table>
  `;
  modal.classList.add("open");
}

function clearCompareList() {
  AppState.compareList = [];
  renderMarketplace();
  renderCompareBar();
}

/* ==========================================================================
   4-Step Checkout Wizard & Order Tracking
   ========================================================================== */
function openCheckoutWizard() {
  toggleDrawer("cart-drawer", false);
  if (AppState.cart.length === 0) {
    showToast("Add at least one heirloom piece to your bag before checkout");
    return;
  }
  AppState.checkoutStep = 1;
  renderCheckoutStep();
  document.getElementById("checkout-modal").classList.add("open");
}

function setCheckoutStep(step) {
  AppState.checkoutStep = step;
  renderCheckoutStep();
}

function saveNewCheckoutAddress(e) {
  e.preventDefault();
  const name = document.getElementById("addr-name").value.trim();
  const phone = document.getElementById("addr-phone").value.trim();
  const pincode = document.getElementById("addr-pin").value.trim();
  const locality = document.getElementById("addr-loc").value.trim();
  const city = document.getElementById("addr-city").value.trim();
  if (!name || !phone || !pincode || !locality || !city) return;

  const newAddr = {
    id: "addr-" + Date.now(),
    name,
    phone,
    pincode,
    locality,
    city,
    type: "Delivery"
  };
  AppState.addresses.push(newAddr);
  AppState.selectedAddressId = newAddr.id;
  saveStorage("hunarlink_addresses", AppState.addresses);
  AppState.checkoutStep = 3;
  renderCheckoutStep();
  showToast("Delivery address saved and selected");
}

function completeSimulatedOrder(paymentMethod) {
  const totals = calculateCartTotals();
  const addr = AppState.addresses.find(a => a.id === AppState.selectedAddressId) || AppState.addresses[0];
  const orderId = "HL-ORD-2026-" + Math.floor(1000 + Math.random() * 9000);
  const newOrder = {
    id: orderId,
    date: "15 Nov 2026",
    items: AppState.cart.map(entry => {
      const p = getProductById(entry.productId);
      return { title: p.title, qty: entry.qty, price: p.price, giId: p.giId };
    }),
    total: totals.netPayable,
    paymentMethod,
    address: `${addr.name}, ${addr.locality}, ${addr.city} - ${addr.pincode}`,
    stage: 2
  };

  AppState.orders.unshift(newOrder);
  AppState.cart = [];
  AppState.appliedCoupon = null;
  saveStorage("hunarlink_orders", AppState.orders);
  saveStorage("hunarlink_cart", AppState.cart);
  saveStorage("hunarlink_coupon", null);
  updateHeaderBadges();
  closeModal("checkout-modal");
  openOrdersModal();
  showToast(`Order ${orderId} confirmed! GI Ownership Certificate generated.`);
}

function renderCheckoutStep() {
  const body = document.getElementById("checkout-modal-body");
  if (!body) return;
  const totals = calculateCartTotals();
  const step = AppState.checkoutStep;

  const stepperHtml = `
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 20px;">
      ${["1. Collector ID", "2. Delivery Address", "3. GI Certificate & Summary", "4. Escrow Payment"].map((label, idx) => {
        const sNum = idx + 1;
        const active = sNum === step;
        const done = sNum < step;
        return `<button type="button" onclick="setCheckoutStep(${sNum})" style="padding: 8px; border-radius: 6px; font-size: 0.74rem; font-weight: 700; background: ${active ? "var(--forest-900)" : done ? "var(--forest-100)" : "var(--bg-ivory)"}; color: ${active ? "#FFF" : "var(--forest-900)"};">${label}</button>`;
      }).join("")}
    </div>
  `;

  if (step === 1) {
    body.innerHTML = `
      ${stepperHtml}
      <div style="background: var(--bg-ivory); padding: 18px; border-radius: 10px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.35rem; margin-bottom: 10px;">Step 1: Collector Identity & GI Ownership Registration</h3>
        <p style="font-size: 0.8rem; color: var(--text-500); margin-bottom: 14px;">Your name is cryptographically bound to the Digital GI Ownership Passport upon dispatch.</p>
        <div class="form-grid">
          <div class="form-field">
            <label>Collector Full Name</label>
            <input type="text" id="chk-buyer-name" value="Demo Collector">
          </div>
          <div class="form-field">
            <label>Phone (SMS/WhatsApp Loom Telemetry)</label>
            <input type="text" id="chk-buyer-phone" value="+91 0000000000">
          </div>
        </div>
        <div style="margin-top: 16px; text-align: right;">
          <button type="button" class="btn-primary-forest" onclick="setCheckoutStep(2)">Continue to Delivery Address →</button>
        </div>
      </div>
    `;
  } else if (step === 2) {
    body.innerHTML = `
      ${stepperHtml}
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px;">
        <div>
          <h4 style="font-family: var(--font-serif); font-size: 1.2rem; margin-bottom: 10px;">Select Saved Address</h4>
          ${AppState.addresses.map(a => `
            <label style="display: block; padding: 12px; border: 2px solid ${AppState.selectedAddressId === a.id ? "var(--forest-900)" : "var(--border-light)"}; border-radius: 8px; margin-bottom: 10px; cursor: pointer;">
              <input type="radio" name="selectedAddr" ${AppState.selectedAddressId === a.id ? "checked" : ""} onchange="AppState.selectedAddressId='${a.id}'; renderCheckoutStep();">
              <strong style="font-size: 0.84rem; margin-left: 6px;">${a.name} (${a.type})</strong>
              <div style="font-size: 0.76rem; color: var(--text-500); margin-top: 4px;">${a.locality}, ${a.city} - ${a.pincode} • Ph: ${a.phone}</div>
            </label>
          `).join("")}
          <button type="button" class="btn-primary-forest" style="margin-top: 8px;" onclick="setCheckoutStep(3)">Deliver to Selected Address →</button>
        </div>
        <form onsubmit="saveNewCheckoutAddress(event)" style="background: var(--bg-ivory); padding: 14px; border-radius: 8px;">
          <h4 style="font-family: var(--font-serif); font-size: 1.15rem; margin-bottom: 8px;">Or Add New Address</h4>
          <div class="form-grid">
            <div class="form-field"><label>Full Name</label><input type="text" id="addr-name" required placeholder="Receiver Name"></div>
            <div class="form-field"><label>Mobile</label><input type="text" id="addr-phone" required placeholder="10-digit Mobile"></div>
            <div class="form-field"><label>6-Digit Pincode</label><input type="text" id="addr-pin" required placeholder="e.g. 180001"></div>
            <div class="form-field"><label>City & State</label><input type="text" id="addr-city" required placeholder="Srinagar, J&K"></div>
            <div class="form-field full"><label>Street / Locality</label><input type="text" id="addr-loc" required placeholder="House No, Street, Landmark"></div>
          </div>
          <button type="submit" class="btn-acquire" style="margin-top: 10px;">Save & Use This Address</button>
        </form>
      </div>
    `;
  } else if (step === 3) {
    body.innerHTML = `
      ${stepperHtml}
      <div style="background: var(--bg-ivory); padding: 18px; border-radius: 10px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.35rem; margin-bottom: 10px;">Step 3: Order Summary & GI Ownership Certificate Preview</h3>
        ${AppState.cart.map(entry => {
          const p = getProductById(entry.productId);
          return `
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border-light); font-size: 0.84rem;">
              <span><strong>${p.title}</strong> × ${entry.qty} <code style="color: var(--forest-700);">[${p.giId}]</code></span>
              <strong>${formatINR(p.price * entry.qty)}</strong>
            </div>
          `;
        }).join("")}
        <div style="display: flex; justify-content: space-between; font-size: 1.05rem; font-weight: 700; padding-top: 10px; color: var(--forest-950);">
          <span>Total Escrow Payable (Zero Platform Cut)</span>
          <span>${formatINR(totals.netPayable)}</span>
        </div>
        <div style="margin-top: 16px; display: flex; justify-content: space-between;">
          <button type="button" class="btn-outline-ivory" onclick="setCheckoutStep(2)">← Back</button>
          <button type="button" class="btn-primary-forest" onclick="setCheckoutStep(4)">Proceed to Escrow Payment →</button>
        </div>
      </div>
    `;
  } else {
    body.innerHTML = `
      ${stepperHtml}
      <div style="background: var(--bg-ivory); padding: 18px; border-radius: 10px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.35rem; margin-bottom: 12px;">Step 4: Select Simulated Artisan Escrow Payment (${formatINR(totals.netPayable)})</h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
          <div style="background: #FFF; padding: 14px; border-radius: 8px; border: 1px solid var(--border-mid);">
            <strong style="font-size: 0.86rem;">📱 Instant UPI Escrow</strong>
            <p style="font-size: 0.74rem; color: var(--text-500); margin: 6px 0 12px;">Direct UPI transfer held in GI-verified artisan escrow until delivery.</p>
            <button type="button" class="btn-primary-forest" style="width: 100%; justify-content: center;" onclick="completeSimulatedOrder('UPI Direct Artisan Escrow')">Pay via UPI</button>
          </div>
          <div style="background: #FFF; padding: 14px; border-radius: 8px; border: 1px solid var(--border-mid);">
            <strong style="font-size: 0.86rem;">💳 Credit / Debit Card</strong>
            <p style="font-size: 0.74rem; color: var(--text-500); margin: 6px 0 12px;">Visa, Mastercard, RuPay & Zero-Cost Heritage EMI options.</p>
            <button type="button" class="btn-primary-forest" style="width: 100%; justify-content: center;" onclick="completeSimulatedOrder('Card Escrow Payment')">Pay via Card</button>
          </div>
          <div style="background: #FFF; padding: 14px; border-radius: 8px; border: 1px solid var(--border-mid);">
            <strong style="font-size: 0.86rem;">📦 Insured COD / Verification on Arrival</strong>
            <p style="font-size: 0.74rem; color: var(--text-500); margin: 6px 0 12px;">Verify physical GI QR tag at your doorstep before releasing payment.</p>
            <button type="button" class="btn-gold" style="width: 100%; justify-content: center;" onclick="completeSimulatedOrder('Verify-on-Delivery Escrow')">Place COD Order</button>
          </div>
        </div>
      </div>
    `;
  }
}

/* My Orders & 5-Stage Shipment Tracker */
const TRACKING_STAGES = [
  "1. Order Confirmed",
  "2. GI Laser Seal Verified",
  "3. Packed at Valley Loom",
  "4. Insured Courier Transit",
  "5. Delivered to Collector"
];

function openOrdersModal() {
  const modal = document.getElementById("orders-modal");
  renderOrdersList();
  if (modal) modal.classList.add("open");
}

function advanceOrderStage(orderId) {
  const ord = AppState.orders.find(o => o.id === orderId);
  if (!ord) return;
  ord.stage = Math.min(5, (ord.stage || 1) + 1);
  saveStorage("hunarlink_orders", AppState.orders);
  renderOrdersList();
  showToast(`Order ${orderId} advanced to: ${TRACKING_STAGES[ord.stage - 1]}`);
}

function renderOrdersList() {
  const body = document.getElementById("orders-modal-body");
  if (!body) return;
  if (AppState.orders.length === 0) {
    body.innerHTML = `<p style="text-align: center; padding: 30px;">No orders placed yet.</p>`;
    return;
  }
  body.innerHTML = AppState.orders.map(o => `
    <div style="background: var(--bg-ivory); border: 1px solid var(--border-mid); border-radius: 10px; padding: 16px; margin-bottom: 14px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 10px;">
        <div>
          <strong style="font-size: 0.92rem; color: var(--forest-950);">Order #${o.id}</strong>
          <span style="font-size: 0.74rem; color: var(--text-500); margin-left: 8px;">Placed on ${o.date} • ${o.paymentMethod}</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button type="button" class="btn-outline-ivory" style="padding: 5px 10px; font-size: 0.7rem;" onclick="advanceOrderStage('${o.id}')">Simulate Next Tracking Step →</button>
          <button type="button" class="btn-acquire" style="padding: 5px 10px; font-size: 0.7rem;" onclick="window.print()">🖨️ Print GI Invoice</button>
        </div>
      </div>
      <div style="font-size: 0.78rem; color: var(--text-700); margin-bottom: 10px;">
        <strong>Delivery To:</strong> ${o.address} • <strong>Total Paid:</strong> ${formatINR(o.total)}
      </div>
      <div style="margin-bottom: 12px; font-size: 0.8rem;">
        ${o.items.map(i => `<div>• ${i.title} (Qty: ${i.qty}) — <code>${i.giId}</code></div>`).join("")}
      </div>
      <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px;">
        ${TRACKING_STAGES.map((lbl, idx) => {
          const done = idx + 1 <= o.stage;
          return `<div style="padding: 6px 8px; border-radius: 4px; font-size: 0.68rem; font-weight: 700; text-align: center; background: ${done ? "var(--forest-900)" : "#FFF"}; color: ${done ? "var(--gold-400)" : "var(--text-400)"}; border: 1px solid var(--border-light);">${lbl}</div>`;
        }).join("")}
      </div>
    </div>
  `).join("");
}

/* ==========================================================================
   GI Tag / QR Verifier, B2B Wholesale Calculator & Artisan Studio
   ========================================================================== */
function openGiVerifyModal(prefillId) {
  const modal = document.getElementById("gi-verify-modal");
  const inp = document.getElementById("gi-lookup-input");
  if (inp) inp.value = prefillId || "GI-JK-PASH-8821";
  runGiLookup();
  if (modal) modal.classList.add("open");
}

function runGiLookup() {
  const inp = document.getElementById("gi-lookup-input");
  const res = document.getElementById("gi-lookup-result");
  if (!inp || !res) return;
  const code = inp.value.trim().toUpperCase();
  const match = getAllProducts().find(p => p.giId.toUpperCase() === code) || getAllProducts()[0];

  res.innerHTML = `
    <div style="background: var(--forest-50); border: 1px solid var(--forest-700); border-radius: 8px; padding: 14px; margin-top: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-weight: 700; color: var(--forest-900);">✓ CRYPTOGRAPHIC GI SEAL VERIFIED</span>
        <code style="background: var(--forest-900); color: var(--gold-400); padding: 2px 8px; border-radius: 4px;">${match.giId}</code>
      </div>
      <div style="font-size: 0.8rem; display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
        <div><strong>Craft Title:</strong> ${match.title}</div>
        <div><strong>Master Artisan:</strong> ${match.artisan}</div>
        <div><strong>Geo-Tagged Loom:</strong> ${match.district} Cluster, J&K</div>
        <div><strong>Lab Purity Audit:</strong> ${match.purityMetric}</div>
      </div>
    </div>
  `;
}

function openB2BModal() {
  document.getElementById("b2b-modal").classList.add("open");
  updateB2BCalculator();
}

function updateB2BCalculator() {
  const unitPrice = parseInt(document.getElementById("b2b-guild-select")?.value || "58500", 10);
  const qty = parseInt(document.getElementById("b2b-qty-input")?.value || "15", 10);
  const out = document.getElementById("b2b-quote-output");
  if (!out) return;

  let discPct = 12;
  if (qty >= 50) discPct = 25;
  else if (qty >= 25) discPct = 18;

  const gross = unitPrice * qty;
  const net = Math.round(gross * (1 - discPct / 100));
  out.innerHTML = `
    <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 4px;">
      <span>Standard Guild Valuation (${qty} units):</span>
      <span>${formatINR(gross)}</span>
    </div>
    <div style="display: flex; justify-content: space-between; font-size: 0.82rem; color: var(--success-600); margin-bottom: 4px;">
      <span>Hospitality / Trade Tier Discount (${discPct}%):</span>
      <span>− ${formatINR(gross - net)}</span>
    </div>
    <div style="display: flex; justify-content: space-between; font-size: 1.05rem; font-weight: 700; color: var(--forest-950); border-top: 1px solid var(--border-mid); padding-top: 6px;">
      <span>Estimated B2B Lot Total (Includes Batch GI Export Seals):</span>
      <span>${formatINR(net)}</span>
    </div>
  `;
}

function submitB2BQuote(e) {
  e.preventDefault();
  const firm = document.getElementById("b2b-firm-name").value.trim();
  const email = document.getElementById("b2b-firm-email").value.trim();
  if (!firm || !email) return;
  AppState.b2bQuotes.push({ firm, email, date: "15 Nov 2026" });
  saveStorage("hunarlink_b2b_quotes", AppState.b2bQuotes);
  closeModal("b2b-modal");
  showToast(`Wholesale Trade Dossier & GI Lot Quote sent for ${firm}`);
}

function openCommissionModal() {
  document.getElementById("custom-commission-modal").classList.add("open");
}

function submitCustomCommission(e) {
  e.preventDefault();
  closeModal("custom-commission-modal");
  showToast("Custom Loom Commission logged with Master Ghulam Qadir Mir's Srinagar workshop");
}

/* Artisan Studio Seller Listing Simulator */
function openArtisanStudioModal() {
  document.getElementById("artisan-studio-modal").classList.add("open");
}

function simulateVoiceAutoFill() {
  document.getElementById("studio-title").value = "Pampore Saffron-Dyed Kani Pashmina Shawl";
  document.getElementById("studio-guild").value = "pashmina";
  document.getElementById("studio-artisan").value = "Ustad Ghulam Nabi Dar";
  document.getElementById("studio-district").value = "Srinagar";
  document.getElementById("studio-price").value = "64000";
  document.getElementById("studio-mrp").value = "75000";
  document.getElementById("studio-hours").value = "540";
  document.getElementById("studio-purity").value = "14.1 Micron Ladakhi Fleece • Natural Saffron Dye";
  showToast("🎙️ Voice-to-Listing (Kashmiri/Urdu Assist) populated craft specifications!");
}

function submitNewArtisanCraft(e) {
  e.preventDefault();
  const title = document.getElementById("studio-title").value.trim();
  const guild = document.getElementById("studio-guild").value;
  const artisan = document.getElementById("studio-artisan").value.trim();
  const district = document.getElementById("studio-district").value;
  const price = parseInt(document.getElementById("studio-price").value, 10) || 45000;
  const mrp = parseInt(document.getElementById("studio-mrp").value, 10) || Math.round(price * 1.18);
  const loomHours = parseInt(document.getElementById("studio-hours").value, 10) || 320;
  const purityMetric = document.getElementById("studio-purity").value.trim();

  const guildLabels = {
    "pashmina": "Pashmina & Kani Guild",
    "silk-rugs": "Silk-on-Silk Rugs",
    "walnut": "Walnut Woodcarving",
    "papier-mache": "Papier-Mâché Art",
    "sozni": "Kani Jamawar & Sozni"
  };
  const guildImg = {
    "pashmina": IMG_MAP.khudrang,
    "silk-rugs": IMG_MAP.silkrug,
    "walnut": IMG_MAP.walnut,
    "papier-mache": IMG_MAP.papier,
    "sozni": IMG_MAP.jamawar
  };

  const newCraft = {
    id: "hl-custom-" + Date.now(),
    title,
    guild,
    guildLabel: guildLabels[guild] || "Valley Craft Guild",
    artisan,
    district,
    price,
    mrp,
    rating: 5.0,
    reviewCount: 1,
    giId: "GI-JK-" + Math.floor(1000 + Math.random() * 9000),
    giLevel: 3,
    purityMetric: purityMetric || "100% GI Lab Verified Craft",
    loomHours,
    dimensions: "Custom Artisan Standard",
    stock: 2,
    image: guildImg[guild] || IMG_MAP.jamawar,
    description: `Newly authenticated heirloom piece listed directly from ${artisan}'s workshop in ${district}, Jammu & Kashmir.`
  };

  AppState.customProducts.unshift(newCraft);
  saveStorage("hunarlink_custom_products", AppState.customProducts);
  closeModal("artisan-studio-modal");
  resetAllFilters();
  const el = document.getElementById("marketplace-section");
  if (el) el.scrollIntoView({ behavior: "smooth" });
  showToast(`Verified & Published "${title}" (${newCraft.giId}) to Live Marketplace!`);
}

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove("open");
}

function resetDemoStorage() {
  try {
    [
      "hunarlink_custom_products", "hunarlink_cart", "hunarlink_saved_later",
      "hunarlink_wishlist", "hunarlink_coupon", "hunarlink_addresses",
      "hunarlink_orders", "hunarlink_reviews", "hunarlink_b2b_quotes"
    ].forEach(k => window.localStorage.removeItem(k));
  } catch (err) {}
  AppState.customProducts = [];
  AppState.cart = [{ productId: "hl-pash-001", qty: 1 }];
  AppState.savedLater = [];
  AppState.wishlist = ["hl-kani-004", "hl-papr-003"];
  AppState.appliedCoupon = null;
  updateHeaderBadges();
  resetAllFilters();
  showToast("Demo data restored to initial HunarLink catalog state");
}

/* ==========================================================================
   DOM Initialization & Event Listeners
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  updateHeaderBadges();
  renderMarketplace();
  renderCompareBar();

  /* Live Search Autocomplete */
  const searchInput = document.getElementById("global-search-input");
  const clearBtn = document.getElementById("search-clear-btn");
  const dropdown = document.getElementById("search-suggestions");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const val = searchInput.value;
      AppState.filters.search = val;
      if (clearBtn) clearBtn.classList.toggle("visible", val.length > 0);
      renderMarketplace();

      if (!dropdown) return;
      if (val.trim().length < 1) {
        dropdown.classList.remove("open");
        return;
      }
      const matches = getFilteredProducts().slice(0, 5);
      if (matches.length === 0) {
        dropdown.innerHTML = `<div style="padding: 10px 12px; font-size: 0.78rem; color: var(--text-500);">No matching crafts for "${val}"</div>`;
      } else {
        dropdown.innerHTML = matches.map(p => `
          <button type="button" class="suggestion-item" onclick="openProductModal('${p.id}'); document.getElementById('search-suggestions').classList.remove('open');">
            <img src="${p.image}" class="suggestion-thumb" alt="${p.title}">
            <div class="suggestion-meta">
              <div class="suggestion-title">${p.title}</div>
              <div class="suggestion-sub">${p.artisan} • ${p.giId}</div>
            </div>
            <div class="suggestion-price">${formatINR(p.price)}</div>
          </button>
        `).join("");
      }
      dropdown.classList.add("open");
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      clearBtn.classList.remove("visible");
      if (dropdown) dropdown.classList.remove("open");
      AppState.filters.search = "";
      renderMarketplace();
    });
  }

  /* Filter Bar Listeners */
  const priceSlider = document.getElementById("price-range-slider");
  const priceVal = document.getElementById("price-slider-val");
  if (priceSlider) {
    priceSlider.addEventListener("input", () => {
      const v = parseInt(priceSlider.value, 10);
      AppState.filters.maxPrice = v;
      if (priceVal) priceVal.textContent = "Up to " + formatINR(v);
      renderMarketplace();
    });
  }

  const ratingFilter = document.getElementById("rating-filter");
  if (ratingFilter) {
    ratingFilter.addEventListener("change", () => {
      AppState.filters.minRating = parseFloat(ratingFilter.value) || 0;
      renderMarketplace();
    });
  }

  const giFilter = document.getElementById("gi-tier-filter");
  if (giFilter) {
    giFilter.addEventListener("change", () => {
      AppState.filters.giTier = parseInt(giFilter.value, 10) || 0;
      renderMarketplace();
    });
  }

  const distFilter = document.getElementById("district-filter");
  if (distFilter) {
    distFilter.addEventListener("change", () => {
      AppState.filters.district = distFilter.value;
      renderMarketplace();
    });
  }

  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      AppState.filters.sortBy = sortSelect.value;
      renderMarketplace();
    });
  }

  /* Profile Menu Toggle */
  const profBtn = document.getElementById("profile-menu-btn");
  const profMenu = document.getElementById("profile-menu");
  if (profBtn && profMenu) {
    profBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      profMenu.classList.toggle("open");
    });
    document.addEventListener("click", () => profMenu.classList.remove("open"));
  }

  /* Newsletter Submit */
  const newsForm = document.getElementById("newsletter-form");
  if (newsForm) {
    newsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInp = document.getElementById("newsletter-email");
      if (emailInp && emailInp.value.trim()) {
        showToast(`Subscribed ${emailInp.value.trim()} to The Valley Chronicle!`);
        emailInp.value = "";
      }
    });
  }
});

  