# 🔐 Better Auth Authentication Starter

<p align="center">
  A modern authentication starter built with <strong>Next.js 15</strong>, <strong>Better Auth</strong>, <strong>MongoDB</strong>, and <strong>Nodemailer</strong>.
</p>

<p align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![Better Auth](https://img.shields.io/badge/Better%20Auth-Authentication-orange)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

</p>

---

# ✨ Overview

A complete authentication starter built with **Next.js 15 App Router**, **Better Auth**, and **MongoDB**.

It includes secure authentication with email/password, Google & GitHub OAuth, email verification using OTP, password recovery, password updates, protected routes, and a clean architecture powered by **Server Actions**.

---
#  Highlights

* 🔐 Complete Authentication System
* 🌍 Google & GitHub OAuth
* ✉️ Email Verification with OTP
* 🔑 Password Recovery
* 🛡️ Security Dashboard
* 💻 Connected Devices Management
* 🔒 Logout From Individual Devices
* 🌐 Logout From All Devices
* 📋 Persistent Login History
* 🔍 Security Activity Audit Log
* ⚡ Server Actions
* 📱 Fully Responsive
* 🎨 Modern UI with shadcn/ui
* 🧩 Clean & Modular Architecture


# ✨ Features

## Authentication

- ✅ Email & Password Sign Up
- ✅ Email & Password Sign In
- ✅ Google OAuth
- ✅ GitHub OAuth
- ✅ Logout
- ✅ Session Management
- ✅ Protected Routes

## Email Verification

- ✅ 6-digit OTP verification
- ✅ SHA-256 OTP hashing
- ✅ OTP expiration (10 minutes)


## Password Management

- ✅ Forgot Password
- ✅ Reset Password
- ✅ Verify Reset Password
- ✅ Change Password

## Email

- ✅ Nodemailer SMTP
- ✅ Verification Email
- ✅ Forgot Password Email
- ✅ Reset Password Email
- ✅ HTML Email Templates

# 🛡️ Security Dashboard
- ✅ Connected Devices
- ✅ Current Session Detection
- ✅ Session Management
- ✅ Revoke Individual Sessions
- ✅ Logout From All Other Devices
- ✅ Browser Detection
- ✅ Operating System Detection
- ✅ Desktop / Mobile / Tablet Detection
- ✅ IP Address Display
- ✅ Session Creation Time
- ✅ Last Activity
- ✅ Confirmation Dialogs
- ✅ Account Security Overview

## 📋 Login History
- ✅ Persistent Login History (survives session expiry)
- ✅ Stored in dedicated MongoDB `loginHistory` collection
- ✅ Recorded on every sign-in via `databaseHooks`
- ✅ Browser, OS & Device parsed from User-Agent
- ✅ IP Address tracking
- ✅ Live client-side search (browser, OS, IP)
- ✅ Current session highlighted
- ✅ Human-readable timestamps (Today, Yesterday, date)

## 🔍 Security Activity
- ✅ Full audit log of all security events
- ✅ Tracks: Sign In, Sign Out, Password Change
- ✅ Stored in dedicated MongoDB `securityActivity` collection
- ✅ Colour-coded event badges (green / orange / blue)
- ✅ Stats cards: Total Events, Sign Ins, Sign Outs, Password Changes
- ✅ Empty state with guidance

## Developer Experience

- ✅ Next.js App Router
- ✅ Server Actions
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ shadcn/ui
- ✅ Responsive UI

---

# 🛠 Tech Stack

| Technology | Description |
|------------|-------------|
| Framework | Next.js 15 |
| Language | TypeScript |
| Authentication | Better Auth |
| Database | MongoDB |
| Email | Nodemailer |
| Styling | Tailwind CSS |
| UI | shadcn/ui |
| Icons | Lucide React |
| Package Manager | npm |

---

# 📂 Project Structure

```text
src
├── actions
│   └── auth
│       ├── forgot-password
│       │   ├── forgot-password.ts
│       │   └── reset-password.ts
│       │
│       ├── security
│       │   ├── get-sessions.ts
│       │   ├── get-login-history.ts
│       │   ├── get-security-activity.ts
│       │   ├── revoke-session.ts
│       │   └── revoke-all-sessions.ts
│       │   
│       ├── password-update
│       │   └── password-update.ts
│       │
│       ├── sign-in
│       │   ├── email-sign-in.ts
│       │   ├── github-sign-in.ts
│       │   └── google-sign-in.ts
│       │
│       ├── sign-up
│       │   └── email-sign-up.ts
│       │
│       └── verify-email
│           └── verify-email.ts
│
├── app
│   ├── (auth)
│   │   ├── forgot-password
│   │   ├── reset-password
│   │   ├── sign-in
│   │   ├── sign-up
│   │   ├── verify-reset-password
│   │   └── layout.tsx
│   │
│   ├── (protected)
│   │   ├── dashboard
│   │   ├── settings
│   │   │   ├── profile
│   │   │   ├── password
│   │   │   └── security
│   │   │       ├── page.tsx
│   │   │       ├── login-history
│   │   │       │   └── page.tsx
│   │   │       └── security-activity
│   │   │           └── page.tsx
│   │   │
│   │   ├── verify-email
│   │   └── layout.tsx
│   │
│   ├── api
│   │   └── auth
│   │       └── verify-email
│   │
│   ├── error.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── layout.tsx
│   └── page.tsx
│
├── components
├── hooks
├── middleware
├── providers
│
├── lib
│   ├── auth
│   ├── email
│   ├── mailer.ts
│   └── db.ts
│
└── assets
```

---

# 🔐 Authentication Flow

```text
Sign Up
   │
   ▼
Create Account
   │
   ▼
Generate OTP
   │
   ▼
Hash OTP (SHA-256)
   │
   ▼
Store OTP
   │
   ▼
Send Verification Email
   │
   ▼
Verify Email
   │
   ▼
Sign In
   │
   ▼
Dashboard
```

---

# 🔑 Forgot Password Flow

```text
Forgot Password
        │
        ▼
Enter Email
        │
        ▼
Generate Reset Token
        │
        ▼
Send Reset Email
        │
        ▼
Verify Reset Token
        │
        ▼
Create New Password
        │
        ▼
Sign In
```







---
# 🛡️ Session Management Flow


```text
User Login
      │
      ▼
Create Session ──► databaseHooks.session.create.after
      │                  │
      ▼                  ├──► Insert into `loginHistory`
Store Session            └──► Insert into `securityActivity` (type: sign_in)
      │
      ▼
View Connected Devices
      │
      ▼
Revoke One Session ──► databaseHooks.session.delete.after
      │                      └──► Insert into `securityActivity` (type: sign_out)
      ├──────────────► Logout Selected Device
      │
      ▼
Logout All Devices
      │
      ▼
Revoke All Sessions
```

---
# 📋 Login History & Security Activity Flow

```text
Sign In
   │
   ▼
databaseHooks.session.create.after
   │
   ├──► loginHistory collection
   │       userId, sessionToken, ipAddress, userAgent, createdAt
   │
   └──► securityActivity collection
           userId, type: "sign_in", ipAddress, userAgent, createdAt

Sign Out / Session Revoked
   │
   ▼
databaseHooks.session.delete.after
   └──► securityActivity collection
           userId, type: "sign_out", createdAt

Password Changed
   │
   ▼
databaseHooks.user.update.after
   └──► securityActivity collection
           userId, type: "password_change", createdAt
```

---

# 🔒 Security

- Better Auth Session Management
- Secure HTTP-only Cookies
- Protected Routes
- Email Verification Required
- Secure Password Hashing
- SHA-256 OTP Hashing
- OTP Expiration
- Password Reset Tokens
- Active Session Tracking
- Connected Devices Dashboard
- Browser Detection
- Device Detection
- Operating System Detection
- Session Revocation
- Logout From All Devices
- Current Session Identification
- Confirmation Dialogs
- Environment Variable Validation
- TypeScript Type Safety
- Secure Server Actions
- Persistent Login History (survives session expiry/revocation)
- Security Activity Audit Log (sign-in, sign-out, password changes)
- Event-driven logging via `databaseHooks` (never blocks auth flow)
---

# 📦 Installation

Clone the repository:

```bash
git clone https://github.com/wasselessalah/nextjs-better-auth.git
```

Go to the project directory:

```bash
cd nextjs-better-auth
```

Install dependencies:

```bash
npm install
```

---

# ⚙️ Environment Variables

Create a `.env.local` file.

```env
# MongoDB
MONGODB_URI=

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

# Nodemailer (SMTP)
EMAIL_USER=
EMAIL_PASS=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# GitHub OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

> **Note:** When using Gmail with Nodemailer, `EMAIL_PASS` must be a **Google App Password**, not your Gmail account password.

---

# 🚀 Running the Project

Development:

```bash
npm run dev
```

Production:

```bash
npm run build
npm run start
```

---

# 📜 Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

# 📈 Recommended Rate Limits

| Action | Recommendation |
|---------|---------------|
| Sign Up | 5 requests / hour / IP |
| Login | 5 failed attempts / 15 minutes |
| Verify OTP | 5 attempts |
| Forgot Password | 3 requests / hour |
| Reset Password | Token expires after 10 minutes |

---

# 🌐 Authentication Providers

- ✅ Email & Password
- ✅ Google OAuth
- ✅ GitHub OAuth

---

# 🚀 Deployment

Deploy on:

- ▲ Vercel
- 🚂 Railway
- 🎨 Render
- 🐳 Docker
- ☁️ AWS
- ☁️ Azure
- ☁️ Google Cloud

---

# 📚 Documentation

- Better Auth
- Next.js
- MongoDB
- Nodemailer
- Tailwind CSS
- shadcn/ui

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# ⭐ Support

If you find this project useful, consider giving it a **⭐ Star** on GitHub.

---

<p align="center">
Made with ❤️ using <strong>Next.js</strong>, <strong>Better Auth</strong>, <strong>MongoDB</strong>, <strong>Nodemailer</strong>, and <strong>TypeScript</strong>.
</p>