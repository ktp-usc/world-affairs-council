"use client";

import { useEffect, useRef, useState } from "react";
import { CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { field, label } from "@/lib/form";
import { giving, parseDate, sponsorship } from "@/lib/site";

// Error styling only shows after someone has used a field (:user-invalid), never on first load.
const checkedField = `peer ${ field } user-invalid:border-[#b42318] user-invalid:bg-[#fef3f2]`;
const errorText = "mt-1.5 hidden items-start gap-1.5 text-sm text-[#b42318] peer-user-invalid:flex";

/** An error message shown under its field while the field is invalid; the icon reads as "Error" to screen readers. */
function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
    return (
        <p id={ id } className={ errorText }>
            <CircleAlert className="mt-0.5 size-4 shrink-0" role="img" aria-label="Error" />
            <span>{ children }</span>
        </p>
    );
}

/**
 * Keeps screen readers in step with the visible error state: sets aria-invalid, links the error message
 * through aria-describedby only while it shows, and announces a new error once through a single live region.
 */
function useAccessibleFieldErrors(formRef: React.RefObject<HTMLFormElement | null>, announcerRef: React.RefObject<HTMLDivElement | null>) {
    useEffect(() => {
        const form = formRef.current;
        const announcer = announcerRef.current;
        if (!form || !announcer) return;
        const announced = new WeakSet<Element>();
        let announceTimer = 0;

        const linkError = (fieldElement: HTMLElement, isShown: boolean) => {
            const errorId = fieldElement.dataset.error;
            if (!errorId) return;
            const describedBy = (fieldElement.getAttribute("aria-describedby") ?? "").split(/\s+/).filter((id) => id && id !== errorId);
            if (isShown) describedBy.push(errorId);
            if (describedBy.length) fieldElement.setAttribute("aria-describedby", describedBy.join(" "));
            else fieldElement.removeAttribute("aria-describedby");
        };

        const announceError = (fieldElement: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
            const errorMessage = fieldElement.dataset.error ? document.getElementById(fieldElement.dataset.error) : null;
            if (!errorMessage) return;
            const fieldName = fieldElement.labels?.[0]?.textContent?.trim();
            window.clearTimeout(announceTimer);
            announcer.textContent = "";
            // wait so the message doesn't talk over the field that gets focus next
            announceTimer = window.setTimeout(() => {
                announcer.textContent = `${ fieldName ? `${ fieldName }: ` : "" }Error: ${ errorMessage.textContent?.trim() ?? "" }`;
            }, 500);
        };

        const syncField = (target: EventTarget | null, shouldAnnounce = false) => {
            if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
            if (!target.dataset.error) return;
            const isInvalid = target.matches(":user-invalid");
            target.setAttribute("aria-invalid", String(isInvalid));
            linkError(target, isInvalid);
            if (isInvalid && shouldAnnounce && !announced.has(target)) {
                announceError(target);
                announced.add(target);
            }
            if (!isInvalid) announced.delete(target);
        };

        form.querySelectorAll("[data-error]").forEach((fieldElement) => syncField(fieldElement));
        const handleLeave = (event: Event) => syncField(event.target, true);
        const handleInput = (event: Event) => syncField(event.target);
        // a failed submit moves focus to the first invalid field, which reads its error, so don't announce here
        const handleInvalid = (event: Event) => {
            if (event.target instanceof Element) announced.add(event.target);
            syncField(event.target);
        };
        form.addEventListener("focusout", handleLeave);
        form.addEventListener("change", handleLeave);
        form.addEventListener("input", handleInput);
        form.addEventListener("invalid", handleInvalid, true);
        return () => {
            window.clearTimeout(announceTimer);
            form.removeEventListener("focusout", handleLeave);
            form.removeEventListener("change", handleLeave);
            form.removeEventListener("input", handleInput);
            form.removeEventListener("invalid", handleInvalid, true);
        };
    }, [formRef, announcerRef]);
}

const short = (iso: string) => parseDate(iso).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });

