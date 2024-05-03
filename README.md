# Pokedex with Next.js

This is a Pokedex and Trainer Management System built using Next.js. It allows users to browse through a collection of Pokemon and Trainers, manage their own trainer profile, catch Pokemon, and perform administrative tasks related to Pokemon management.

## Features

### Random Customers

#### Pokemon Features

- **Pokemon Listing:** Browse through a list of Pokemon with their basic information.
- **Pokemon Details:** View detailed information about each Pokemon, including their types, description, and regions.
- **Pokemon Search Functionality:** Search for specific Pokemon by partial name and types.
- **Pokemon Pagination:** Navigate through multiple pages of Pokemon.

#### Trainer Features

- **Trainer Listing:** Browse through a list of Trainers with their basic information.
- **Trainer Details:** View detailed information about each Trainer, including their Pokemon.
- **Trainer Search Functionality:** Search for specific Trainer by the username of the person who created them.
- **Trainer Pagination:** Navigate through multiple pages of Trainers.

### Entry

- **Login:** Authenticate users to access their trainer profiles.
- **Register:** Allow new users to create accounts to become trainers.

### Auth

- **Trainer Creation:** Create your own Trainer profile with a name, image, etc.
- **Trainer Update:** Update your trainer profile information.
- **Trainer Catch Pokemons:** Capture and add Pokemon to your trainer profile.

### Admin

- **Create Pokemons:** Add new Pokemon entries to the system.
- **Update Pokemons:** Modify existing Pokemon information.
- **Add Regions to Pokemons:** Assign regions to specific Pokemon.
- **Delete Regions from Pokemons:** Remove regions to specific Pokemon.
- **Pokemon Deletion:** Delete Pokemon entries from the system.

## Installation

To run this project locally, you'll need to set up both the frontend and backend environments.

### Backend (Java API)

1. Ensure you have Java installed on your machine. You can download it from [Java's official website](https://www.java.com/en/download/).

2. Clone the backend API repository (if not done already):

```bash
git clone https://github.com/dCben335/pokedex.git
cd ./pokedex
git checkout feature/jwt
```

3. Build the backend API project:

```bash
mvn clean package
```

4. Start your local database (mongoDB)

5. Start the backend API and connect to your local database.

```bash
java -jar
```

6. Ensure the backend API server is running on the correct port and accessible from the frontend (adjust the server.port in application.properties if needed).

### Front

1. Clone the repository:

```bash
git clone https://github.com/dCben335/pokedex_front.git
cd ./pokedex_front
```

2. Install dependencies

```bash
npm install
```

3. Set .env file

```bash
#.env, set BASE_API_URL
#for exemple
BASE_API_URL="http://localhost:8080/api"
```

4. Start the project and go to localhost:3000

```bash
#dev
npm run dev
#or
#build
npm run build
npm run start
```

## Fill the Database

I created API routes to help frontend tester :

1. **POST /pkmn/api** to fill a little bit the pokemon collection. However field are missing such as regions and description.  
2. **PUT /users.admin WITH Body** after crating a user, to put someone as admin so that you can test the admin role functionnalities.

```json
{
  "id": "TEST",
  "isAdmin": true
}
```
