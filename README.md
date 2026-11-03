# Pokédex Front

A Pokédex and Trainer Management System built with Next.js (App Router) and TypeScript. Users can browse Pokémon and trainers, create and manage their own trainer profile, mark Pokémon as seen/caught, and (as an admin) manage the Pokémon catalog.

The app consumes a Spring Boot + MongoDB REST API. This repository expects the **JWT-enabled backend** (branch `feature/jwt` of the API repo).

## Features

### Public

- **Home:** shortcuts to the Pokémon and trainer sections.
- **Pokémon list:** search by partial name, filter by one or two types, pagination.
- **Pokémon details:** image, types, description, regions, and text-to-speech description.
- **Trainers list:** search by trainer/username and pagination.
- **Trainer details:** profile, creation date, seen/caught Pokémon.
- **Dark/light theme** and responsive navigation.

### Authenticated

- **Register / login** with JWT stored in cookies.
- **Create your trainer** if you do not have one yet.
- **Edit / delete your trainer** profile.
- **Mark Pokémon as seen or caught** from a Pokémon detail page.
- **Logout**.

### Admin

- **Pokémon list management** at `/admin`.
- **Create / edit / delete Pokémon.**
- **Add / remove regions** on a Pokémon.
- Admin routes are protected by middleware and require `isAdmin`.

## Tech stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- TanStack React Query
- React Hook Form + Zod
- SCSS modules
- sonner (toasts)
- speak-tts (voice descriptions)

## Requirements

- Node.js 18.17+ (or 20+)
- npm (or pnpm)
- A running API and MongoDB instance

## Getting started

### 1. Start MongoDB

You can reuse the database setup from the API README (`../pokedex_api/README.md`), or start one with Docker:

```bash
docker run -d \
  --name pokedex-mongo \
  -p 27017:27017 \
  -v pokedex-mongo-data:/data/db \
  mongo:7
```

Collections are created automatically on the first write.

### 2. Start the backend API

#### Option A: bundled JAR (quick start)

A prebuilt JWT backend is included at the project root and runs on port **8090**:

```bash
# the jar is configured to reach MongoDB at host "pkdxapimongoben";
# override it to use a local MongoDB
SPRING_DATA_MONGODB_HOST=localhost java -jar pkdxapi.jar
```

The API is then available at `http://localhost:8090/api`.

#### Option B: run the API from source

Clone the API repository, check out the JWT branch, and run it:

```bash
git clone https://github.com/dCben335/pokedex_api.git
cd pokedex
./mvnw spring-boot:run
```

The source version also runs on port **8090** by default (`http://localhost:8090/api`). See `../pokedex_api/README.md` for MongoDB configuration and setup details.

### 3. Configure the frontend environment

Create/update `.env` at the project root with the API base URL (no trailing slash):

```bash
BASE_API_URL=http://localhost:8090/api
```

`BASE_API_URL` is read server-side, so restart the dev server after changing it.

### 4. Install and run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Available scripts

| Command         | Description                               |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Start the development server on port 3000 |
| `npm run build` | Create a production build                 |
| `npm run start` | Start the production server               |
| `npm run lint`  | Run ESLint                                |

## Routes

| Route                       | Access | Description                                                |
| --------------------------- | ------ | ---------------------------------------------------------- |
| `/`                         | Public | Home                                                       |
| `/pokemons`                 | Public | Pokémon list, search, type filters, pagination             |
| `/pokemons/[name]`          | Public | Pokémon details (seen/caught buttons when logged in)       |
| `/trainers`                 | Public | Trainer list, search, pagination                           |
| `/trainers/[username]`      | Public | Trainer details; creates your trainer if the slug is yours |
| `/trainers/[username]/edit` | Owner  | Edit your trainer                                          |
| `/login`                    | Public | Login                                                      |
| `/register`                 | Public | Registration                                               |
| `/policies`                 | Public | Policies page                                              |
| `/admin`                    | Admin  | Pokémon management list                                    |
| `/admin/create`             | Admin  | Create a Pokémon                                           |
| `/admin/[name]`             | Admin  | Pokémon details with edit/delete/regions actions           |
| `/admin/[name]/edit`        | Admin  | Edit a Pokémon                                             |
| `/admin/[name]/regions`     | Admin  | Add/remove Pokémon regions                                 |

URLs use slugified names/usernames (spaces become hyphens); the app unslugifies them before calling the API.

## Authentication

- The API returns `{ user: { login, isAdmin }, token }` on register/login.
- The frontend stores three cookies: `token`, `login`, and `isAdmin`.
- Requests to protected endpoints send `Authorization: Bearer <token>`.
- `src/middleware.ts` redirects unauthenticated users away from `/admin` and prevents logged-in users from visiting `/login` and `/register`.

## API contract

All endpoints are relative to `BASE_API_URL`. Protected endpoints require the `Authorization: Bearer <token>` header. Admin endpoints require the user to be an admin.

### Users

| Method | Path              | Auth   | Body / Query              | Response                              |
| ------ | ----------------- | ------ | ------------------------- | ------------------------------------- |
| POST   | `/users/register` | Public | `{ "login", "password" }` | `{ user: { login, isAdmin }, token }` |
| POST   | `/users/login`    | Public | `{ "login", "password" }` | `{ user: { login, isAdmin }, token }` |
| GET    | `/users/me`       | Bearer | –                         | `{ login, isAdmin }`                  |

