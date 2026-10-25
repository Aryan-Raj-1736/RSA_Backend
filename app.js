/**
 * RSA Creations - Client-side Interactive Logic
 * Connected to Render Production Backend
 */

// Backend Base URL (Auto-detects localhost or Render Cloud Service)
const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:')
  ? 'http://localhost:5000'
  : 'https://rsa-backend-74v7.onrender.com';


// Handcrafted Product Catalog (Default INR Prices)
const PRODUCTS = [
  {
    id: 'rsa-1',
    name: 'Raw Glaze Ceramic Earth Mug',
    category: 'pottery',
    categoryLabel: 'Pottery & Ceramics',
    price: 650,
    rating: 4.9,
    reviewsCount: 38,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80',
    description: 'Individually hand-thrown on the potter’s wheel with iron-rich clay and reactive ash glaze.',
    materials: 'High-fire stoneware clay, non-toxic mineral glaze',
    dimensions: '3.6" Diameter x 4.2" Height (350 ml capacity)',
    method: 'Wheel-thrown & reduction fired at cone 10'
  },
  {
    id: 'rsa-2',
    name: 'Handwoven Jute & Wool Tapestry',
    category: 'textiles',
    categoryLabel: 'Handwoven Textiles',
    price: 1850,
    rating: 5.0,
    reviewsCount: 24,
    badge: 'Artisan Pick',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80',
    description: 'Loom-woven tapestry blending raw organic Bengal jute with soft wool yarn on an oak dowel.',
    materials: '100% Unbleached Bengal jute, cruelty-free yarn, oak dowel',
    dimensions: '18" Width x 32" Total Length',
    method: 'Traditional wooden frame loom weaving with macramé knots'
  },
  {
    id: 'rsa-3',
    name: 'Terracotta Fluted Footed Planter',
    category: 'pottery',
    categoryLabel: 'Pottery & Ceramics',
    price: 850,
    rating: 4.8,
    reviewsCount: 42,
    badge: 'Handmade',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80',
    description: 'Porous native terracotta hand-fluted to provide optimal aeration for house plant roots.',
    materials: 'Native Bengal terracotta clay',
    dimensions: '6.5" Diameter x 7" Height',
    method: 'Hand-pressed molds with hand-carved exterior fluting'
  },
  {
    id: 'rsa-4',
    name: 'Hand-Carved Reclaimed Teak Bowl',
    category: 'decor',
    categoryLabel: 'Home Accents',
    price: 1450,
    rating: 4.9,
    reviewsCount: 19,
    badge: 'Limited Drop',
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=700&q=80',
    description: 'Carved from reclaimed solid teak roots with live natural edges and hand-rubbed organic beeswax.',
    materials: 'Salvaged solid teak root, organic walnut oil finish',
    dimensions: 'Approx 9" - 10" Diameter x 3.5" Depth',
    method: 'Hand chiseling along organic natural wood grain'
  },
  {
    id: 'rsa-5',
    name: 'Wild Honey & Mountain Sage Beeswax Candles',
    category: 'decor',
    categoryLabel: 'Home Accents',
    price: 699,
    rating: 4.7,
    reviewsCount: 51,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80',
    description: 'Duo of hand-poured golden beeswax candles scented with wild sage and mountain honey.',
    materials: '100% Pure beeswax, essential oils, cotton wick',
    dimensions: 'Pair of 200g reusable amber jars (45+ hrs burn time)',
    method: 'Small-batch double boiler hand-pouring'
  },
  {
    id: 'rsa-6',
    name: 'Macramé Tiered Floating Plant Shelf',
    category: 'textiles',
    categoryLabel: 'Handwoven Textiles',
    price: 950,
    rating: 4.9,
    reviewsCount: 29,
    badge: 'Handmade',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80',
    description: 'Intricately knotted with heavy-duty 4mm natural cotton cord, supporting a solid circular pine wood tier.',
    materials: '4mm Twisted natural cotton rope, untreated pine wood tier',
    dimensions: '42" Total Hanging Length; 9" Shelf Diameter',
    method: 'Hand knotting using square knots and spiral twists'
  },
  {
    id: 'rsa-7',
    name: 'Botanical Block-Printed Table Runner',
    category: 'textiles',
    categoryLabel: 'Handwoven Textiles',
    price: 890,
    rating: 4.8,
    reviewsCount: 16,
    badge: 'Artisan Pick',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80',
    description: 'Hand-stamped using carved rosewood blocks and natural vegetable dyes on dense unbleached cotton.',
    materials: '100% Slub cotton fabric, natural plant dyes',
    dimensions: '14" Width x 72" Length',
    method: 'Hand-carved wooden block printing by artisan guilds'
  },
  {
    id: 'rsa-8',
    name: 'Hammered Brass Sunburst Drop Earrings',
    category: 'accessories',
    categoryLabel: 'Handmade Jewelry',
    price: 750,
    rating: 5.0,
    reviewsCount: 33,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80',
    description: 'Forged from raw solid brass sheet with distinctive dappled hammer marks that reflect candlelight.',
    materials: 'Raw jewelers brass, hypoallergenic 14k gold-plated ear wires',
    dimensions: '2.2" Drop Length x 1.2" Width',
    method: 'Hand-sawed, textured with cross-peen jeweler hammers'
  }
];

// App State Management
const state = {
  products: [...PRODUCTS],
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  cart: JSON.parse(localStorage.getItem('rsa_cart_inr') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('rsa_wishlist') || '[]'),
  promoApplied: false,
  promoDiscount: 0.10, // 10%
  promoCode: 'HANDMADE10',
  freeShippingThreshold: 0,
  deliveryLocation: 'kolkata', // 'kolkata' (FREE), 'wb' (₹100), 'india' (₹150)
  deliveryCharge: 0,
  deliveryRegionName: 'Kolkata (Free Delivery)',
  deliveryTimeline: '7 to 10 business days',
  estimatedDates: '',
  currentUser: JSON.parse(localStorage.getItem('rsa_user') || 'null')
};

let lastConfirmedOrder = null;

// DOM Selectors
const productGrid = document.getElementById('productGrid');
const productCount = document.getElementById('productCount');
const categoryPills = document.getElementById('categoryPills');
const sortSelect = document.getElementById('sortSelect');
const headerSearchInput = document.getElementById('headerSearchInput');
const searchSubmitBtn = document.getElementById('searchSubmitBtn');
const emptyState = document.getElementById('emptyState');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');

// Cart DOM
const cartDrawer = document.getElementById('cartDrawer');
const cartOpenBtn = document.getElementById('cartOpenBtn');
const cartCloseBtn = document.getElementById('cartCloseBtn');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartBadge = document.getElementById('cartBadge');
const cartDrawerCount = document.getElementById('cartDrawerCount');
const cartItemsList = document.getElementById('cartItemsList');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartShipping = document.getElementById('cartShipping');
const cartShippingLabel = document.getElementById('cartShippingLabel');
const cartTotal = document.getElementById('cartTotal');
const discountRow = document.getElementById('discountRow');
const cartDiscount = document.getElementById('cartDiscount');
const promoInput = document.getElementById('promoInput');
const applyPromoBtn = document.getElementById('applyPromoBtn');
const promoDiscountBadge = document.getElementById('promoDiscountBadge');
const removePromoBtn = document.getElementById('removePromoBtn');
const trackerFill = document.getElementById('trackerFill');
const freeShippingText = document.getElementById('freeShippingText');
const checkoutBtn = document.getElementById('checkoutBtn');
const continueShoppingBtn = document.getElementById('continueShoppingBtn');
const cartDestinationSelect = document.getElementById('cartDestinationSelect');

// Wishlist DOM
const wishlistBadge = document.getElementById('wishlistBadge');

// Quick View Dialog
const quickViewDialog = document.getElementById('quickViewDialog');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalProductImage = document.getElementById('modalProductImage');
const modalProductBadge = document.getElementById('modalProductBadge');
const modalProductCategory = document.getElementById('modalProductCategory');
const modalProductTitle = document.getElementById('modalProductTitle');
const modalProductRating = document.getElementById('modalProductRating');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalProductDescription = document.getElementById('modalProductDescription');
const modalProductMaterials = document.getElementById('modalProductMaterials');
const modalProductDimensions = document.getElementById('modalProductDimensions');
const modalProductMethod = document.getElementById('modalProductMethod');
const modalQtyInput = document.getElementById('modalQtyInput');
const modalQtyMinus = document.getElementById('modalQtyMinus');
const modalQtyPlus = document.getElementById('modalQtyPlus');
const modalAddToCartBtn = document.getElementById('modalAddToCartBtn');

// Checkout Dialog
const checkoutDialog = document.getElementById('checkoutDialog');
const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutSubtotal = document.getElementById('checkoutSubtotal');
const checkoutDeliveryFee = document.getElementById('checkoutDeliveryFee');
const checkoutTotalAmount = document.getElementById('checkoutTotalAmount');
const checkoutRegionTag = document.getElementById('checkoutRegionTag');
const checkoutDeliveryDates = document.getElementById('checkoutDeliveryDates');
const custCity = document.getElementById('custCity');
const custZip = document.getElementById('custZip');

// Success Dialog
const successDialog = document.getElementById('successDialog');
const successCloseBtn = document.getElementById('successCloseBtn');
const successOrderNumber = document.getElementById('successOrderNumber');

// Fullscreen Invoice Dialog
const fullInvoiceDialog = document.getElementById('fullInvoiceDialog');

// Auth & User Account DOM
const accountHeaderBtn = document.getElementById('accountHeaderBtn');
const accountLabel = document.getElementById('accountLabel');
const authDialog = document.getElementById('authDialog');
const authCloseBtn = document.getElementById('authCloseBtn');
const authDialogTitle = document.getElementById('authDialogTitle');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginIdentifier = document.getElementById('loginIdentifier');
const loginPassword = document.getElementById('loginPassword');
const loginError = document.getElementById('loginError');
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupMobile = document.getElementById('signupMobile');
const signupPassword = document.getElementById('signupPassword');
const signupError = document.getElementById('signupError');

// OTP Login DOM
const otpLoginTab = document.getElementById('otpLoginTab');
const otpLoginForm = document.getElementById('otpLoginForm');
const otpLoginIdentifier = document.getElementById('otpLoginIdentifier');
const sendLoginOtpBtn = document.getElementById('sendLoginOtpBtn');
const loginOtpGroup = document.getElementById('loginOtpGroup');
const loginOtpCode = document.getElementById('loginOtpCode');
const resendLoginOtpBtn = document.getElementById('resendLoginOtpBtn');
const verifyLoginOtpBtn = document.getElementById('verifyLoginOtpBtn');
const otpLoginError = document.getElementById('otpLoginError');
const otpLoginSuccess = document.getElementById('otpLoginSuccess');
const loginViaOtpLink = document.getElementById('loginViaOtpLink');
const backToPasswordLoginLink = document.getElementById('backToPasswordLoginLink');

