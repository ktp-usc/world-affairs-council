import { defineQuery } from "next-sanity";
import { nav, type NavItem } from "@/lib/site";
import { client } from "./client";

// the tabs editors set in the Header Menu document
export const HEADER_NAVIGATION_QUERY = defineQuery(`
  *[_type == "headerNavigation" && _id == "headerNavigation"][0] {
    tabs[] { _key, label, link, dropdownLinks[] { _key, label, link } }
  }
`);

type HeaderTab = {
    _key: string;
    label?: string;
    link?: string;
    dropdownLinks?: { _key: string; label?: string; link?: string }[] | null;
};

// Home is always the first tab and can't be changed in Sanity
const homeTab: NavItem = { label: "Home", href: "/" };

/** Turns the Sanity tabs into header items, skipping any tab or dropdown link that is missing its name or link. */
function toNavItems(tabs: HeaderTab[]): NavItem[] {
    return tabs.flatMap((tab) => {
        const label = tab.label?.trim();
        if (!label) return [];
        const children = (tab.dropdownLinks ?? []).flatMap((dropdownLink) => {
            const childLabel = dropdownLink.label?.trim();
            const childHref = dropdownLink.link?.trim();
            return childLabel && childHref ? [{ key: dropdownLink._key, label: childLabel, href: childHref }] : [];
        });
        const href = tab.link?.trim() || children[0]?.href;
        if (!href) return [];
        return [{ key: tab._key, label, href, children: children.length ? children : undefined }];
    });
}

// reads live data instead of Sanity's cached copy, so a published change shows up on the next check
const liveClient = client.withConfig({ useCdn: false });

/**
 * Loads the header tabs from Sanity, checking for changes at most every 30 seconds.
 * Falls back to the built-in menu when Sanity has no Header Menu yet or can't be reached, so the header never comes up empty.
 */
export async function fetchHeaderNav(): Promise<NavItem[]> {
    try {
        const headerNavigation = await liveClient.fetch<{ tabs?: HeaderTab[] | null } | null>(HEADER_NAVIGATION_QUERY, {}, { next: { revalidate: 30 } });
        const tabs = toNavItems(headerNavigation?.tabs ?? []);
        if (!tabs.length) return nav;
        return [homeTab, ...tabs];
    } catch {
        return nav;
    }
}
