# Better Auth + Next.js + MongoDB

A modern authentication starter built with **Next.js**, **Better Auth**, and **MongoDB**. This project provides a clean foundation for implementing secure authentication with email/password and social providers.

## ✨ Features

- 🔐 Better Auth integration
- 👤 Email & Password authentication
- 🌐 Social authentication (Google, GitHub, etc.)
- 🍪 Secure session management
- 🗄️ MongoDB database adapter
- ⚡ Next.js App Router
- 📘 TypeScript support
- 🎨 Tailwind CSS
- 📱 Responsive UI
- 🛡️ Secure authentication flow

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Authentication:** Better Auth
- **Database:** MongoDB
- **Styling:** Tailwind CSS
- **Package Manager:** npm

## 📂 Project Structure

```text
.
├── src
│   ├── app
│   ├── components
│   ├── lib
│   ├── server
│   └── types
├── public
├── .env.local
├── package.json
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file.

```env
MONGODB_URI=your_mongodb_connection_string

BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

### 4. Run the development server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

## 📦 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## 🔑 Authentication

This project supports:

- Email & Password
- Google OAuth
- GitHub OAuth
- Session Management
- Protected Routes
- User Registration
- User Login
- User Logout

## 📁 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `BETTER_AUTH_SECRET` | Better Auth secret key |
| `BETTER_AUTH_URL` | Application URL |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |
| `GITHUB_CLIENT_ID` | GitHub OAuth Client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth Client Secret |

## 🚀 Deployment

This project can be deployed to:

- Vercel
- Netlify
- Railway
- Render
- Docker
- Any Node.js hosting provider

## 📚 Resources

- Better Auth Documentation
- Next.js Documentation
- MongoDB Documentation
- Tailwind CSS Documentation

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ using Next.js, Better Auth, and MongoDB.