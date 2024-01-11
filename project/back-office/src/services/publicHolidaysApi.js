import axios from "axios";

/*
BASE API
 */
export const http = axios.create({
    baseURL: 'https://calendrier.api.gouv.fr/jours-feries/metropole.json',
    timeout: 1000,
});

export const getPublicHolidays = () => {
    return http.get('')
}