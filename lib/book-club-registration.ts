import { wildApricotBaseUrl } from "@/lib/site";

/** Only embed trusted Wild Apricot event registration forms. */
export function bookClubRegistrationWidget(value?: string) {
    const match = value?.match(/^https:\/\/(?:www\.)?(?:wachh\.org|wachh\.wildapricot\.org)\/(?:widget\/)?event-(\d+)(?:\/Registration)?\/?(?:[?#].*)?$/i);
    return match ? `${wildApricotBaseUrl}/widget/event-${match[1]}/Registration` : null;
}