// Recovery / Forgot Password DOM
const recoveryTab = document.getElementById('recoveryTab');
const recoveryForm = document.getElementById('recoveryForm');
const recoveryMobile = document.getElementById('recoveryMobile');
const findAccountBtn = document.getElementById('findAccountBtn');
const recoveredAccountCard = document.getElementById('recoveredAccountCard');
const recoveredUserId = document.getElementById('recoveredUserId');
const recoveredName = document.getElementById('recoveredName');
const recoveredEmail = document.getElementById('recoveredEmail');
const recoveredMobileDisplay = document.getElementById('recoveredMobileDisplay');
const recoveryOtpGroup = document.getElementById('recoveryOtpGroup');
const recoveryOtpCode = document.getElementById('recoveryOtpCode');
const newPasswordGroup = document.getElementById('newPasswordGroup');
const newRecoveryPassword = document.getElementById('newRecoveryPassword');
const confirmRecoveryPassword = document.getElementById('confirmRecoveryPassword');
const recoveryError = document.getElementById('recoveryError');
const recoverySuccess = document.getElementById('recoverySuccess');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const backToLoginLink = document.getElementById('backToLoginLink');
const copyUpiBtn = document.getElementById('copyUpiBtn');

// Address Dialog DOM
const addressDialog = document.getElementById('addressDialog');
const addressCloseBtn = document.getElementById('addressCloseBtn');
const addressForm = document.getElementById('addressForm');
const addrStreet = document.getElementById('addrStreet');
const addrCity = document.getElementById('addrCity');
const addrPincode = document.getElementById('addrPincode');
const addrState = document.getElementById('addrState');
const addressError = document.getElementById('addressError');
const savedAddressesList = document.getElementById('savedAddressesList');
const addressCards = document.getElementById('addressCards');

// User Dropdown DOM
const userDropdown = document.getElementById('userDropdown');
const dropdownAvatar = document.getElementById('dropdownAvatar');
const dropdownName = document.getElementById('dropdownName');
const dropdownContact = document.getElementById('dropdownContact');
const dropdownAddressBtn = document.getElementById('dropdownAddressBtn');
const dropdownOrdersBtn = document.getElementById('dropdownOrdersBtn');
const dropdownLogoutBtn = document.getElementById('dropdownLogoutBtn');
const dropdownLoginModalBtn = document.getElementById('dropdownLoginModalBtn');
const mobileNavLoginBtn = document.getElementById('mobileNavLoginBtn');

// Mobile Nav
const mobileNavToggle = document.getElementById('mobileNavToggle');
const mainNav = document.getElementById('mainNav');

// Newsletter
const newsletterForm = document.getElementById('newsletterForm');

let currentActiveQuickViewProduct = null;

// ==========================================================================
// Calculate Dynamic 7-10 Days Delivery Range
// ==========================================================================
function computeDeliveryDateRange() {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 7);

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 10);

  const options = { month: 'short', day: 'numeric' };
  const formatted = `${minDate.toLocaleDateString('en-IN', options)} - ${maxDate.toLocaleDateString('en-IN', options)}`;
  state.estimatedDates = formatted;
  if (checkoutDeliveryDates) {
    checkoutDeliveryDates.textContent = formatted;
  }
}

// ==========================================================================
// Light-Dismiss Fallback for Native <dialog> (Modern Web Guidance compliance)
// ==========================================================================
function setupDialogLightDismiss(dialogElement) {
  if (dialogElement && !('closedBy' in HTMLDialogElement.prototype)) {
    dialogElement.addEventListener('click', (event) => {
      if (event.target !== dialogElement) return;

      const rect = dialogElement.getBoundingClientRect();
      const isDialogContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );

      if (isDialogContent) return;
      dialogElement.close();
    });
  }
}

setupDialogLightDismiss(quickViewDialog);
setupDialogLightDismiss(checkoutDialog);
setupDialogLightDismiss(successDialog);
setupDialogLightDismiss(addressDialog);
setupDialogLightDismiss(fullInvoiceDialog);

// ==========================================================================
// Safe HTML Escaping Helper
// ==========================================================================
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==========================================================================
// Customer Auth & Address Management Helpers
// ==========================================================================

function autofillCheckoutFromUser() {
  if (!state.currentUser) return;
  const nameParts = (state.currentUser.name || '').trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const custFirstName = document.getElementById('custFirstName');
  const custLastName = document.getElementById('custLastName');
  const custPhone = document.getElementById('custPhone');
  const custEmail = document.getElementById('custEmail');
  const custAddress = document.getElementById('custAddress');

  if (custFirstName && firstName) custFirstName.value = firstName;
  if (custLastName && lastName) custLastName.value = lastName;
  if (custPhone && state.currentUser.mobile) custPhone.value = state.currentUser.mobile;
  if (custEmail && state.currentUser.email) custEmail.value = state.currentUser.email;

  const defaultAddr = (state.currentUser.addresses && state.currentUser.addresses.find(a => a.isDefault)) ||
                      (state.currentUser.addresses && state.currentUser.addresses[0]);

  if (defaultAddr) {
    if (custAddress) custAddress.value = defaultAddr.address || '';
    if (custCity) custCity.value = defaultAddr.city || '';
    if (custZip) custZip.value = defaultAddr.pincode || '';
    updateShippingCalculation(defaultAddr.city, defaultAddr.pincode, defaultAddr.state);
  }
}

function updateAuthUI() {
  const mobileLogin = document.getElementById('mobileNavLoginBtn');
  if (state.currentUser) {
    const firstName = (state.currentUser.name || 'User').split(' ')[0];
    if (accountLabel) accountLabel.textContent = firstName;
    if (mobileLogin) mobileLogin.textContent = `👤 ${firstName} (My Account)`;
    if (dropdownAvatar) dropdownAvatar.textContent = (state.currentUser.name[0] || 'U').toUpperCase();
    if (dropdownName) dropdownName.textContent = state.currentUser.name;
    if (dropdownContact) dropdownContact.textContent = state.currentUser.email || state.currentUser.mobile || 'Customer';
    autofillCheckoutFromUser();
  } else {
    if (accountLabel) accountLabel.textContent = 'Login';
    if (mobileLogin) mobileLogin.textContent = '👤 Login / Sign Up';
    if (userDropdown) userDropdown.style.display = 'none';
  }
}

function switchAuthTab(tab) {
  const allTabs = [loginTab, otpLoginTab, signupTab, recoveryTab];
  const allForms = [
    { el: loginForm },
    { el: otpLoginForm },
    { el: signupForm },
    { el: recoveryForm }
  ];
  allTabs.forEach(t => { if (t) t.classList.remove('active'); });
  allForms.forEach(f => { if (f.el) f.el.style.display = 'none'; });

  if (tab === 'login') {
    if (loginTab) loginTab.classList.add('active');
    if (loginForm) loginForm.style.display = 'flex';
    if (authDialogTitle) authDialogTitle.textContent = 'Login with Password';
  } else if (tab === 'otpLogin') {
    if (otpLoginTab) otpLoginTab.classList.add('active');
    if (otpLoginForm) otpLoginForm.style.display = 'flex';
    if (authDialogTitle) authDialogTitle.textContent = 'Instant Login via OTP 📲';
  } else if (tab === 'signup') {
    if (signupTab) signupTab.classList.add('active');
    if (signupForm) signupForm.style.display = 'flex';
    if (authDialogTitle) authDialogTitle.textContent = 'Create Customer Account';
  } else if (tab === 'recovery') {
    if (recoveryTab) recoveryTab.classList.add('active');
    if (recoveryForm) recoveryForm.style.display = 'flex';
    if (authDialogTitle) authDialogTitle.textContent = 'Recover Account / Reset Password';
  }

  // Hide all error/success messages
  [loginError, signupError, recoveryError, recoverySuccess, otpLoginError, otpLoginSuccess].forEach(el => {
    if (el) el.style.display = 'none';
  });
}

function openAuthModal(mode = 'login') {
  try {
    switchAuthTab(mode);
    if (userDropdown) userDropdown.style.display = 'none';
    const dlg = authDialog || document.getElementById('authDialog');
    if (!dlg) return;

    if (dlg.open) {
      try { dlg.close(); } catch (e) {}
    }

    if (typeof dlg.showModal === 'function') {
      try {
        dlg.showModal();
        return;
      } catch (err) {
        console.warn('showModal call failed, falling back:', err);
      }
    }
    dlg.setAttribute('open', '');
    dlg.style.display = 'block';
  } catch (err) {
    console.warn('openAuthModal fallback:', err);
    const dlg = authDialog || document.getElementById('authDialog');
    if (dlg) {
      dlg.setAttribute('open', '');
      dlg.style.display = 'block';
    }
  }
}

// Global window helpers so button clicks never fail
window.openAuthModal = openAuthModal;
window.closeAuthModal = function(e) {
  if (e) {
    try { e.preventDefault(); } catch (err) {}
  }
  const dlg = authDialog || document.getElementById('authDialog');
  if (!dlg) return;
  try {
    if (dlg.open) dlg.close();
  } catch (err) {}
  dlg.removeAttribute('open');
  dlg.style.display = 'none';
};

window.handleAccountBtnClick = function(e) {
  if (e) {
    try {
      e.preventDefault();
      e.stopPropagation();
    } catch (err) {}
  }
  const user = state.currentUser || JSON.parse(localStorage.getItem('rsa_user') || 'null');
  if (user) {
    const isVisible = userDropdown && userDropdown.style.display === 'flex';
    if (userDropdown) userDropdown.style.display = isVisible ? 'none' : 'flex';
  } else {
    window.openAuthModal('login');
  }
};

function renderSavedAddresses() {
  if (!addressCards) return;
  const addresses = (state.currentUser && state.currentUser.addresses) || [];
  if (addresses.length === 0) {
    savedAddressesList.style.display = 'none';
    return;
  }
  savedAddressesList.style.display = 'block';
  addressCards.innerHTML = addresses.map((addr, idx) => `
    <div class="address-card ${addr.isDefault ? 'active-address' : ''}">
      <div>
        <strong>${escapeHtml(addr.address)}</strong><br>
        <span>${escapeHtml(addr.city)}, ${escapeHtml(addr.state || '')} - <strong>${escapeHtml(addr.pincode)}</strong></span>
        ${addr.isDefault ? '<span class="address-tag">Default Delivery</span>' : ''}
      </div>
      ${!addr.isDefault ? `<button type="button" class="btn btn-secondary set-default-addr-btn" data-index="${idx}" style="padding: 4px 8px; font-size: 0.75rem;">Set Default</button>` : ''}
    </div>
  `).join('');
}