> The middleware and cookie helpers call `/users/me`. If you use the bundled JAR, it exposes the current-user endpoint as `/users/logged` instead; make sure the endpoint expected by the frontend exists on the backend you run.

### Pokémon

| Method | Path           | Auth   | Params                                                  | Description                           |
| ------ | -------------- | ------ | ------------------------------------------------------- | ------------------------------------- |
| GET    | `/pkmn/types`  | Public | –                                                       | `{ types: [{ name, color }], count }` |
| GET    | `/pkmn/search` | Public | `partialName`, `typeOne`, `typeTwo`, `page`, `size`     | Paginated Pokémon                     |
| GET    | `/pkmn`        | Public | `name` (or `id`)                                        | One Pokémon                           |
| POST   | `/pkmn/ids`    | Public | JSON array of ids                                       | Pokémon list for the given ids        |
| POST   | `/pkmn`        | Admin  | `{ name, imgUrl, description, types }`                  | Create a Pokémon                      |
| PUT    | `/pkmn?id=`    | Admin  | `name`, `imgUrl`, `description`, `typeOne`, `typeTwo`   | Update a Pokémon                      |
| DELETE | `/pkmn?name=`  | Admin  | –                                                       | Delete a Pokémon                      |
| POST   | `/pkmn/region` | Admin  | `{ name, region: { regionName, regionPokedexNumber } }` | Add a region                          |
| DELETE | `/pkmn/region` | Admin  | `id`, `regionName`                                      | Remove a region                       |

Pokémon object:

```json
{
  "id": "65f1c2a9e4b0a1b2c3d4e5f6",
  "name": "Pikachu",
  "imgUrl": "https://example.com/pikachu.png",
  "description": "Electric mouse Pokémon",
  "types": ["ELECTRIC"],
  "regions": [{ "regionName": "Kanto", "regionPokedexNumber": "025" }]
}
```

### Trainers

| Method | Path              | Auth   | Params / Body                 | Description                       |
| ------ | ----------------- | ------ | ----------------------------- | --------------------------------- |
| GET    | `/trainer/search` | Public | `partialName`, `page`, `size` | Paginated trainers                |
| GET    | `/trainer`        | Public | `username` (or `id`)          | One trainer                       |
| POST   | `/trainer`        | Bearer | `{ trainerName, imgUrl }`     | Create the current user's trainer |
| PUT    | `/trainer`        | Bearer | `imgUrl`, `trainerName`       | Update the current user's trainer |
| DELETE | `/trainer`        | Bearer | –                             | Delete the current user's trainer |
| POST   | `/trainer/mark`   | Bearer | `pkmnId`, `isCaught`          | Mark a Pokémon as seen/caught     |

Trainer object:

```json
{
  "id": "65f1a2b9e4b0a1b2c3d4e5f6",
  "username": "ash",
  "trainerName": "Ash",
  "imgUrl": "https://example.com/ash.png",
  "pkmnSeen": ["<pkmnId>"],
  "pkmnCaught": ["<pkmnId>"],
  "createdDate": "2026-01-01T00:00:00.000+00:00"
}
```

`isCaught=true` also adds the Pokémon to `pkmnSeen`.

## Test data

When using the bundled JAR, two helper endpoints make testing easier:

1. **Import sample Pokémon** (uses an external Pokédex API):

```bash
curl -X POST http://localhost:8090/api/pkmn/api
```

2. **Promote a user to admin** after registering them:

```bash
curl -X PUT http://localhost:8090/api/users/admin \
  -H 'Content-Type: application/json' \
  -d '{"id":"your-login","isAdmin":true}'
```

Log out and log back in so the frontend picks up the new `isAdmin` value.

## Project structure

```
src/
├── actions/                  # Server actions (cookies, navigation)
├── app/
│   ├── (admin)/              # Admin route group
│   ├── (auth)/               # Login / register
│   └── (customer)/           # Public + trainer routes
├── components/
│   ├── customs/              # Feature components (Pokedex, forms, header...)
│   ├── Icons/
│   ├── providers/            # Theme and Pokémon types contexts
│   └── ui/                   # Generic UI components
├── hooks/                    # React Query hooks
├── libs/
│   ├── routes/               # API fetch layer (one file per entity)
│   └── schemas/              # Zod schemas and inferred types
└── utils/
```

## Troubleshooting

- **`Missing BASE_API_URL environment variable`** — add it to `.env` and restart `npm run dev`.
- **401 / 403 errors** — the token may be expired or the user is not an admin; log out and log in again.
- **Connection refused** — the API is not running, or `BASE_API_URL` does not match the API port (8090 by default).
- **Current user endpoint not found** — the frontend calls `GET /users/me`, which exists on the `feature/jwt` source branch. The old bundled JAR only exposes `/users/logged`; rebuild the JAR from that branch or adjust the route.

## Demo deployment

A partial static demo (no API, no authentication, sample JSON data) is deployed on Vercel: https://pokedex-front-ble0lch4j-dcben335s-projects.vercel.app
