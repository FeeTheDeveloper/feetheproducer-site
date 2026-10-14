import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { merch } from "@/lib/data/merch";
import { shopVariants } from "@/lib/integrations/printful";
import { money } from "@/lib/merch-policy";
import { ArrowIcon } from "@/components/ui/Icons";
import "./merch.css";

export const metadata: Metadata = { title: "Merch | Fee The Producer", description: "The Core Collection: Fee The Producer tees, layers, joggers, snapbacks and letterman jackets. Made to order. US shipping." };
export const dynamic = "force-dynamic";

export default async function MerchPage() {
  const products = await Promise.all(merch.map(async (product) => ({ product, variants: await shopVariants(product) })));
  return <>
    <section className="merch-hero container-page">
      <div className="merch-hero-copy">
        <p className="eyebrow">FEE THE PRODUCER / THE CORE COLLECTION</p>
        <h1>Wear the <br /><em>signature.</em></h1>
        <p>From the studio to the street. Six essentials in black, ivory and gold, with every detail rooted in the sound.</p>
        <a href="#collection" className="button button-primary">Explore the collection <ArrowIcon /></a>
        <span className="merch-small-note">Made to order · US shipping</span>
      </div>
      <div className="merch-hero-stage" aria-label="Core Hoodie and Signature Snapback product mockups">
        <span className="merch-stage-number" aria-hidden="true">01</span>
        <Image src="/images/merch/core-hoodie.png" alt="Black Core Hoodie with ivory and gold Fee The Producer chest artwork" width={1000} height={1000} priority className="merch-stage-hoodie" sizes="(max-width: 760px) 90vw, 50vw" />
        <Image src="/images/merch/signature-snapback.png" alt="Black and red Signature Snapback with embroidered wordmark" width={1000} height={1000} className="merch-stage-cap" sizes="(max-width: 760px) 40vw, 20vw" />
        <p className="merch-stage-caption">SOUND. SOUL. SIGNATURE. <span>COLLECTION / 01</span></p>
      </div>
    </section>
    <section className="merch-collection container-page" id="collection">
      <div className="section-header"><div><p className="eyebrow">THE FIRST DROP</p><h2>Studio staples.<br /><em>Everyday presence.</em></h2></div><p className="merch-section-note">Choose your piece and size.<br />All prices in USD.</p></div>
      <div className="merch-grid">
        {products.map(({ product, variants }) => <article className="merch-card" key={product.slug}>
          <Link href={`/merch/${product.slug}`} className="merch-card-image" aria-label={`View ${product.name}`}><Image src={product.image} alt={`${product.name} in ${product.color}, Printful product mockup`} width={1000} height={1000} sizes="(max-width: 600px) 90vw, (max-width: 960px) 45vw, 30vw" /></Link>
          <p className="eyebrow">{product.category}</p>
          <div className="merch-card-heading"><h3><Link href={`/merch/${product.slug}`}>{product.name}</Link></h3><span>{variants.length ? `From ${money(Math.min(...variants.map((v) => v.priceCents)))}` : "Pricing unavailable"}</span></div>
          <p className="merch-card-color">{product.color} / {product.decoration}</p>
          <Link href={`/merch/${product.slug}`} className="text-link">Choose your piece <ArrowIcon /></Link>
        </article>)}
      </div>
    </section>
    <section className="merch-notes container-page" aria-label="Shopping details">
      <div><p className="eyebrow">01 / MADE FOR YOU</p><h3>A considered first drop.</h3><p>Each piece is made to order through Printful after Fee The Producer reviews your order. Images are product mockups; print and fabric colors can vary slightly.</p></div>
      <div><p className="eyebrow">02 / DELIVERY</p><h3>United States shipping.</h3><p>Choose a size to see its price. Shipping is added at checkout, where you can review the total before paying.</p></div>
      <div><p className="eyebrow">03 / GET IN TOUCH</p><h3>Questions about a piece?</h3><p>For fit, production or order questions, <Link href="/contact" className="inline-link">contact Fee The Producer</Link>. Include the piece name and your order reference if you have one.</p></div>
    </section>
  </>;
}
