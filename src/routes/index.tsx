import { createFileRoute } from "@tanstack/react-router";
import { TrioExperience } from "@/components/trio/TrioExperience";

const description =
  "Enter the world of TRIO — a dystopian faith-driven film inspired by Daniel 3 and Revelation 13. When the world chooses to bow, three men choose to stand.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TRIO — Official Film Website | Bible Way Galaxy" },
      { name: "description", content: description },
      { property: "og:title", content: "TRIO — Official Film Website" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "TRIO — Official Film Website" },
      { name: "twitter:description", content: description },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://id-preview--bee6cd8c-258d-40f9-8616-d0b5ceb1a262.lovable.app/",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Movie",
          name: "TRIO",
          description,
          productionCompany: { "@type": "Organization", name: "Bible Way Galaxy" },
          dateCreated: "2026",
          genre: ["Dystopian", "Thriller", "Christian"],
        }),
      },
    ],
  }),
  component: TrioExperience,
});
