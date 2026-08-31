# Marvel Characters

Browse and search Marvel's character catalogue. Built with Nuxt 3 and Tailwind CSS, using the public Marvel Comics API.

**[Live demo →](https://marvel-characters-omega.vercel.app//)**

---

## Why I built this

I wanted a small project to work through Nuxt 3 and the Composition API properly — specifically the parts that only show up once you have a real API involved: where data fetching belongs, how authenticated requests should be handled, and what a paginated list needs in order to not feel broken while it loads.

---

## Notes on the build

### Fetching on the server, not on mount

The first version fetched inside `onBeforeMount`, which meant the page rendered empty and then filled in on the client. Moving the call to top-level `await` in `<script setup>` means Nuxt resolves it during server rendering and the markup arrives with data already in it.

The difference shows up in two places: no empty flash on first paint, and the content is present in the initial HTML rather than appearing only after hydration.

### Keeping API credentials off the client

The Marvel API authenticates with a hash built from a timestamp, a public key, and a private key. That hash has to be built somewhere — and if it's built in the browser, the private key ships in the bundle no matter how it's stored.

So request signing happens in a server route, and the client only ever calls our own endpoint. The private key lives in server-only runtime config and never crosses the network boundary.

### Loading and pagination

The list renders skeleton placeholders sized to match the real cards, so the grid doesn't reflow when data arrives.

Pagination is offset-based against the API rather than fetching everything up front — the catalogue is far too large for a single request.

---

## Tech stack

| | |
|---|---|
| Framework | Nuxt 3 (Vue 3, `<script setup>`) |
| Styling | Tailwind CSS |
| Images | `@nuxt/image` |
| Data source | Marvel Comics API |
| Deployment | Vercel |

---

## Structure

```
components/     Cards, Search, Pagination, Skeleton
pages/
  index.vue     list, search, pagination
  [id].vue      character detail
server/api/     request signing and Marvel API proxy
```

---

## Running locally

You'll need a Marvel developer account for the API keys — they're free at
[developer.marvel.com](https://developer.marvel.com/).

```bash
npm install
cp .env.example .env    # then fill in your keys
npm run dev             # http://localhost:3000
```

```bash
npm run build
npm run preview
```

---

## What I'd do differently

- **Errors are swallowed.** Failed requests log to the console and the UI shows nothing. It should render a real error state with a retry.
- **Search fires on submit only.** Debounced search-as-you-type would be a better fit, and the API supports prefix matching.
- **No tests.** The pagination offset maths and the auth params builder are both small, pure, and exactly the kind of thing worth covering.
- **No caching.** Paging back to a page you've already visited refetches it.

---

## License

MIT
