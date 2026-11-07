/**
 * WhatsApp Notification & Deep-link Generator for SPOGMAI Pakistan
 * Official Brand WhatsApp: +92 370 0349146 (03700349146)
 */

export const OFFICIAL_PHONE = "03700349146";
export const OFFICIAL_WHATSAPP_NUMBER = "923700349146";

export class WhatsAppNotificationService {
  /**
   * Generates WhatsApp direct chat link with prefilled URL-encoded message
   */
  public static generateLink(phone: string, text: string): string {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const targetPhone = cleanPhone.startsWith("03")
      ? `92${cleanPhone.slice(1)}`
      : cleanPhone.startsWith("92")
      ? cleanPhone
      : OFFICIAL_WHATSAPP_NUMBER;

    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
  }

  /**
   * Order Confirmation & COD Verification WhatsApp Message
   */
  public static getOrderConfirmationMessage(order: {
    orderNumber: string;
    customerName: string;
    total: number;
    items: { productName: string; size: string; quantity: number }[];
    shippingAddress: string;
    city: string;
  }): string {
    const itemsList = order.items
      .map((it) => `• ${it.productName} (${it.size}) × ${it.quantity}`)
      .join("\n");

    return (
      `*SPOGMAI — BESPOKE MENSWEAR*\n\n` +
      `Salaam *${order.customerName}*,\n` +
      `Thank you for honoring us with your order *#${order.orderNumber}*.\n\n` +
      `*ORDER SUMMARY:*\n${itemsList}\n\n` +
      `*Total Amount (COD):* PKR ${order.total.toLocaleString()}\n` +
      `*Delivery Address:* ${order.shippingAddress}, ${order.city}\n\n` +
      `Please reply with *"CONFIRM"* to initiate express courier dispatch, or reply with your preferred delivery timing.\n\n` +
      `_SPOGMAI Atelier | Wear The Legacy_\n` +
      `_Helpline: +92 370 0349146_`
    );
  }

  /**
   * COD Verification Message (One-click Confirm link)
   */
  public static getCodVerificationMessage(orderNumber: string, customerName: string): string {
    return (
      `*SPOGMAI COD VERIFICATION*\n\n` +
      `Salaam *${customerName}*,\n` +
      `We have received your Cash on Delivery order *#${orderNumber}*.\n\n` +
      `To ensure uninterrupted dispatch to your address, please reply *"CONFIRM"* to this message.\n\n` +
      `If you made any changes or wish to adjust sizes, our menswear concierges are at your service.`
    );
  }

  /**
   * Order Dispatched Notification
   */
  public static getDispatchNotification(
    customerName: string,
    orderNumber: string,
    courierName: string,
    trackingNumber: string,
    trackingUrl: string
  ): string {
    return (
      `*SPOGMAI DISPATCH ALERT*\n\n` +
      `Dear *${customerName}*,\n` +
      `Your bespoke SPOGMAI order *#${orderNumber}* has been hand-inspected, steam-pressed, and dispatched via *${courierName}*.\n\n` +
      `*Tracking Number:* ${trackingNumber}\n` +
      `*Track Your Parcel:* ${trackingUrl}\n\n` +
      `Estimated delivery: 2-3 business days. Please keep exact cash ready upon rider arrival.\n\n` +
      `_SPOGMAI Atelier_`
    );
  }

  /**
   * Post-Delivery Review Invitation
   */
  public static getReviewRequestMessage(customerName: string, orderNumber: string): string {
    return (
      `*SPOGMAI SARTORIAL SATISFACTION*\n\n` +
      `Dear *${customerName}*,\n` +
      `Your SPOGMAI menswear order *#${orderNumber}* was marked as delivered.\n\n` +
      `How does the silhouette drape? We would be deeply honored if you could leave a short review on our store:\n` +
      `https://spogmai.com/track?order=${orderNumber}\n\n` +
      `As a token of appreciation, use code *PATRON15* on your next heirloom acquisition.`
    );
  }

  /**
   * Abandoned Cart Recovery Message
   */
  public static getAbandonedCartRecoveryMessage(customerName: string, productName: string): string {
    return (
      `*SPOGMAI CONCIERGE COURTESY*\n\n` +
      `Salaam *${customerName || "Patron"}*,\n` +
      `We noticed you were admiring the *${productName}* in your shopping bag.\n\n` +
      `Due to limited atelier batches, fabric inventory is strictly reserved. To complete your acquisition, use code *RECOVER5* for an exclusive 5% courtesy concession:\n` +
      `https://spogmai.com/cart\n\n` +
      `May we assist with sizing or bespoke tailoring measurements?`
    );
  }
}