function openAddressModal() {
  if (userDropdown) userDropdown.style.display = 'none';
  if (addressError) addressError.style.display = 'none';
  renderSavedAddresses();
  addressDialog.showModal();
}

// ==========================================================================
// Backend API Integration
// ==========================================================================

async function fetchProductsFromBackend() {
  try {
    const res = await fetch(`${API_BASE}/api/products`);
    if (res.ok) {
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        state.products = data.products;
        renderProducts();
      }
    }
  } catch (err) {
    console.log('Using local catalog, backend offline:', err.message);
  }
}

// Calculate shipping from backend API or local logic
async function updateShippingCalculation(city = 'Kolkata', pincode = '700001', stateName = 'West Bengal') {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  try {
    const response = await fetch(`${API_BASE}/api/shipping/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city, pincode, state: stateName, subtotal })
    });

    if (response.ok) {
      const data = await response.json();
      state.deliveryCharge = data.deliveryCharge;
      state.deliveryRegionName = data.region;
      state.deliveryTimeline = data.estimatedDeliveryDays || (data.timeline && data.timeline.daysRange) || '7 to 10 business days';
      state.estimatedDates = data.estimatedDateRange || (data.timeline && data.timeline.estimatedArrival) || state.estimatedDates;

      if (checkoutRegionTag) checkoutRegionTag.textContent = `📍 Detected: ${data.region}`;
      if (checkoutDeliveryDates) checkoutDeliveryDates.textContent = state.estimatedDates;
      updateCartUI();
      updatePreOrderInvoice();
      return;
    }
  } catch (e) {
    // Local fallback calculation if backend is unavailable
  }

  // Fallback local rule:
  const cityClean = (city || '').trim().toLowerCase();
  const pinClean = (pincode || '').trim();
  const stateClean = (stateName || '').trim().toLowerCase();

  const isKolkata = cityClean.includes('kolkata') || cityClean.includes('calcutta') || pinClean.startsWith('700');
  const isWB = stateClean.includes('bengal') || pinClean.startsWith('71') || pinClean.startsWith('72') || pinClean.startsWith('73') || pinClean.startsWith('74');

  if (isKolkata) {
    state.deliveryCharge = 0; // FREE Delivery for Kolkata!
    state.deliveryRegionName = 'Kolkata (Free Delivery)';
  } else if (isWB) {
    state.deliveryCharge = 100; // Flat ₹100 for West Bengal outside Kolkata
    state.deliveryRegionName = 'West Bengal (Outside Kolkata)';
  } else {
    state.deliveryCharge = 150; // Flat ₹150 for outside Bengal (Rest of India)
    state.deliveryRegionName = 'Outside Bengal (Rest of India)';
  }

  if (checkoutRegionTag) checkoutRegionTag.textContent = `📍 Detected: ${state.deliveryRegionName}`;
  updateCartUI();
  updatePreOrderInvoice();
}

// ==========================================================================
// Core Render Functions
// ==========================================================================

function getFilteredProducts() {
  let list = [...state.products];

  // Category Filter
  if (state.selectedCategory !== 'all') {
    list = list.filter(p => p.category === state.selectedCategory);
  }

  // Search Filter
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q)
    );
  }

  // Sort
  if (state.sortBy === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating-desc') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (state.sortBy === 'name-asc') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  return list;
}

function renderProducts() {
  const filtered = getFilteredProducts();
  productCount.textContent = filtered.length;

  if (filtered.length === 0) {
    productGrid.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  productGrid.innerHTML = filtered.map(product => {
    const isWishlisted = state.wishlist.includes(product.id);
    return `
      <article class="product-card" data-id="${product.id}">
        <div class="card-image-wrap">
          <img src="${product.image}" alt="${product.name} crafted by RSA Creations" loading="lazy">
          <span class="product-badge">${product.badge}</span>
          <button 
            type="button" 
            class="card-wishlist-btn ${isWishlisted ? 'active' : ''}" 
            data-id="${product.id}" 
            aria-label="${isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button type="button" class="card-quick-view-btn" data-id="${product.id}">
            Quick View
          </button>
        </div>

        <div class="card-content">
          <span class="card-category">${product.categoryLabel}</span>
          <h3 class="card-title">${product.name}</h3>
          <div class="card-rating">
            ★★★★★ <span>(${product.rating})</span>
          </div>

          <div class="card-footer">
            <span class="card-price">₹${product.price.toLocaleString('en-IN')}</span>
            <button type="button" class="add-cart-btn" data-id="${product.id}">
              Add to Basket
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ==========================================================================
// Cart Logic & Drawer
// ==========================================================================

function saveCart() {
  localStorage.setItem('rsa_cart_inr', JSON.stringify(state.cart));
  updateCartUI();
}

function updateCartUI() {
  const totalItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalItemCount;
  cartDrawerCount.textContent = `(${totalItemCount} ${totalItemCount === 1 ? 'item' : 'items'})`;

  // Render Cart Item Rows
  if (state.cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="cart-empty-message">
        <p style="font-size: 2.2rem; margin-bottom: 8px;">🧺</p>
        <h4>Your basket is currently empty</h4>
        <p style="font-size: 0.85rem; margin-top: 4px;">Explore our handcrafted creations for your living space.</p>
      </div>
    `;
    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = '0.5';
    checkoutBtn.style.cursor = 'not-allowed';
  } else {
    checkoutBtn.disabled = false;
    checkoutBtn.style.opacity = '1';
    checkoutBtn.style.cursor = 'pointer';

    cartItemsList.innerHTML = state.cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
          <div class="cart-item-qty">
            <button type="button" class="qty-btn-mini btn-decrement" data-id="${item.id}">-</button>
            <span class="qty-number">${item.quantity}</span>
            <button type="button" class="qty-btn-mini btn-increment" data-id="${item.id}">+</button>
          </div>
        </div>
        <button type="button" class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">&times;</button>
      </div>
    `).join('');
  }

  // Calculate Subtotal in INR
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartSubtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  if (checkoutSubtotal) checkoutSubtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

  // Free shipping & Regional Delivery Policy
  // Policy: Kolkata = FREE (₹0), West Bengal = ₹100, Outside Bengal = ₹150
  const isKolkata = (state.deliveryRegionName || '').toLowerCase().includes('kolkata');
  const isWb = (state.deliveryRegionName || '').toLowerCase().includes('bengal');
  let effectiveShipping = state.deliveryCharge;

  if (isKolkata) {
    trackerFill.style.width = '100%';
    freeShippingText.innerHTML = '🎉 <strong>Kolkata Special: FREE Doorstep Delivery (₹0)!</strong>';
    cartShipping.textContent = 'FREE';
    cartShipping.style.color = 'var(--color-sage)';
    effectiveShipping = 0;
  } else if (isWb) {
    trackerFill.style.width = '100%';
    freeShippingText.innerHTML = '📍 <strong>West Bengal: Flat ₹100 Delivery</strong> (Free in Kolkata only)';
    cartShipping.textContent = subtotal === 0 ? '₹0' : '₹100';
    cartShipping.style.color = 'var(--text-main)';
    effectiveShipping = 100;
  } else {
    trackerFill.style.width = '100%';
    freeShippingText.innerHTML = '📍 <strong>Outside Bengal: Flat ₹150 Delivery</strong> (Free in Kolkata only)';
    cartShipping.textContent = subtotal === 0 ? '₹0' : '₹150';
    cartShipping.style.color = 'var(--text-main)';
    effectiveShipping = 150;
  }

  // Label based on destination
  if (cartShippingLabel) {
    cartShippingLabel.textContent = isKolkata ? 'Delivery (Kolkata FREE)' : `Delivery (${state.deliveryRegionName.split(' ')[0]})`;
  }
  if (checkoutDeliveryFee) {
    checkoutDeliveryFee.textContent = effectiveShipping === 0 ? 'FREE (₹0)' : `₹${effectiveShipping}`;
  }

  // Discount Calculation (Promo code HANDMADE10 for 10% off)
  let discountAmount = 0;
  if (state.promoApplied && subtotal > 0) {
    discountAmount = Math.round(subtotal * state.promoDiscount);
    discountRow.style.display = 'flex';
    cartDiscount.textContent = `-₹${discountAmount.toLocaleString('en-IN')}`;
    promoDiscountBadge.style.display = 'flex';
  } else {
    discountRow.style.display = 'none';
    promoDiscountBadge.style.display = 'none';
  }

  // Calculate Final Total in INR
  const grandTotal = Math.max(0, subtotal - discountAmount + (subtotal === 0 ? 0 : effectiveShipping));
  const formattedTotal = `₹${grandTotal.toLocaleString('en-IN')}`;
  cartTotal.textContent = formattedTotal;
  if (checkoutTotalAmount) {
    checkoutTotalAmount.textContent = formattedTotal;
  }
  const placeOrderAmountBadge = document.getElementById('placeOrderAmountBadge');
  if (placeOrderAmountBadge) {
    placeOrderAmountBadge.textContent = formattedTotal;
  }
  const upiAmountToPay = document.getElementById('upiAmountToPay');
  if (upiAmountToPay) {
    upiAmountToPay.textContent = formattedTotal;
  }
  const upiPayAmountStep = document.getElementById('upiPayAmountStep');
  if (upiPayAmountStep) {
    upiPayAmountStep.textContent = formattedTotal;
  }
  const checkboxPayAmount = document.getElementById('checkboxPayAmount');
  if (checkboxPayAmount) {
    checkboxPayAmount.textContent = formattedTotal;
  }
  const openUpiAppBtn = document.getElementById('openUpiAppBtn');
  if (openUpiAppBtn) {
    openUpiAppBtn.href = `upi://pay?pa=7980883038@ybl&pn=RSA%20Creations&cu=INR&am=${grandTotal}`;
  }

  // Automatically update on-screen pre-order invoice
  updatePreOrderInvoice();
}

function addToCart(productId, quantity = 1) {
  if (!state.currentUser) {
    showToast('Please login or create an account to access and order handcrafted items!', 'toast');
    openAuthModal('login');
    return;
  }

  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCart();
  showToast(`Added "${product.name}" to your basket!`, 'toast-success');
  openCartDrawer();
}

function openCartDrawer() {
  cartDrawer.classList.add('open');
  cartDrawer.setAttribute('aria-hidden', 'false');
}

function closeCartDrawer() {
  cartDrawer.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', 'true');
}

// ==========================================================================
// Wishlist Logic
// ==========================================================================

function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  const product = state.products.find(p => p.id === productId);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast(`Removed from saved pieces`);
  } else {
    state.wishlist.push(productId);
    showToast(`Added "${product ? product.name : 'Piece'}" to Wishlist!`, 'toast-success');
  }

  localStorage.setItem('rsa_wishlist', JSON.stringify(state.wishlist));
  wishlistBadge.textContent = state.wishlist.length;
  renderProducts();
}

