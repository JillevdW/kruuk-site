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

export async function getArtistInfo(appId: string): Promise<Artist> {
    const url = `https://rest.bandsintown.com/artists/id_${artistID}?app_id=${appId}`;
    const response = await fetch(url);
    return response.json();
}

export async function getArtistGigs(appId: string, name: string): Promise<[Gig]> {
    const url = `https://rest.bandsintown.com/artists/${name}/events?app_id=${appId}&date=upcoming`
    const response = await fetch(url);
    return response.json();
}