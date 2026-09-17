# ☁️ Cloud-Based Expense Tracker

A simple, cloud-connected expense tracker built for a **Cloud Computing mini project**.
It uses plain **HTML, CSS, and JavaScript** on the frontend, and **Supabase (PostgreSQL)**
as the cloud database — no frameworks, no backend server required.

---

## 📁 Project Files

```
expense-tracker/
├── index.html      → Page structure (Dashboard + Add Expense tabs)
├── style.css        → Styling (white background, blue/purple cards)
├── script.js        → App logic + Supabase connection
└── README.md         → This file
```

---

## ✨ Features

- Add an expense (Amount, Category, Description, Date)
- View all expenses in a table
- See Total Expenses at the top of the dashboard
- Delete any expense
- All data is stored and fetched from a Supabase cloud PostgreSQL database (not localStorage)

---

## 🛠️ Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up / log in (free tier is enough).
2. Click **New Project**.
3. Fill in:
   - **Name**: `expense-tracker` (or anything you like)
   - **Database Password**: choose a strong password and save it somewhere safe
   - **Region**: pick the one closest to you
4. Click **Create new project** and wait ~1–2 minutes for it to finish setting up.

---

## 🗄️ Step 2: Create the `expenses` Table

1. In your Supabase project, open the **SQL Editor** from the left sidebar.
2. Click **New query** and paste the following SQL:

```sql
create table expenses (
  id bigint generated always as identity primary key,
  amount numeric(10,2) not null,
  category text not null,
  description text not null,
  date date not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table expenses enable row level security;

-- Allow anyone with the anon key to read/insert/delete (fine for a student project/demo)
create policy "Allow public read access"
  on expenses for select
  using (true);

create policy "Allow public insert access"
  on expenses for insert
  with check (true);

create policy "Allow public delete access"
  on expenses for delete
  using (true);
```

3. Click **Run**. You should see a success message and a new `expenses` table appear
   under **Table Editor**.

> ⚠️ **Note on security**: The policies above make the table publicly readable/writable
> using the anon key, which is fine for a mini project / demo. For a real production app,
> you would add authentication and restrict policies to logged-in users.

---

## 🔑 Step 3: Get Your Supabase API Keys

1. In Supabase, go to **Project Settings** (gear icon) → **API**.
2. Copy these two values:
   - **Project URL** (looks like `https://xxxxxxxxxxxx.supabase.co`)
   - **anon public** key (a long string under "Project API keys")

---

## 🔌 Step 4: Connect Your Website to Supabase

1. Open `script.js` in a text editor.
2. At the very top, replace the placeholder values:

```js
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
```

   with your actual values from Step 3, for example:

```js
const SUPABASE_URL = "https://xxxxxxxxxxxx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....";
```

3. Save the file.

---

## 💻 Step 5: Run the Website Locally

You don't need any build tools — just open `index.html` in a browser.

**Option A — Open directly:**
Double-click `index.html`. It should open in your default browser and work right away.

**Option B — Use a simple local server (recommended, avoids some browser restrictions):**

If you have Python installed:

```bash
# Navigate to the project folder
cd expense-tracker

# Python 3
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

If you use VS Code, you can also install the **Live Server** extension and click
"Go Live" instead.

---

## 🚀 Step 6: Deploy Using GitHub Pages

1. Create a new repository on GitHub (e.g. `cloud-expense-tracker`).
2. Upload the four files (`index.html`, `style.css`, `script.js`, `README.md`) to the
   repository — either by dragging them into the GitHub web interface, or using git:

```bash
git init
git add .
git commit -m "Initial commit - Cloud Expense Tracker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cloud-expense-tracker.git
git push -u origin main
```

3. On GitHub, go to your repository → **Settings** → **Pages**.
4. Under **Build and deployment**, set:
   - **Source**: Deploy from a branch
   - **Branch**: `main` and folder `/ (root)`
5. Click **Save**. After a minute or two, GitHub will give you a live link like:

```
https://YOUR_USERNAME.github.io/cloud-expense-tracker/
```

6. Open that link — your Cloud Expense Tracker is now live on the internet, reading
   and writing to your Supabase database! 🎉

---

## 🧪 Testing the App

1. Open the deployed (or local) site.
2. Click **Add Expense** in the navbar.
3. Fill in Amount, Category, Description, and Date, then click **Add Expense**.
4. Click **Dashboard** — your new expense should appear in the table, and the
   **Total Expenses** figure should update.
5. Click **Delete** next to any row to remove it (with a confirmation prompt).
6. Check the **Table Editor** in Supabase — you'll see the same data stored there,
   confirming it's a true cloud database.

---

## 🧰 Tech Stack Summary

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | HTML, CSS, Vanilla JavaScript       |
| Database   | Supabase (PostgreSQL, cloud-hosted) |
| Hosting    | GitHub Pages                        |

No React, no Node.js, no Flask, no Firebase — just the essentials, perfect for
demonstrating cloud computing concepts (cloud database + cloud hosting) in a
simple, understandable way.

---

## 🐞 Troubleshooting

- **Nothing loads / console shows a Supabase error**: Double-check `SUPABASE_URL` and
  `SUPABASE_ANON_KEY` in `script.js` are copied correctly with no extra spaces.
- **"Failed to fetch" errors**: Make sure your Supabase project is active (not paused)
  and that you ran the SQL to create the `expenses` table and policies.
- **Rows don't appear after adding**: Confirm the table name is exactly `expenses`
  and the column names match (`amount`, `category`, `description`, `date`).
- **CORS-type errors when opening `index.html` directly**: Use the local server option
  in Step 5, Option B, instead of double-clicking the file.
