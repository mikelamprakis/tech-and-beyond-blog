import { BlogPost } from './types';

// Constants for localStorage keys
export const DRUPAL_CACHE_KEY = "drupal_articles_cache";
export const DRUPAL_CACHE_TIMESTAMP_KEY = "drupal_articles_timestamp";

/**
 * Fetch articles from Drupal CMS
 * @returns Promise with BlogPost array
 */
export const fetchDrupalArticles = async (): Promise<{
  articles: BlogPost[];
  timestamp: Date;
  error?: string;
}> => {
  const API_URL = "/jsonapi/node/article";
  
  console.log(`Fetching Drupal articles from ${API_URL} at ${new Date().toLocaleTimeString()}`);
  
  try {
    const response = await fetch(API_URL, {
      // Add cache-busting headers to ensure we get fresh data
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API response error:', response.status, errorText);
      throw new Error(`API error (${response.status}): ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Raw API response:', data);
    
    if (!data || !data.data || !Array.isArray(data.data)) {
      console.error('Invalid data structure:', data);
      throw new Error("Invalid data structure received from API");
    }
    
    console.log(`Received ${data.data.length} articles from Drupal API`);
    
    const articles = data.data.map((item: any) => ({
      id: item.id,
      title: item.attributes.title,
      excerpt: item.attributes.field_body
        ? item.attributes.field_body[0]
        : "No content available",
      imageUrl: "https://picsum.photos/400/300?random=" + item.id,
      date: new Date(item.attributes.created).toLocaleDateString(),
      source: 'drupal'
    }));
    
    // Cache the result
    const now = new Date();
    localStorage.setItem(DRUPAL_CACHE_KEY, JSON.stringify(articles));
    localStorage.setItem(DRUPAL_CACHE_TIMESTAMP_KEY, now.toString());
    
    return {
      articles,
      timestamp: now
    };
  } catch (error) {
    console.error("Error fetching Drupal articles:", error);
    return {
      articles: [],
      timestamp: new Date(),
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Get cached Drupal articles from localStorage
 * @returns Object containing articles and timestamp, or null if no cache exists
 */
export const getCachedDrupalArticles = (): {
  articles: BlogPost[];
  timestamp: Date;
} | null => {
  try {
    const cachedArticles = localStorage.getItem(DRUPAL_CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(DRUPAL_CACHE_TIMESTAMP_KEY);
    
    if (!cachedArticles || !cachedTimestamp) {
      return null;
    }
    
    return {
      articles: JSON.parse(cachedArticles),
      timestamp: new Date(cachedTimestamp)
    };
  } catch (e) {
    console.error("Error retrieving cached Drupal articles:", e);
    return null;
  }
}; 