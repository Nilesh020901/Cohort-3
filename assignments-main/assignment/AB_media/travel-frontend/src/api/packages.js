import API from "./axios";

export const fetchTopPackages = async () => {
    try {
        const res = await API.get("/packages/top");
        return res.data;
    } catch (error) {
        console.error("Error fetching top packages:", error);
    }
};