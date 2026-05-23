import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        presentationApprenti: resolve(
          __dirname,
          "presentation/presentation-apprenti.html"
        ),
        presentationEntreprise: resolve(
          __dirname,
          "presentation/presentation-entreprise.html"
        ),
        tableauDeSynthese: resolve(
          __dirname,
          "epreuve E5/tableau-de-synthese.html"
        ),
        missionsFormation: resolve(
          __dirname,
          "epreuve E5/missions-realisees-en-formation.html"
        ),
        missionsEntreprise: resolve(
          __dirname,
          "epreuve E5/missions-realisees-en-entreprise.html"
        ),
        certifications: resolve(__dirname, "epreuve E5/certifications.html"),
        situations: resolve(__dirname, "epreuve E6/situations.html"),
        productions: resolve(__dirname, "epreuve E6/productions.html"),
        veille: resolve(__dirname, "veille/veille.html"),
      },
    },
  },
});
