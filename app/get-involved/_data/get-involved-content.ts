// Default Get Involved copy, used until a field is filled in Sanity.
// Edit published Get Involved content in /studio under Get Involved.
import { giving, guestPolicy, memberBenefits, sponsorship, volunteerContact, volunteerRoles } from "@/lib/site";

/** A photo on the page. width and height are its real size, used for photos shown at their natural shape. */
export type GetInvolvedPhoto = { src: string; alt: string; width?: number; height?: number };
export type CaptionedPhoto = { photo: GetInvolvedPhoto; caption: string };
export type TitledText = { title: string; text: string };
export type Testimonial = { photo: string; name: string; role: string; quote: string };

const memberStory = (photo: string, name: string, role: string, quote: string): Testimonial => ({ photo, name, role, quote });

export const getInvolvedDefaults = {
    title: "Ways to participate",
    intro: "Membership, guest attendance, volunteering, donations, and speaker sponsorships each support the Council's work.",
    heroImage: { src: "/images/get-involved.png", alt: "WACHH members participating in a community discussion" } as GetInvolvedPhoto,
    sectionTitle: "Get involved with WACHH",
    sectionImage: { src: "/programs/student-programs/students-banner.jpg", alt: "Students participating in Council educational programs" } as GetInvolvedPhoto,
    ways: [
        { title: "Become a Member", text: "Attend the Distinguished Speaker Series, receive member communications, and take part in member programs.", link: "/get-involved/membership" },
        { title: "Attend as a Guest", text: "Non-members may register for individual Distinguished Speaker Series programs, subject to seating availability.", link: "/get-involved/guests" },
        { title: "Volunteer", text: "Help with speaker events, discussion groups, membership, fundraising, or student outreach.", link: "/get-involved/volunteer" },
        { title: "Opportunities to Give", text: "Support Council operations, speaker programs, and Academic WorldQuest and Model United Nations activities.", link: "/get-involved/give" },
        { title: "Sponsor a Speaker", text: "Individuals and organizations may support a specific presentation through a seasonal sponsorship.", link: "/get-involved/sponsor" },
    ],
};

export const membershipDefaults = {
    title: "Become a Member",
    intro: "Membership supports the Council and provides access to speaker programs, member resources, and discussion groups.",
    heroImage: { src: "/images/get-involved.png", alt: "WACHH members participating in a community discussion" } as GetInvolvedPhoto,
    infoTitle: "Membership information",
    infoText: "Membership offers education, access, and community: learn from influential figures in world affairs and connect with civic, academic, military, and business leaders across our region. Current members can renew their 2026–2027 membership by logging into their account.",
    reasons: [
        { title: "Speaker programs", text: "Attend 14 Distinguished Speaker Series programs each season, including two international speakers." },
        { title: "Member resources", text: "Access program livestreams, video archives, newsletters, and selected programs from other World Affairs Councils." },
        { title: "Discussion and community", text: "Participate in Great Decisions and other discussion programs with people interested in international affairs." },
        { title: "Student outreach", text: "Support Academic WorldQuest and Model United Nations through membership, volunteering, or additional gifts." },
    ] as TitledText[],
    benefitsTitle: "Member benefits",
    benefits: memberBenefits,
    joinTitle: "How to join",
    joinOnlineTitle: "Join online",
    joinOnlineText: "Complete the online membership form and pay by credit card.",
    joinByMailTitle: "Join by mail",
    joinByMailText: "Print the membership form, complete it, and mail it with your check to the Council office.",
    testimonial: memberStory("/images/jan-cooper.png", "Jan Cooper", "WACHH Member", "Hilton Head is a vibrant community with a very engaged population. The World Affairs Council of Hilton Head offers the opportunity for individuals to remain educated and up-to-date on world affairs and their impact on the US. It is a small investment of time and dollars that offers an extraordinary return. We are incredibly fortunate to have this jewel in our midst!"),
};

