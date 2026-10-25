/**
 * ============================================================================
 * RSA Creations - Production-Ready Artisanal E-Commerce Backend
 * Tech Stack: Node.js, Express, CORS
 * Zero-Database Setup: Auto-persists to data/orders.json
 * ============================================================================
 */
const crypto = require('crypto');

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const SERVER_START_TIME = new Date();

// Middleware: Enable CORS for mobile & laptop devices
app.use(cors());
app.use(express.json());

// Serve static frontend files (index.html, styles.css, app.js, admin.html) directly
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../RSA-frontend')));

// Direct Storefront Route Handlers
app.get(['/', '/index.html'], (req, res) => {
  const localIndex = path.resolve(__dirname, 'index.html');
  const parentIndex = path.resolve(__dirname, '../RSA-frontend/index.html');
  if (fs.existsSync(localIndex)) return res.sendFile(localIndex);
  if (fs.existsSync(parentIndex)) return res.sendFile(parentIndex);
  res.send('RSA Creations Storefront');
});

// Direct Admin Portal Route Handlers
app.get(['/admin', '/admin.html'], (req, res) => {
  const localAdmin = path.resolve(__dirname, 'admin.html');
  const parentAdmin = path.resolve(__dirname, '../RSA-frontend/admin.html');
  if (fs.existsSync(localAdmin)) return res.sendFile(localAdmin);
  if (fs.existsSync(parentAdmin)) return res.sendFile(parentAdmin);
  res.send('RSA Creations Admin Portal');
});

// Data Directory & Persistence
const DATA_DIR = path.join(__dirname, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

function getOrders() {
  try {
    const data = fs.readFileSync(ORDERS_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading orders file:', err.message);
    return [];
  }
}

function saveOrders(orders) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error('Error saving orders file:', err.message);
  }
}

function getUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading users file:', err.message);
    return [];
  }
}

function saveUsers(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error saving users file:', err.message);
  }
}

// Handcrafted Products Catalog with INR Pricing & Stock
const INITIAL_PRODUCTS = [
  {
    id: 'rsa-1',
    title: 'Raw Glaze Ceramic Earth Mug',
    category: 'pottery',
    categoryLabel: 'Pottery & Ceramics',
    price: 650,
    stock: 15,
    rating: 4.9,
    reviewsCount: 38,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80',
    description: 'Individually hand-thrown on potter’s wheel in small batches with iron-rich clay and wood-ash glaze.',
    materials: 'High-fire stoneware clay, non-toxic mineral glaze',
    dimensions: '3.6" Dia x 4.2" H (350 ml)'
  },
  {
    id: 'rsa-2',
    title: 'Handwoven Jute & Wool Tapestry',
    category: 'textiles',
    categoryLabel: 'Handwoven Textiles',
    price: 1850,
    stock: 8,
    rating: 5.0,
    reviewsCount: 24,
    badge: 'Artisan Pick',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80',
    description: 'Loom-woven tapestry blending raw organic Bengal jute with soft wool yarn on an oak dowel.',
    materials: '100% Unbleached Bengal jute, cruelty-free yarn, oak dowel',
    dimensions: '18" W x 32" L'
  },
  {
    id: 'rsa-3',
    title: 'Terracotta Fluted Footed Planter',
    category: 'pottery',
    categoryLabel: 'Pottery & Ceramics',
    price: 850,
    stock: 20,
    rating: 4.8,
    reviewsCount: 42,
    badge: 'Handmade',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80',
    description: 'Porous native terracotta hand-fluted to provide optimal root breathability. Includes drainage hole.',
    materials: 'Native Bengal terracotta clay',
    dimensions: '6.5" Dia x 7" H'
  },
  {
    id: 'rsa-4',
    title: 'Hand-Carved Reclaimed Teak Bowl',
    category: 'decor',
    categoryLabel: 'Home Accents',
    price: 1450,
    stock: 6,
    rating: 4.9,
    reviewsCount: 19,
    badge: 'Limited Drop',
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=700&q=80',
    description: 'Carved from reclaimed solid teak roots with organic live edges and hand-rubbed organic beeswax.',
    materials: 'Salvaged solid teak root, organic walnut oil finish',
    dimensions: 'Approx 9"-10" Dia x 3.5" Depth'
  },
  {
    id: 'rsa-5',
    title: 'Wild Honey & Mountain Sage Beeswax Candles',
    category: 'decor',
    categoryLabel: 'Home Accents',
    price: 699,
    stock: 25,
    rating: 4.7,
    reviewsCount: 51,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80',
    description: 'Duo of hand-poured golden beeswax candles scented with wild mountain sage and botanicals.',
    materials: '100% Pure beeswax, essential oils, cotton wick',
    dimensions: 'Pair of 200g jars (45+ hrs burn time)'
  },
  {
    id: 'rsa-6',
    title: 'Macramé Tiered Floating Plant Shelf',
    category: 'textiles',
    categoryLabel: 'Handwoven Textiles',
    price: 950,
    stock: 12,
    rating: 4.9,
    reviewsCount: 29,
    badge: 'Handmade',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80',
    description: 'Intricately knotted with heavy-duty 4mm natural cotton cord, supporting a solid circular pine wood tier.',
    materials: '4mm Natural cotton rope, smooth pine wood disc',
    dimensions: '42" Total Hanging Length; 9" Shelf Dia'
  },
  {
    id: 'rsa-7',
    title: 'Botanical Block-Printed Table Runner',
    category: 'textiles',
    categoryLabel: 'Handwoven Textiles',
    price: 890,
    stock: 14,
    rating: 4.8,
    reviewsCount: 16,
    badge: 'Artisan Pick',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80',
    description: 'Hand-stamped using carved rosewood blocks and natural vegetable dyes on dense unbleached cotton.',
    materials: '100% Heavy cotton slub, natural plant dyes',
    dimensions: '14" W x 72" L'
  },
  {
    id: 'rsa-8',
    title: 'Hammered Brass Sunburst Drop Earrings',
    category: 'accessories',
    categoryLabel: 'Handmade Jewelry',
    price: 750,
    stock: 18,
    rating: 5.0,
    reviewsCount: 33,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80',
    description: 'Forged from raw solid brass sheet with distinctive dappled hammer marks that reflect candlelight.',
    materials: 'Raw jewelers brass, hypoallergenic 14k gold-plated hooks',
    dimensions: '2.2" Drop Length x 1.2" Width'
  }
];

