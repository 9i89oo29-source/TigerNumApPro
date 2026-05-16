// ===== الإعدادات =====
const API_BASE = window.location.origin + '/api/admin';  // افتراضي نفس الخادم
let token = localStorage.getItem('adminToken');

// ===== دوال المصادقة =====
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success' && data.data.token) {
            token = data.data.token;
            localStorage.setItem('adminToken', token);
            showDashboard();
        } else {
            document.getElementById('login-error').classList.remove('d-none');
            document.getElementById('login-error').textContent = data.message || 'فشل الدخول';
        }
    })
    .catch(() => {
        document.getElementById('login-error').classList.remove('d-none');
        document.getElementById('login-error').textContent = 'خطأ في الاتصال';
    });
}

function logout() {
    localStorage.removeItem('adminToken');
    location.reload();
}

function apiFetch(url, method = 'GET', body = null) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);
    return fetch(`${API_BASE}${url}`, options).then(res => {
        if (res.status === 401) { logout(); throw new Error('Unauthorized'); }
        return res.json();
    });
}

// ===== إظهار لوحة التحكم =====
function showDashboard() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'block';
    loadDashboardStats();
    loadUsers();
    loadPricing();
}

// ===== تحميل إحصائيات الرئيسية =====
function loadDashboardStats() {
    // هذه بيانات وهمية كمثال، يمكن ربطها بـ API حقيقي لاحقاً
    document.getElementById('total-users').textContent = '...';
    document.getElementById('active-orders').textContent = '...';
    document.getElementById('total-revenue').textContent = '...';

    apiFetch('/users')
        .then(data => {
            if (data.status === 'success') {
                document.getElementById('total-users').textContent = data.data.length;
            }
        }).catch(err => console.error(err));

    // رسم بياني وهمي
    renderCharts();
}

function renderCharts() {
    const ordersCtx = document.getElementById('ordersChart').getContext('2d');
    new Chart(ordersCtx, {
        type: 'line',
        data: {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
            datasets: [{
                label: 'عدد الطلبات',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: '#8A1538',
                tension: 0.1
            }]
        }
    });

    const revCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revCtx, {
        type: 'bar',
        data: {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
            datasets: [{
                label: 'الإيرادات ($)',
                data: [120, 190, 30, 50, 20, 30],
                backgroundColor: '#007A33'
            }]
        }
    });
}

// ===== إدارة المستخدمين =====
function loadUsers() {
    apiFetch('/users')
        .then(data => {
            if (data.status === 'success') {
                const tbody = document.getElementById('users-table-body');
                tbody.innerHTML = '';
                data.data.forEach(user => {
                    tbody.innerHTML += `
                        <tr>
                            <td>${user.uuid}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>
                            <td>${user.balance}</td>
                            <td>${user.localCurrency}</td>
                            <td><span class="badge bg-${user.accountStatus === 'active' ? 'success' : 'danger'}">${user.accountStatus === 'active' ? 'نشط' : 'موقوف'}</span></td>
                            <td>
                                <input type="number" id="amount-${user.uuid}" value="10" class="form-control form-control-sm d-inline w-50">
                                <button class="btn btn-sm btn-primary" onclick="topUp('${user.uuid}')">شحن</button>
                            </td>
                        </tr>`;
                });
            }
        }).catch(err => console.error(err));
}

function topUp(uuid) {
    const amount = parseFloat(document.getElementById(`amount-${uuid}`).value);
    if (!amount || amount <= 0) return alert('أدخل مبلغ صحيح');
    apiFetch('/topup', 'POST', { uuid, amount })
        .then(data => {
            if (data.status === 'success') {
                loadUsers();
            } else {
                alert(data.message);
            }
        }).catch(err => alert('خطأ في الشحن'));
}

// ===== إدارة التسعير =====
function loadPricing() {
    apiFetch('/pricing')
        .then(data => {
            if (data.status === 'success') {
                const tbody = document.getElementById('pricing-table-body');
                tbody.innerHTML = '';
                data.data.forEach(rule => {
                    tbody.innerHTML += `
                        <tr>
                            <td>${rule.factory === 'main' ? 'الرئيسي' : 'الاحتياطي'}</td>
                            <td>${rule.country}</td>
                            <td>${rule.service}</td>
                            <td>${rule.retailPrice}</td>
                            <td>${rule.baseCost}</td>
                            <td>${rule.currency}</td>
                            <td>
                                <button class="btn btn-sm btn-warning" onclick="editPricing('${rule._id}')"><i class="fas fa-edit"></i></button>
                            </td>
                            <td>
                                <button class="btn btn-sm btn-danger" onclick="deletePricing('${rule._id}')"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>`;
                });
            }
        }).catch(err => console.error(err));
}

function showAddPricingModal() {
    document.getElementById('pricing-id').value = '';
    document.getElementById('factory').value = 'main';
    document.getElementById('country').value = '';
    document.getElementById('service').value = '';
    document.getElementById('retailPrice').value = '';
    document.getElementById('baseCost').value = '';
    document.getElementById('currency').value = 'USD';
    document.getElementById('pricingModalLabel').textContent = 'إضافة قاعدة تسعير';
    new bootstrap.Modal(document.getElementById('pricingModal')).show();
}

function editPricing(id) {
    apiFetch('/pricing')
        .then(data => {
            const rule = data.data.find(r => r._id === id);
            if (rule) {
                document.getElementById('pricing-id').value = rule._id;
                document.getElementById('factory').value = rule.factory;
                document.getElementById('country').value = rule.country;
                document.getElementById('service').value = rule.service;
                document.getElementById('retailPrice').value = rule.retailPrice;
                document.getElementById('baseCost').value = rule.baseCost;
                document.getElementById('currency').value = rule.currency;
                document.getElementById('pricingModalLabel').textContent = 'تعديل قاعدة تسعير';
                new bootstrap.Modal(document.getElementById('pricingModal')).show();
            }
        });
}

function savePricing() {
    const id = document.getElementById('pricing-id').value;
    const factory = document.getElementById('factory').value;
    const country = document.getElementById('country').value;
    const service = document.getElementById('service').value;
    const retailPrice = parseFloat(document.getElementById('retailPrice').value);
    const baseCost = parseFloat(document.getElementById('baseCost').value);
    const currency = document.getElementById('currency').value || 'USD';

    if (!factory || !country || !service || isNaN(retailPrice) || isNaN(baseCost)) {
        return alert('املأ جميع الحقول');
    }

    const body = { factory, country, service, retailPrice, baseCost, currency };
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/pricing/${id}` : '/pricing';

    apiFetch(url, method, body)
        .then(data => {
            if (data.status === 'success') {
                bootstrap.Modal.getInstance(document.getElementById('pricingModal')).hide();
                loadPricing();
            } else {
                alert(data.message || 'فشل الحفظ');
            }
        }).catch(err => alert('خطأ'));
}

function deletePricing(id) {
    if (confirm('هل أنت متأكد من حذف هذه القاعدة؟')) {
        apiFetch(`/pricing/${id}`, 'DELETE')
            .then(data => {
                if (data.status === 'success') {
                    loadPricing();
                } else {
                    alert(data.message);
                }
            }).catch(err => alert('خطأ'));
    }
}

// ===== التهيئة الأولية =====
if (token) {
    showDashboard();
              }
