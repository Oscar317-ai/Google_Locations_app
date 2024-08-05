import axios from "axios";

class LocationService {

    static BASE_URL = "http://localhost:8080";
    static API_KEY = "the key";

    static async getLocations() {
        const response = await axios.get(`${LocationService.BASE_URL}/location/get-all-locations`);
        
        return response.data;
    }
}

export default LocationService;