import API from "./axios";

export const fetchDestinations = async () => {
    try {
        const res = await API.get("/destinations");
        return res.data;
    } catch (error) {
        console.error("Error fetching destinations:", error);
    }
};