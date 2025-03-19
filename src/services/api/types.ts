// Common types used across API services

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  source?: string; // to track where the data came from (e.g., 'drupal', 'wordpress', 'static')
  author?: string;
} 