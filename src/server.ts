import express from "express";
import dotenv from "dotenv";
import mediaRoutes from "./presentation/http/mediaRoutes";
import directorRoutes from "./presentation/http/directorRoutes";
import filmProductionRoutes from "./presentation/http/filmProductionRoutes";
import genreRoutes from "./presentation/http/genreRoutes";
import typeRoutes from "./presentation/http/typeRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/media", mediaRoutes);
app.use("/api/directors", directorRoutes);
app.use("/api/film-productions", filmProductionRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/types", typeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`),
);
