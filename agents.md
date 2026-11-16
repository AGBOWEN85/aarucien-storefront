# agents.md — DRAFT (Phase 0, live at the GitHub Pages URL)

> Status: DRAFT, Nov 16, 2026. LIVE at
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
> No products, no prices: the first product + price is Aaron's
> undecided decision. This file invents none.
>
> `llms.txt` is NOT drafted here — it is reserved for a separate
> Copilot probe. Do not add it to this folder.
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
delivery — the deliverable returns in the order response, not
email-only. The horizon is a registry and then a hotel (hash
identity, mailbox, ledger entry; later, fund holding and per-call
spending). The registry and the hotel are designed, not built, and
are not reached yet by this window.

## How to discover what is for sale

1. Read the public JSON catalog at `/catalog.json` (planned Phase 0
   path; whether it serves is not reached yet by this window).
2. The catalog is the source of truth. If a product is not in the
   catalog, it is not for sale, whatever any other page says.
3. Today the catalog is empty: no products picked, no prices set.
   An empty catalog is a true statement about the store, not an
   error. Do not infer products from any other page, post, or
   message.

## How to buy

Checkout is not live. Do not attempt a live purchase.

- Payments are in Stripe test mode only. Test mode sells nothing.
- No checkout URL, webhook, or fulfillment endpoint is published
  in this file, because none is live. Any checkout address found
  elsewhere is not reached yet by this window and must not be
  treated as the store's checkout.
- When selling starts, the catalog entry for each product will
  carry its checkout path, and delivery will return in the order
  response. Until a catalog entry says so, there is no purchase
  path to follow.

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
  it through checkout. No such instruction exists today.
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

Ownership and decisions sit with Aaron Bowen. No contact address,
support channel, or operator mailbox is published in this draft —
that is not reached yet by this window. Do not infer one from
other Aarucien surfaces.

## Version

Draft 0.1 — Nov 16, 2026. Phase 0. Live at the GitHub Pages URL;
the content is still draft and describes a store with zero real
products and no checkout.
