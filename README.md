# Movies API

A RESTful API for managing movies, directors, genres, and film productions built with Node.js, Express, TypeScript, and PostgreSQL using Drizzle ORM.

## Features

-  Clean Architecture pattern
-  Type-safe database operations with Drizzle ORM
-  Input validation with Valibot
-  Full TypeScript support
-  RESTful API endpoints
-  PostgreSQL database

## Prerequisites

-  Node.js 18+ or Bun runtime
-  PostgreSQL 12+
-  pnpm, npm, or bun package manager

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables:

```bash
# Create a .env file
cp .env.example .env

# Edit the .env file with your database credentials
DATABASE_URL=postgres://username:password@localhost:5432/movies_api
```

4. Create the database:

```bash
createdb movies_api
```

5. Run migrations:

```bash
bun run drizzle-kit push:pg
```

6. Start the development server:

```bash
bun run dev
```

The API will be available at `http://localhost:3000`.

## API Endpoints

### Media

-  `GET /api/media` - List all media
-  `GET /api/media/:id` - Get media by ID
-  `POST /api/media` - Create new media
-  `PUT /api/media/:id` - Update media

### Directors

-  `POST /api/directors` - Create new director
-  `PUT /api/directors/:id` - Update director

### Film Productions

-  `POST /api/film-productions` - Create new film production
-  `PUT /api/film-productions/:id` - Update film production

### Genres

-  `POST /api/genres` - Create new genre
-  `PUT /api/genres/:id` - Update genre

### Types

-  `POST /api/types` - Create new type
-  `PUT /api/types/:id` - Update type

## Example Requests

### Create Media

```bash
curl -X POST \\
  -H "Content-Type: application/json" \\
  -d '{
  "title": "Inception",
  "synopsis": "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  "url": "inception-2010",
  "image": "https://example.com/inception.jpg",
  "releaseDate": "2010-07-16",
  "directorId": 1,
  "typeId": 1,
  "genreIds": [1,2],
  "filmProductionIds": [1],
  "state": "active"
}' \\
  http://localhost:3000/api/media
```

### Update Media

```bash
curl -X PUT \\
  -H "Content-Type: application/json" \\
  -d '{
  "title": "Inception (2010)",
  "synopsis": "Updated synopsis",
  "genreIds": [1,3]
}' \\
  http://localhost:3000/api/media/1
```

## Project Structure

```
src/
├── app/                # Application composition root
├── application/        # Application services
│   └── services/
├── domain/            # Business logic and interfaces
│   ├── entities/
│   ├── ports/
│   └── validation/
├── infrastructure/    # External implementations
│   ├── db/
│   └── repositories/
└── presentation/     # API endpoints and DTOs
    ├── dto/
    └── http/
```

## Available Scripts

-  `bun run dev` - Start development server
-  `bun run build` - Build for production
-  `bun run start` - Start production server
-  `bun run lint` - Run linter
-  `bun run format` - Format code
-  `bun run test` - Run tests
-  `bun run test:watch` - Run tests in watch mode
-  `bun run test:coverage` - Run tests with coverage

## Database Migrations

The project uses Drizzle ORM for database operations and migrations.

-  Create a new migration:§

```bash
bun run drizzle-kit generate:pg
```

-  Push migrations to database:

```bash
bun run drizzle-kit push:pg
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