export const guestDefaults = {
    title: "Attend as a guest",
    intro: "Non-members may register for individual Distinguished Speaker Series programs. WACHH members do not need to register or pay an additional event fee.",
    heroImage: { src: "/images/attend-as-guest.jpg", alt: "A WACHH speaker addressing an audience" } as GetInvolvedPhoto,
    sectionTitle: "Attending as a guest",
    sectionImage: { src: "/programs/main/programs-speaker-crowd.png", alt: "Guests and members attending a WACHH speaker program" } as GetInvolvedPhoto,
    paragraphs: [
        "Guests must be registered and wear name tags for admission. Pre-registration and advance online payment saves time at the event but we do accept walk-ins. Please visit the Guest Table in the Gathering Space to register.",
        `We ask that guests arrive at ${guestPolicy.arrival.toLowerCase()} in order to allow sufficient time to check in and enjoy a cup of coffee. Please check in at the Welcome Table at the event for a name badge.`,
    ],
};

export const volunteerDefaults = {
    title: "Volunteer with WACHH",
    intro: "Volunteers help plan programs, welcome guests, support student activities, and keep the Council connected to the community.",
    heroImage: { src: "/images/ways-to-give-banner.jpg", alt: "WACHH supporters and volunteers gathering at a Council event" } as GetInvolvedPhoto,
    opportunitiesTitle: "Volunteer opportunities",
    photos: [
        { photo: { src: "/images/volunteer/volunteer-welcome.jpg", alt: "Council volunteers welcoming a guest at the event registration table", width: 500, height: 333 }, caption: "Help members and guests feel welcome." },
        { photo: { src: "/images/volunteer/volunteer-community.jpg", alt: "Three Council community members smiling together at a gathering", width: 500, height: 333 }, caption: "Meet new people and be part of the Council community." },
    ] as CaptionedPhoto[],
    opportunitiesText: "Meet new people, share your talents in a meaningful way, and be part of a community. Our programs are run by dedicated volunteer teams who help events operate smoothly. We welcome people from all backgrounds and experiences; your time commitment can be as much or as little as you can afford.",
    roles: volunteerRoles.map(({ title, body, id }) => ({
        title,
        text: body,
        photos: ({
            "speaker-events": [{ src: "/images/volunteer/volunteer-registration.jpg", alt: "Volunteers organizing name badges and checking in guests at a Council event", width: 500, height: 333 }],
            students: [
                { src: "/programs/academic-worldquest/gallery/l1007477.jpg", alt: "Students in green shirts working together at an Academic WorldQuest table", width: 2640, height: 2112 },
                { src: "/programs/model-un/gallery/mun-2018-2.jpg", alt: "High school delegates participating in a Model United Nations conference", width: 960, height: 640 },
            ],
        } as Record<string, GetInvolvedPhoto[]>)[id] ?? [],
    })),
    formTitle: "Become a volunteer",
    formPhoto: { photo: { src: "/images/volunteer/volunteer-program.jpg", alt: "Two Council volunteers wearing event badges and smiling together", width: 500, height: 333 }, caption: "Share your time and talents with the Council community." } as CaptionedPhoto,
    formText: "Complete the form or contact the Council office to discuss current needs and your availability.",
    contactEmail: volunteerContact.email,
    contactPhone: volunteerContact.phone,
    testimonial: memberStory("/images/kaye-black.png", "Kaye Black", "WACHH Marketing Committee", "WACHH has given me a better understanding of what is happening in the world, and I love learning about the complexity behind the news headlines. World Affairs Council speakers consistently offer unique perspectives on the world’s most pressing international challenges. I can’t think of a better way to stay informed about today’s world order and what it means to us as Americans."),
};

