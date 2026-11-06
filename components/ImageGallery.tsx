import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import speaker_image from "./ui/images/speaker1.jpg";
import great_decisions_image from "./ui/images/great_decisions.png";
import speaker_image2 from "./ui/images/speaker2.jpg";
import workshop_image from "./ui/images/workshop.jpg";
import bookclub_image from "./ui/images/bk_wac_mem.jpg";


const aboutImages = [
    { src: speaker_image, alt: "Speaker at Podium" },
    { src: great_decisions_image, alt: "Great Decisions Program" },
    { src: speaker_image2, alt: "Speaker" },
    { src: workshop_image, alt: "Youth workshop" },
    { src: bookclub_image, alt: "Book Club" },
];
export default function ImageGallery() {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => { // on component mount, this will start an interval to change the active image every 5 seconds
        if (aboutImages.length < 2) return;

        const intervalId = window.setInterval(() => {
            setActiveImageIndex((currentIndex) =>
                (currentIndex + 1) % aboutImages.length,
            );
        }, 5000);

        return () => window.clearInterval(intervalId);
    }, []);
    return (
        <div
            aria-label="Program photos"
            className="relative aspect-video w-full flex-none overflow-hidden bg-slate-200 md:flex-1 self-center"
            role="region"
        >
            {aboutImages.length > 0 && (
                <>
                    <Image
                        alt={aboutImages[activeImageIndex].alt}
                        className="object-contain"
                        fill
                        sizes="(min-width: 768px) 60vw, 100vw"
                        src={aboutImages[activeImageIndex].src}
                        unoptimized
                    />
                    {aboutImages.length > 1 && (
                        <>
                            <button
                                aria-label="Previous image"
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 p-2 text-white"
                                onClick={() =>
                                    setActiveImageIndex(
                                        (currentIndex) =>
                                            (currentIndex - 1 + aboutImages.length) %
                                            aboutImages.length,
                                    )
                                }
                                type="button"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <button
                                aria-label="Next image"
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 p-2 text-white"
                                onClick={() =>
                                    setActiveImageIndex(
                                        (currentIndex) =>
                                            (currentIndex + 1) % aboutImages.length,
                                    )
                                }
                                type="button"
                            >
                                <ArrowRight size={20} />
                            </button>
                        </>
                    )}
                </>
            )}
        </div>

    );
}
