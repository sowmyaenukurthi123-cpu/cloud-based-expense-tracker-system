☁️ Cloud-Based Expense Tracker
A simple, cloud-connected expense tracker built for a Cloud Computing mini project. It uses plain HTML, CSS, and JavaScript on the frontend, and Supabase (PostgreSQL) as the cloud database — no frameworks, no backend server required.

📁 Project Files
expense-tracker/
├── index.html      → Page structure (Dashboard + Add Expense tabs)
├── style.css        → Styling (white background, blue/purple cards)
├── script.js        → App logic + Supabase connection
└── README.md         → This file
✨ Features
Add an expense (Amount, Category, Description, Date)
View all expenses in a table
See Total Expenses at the top of the dashboard
Delete any expense
All data is stored and fetched from a Supabase cloud PostgreSQL database (not localStorage)
🛠️ Step 1: Create a Supabase Project
Go to https://supabase.com and sign up / log in (free tier is enough).
Click New Project.
Fill in:
Name: expense-tracker (or anything you like)
Database Password: choose a strong password and save it somewhere safe
Region: pick the one closest to you
Click Create new project and wait ~1–2 minutes for it to finish setting up.
🗄️ Step 2: Create the expenses Table
In your Supabase project, open the SQL Editor from the left sidebar.
Click New query and paste the following SQL:
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
Click Run. You should see a success message and a new expenses table appear under Table Editor.
⚠️ Note on security: The policies above make the table publicly readable/writable using the anon key, which is fine for a mini project / demo. For a real production app, you would add authentication and restrict policies to logged-in users.

🔑 Step 3: Get Your Supabase API Keys
In Supabase, go to Project Settings (gear icon) → API.
Copy these two values:
Project URL (looks like https://xxxxxxxxxxxx.supabase.co)
anon public key (a long string under "Project API keys")
🔌 Step 4: Connect Your Website to Supabase
Open script.js in a text editor.
At the very top, replace the placeholder values:
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
with your actual values from Step 3, for example:

const SUPABASE_URL = "https://xxxxxxxxxxxx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....";
Save the file.
💻 Step 5: Run the Website Locally
You don't need any build tools — just open index.html in a browser.

Option A — Open directly: Double-click index.html. It should open in your default browser and work right away.

Option B — Use a simple local server (recommended, avoids some browser restrictions):

If you have Python installed:

# Navigate to the project folder
cd expense-tracker


