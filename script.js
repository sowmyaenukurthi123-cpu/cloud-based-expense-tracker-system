// ============================================
// SUPABASE CONFIGURATION
// Replace these two values with your own project's
// URL and anon public key (see README.md for steps)
// ============================================
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const { createClient } = supabase;
const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// DOM ELEMENTS
// ============================================
const navLinks = document.querySelectorAll(".nav-link");
const tabSections = document.querySelectorAll(".tab-section");

const expenseForm = document.getElementById("expenseForm");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const dateInput = document.getElementById("date");
const formMessage = document.getElementById("formMessage");

const expenseTableBody = document.getElementById("expenseTableBody");
const totalAmountEl = document.getElementById("totalAmount");
const emptyMessage = document.getElementById("emptyMessage");

// ============================================
// TAB NAVIGATION
// ============================================
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const tab = link.dataset.tab;

    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    tabSections.forEach(section => {
      section.classList.toggle("hidden", section.id !== tab);
    });
  });
});

// ============================================
// FETCH & DISPLAY EXPENSES
// ============================================
async function loadExpenses() {
  const { data, error } = await client
    .from("expenses")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching expenses:", error);
    return;
  }

  renderExpenses(data);
}

function renderExpenses(expenses) {
  expenseTableBody.innerHTML = "";

  if (!expenses || expenses.length === 0) {
    emptyMessage.style.display = "block";
    totalAmountEl.textContent = "₹0.00";
    return;
  }

  emptyMessage.style.display = "none";

  let total = 0;

  expenses.forEach(exp => {
    total += Number(exp.amount);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${exp.date}</td>
      <td>${escapeHtml(exp.category)}</td>
      <td>${escapeHtml(exp.description)}</td>
      <td>₹${Number(exp.amount).toFixed(2)}</td>
      <td><button class="delete-btn" data-id="${exp.id}">Delete</button></td>
    `;
    expenseTableBody.appendChild(row);
  });

  totalAmountEl.textContent = `₹${total.toFixed(2)}`;

  // Attach delete listeners
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => deleteExpense(btn.dataset.id));
  });
}

// Basic protection against HTML injection when rendering text
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ============================================
// ADD EXPENSE
// ============================================
expenseForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newExpense = {
    amount: parseFloat(amountInput.value),
    category: categoryInput.value,
    description: descriptionInput.value.trim(),
    date: dateInput.value
  };

  const { error } = await client.from("expenses").insert([newExpense]);

  if (error) {
    formMessage.style.color = "red";
    formMessage.textContent = "Error adding expense. Please try again.";
    console.error(error);
    return;
  }

  formMessage.style.color = "green";
  formMessage.textContent = "Expense added successfully!";
  expenseForm.reset();

  loadExpenses();

  setTimeout(() => (formMessage.textContent = ""), 2500);
});

// ============================================
// DELETE EXPENSE
// ============================================
async function deleteExpense(id) {
  const confirmDelete = confirm("Delete this expense?");
  if (!confirmDelete) return;

  const { error } = await client.from("expenses").delete().eq("id", id);

  if (error) {
    console.error("Error deleting expense:", error);
    alert("Could not delete expense. Please try again.");
    return;
  }

  loadExpenses();
}

// ============================================
// INITIAL LOAD
// ============================================
loadExpenses();
