import HomeCarousel from "@/components/home-carousel";
import speakerPodium from "./ui/images/gallery-speaker-podium.jpg";
import audienceQuestion from "./ui/images/gallery-audience-question.jpg";
import volunteersGreeting from "./ui/images/gallery-volunteers-greeting.jpg";
import speakerRemarks from "./ui/images/gallery-speaker-remarks.jpg";

/** Photos only; descriptions remain available to assistive technology. */
export default function ImageGallery() {
    return (
        <HomeCarousel
            id="program-photos"
            label="Council program photos"
            slides={[
                { image: speakerPodium, alt: "A guest speaker gesturing while presenting from the Council podium", label: "At the podium" },
                { image: audienceQuestion, alt: "A Council member asking the speaker a question from the audience", label: "Community conversation" },
                { image: volunteersGreeting, alt: "Council volunteers greeting guests and handing out programs at the entrance", label: "Welcoming guests" },
                { image: speakerRemarks, alt: "A Council member delivering remarks at the podium", label: "Speaker program" },
            ]}
        />
    );
}
