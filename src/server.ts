import express, { Router } from "express";
import dotenv from "dotenv";
import mediaRoutes from "./presentation/http/mediaRoutes";
import directorRoutes from "./presentation/http/directorRoutes";
import filmProductionRoutes from "./presentation/http/filmProductionRoutes";
import genreRoutes from "./presentation/http/genreRoutes";
import typeRoutes from "./presentation/http/typeRoutes";

dotenv.config();

const app = express();
const apiRouter = Router();

app.use(express.json());

// Mount all routes under /api
apiRouter.use("/media", mediaRoutes);
apiRouter.use("/directors", directorRoutes);
apiRouter.use("/film-productions", filmProductionRoutes);
apiRouter.use("/genres", genreRoutes);
apiRouter.use("/types", typeRoutes);

// Use the API router under /api prefix
app.use("/api", apiRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`),
);
