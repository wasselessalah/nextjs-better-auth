# 🔐 Better Auth + Next.js + MongoDB

A modern authentication starter built with **Next.js 15**, **Better Auth**, and **MongoDB**. It includes secure email/password authentication, Google & GitHub OAuth, email verification using OTP, protected routes, and a clean, scalable architecture.

---

## ✨ Features

- 🔐 Better Auth integration
- 👤 Email & Password authentication
- ✉️ Email verification with 6-digit OTP
- 🔄 Resend verification code
- 🌐 Google & GitHub OAuth
- 🍪 Secure session management
- 🛡️ Protected routes
- 🔒 Hashed OTP storage (SHA-256)
- ⏱️ OTP expiration (10 minutes)
- 🗄️ Shared MongoDB connection
- 📧 Nodemailer email service
- ⚡ Next.js App Router
- 📘 TypeScript
- 🎨 Tailwind CSS
- 🧩 shadcn/ui components
- 📱 Fully responsive UI

---

# 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Authentication | Better Auth |
| Database | MongoDB |
| Email Service | Nodemailer |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Icons | Lucide React & React Icons |
| Package Manager | npm |

---

# 📂 Project Structure

```text
.
├── public
│
├── src
│   ├── app
│   │   ├── (auth)
│   │   │   ├── sign-in
│   │   │   ├── sign-up
│   │   │   └── verify-email
│   │   │
│   │   ├── (protected)
│   │   │
│   │   ├── api
│   │   │   └── auth
│   │   │       ├── resend-verification
│   │   │       └── verify-email
│   │   │
│   │   ├── error.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   │
│   ├── assets
│   │
│   ├── components
│   │
│   ├── constants
│   │
│   ├── features
│   │
│   ├── hooks
│   │
│   ├── lib
│   │   ├── auth
│   │   │   ├── auth-client.ts
│   │   │   ├── auth.ts
│   │   │   └── generateOtp.ts
│   │   │
│   │   ├── email
│   │   │   └── send-verification.ts
│   │   │
│   │   ├── db.ts
│   │   ├── mailer.ts
│   │   └── utils.ts
│   │
│   ├── middleware
│   │
│   ├── providers
│   │
│   └── services
│
├── .env.local
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/wasselessalah/nextjs-better-auth.git

cd nextjs-better-auth
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Configure environment variables

Create a `.env.local` file.

```env
# Database
MONGODB_URI=

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

# Email (Gmail App Password)
EMAIL_USER=
EMAIL_PASS=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# GitHub OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

---

## 4. Run the development server

```bash
npm run dev
```

Visit

```text
http://localhost:3000
```

---

# 📦 Available Scripts

```bash
npm run dev      # Start development server

npm run build    # Build production application

npm run start    # Run production server

npm run lint     # Run ESLint
```

---

# 🔑 Authentication Flow

```text
User Registration
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
Store in MongoDB
        │
        ▼
Send Verification Email
        │
        ▼
User Enters OTP
        │
        ├──────────────┐
        │              │
        ▼              ▼
Valid OTP      Invalid OTP
        │              │
        ▼              ▼
Verify Email   Retry / Request New Code
        │
        ▼
Dashboard
```

---

# 🔒 Security Features

- Better Auth session management
- Email verification before access
- Secure 6-digit OTP verification
- SHA-256 OTP hashing
- OTP expiration (10 minutes)
- Shared MongoDB connection
- Protected routes
- Environment variable validation
- TypeScript for type safety

### Recommended Rate Limits

| Action | Limit |
|----------|---------------------------|
| Resend OTP | 3 requests / 10 minutes / email |
| Generate OTP | 5 requests / hour / email |
| Verify OTP | 5 attempts / OTP |
| Login | 5 failed attempts / 15 minutes |
| Sign Up | 5 requests / hour / IP |
| Forgot Password | 3 requests / hour / email |

---

# 📧 Authentication Providers

Supported providers include:

- ✅ Email & Password
- ✅ Google OAuth
- ✅ GitHub OAuth

---

# 📁 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `BETTER_AUTH_SECRET` | Better Auth secret |
| `BETTER_AUTH_URL` | Application URL |
| `EMAIL_USER` | SMTP email address |
| `EMAIL_PASS` | SMTP app password |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |
| `GITHUB_CLIENT_ID` | GitHub OAuth Client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth Client Secret |

---

# 🚀 Deployment

Deploy on your preferred platform:

- ▲ Vercel
- 🚂 Railway
- 🎨 Render
- 🐳 Docker
- ☁️ AWS
- ☁️ Azure
- ☁️ Google Cloud

---

# 📚 Resources

- Better Auth Documentation
- Next.js Documentation
- MongoDB Documentation
- Nodemailer Documentation
- Tailwind CSS Documentation
- shadcn/ui Documentation

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.

---

## ⭐ Support

If you find this project useful, consider giving it a **⭐ Star** on GitHub.

Your support helps improve the project and encourages future updates.

---

Made with ❤️ using **Next.js**, **Better Auth**, **MongoDB**, and **TypeScript**.