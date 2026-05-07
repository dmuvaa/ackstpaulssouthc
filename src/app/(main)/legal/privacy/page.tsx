"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  const lastUpdated = "May 6, 2026";

  return (
    <div className="min-h-screen bg-muted/30">
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black tracking-tight sm:text-6xl"
          >
            Privacy <span className="text-accent">Policy</span>
          </motion.h1>
          <p className="mt-4 text-lg text-slate-300">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-white p-12 rounded-[3rem] shadow-xl border border-primary/5">
          <div className="prose prose-slate prose-lg max-w-none text-muted-foreground leading-relaxed">
            <p className="text-xl text-primary font-medium mb-8">
              At ACK St Paul's South C Parish, we are committed to protecting the privacy and personal information of our members, visitors, and online users. This policy explains how we collect, use, and safeguard your data.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">1. Information We Collect</h2>
            <p>
              We may collect personal information when you interact with our website, join a ministry, or donate. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact Details:</strong> Name, email address, and phone number.</li>
              <li><strong>Donation Information:</strong> M-Pesa transaction details, amount, and donor name. (We do not store full credit card details on our servers).</li>
              <li><strong>Ministry Engagement:</strong> Information you provide when joining groups or signing up for events.</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">2. How We Use Your Information</h2>
            <p>We use your data strictly for church-related purposes, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Processing donations and issuing receipts.</li>
              <li>Sending church announcements and newsletters.</li>
              <li>Responding to your inquiries and prayer requests.</li>
              <li>Improving our website and online services.</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">3. Data Security</h2>
            <p>
              We implement robust security measures to protect your information from unauthorized access. Your data is stored on secure servers, and sensitive financial transactions are handled via encrypted third-party payment gateways.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">4. Sharing Your Information</h2>
            <p>
              We <strong>never</strong> sell, rent, or trade your personal information to third parties. We may only share data with trusted service providers (e.g., email platforms or payment processors) strictly to perform church-related tasks.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">5. Your Rights</h2>
            <p>
              You have the right to access, correct, or request the deletion of your personal data held by the church. To do so, please contact our church office.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">6. Cookies</h2>
            <p>
              Our website does not use tracking cookies for marketing purposes. We prioritize your privacy and do not collect browsing history or device information.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:<br/>
              <strong>ACK St Paul's South C Parish</strong><br/>
              Email: info@ackstpaulssouthc.co.ke<br/>
              Phone: +254 717 401333
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
