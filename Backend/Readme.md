# Golden NGO - Backend API

This is the backend for **Golden**, a full-stack NGO platform designed to create emotional engagement, highlight impactful stories, and provide a seamless donation experience.

## 🎯 What We Are Building
We are building a robust REST API using **Django** and **Django REST Framework (DRF)**. This backend will serve as the source of truth for the entire platform, handling data storage, authentication, and secure third-party integrations (like Stripe for payments).

### Key Features & Apps:
1. **Users (`users`):** Custom user models with JWT authentication for regular users, volunteers, and admins.
2. **Donations (`donations`):** Managing campaigns, processing one-time and recurring donations, and handling Stripe webhooks securely.
3. **Stories (`stories`):** A content management system for emotional impact stories, including categories and tags.
4. **Volunteers (`volunteers`):** Managing volunteer opportunities and user applications.
5. **Contacts (`contacts`):** Handling inquiries and contact form submissions.

## 🛠️ Technology Stack
- **Framework:** Django 5.x & Django REST Framework
- **Database:** PostgreSQL (SQLite for local dev)
- **Authentication:** SimpleJWT (JSON Web Tokens)
- **Payments:** Stripe API & Stripe Webhooks
- **Asynchronous Tasks:** Celery & Redis (for sending receipts/emails)

## 🛤️ How We Are Going to Build It (Roadmap)

### Phase 1: Foundation & Auth
- Set up the Django project and configure settings for Development/Production.
- Create the custom `User` model and set up JWT authentication.
- Configure CORS to communicate with the React frontend.

### Phase 2: Core Data Models
- Build the `Stories` app to allow admins to post impact stories.
- Build the `Volunteers` app for creating and applying to opportunities.
- Build the `Contacts` app.

### Phase 3: Financial Engine (Stripe)
- Build the `Donations` app.
- Integrate Stripe Checkout sessions.
- Set up Stripe Webhooks to update donation statuses asynchronously.

### Phase 4: API Polish & Deployment
- Finalize permissions (who can view/edit what).
- Add pagination and filtering.
- Deploy to platforms like Render or Railway using a `Procfile`.
