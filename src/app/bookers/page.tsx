'use client'

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { GigList } from "@/app/components/giglist";
import React from "react";

enum Language {
    Dutch = 1,
    English
}

export default function Bookers() {

    const [language, setLanguage] = React.useState(Language.Dutch);

    function toggleLanguage() {
        if (language == Language.Dutch) {
            setLanguage(Language.English)
        } else if (language == Language.English) {
            setLanguage(Language.Dutch)
        }
    }

    function title(): string {
        switch (language) {
            case Language.Dutch:
                return "Voor Boekers"
            case Language.English:
                return "For Bookers"
        }
    }

    function buttonTitle(): string {
        switch (language) {
            case Language.Dutch:
                return "Show in English 🇬🇧"
            case Language.English:
                return "In het Nederlands 🇳🇱"
        }
    }

    function descriptionText(): string {
        switch (language) {
            case Language.Dutch:
                return `
The Kruuk bestaat uit 4 vrienden die samen zijn gekomen om muziek te schrijven en spelen. Onze muziek haalt veel van haar invloeden uit alternatieve rock, ska/reaggae, een vleugje punk en haalt inspiratie van onder meer The Clash en RHCP.

Wij hebben een tijdje zonder zanger gezeten, maar komen nu harder en beter terug als ooit tevoren. Wij spelen normaliter een set van grofweg 45 minuten tot een uur aan eigen werk met vaak een of twee covers (demo's staan in de link hieronder, en we staan ook op Spotify). 

Wij zouden het heel erg leuk vinden om een keer bij jullie te komen spelen en wij helpen dan ook graag mee en we promoten onze showtjes altijd erg veel.
`
            case Language.English:
                return `
The Kruuk is a band made up of 4 friends that got together to write and play music. Our music is influenced by alternative rock, ska/reggae and a bit of punk, and is influenced by bands like The Clash and RHCP.

We've been without a vocalist for a while, but now we're back, heavier and better than ever. Our sets are usually between 45 minutes and an hour of our own songs and one or two covers (demos are in the link below, and we're also on Spotify).

If you're looking for a band to shake up your cafe/festival/music venue, reach out. We like to help promote our shows through our socials.
`
        }
    }

    function downloadButtonText(): string {
        switch (language) {
            case Language.Dutch:
                return "Download press-kit & contact informatie"
            case Language.English:
                return "Download press-kit & contact information"
        }
    }

    function contactButtonText(): string {
        switch (language) {
            case Language.Dutch:
                return "Neem contact op"
            case Language.English:
                return "Contact us"
        }
    }

    return (
        <main>
            <Container>
                <Intro />

                <div className="relative flex flex-col items-center p-16 mb-8 bg-slate-200 bg-opacity-[.30] dark:bg-slate-800 dark:bg-opacity-[.40] rounded-xl">
                    <button className="absolute top-0 right-0 m-4 rounded-md px-6 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white" 
                        onClick={toggleLanguage}
                    >
                        {buttonTitle()}
                    </button>
                    <h1 className="text-5xl font-bold">{title()}</h1>

                    <div className="flex w-full">

                        <div className="grow">
                            {/* <h1 className="text-xl font-bold">Content</h1> */}
                            <p className="text-lg whitespace-pre-wrap">
                                {descriptionText()}
                            </p>
                        </div>
                    </div>

                    <a href="/assets/presskit.zip" className="rounded-md mt-8 text-center px-6 py-2 text-lg font-medium text-gray-300 hover:cursor-pointer hover:scale-[1.05] transition ease-in-out bg-purple-600 hover:bg-purple-400 hover:text-white">
                        {downloadButtonText()}
                    </a>
                </div>

            </Container>
        </main>
    );
}
