"use client";

import { motion } from "framer-motion";

export default function TermsOfServicePage() {
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
            Terms of <span className="text-accent">Service</span>
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
              By accessing and using the ACK St Paul's South C website, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">1. Use of Website</h2>
            <p>
              The content on this website is for your general information and church-related use only. It is subject to change without notice. Unauthorized use of this website may give rise to a claim for damages or be a criminal offense.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">2. Donations & Payments</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All donations made via M-Pesa or other platforms are voluntary and non-refundable.</li>
              <li>Please ensure that donation details (Amount, Reference) are correct before confirming transactions.</li>
              <li>Church magazines and products purchased via the shop are subject to availability.</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">3. Intellectual Property</h2>
            <p>
              This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, graphics, and sermons. Reproduction is prohibited other than in accordance with the copyright notice.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">4. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the website for any unlawful purpose.</li>
              <li>Attempt to gain unauthorized access to our servers or databases.</li>
              <li>Post or transmit any defamatory, offensive, or inappropriate content via our forms.</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">5. Disclaimer of Liability</h2>
            <p>
              While we strive for accuracy, ACK St Paul's South C does not provide any warranty or guarantee as to the accuracy, timeliness, or completeness of the information found on this website. Your use of any information on this site is entirely at your own risk.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">6. External Links</h2>
            <p>
              From time to time, this website may include links to other websites (e.g., social media or partner organizations). These links are provided for your convenience and do not signify that we endorse the website(s). We have no responsibility for the content of linked websites.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">7. Governing Law</h2>
            <p>
              Your use of this website and any dispute arising out of such use is subject to the laws of the Republic of Kenya.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">8. Changes to Terms</h2>
            <p>
              ACK St Paul's South C reserves the right to update these terms at any time. We encourage users to check this page periodically for any changes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
