# RSA Creations - REST API Backend

High-performance Express.js backend for **RSA Creations** artisanal store.

## Features
- **Zero-Database JSON Storage**: Auto-persists orders, users, and catalog products to disk in `/data`.
- **Dynamic Shipping Engine**:
  - Kolkata Metropolitan Area (700xxx / Kolkata): Flat ₹60
  - Rest of West Bengal (71, 72, 73, 74): Flat ₹100
  - Rest of India: Flat ₹150
  - Free Doorstep Delivery: Orders ₹1,999+
- **Customer Auth & Profile**: Endpoints for signup/login with mobile/email and address persistence.
- **Admin Hub API**: Endpoints for order tracking updates (In Workshop, Dispatched Shipping, Delivered), stats, customer directory, and catalog additions.

## Installation & Running Locally
```bash
npm install
npm start
```
Default port: `5000` (or `process.env.PORT` on cloud hosts).

## Deployment
Deploy directly to:
- **Render** (`npm start`, Node environment)
- **Railway**
- **Heroku**
- **AWS / DigitalOcean**