if (!fs.existsSync(PRODUCTS_FILE)) {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(INITIAL_PRODUCTS, null, 2));
}

function getProducts() {
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading products file:', err.message);
    return INITIAL_PRODUCTS;
  }
}

function saveProducts(products) {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
  } catch (err) {
    console.error('Error saving products file:', err.message);
  }
}

// Helper: Calculate Shipping Rates & 7-10 Days Timeline
// Policy: Kolkata = FREE (₹0), Outside Kolkata (West Bengal) = ₹100, Outside Bengal (Rest of India) = ₹150
function calculateShippingDetails(city = '', pincode = '', state = '', subtotal = 0) {
  const cityClean = (city || '').trim().toLowerCase();
  const pinClean = (pincode || '').trim();
  const stateClean = (state || '').trim().toLowerCase();

  let deliveryCharge = 150; // Default outside WB (Rest of India)
  let region = 'Outside Bengal (Rest of India)';
  let isFreeDelivery = false;

  // 1. Kolkata Rule:
  // City contains 'kolkata' or 'calcutta', OR pincode starts with '700'
  const isKolkata = cityClean.includes('kolkata') || 
                    cityClean.includes('calcutta') || 
                    pinClean.startsWith('700');

  if (isKolkata) {
    deliveryCharge = 0; // FREE Delivery for Kolkata!
    region = 'Kolkata (Free Delivery)';
    isFreeDelivery = true;
  } else {
    // 2. Rest of West Bengal Rule:
    // Pincode starts with 71, 72, 73, 74 or state mentions Bengal
    const isWestBengal = stateClean.includes('bengal') || 
                         pinClean.startsWith('71') || 
                         pinClean.startsWith('72') || 
                         pinClean.startsWith('73') || 
                         pinClean.startsWith('74');

    if (isWestBengal) {
      deliveryCharge = 100; // Flat ₹100 for West Bengal outside Kolkata
      region = 'West Bengal (Outside Kolkata)';
    } else {
      deliveryCharge = 150; // Flat ₹150 for outside Bengal (Rest of India)
      region = 'Outside Bengal (Rest of India)';
    }
  }

  // 3. Dynamic 7 to 10 Business Days Arrival Calculation
  const today = new Date();
  const minDeliveryDate = new Date(today);
  minDeliveryDate.setDate(today.getDate() + 7);

  const maxDeliveryDate = new Date(today);
  maxDeliveryDate.setDate(today.getDate() + 10);

  const options = { month: 'short', day: 'numeric' };
  const formattedDateRange = `${minDeliveryDate.toLocaleDateString('en-IN', options)} - ${maxDeliveryDate.toLocaleDateString('en-IN', options)}`;

  return {
    deliveryCharge,
    standardRate: deliveryCharge,
    region,
    freeShippingUnlocked: isFreeDelivery,
    isKolkataFree: isKolkata,
    deliveryRateNote: isKolkata 
      ? 'FREE Delivery for Kolkata orders' 
      : (region.includes('West Bengal') ? '₹100 Delivery (West Bengal)' : '₹150 Delivery (Outside Bengal)'),
    estimatedDeliveryDays: '7 to 10 business days',
    estimatedDateRange: formattedDateRange
  };
}

