import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "";

export const resend = new Resend(resendApiKey);

export async function sendDonationEmail(to: string, amount: number, name: string) {
  try {
    await resend.emails.send({
      from: "ACK St Paul's <donations@ackstpaulssouthc.org>",
      to: [to],
      subject: "Thank You for Your Donation!",
      html: `
        <h1>Thank You, ${name}!</h1>
        <p>We have received your donation of KES ${amount}.</p>
        <p>Your support helps us continue our mission in South C and beyond.</p>
        <p>God bless you!</p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Resend error:", error);
    return { success: false, error };
  }
}
