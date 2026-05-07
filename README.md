# ACK St Paul's South C Parish - Digital Platform

A modern, high-performance web application for ACK St Paul's South C Parish, built with Next.js, Supabase, and M-Pesa integration. This platform serves as a digital hub for church members to access resources, participate in the magazine store, and support church missions.

## 🌟 Key Features

- **Digital Magazine Store:** Purchase and download church publications with automated delivery.
- **M-Pesa Integration:** Secure STK Push payment processing for donations and shop purchases.
- **Admin Dashboard:** Comprehensive management system for magazines, payments, and church inquiries.
- **Ministry Hubs:** Dedicated sections for all church ministries (Youth, KAMA, MU, etc.).
- **Events & Fellowships:** Up-to-date calendar of church activities and home fellowships.
- **Modern UI/UX:** Responsive, premium design with smooth animations using Framer Motion.
- **Secure Authentication:** Role-based access control for administrative functions via Supabase.

## 🛠 Technology Stack

- **Framework:** [Next.js 16 (Turbopack)](https://nextjs.org/)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/UI](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Email Service:** [Resend](https://resend.com/)
- **Payment Gateway:** [Safaricom M-Pesa API (Daraja)](https://developer.safaricom.co.ke/)

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- Supabase Account
- M-Pesa Daraja App (Consumer Key & Secret)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ackstpauls
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # M-Pesa
   MPESA_CONSUMER_KEY=your_key
   MPESA_CONSUMER_SECRET=your_secret
   MPESA_PASSKEY=your_passkey
   MPESA_SHORTCODE=your_shortcode
   MPESA_CALLBACK_URL=your_production_url/api/mpesa/callback

   # Email
   RESEND_API_KEY=your_resend_key
   APP_BASE_URL=http://localhost:3000
   ```

4. **Database Setup:**
   Apply the `supabase_schema.sql` found in the root directory to your Supabase SQL Editor to create the necessary tables and storage buckets.

5. **Run the development server:**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `src/app/(main)` - Public-facing routes (Home, About, Shop, etc.)
- `src/app/admin` - Administrative dashboard and login
- `src/app/api` - API endpoints for M-Pesa, Downloads, and Enquiries
- `src/components` - Reusable UI components and Layouts
- `src/lib` - Utility functions and API clients (M-Pesa, Supabase)
- `src/proxy.ts` - Edge middleware/proxy logic

## 🔒 Security

- Administrative routes are protected by Supabase Auth.
- Secure storage buckets are used for private magazine PDFs.
- Signed URLs are generated for temporary download access after successful payment.

## 🤝 Contribution

This project is maintained by ACK St Paul's South C Parish. For technical inquiries or support, please contact the IT department.

---
© 2026 ACK St Paul's Parish South C. All rights reserved.
