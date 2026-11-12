import HomeCarousel, { type HomeSlide } from "@/components/home-carousel";
import speaker from "./ui/images/speaker1.jpg";
import audience from "./ui/images/bk_wac_mem.jpg";
import speaker2 from "./ui/images/speaker2.jpg";
import workshop from "./ui/images/workshop.jpg";

/** Photos only; descriptions remain available to assistive technology. */
export default function ImageGallery({ slides }: { slides?: HomeSlide[] }) {
    return (
        <HomeCarousel
            id="program-photos"
            label="Council program photos"
            slides={slides ?? [
                { image: speaker, alt: "A guest speaker at the Council podium", label: "At the podium" },
                { image: audience, alt: "Council audience members taking part in a question-and-answer session", label: "Community conversation" },
                { image: speaker2, alt: "A speaker presenting to the Council", label: "Speaker program" },
                { image: workshop, alt: "Students working in teams at Academic WorldQuest", label: "Academic WorldQuest" },
            ]}
        />
    );
}
