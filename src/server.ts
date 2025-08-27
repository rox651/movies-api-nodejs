import express from "express";
import dotenv from "dotenv";
import mediaRoutes from "./interfaces/routes/mediaRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", mediaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`),
);
