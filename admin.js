/**
 * RSA Creations - Admin Operations & Dashboard Logic
 * Connects directly to unified backend APIs
 */

// Backend Base URL (Auto-detects localhost or Render Cloud Service)
const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:')
  ? 'http://localhost:5000'
  : 'https://rsa-backend-74v7.onrender.com';
let currentTab = 'overview';
let allOrders = [];
let allCustomers = [];
let allProducts = [];

// DOM Selectors
const adminAuthDialog = document.getElementById('adminAuthDialog');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminUsername = document.getElementById('adminUsername');
const adminPassword = document.getElementById('adminPassword');
const adminLoginError = document.getElementById('adminLoginError');
const adminSubmitBtn = document.getElementById('adminSubmitBtn');
const adminLogoutBtn = document.getElementById('adminLogoutBtn');

// Tabs & Navigation
const navBtns = document.querySelectorAll('.nav-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

// Add Product Modal
const addProductModal = document.getElementById('addProductModal');
const openAddProductBtn = document.getElementById('openAddProductBtn');
const closeAddProductBtn = document.getElementById('closeAddProductBtn');
const addProductForm = document.getElementById('addProductForm');

// Preset Images for Fast Product Creation
const PRESET_IMAGES = {
  pottery: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80',
  terracotta: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80',
  tapestry: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80',
  woodwork: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=700&q=80',
  candle: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80',
  jewelry: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80',
  macrame: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80'
};

// ==========================================================================
// Toast Notification
// ==========================================================================
function showAdminToast(msg, type = 'success') {
  const container = document.getElementById('adminToastContainer');
  const toast = document.createElement('div');
  toast.className = `admin-toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : '⚠'}</span> <span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3500);
}

// ==========================================================================
// Authentication & Session
// ==========================================================================
function checkAdminAuth() {
  const token = localStorage.getItem('rsa_admin_token');
  const layout = document.querySelector('.admin-layout');
  const header = document.querySelector('.admin-header');

  if (!token) {
    if (layout) layout.style.display = 'none';
    if (header) header.style.display = 'none';
    if (adminAuthDialog) {
      if (typeof adminAuthDialog.showModal === 'function') {
        if (!adminAuthDialog.open) adminAuthDialog.showModal();
      } else {
        adminAuthDialog.setAttribute('open', '');
        adminAuthDialog.style.display = 'block';
      }
    }
    return false;
  }

  if (layout) layout.style.display = 'grid';
  if (header) header.style.display = 'flex';
  return true;
}

if (adminAuthDialog) {
  // Prevent closing without authentication
  adminAuthDialog.addEventListener('cancel', (e) => {
    if (!localStorage.getItem('rsa_admin_token')) {
      e.preventDefault();
    }
  });
}

if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (adminLoginError) adminLoginError.style.display = 'none';
    const submitBtn = document.getElementById('adminSubmitBtn');
    if (submitBtn) {
      submitBtn.textContent = 'Verifying Confidential Access...';
      submitBtn.disabled = true;
    }

    const username = (adminUsername?.value || '').trim();
    const password = (adminPassword?.value || '');

    if (!username || !password) {
      if (adminLoginError) {
        adminLoginError.textContent = 'Both Admin Username and Password are required.';
        adminLoginError.style.display = 'block';
      }
      if (submitBtn) {
        submitBtn.textContent = 'Sign In to Admin Hub';
        submitBtn.disabled = false;
      }
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem('rsa_admin_token', data.token);
        localStorage.setItem('rsa_admin_info', JSON.stringify(data.admin));

        const layout = document.querySelector('.admin-layout');
        const header = document.querySelector('.admin-header');
        if (layout) layout.style.display = 'grid';
        if (header) header.style.display = 'flex';

        if (adminAuthDialog) adminAuthDialog.close();
        if (adminLoginForm) adminLoginForm.reset();

        showAdminToast('Welcome, Master Artisan Admin!');
        loadAllAdminData();
      } else {
        const errorMsg = data.error || 'Authentication failed. Incorrect admin credentials.';
        if (adminLoginError) {
          adminLoginError.textContent = errorMsg;
          adminLoginError.style.display = 'block';
        }
        showAdminToast(errorMsg, 'error');
      }
    } catch (err) {
      if (adminLoginError) {
        adminLoginError.textContent = 'Server connection error. Please try again.';
        adminLoginError.style.display = 'block';
      }
      showAdminToast('Could not connect to authentication server.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.textContent = 'Sign In to Admin Hub';
        submitBtn.disabled = false;
      }
    }
  });
}

if (adminLogoutBtn) {
  adminLogoutBtn.addEventListener('click', () => {
    localStorage.removeItem('rsa_admin_token');
    localStorage.removeItem('rsa_admin_info');

    const layout = document.querySelector('.admin-layout');
    const header = document.querySelector('.admin-header');
    if (layout) layout.style.display = 'none';
    if (header) header.style.display = 'none';

    showAdminToast('Logged out of Admin Hub.', 'info');
    setTimeout(() => {
      if (adminAuthDialog) {
        if (typeof adminAuthDialog.showModal === 'function') {
          adminAuthDialog.showModal();
        } else {
          adminAuthDialog.setAttribute('open', '');
          adminAuthDialog.style.display = 'block';
        }
      }
    }, 200);
  });
}

// ==========================================================================
// Tab Switching
// ==========================================================================
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.dataset.tab;
    navBtns.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
    currentTab = tabName;

    if (tabName === 'orders') renderOrders();
    if (tabName === 'customers') renderCustomers();
    if (tabName === 'products') renderProducts();
  });
});

// ==========================================================================
// Data Fetching & Dashboard Metrics
// ==========================================================================
async function loadAllAdminData() {
  await Promise.all([
    fetchStats(),
    fetchOrders(),
    fetchCustomers(),
    fetchProducts()
  ]);
}

async function fetchStats() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/stats`);
    if (res.ok) {
      const data = await res.json();
      const s = data.stats;
      document.getElementById('metricRevenue').textContent = `₹${s.totalRevenue.toLocaleString('en-IN')}`;
      document.getElementById('metricOrders').textContent = s.totalOrders;
      document.getElementById('metricWorkshop').textContent = s.inWorkshop;
      document.getElementById('metricShipping').textContent = s.inShipping;
      document.getElementById('metricDelivered').textContent = s.delivered;
      document.getElementById('metricCustomers').textContent = s.totalCustomers;
      document.getElementById('metricProducts').textContent = s.totalProducts;
    }
  } catch (err) {
    console.error('Error fetching stats:', err);
  }
}