export const giveDefaults = {
    title: "Opportunities to give",
    intro: "Your support brings outstanding speakers to our community, provides meaningful educational programs for students, and helps members engage with the international issues shaping our world. Give by credit card using the forms below, or arrange a gift by check.",
    checkTitle: "Give by check",
    checkText: "Contact Tracie Martucci at WACHH at",
    checkPhone: "(843) 384-6758",
    checkTextAfter: "to make arrangements. The Council’s mailing address is:",
    donateTitle: "Individual donations and student support",
    donateIntro: "Every gift matters. Donations of any amount are welcome throughout the year.",
    funds: [
        { title: "General Operating Fund", text: "Supports meeting space for discussion groups, staff, technology, our website, and the other essential costs of delivering WACHH programs." },
        { title: "Student Program Support", text: "Covers travel for our local winning high school team to attend the National Academic WorldQuest competition in Washington, D.C., and student participation in Model United Nations programs." },
    ] as TitledText[],
    giftExamples: [
        { amount: "$50", text: "supports one high school student participating in Model UN." },
        { amount: "$500", text: "helps cover travel expenses for a student attending the National Academic WorldQuest competition." },
    ],
    donatePhotos: [
        { photo: { src: "/programs/academic-worldquest/gallery/l1007477.jpg", alt: "A smiling student team gathered around a table at Academic WorldQuest", width: 2640, height: 2112 }, caption: "Your gift helps local students explore the world through Academic WorldQuest and Model United Nations." },
        { photo: { src: "/programs/model-un/gallery/mun-2018-2.jpg", alt: "High school students representing Singapore at a Model United Nations conference", width: 960, height: 640 }, caption: "Student Program Fund gifts support participation in Model UN." },
    ] as CaptionedPhoto[],
    heritageTitle: "Heritage Classic Foundation giving opportunities",
    heritageText: "Gifts through the Heritage Classic Foundation receive an additional 20% match. Select",
    heritageBeneficiary: "World Affairs Council Hilton Head",
    heritageTextAfter: "from the foundation’s beneficiary drop-down menu.",
    heritageOptions: [
        { title: "Heritage Champions Fore Charity", text: "Gifts from $1,000 to $10,000 receive an additional 20% from the Heritage Classic Foundation. A $1,000 gift provides $1,200 for WACHH.", note: "Open for donations January 1 through December 1 each year.", linkLabel: "Donate through Heritage Champions" },
        { title: "Birdies for Charity", text: "Support WACHH during the RBC Heritage by making a fixed contribution or pledging an amount tied to tournament birdies. The Heritage Classic Foundation adds 20% to eligible donations.", note: `2027 campaign: January 1 through ${giving.birdiesEnd}, the final day of the RBC Heritage.`, linkLabel: "Donate through Birdies for Charity" },
    ],
    heritageNote: "Heritage Classic Foundation guidelines stipulate that donors receive no tangible benefits in exchange for these contributions.",
    sponsorshipTitle: "Distinguished Speaker sponsorships",
    sponsorshipPhoto: { photo: { src: "/programs/main/programs-speaker-crowd.png", alt: "A speaker addressing Council members and guests in a full auditorium", width: 1798, height: 792 }, caption: "Your support brings world affairs conversations to our community." } as CaptionedPhoto,
    sponsorshipParagraphs: [
        "The average cost of presenting each of our 12 Distinguished Speakers is approximately $5,000, including facilities, travel, and honorarium. Members can help through an Ambassador sponsorship ($1,000) or Diplomat sponsorship ($500).",
        "Sponsors receive recognition from the podium, on the WACHH website, and in our Annual Report. Sponsors of Distinguished and Global Speakers are invited to lunch or dinner with their speaker and receive recognition and preferred seating at the event.",
    ],
    globalFundTitle: "Global Speaker Fund",
    globalFundText: "Each year, WACHH presents two Global Speakers who travel internationally to Hilton Head, at a cost of approximately $10,000 per speaker. Contributions to the Global Speaker Fund may be made through the Community Foundation of the Lowcountry.",
    monthlyTitle: "Monthly giving",
    monthlyPhoto: { photo: { src: "/programs/academic-worldquest/gallery/dscf8670.jpg", alt: "Student teams and adult organizers gathered for Academic WorldQuest", width: 2640, height: 1760 }, caption: "Reliable support helps sustain Council programs, including educational opportunities for students." } as CaptionedPhoto,
    monthlyText: "Recurring gifts provide a reliable, predictable source of support, helping WACHH plan confidently and sustain high-quality programs throughout the year. Even a modest monthly gift adds up. Select Monthly giving in the donation forms below, then choose Monthly under Payment Frequency.",
    formsTitle: "Online donation forms",
    taxTitle: "Tax-smart ways to give",
    taxIntro: "There may be opportunities to support WACHH while also achieving your personal financial and charitable-giving objectives.",
    taxOptions: [
        { title: "Qualified Charitable Distributions (QCDs)", text: "If you are age 70½ or older, you may be able to make a Qualified Charitable Distribution directly from an eligible IRA to a qualified charitable organization. A properly structured QCD is generally excluded from taxable income and may also count toward an applicable Required Minimum Distribution." },
        { title: "Required Minimum Distributions (RMDs)", text: "For many current retirees, RMDs begin at age 73, although the applicable starting age can vary based on date of birth. If you are required to take an RMD, an eligible QCD may satisfy all or part of that requirement while supporting a charitable organization." },
    ] as TitledText[],
    taxNote: "Because individual tax and financial circumstances vary, we encourage you to consult your financial advisor, tax professional, or IRA administrator before making a QCD or other tax-planned charitable gift.",
    taxPartnersIntro: "Two WACHH partners have offered to serve as resources for members interested in learning more:",
    taxPartners: [
        { name: "Ron Latin", role: "WACHH Member", phone: "(843) 476-4772" },
        { name: "David Ruckno", role: "Merrill Lynch Corporate Sponsor", phone: "(843) 341-9528" },
    ],
    testimonial: memberStory("/images/john-strother.png", "John Strother", "WACHH Marketing Committee", "I love the World Affairs Council of Hilton Head speakers. Every speaker has incredible expertise in international affairs or government. The speakers and topics are engaging. Their Great Decisions program is a fun way to discuss current events and ideas. Their Book Club makes for great conversations about timely subjects. Several weeks ago, we were fortunate to have the former ambassador to Russia come and join us in discussing his book. Pretty nice to have such an intimate environment with such knowledgeable people."),
};

