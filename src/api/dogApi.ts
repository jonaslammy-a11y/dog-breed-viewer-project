import axios from 'axios';
import rax from 'retry-axios';

// Create Axios instance with base URL and retries for rate limits (exponential backoff on 429)
const api = axios.create({
  baseURL: 'https://dog.ceo/api',
  timeout: 5000,
});

// Attach retry logic: 3 attempts, delay 1s * attempt#
api.interceptors.request.use(rax.attach({ instance: api, retry: 3, retryDelay: 1000 }));

// Flatten breeds response: {message: {breed: [subs]}} -> string[] like "bulldog", "bulldog - boston"
const flattenBreeds = (data: Record<string, string[]>): string[] => {
  const breeds: string[] = [];
  Object.entries(data).forEach(([main, subs]) => {
    if (subs.length === 0) {
      breeds.push(main);
    } else {
      subs.forEach((sub) => breeds.push(`${main} - ${sub}`));
    }
  });
  return breeds.sort(); // Alphabetical for UX
};

// Fetch all breeds
export const fetchAllBreeds = async (): Promise<string[]> => {
  try {
    const response = await api.get('/breeds/list/all');
    if (response.data.status !== 'success') {
      throw new Error('API error: Invalid response status');
    }
    return flattenBreeds(response.data.message);
  } catch (error) {
    console.error('Breed fetch error:', error);
    throw new Error('Failed to fetch breeds. Please check your connection.');
  }
};

// Fetch random images for breed (handle sub-breeds)
export const fetchRandomImages = async (breed: string, count: number = 3): Promise<string[]> => {
  try {
    let url = '/breed';
    const parts = breed.split(' - ');
    if (parts.length > 1) {
      url += `/${parts[0]}/${parts[1]}/images/random/${count}`;
    } else {
      url += `/${breed}/images/random/${count}`;
    }
    const response = await api.get(url);
    if (response.data.status !== 'success') {
      throw new Error('API error: Invalid response status');
    }
    return response.data.message;
  } catch (error) {
    console.error('Image fetch error:', error);
    throw new Error(`Failed to fetch images for ${breed}.`);
  }
};