async function fetchOrders() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/orders`);
    if (res.ok) {
      const data = await res.json();
      allOrders = data.orders || [];
      renderOrders();
      renderRecentOrders();
    }
  } catch (err) {
    console.error('Error fetching orders:', err);
  }
}

async function fetchCustomers() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/customers`);
    if (res.ok) {
      const data = await res.json();
      allCustomers = data.customers || [];
      renderCustomers();
    }
  } catch (err) {
    console.error('Error fetching customers:', err);
  }
}

async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE}/api/products`);
    if (res.ok) {
      const data = await res.json();
      allProducts = data.products || [];
      renderProducts();
    }
  } catch (err) {
    console.error('Error fetching products:', err);
  }
}

// ==========================================================================
// Orders Rendering & Status Management
// ==========================================================================
function getStatusBadgeClass(status) {
  if (status === 'Dispatched / Shipping' || status === 'Out for Delivery') return 'status-shipping';
  if (status === 'Delivered') return 'status-delivered';
  if (status === 'Cancelled') return 'status-cancelled';
  return 'status-workshop';
}

function renderOrders(filterStatus = 'all', searchQuery = '') {
  const container = document.getElementById('ordersListContainer');
  if (!container) return;

  let filtered = [...allOrders];

  if (filterStatus !== 'all') {
    filtered = filtered.filter(o => {
      if (filterStatus === 'workshop') return o.status.includes('Workshop') || o.status.includes('Artisan');
      if (filterStatus === 'shipping') return o.status === 'Dispatched / Shipping' || o.status === 'Out for Delivery';
      if (filterStatus === 'delivered') return o.status === 'Delivered';
      if (filterStatus === 'cancelled') return o.status === 'Cancelled';
      return true;
    });
  }

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(o => 
      o.orderId.toLowerCase().includes(q) ||
      (o.customer?.name || '').toLowerCase().includes(q) ||
      (o.customer?.phone || '').includes(q) ||
      (o.customer?.city || '').toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 48px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-admin);">
        <p style="color: var(--text-muted); font-size: 1rem;">No customer orders found matching this filter.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(order => {
    const dateFormatted = new Date(order.createdAt).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const itemsSummary = (order.items || []).map(item => `
      <div class="order-item-line">
        <span>• ${item.title || item.name} (x${item.quantity})</span>
        <span>₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
      </div>
    `).join('');

    const phoneClean = (order.customer?.phone || '').replace(/\D/g, '');
    const waUrl = `https://wa.me/91${phoneClean}?text=${encodeURIComponent('Hello ' + (order.customer?.name || 'Customer') + '! Update on your RSA Creations Order #' + order.orderId + ': Your handcrafted package status is: ' + order.status)}`;

    return `
      <div class="order-card" data-order-id="${order.orderId}">
        <div class="order-top">
          <div class="order-id-group">
            <span class="order-id">${order.orderId}</span>
            <span class="status-badge ${getStatusBadgeClass(order.status)}">${order.status}</span>
            ${order.shippingDetails?.trackingNumber ? `<span style="font-size: 0.75rem; color: var(--color-blue); background: var(--color-blue-light); padding: 2px 8px; border-radius: var(--radius-full);">Tracking: ${order.shippingDetails.trackingNumber}</span>` : ''}
          </div>
          <span class="order-date">📅 Placed: ${dateFormatted}</span>
        </div>

        <div class="order-body">
          <div class="order-col">
            <h4>👤 Customer Details</h4>
            <p><strong>${order.customer?.name || 'Guest'}</strong></p>
            <p>📞 Phone: <a href="tel:${order.customer?.phone}" style="color: var(--color-amber);">${order.customer?.phone || 'N/A'}</a></p>
            <p>✉️ Email: ${order.customer?.email || 'N/A'}</p>
          </div>

          <div class="order-col">
            <h4>📍 Shipping Address (${order.pricing?.deliveryRegion || 'India'})</h4>
            <p>${order.customer?.address || ''}</p>
            <p><strong>${order.customer?.city || ''} - ${order.customer?.pincode || ''}</strong></p>
            <p style="color: var(--color-sage); font-size: 0.75rem; margin-top: 4px;">
              🚚 Delivery Fee: ₹${order.pricing?.deliveryCharge} • Timeline: ${order.delivery?.timeline || '7-10 business days'}
            </p>
          </div>

          <div class="order-col">
            <h4>📦 Financial Breakdown</h4>
            <div class="order-pricing-box">
              <div class="pricing-row"><span>Subtotal:</span><span>₹${order.pricing?.subtotal || 0}</span></div>
              <div class="pricing-row"><span>Discount:</span><span>-₹${order.pricing?.discount || 0}</span></div>
              <div class="pricing-row"><span>Delivery:</span><span>₹${order.pricing?.deliveryCharge || 0}</span></div>
              <div class="pricing-row total"><span>Total Payable:</span><span>₹${order.pricing?.totalAmount || 0}</span></div>
            </div>
          </div>
        </div>

        <div class="order-items-summary" style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-md);">
          <strong style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Handcrafted Items:</strong>
          ${itemsSummary}
        </div>

        <div class="order-actions">
          <div class="status-change-group">
            <label for="status-${order.orderId}" style="font-size: 0.8125rem;">Update Status:</label>
            <select class="status-select" id="status-${order.orderId}">
              <option value="Confirmed & In Artisan Workshop" ${order.status === 'Confirmed & In Artisan Workshop' ? 'selected' : ''}>🛠️ In Artisan Workshop</option>
              <option value="Dispatched / Shipping" ${order.status === 'Dispatched / Shipping' ? 'selected' : ''}>🚚 Dispatched / Shipping</option>
              <option value="Out for Delivery" ${order.status === 'Out for Delivery' ? 'selected' : ''}>🛵 Out for Delivery</option>
              <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>📦 Delivered</option>
              <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>❌ Cancelled</option>
            </select>
            <input type="text" class="search-input" id="tracking-${order.orderId}" placeholder="Tracking No. (optional)" value="${order.shippingDetails?.trackingNumber || ''}" style="min-width: 150px; padding: 6px 10px; font-size: 0.75rem;">
            <button class="btn btn-primary btn-sm update-status-btn" data-order-id="${order.orderId}">Save</button>
          </div>

          <div>
            <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" style="color: #25D366; border-color: rgba(37, 211, 102, 0.4);">
              💬 WhatsApp Customer
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderRecentOrders() {
  const container = document.getElementById('recentOrdersTableBody');
  if (!container) return;

  const recents = allOrders.slice(0, 5);
  if (recents.length === 0) {
    container.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No orders yet.</td></tr>`;
    return;
  }

  container.innerHTML = recents.map(order => `
    <tr>
      <td><strong style="color: var(--color-amber);">${order.orderId}</strong></td>
      <td>${order.customer?.name || 'Customer'}</td>
      <td>${order.customer?.city || ''} (${order.pricing?.deliveryRegion || 'India'})</td>
      <td><strong>₹${order.pricing?.totalAmount || 0}</strong></td>
      <td><span class="status-badge ${getStatusBadgeClass(order.status)}">${order.status}</span></td>
      <td>${new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</td>
    </tr>
  `).join('');
}

