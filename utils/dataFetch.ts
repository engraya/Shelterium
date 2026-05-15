import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

const getHeaders = () => ({
  "X-RapidAPI-Key": process.env.RAPID_API_KEY as string,
  "X-RapidAPI-Host": "bayut.p.rapidapi.com",
});

export async function getForRentData() {
  try {
    const response = await axios.get(`${baseUrl}/properties/list`, {
      params: {
        locationExternalIDs: "5002,6020",
        purpose: "for-rent",
        hitsPerPage: "30",
        lang: "en",
        sort: "city-level-score",
        rentFrequency: "monthly",
      },
      headers: getHeaders(),
    });
    return response.data?.hits ?? [];
  } catch (error) {
    console.error("[getForRentData]", error);
    return [];
  }
}

export async function getForSaleData() {
  try {
    const response = await axios.get(`${baseUrl}/properties/list`, {
      params: {
        locationExternalIDs: "5002,6020",
        purpose: "for-sale",
        hitsPerPage: "30",
        lang: "en",
        sort: "city-level-score",
      },
      headers: getHeaders(),
    });
    return response.data?.hits ?? [];
  } catch (error) {
    console.error("[getForSaleData]", error);
    return [];
  }
}

export async function getPropertyDetails(id: string) {
  try {
    const response = await axios.get(`${baseUrl}/properties/detail`, {
      params: { externalID: id },
      headers: getHeaders(),
    });
    return response.data ?? null;
  } catch (error) {
    console.error("[getPropertyDetails]", error);
    return null;
  }
}