// No backend yet: submitting opens the visitor's email app with the form filled in.
export default function SponsorForm() {
    const [level, setLevel] = useState(sponsorship.levels[0].id);
    const [sent, setSent] = useState(false);
    const chosen = sponsorship.levels.find((l) => l.id === level)!;
    const formRef = useRef<HTMLFormElement>(null);
    const announcerRef = useRef<HTMLDivElement>(null);
    useAccessibleFieldErrors(formRef, announcerRef);

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // our own messages replace the browser's pop-up; focus the first problem so its message is read out
        if (!e.currentTarget.checkValidity()) {
            e.currentTarget.querySelector<HTMLElement>(":invalid")?.focus();
            return;
        }
        const data = new FormData(e.currentTarget);
        const prefs = [1, 2, 3].map((n) => data.get(`choice${ n }`)).filter(Boolean);
        const body = [
            `Name: ${ data.get("name") }`,
            `Email: ${ data.get("email") }`,
            `Phone: ${ data.get("phone") || "—" }`,
            `Sponsorship level: ${ chosen.name } ($${ chosen.amount })`,
            `Speaker preferences: ${ prefs.map((p, i) => `${ i + 1 }. ${ p }`).join("; ") }`,
            `Total payment: $${ data.get("total") || chosen.amount }`,
            "",
            `Sponsorship comment: ${ data.get("comment") || "—" }`,
        ].join("\n");
        window.location.href = `mailto:${ sponsorship.email }?subject=${ encodeURIComponent("Speaker Sponsorship") }&body=${ encodeURIComponent(body) }`;
        setSent(true);
    }

    return (
        <form ref={ formRef } onSubmit={ onSubmit } noValidate className="border border-[#d9d7d1] bg-card p-7">
            {/* one hidden live region that reads out a new error after someone leaves a field */}
            <div ref={ announcerRef } aria-live="polite" className="sr-only" />
            <fieldset>
                <legend className={ label }>Sponsorship level</legend>
                <div className="grid gap-3 sm:grid-cols-3">
                    { sponsorship.levels.map((l) => (
                        <label key={ l.id } className="cursor-pointer border p-4 hover:bg-muted has-[:checked]:border-primary has-[:checked]:bg-secondary">
                            <input type="radio" name="level" value={ l.id } checked={ level === l.id } onChange={ () => setLevel(l.id) } className="sr-only" />
                            <span className="block font-serif text-2xl font-semibold text-primary">${ l.amount.toLocaleString() }</span>
                            <span className="text-sm font-medium">{ l.name.replace(" Sponsorship", "") }</span>
                        </label>
                    )) }
                </div>
            </fieldset>

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
                <div className="sm:col-span-3">
                    <p className={ label }>Speaker preferences <span className="font-normal text-muted-foreground">(rank in case slots are already taken)</span></p>
                </div>
                { [1, 2, 3].map((n) => (
                    <div key={ n }>
                        <label htmlFor={ `sf-choice${ n }` } className="mb-1.5 block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                            { ["1st", "2nd", "3rd"][n - 1] } choice
                        </label>
                        <select id={ `sf-choice${ n }` } name={ `choice${ n }` } required={ n === 1 } defaultValue="" className={ checkedField } data-error={ n === 1 ? "sf-choice1-error" : undefined }>
                            <option value="">{ n === 1 ? "Select a speaker" : "Optional" }</option>
                            { sponsorship.presentations.map((p) => (
                                <option key={ p.date } value={ `${ short(p.date) } – ${ p.presenter }` }>{ short(p.date) } – { p.presenter }</option>
                            )) }
                        </select>
                        { n === 1 && <FieldError id="sf-choice1-error">Choose a speaker for your 1st choice.</FieldError> }
                    </div>
                )) }
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="sf-name" className={ label }>Name</label>
                    <input id="sf-name" name="name" required autoComplete="name" className={ checkedField } data-error="sf-name-error" />
                    <FieldError id="sf-name-error">Enter your name.</FieldError>
                </div>
                <div>
                    <label htmlFor="sf-email" className={ label }>Email</label>
                    <input id="sf-email" name="email" type="email" required autoComplete="email" className={ checkedField } data-error="sf-email-error" />
                    <FieldError id="sf-email-error">Enter an email address in the format you@example.com.</FieldError>
                </div>
                <div>
                    <label htmlFor="sf-phone" className={ label }>Phone <span className="text-muted-foreground">(optional)</span></label>
                    <input id="sf-phone" name="phone" type="tel" autoComplete="tel" className={ field } />
                </div>
                <div>
                    <label htmlFor="sf-total" className={ label }>Total payment ($)</label>
                    <input id="sf-total" name="total" type="number" min={ chosen.amount } step={ 1 } placeholder={ String(chosen.amount) } className={ checkedField } data-error="sf-total-error" />
                    <FieldError id="sf-total-error">Enter a whole-dollar amount of at least ${ chosen.amount.toLocaleString() }.</FieldError>
                </div>
            </div>

            <div className="mt-6">
                <label htmlFor="sf-comment" className={ label }>Sponsorship comment</label>
                <textarea id="sf-comment" name="comment" rows={ 3 } placeholder="Sponsoring more than one presentation? List them here." className={ field } />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
                <Button type="submit" size="lg">Submit sponsorship — ${ chosen.amount.toLocaleString() }</Button>
                { sent && (
                    <p className="text-sm text-muted-foreground" role="status">
                        Your email app should open with the form filled in. To pay online, use our{ " " }
                        <a href={ giving.donateOnline } className="font-medium text-primary underline">online donation form</a>, or email{ " " }
                        <a href={ `mailto:${ sponsorship.email }` } className="font-medium text-primary underline">{ sponsorship.email }</a>.
                    </p>
                ) }
            </div>
        </form>
    );
}
