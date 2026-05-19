import axios from "axios";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { toListItem, toDetail } from "@/lib/db/mappers";
import { eq, desc } from "drizzle-orm";
import type { PropertyListItem, PropertyDetail } from "@/types/property";

export const baseUrl = "https://bayut.p.rapidapi.com";


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

  try {
    const response = await axios.request(options);
    return response?.data?.hits ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
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
    return response?.data?.hits ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }



}

export async function getPropertyDetails(id: string): Promise<PropertyDetail | null> {
  const rows = await db
    .select()
    .from(properties)
    .where(eq(properties.externalId, id))
    .limit(1);
  return rows[0] ? toDetail(rows[0]) : null;
}
