import { defineField, defineType } from "sanity";

export const speakerRegistration = defineType({
    name: "speakerRegistration",
    title: "Speaker registration",
    type: "document",
    fields: [
        defineField({ name: "eventSlug", title: "Speaker page slug", type: "string", description: "Use the slug from /get-involved/guests/, for example warrick.", validation: rule => rule.required() }),
        defineField({ name: "eventUrl", title: "Wild Apricot event URL", type: "url", description: "For example https://wachh.org/event-6685680. The website creates the widget URL automatically.", validation: rule => rule.required().custom(value => !value || /^https:\/\/(wachh\.org|wachh\.wildapricot\.org)\/event-\d+\/?$/.test(value) || "Enter a WACHH Wild Apricot event URL.") }),
    ],
    preview: { select: { title: "eventSlug", subtitle: "eventUrl" } },
});
