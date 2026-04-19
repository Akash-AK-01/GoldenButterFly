# 🌿 Golden — NGO Web Platform
 
A full-stack web application for **Golden**, a non-profit organization focused on emotional storytelling and impactful community engagement. Built to make donating seamless, stories visible, and volunteering accessible.

---

## ✨ Features

- **Donation Flow** — One-time and recurring donations via Stripe, with automatic email receipts
- **Impact Stories** — Rich media stories with category filtering and emotional storytelling
- **Volunteer Portal** — Applications, skill matching, and admin approval workflow
- **Donor Dashboard** — Personal donation history and profile management
- **Contact & Newsletter** — Contact form with email delivery and newsletter opt-in
- **Admin Dashboard** — Full content and donation management via Django Admin

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router v6, TailwindCSS, Redux Toolkit |
| Backend | Django 5, Django REST Framework, PostgreSQL |
| Payments | Stripe (Checkout + Webhooks) |
| Media | Cloudinary |
| Email | SendGrid |
| Auth | JWT (SimpleJWT) |
| Task Queue | Celery + Redis |
| Deployment | Vercel (frontend) · Railway (backend) |

---

## 📁 Project Structure

```
golden/
├── golden-frontend/    # React app
└── golden-backend/     # Django API
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL
- Redis (for Celery)

### Frontend Setup

```bash
cd golden-frontend
npm install
cp .env.example .env       # fill in your variables
npm run dev
```

**Required `.env` variables:**
```
VITE_API_BASE_URL=http://localhost:8000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

### Backend Setup

```bash
cd golden-backend
python -m venv venv
source venv/bin/activate
pip install -r requirements/development.txt
cp .env.example .env       # fill in your variables
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

**Required `.env` variables:**
```
SECRET_KEY=your-django-secret
DATABASE_URL=postgres://...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SENDGRID_API_KEY=SG....
CLOUDINARY_URL=cloudinary://...
REDIS_URL=redis://localhost:6379
```

### Run Celery Worker (for email tasks)
```bash
celery -A golden worker -l info
```

---

## 🗺 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | JWT login |
| GET | `/api/stories/` | List all stories |
| GET | `/api/stories/:id/` | Story detail |
| POST | `/api/donations/` | Create donation |
| POST | `/api/donations/webhook/` | Stripe webhook |
| POST | `/api/volunteers/apply/` | Submit application |
| POST | `/api/contacts/` | Send contact message |

---

## 🏗 Build Phases

| Phase | Scope |
|---|---|
| 1 — Foundation | Project setup, auth (JWT), user model, env config |
| 2 — Stories & UI | Story CRUD, homepage, story pages, Cloudinary |
| 3 — Donations | Stripe integration, webhooks, receipt emails, donor dashboard |
| 4 — Community | Volunteer portal, contact form, newsletter, deployment |

---

## 🤝 Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'feat: add your feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

> Built with ❤️ for the Golden community.
