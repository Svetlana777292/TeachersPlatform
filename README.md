<div align="center">

# TeachersPlatform

**A tutoring platform where teachers run their schedule and students book, track and pay for lessons.**

One app, two dashboards — the whole interface adapts to whether you sign in as a teacher or a student.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-RTK_Query-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel&logoColor=white)](https://vercel.com)

[**Live demo**](https://sweb-frontend.vercel.app) · [Backend repo](https://github.com/artaka/SwebApi)

</div>

---

## Screenshots

<!-- Drop your images into docs/ and they will render here -->

| Profile dashboard | Schedule |
| :---: | :---: |
| ![Profile](docs/profile.png) | ![Schedule](docs/schedule.png) |

| People | Finance |
| :---: | :---: |
| ![People](docs/people.png) | ![Finance](docs/finance.png) |

## What it does

The platform recognises two roles and builds a different navigation, dashboard and money flow for each.

### For teachers

- **Schedule** — a week view with day cards; create, edit and delete lessons in a two-step dialog.
- **My students** — search the student directory, attach a student to your roster, remove them again.
- **Earnings** — track your balance, review the transaction history and withdraw money to a saved card.

### For students

- **My lessons** — upcoming and past lessons, split and sorted automatically.
- **My teachers** — everyone you are currently studying with.
- **Payments** — top up your balance from a card and pay for individual lessons.

### For everyone

- **Profile dashboard** with a live weekly summary: today's lesson count and total hours, lessons this week, and your next upcoming lesson.
- **Avatar upload** and editable profile details.
- **Saved payment cards** — add, delete, pick a default; Visa and Mastercard are rendered with their own inline SVG marks.
- **Toast notifications** on every mutation, so no action fails silently.

## Tech stack

| Layer | Choice |
| --- | --- |
| UI | React 19 |
| Build tool | Vite 8 + `@vitejs/plugin-react` |
| State & data fetching | Redux Toolkit + RTK Query |
| Routing | React Router 7 |
| Notifications | react-toastify |
| Form widgets | react-datepicker, react-select, react-modal |
| Linting | ESLint 9 (flat config) |
| Hosting | Vercel |
| Backend | FastAPI on Render ([separate repo](https://github.com/artaka/SwebApi)) |

## Architecture highlights

### One relative API path, two environments

Every request targets the relative path `/api` — never an absolute host. What sits behind it changes per environment:

```
 development                          production
 ───────────                          ──────────
 browser                              browser
    │ /api/lessons                       │ /api/lessons
    ▼                                    ▼
 Vite dev server                      Vercel edge
    │ server.proxy                       │ vercel.json rewrite
    ▼                                    ▼
 FastAPI on Render                    FastAPI on Render
```

Because the browser only ever talks to its own origin, requests stay same-origin in both cases. That buys two things for free: **no CORS configuration** on the backend, and **first-party auth cookies** that need no `SameSite=None; Secure` dance.

The catch worth knowing: `server.proxy` lives in `vite.config.js` and applies to the dev server *only* — it is not part of the production bundle. The Vercel rewrite is what replaces it, not an afterthought.

### Silent token refresh

Auth runs on httpOnly cookies, with `fetchBaseQuery` configured as `credentials: 'include'`.

[`baseQueryWithReauth`](src/store/api/baseQueryWithReauth.js) wraps every query: on a `401` it calls `POST /api/token/get`, then transparently replays the original request. If the refresh itself fails the `401` is passed through untouched — `useVerifyUserQuery` resolves unsuccessfully and [`ProtectedRoute`](src/ProtectedRoute.jsx) redirects to the login page. Components never handle token state themselves.

### API surface

Six RTK Query slices, each registered in [`store.js`](src/store/store.js) with its own reducer and middleware, cache-invalidated through tags.

| Slice | Responsibility |
| --- | --- |
| [`userApi`](src/store/api/userApi.js) | register, login, logout, token verification, profile |
| [`studentsApi`](src/store/api/studentsApi.js) | student roster, search, add, remove |
| [`teachersApi`](src/store/api/teachersApi.js) | a student's teachers |
| [`lessonsApi`](src/store/api/lessonsApi.ts) | lesson CRUD |
| [`financeApi`](src/store/api/financeApi.ts) | balance, cards, transactions, charges, withdrawals |
| [`storageApi`](src/store/api/storageApi.js) | avatar upload and retrieval |

Derived data lives in dedicated hooks rather than components — [`useSummary`](src/hooks/useSummary.js) composes `useMyLessons`, `useMyStudents` and `useMyTeachers`, then memoises the weekly statistics the profile dashboard renders.

## Routes

Everything except `/login` and `/register` is wrapped in `ProtectedRoute`.

| Route | Page | Role |
| --- | --- | --- |
| `/login` | Sign in | public |
| `/register` | Two-step sign up | public |
| `/` | Profile when the token is valid, otherwise sign in | public |
| `/Profile` | Profile and weekly summary | both |
| `/schedule` | Schedule, lesson creation | teacher |
| `/people` | Student roster | teacher |
| `/lessons` | Upcoming and past lessons | student |
| `/finance` | Balance, cards, transactions | both |

## Getting started

**Requirements:** Node.js `^20.19.0` or `>=22.12.0` (Vite 8).

```bash
git clone https://github.com/Svetlana777292/TeachersPlatform.git
```

```bash
npm install
```

Create a `.env.local` in the project root pointing at the API you want the dev server to proxy to:

```
VITE_API_TARGET=https://swebapi-uli5.onrender.com
```

This variable is read by `vite.config.js` only and never reaches the bundle. Omit it and it falls back to `http://127.0.0.1:8000` for a locally running backend.

```bash
npm run dev
```

The app comes up on `http://localhost:3000`.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server with HMR on port 3000 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | Run ESLint across the project |

## Project structure

```
public/              static assets served verbatim at absolute paths
src/
  assets/            icons as React components (.jsx)
  components/        reusable components, one folder each (.jsx + .css)
  hooks/             useMyLessons, useMyStudents, useMyTeachers, useSummary, useIsDesktop
  pages/             one folder per route
  store/
    api/             RTK Query slices + baseQueryWithReauth
    store.js         store configuration
  utils/             validation, error handling, date and money formatting
  App.jsx            routes and ToastContainer
  ProtectedRoute.jsx
  main.jsx           entry point: Provider + BrowserRouter
```

## Deployment

Hosted on Vercel. `master` is the production branch; every other branch gets a preview deployment on push.

Build settings live in [`vercel.json`](vercel.json) and **take precedence over the Vercel dashboard**. `outputDirectory` is pinned to `dist` there — without it the build fails with `No Output Directory named "build" found`, because a stray `react-scripts` entry in `dependencies` makes Vercel's framework detection guess Create React App.

> **Working with images**
>
> Anything referenced by absolute path must live in `public/`:
>
> ```jsx
> <img src="/gear.svg" />         // ✅ public/gear.svg is copied into dist/
> <img src="/src/assets/x.svg" /> // ❌ dev only — 404 in production
> ```
>
> The `/src/...` path is served by the Vite dev server alone. At build time, files under `src/` are only emitted when something `import`s them — a string inside a `src` attribute is just text to the bundler. Such a reference works locally and breaks in production without a single warning. Icons that need to be components live in `src/assets/` as `.jsx` and are imported normally.

## Roadmap

- [ ] Code-split by route with `React.lazy` — the bundle currently ships as a single ~650 kB chunk
- [ ] Wire up the "Delete profile" action (the button is rendered but has no handler yet)
- [ ] Drop the unused `react-scripts` and `add` dependencies
- [ ] Normalise route casing — `/Profile` is capitalised while every other route is lowercase
- [ ] Add an explicit SPA fallback rewrite to `vercel.json`
- [ ] Migrate to TypeScript