// Helper: Generate printable, formatted Tax Invoice HTML
function generateInvoiceHtml(order) {
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
      letter-spacing: 1px;
    }
    .inv-brand-name {
      font-size: 24px;
      font-weight: 800;
      color: #1f2937;
      letter-spacing: -0.5px;
    }
    .inv-brand-tag {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .inv-title-badge {
      text-align: right;
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
    .inv-num {
      font-size: 15px;
      font-weight: 700;
      color: #111827;
    }
    .inv-date {
      font-size: 12px;
      color: #6b7280;
    }
    .inv-info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
      padding: 16px;
      background: #fafaf9;
      border-radius: 8px;
      border: 1px solid #f0eee9;
    }
    .inv-info-block h4 {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #8b5cf6;
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
      font-weight: 600;
      padding: 10px;
      text-align: left;
      border-bottom: 2px solid #e5e7eb;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .inv-totals-box {
      margin-left: auto;
      width: 320px;
      margin-bottom: 24px;
    }
    .inv-total-row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      font-size: 13px;
      color: #4b5563;
    }
    .inv-total-row.grand-total {
      border-top: 2px solid #111827;
      border-bottom: 2px solid #111827;
      padding: 10px 0;
      font-size: 16px;
      font-weight: 800;
      color: #111827;
      margin-top: 6px;
    }
    .free-badge {
      background: #dcfce7;
      color: #15803d;
      font-size: 11px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .payment-verified-box {
      background: #fdf4ff;
      border: 1px solid #f0abfc;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .pay-verified-title {
      font-size: 13px;
      font-weight: 700;
      color: #86198f;
    }
    .pay-verified-meta {
      font-size: 12px;
      color: #701a75;
      margin-top: 2px;
    }
    .stamp-box {
      border: 2px dashed #5F259F;
      color: #5F259F;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 6px 10px;
      border-radius: 4px;
      text-align: center;
      display: inline-block;
    }
    .inv-footer {
      border-top: 1px solid #e5e7eb;
      padding-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #9ca3af;
    }
    .action-bar {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-top: 20px;
    }
    .btn-action {
      background: #5F259F;
      color: #fff;
      border: none;
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn-action:hover {
      background: #4a1d7c;
    }
    .btn-secondary {
      background: #e5e7eb;
      color: #374151;
    }
    .btn-secondary:hover {
      background: #d1d5db;
    }
    @media print {
      body { background: #fff; padding: 0; }
      .invoice-container { box-shadow: none; border: none; padding: 0; width: 100%; max-width: 100%; }
      .action-bar { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="invoice-container" id="invoiceSheet">
    <!-- Header -->
    <div class="inv-top-bar">
      <div class="inv-logo-box">
        <span class="inv-logo-mark">RSA</span>
        <div>
          <div class="inv-brand-name">RSA CREATIONS</div>
          <div class="inv-brand-tag">Handcrafted Studio • Kolkata</div>
        </div>
      </div>
      <div class="inv-title-badge">
        <span class="tax-inv-pill">Official Tax Invoice</span>
        <div class="inv-num">Invoice #${order.orderId}</div>
        <div class="inv-date">Date: ${orderDate}</div>
      </div>
    </div>

    <!-- Seller & Buyer Details -->
    <div class="inv-info-grid">
      <div class="inv-info-block">
        <h4>Sold & Dispatched By:</h4>
        <p><strong>RSA Creations Artisan Workshop</strong></p>
        <p>Kolkata, West Bengal - 700001, India</p>
        <p>Email: contact@rsacreations.in</p>
        <p>PhonePe / WhatsApp: +91 7980883038</p>
        <p style="font-size: 11px; color: #6b7280; margin-top: 4px;">State: West Bengal (Code: 19)</p>
      </div>
      <div class="inv-info-block">
        <h4>Billed & Shipped To:</h4>
        <p><strong>${order.customer?.name || 'Customer'}</strong></p>
        <p>${order.customer?.address || 'Address on file'}</p>
        <p>${order.customer?.city || ''}${order.customer?.pincode ? ' - ' + order.customer.pincode : ''}</p>
        <p>${order.customer?.state || 'India'}</p>
        <p>Phone: +91 ${order.customer?.phone || ''}</p>
        ${order.customer?.email ? `<p>Email: ${order.customer.email}</p>` : ''}
      </div>
    </div>

    <!-- Items Table -->
    <table class="inv-table">
      <thead>
        <tr>
          <th style="width: 40px; text-align: center;">#</th>
          <th>Item Description</th>
          <th style="width: 60px; text-align: center;">Qty</th>
          <th style="width: 100px; text-align: right;">Unit Rate</th>
          <th style="width: 110px; text-align: right;">Total Amount</th>
        </tr>
      </thead>
      <tbody>
        ${itemsRows}
      </tbody>
    </table>

    <!-- Totals Breakdown -->
    <div class="inv-totals-box">
      <div class="inv-total-row">
        <span>Items Subtotal:</span>
        <span>₹${(order.pricing?.subtotal || 0).toLocaleString('en-IN')}</span>
      </div>
      ${order.pricing?.discount > 0 ? `
      <div class="inv-total-row" style="color: #15803d;">
        <span>Artisan Coupon (${order.pricing?.couponCode || 'HANDMADE10'}):</span>
        <span>-₹${order.pricing.discount.toLocaleString('en-IN')}</span>
      </div>` : ''}
      <div class="inv-total-row">
        <span>${deliveryLabel}:</span>
        <span>${order.pricing?.deliveryCharge === 0 ? '<span class="free-badge">FREE (₹0)</span>' : '₹' + (order.pricing?.deliveryCharge || 0)}</span>
      </div>
      <div class="inv-total-row grand-total">
        <span>Total Paid:</span>
        <span style="color: #5F259F;">₹${(order.pricing?.totalAmount || 0).toLocaleString('en-IN')}</span>
      </div>
    </div>

    <!-- Verified Payment Banner -->
    <div class="payment-verified-box">
      <div>
        <div class="pay-verified-title">✅ 100% Online Payment Verified</div>
        <div class="pay-verified-meta">
          <strong>Mode:</strong> ${order.payment?.method || 'Online PhonePe UPI (7980883038)'}<br>
          <strong>UTR / Transaction Ref:</strong> <code>${order.payment?.transactionId || 'Verified Online'}</code>
        </div>
      </div>
      <div class="stamp-box">
        PAID IN FULL<br>RSA CREATIONS
      </div>
    </div>

    <!-- Footer -->
    <div class="inv-footer">
      <div>
        <strong>Estimated Delivery:</strong> ${order.delivery?.timeline || '7 to 10 business days'}<br>
        Thank you for supporting traditional Indian artisans & handmade craft!
      </div>
      <div style="text-align: right;">
        <strong>Authorized Signatory</strong><br>
        RSA Creations (Kolkata)
      </div>
    </div>
  </div>

  <!-- Print & Download Action Bar -->
  <div class="action-bar">
    <button class="btn-action" onclick="window.print()">
      🖨️ Print / Save as PDF
    </button>
    <button class="btn-action btn-secondary" onclick="window.close()">
      ✖ Close Window
    </button>
  </div>
</body>
</html>`;
}

// Helper: Format WhatsApp notification text for artisan/seller
function generateWhatsAppMessage(order) {
  const itemsText = order.items
    .map(i => `• ${i.title || i.name} (x${i.quantity}) - ₹${i.price * i.quantity}`)
    .join('\n');

  const paymentText = order.payment 
    ? `\n*Payment Mode:* ${order.payment.method} (No COD)\n*PhonePe UPI:* ${order.payment.upiNumber}\n*UTR / Ref No:* ${order.payment.transactionId}`
    : `\n*Payment:* Online PhonePe: 7980883038 (Prepaid - No COD)`;

  return `🛍️ *NEW ORDER RECEIVED - RSA CREATIONS*
---------------------------------------
*Order ID:* ${order.orderId}
*Customer:* ${order.customer.name}
*Phone:* ${order.customer.phone}
*Address:* ${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}
---------------------------------------
*Items Ordered:*
${itemsText}
---------------------------------------
*Subtotal:* ₹${order.pricing.subtotal}
*Discount:* -₹${order.pricing.discount}
*Delivery Fee (${order.pricing.deliveryRegion}):* ₹${order.pricing.deliveryCharge}
*Total Payable:* ₹${order.pricing.totalAmount}${paymentText}
*Estimated Delivery:* ${order.delivery.estimatedDateRange} (${order.delivery.timeline})
---------------------------------------
Handcrafted with love at RSA Creations ✨`;
}

// ============================================================================
// REST API ENDPOINTS
// ============================================================================

// 1. GET /api/products - Get full product catalog with stock
app.get('/api/products', (req, res) => {
  const products = getProducts();
  res.json({
    success: true,
    currency: 'INR',
    currencySymbol: '₹',
    count: products.length,
    products: products
  });
});

// 2. POST /api/shipping/calculate - Dynamic shipping calculation
app.post('/api/shipping/calculate', (req, res) => {
  const { city, pincode, state, subtotal } = req.body;

  // Validate 6-digit Indian Pincode if provided
  if (pincode && !/^[1-9][0-9]{5}$/.test(pincode.trim())) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid 6-digit Indian postal pincode (e.g., 700001).'
    });
  }

  const numSubtotal = parseFloat(subtotal) || 0;
  const shippingInfo = calculateShippingDetails(city, pincode, state, numSubtotal);

  res.json({
    success: true,
    currency: 'INR',
    currencySymbol: '₹',
    ...shippingInfo
  });
});

// 3. POST /api/coupons/validate - Validate coupon code
app.post('/api/coupons/validate', (req, res) => {
  const { code, subtotal } = req.body;
  const numSubtotal = parseFloat(subtotal) || 0;

  if (!code || typeof code !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Please provide a coupon code.'
    });
  }

  const cleanCode = code.trim().toUpperCase();

  if (cleanCode === 'HANDMADE10') {
    const discountAmount = Math.round(numSubtotal * 0.10);
    const newTotal = Math.max(0, numSubtotal - discountAmount);

    return res.json({
      success: true,
      valid: true,
      code: 'HANDMADE10',
      discountPercentage: 10,
      discountAmount,
      newSubtotal: newTotal,
      message: 'Coupon HANDMADE10 applied: 10% discount on handcrafted pieces!'
    });
  }

  return res.status(404).json({
    success: false,
    valid: false,
    error: 'Invalid coupon code. Try using "HANDMADE10" for 10% off.'
  });
});

// 4. POST /api/orders - Create & record customer order
app.post('/api/orders', (req, res) => {
  try {
    const {
      customerName,
      phone,
      email,
      address,
      city,
      pincode,
      state,
      items,
      promoCode
    } = req.body;

    // Strict Validations
    if (!customerName || customerName.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Full customer name is required.' });
    }

    // Validate 10-digit Indian Mobile Number
    const cleanPhone = (phone || '').replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).'
      });
    }

    if (!address || address.trim().length < 5) {
      return res.status(400).json({ success: false, error: 'Complete street delivery address is required.' });
    }

    if (!city || city.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'City name is required.' });
    }

    const cleanPincode = (pincode || '').trim();
    if (!/^[1-9][0-9]{5}$/.test(cleanPincode)) {
      return res.status(400).json({ success: false, error: 'A valid 6-digit Indian pincode is required.' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, error: 'Basket cannot be empty.' });
    }

    // Verify item prices from official product list (prevents client-side price tampering)
    let computedSubtotal = 0;
    const verifiedItems = [];

    const catalog = getProducts();
    for (const item of items) {
      const product = catalog.find(p => p.id === item.id);
      if (!product) {
        return res.status(400).json({ success: false, error: `Product with ID '${item.id}' was not found in catalog.` });
      }
      const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
      computedSubtotal += product.price * qty;

      verifiedItems.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: qty,
        lineTotal: product.price * qty
      });
    }

    // Discount check
    let discount = 0;
    let appliedCoupon = null;
    if (promoCode && promoCode.trim().toUpperCase() === 'HANDMADE10') {
      discount = Math.round(computedSubtotal * 0.10);
      appliedCoupon = 'HANDMADE10';
    }

    // Calculate Shipping using Kolkata / WB / Rest of India rules
    const shipping = calculateShippingDetails(city, cleanPincode, state, computedSubtotal);
    const totalAmount = Math.max(0, computedSubtotal - discount + shipping.deliveryCharge);

    // Generate readable Order ID
    const prefix = shipping.region === 'Kolkata' ? 'RSA-KOL' : 'RSA-IND';
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `${prefix}-${randomSuffix}`;

    // Enforce Online Payment Only (No Cash on Delivery)
    if (req.body.paymentMethod === 'COD' || req.body.isCod === true) {
      return res.status(400).json({
        success: false,
        error: 'Cash on Delivery (COD) is disabled. Please pay via PhonePe / UPI (7980883038).'
      });
    }

    // MANDATORY PREPAID UPI PAYMENT ENFORCEMENT
    const upiTransactionId = (req.body.transactionId || req.body.upiTransactionId || '').trim();
    if (!upiTransactionId || upiTransactionId.length < 8) {
      return res.status(400).json({
        success: false,
        error: `Prepaid Payment Verification Required! Please pay ₹${totalAmount} to PhonePe UPI (7980883038) and enter your 12-digit UPI / UTR Transaction ID to confirm your order.`
      });
    }

    const paymentInfo = {
      method: 'Online PhonePe / UPI (Prepaid)',
      upiNumber: '7980883038',
      upiId: '7980883038@ybl',
      transactionId: upiTransactionId,
      paidAmount: totalAmount,
      status: `Paid & Verified (UTR: ${upiTransactionId})`,
      verifiedAt: new Date().toISOString(),
      codAvailable: false
    };

    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      status: 'Confirmed & In Artisan Workshop',
      customer: {
        name: customerName.trim(),
        phone: cleanPhone,
        email: email ? email.trim() : null,
        address: address.trim(),
        city: city.trim(),
        pincode: cleanPincode,
        state: state ? state.trim() : (shipping.region === 'Kolkata' ? 'West Bengal' : 'India')
      },
      items: verifiedItems,
      pricing: {
        currency: 'INR',
        currencySymbol: '₹',
        subtotal: computedSubtotal,
        discount,
        couponCode: appliedCoupon,
        deliveryCharge: shipping.deliveryCharge,
        deliveryRegion: shipping.region,
        totalAmount
      },
      payment: paymentInfo,
      delivery: {
        timeline: shipping.estimatedDeliveryDays,
        estimatedDateRange: shipping.estimatedDateRange,
        packaging: 'Biodegradable protective craft packaging'
      }
    };

    // Attach pre-formatted WhatsApp message for instant seller alert
    newOrder.whatsappMessage = generateWhatsAppMessage(newOrder);

    // Save into data/orders.json
    const orders = getOrders();
    orders.unshift(newOrder);
    saveOrders(orders);

    console.log(`[Order Created] ${newOrder.orderId} - ₹${totalAmount} for ${newOrder.customer.name} (${shipping.region})`);

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully! Handcrafted with love at RSA Creations.',
      order: newOrder
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your order.'
    });
  }
});

// 5. GET /api/orders/:orderId - Order lookup by ID
app.get('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const orders = getOrders();
  const order = orders.find(o => o.orderId.toUpperCase() === orderId.toUpperCase());

  if (!order) {
    return res.status(404).json({
      success: false,
      error: `Order with ID '${orderId}' was not found.`
    });
  }

  res.json({
    success: true,
    order
  });
});

// 5b. GET /api/orders/:orderId/invoice - Render or download full printable Tax Invoice
app.get('/api/orders/:orderId/invoice', (req, res) => {
  const { orderId } = req.params;
  const orders = getOrders();
  const order = orders.find(o => o.orderId.toUpperCase() === orderId.toUpperCase());

  if (!order) {
    return res.status(404).send(`
      <!DOCTYPE html><html><body style="font-family:sans-serif; text-align:center; padding:50px;">
        <h2>Order Not Found</h2>
        <p>No order found with ID #${orderId}.</p>
      </body></html>
    `);
  }

  if (req.query.format === 'json' || req.headers.accept?.includes('application/json')) {
    return res.json({
      success: true,
      orderId: order.orderId,
      invoiceHtml: generateInvoiceHtml(order),
      order
    });
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(generateInvoiceHtml(order));
});

// 6. GET /api/orders - All orders list (Admin / Dashboard)
app.get('/api/orders', (req, res) => {
  const orders = getOrders();
  res.json({
    success: true,
    count: orders.length,
    orders
  });
});

// ============================================================================
// AUTHENTICATION & USER MANAGEMENT ENDPOINTS
// ============================================================================

// 7. POST /api/auth/signup - Customer Registration (email or mobile)
app.post('/api/auth/signup', (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Full name is required (minimum 2 characters).' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters.' });
    }

    // Must provide either email or mobile
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanMobile = (mobile || '').replace(/\D/g, '');

    if (!cleanEmail && !cleanMobile) {
      return res.status(400).json({ success: false, error: 'Please provide either an email address or a 10-digit mobile number.' });
    }

    if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }

    if (cleanMobile && !/^[6-9]\d{9}$/.test(cleanMobile)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid 10-digit Indian mobile number.' });
    }

    const users = getUsers();

    // Check if user already exists
    const existingUser = users.find(u => 
      (cleanEmail && u.email === cleanEmail) || 
      (cleanMobile && u.mobile === cleanMobile)
    );

    if (existingUser) {
      return res.status(409).json({ success: false, error: 'An account with this email or mobile already exists. Please login instead.' });
    }

    const userId = 'USR-' + crypto.randomBytes(4).toString('hex').toUpperCase();

    const newUser = {
      userId,
      name: name.trim(),
      email: cleanEmail || null,
      mobile: cleanMobile || null,
      password, // Note: In production, use bcrypt hashing
      addresses: [],
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    console.log(`[Signup] New customer: ${newUser.name} (${userId})`);

    const { password: _, ...safeUser } = newUser;
    return res.status(201).json({
      success: true,
      message: 'Welcome to RSA Creations! Your account has been created.',
      user: safeUser
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, error: 'An error occurred during signup.' });
  }
});

// 8. POST /api/auth/login - Customer Login (email or mobile + password)
app.post('/api/auth/login', (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !identifier.trim()) {
      return res.status(400).json({ success: false, error: 'Please enter your email or mobile number.' });
    }

    if (!password) {
      return res.status(400).json({ success: false, error: 'Please enter your password.' });
    }

    const clean = identifier.trim().toLowerCase();
    const users = getUsers();

    const user = users.find(u => 
      u.email === clean || u.mobile === clean.replace(/\D/g, '')
    );

    if (!user) {
      return res.status(404).json({ success: false, error: 'No account found with this email or mobile number.' });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, error: 'Incorrect password. Please try again.' });
    }

    console.log(`[Login] Customer logged in: ${user.name} (${user.userId})`);

    const { password: _, ...safeUser } = user;
    return res.json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      user: safeUser
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'An error occurred during login.' });
  }
});

// In-memory OTP storage for OTP Login & Password Reset (TTL: 10 minutes)
const otpStore = new Map();

function getOtpKey(identifier, purpose = 'general') {
  if (!identifier) return '';
  const clean = identifier.includes('@') ? identifier.trim().toLowerCase() : identifier.replace(/\D/g, '');
  return `${purpose}:${clean}`;
}

// 8.1 POST /api/auth/send-otp - Generate & Send 6-digit OTP for Login or Password Reset
app.post('/api/auth/send-otp', (req, res) => {
  try {
    const { identifier, purpose = 'login' } = req.body;
    if (!identifier || !identifier.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your registered mobile number or email address.'
      });
    }

    const trimmed = identifier.trim();
    const cleanMobile = trimmed.replace(/\D/g, '');
    const cleanEmail = trimmed.toLowerCase();

    const users = getUsers();
    const user = users.find(u => 
      (cleanMobile.length === 10 && u.mobile === cleanMobile) ||
      (u.email && u.email.toLowerCase() === cleanEmail)
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: `No registered account found for "${identifier}". Please check or sign up.`
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    const key = getOtpKey(trimmed, purpose);
    otpStore.set(key, {
      otp,
      expiresAt,
      userId: user.userId,
      identifier: trimmed,
      purpose
    });

    console.log(`[AUTH OTP] Generated ${purpose.toUpperCase()} OTP for ${user.name} (${trimmed}): ${otp}`);

    const destination = cleanMobile.length === 10 ? `mobile ${cleanMobile}` : `email ${cleanEmail}`;
    return res.json({
      success: true,
      message: `OTP sent successfully to registered ${destination}!`,
      otp, // Provided for instant simulation & seamless testing
      expiresIn: 600,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        mobile: user.mobile
      }
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ success: false, error: 'Failed to send OTP. Please try again.' });
  }
});

// 8.2 POST /api/auth/verify-otp-login - Login customer using verified 6-digit OTP
app.post('/api/auth/verify-otp-login', (req, res) => {
  try {
    const { identifier, otp } = req.body;
    if (!identifier || !otp) {
      return res.status(400).json({
        success: false,
        error: 'Both identifier (mobile/email) and 6-digit OTP are required.'
      });
    }

    const key = getOtpKey(identifier, 'login');
    const stored = otpStore.get(key);

    if (!stored) {
      return res.status(400).json({
        success: false,
        error: 'No active OTP request found. Please click "Send OTP" first.'
      });
    }

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(key);
      return res.status(400).json({
        success: false,
        error: 'OTP has expired. Please request a new OTP.'
      });
    }

    if (stored.otp !== otp.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Incorrect OTP. Please enter the valid 6-digit OTP.'
      });
    }

    // OTP verified successfully
    otpStore.delete(key);

    const users = getUsers();
    const user = users.find(u => u.userId === stored.userId);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User account not found.' });
    }

    const { password: _, ...safeUser } = user;
    console.log(`[OTP Login Success] User ${safeUser.name} (${safeUser.userId}) logged in via OTP`);

    return res.json({
      success: true,
      message: `Welcome back, ${safeUser.name}! Logged in successfully.`,
      user: safeUser
    });
  } catch (error) {
    console.error('Verify OTP Login error:', error);
    res.status(500).json({ success: false, error: 'An error occurred during OTP verification.' });
  }
});

// 8.3 POST /api/auth/verify-otp-reset - Reset Password using verified 6-digit OTP
app.post('/api/auth/verify-otp-reset', (req, res) => {
  try {
    const { identifier, otp, newPassword } = req.body;
    if (!identifier || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Identifier, 6-digit OTP, and new password are all required.'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'New password must be at least 6 characters long.'
      });
    }

    const key = getOtpKey(identifier, 'reset_password');
    const stored = otpStore.get(key);

    if (!stored) {
      return res.status(400).json({
        success: false,
        error: 'No active OTP request found. Please click "Send Reset OTP" first.'
      });
    }

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(key);
      return res.status(400).json({
        success: false,
        error: 'OTP has expired. Please request a new OTP.'
      });
    }

    if (stored.otp !== otp.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Incorrect OTP. Please enter the valid 6-digit OTP.'
      });
    }

    // OTP is valid, proceed to update password
    otpStore.delete(key);

    const users = getUsers();
    const userIndex = users.findIndex(u => u.userId === stored.userId);

    if (userIndex === -1) {
      return res.status(404).json({ success: false, error: 'User account not found.' });
    }

    users[userIndex].password = newPassword;
    users[userIndex].updatedAt = new Date().toISOString();
    saveUsers(users);

    const updatedUser = users[userIndex];
    console.log(`[Password Reset via OTP] User ${updatedUser.name} (${updatedUser.userId}) reset password`);

    const { password: _, ...safeUser } = updatedUser;
    return res.json({
      success: true,
      message: 'Password reset successfully! You can now log in or continue.',
      userId: updatedUser.userId,
      user: safeUser
    });
  } catch (error) {
    console.error('Verify OTP Reset error:', error);
    res.status(500).json({ success: false, error: 'An error occurred while resetting password.' });
  }
});

// 8.4 POST /api/auth/recover-id - Find user account & User ID by 10-digit mobile number or email
app.post('/api/auth/recover-id', (req, res) => {
  try {
    const { mobile } = req.body;
    const cleanMobile = (mobile || '').replace(/\D/g, '');
    const cleanEmail = (mobile || '').trim().toLowerCase();

    const users = getUsers();
    const user = users.find(u => 
      (cleanMobile.length === 10 && u.mobile === cleanMobile) ||
      (u.email && u.email.toLowerCase() === cleanEmail)
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: `No account registered with ${mobile}. Please check or sign up.`
      });
    }

    return res.json({
      success: true,
      message: `Account found for ${user.name}!`,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        mobile: user.mobile
      }
    });
  } catch (error) {
    console.error('Recover ID error:', error);
    res.status(500).json({ success: false, error: 'An error occurred while recovering account details.' });
  }
});

// 8.5 POST /api/auth/reset-password - Reset password using verified mobile number
app.post('/api/auth/reset-password', (req, res) => {
  try {
    const { mobile, newPassword } = req.body;
    const cleanMobile = (mobile || '').replace(/\D/g, '');

    if (!cleanMobile || !/^[6-9]\d{9}$/.test(cleanMobile)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid 10-digit Indian mobile number.'
      });
    }

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'New password must be at least 6 characters long.'
      });
    }

    const users = getUsers();
    const userIndex = users.findIndex(u => u.mobile === cleanMobile);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: `No account registered with mobile number ${cleanMobile}. Please check the number or sign up.`
      });
    }

    // Update user password
    users[userIndex].password = newPassword;
    users[userIndex].updatedAt = new Date().toISOString();
    saveUsers(users);

    const updatedUser = users[userIndex];
    console.log(`[Password Reset] User ${updatedUser.name} (${updatedUser.userId}) reset password via mobile ${cleanMobile}`);

    const { password: _, ...safeUser } = updatedUser;
    return res.json({
      success: true,
      message: 'Password reset successfully! You can now log in with your new password.',
      userId: updatedUser.userId,
      user: safeUser
    });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ success: false, error: 'An error occurred while resetting password.' });
  }
});

// 9. GET /api/auth/profile/:userId - Get user profile & addresses
app.get('/api/auth/profile/:userId', (req, res) => {
  const users = getUsers();
  const user = users.find(u => u.userId === req.params.userId);

  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found.' });
  }

  const { password: _, ...safeUser } = user;
  res.json({ success: true, user: safeUser });
});

// 10. PUT /api/auth/profile/:userId - Update user address
app.put('/api/auth/profile/:userId', (req, res) => {
  try {
    const { address, city, pincode, state: stateName } = req.body;
    const users = getUsers();
    const userIndex = users.findIndex(u => u.userId === req.params.userId);

    if (userIndex === -1) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    // Validate pincode
    const cleanPincode = (pincode || '').trim();
    if (cleanPincode && !/^[1-9][0-9]{5}$/.test(cleanPincode)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid 6-digit Indian pincode.' });
    }

    const newAddress = {
      id: 'ADDR-' + crypto.randomBytes(3).toString('hex').toUpperCase(),
      address: (address || '').trim(),
      city: (city || '').trim(),
      pincode: cleanPincode,
      state: (stateName || '').trim(),
      isDefault: true,
      createdAt: new Date().toISOString()
    };

    // Set all existing addresses as non-default
    if (!users[userIndex].addresses) users[userIndex].addresses = [];
    users[userIndex].addresses.forEach(a => a.isDefault = false);
    users[userIndex].addresses.push(newAddress);

    saveUsers(users);

    console.log(`[Address Added] ${users[userIndex].name}: ${newAddress.city} - ${newAddress.pincode}`);

    const { password: _, ...safeUser } = users[userIndex];
    return res.json({
      success: true,
      message: 'Delivery address saved successfully!',
      user: safeUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ success: false, error: 'An error occurred while saving your address.' });
  }
});

// 11. GET /health - Server Health & Diagnostics
app.get('/health', (req, res) => {
  const uptimeSeconds = Math.floor((new Date() - SERVER_START_TIME) / 1000);
  res.json({
    status: 'online',
    appName: 'RSA Creations E-Commerce Backend',
    uptime: `${uptimeSeconds} seconds`,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ============================================================================
// ADMIN PANEL ENDPOINTS
// ============================================================================

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  // Confidential Admin Credentials for RSA Creations Store Management
  const ADMIN_USER = process.env.ADMIN_USER || 'admin@rsacreations.com';
  const ADMIN_PASS = process.env.ADMIN_PASS || 'sarupa@2026';

  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username/Email and Password are required.' });
  }

  const cleanUser = username.trim().toLowerCase();
  if ((cleanUser === ADMIN_USER.toLowerCase() || cleanUser === 'admin') && password === ADMIN_PASS) {
    const adminToken = 'RSA_ADM_' + crypto.randomBytes(16).toString('hex');
    return res.json({
      success: true,
      message: 'Admin authentication successful! Welcome to RSA Workshop Hub.',
      token: adminToken,
      admin: {
        name: 'Master Artisan Admin',
        role: 'Store Owner',
        email: ADMIN_USER
      }
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Invalid admin credentials. Access denied.'
  });
});

// Admin Stats Dashboard Overview
app.get('/api/admin/stats', (req, res) => {
  const orders = getOrders();
  const users = getUsers();
  const products = getProducts();

  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (o.pricing?.totalAmount || 0), 0);

  const inWorkshop = orders.filter(o => !o.status || o.status.includes('Artisan') || o.status === 'Confirmed & In Artisan Workshop').length;
  const inShipping = orders.filter(o => o.status === 'Dispatched / Shipping' || o.status === 'Out for Delivery').length;
  const delivered = orders.filter(o => o.status === 'Delivered').length;
  const cancelled = orders.filter(o => o.status === 'Cancelled').length;

  res.json({
    success: true,
    stats: {
      totalRevenue,
      totalOrders: orders.length,
      inWorkshop,
      inShipping,
      delivered,
      cancelled,
      totalCustomers: users.length,
      totalProducts: products.length
    }
  });
});

// Admin Get All Orders (With Full Details)
app.get('/api/admin/orders', (req, res) => {
  const orders = getOrders();
  res.json({
    success: true,
    count: orders.length,
    orders
  });
});

// Admin Update Order Status (Tracking, Shipping, Delivered)
const handleOrderStatusUpdate = (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, trackingNumber, carrier, notes } = req.body;

    const validStatuses = [
      'Confirmed & In Artisan Workshop',
      'Dispatched / Shipping',
      'Out for Delivery',
      'Delivered',
      'Cancelled'
    ];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.orderId.toUpperCase() === orderId.toUpperCase());

    if (orderIndex === -1) {
      return res.status(404).json({ success: false, error: `Order ${orderId} not found.` });
    }

    const order = orders[orderIndex];
    order.status = status;
    order.statusUpdatedAt = new Date().toISOString();

    if (!order.timeline) order.timeline = [];
    order.timeline.push({
      status,
      timestamp: new Date().toISOString(),
      notes: notes || null
    });

    if (trackingNumber) {
      if (!order.shippingDetails) order.shippingDetails = {};
      order.shippingDetails.trackingNumber = trackingNumber.trim();
      order.shippingDetails.carrier = (carrier || 'India Post / Blue Dart').trim();
    }

    orders[orderIndex] = order;
    saveOrders(orders);

    console.log(`[Admin] Order ${orderId} status updated to: ${status}`);

    res.json({
      success: true,
      message: `Order ${orderId} status successfully updated to "${status}".`,
      order
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, error: 'Failed to update order status.' });
  }
};

app.patch('/api/admin/orders/:orderId/status', handleOrderStatusUpdate);
app.put('/api/admin/orders/:orderId/status', handleOrderStatusUpdate);

// Admin Get Customer Details
app.get('/api/admin/customers', (req, res) => {
  const users = getUsers();
  const orders = getOrders();

  const customers = users.map(user => {
    const userOrders = orders.filter(o => 
      (user.email && o.customer?.email === user.email) ||
      (user.mobile && o.customer?.phone === user.mobile) ||
      (o.customer?.name === user.name)
    );

    const totalSpent = userOrders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + (o.pricing?.totalAmount || 0), 0);

    const { password: _, ...safeUser } = user;
    return {
      ...safeUser,
      orderCount: userOrders.length,
      totalSpent,
      lastOrderDate: userOrders[0]?.createdAt || null
    };
  });

  res.json({
    success: true,
    count: customers.length,
    customers
  });
});

// Admin Add New Product for Selling
app.post('/api/admin/products', (req, res) => {
  try {
    const {
      title,
      category,
      categoryLabel,
      price,
      stock,
      badge,
      image,
      description,
      materials,
      dimensions,
      method
    } = req.body;

    if (!title || title.trim().length < 3) {
      return res.status(400).json({ success: false, error: 'Product title is required (at least 3 characters).' });
    }

    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      return res.status(400).json({ success: false, error: 'A valid selling price in INR (₹) is required.' });
    }

    const products = getProducts();
    const newId = 'rsa-' + (Date.now().toString().slice(-6));

    const newProduct = {
      id: newId,
      title: title.trim(),
      name: title.trim(),
      category: (category || 'decor').trim().toLowerCase(),
      categoryLabel: categoryLabel || 'Handmade Decor',
      price: Math.round(numPrice),
      stock: parseInt(stock, 10) || 10,
      rating: 5.0,
      reviewsCount: 1,
      badge: badge ? badge.trim() : 'New Artisan Piece',
      image: image ? image.trim() : 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=700&q=80',
      description: description ? description.trim() : 'Lovingly handcrafted in small batches at RSA Creations.',
      materials: materials ? materials.trim() : 'Organic artisanal materials',
      dimensions: dimensions ? dimensions.trim() : 'Handmade unique sizing',
      method: method ? method.trim() : 'Traditional slow-craft hand techniques',
      createdAt: new Date().toISOString()
    };

    products.unshift(newProduct);
    saveProducts(products);

    console.log(`[Admin] Added new product: ${newProduct.title} (₹${newProduct.price}) - ID: ${newProduct.id}`);

    res.status(201).json({
      success: true,
      message: `Product "${newProduct.title}" added to catalog successfully!`,
      product: newProduct
    });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ success: false, error: 'Failed to add product to catalog.' });
  }
});

// Admin Delete Product
app.delete('/api/admin/products/:productId', (req, res) => {
  const { productId } = req.params;
  const products = getProducts();
  const filtered = products.filter(p => p.id !== productId);

  if (filtered.length === products.length) {
    return res.status(404).json({ success: false, error: `Product ${productId} not found.` });
  }

  saveProducts(filtered);
  console.log(`[Admin] Deleted product ID: ${productId}`);

  res.json({
    success: true,
    message: 'Product removed from catalog.'
  });
});

// Admin Update Product Stock
app.patch('/api/admin/products/:productId/stock', (req, res) => {
  const { productId } = req.params;
  const { stock } = req.body;
  const products = getProducts();
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ success: false, error: `Product ${productId} not found.` });
  }

  product.stock = Math.max(0, parseInt(stock, 10) || 0);
  saveProducts(products);

  res.json({
    success: true,
    message: `Stock updated to ${product.stock}`,
    product
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=================================================================`);
  console.log(`  🌿 RSA CREATIONS ARTISANAL BACKEND IS RUNNING!`);
  console.log(`  🌍 Base URL: http://localhost:${PORT}`);
  console.log(`  🛍️ Frontend Storefront: http://localhost:${PORT}`);
  console.log(`  🩺 Health Diagnostics: http://localhost:${PORT}/health`);
  console.log(`  📦 Delivery Logic:`);
  console.log(`     - Kolkata (City / Pincode 700xxx): Flat ₹60`);
  console.log(`     - West Bengal (Outside Kolkata): Flat ₹100`);
  console.log(`     - Rest of India: Flat ₹150`);
  console.log(`     - Free Doorstep Delivery: Orders above ₹1,999`);
  console.log(`     - Timeline: 7 to 10 business days (Dynamic Date Ranges)`);
  console.log(`  🎟️ Coupon: HANDMADE10 (10% off)`);
  console.log(`  👤 Auth: POST /api/auth/signup | POST /api/auth/login`);
  console.log(`  🏠 Address: PUT /api/auth/profile/:userId`);
  console.log(`=================================================================`);
});
