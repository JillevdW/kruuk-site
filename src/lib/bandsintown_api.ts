import { join } from "path";

const artistID = "15552460";

type Artist = {
    name: string;
};


type Gig = {
    id: string;
    artist_id: string;
    url: string;
    on_sale_datetime: string;
    datetime: string;
    description?: string;
    title?: string;
    venue: VenueData;
}

type VenueData = {
    name: string;
    latitude: string;
    longitude: string;
    city: string;
    region: string;
    country: string;
}

export async function getArtistInfo(): Promise<Artist> {
    const url = `https://rest.bandsintown.com/artists/id_${artistID}?app_id=${process.env.BANDSINTOWN_API_KEY}`;
    const response = await fetch(url);
    console.log(response);
    return response.json();
}

export async function getArtistGigs(name: string): Promise<[Gig]> {
    const url = `https://rest.bandsintown.com/artists/${name}/events?app_id=${process.env.BANDSINTOWN_API_KEY}&date=upcoming`
    const response = await fetch(url);
    console.log(response);
    return response.json();
}