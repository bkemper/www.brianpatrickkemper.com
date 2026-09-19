import { createFileRoute } from "@tanstack/react-router";
import NotFound from "../components/NotFound";

const canonicalOrigin = "https://www.brianpatrickkemper.com";

export const Route = createFileRoute("/not-found")({
  head: () => ({
    meta: [
      { title: "Where you going? · Brian Patrick Kemper" },
      {
        name: "description",
        content: "This page does not exist. Return home when ready.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: `${canonicalOrigin}/not-found` }],
  }),
  component: NotFound,
});
