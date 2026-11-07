/**
 * Pakistani Digital Payment Gateways Architecture for SPOGMAI
 * Supports JazzCash and Easypaisa integration models.
 * Active default payment in Pakistan remains Cash on Delivery (COD),
 * with digital payments ready when merchant credentials are set.
 */

import crypto from "crypto";

export interface JazzCashInitParams {
  orderId: string;
  amountPKR: number;
  billReference: string;
  description: string;
  returnUrl: string;
}

export interface EasypaisaInitParams {
  orderId: string;
  amountPKR: number;
  customerMobile: string;
  customerEmail: string;
  returnUrl: string;
}

export class PaymentGatewayService {
  /**
   * Generates JazzCash HMAC-SHA256 secure hash and checkout payload
   */
  public static generateJazzCashPayload(params: JazzCashInitParams) {
    const merchantId = process.env.JAZZCASH_MERCHANT_ID || "MC_SPOGMAI_SANDBOX";
    const password = process.env.JAZZCASH_PASSWORD || "pass_sandbox_123";
    const integritySalt = process.env.JAZZCASH_INTEGRITY_SALT || "salt_sandbox_spogmai_xyz";

    const txnDateTime = new Date()
      .toISOString()
      .replace(/[-:T.]/g, "")
      .slice(0, 14);
    const txnExpiryDateTime = new Date(Date.now() + 3600000)
      .toISOString()
      .replace(/[-:T.]/g, "")
      .slice(0, 14);

    const amountInPaisa = (params.amountPKR * 100).toString();

    const postData: Record<string, string> = {
      pp_Version: "1.1",
      pp_TxnType: "MWALLET",
      pp_Language: "EN",
      pp_MerchantID: merchantId,
      pp_Password: password,
      pp_TxnRefNo: `T${params.orderId.replace(/[^a-zA-Z0-9]/g, "").slice(-10)}${Date.now().toString().slice(-4)}`,
      pp_Amount: amountInPaisa,
      pp_TxnCurrency: "PKR",
      pp_TxnDateTime: txnDateTime,
      pp_BillReference: params.billReference,
      pp_Description: params.description,
      pp_TxnExpiryDateTime: txnExpiryDateTime,
      pp_ReturnURL: params.returnUrl,
    };

    // Sort keys alphabetically as required by JazzCash
    const sortedKeys = Object.keys(postData).sort();
    let sortedString = integritySalt;
    for (const key of sortedKeys) {
      if (postData[key]) {
        sortedString += `&${postData[key]}`;
      }
    }

    const secureHash = crypto
      .createHmac("sha256", integritySalt)
      .update(sortedString)
      .digest("hex")
      .toUpperCase();

    return {
      postUrl: process.env.JAZZCASH_ENDPOINT || "https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/",
      fields: {
        ...postData,
        pp_SecureHash: secureHash,
      },
    };
  }

  /**
   * Generates Easypaisa MA (Mobile Account) / Hosted Checkout initiation
   */
  public static generateEasypaisaPayload(params: EasypaisaInitParams) {
    const storeId = process.env.EASYPAISA_STORE_ID || "12345";
    const hashKey = process.env.EASYPAISA_HASH_KEY || "EP_HASH_SPOGMAI_DEMO";

    const expiryDate = new Date(Date.now() + 86400000).toISOString().slice(0, 10).replace(/-/g, "");

    const stringToHash = `amount=${params.amountPKR.toFixed(1)}&orderRefNum=${params.orderId}&paymentMethod=MA_PAYMENT_METHOD&postBackURL=${params.returnUrl}&storeId=${storeId}&timeStamp=${Date.now()}`;
    const token = crypto.createHmac("sha256", hashKey).update(stringToHash).digest("hex");

    return {
      postUrl: process.env.EASYPAISA_ENDPOINT || "https://easypay.easypaisa.com.pk/easypay/Index.jsf",
      fields: {
        storeId,
        orderId: params.orderId,
        transactionAmount: params.amountPKR.toFixed(2),
        mobileAccountNo: params.customerMobile,
        emailAddress: params.customerEmail,
        expiryDate,
        postBackURL: params.returnUrl,
        checksum: token,
      },
    };
  }
}
