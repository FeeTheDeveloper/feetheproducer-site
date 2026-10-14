# Core Collection storefront

The owner selected the third supplied board on October 14, 2026, approved the Fee The Producer store connection, requested a 30% product gross margin, chose US-only checkout, and approved the black/white fabric Printful letterman adaptation. Six products and 31 variants are provisioned in the Fee The Producer Printful store. The all-black leather-style varsity remains an unlisted concept; no matching Printful blank was selected.

## Public experience

`/merch` and six product pages use actual Printful mockups and real store variants. The public descriptions are in `lib/data/merch.ts`; private artwork masters and the original boards remain in the owner's merch folder. Source artwork is also in a private Supabase storage bucket, not public assets. The canonical site emblem is unchanged.

The garment mockups are production previews, not photographs of manufactured samples. Cap lettering was adapted for embroidery. The letterman is cotton/poly with white fabric sleeves and standard hardware; it is not leather with gold hardware.

## Pricing

Retail cents = `ceil(configured recurring Printful cost cents / 0.70)`. Sleeve and secondary embroidery placement charges are included. Temporary/account discounts are ignored so a promotion ending does not reduce the target margin. This is a product gross margin, before shipping, tax, Stripe fees, one-time embroidery digitization and other overhead. It is not a net-profit guarantee.

`node --experimental-strip-types scripts/sync-merch-prices.mjs` checks all variants without changing prices. Add `--apply` to refresh Printful retail prices and corresponding Stripe prices, with exact store/account checks and provider readback. The private report is written to ignored `test-results/`. The script never creates or confirms orders. Stripe historical prices are retained for prior purchases.

Checkout rechecks the allowlisted product, stock, variant, configured manufacturing cost, target margin and matching active Stripe price. If a provider price changes enough to break the margin, checkout stops until prices are refreshed. Catalog reads cache for 120 seconds; checkout checks are uncached. Browser-submitted prices, URLs and store IDs are never used.

## Checkout and manual fulfillment

Stripe collects payment and the customer's US shipping address. Only card payment methods are offered. Shipping is a standard US flat rate retrieved from Printful for the selected item and quantity; it is charged separately. The rate lookup uses California as the US representative state. California, Alaska and Hawaii rates were checked for the first tee. No delivery date is promised from this representative quote.

Fulfillment is **manual**. The approved token manages products and reads files/orders; it cannot create or confirm paid Printful production orders. The storefront explains order review before production. Paid orders are visible in the Fee The Producer Stripe Dashboard with size, color, quantity, SKU, Printful store/product/variant IDs and `fulfillment=manual_printful` metadata on both the Checkout Session and PaymentIntent.

For each paid order, the owner checks Stripe's actual paid status and any refund, then creates the matching order in the Fee The Producer Printful store using the shipping address from Stripe. Record the Stripe order/payment reference in Printful to prevent duplicate fulfillment and retain its production/tracking reference. Confirming and paying for production is an owner action. Review this queue regularly; the website does not dispatch orders or send shipping emails.

Physical purchases use `application=feetheproducer-merch`. The existing digital-entitlement webhook ignores these sessions. They do not grant music access and are not stored in the digital orders table. A success query string never proves payment; the confirmation page verifies the Checkout Session with Stripe and displays no customer address or email.

The account defaults to Stripe Managed Payments, which is intended for digital products. Physical merch sessions explicitly use standard Stripe Checkout (`managed_payments.enabled=false`); the account-wide default is unchanged. Fee The Producer is the merchant for these purchases. Stripe Tax was pending when inspected. Automatic tax collection has not been configured or enabled by this change. No paid purchase or manufacturing sample was placed as part of verification.

## Connection and release

`PRINTFUL_API_TOKEN` and `PRINTFUL_STORE_ID` are server-only. The code pins store `18904049`; secrets are excluded from HTML, client bundles and health output. Missing credentials or provider failures leave the browsing experience available with ordering unavailable. Health reports configuration presence, not an end-to-end order test.

Production deployment and live checkout verification are recorded separately from source changes. A checkout redirect is evidence of session creation, not evidence of a completed payment or manufactured order.

Sources: [Printful API](https://developers.printful.com/docs/), [Stripe manual and automatic fulfillment](https://docs.stripe.com/checkout/fulfillment?payment-ui=stripe-hosted).