// Order Status Update Click Delegate
document.getElementById('ordersListContainer')?.addEventListener('click', async (e) => {
  const btn = e.target.closest('.update-status-btn');
  if (!btn) return;

  const orderId = btn.dataset.orderId;
  const select = document.getElementById(`status-${orderId}`);
  const trackingInput = document.getElementById(`tracking-${orderId}`);

  const status = select.value;
  const trackingNumber = trackingInput ? trackingInput.value.trim() : null;

  btn.disabled = true;
  btn.textContent = 'Saving...';

  try {
    const res = await fetch(`${API_BASE}/api/admin/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, trackingNumber })
    });
    const data = await res.json();

    if (data.success) {
      showAdminToast(`Order ${orderId} updated to "${status}"!`);
      await fetchOrders();
      await fetchStats();
    } else {
      showAdminToast(data.error || 'Failed to update order.', 'error');
    }
  } catch (err) {
    showAdminToast('Network error updating status.', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Save';
  }
});

// Orders Filters & Search
document.querySelectorAll('.filter-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const filter = pill.dataset.filter;
    const searchVal = document.getElementById('orderSearchInput')?.value || '';
    renderOrders(filter, searchVal);
  });
});

document.getElementById('orderSearchInput')?.addEventListener('input', (e) => {
  const activePill = document.querySelector('.filter-pill.active');
  const filter = activePill ? activePill.dataset.filter : 'all';
  renderOrders(filter, e.target.value);
});

// ==========================================================================
// Customer Directory Rendering
// ==========================================================================
function renderCustomers(search = '') {
  const tbody = document.getElementById('customersTableBody');
  if (!tbody) return;

  let filtered = [...allCustomers];
  if (search.trim() !== '') {
    const q = search.toLowerCase();
    filtered = filtered.filter(c => 
      c.name.toLowerCase().includes(q) ||
      (c.email || '').toLowerCase().includes(q) ||
      (c.mobile || '').includes(q)
    );
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 32px;">No customers found.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(c => {
    const defaultAddr = (c.addresses && c.addresses.find(a => a.isDefault)) || (c.addresses && c.addresses[0]);
    const addressStr = defaultAddr 
      ? `${defaultAddr.address}, ${defaultAddr.city} (${defaultAddr.pincode})` 
      : '<span style="color: var(--text-muted);">No address saved</span>';

    return `
      <tr>
        <td><strong>${c.name}</strong><br><small style="color: var(--text-muted);">${c.userId}</small></td>
        <td>📞 ${c.mobile || '—'}</td>
        <td>✉️ ${c.email || '—'}</td>
        <td>${addressStr}</td>
        <td><strong style="color: var(--color-amber);">${c.orderCount || 0} order(s)</strong></td>
        <td><strong style="color: var(--color-sage);">₹${(c.totalSpent || 0).toLocaleString('en-IN')}</strong></td>
      </tr>
    `;
  }).join('');
}

document.getElementById('customerSearchInput')?.addEventListener('input', (e) => {
  renderCustomers(e.target.value);
});

// ==========================================================================
// Products Catalog & Add Product Modal
// ==========================================================================
function renderProducts() {
  const container = document.getElementById('adminProductsGrid');
  if (!container) return;

  container.innerHTML = allProducts.map(p => `
    <div class="admin-product-card" data-product-id="${p.id}">
      <img src="${p.image}" alt="${p.title || p.name}" class="admin-product-img">
      <div class="admin-product-body">
        <span class="admin-product-badge">${p.badge || 'Artisanal'}</span>
        <h4 class="admin-product-title">${p.title || p.name}</h4>
        <p style="font-size: 0.75rem; color: var(--text-muted);">${p.categoryLabel || p.category}</p>
        <p style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.4;">${(p.description || '').slice(0, 75)}...</p>
        
        <div class="admin-product-footer">
          <span class="admin-product-price">₹${p.price.toLocaleString('en-IN')}</span>
          <span style="font-size: 0.75rem; color: ${p.stock > 0 ? 'var(--color-sage)' : 'var(--color-danger)'}; font-weight: 600;">
            Stock: ${p.stock} units
          </span>
          <button class="btn btn-danger btn-sm delete-product-btn" data-id="${p.id}" title="Remove from catalog">🗑️</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Delete Product
document.getElementById('adminProductsGrid')?.addEventListener('click', async (e) => {
  const delBtn = e.target.closest('.delete-product-btn');
  if (!delBtn) return;

  const id = delBtn.dataset.id;
  if (!confirm('Are you sure you want to remove this handcrafted piece from the store catalog?')) return;

  try {
    const res = await fetch(`${API_BASE}/api/admin/products/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      showAdminToast('Product removed from catalog.');
      await fetchProducts();
      await fetchStats();
    } else {
      showAdminToast(data.error || 'Failed to delete product', 'error');
    }
  } catch (err) {
    showAdminToast('Network error deleting product', 'error');
  }
});

// Add Product Modal Opens/Closes
if (openAddProductBtn) {
  openAddProductBtn.addEventListener('click', () => {
    addProductForm.reset();
    addProductModal.showModal();
  });
}

if (closeAddProductBtn) {
  closeAddProductBtn.addEventListener('click', () => addProductModal.close());
}

// Preset Image Click Helper
document.querySelectorAll('.preset-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    const type = pill.dataset.preset;
    if (PRESET_IMAGES[type]) {
      document.getElementById('newProdImage').value = PRESET_IMAGES[type];
      showAdminToast(`Selected preset image for ${type}!`);
    }
  });
});

// Add Product Form Submission
if (addProductForm) {
  addProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('newProdTitle').value.trim();
    const category = document.getElementById('newProdCategory').value;
    const categoryLabel = document.getElementById('newProdCategory').options[document.getElementById('newProdCategory').selectedIndex].text;
    const price = document.getElementById('newProdPrice').value;
    const stock = document.getElementById('newProdStock').value;
    const badge = document.getElementById('newProdBadge').value.trim();
    const image = document.getElementById('newProdImage').value.trim();
    const materials = document.getElementById('newProdMaterials').value.trim();
    const dimensions = document.getElementById('newProdDimensions').value.trim();
    const method = document.getElementById('newProdMethod').value.trim();
    const description = document.getElementById('newProdDescription').value.trim();

    try {
      const res = await fetch(`${API_BASE}/api/admin/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          categoryLabel,
          price,
          stock,
          badge,
          image,
          materials,
          dimensions,
          method,
          description
        })
      });

      const data = await res.json();
      if (data.success && data.product) {
        showAdminToast(`"${data.product.title}" added to selling catalog!`);
        addProductModal.close();
        addProductForm.reset();
        await fetchProducts();
        await fetchStats();
      } else {
        showAdminToast(data.error || 'Failed to add product.', 'error');
      }
    } catch (err) {
      showAdminToast('Network error while saving product.', 'error');
    }
  });
}

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  if (checkAdminAuth()) {
    loadAllAdminData();
  }
});
