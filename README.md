# Bramble & Flame

Customer-facing storefront for [Bramble & Flame](https://bramble-n-flame.co.uk), a small independent UK business. Built as an MVP for a real client and currently live.

> **Note:** This repository contains the public storefront only. The admin panel (React + Vite) and the backend API (Node.js, MySQL) are part of the client's private infrastructure and are not publicly available.

## Features

**Storefront (this repo)**
- Best sellers section on the home page
- Product pages
- Ordering flow with form validation and secure online payment via Stripe
- Responsive, minimalistic layout

**Admin panel (private)**
- Product editing
- Promotions management
- Order moderation workflow: open orders, orders claimed by an admin for processing and dispatch, and shipped orders (with courier and tracking number)

**Backend (private)**
- REST API for authentication, products and orders
- Automated emails: order confirmation ("we received your order") and dispatch notification with tracking details

## Tech stack

| Part | Technologies |
| --- | --- |
| Storefront | Next.js, React |
| Admin panel | React, Vite |
| Backend | Node.js, REST API, MySQL |
| Payments | Stripe |
| Deployment | NGINX (reverse proxy), Ubuntu Linux |

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_API_URL=YOUR_API_URL_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE=YOUR_STRIPE_PUBLISHABLE_KEY_HERE
NEXT_PUBLIC_FACEBOOK_URL=SOCIAL_MEDIA_LINK_HERE
NEXT_PUBLIC_INSTAGRAM_URL=SOCIAL_MEDIA_LINK_HERE
```

Note: the storefront needs the private backend API to run fully.

## Status

MVP launched and tested. Next development phase (feature expansion) is being planned.
