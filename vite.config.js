import path from "node:path";
import url from "node:url";
import { defineConfig } from "vite";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default defineConfig({
	build: {
		target: "esnext",
		rollupOptions: {
			input: {
				main: path.resolve(dirname, "index.html"),
				addRecipe: path.resolve(dirname, "addRecipe.html"),
				cakeflavor: path.resolve(dirname, "cakeflavor.html"),
				chocolatedessert: path.resolve(dirname, "chocolatedessert.html"),
				contact: path.resolve(dirname, "contact.html"),	
				drinkdes: path.resolve(dirname, "drinkdessert.html"),
				moodboard: path.resolve(dirname, "moodboard.html"),
				quizzes: path.resolve(dirname, "quizzeshomepage.html"),
				recipe: path.resolve(dirname, "recipeCards.html"),
				thanks: path.resolve(dirname, "thankyou.html"),
			},
		},
	},
});
