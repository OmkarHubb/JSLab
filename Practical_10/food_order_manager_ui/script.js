const initialOrders = [
  { id: 1001, customer: 'Aarav Sharma', item: 'Margherita Pizza', quantity: 2, amount: 600, status: 'Preparing' },
  { id: 1002, customer: 'Priya Patil', item: 'Veg Burger', quantity: 1, amount: 180, status: 'Ready' },
  { id: 1003, customer: 'Rohan Mehta', item: 'Paneer Biryani', quantity: 2, amount: 500, status: 'Delivered' },
  { id: 1004, customer: 'Sneha Joshi', item: 'White Sauce Pasta', quantity: 1, amount: 250, status: 'Pending' },
  { id: 1005, customer: 'Aditya Kulkarni', item: 'Masala Dosa', quantity: 2, amount: 240, status: 'Delivered' },
  { id: 1006, customer: 'Hussain', item: 'Pasta', quantity: 2, amount: 400, status: 'Preparing' },
  { id: 1007, customer: 'Tyson', item: 'Donut', quantity: 1, amount: 100, status: 'Pending' }
];

let orders = initialOrders.map(order => ({ ...order }));
let nextId = 1008;

const orderForm = document.getElementById('orderForm');
const ordersBody = document.getElementById('ordersBody');
const searchInput = document.getElementById('searchOrders');
const statusFilter = document.getElementById('statusFilter');

const errorTargets = {
  customerName: document.getElementById('customerError'),
  foodItem: document.getElementById('foodError'),
  quantity: document.getElementById('quantityError'),
  amount: document.getElementById('amountError')
};

const formFields = {
  customerName: document.getElementById('customerName'),
  foodItem: document.getElementById('foodItem'),
  quantity: document.getElementById('quantity'),
  amount: document.getElementById('amount')
};

function money(value) {
  return '₹' + Number(value).toLocaleString('en-IN');
}

function statusClass(status) {
  return 'status-' + status.toLowerCase();
}

function updateStats() {
  document.getElementById('totalOrders').textContent = orders.length;
  document.getElementById('activeOrders').textContent =
    orders.filter(order => ['Preparing', 'Ready'].includes(order.status)).length;
  document.getElementById('totalSales').textContent =
    money(orders.reduce((sum, order) => sum + Number(order.amount), 0));
}

function renderOrders() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filter = statusFilter.value;

  const visibleOrders = orders.filter(order => {
    const matchesSearch = [order.id, order.customer, order.item, order.status]
      .some(value => String(value).toLowerCase().includes(searchTerm));
    return matchesSearch && (filter === 'All' || order.status === filter);
  });

  ordersBody.replaceChildren();
  document.getElementById('emptyState').hidden = visibleOrders.length !== 0;

  visibleOrders.forEach(order => {
    const row = document.createElement('tr');

    const values = [
      ['id', String(order.id)],
      ['customer', order.customer],
      ['item', order.item],
      ['quantity', String(order.quantity)],
      ['amount', money(order.amount)]
    ];

    values.forEach(([key, value]) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      cell.dataset.label = key;
      row.appendChild(cell);
    });

    const statusCell = document.createElement('td');
    const select = document.createElement('select');
    select.className = `status-select ${statusClass(order.status)}`;
    select.setAttribute('aria-label', `Change status for order ${order.id}`);
    ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'].forEach(status => {
      const option = document.createElement('option');
      option.value = status;
      option.textContent = status;
      option.selected = order.status === status;
      select.appendChild(option);
    });
    select.addEventListener('change', () => {
      order.status = select.value;
      updateStats();
      renderOrders();
    });
    statusCell.appendChild(select);
    row.appendChild(statusCell);

    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-order';
    deleteButton.type = 'button';
    deleteButton.textContent = '×';
    deleteButton.title = `Delete order ${order.id}`;
    deleteButton.setAttribute('aria-label', `Delete order ${order.id}`);
    deleteButton.addEventListener('click', () => {
      orders = orders.filter(item => item.id !== order.id);
      updateStats();
      renderOrders();
    });
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);
    ordersBody.appendChild(row);
  });

  document.getElementById('showingCount').textContent =
    `Showing ${visibleOrders.length} of ${orders.length} orders`;
}

function setError(key, message) {
  errorTargets[key].textContent = message;
  formFields[key].setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validateOrder() {
  let valid = true;
  Object.keys(formFields).forEach(key => setError(key, ''));

  if (formFields.customerName.value.trim().length < 2) {
    setError('customerName', 'Enter a customer name.');
    valid = false;
  }
  if (formFields.foodItem.value.trim().length < 2) {
    setError('foodItem', 'Enter a food item.');
    valid = false;
  }
  const quantity = Number(formFields.quantity.value);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    setError('quantity', 'Quantity must be between 1 and 99.');
    valid = false;
  }
  const amount = Number(formFields.amount.value);
  if (!Number.isFinite(amount) || amount <= 0) {
    setError('amount', 'Enter an amount greater than ₹0.');
    valid = false;
  }
  return valid;
}

orderForm.addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('formMessage').textContent = '';
  if (!validateOrder()) {
    const firstInvalid = orderForm.querySelector('[aria-invalid="true"]');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  orders.unshift({
    id: nextId++,
    customer: formFields.customerName.value.trim(),
    item: formFields.foodItem.value.trim(),
    quantity: Number(formFields.quantity.value),
    amount: Number(formFields.amount.value),
    status: document.getElementById('status').value
  });

  updateStats();
  renderOrders();
  orderForm.reset();
  document.getElementById('quantity').value = '1';
  document.getElementById('formMessage').textContent = '✓ Order placed successfully!';
});

Object.entries(formFields).forEach(([key, field]) => {
  field.addEventListener('input', () => {
    if (errorTargets[key].textContent) setError(key, '');
  });
});

searchInput.addEventListener('input', renderOrders);
statusFilter.addEventListener('change', renderOrders);

document.getElementById('resetDemo').addEventListener('click', () => {
  orders = initialOrders.map(order => ({ ...order }));
  nextId = 1008;
  searchInput.value = '';
  statusFilter.value = 'All';
  document.getElementById('formMessage').textContent = '';
  updateStats();
  renderOrders();
});

const now = new Date();
document.getElementById('todayDate').textContent = now.toLocaleDateString('en-IN', {
  day: '2-digit', month: 'short', year: 'numeric'
}).toUpperCase();

updateStats();
renderOrders();