export const sponsorDefaults = {
    title: "Sponsor a speaker",
    intro: "Speaker sponsorship helps fund the Distinguished Speaker Series. Sponsors are acknowledged at the program, receive preferred seating, and are invited to a meal with the speaker.",
    heroImage: { src: "/images/sponsor-a-speaker.jpg", alt: "A WACHH speaker addressing the audience" } as GetInvolvedPhoto,
    featurePhoto: { photo: { src: "/programs/main/programs-speaker-crowd.png", alt: "Council audience gathered for a speaker presentation" }, caption: "Sponsorships help bring 12 national and two international experts to Hilton Head each year. Sponsors receive recognition from the podium, on the WACHH website, and in the Annual Report." } as CaptionedPhoto,
    levelsTitle: "Sponsorship levels",
    levels: sponsorship.levels.map(({ name, amount, limit, perks }) => ({ name, amount, limit, perks })),
    becomeTitle: "Become a Sponsor",
    becomeParagraphs: [
        "Please use the Sponsorship Donation form below to select your sponsorship level. Specify which speaker you would like to sponsor (rank order preferences in case sponsorship slots are already taken).",
        "If you’d like to sponsor more than one speaker presentation, write in the total amount of your payment and make a note in the Sponsorship Comment field.",
    ],
    formTitle: "Sponsorship Donation Form",
    testimonial: memberStory("/images/richard-hammes.png", "Richard Hammes", "WACHH Member", "I cannot think of another organization that provides the wide array of speakers on such a broad range of topics as the World Affairs Council of Hilton Head. They bring to our community true experts in their fields that would be impossible to find anywhere else, especially for the cost of this membership. The nuggets of knowledge gained from these experts is why I try to never miss a presentation. Once you come to your first session you will be hooked."),
};

