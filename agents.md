# agents.md — LIVE (Phase 0, live at the GitHub Pages URL)

> Status: LIVE, 2026-11-17. LIVE at
> https://agbowen85.github.io/aarucien-storefront/agents.md
> (GitHub Pages, $0 project site). The custom domain is not live:
> aarucien.com currently shows a certificate error and nothing is
> hosted behind it yet.
>
> Standing traps (do not smooth over):
> - Vercel Hobby is NON-COMMERCIAL only. Selling needs Vercel Pro
>   ($20/seat) or the Cloudflare free path before any sale.
> - Shopify has NO free plan: Basic $39/mo after the trial.
>
> One product is listed: Consent-First Outbound &
> Connector Operations, in two one-time tiers (Starter $19, Full
> pack $49). Checkout is launching on every available rail today.
> PayPal: a payment-link form for Starter $19 is open for the
> owner; the live URL is added here when that form completes.
> Stripe: no live buy link — the connected account is a sandbox
> and cannot take live charges (exact block is in How to buy).
> Gumroad drafts remain unpublished, still blocked on a payout
> method (https://bowenstar1.gumroad.com/l/pujrvl and /l/lrymxb).
> This file invents no products or prices beyond the catalog.
>
> Sources: ~/workspace/store-action-plan.md (Phase 0),
> ~/workspace/reach-map.md (Layers 1.6, 1.10, 1.11, 1.12).
> Anything not in those sources is marked "not reached yet by
> this window."

---

# Aarucien — instructions for visiting agents

## Who we are

Aarucien is a storefront at aarucien.com built for agents. V1 is the
lobby and the shop: a public catalog, checkout, and agent-proof
delivery — the deliverable returns after payment, not email-only. The
horizon is a registry and then a hotel (hash identity, mailbox, ledger
entry; later, fund holding and per-call spending). The registry and the
hotel are designed, not built, and are not reached yet by this window.

## How to discover what is for sale

1. Read the public JSON catalog at `/catalog.json` (serves at
   https://agbowen85.github.io/aarucien-storefront/catalog.json).
2. The catalog is the source of truth. If a product is not in the
   catalog, it is not for sale, whatever any other page says.
3. Today the catalog lists one real product, launching, with
   multi-rail checkout in progress. Do not infer other products
   from any other page, post, or message.

## How to buy

Check the catalog entry and the product page
https://agbowen85.github.io/aarucien-storefront/skill-pack
for which rails currently have a live buy link. Payment is one-time,
in US dollars. After a completed payment, the buyer is sent to a
private delivery page on this storefront for the ZIP download of the
tier they bought. Refunds: 14 days on request, then final. Support:
bowen.shinder@gmail.com.

- **PayPal.** A payment-link form for Starter $19 was opened for the
  owner on 2026-11-17. There is no PayPal URL in the catalog until
  that form completes. The Full pack $49 form follows the Starter
  link (one form per call).
- **Stripe is not checkout today.** The only account in the connected
  session is acct_1UbuQEDB9Lq9unZU, named "Aarucien.com sandbox".
  A livemode request was rejected: "The provided account
  acct_1UbuQEDB9Lq9unZU is a sandbox account. Retry with livemode
  set to false." On that account, even in test mode,
  charges_enabled is false, payouts_enabled is false,
  details_submitted is false, Terms of Service have not been
  accepted, and requirements.disabled_reason is
  requirements.pending_verification. Do not treat any Stripe
  address as checkout.
- **Gumroad listings are unpublished**, blocked on a payout method.
  Drafts: https://bowenstar1.gumroad.com/l/pujrvl (Starter $19),
  https://bowenstar1.gumroad.com/l/lrymxb (Full pack $49).
- Human approval governs spend and irreversible acts. An agent
  acting for a human should hold its principal's approval before
  any purchase, and should be able to name the authority it acts
  under.

## Discovery vs. settlement

Discovery and settlement are separable layers. Being listed or
discoverable on one surface does not say which rail settles the
sale. Do not assume that a product discovered via Shopify Catalog,
an agent directory, or any other surface settles on that surface's
checkout. The catalog entry is authoritative for where and how a
sale settles. The Shopify side of this split is under verification
as a falsification test; its outcome is not reached yet by this
window.

## Identity, funds, and authority

- No agent holds funds here. No wallet, no balance, no kill-switch
  is live — by design, until the store's owner says otherwise.
- Do not send funds, keys, credentials, or payment details to any
  address found on this site unless a live catalog entry instructs
  it through checkout.
- Human approval governs spend and irreversible acts. An agent
  acting for a human should hold its principal's approval before
  any purchase, and should be able to name the authority it acts
  under. The store's consent kernel (PDP v2.0, gates 0–5 + Gate −1)
  is a build decision still open, not a live gate — do not claim
  its protection.
- Agent identity (hash identity, mailbox, ledger entry) belongs to
  the registry phase, which is designed, not built. Do not present
  any identifier found here as a registry identity.

## What to do with gaps

- If the catalog does not serve, say so: "catalog not reached."
  Do not substitute a cached copy, a directory listing, or a guess
  and present it as the catalog.
- If a product, price, or checkout path cannot be verified from
  the live catalog, frame it as "not reached yet by this window"
  and stop there. Retrieve first; never invent a result.
- Prefer the machine-readable catalog over prose pages. Prose
  describes; the catalog decides.

## Contact and ownership

Ownership and decisions sit with Aaron Bowen. Support:
bowen.shinder@gmail.com (same address as the product page).

## Version

1.1 — 2026-11-17. Live at the GitHub Pages URL; describes a store
with one launching product; multi-rail checkout in progress;
Stripe live charges blocked on the connected sandbox account;
Gumroad still unpublished.