// ==========================================================================
// Quick View Modal
// ==========================================================================

function openQuickView(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  currentActiveQuickViewProduct = product;
  modalProductImage.src = product.image;
  modalProductImage.alt = product.name;
  modalProductBadge.textContent = product.badge;
  modalProductCategory.textContent = product.categoryLabel;
  modalProductTitle.textContent = product.name;
  modalProductRating.textContent = `★★★★★ (${product.rating} • ${product.reviewsCount} reviews)`;
  modalProductPrice.textContent = `₹${product.price.toLocaleString('en-IN')}`;
  modalProductDescription.textContent = product.description;
  modalProductMaterials.textContent = product.materials;
  modalProductDimensions.textContent = product.dimensions;
  modalProductMethod.textContent = product.method;
  modalQtyInput.value = 1;

  quickViewDialog.showModal();
}

// ==========================================================================
// Toast Notifications
// ==========================================================================

function showToast(message, type = '') {
  const toastContainer = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-remove');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================================================
// Event Listeners Initialization
// ==========================================================================

function initApp() {
  computeDeliveryDateRange();
  renderProducts();
  updateCartUI();
  updateAuthUI();
  wishlistBadge.textContent = state.wishlist.length;

  // Fetch updated catalog from backend API
  fetchProductsFromBackend();

  // Destination Selector inside Cart
  if (cartDestinationSelect) {
    cartDestinationSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'kolkata') {
        state.deliveryCharge = 0; // FREE for Kolkata!
        state.deliveryRegionName = 'Kolkata (Free Delivery)';
        custCity.value = 'Kolkata';
        custZip.value = '700001';
      } else if (val === 'wb') {
        state.deliveryCharge = 100;
        state.deliveryRegionName = 'West Bengal (Outside Kolkata)';
        custCity.value = 'Siliguri';
        custZip.value = '734001';
      } else {
        state.deliveryCharge = 150;
        state.deliveryRegionName = 'Outside Bengal (Rest of India)';
        custCity.value = 'New Delhi';
        custZip.value = '110001';
      }
      updateCartUI();
      updatePreOrderInvoice();
    });
  }

  // Category Filtering
  categoryPills.addEventListener('click', (e) => {
    const pill = e.target.closest('.pill-btn');
    if (!pill) return;

    categoryPills.querySelectorAll('.pill-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });

    pill.classList.add('active');
    pill.setAttribute('aria-selected', 'true');
    state.selectedCategory = pill.dataset.category;
    renderProducts();
  });

  // Sort change
  sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  });

  // Search input handler
  headerSearchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderProducts();
  });

  searchSubmitBtn.addEventListener('click', () => {
    state.searchQuery = headerSearchInput.value;
    renderProducts();
  });

  // Reset filters
  resetFiltersBtn.addEventListener('click', () => {
    state.searchQuery = '';
    state.selectedCategory = 'all';
    headerSearchInput.value = '';
    categoryPills.querySelectorAll('.pill-btn').forEach((b, i) => {
      b.classList.toggle('active', i === 0);
      b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    });
    renderProducts();
  });

  // Product Grid Delegate (Add to cart, Wishlist, Quick View)
  productGrid.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.add-cart-btn');
    if (addBtn) {
      addToCart(addBtn.dataset.id, 1);
      return;
    }

    const wishBtn = e.target.closest('.card-wishlist-btn');
    if (wishBtn) {
      toggleWishlist(wishBtn.dataset.id);
      return;
    }

    const quickBtn = e.target.closest('.card-quick-view-btn');
    if (quickBtn) {
      openQuickView(quickBtn.dataset.id);
      return;
    }
  });

  // Cart Drawer open/close
  cartOpenBtn.addEventListener('click', openCartDrawer);
  cartCloseBtn.addEventListener('click', closeCartDrawer);
  cartBackdrop.addEventListener('click', closeCartDrawer);
  continueShoppingBtn.addEventListener('click', closeCartDrawer);

  // Cart Items Click Delegate (Increment, Decrement, Remove)
  cartItemsList.addEventListener('click', (e) => {
    const incBtn = e.target.closest('.btn-increment');
    if (incBtn) {
      const item = state.cart.find(i => i.id === incBtn.dataset.id);
      if (item) {
        item.quantity += 1;
        saveCart();
      }
      return;
    }

    const decBtn = e.target.closest('.btn-decrement');
    if (decBtn) {
      const item = state.cart.find(i => i.id === decBtn.dataset.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCart();
      } else if (item && item.quantity === 1) {
        state.cart = state.cart.filter(i => i.id !== decBtn.dataset.id);
        saveCart();
      }
      return;
    }

    const removeBtn = e.target.closest('.cart-item-remove');
    if (removeBtn) {
      state.cart = state.cart.filter(i => i.id !== removeBtn.dataset.id);
      saveCart();
      showToast('Item removed from basket');
      return;
    }
  });

  // Promo Code Handler
  applyPromoBtn.addEventListener('click', () => {
    const code = promoInput.value.trim().toUpperCase();
    if (code === state.promoCode) {
      state.promoApplied = true;
      saveCart();
      showToast('Promo code applied: 10% discount on order!', 'toast-success');
      promoInput.value = '';
    } else {
      showToast('Invalid promo code. Try "HANDMADE10"');
    }
  });

  removePromoBtn.addEventListener('click', () => {
    state.promoApplied = false;
    saveCart();
    showToast('Promo code removed');
  });

  // Quick View Quantity Counter
  modalQtyMinus.addEventListener('click', () => {
    let val = parseInt(modalQtyInput.value, 10) || 1;
    if (val > 1) modalQtyInput.value = val - 1;
  });

  modalQtyPlus.addEventListener('click', () => {
    let val = parseInt(modalQtyInput.value, 10) || 1;
    if (val < 10) modalQtyInput.value = val + 1;
  });

  modalAddToCartBtn.addEventListener('click', () => {
    if (currentActiveQuickViewProduct) {
      const qty = parseInt(modalQtyInput.value, 10) || 1;
      addToCart(currentActiveQuickViewProduct.id, qty);
      quickViewDialog.close();
    }
  });

  modalCloseBtn.addEventListener('click', () => {
    quickViewDialog.close();
  });

  // Helper: Build Pre-Order Draft Object for Invoice Preview
  function getPreOrderDraft() {
    const fn = (document.getElementById('custFirstName')?.value || '').trim();
    const ln = (document.getElementById('custLastName')?.value || '').trim();
    const fullName = `${fn} ${ln}`.trim() || state.currentUser?.name || 'Customer';
    const phone = (document.getElementById('custPhone')?.value || '').trim() || state.currentUser?.mobile || '';
    const email = (document.getElementById('custEmail')?.value || '').trim() || state.currentUser?.email || '';
    const address = (document.getElementById('custAddress')?.value || '').trim() || 'Address entered in form';
    const city = (document.getElementById('custCity')?.value || '').trim() || 'Kolkata';
    const pincode = (document.getElementById('custZip')?.value || '').trim() || '700001';
    const upiTxn = (document.getElementById('checkoutUpiTxn')?.value || '').trim();

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = state.promoApplied ? Math.round(subtotal * state.promoDiscount) : 0;
    const totalAmount = Math.max(0, subtotal - discount + (subtotal === 0 ? 0 : state.deliveryCharge));

    return {
      orderId: `PRE-RSA-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      isDraft: true,
      customer: {
        name: fullName,
        phone,
        email,
        address,
        city,
        pincode,
        state: state.deliveryRegionName.includes('Kolkata') ? 'West Bengal' : (state.deliveryRegionName.includes('West Bengal') ? 'West Bengal' : 'India')
      },
      items: state.cart.map(i => ({
        id: i.id,
        title: i.name,
        price: i.price,
        quantity: i.quantity,
        lineTotal: i.price * i.quantity
      })),
      pricing: {
        subtotal,
        discount,
        couponCode: state.promoApplied ? 'HANDMADE10' : null,
        deliveryCharge: state.deliveryCharge,
        deliveryRegion: state.deliveryRegionName,
        totalAmount
      },
      payment: {
        method: 'Online PhonePe UPI (7980883038)',
        transactionId: upiTxn || 'Awaiting UTR Entry'
      },
      delivery: {
        timeline: state.deliveryTimeline || '7 to 10 business days',
        estimatedDateRange: state.estimatedDates || 'Within 7-10 days'
      }
    };
  }

  // Helper: Update On-Screen Pre-Order Tax Invoice Preview
  function updatePreOrderInvoice() {
    const custNameEl = document.getElementById('preInvCustName');
    const custContactEl = document.getElementById('preInvCustContact');
    const custAddressEl = document.getElementById('preInvCustAddress');
    const itemsBodyEl = document.getElementById('preInvItemsBody');
    const subtotalEl = document.getElementById('preInvSubtotal');
    const discountRowEl = document.getElementById('preInvDiscountRow');
    const discountEl = document.getElementById('preInvDiscount');
    const shippingLabelEl = document.getElementById('preInvShippingLabel');
    const shippingNoteEl = document.getElementById('preInvShippingNote');
    const deliveryFeeEl = document.getElementById('preInvDeliveryFee');
    const grandTotalEl = document.getElementById('preInvGrandTotal');
    const utrBadgeEl = document.getElementById('preInvUtrBadge');

    if (!itemsBodyEl) return;

    const fn = (document.getElementById('custFirstName')?.value || '').trim();
    const ln = (document.getElementById('custLastName')?.value || '').trim();
    const fullName = `${fn} ${ln}`.trim() || state.currentUser?.name || 'Customer (Fill details above)';
    const phone = (document.getElementById('custPhone')?.value || '').trim() || state.currentUser?.mobile || 'Pending';
    const email = (document.getElementById('custEmail')?.value || '').trim() || state.currentUser?.email || '';
    const street = (document.getElementById('custAddress')?.value || '').trim();
    const city = (document.getElementById('custCity')?.value || '').trim() || 'Kolkata';
    const zip = (document.getElementById('custZip')?.value || '').trim() || '700001';
    const upiTxn = (document.getElementById('checkoutUpiTxn')?.value || '').trim();

    if (custNameEl) custNameEl.textContent = fullName;
    if (custContactEl) custContactEl.textContent = `Mobile: +91 ${phone}${email ? ' • ' + email : ''}`;
    if (custAddressEl) custAddressEl.textContent = street ? `${street}, ${city} - ${zip}` : `City: ${city} (${zip}) • Street address pending`;

    // Render items rows
    if (state.cart.length === 0) {
      itemsBodyEl.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 10px;">No items in cart</td></tr>`;
    } else {
      itemsBodyEl.innerHTML = state.cart.map(item => `
        <tr>
          <td><strong>${item.name}</strong></td>
          <td style="text-align: center;">${item.quantity}</td>
          <td style="text-align: right;">₹${item.price.toLocaleString('en-IN')}</td>
          <td style="text-align: right; font-weight: 600;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
        </tr>
      `).join('');
    }

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

    let discountAmount = 0;
    if (state.promoApplied && subtotal > 0) {
      discountAmount = Math.round(subtotal * state.promoDiscount);
      if (discountRowEl) discountRowEl.style.display = 'flex';
      if (discountEl) discountEl.textContent = `-₹${discountAmount.toLocaleString('en-IN')}`;
    } else {
      if (discountRowEl) discountRowEl.style.display = 'none';
    }

    const isKolkata = (state.deliveryRegionName || '').toLowerCase().includes('kolkata');
    const isWb = (state.deliveryRegionName || '').toLowerCase().includes('bengal');

    if (isKolkata) {
      if (shippingLabelEl) shippingLabelEl.textContent = 'Delivery Charges (Kolkata Special):';
      if (deliveryFeeEl) {
        deliveryFeeEl.textContent = 'FREE (₹0)';
        deliveryFeeEl.style.color = '#15803d';
      }
      if (shippingNoteEl) shippingNoteEl.textContent = '🎉 100% Free Doorstep Delivery across Kolkata!';
    } else if (isWb) {
      if (shippingLabelEl) shippingLabelEl.textContent = 'Delivery Charges (West Bengal):';
      if (deliveryFeeEl) {
        deliveryFeeEl.textContent = `₹${state.deliveryCharge}`;
        deliveryFeeEl.style.color = '#4b5563';
      }
      if (shippingNoteEl) shippingNoteEl.textContent = '📍 West Bengal flat delivery: ₹100 (Free in Kolkata only)';
    } else {
      if (shippingLabelEl) shippingLabelEl.textContent = 'Delivery Charges (Outside Bengal):';
      if (deliveryFeeEl) {
        deliveryFeeEl.textContent = `₹${state.deliveryCharge}`;
        deliveryFeeEl.style.color = '#4b5563';
      }
      if (shippingNoteEl) shippingNoteEl.textContent = '📍 Outside Bengal flat delivery: ₹150 (Free in Kolkata only)';
    }

    const grandTotal = Math.max(0, subtotal - discountAmount + (subtotal === 0 ? 0 : state.deliveryCharge));
    if (grandTotalEl) grandTotalEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;

    if (utrBadgeEl) {
      if (upiTxn.length >= 8) {
        utrBadgeEl.textContent = `✅ UTR: ${upiTxn}`;
        utrBadgeEl.className = 'utr-status-pill verified';
      } else {
        utrBadgeEl.textContent = '⚠️ UTR: Required';
        utrBadgeEl.className = 'utr-status-pill';
      }
    }
  }

  // Helper: Generate Full HTML String for Official Tax Invoice
  function generateOrderInvoiceHtmlString(order, isDraft = false) {
    const isKolkata = (order.pricing?.deliveryRegion || '').toLowerCase().includes('kolkata');
    const isWb = (order.pricing?.deliveryRegion || '').toLowerCase().includes('bengal');
    const deliveryLabel = isKolkata 
      ? 'Delivery Charges (Kolkata Special - FREE)' 
      : (isWb ? 'Delivery Charges (West Bengal - Outside Kolkata)' : 'Delivery Charges (Outside Bengal - Pan India)');

    const itemsRows = (order.items || []).map((item, idx) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center;">${idx + 1}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">
          <strong>${item.title || item.name || 'Handcrafted Artisan Item'}</strong>
          <div style="font-size: 11px; color: #6b7280;">SKU: ${item.id} • Handcrafted in Bengal</div>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">₹${(item.price || 0).toLocaleString('en-IN')}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;">₹${((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}</td>
      </tr>
    `).join('');

    const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }) : new Date().toLocaleDateString('en-IN');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tax Invoice - ${order.orderId} - RSA Creations</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1f2937;
      background: #f3f4f6;
      padding: 24px;
    }
    .invoice-container {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      padding: 36px 40px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid #e5e7eb;
    }
    .inv-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #5F259F;
      padding-bottom: 18px;
      margin-bottom: 24px;
    }
    .inv-logo-box {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .inv-logo-mark {
      background: #5F259F;
      color: #fff;
      font-weight: 800;
      font-size: 20px;
      padding: 8px 14px;
      border-radius: 8px;
    }
    .inv-brand-name {
      font-size: 24px;
      font-weight: 800;
      color: #1f2937;
    }
    .tax-inv-pill {
      background: #f5f3ff;
      color: #5F259F;
      border: 1px solid #ddd6fe;
      font-weight: 700;
      font-size: 13px;
      padding: 4px 12px;
      border-radius: 9999px;
      text-transform: uppercase;
      display: inline-block;
      margin-bottom: 6px;
    }
    .inv-info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
      padding: 16px;
      background: #fafaf9;
      border-radius: 8px;
    }
    .inv-info-block h4 {
      font-size: 11px;
      text-transform: uppercase;
      color: #7c3aed;
      margin-bottom: 6px;
    }
    .inv-info-block p {
      font-size: 13px;
      line-height: 1.5;
      color: #374151;
    }
    .inv-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      font-size: 13px;
    }
    .inv-table th {
      background: #f9fafb;
      color: #374151;
      padding: 10px;
      text-align: left;
      border-bottom: 2px solid #e5e7eb;
    }
    .inv-totals-box {
      margin-left: auto;
      width: 340px;
      margin-bottom: 24px;
    }
    .inv-total-row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      font-size: 13px;
    }
    .inv-total-row.grand-total {
      border-top: 2px solid #111827;
      border-bottom: 2px solid #111827;
      padding: 10px 0;
      font-size: 16px;
      font-weight: 800;
      color: #111827;
    }
    .payment-box {
      background: #fdf4ff;
      border: 1px solid #f0abfc;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .stamp-box {
      border: 2px dashed #5F259F;
      color: #5F259F;
      font-size: 11px;
      font-weight: 800;
      padding: 6px 12px;
      border-radius: 4px;
      text-align: center;
    }
    .action-bar {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-top: 20px;
    }
    .btn-print {
      background: #5F259F;
      color: #fff;
      border: none;
      padding: 10px 22px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
    }
    @media print {
      body { background: #fff; padding: 0; }
      .invoice-container { box-shadow: none; border: none; padding: 0; width: 100%; max-width: 100%; }
      .action-bar { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <div class="inv-top-bar">
      <div class="inv-logo-box">
        <span class="inv-logo-mark">RSA</span>
        <div>
          <div class="inv-brand-name">RSA CREATIONS</div>
          <div style="font-size: 12px; color: #6b7280;">Handcrafted Studio • Kolkata</div>
        </div>
      </div>
      <div style="text-align: right;">
        <span class="tax-inv-pill">${isDraft ? 'Provisional Bill Preview' : 'Official Tax Invoice'}</span>
        <div style="font-weight: 700; font-size: 15px;">Invoice #${order.orderId}</div>
        <div style="font-size: 12px; color: #6b7280;">Date: ${orderDate}</div>
      </div>
    </div>

    <div class="inv-info-grid">
      <div class="inv-info-block">
        <h4>Sold & Dispatched By:</h4>
        <p><strong>RSA Creations Artisan Studio</strong></p>
        <p>Kolkata, West Bengal - 700001</p>
        <p>PhonePe / WhatsApp: +91 7980883038</p>
        <p style="font-size: 11px; color: #6b7280;">State: West Bengal (Code: 19)</p>
      </div>
      <div class="inv-info-block">
        <h4>Billed & Shipped To:</h4>
        <p><strong>${order.customer?.name || 'Customer'}</strong></p>
        <p>${order.customer?.address || 'Address provided'}</p>
        <p>${order.customer?.city || ''}${order.customer?.pincode ? ' - ' + order.customer.pincode : ''}</p>
        <p>${order.customer?.state || 'India'}</p>
        <p>Phone: +91 ${order.customer?.phone || ''}</p>
      </div>
    </div>

    <table class="inv-table">
      <thead>
        <tr>
          <th style="width: 40px; text-align: center;">#</th>
          <th>Item Description</th>
          <th style="width: 60px; text-align: center;">Qty</th>
          <th style="width: 100px; text-align: right;">Price</th>
          <th style="width: 110px; text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${itemsRows}
      </tbody>
    </table>

    <div class="inv-totals-box">
      <div class="inv-total-row">
        <span>Items Subtotal:</span>
        <span>₹${(order.pricing?.subtotal || 0).toLocaleString('en-IN')}</span>
      </div>
      ${order.pricing?.discount > 0 ? `
      <div class="inv-total-row" style="color: #16a34a;">
        <span>Artisan Coupon (${order.pricing?.couponCode || 'HANDMADE10'}):</span>
        <span>-₹${order.pricing.discount.toLocaleString('en-IN')}</span>
      </div>` : ''}
      <div class="inv-total-row">
        <span>${deliveryLabel}:</span>
        <strong style="color: ${order.pricing?.deliveryCharge === 0 ? '#15803d' : '#1f2937'};">
          ${order.pricing?.deliveryCharge === 0 ? 'FREE (₹0)' : '₹' + (order.pricing?.deliveryCharge || 0)}
        </strong>
      </div>
      <div class="inv-total-row grand-total">
        <span>Total Payable:</span>
        <span style="color: #5F259F;">₹${(order.pricing?.totalAmount || 0).toLocaleString('en-IN')}</span>
      </div>
    </div>

    <div class="payment-box">
      <div>
        <strong style="color: #86198f;">${isDraft ? '💳 Payment Mode' : '✅ 100% Online Payment Verified'}</strong>
        <div style="font-size: 12px; color: #701a75; margin-top: 3px;">
          Mode: ${order.payment?.method || 'Online PhonePe UPI (7980883038)'}<br>
          UTR / Ref: <code>${order.payment?.transactionId || 'Entered at Checkout'}</code>
        </div>
      </div>
      <div class="stamp-box">
        ${isDraft ? 'PRE-ORDER<br>VERIFICATION' : 'PAID IN FULL<br>RSA CREATIONS'}
      </div>
    </div>

    <div style="border-top: 1px solid #e5e7eb; padding-top: 14px; display: flex; justify-content: space-between; font-size: 11px; color: #6b7280;">
      <div>Estimated Delivery: ${order.delivery?.timeline || '7 to 10 business days'}</div>
      <div>Authorized Signatory • RSA Creations Kolkata</div>
    </div>
  </div>

  <div class="action-bar">
    <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
  </div>
</body>
</html>`;
  }

  // Helper: Open Fullscreen Invoice Modal
  function openFullscreenInvoiceModal(order, isDraft = false) {
    if (!fullInvoiceDialog) return;
    const contentEl = document.getElementById('fullscreenInvoiceContent');
    if (contentEl) {
      contentEl.innerHTML = generateOrderInvoiceHtmlString(order, isDraft);
    }
    fullInvoiceDialog.showModal();
  }

  // Helper: Download Official Invoice HTML file & trigger Print Dialog
  function downloadTaxInvoice(order) {
    if (!order) return;
    const invoiceHtml = generateOrderInvoiceHtmlString(order, false);
    const blob = new Blob([invoiceHtml], { type: 'text/html;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `RSA_Invoice_${order.orderId || 'Order'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);

    showToast(`📄 Invoice for ${order.orderId} downloaded! Opening print view...`, 'toast-success');

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(invoiceHtml);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 500);
    }
  }

  // Helper to render order items preview in checkout dialog
  function renderCheckoutItemsReview() {
    const list = document.getElementById('checkoutItemsList');
    const count = document.getElementById('checkoutItemsCount');
    const badge = document.getElementById('placeOrderAmountBadge');
    if (!list) return;

    if (count) count.textContent = `${state.cart.length} item${state.cart.length > 1 ? 's' : ''}`;

    list.innerHTML = state.cart.map(item => `
      <div class="checkout-mini-item">
        <img src="${item.image}" alt="${item.name}" class="checkout-mini-thumb" onerror="this.src='https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=100&q=80'">
        <div class="checkout-mini-info">
          <div class="checkout-mini-title">${item.name}</div>
          <div class="checkout-mini-meta">
            <span>Qty: ${item.quantity}</span>
            <strong>₹${(item.price * item.quantity).toLocaleString('en-IN')}</strong>
          </div>
        </div>
      </div>
    `).join('');

    if (badge && checkoutTotalAmount) {
      badge.textContent = checkoutTotalAmount.textContent;
    }
  }

  // Checkout Modal Open (Direct & Frictionless)
  checkoutBtn.addEventListener('click', () => {
    if (state.cart.length === 0) {
      showToast('Your shopping basket is empty. Please add items to proceed.', 'toast');
      return;
    }

    closeCartDrawer();

    // Autofill user details if logged in
    if (state.currentUser) {
      autofillCheckoutFromUser();
    }

    // Populate order items preview in checkout
    renderCheckoutItemsReview();

    // Dynamically calculate delivery fee based on city/pincode
    const cityInput = document.getElementById('custCity');
    const zipInput = document.getElementById('custZip');
    updateShippingCalculation((cityInput && cityInput.value) || 'Kolkata', (zipInput && zipInput.value) || '700001');

    // Update on-screen pre-order invoice preview
    updatePreOrderInvoice();

    checkoutDialog.showModal();
  });

  checkoutCloseBtn.addEventListener('click', () => {
    checkoutDialog.close();
  });

  // Listen for Customer Details & Address / Pincode changes in Checkout to dynamically recalculate
  ['custFirstName', 'custLastName', 'custPhone', 'custEmail', 'custAddress', 'custCity', 'custZip', 'checkoutUpiTxn'].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', () => {
        if (id === 'custCity' || id === 'custZip') {
          updateShippingCalculation(custCity.value, custZip.value);
        } else {
          updatePreOrderInvoice();
        }
        const badge = document.getElementById('placeOrderAmountBadge');
        if (badge && checkoutTotalAmount) {
          badge.textContent = checkoutTotalAmount.textContent;
        }
      });
    }
  });

  // Fullscreen Invoice Preview Button in Checkout Modal (Before Confirming)
  const btnPreviewFullInvoice = document.getElementById('btnPreviewFullInvoice');
  if (btnPreviewFullInvoice) {
    btnPreviewFullInvoice.addEventListener('click', () => {
      const draftOrder = getPreOrderDraft();
      openFullscreenInvoiceModal(draftOrder, true);
    });
  }

  const btnCloseFullscreenInvoice = document.getElementById('btnCloseFullscreenInvoice');
  if (btnCloseFullscreenInvoice && fullInvoiceDialog) {
    btnCloseFullscreenInvoice.addEventListener('click', () => {
      fullInvoiceDialog.close();
    });
  }

  const btnPrintFullscreenInvoice = document.getElementById('btnPrintFullscreenInvoice');
  if (btnPrintFullscreenInvoice) {
    btnPrintFullscreenInvoice.addEventListener('click', () => {
      window.print();
    });
  }

  // Checkout Form Submission (Sends real POST /api/orders to backend)
  checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('custFirstName').value.trim();
    const lastName = document.getElementById('custLastName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const email = document.getElementById('custEmail').value.trim();
    const address = document.getElementById('custAddress').value.trim();
    const city = custCity.value.trim();
    const pincode = custZip.value.trim();
    const upiTxn = (document.getElementById('checkoutUpiTxn') || {}).value || '';
    const paymentCheck = document.getElementById('confirmPaymentPaid');

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      showToast('Please enter a valid 10-digit Indian mobile number for delivery updates.', 'toast');
      return;
    }

    if (!pincode || !/^\d{6}$/.test(pincode)) {
      showToast('Please enter a valid 6-digit Indian delivery pincode.', 'toast');
      return;
    }

    // MANDATORY PAYMENT ENFORCEMENT
    if (!upiTxn || upiTxn.trim().length < 8) {
      showToast('⚠️ Payment Verification Required! Please pay via PhonePe to 7980883038 and enter the 12-digit UPI / UTR Transaction ID.', 'toast');
      const upiInput = document.getElementById('checkoutUpiTxn');
      if (upiInput) {
        upiInput.focus();
        upiInput.style.borderColor = '#C45D3E';
      }
      return;
    }

    if (paymentCheck && !paymentCheck.checked) {
      showToast('⚠️ Please check the confirmation box verifying that you have completed payment to PhonePe (7980883038).', 'toast');
      paymentCheck.focus();
      return;
    }

    const placeBtn = document.getElementById('placeOrderBtn');
    if (placeBtn) {
      placeBtn.disabled = true;
      placeBtn.innerHTML = `<span>⏳ Verifying Payment & Placing Order...</span>`;
    }

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const orderPayload = {
      customerName: `${firstName} ${lastName}`.trim(),
      phone: phone || (state.currentUser && state.currentUser.mobile) || '',
      email: email || (state.currentUser && state.currentUser.email) || '',
      address,
      city,
      pincode,
      items: state.cart,
      subtotal,
      promoCode: state.promoApplied ? 'HANDMADE10' : null,
      paymentMethod: 'Online PhonePe / UPI (Prepaid)',
      transactionId: upiTxn.trim()
    };

    let confirmedOrderId = '';
    let confirmedTotal = checkoutTotalAmount ? checkoutTotalAmount.textContent : `₹${subtotal}`;

    try {
      const response = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const data = await response.json();

      if (!data.success) {
        showToast(data.error || 'Payment verification failed. Please check your UTR number.', 'toast');
        if (placeBtn) {
          placeBtn.disabled = false;
          placeBtn.innerHTML = `<span>✅ Confirm & Place Order</span><span id="placeOrderAmountBadge" class="btn-amount-badge">${confirmedTotal}</span>`;
        }
        return;
      }

      if (data.success && data.order) {
        confirmedOrderId = data.order.orderId;
        lastConfirmedOrder = data.order;
        if (data.order.pricing && data.order.pricing.totalAmount) {
          confirmedTotal = `₹${data.order.pricing.totalAmount.toLocaleString('en-IN')}`;
        }
      } else {
        lastConfirmedOrder = {
          orderId: confirmedOrderId || 'RSA-KOL-SUCCESS',
          createdAt: new Date().toISOString(),
          customer: {
            name: `${firstName} ${lastName}`.trim(),
            phone,
            email,
            address,
            city,
            pincode,
            state: state.deliveryRegionName.includes('Kolkata') ? 'West Bengal' : 'India'
          },
          items: [...state.cart],
          pricing: {
            subtotal,
            discount: state.promoApplied ? Math.round(subtotal * state.promoDiscount) : 0,
            couponCode: state.promoApplied ? 'HANDMADE10' : null,
            deliveryCharge: state.deliveryCharge,
            deliveryRegion: state.deliveryRegionName,
            totalAmount: parseInt(confirmedTotal.replace(/[^\d]/g, ''), 10) || subtotal
          },
          payment: {
            method: 'Online PhonePe UPI (7980883038)',
            transactionId: upiTxn || 'Verified Online'
          },
          delivery: {
            timeline: state.deliveryTimeline || '7 to 10 business days',
            estimatedDateRange: state.estimatedDates || 'Within 7-10 days'
          }
        };
      }
    } catch (err) {
      showToast('Network error while verifying payment. Please ensure your internet is active.', 'toast');
      if (placeBtn) {
        placeBtn.disabled = false;
        placeBtn.innerHTML = `<span>✅ Confirm & Place Order</span><span id="placeOrderAmountBadge" class="btn-amount-badge">${confirmedTotal}</span>`;
      }
      return;
    } finally {
      if (placeBtn) {
        placeBtn.disabled = false;
        placeBtn.innerHTML = `<span>✅ Confirm & Place Order</span><span id="placeOrderAmountBadge" class="btn-amount-badge">${confirmedTotal}</span>`;
      }
    }

    checkoutDialog.close();

    // Populate success dialog details
    if (successOrderNumber) successOrderNumber.textContent = confirmedOrderId;
    const successTotalPaidDisplay = document.getElementById('successTotalPaidDisplay');
    if (successTotalPaidDisplay) successTotalPaidDisplay.textContent = confirmedTotal;

    const deliveryTimelineEl = document.getElementById('successDeliveryTimeline');
    if (deliveryTimelineEl) {
      deliveryTimelineEl.textContent = state.estimatedDates ? `${state.estimatedDates} (7 to 10 days)` : '7 to 10 business days';
    }

    // Set WhatsApp confirmation link
    const whatsappBtn = document.getElementById('whatsappConfirmBtn');
    if (whatsappBtn) {
      const waMsg = `🛍️ *ORDER CONFIRMED - RSA CREATIONS*\nOrder ID: ${confirmedOrderId}\nCustomer: ${firstName} ${lastName} (${phone})\nDelivery Address: ${address}, ${city} - ${pincode}\nTotal Amount: ${confirmedTotal}\nPayment: Online PhonePe UPI (7980883038)\nUTR / Txn ID: ${upiTxn || 'Verified Online'}\nEstimated Delivery: 7 to 10 business days.\nPlease confirm dispatch! ✨`;
      whatsappBtn.href = `https://wa.me/917980883038?text=${encodeURIComponent(waMsg)}`;
    }

    // Clear cart after successful order
    state.cart = [];
    state.promoApplied = false;
    saveCart();
    renderCart();

    // Show Confirmation Dialog
    successDialog.showModal();
    showToast(`Order ${confirmedOrderId} confirmed successfully! 🎉`, 'toast-success');
  });

  // Success Dialog Action Handlers
  const successDownloadInvoiceBtn = document.getElementById('successDownloadInvoiceBtn');
  if (successDownloadInvoiceBtn) {
    successDownloadInvoiceBtn.addEventListener('click', () => {
      if (lastConfirmedOrder) {
        downloadTaxInvoice(lastConfirmedOrder);
      } else {
        showToast('Invoice is ready! Fetching order details...', 'toast');
      }
    });
  }

  const successViewInvoiceOnlineBtn = document.getElementById('successViewInvoiceOnlineBtn');
  if (successViewInvoiceOnlineBtn) {
    successViewInvoiceOnlineBtn.addEventListener('click', () => {
      if (lastConfirmedOrder) {
        openFullscreenInvoiceModal(lastConfirmedOrder, false);
      }
    });
  }

  successCloseBtn.addEventListener('click', () => {
    successDialog.close();
  });

  // ==========================================================================
  // Auth & Address Modal Event Listeners
  // ==========================================================================

  // Account button in header
  if (accountHeaderBtn) {
    accountHeaderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (state.currentUser) {
        const isVisible = userDropdown.style.display === 'flex';
        userDropdown.style.display = isVisible ? 'none' : 'flex';
      } else {
        openAuthModal('login');
      }
    });
  }

  // Mobile Nav Login button
  if (mobileNavLoginBtn) {
    mobileNavLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (mainNav) mainNav.classList.remove('open');
      if (mobileNavToggle) mobileNavToggle.setAttribute('aria-expanded', 'false');
      if (state.currentUser) {
        const isVisible = userDropdown.style.display === 'flex';
        userDropdown.style.display = isVisible ? 'none' : 'flex';
      } else {
        openAuthModal('login');
      }
    });
  }

  // Switch / Login Account button inside dropdown
  if (dropdownLoginModalBtn) {
    dropdownLoginModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (userDropdown) userDropdown.style.display = 'none';
      openAuthModal('login');
    });
  }

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (userDropdown && userDropdown.style.display === 'flex') {
      const isAccountBtn = accountHeaderBtn && accountHeaderBtn.contains(e.target);
      const isMobileBtn = mobileNavLoginBtn && mobileNavLoginBtn.contains(e.target);
      const isDropdown = userDropdown.contains(e.target);
      if (!isDropdown && !isAccountBtn && !isMobileBtn) {
        userDropdown.style.display = 'none';
      }
    }
  });

  // Auth Dialog Close
  if (authCloseBtn) {
    authCloseBtn.addEventListener('click', (e) => {
      window.closeAuthModal(e);
    });
  }

  // Close Auth Dialog when tapping backdrop
  if (authDialog) {
    authDialog.addEventListener('click', (e) => {
      if (e.target === authDialog) {
        window.closeAuthModal(e);
      }
    });
  }

  // Address Dialog Close
  if (addressCloseBtn) {
    addressCloseBtn.addEventListener('click', () => addressDialog.close());
  }

  // Auth Tabs (Login / OTP Login / Sign Up / Recovery)
  if (loginTab) {
    loginTab.addEventListener('click', () => switchAuthTab('login'));
  }
  if (otpLoginTab) {
    otpLoginTab.addEventListener('click', () => switchAuthTab('otpLogin'));
  }
  if (signupTab) {
    signupTab.addEventListener('click', () => switchAuthTab('signup'));
  }
  if (recoveryTab) {
    recoveryTab.addEventListener('click', () => switchAuthTab('recovery'));
  }

  // Quick switch links
  if (loginViaOtpLink) {
    loginViaOtpLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchAuthTab('otpLogin');
    });
  }
  if (backToPasswordLoginLink) {
    backToPasswordLoginLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchAuthTab('login');
    });
  }
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchAuthTab('recovery');
    });
  }
  if (backToLoginLink) {
    backToLoginLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchAuthTab('login');
    });
  }

  // ==========================================================================
  // OTP Login Flow
  // ==========================================================================
  async function handleSendLoginOtp() {
    const identifier = (otpLoginIdentifier?.value || '').trim();
    if (otpLoginError) otpLoginError.style.display = 'none';
    if (otpLoginSuccess) otpLoginSuccess.style.display = 'none';

    if (!identifier) {
      if (otpLoginError) {
        otpLoginError.textContent = 'Please enter your registered 10-digit mobile number or email.';
        otpLoginError.style.display = 'block';
      }
      return;
    }

    if (sendLoginOtpBtn) {
      sendLoginOtpBtn.disabled = true;
      sendLoginOtpBtn.textContent = 'Sending...';
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, purpose: 'login' })
      });
      const data = await res.json();

      if (data.success) {
        if (loginOtpGroup) loginOtpGroup.style.display = 'block';
        if (verifyLoginOtpBtn) verifyLoginOtpBtn.style.display = 'block';
        if (otpLoginSuccess) {
          otpLoginSuccess.textContent = `✅ ${data.message} OTP: ${data.otp}`;
          otpLoginSuccess.style.display = 'block';
        }
        if (loginOtpCode && data.otp) {
          loginOtpCode.value = data.otp; // Auto-populate for seamless 1-click login
        }
        showToast(`Your 6-Digit Login OTP is: ${data.otp}`, 'toast-success');
      } else {
        if (otpLoginError) {
          otpLoginError.textContent = data.error || 'Failed to send OTP.';
          otpLoginError.style.display = 'block';
        }
      }
    } catch (err) {
      if (otpLoginError) {
        otpLoginError.textContent = 'Server connection error. Please try again.';
        otpLoginError.style.display = 'block';
      }
    } finally {
      if (sendLoginOtpBtn) {
        sendLoginOtpBtn.disabled = false;
        sendLoginOtpBtn.textContent = 'Resend OTP 📩';
      }
    }
  }

  if (sendLoginOtpBtn) sendLoginOtpBtn.addEventListener('click', handleSendLoginOtp);
  if (resendLoginOtpBtn) resendLoginOtpBtn.addEventListener('click', handleSendLoginOtp);

  // OTP Login Verification
  if (otpLoginForm) {
    otpLoginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (otpLoginError) otpLoginError.style.display = 'none';
      if (otpLoginSuccess) otpLoginSuccess.style.display = 'none';

      const identifier = (otpLoginIdentifier?.value || '').trim();
      const otp = (loginOtpCode?.value || '').trim();

      if (!identifier || !otp || otp.length !== 6) {
        if (otpLoginError) {
          otpLoginError.textContent = 'Please enter the complete 6-digit OTP.';
          otpLoginError.style.display = 'block';
        }
        return;
      }

      if (verifyLoginOtpBtn) {
        verifyLoginOtpBtn.disabled = true;
        verifyLoginOtpBtn.textContent = 'Verifying...';
      }

      try {
        const res = await fetch(`${API_BASE}/api/auth/verify-otp-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, otp })
        });
        const data = await res.json();

        if (data.success && data.user) {
          state.currentUser = data.user;
          localStorage.setItem('rsa_user', JSON.stringify(data.user));
          updateAuthUI();
          authDialog.close();
          otpLoginForm.reset();
          showToast(`Welcome back, ${data.user.name}! (Logged in via OTP)`, 'toast-success');
        } else {
          if (otpLoginError) {
            otpLoginError.textContent = data.error || 'Incorrect or expired OTP.';
            otpLoginError.style.display = 'block';
          }
        }
      } catch (err) {
        if (otpLoginError) {
          otpLoginError.textContent = 'Server connection error. Please try again.';
          otpLoginError.style.display = 'block';
        }
      } finally {
        if (verifyLoginOtpBtn) {
          verifyLoginOtpBtn.disabled = false;
          verifyLoginOtpBtn.textContent = 'Verify OTP & Login';
        }
      }
    });
  }

  // Copy UPI Number button
  if (copyUpiBtn) {
    copyUpiBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('7980883038').then(() => {
        copyUpiBtn.textContent = 'Copied! ✅';
        showToast('PhonePe UPI Number copied: 7980883038', 'toast-success');
        setTimeout(() => { copyUpiBtn.textContent = 'Copy 📋'; }, 2000);
      }).catch(() => {
        showToast('7980883038 — copy manually from above.');
      });
    });
  }

  // Find Account & Send Reset OTP button (Forgot Password / Recover User ID)
  if (findAccountBtn) {
    findAccountBtn.addEventListener('click', async () => {
      const identifier = (recoveryMobile?.value || '').trim();
      if (recoveryError) recoveryError.style.display = 'none';
      if (recoverySuccess) recoverySuccess.style.display = 'none';
      if (recoveredAccountCard) recoveredAccountCard.style.display = 'none';
      if (recoveryOtpGroup) recoveryOtpGroup.style.display = 'none';
      if (newPasswordGroup) newPasswordGroup.style.display = 'none';
      if (recoverySubmitBtn) recoverySubmitBtn.style.display = 'none';

      if (!identifier) {
        if (recoveryError) {
          recoveryError.textContent = 'Please enter your registered 10-digit mobile number or email.';
          recoveryError.style.display = 'block';
        }
        return;
      }

      findAccountBtn.textContent = 'Sending OTP...';
      findAccountBtn.disabled = true;

      try {
        const res = await fetch(`${API_BASE}/api/auth/send-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, purpose: 'reset_password' })
        });
        const data = await res.json();

        if (data.success && data.user) {
          if (recoveredAccountCard) recoveredAccountCard.style.display = 'block';
          if (recoveredUserId) recoveredUserId.textContent = data.user.userId;
          if (recoveredName) recoveredName.textContent = data.user.name;
          if (recoveredEmail) recoveredEmail.textContent = data.user.email || 'Not provided';
          if (recoveredMobileDisplay) recoveredMobileDisplay.textContent = data.user.mobile;

          if (recoveryOtpGroup) recoveryOtpGroup.style.display = 'block';
          if (newPasswordGroup) newPasswordGroup.style.display = 'block';
          if (recoverySubmitBtn) recoverySubmitBtn.style.display = 'block';

          if (recoveryOtpCode && data.otp) {
            recoveryOtpCode.value = data.otp; // Auto-fill for seamless user experience
          }

          if (recoverySuccess) {
            recoverySuccess.textContent = `✅ Account found! OTP sent: ${data.otp}. Enter new password below.`;
            recoverySuccess.style.display = 'block';
          }
          showToast(`Your Reset OTP is: ${data.otp}`, 'toast-success');
        } else {
          if (recoveryError) {
            recoveryError.textContent = data.error || 'No account found with these details.';
            recoveryError.style.display = 'block';
          }
        }
      } catch (err) {
        if (recoveryError) {
          recoveryError.textContent = 'Server connection error. Please try again later.';
          recoveryError.style.display = 'block';
        }
      } finally {
        findAccountBtn.textContent = 'Resend OTP 📩';
        findAccountBtn.disabled = false;
      }
    });
  }

  // Recovery Form (Reset Password via OTP) Submission
  if (recoveryForm) {
    recoveryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (recoveryError) recoveryError.style.display = 'none';
      if (recoverySuccess) recoverySuccess.style.display = 'none';

      const identifier = (recoveryMobile?.value || '').trim();
      const otp = (recoveryOtpCode?.value || '').trim();
      const newPwd = (newRecoveryPassword?.value || '');
      const confirmPwd = (confirmRecoveryPassword?.value || '');

      if (!identifier) {
        if (recoveryError) {
          recoveryError.textContent = 'Please enter your registered mobile number or email.';
          recoveryError.style.display = 'block';
        }
        return;
      }

      if (!otp || otp.length !== 6) {
        if (recoveryError) {
          recoveryError.textContent = 'Please enter the 6-digit OTP received.';
          recoveryError.style.display = 'block';
        }
        return;
      }

      if (!newPwd || newPwd.length < 6) {
        if (recoveryError) {
          recoveryError.textContent = 'New password must be at least 6 characters.';
          recoveryError.style.display = 'block';
        }
        return;
      }

      if (newPwd !== confirmPwd) {
        if (recoveryError) {
          recoveryError.textContent = 'Passwords do not match. Please re-enter.';
          recoveryError.style.display = 'block';
        }
        return;
      }

      const submitBtn = document.getElementById('recoverySubmitBtn');
      if (submitBtn) { submitBtn.textContent = 'Verifying & Resetting...'; submitBtn.disabled = true; }

      try {
        const res = await fetch(`${API_BASE}/api/auth/verify-otp-reset`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, otp, newPassword: newPwd })
        });
        const data = await res.json();

        if (data.success && data.user) {
          state.currentUser = data.user;
          localStorage.setItem('rsa_user', JSON.stringify(data.user));
          updateAuthUI();

          if (recoverySuccess) {
            recoverySuccess.textContent = '✅ ' + (data.message || 'Password reset successfully! You are now logged in.');
            recoverySuccess.style.display = 'block';
          }
          showToast('Password reset successfully! Logged into your account.', 'toast-success');
          setTimeout(() => { authDialog.close(); }, 1800);
        } else {
          if (recoveryError) {
            recoveryError.textContent = data.error || 'Password reset failed. Please check OTP.';
            recoveryError.style.display = 'block';
          }
        }
      } catch (err) {
        if (recoveryError) {
          recoveryError.textContent = 'Server connection error. Please try again later.';
          recoveryError.style.display = 'block';
        }
      } finally {
        if (submitBtn) { submitBtn.textContent = 'Verify OTP & Reset Password'; submitBtn.disabled = false; }
      }
    });
  }

  // Login Form Submission
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      loginError.style.display = 'none';
      const identifier = loginIdentifier.value.trim();
      const password = loginPassword.value;

      try {
        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, password })
        });
        const data = await res.json();

        if (data.success && data.user) {
          state.currentUser = data.user;
          localStorage.setItem('rsa_user', JSON.stringify(data.user));
          updateAuthUI();
          authDialog.close();
          loginForm.reset();
          showToast(`Welcome back, ${data.user.name}!`, 'toast-success');

          // If no address saved, prompt to add address
          if (!data.user.addresses || data.user.addresses.length === 0) {
            setTimeout(() => {
              openAddressModal();
            }, 600);
          }
        } else {
          loginError.textContent = data.error || 'Failed to login. Please check your credentials.';
          loginError.style.display = 'block';
        }
      } catch (err) {
        loginError.textContent = 'Network error. Please make sure the server is running.';
        loginError.style.display = 'block';
      }
    });
  }

  // Signup Form Submission
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      signupError.style.display = 'none';
      const name = signupName.value.trim();
      const email = signupEmail.value.trim();
      const mobile = signupMobile.value.trim();
      const password = signupPassword.value;

      if (!email && !mobile) {
        signupError.textContent = 'Please enter either an email address or mobile number.';
        signupError.style.display = 'block';
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, mobile, password })
        });
        const data = await res.json();

        if (data.success && data.user) {
          state.currentUser = data.user;
          localStorage.setItem('rsa_user', JSON.stringify(data.user));
          updateAuthUI();
          authDialog.close();
          signupForm.reset();
          showToast(`Account created! Welcome to RSA Creations, ${data.user.name}.`, 'toast-success');

          // Prompt customer to add delivery address
          setTimeout(() => {
            openAddressModal();
          }, 600);
        } else {
          signupError.textContent = data.error || 'Signup failed. Please try again.';
          signupError.style.display = 'block';
        }
      } catch (err) {
        signupError.textContent = 'Network error. Please try again.';
        signupError.style.display = 'block';
      }
    });
  }

  // Address Form Submission
  if (addressForm) {
    addressForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      addressError.style.display = 'none';

      if (!state.currentUser) {
        addressError.textContent = 'Please login first.';
        addressError.style.display = 'block';
        return;
      }

      const street = addrStreet.value.trim();
      const city = addrCity.value.trim();
      const pincode = addrPincode.value.trim();
      const stateVal = addrState.value.trim() || (city.toLowerCase().includes('kolkata') ? 'West Bengal' : 'India');

      if (!/^[1-9][0-9]{5}$/.test(pincode)) {
        addressError.textContent = 'Please enter a valid 6-digit Indian pincode (e.g., 700001).';
        addressError.style.display = 'block';
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/auth/profile/${state.currentUser.userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address: street, city, pincode, state: stateVal })
        });
        const data = await res.json();

        if (data.success && data.user) {
          state.currentUser = data.user;
          localStorage.setItem('rsa_user', JSON.stringify(data.user));
          updateAuthUI();
          addressDialog.close();
          addressForm.reset();
          showToast('Delivery address saved! You can now place orders.', 'toast-success');
        } else {
          addressError.textContent = data.error || 'Failed to save address.';
          addressError.style.display = 'block';
        }
      } catch (err) {
        // Fallback local save
        if (!state.currentUser.addresses) state.currentUser.addresses = [];
        state.currentUser.addresses.forEach(a => a.isDefault = false);
        state.currentUser.addresses.push({
          id: 'ADDR-' + Date.now(),
          address: street,
          city,
          pincode,
          state: stateVal,
          isDefault: true
        });
        localStorage.setItem('rsa_user', JSON.stringify(state.currentUser));
        updateAuthUI();
        addressDialog.close();
        addressForm.reset();
        showToast('Delivery address saved! You can now place orders.', 'toast-success');
      }
    });
  }

  // Set Default Address Delegate
  if (addressCards) {
    addressCards.addEventListener('click', (e) => {
      const btn = e.target.closest('.set-default-addr-btn');
      if (!btn || !state.currentUser || !state.currentUser.addresses) return;
      const idx = parseInt(btn.dataset.index, 10);
      state.currentUser.addresses.forEach((a, i) => a.isDefault = (i === idx));
      localStorage.setItem('rsa_user', JSON.stringify(state.currentUser));
      renderSavedAddresses();
      autofillCheckoutFromUser();
      showToast('Default delivery address updated!', 'toast-success');
    });
  }

  // Dropdown Items
  if (dropdownAddressBtn) {
    dropdownAddressBtn.addEventListener('click', () => {
      userDropdown.style.display = 'none';
      openAddressModal();
    });
  }

  if (dropdownOrdersBtn) {
    dropdownOrdersBtn.addEventListener('click', async () => {
      userDropdown.style.display = 'none';
      if (!state.currentUser) return;
      try {
        const res = await fetch(`${API_BASE}/api/orders`);
        if (res.ok) {
          const data = await res.json();
          const userOrders = (data.orders || []).filter(o => 
            (state.currentUser.email && o.customer?.email === state.currentUser.email) ||
            (state.currentUser.mobile && o.customer?.phone === state.currentUser.mobile) ||
            (o.customer?.name === state.currentUser.name)
          );
          if (userOrders.length === 0) {
            showToast('You haven’t placed any orders yet. Discover our handcrafted collection!');
          } else {
            showToast(`Found ${userOrders.length} order(s). Latest: ${userOrders[0].orderId} (${userOrders[0].status})`, 'toast-success');
          }
        }
      } catch (err) {
        showToast('Order lookup available after placing orders.');
      }
    });
  }

  if (dropdownLogoutBtn) {
    dropdownLogoutBtn.addEventListener('click', () => {
      state.currentUser = null;
      localStorage.removeItem('rsa_user');
      updateAuthUI();
      userDropdown.style.display = 'none';
      showToast('You have been logged out.');
    });
  }

  // Mobile navigation hamburger toggle
  mobileNavToggle.addEventListener('click', () => {
    const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
    mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('open');
  });

  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      mobileNavToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Wishlist header icon click
  document.getElementById('wishlistHeaderBtn').addEventListener('click', () => {
    if (state.wishlist.length === 0) {
      showToast('Your wishlist is empty. Tap the heart on any product to save it!');
    } else {
      showToast(`You have ${state.wishlist.length} handcrafted piece(s) saved in your wishlist.`);
    }
  });

  // Newsletter form
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    showToast(`Welcome! A 10% discount coupon was sent to ${email}`, 'toast-success');
    newsletterForm.reset();
  });

  // Footer category links
  document.querySelectorAll('.footer-col a[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
      const filter = link.getAttribute('data-filter');
      state.selectedCategory = filter;
      categoryPills.querySelectorAll('.pill-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === filter);
        btn.setAttribute('aria-selected', btn.dataset.category === filter ? 'true' : 'false');
      });
      renderProducts();
    });
  });
}

// Immediate execution safeguard if DOM is already ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
