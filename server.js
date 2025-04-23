// This file handles all of the server-side logic for the application.

import fs from "node:fs/promises";

// Server (https://expressjs.com/)
import express from "express";

// Parsing forms sent from the client
import formidable from "formidable";

// Seamless integration for Express with Vite during development
import ViteExpress from "vite-express";

// Interacting with our database
import { neon } from "@neondatabase/serverless";

// Uploading and storing images
import { put } from "@vercel/blob";

// Cross origin resource sharing, middleware that controls who can talk to the server
import cors from "cors";

const app = express();

// Allows for requests from other origins (like frontend app) to access API
app.use(cors());

const router = express.Router();

// Connect to the database
const sql = neon(process.env.DATABASE_URL);

// Prefix all routes with "/api"
app.use("/api", router);

/**
 * Corresponds to: GET /api/desserts
 * Returns a list of all desserts in the database to be displayed on the homepage
 */
router.get("/desserts", async (req, res) => {
	const desserts = await sql`SELECT * FROM desserts`;

	// Send the desserts back to the client as JSON
	res.json(desserts);
});

// returns dessert table info
app.get("/api/recipes", async (req, res) => {
	try {
	  const result = await sql`
		SELECT id, name AS title, image_url, ingredients, instructions
		FROM desserts
		ORDER BY id DESC;
	  `;
	  res.json(result);
	} catch (err) {
	  console.error("Error fetching recipes:", err.message);
	  res.status(500).json({ error: "Failed to fetch recipes" });
	}
  });


/**
 * Corresponds to: POST /api/desserts
 * Creates a new dessert in the database and redirects to the homepage
 */
router.post("/desserts", async (req, res) => {
	const form = formidable();
	const [fields, files] = await form.parse(req);

	const image = files.image[0];

	// Convert textarea inputs into an array by splitting on newlines and trimming
	// any trailing/leading whitespace
	const ingredients = fields.ingredients[0].split("\n").map((i) => i.trim());
	const instructions = fields.instructions[0].split("\n").map((i) => i.trim());

	// Read the uploaded file into a buffer
	const buffer = await fs.readFile(image.filepath);

	// Upload the image to our blob storage and get the URL to be stored in the
	// database
	const blob = await put(image.originalFilename, buffer, {
		access: "public",
	});

	// Insert the dessert into the database
	await sql`
		INSERT INTO desserts (name, description, image_url, ingredients, instructions)
		VALUES (${fields.name[0]}, ${fields.description[0]}, ${blob.url}, ${ingredients}, ${instructions})
	`;

	// Redirect to the homepage
	res.redirect(303, "/");
});

// Starts the server and listens on port 5173
// http://localhost:5173
ViteExpress.listen(app, 5173, () => {
	console.log("Server is listening on port 5173.");
});

// We're exporting so Vercel can reuse it
export default app;
