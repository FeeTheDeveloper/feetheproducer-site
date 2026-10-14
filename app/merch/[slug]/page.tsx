import type { Metadata } from "next";
import { randomUUID } from "node:crypto";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findMerch } from "@/lib/data/merch";
import { shopVariants } from "@/lib/integrations/printful";
import { money } from "@/lib/merch-policy";
import "../merch.css";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ checkout?: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = findMerch((await params).slug);
  return product ? { title: `${product.name} | Fee The Producer`, description: product.description } : {};
}

export default async function MerchProductPage({ params, searchParams }: Props) {
  const product = findMerch((await params).slug);
  if (!product) notFound();
  const variants = await shopVariants(product);
  const checkout = (await searchParams).checkout;
  return <div className="container-page merch-detail">
    <Link href="/merch#collection" className="text-link">← Back to the collection</Link>
    <div className="merch-product-grid">
      <div className="merch-gallery">
        <div className="merch-product-image"><Image src={product.image} alt={`${product.name} in ${product.color}`} width={1000} height={1000} priority sizes="(max-width: 760px) 90vw, 55vw" /></div>
        <p className="merch-small-note">Printful product mockup. Colors and placement may vary slightly.</p>
      </div>
      <div className="merch-product-copy">
        <p className="eyebrow">{product.category}</p><h1>{product.name}</h1>
        <p className="merch-product-price">{variants.length ? `From ${money(Math.min(...variants.map((v) => v.priceCents)))}` : "Temporarily unavailable"} <small>USD</small></p>
        <p className="merch-description">{product.description}</p>
        <p className="merch-color-label"><span aria-hidden="true" />{product.color}</p>
        {checkout === "unavailable" && <p className="merch-message" role="alert">We couldn’t confirm the current price or availability. Please try again in a moment, or contact us. No payment was taken.</p>}
        {checkout === "cancelled" && <p className="merch-message" role="status">Checkout was cancelled. You can choose a size and try again.</p>}
        {variants.length > 0 ? <form action="/api/merch/checkout" method="post" className="merch-purchase">
          <input type="hidden" name="product" value={product.slug} /><input type="hidden" name="requestKey" value={randomUUID()} />
          <label htmlFor="merch-size">Size and price</label><select id="merch-size" name="variant" required defaultValue=""><option value="" disabled>Choose your size</option>{variants.map((v) => <option key={v.id} value={v.id}>{v.size} — {money(v.priceCents)}</option>)}</select>
          <label htmlFor="merch-quantity">Quantity</label><select id="merch-quantity" name="quantity" defaultValue="1">{[1, 2, 3, 4, 5].map((quantity) => <option key={quantity} value={quantity}>{quantity}</option>)}</select>
          <button type="submit" className="button button-primary">Continue to checkout <span aria-hidden="true">↗</span></button>
          <p>Secure payment through Stripe. US delivery only.<br />Shipping and the final total are shown before payment.</p>
        </form> : <p className="merch-message">This piece is unavailable to order right now. <Link href="/contact" className="inline-link">Contact us</Link> for help.</p>}
        <div className="merch-product-details"><h2>The details</h2><ul>{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul><p>Made to order after review by Fee The Producer. Your order is then submitted to Printful for production and shipping.</p></div>
      </div>
    </div>
  </div>;
}
