# AXIPAYS Assignment Solution

## Project Overview

This project is a secure payment checkout and transaction dashboard built using React.js.

The application includes:
- Secure checkout form
- Payment API integration
- Transaction dashboard
- Charts & analytics
- Pagination
- Form validation
- Card masking
- Responsive UI

---

# Features

## Checkout Page
- Secure payment form
- Luhn Algorithm card validation
- Expiry month validation
- CVV masking
- Card formatting
- API integration
- Success / Failed payment modal
- Loading state while processing

## Dashboard
- Transaction history table
- Pagination
- Transaction analytics
- Status chart
- Currency distribution chart
- Volume chart
- API-based dynamic data

---

# Security Features

- Luhn Algorithm validation
- Card number masking
- CVV hidden from UI
- Sensitive data not displayed
- Secure API handling
- Hash generation for payment request

---

# Tech Stack

- React.js
- Axios
- Recharts
- CSS
- Vite

---

# Folder Structure

src/
│
├── api/
├── components/
├── pages/
├── utils/
├── charts/
└── modal/

---

# API Flow

1. User submits payment form
2. Card validated using Luhn Algorithm
3. Payment request sent to API
4. Redirect API processed
5. Final payment status displayed in modal
6. Dashboard fetches transaction data from API

---

# Installation

```bash
npm install
npm run dev
```

---

# Deployment

Live Project:
(Add Your Vercel Link Here)

---

# GitHub Repository

(Add Your GitHub Repo Link Here)

---

# Responsive Design

The project is fully responsive and works across:
- Mobile
- Tablet
- Desktop

---

# Author

Abhijeet Pawar