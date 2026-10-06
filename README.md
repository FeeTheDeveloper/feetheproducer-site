# Fee The Producer site

Next.js 15 artist site for Fee The Producer. The public experience features selected releases, official platform links, production services, and an email draft contact flow.

[Portfolio evidence and truth boundary](docs/PORTFOLIO_CASE_STUDY.md)

## Local checks

```bash
npm ci
npm run typecheck
npm run lint
npm run build
```

## Catalog

Edit `lib/data/releases.ts` for selected release pages. Confirm public metadata and links with the relevant platform before publishing. The canonical Apple Music artist page is `https://music.apple.com/us/artist/fee-the-producer/1896424385`.

Keep full audio, private project files, contracts, and credentials out of `public/` and this public repository. A future paid download flow needs confirmed distribution rights, private storage, a provider-backed delivery check, and a separate reviewed release.

## Contact

The contact form opens a draft in the visitor's email app. The visitor must send it. There is no server-side inbox or newsletter provider configured; the site must not claim that a message or signup was captured.

## Deployment

The production project is `feethedeveloper/feetheproducer-site` on Vercel, with `npm ci` and `npm run build`. Cloudflare DNS for the apex and `www` hosts is connected to that project. Verify the Vercel deployment, both domains, and key routes after each release. This repository is not yet connected for automatic Git deployments; a push alone does not update production.
