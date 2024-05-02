import axios from 'axios';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';


const fetchGooglePlacesData = async (input) => {

    const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY
    console.log("Google Api key", apiKey, input)
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${input}&key=${apiKey}`
        );
        return response.data.results;
    } catch (error) {
        console.error('Error fetching Google Places data:', error);
        return [];
    }
};



const getLatLong = async (placeId) => {
    console.log("place id", placeId);
    try {
        const results = await geocodeByPlaceId(placeId);
        if (results && results.length > 0 && results[0].geometry && results[0].geometry.location) {
            const { lat, lng } = results[0].geometry.location;
            console.log("Latitude:", lat);
            console.log("Longitude:", lng);
            return { lat: lat(), lng: lng() };
        } else {
            throw new Error("Invalid geocode results");
        }
    } catch (error) {
        console.error("Geocoding error:", error);
        return { lat: null, lng: null };
    }
}



export { getLatLong, fetchGooglePlacesData };
