import matter from 'gray-matter';

// Define the blog post type
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  content: string;
  source: string;
  author: string;
}

// List of available blog posts (metadata only)
const blogPostMetadata = [
  {
    id: "css-grid-vs-flexbox",
    slug: "css-grid-vs-flexbox",
    path: "/content/blog/css-grid-vs-flexbox.md"
  }, {
    id: "css-positioning-explained",
    slug: "css-positioning-explained",
    path: "/content/blog/css-positioning-explained.md"
  }, {
    id: "css-typography-best-practices",
    slug: "css-typography-best-practices",
    path: "/content/blog/css-typography-best-practices.md"
  }, {
    id: "dom-manipulation-javascript",  
    slug: "dom-manipulation-javascript",
    path: "/content/blog/dom-manipulation-javascript.md"
  }, {
    id: "html-forms-best-practices",
    slug: "html-forms-best-practices",
    path: "/content/blog/html-forms-best-practices.md"
  }, {
    id: "html5-page-structure",
    slug: "html5-page-structure",
    path: "/content/blog/html5-page-structure.md"
  }, {
    id: "javascript-array-methods",
    slug: "javascript-array-methods",
    path: "/content/blog/javascript-array-methods.md"
  }, {
    id: "javascript-event-listeners",
    slug: "javascript-event-listeners",
    path: "/content/blog/javascript-event-listeners.md"
  }, {
    id: "javascript-promises-async-await",
    slug: "javascript-promises-async-await",
    path: "/content/blog/javascript-promises-async-await.md"
  }
];

/**
 * Get all blog posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const postsPromises = blogPostMetadata.map(async (meta) => {
    try {
      const post = await getPostBySlug(meta.slug);
      return post;
    } catch (err) {
      console.error(`Error loading post ${meta.slug}:`, err);
      return null;
    }
  });

  const postsWithNulls = await Promise.all(postsPromises);
  
  // Filter out any null posts and sort by date
  const posts = postsWithNulls.filter((post): post is BlogPost => post !== null);
  
  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Get a specific blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const meta = blogPostMetadata.find(post => post.slug === slug);
  
  if (!meta) {
    throw new Error(`Post with slug "${slug}" not found`);
  }
  
  try {
    // Construct the full path from the public directory
    const fullPath = `${process.env.PUBLIC_URL || ''}${meta.path}`;
    console.log("Fetching markdown from path:", fullPath);
    
    // Fetch the markdown file
    const response = await fetch(fullPath);
    
    if (!response.ok) {
      throw new Error(`Failed to load markdown file: ${response.status} ${response.statusText}`);
    }
    
    const markdown = await response.text();
    console.log("Markdown content loaded, length:", markdown.length);
    
    // Custom frontmatter parsing to avoid Buffer issues
    let content = markdown;
    let data: Record<string, any> = {};
    
    // Check if the file has frontmatter (starts with ---)
    if (content.startsWith('---')) {
      const endOfFrontmatter = content.indexOf('---', 4);
      if (endOfFrontmatter !== -1) {
        const frontmatter = content.substring(4, endOfFrontmatter).trim();
        content = content.substring(endOfFrontmatter + 3).trim();
        
        // Parse the frontmatter (simple key-value pairs)
        frontmatter.split('\n').forEach(line => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length) {
            const value = valueParts.join(':').trim();
            data[key.trim()] = value;
          }
        });
      }
    }
    
    // Try using gray-matter as fallback if our simple parser fails
    if (Object.keys(data).length === 0) {
      try {
        const parsed = matter(markdown);
        data = parsed.data;
        content = parsed.content;
      } catch (matterError) {
        console.error("Error parsing with gray-matter:", matterError);
        // If gray-matter fails, we'll use the content as is
      }
    }
    
    return {
      id: meta.id,
      slug: meta.slug,
      title: data.title || meta.id,
      date: data.date || new Date().toISOString().split('T')[0],
      excerpt: data.excerpt || '',
      coverImage: data.coverImage || '',
      content: content || '',
      source: 'markdown',
      author: data.author || 'Unknown'
    };
  } catch (error) {
    console.error(`Error loading markdown file for "${slug}":`, error);
    throw error;
  }
}

/**
 * Get all blog post slugs
 */
export function getAllPostSlugs(): string[] {
  return blogPostMetadata.map(post => post.slug);
} 