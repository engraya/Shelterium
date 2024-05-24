import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';


export async function getForRentData() {
  const options = {
    method: 'GET',
    url: `${baseUrl}/properties/list`,
    params: {
      locationExternalIDs: '5002,6020',
      purpose: 'for-rent',
      hitsPerPage: '30',
      lang: 'en',
      sort: 'city-level-score',
      rentFrequency: 'monthly',
    },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
    }
  };

    const response = await axios.request(options);
  return response?.data?.hits
}


export async function getForSaleData() {
  const options = {
    method: 'GET',
    url: `${baseUrl}/properties/list`,
    params: {
      locationExternalIDs: '5002,6020',
      purpose: 'for-sale',
      hitsPerPage: '30',
      lang: 'en',
      sort: 'city-level-score',
      rentFrequency: 'monthly',
    },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response?.data?.hits
  } catch (error) {
    console.error(error);
  }



}


export async function getPropertyDetails(id) {
  const options = {
    method: 'GET',
    url: `${baseUrl}/properties/detail`,
    params: {
      externalID: id
    },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response?.data?.hits
  } catch (error) {
    console.error(error);
  }

}


export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
    },
  });
    
  return data;
}


