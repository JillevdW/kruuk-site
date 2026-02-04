import { getArtistGigs, getArtistInfo } from "@/lib/bandsintown_api";
import ical, { ICalCalendarMethod } from 'ical-generator';
import * as fs from 'fs';

const data = fs.readFileSync('.env', { encoding: 'utf8', flag: 'r' });
const appId = data.split('=')[1];

getArtistInfo(appId).then(
    (artistInfo) => {
        getArtistGigs(appId, artistInfo.name).then(
            (gigs) => {
                createCalendar(gigs)
            },
            (err) => { console.log(err) }
        )
    },
    (err) => { console.log(err) }
)


function createCalendar(gigs: [any]) {
    const calendar = ical({ name: 'The Kruuk Gigs' });

    // A method is required for outlook to display event as an invitation
    calendar.method(ICalCalendarMethod.REQUEST);

    console.log(gigs);

    gigs.forEach((gig) => {
        const startTime = new Date(gig.datetime)
        const endTime = new Date(gig.datetime)
        endTime.setHours(endTime.getHours() + 1)
        calendar.createEvent({
            start: startTime,
            end: endTime,
            summary: gig.title ?? gig.description ?? "The Kruuk Gig",
            description: gig.description,
            location: `${gig.venue.name}, ${gig.venue.city}`,
            url: gig.url
        })
    })

    fs.writeFileSync('./public/assets/thekruukcalendar.ics', calendar.toString());
}
