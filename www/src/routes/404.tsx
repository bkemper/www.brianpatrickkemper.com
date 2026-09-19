import { createFileRoute } from "@tanstack/react-router";
import NotFound from "../components/NotFound";

const canonicalOrigin = "https://www.brianpatrickkemper.com";

export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [
      { title: "Page not found · Brian Patrick Kemper" },
      {
        name: "description",
        content: "That path doesn't exist on this Site.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: `${canonicalOrigin}/404` }],
  }),
  component: NotFound,
});
