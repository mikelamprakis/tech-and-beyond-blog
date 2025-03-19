import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { fetchDrupalArticles, getCachedDrupalArticles } from "../services/api";
import { getAllPosts, BlogPost as MarkdownBlogPost } from "../utils/markdown";

// Combined blog post type that can come from markdown or API
interface BlogPost {
  id: string | number;
  title: string;
  excerpt: string;
  imageUrl?: string;
  coverImage?: string;
  date: string;
  slug?: string;
  source: string;
  author?: string;
}

const Home: React.FC = () => {
  const [markdownPosts, setMarkdownPosts] = useState<BlogPost[]>([]);
  const [markdownLoading, setMarkdownLoading] = useState<boolean>(true);
  const [markdownError, setMarkdownError] = useState<string | null>(null);
  const [drupalArticles, setDrupalArticles] = useState<BlogPost[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pollCount, setPollCount] = useState<number>(0);

  // Load markdown posts
  useEffect(() => {
    async function loadMarkdownPosts() {
      setMarkdownLoading(true);
      try {
        // Get all posts from markdown data
        const posts = await getAllPosts();
        const formattedPosts = posts.map((post) => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          imageUrl: post.coverImage,
          date: post.date,
          slug: post.slug,
          source: post.source,
          author: post.author,
        }));

        setMarkdownPosts(formattedPosts);
        setMarkdownError(null);
      } catch (error) {
        console.error("Error loading markdown posts:", error);
        setMarkdownError("Failed to load markdown posts");
      } finally {
        setMarkdownLoading(false);
      }
    }

    loadMarkdownPosts();
  }, []);

  // Function to load all blog posts
  const getAllBlogPosts = (): BlogPost[] => {
    return [...markdownPosts];
  };

  // Function to fetch articles from Drupal API
  const loadDrupalArticles = async () => {
    setIsLoading(true);
    try {
      const result = await fetchDrupalArticles();

      if (result.error) {
        setFetchError(result.error);
      } else {
        setFetchError(null);
        // Convert API blog posts to our unified format
        const apiPosts: BlogPost[] = result.articles.map((post) => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          imageUrl: post.imageUrl,
          date: post.date,
          source: post.source || "drupal",
          author: post.author || "Unknown",
        }));
        setDrupalArticles(apiPosts);
        setLastUpdated(result.timestamp.toLocaleTimeString());
        // Increment poll count to track how many times we've successfully fetched
        setPollCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Unexpected error during article loading:", error);
      setFetchError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle manual refresh
  const handleRefresh = () => {
    loadDrupalArticles();
  };

  useEffect(() => {
    // Try to load cached articles first
    const cachedData = getCachedDrupalArticles();

    if (cachedData) {
      // Convert cached articles to our unified format
      const cachedPosts: BlogPost[] = cachedData.articles.map((post) => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        imageUrl: post.imageUrl,
        date: post.date,
        source: post.source || "drupal",
        author: post.author,
      }));
      setDrupalArticles(cachedPosts);
      setLastUpdated(cachedData.timestamp.toLocaleTimeString());
    }

    // Fetch fresh articles immediately
    loadDrupalArticles();

    // Set up polling every minute
    const intervalId = setInterval(() => {
      console.log("Polling for new articles...");
      loadDrupalArticles();
    }, 60000); // 60000 ms = 1 minute

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="home-container">
      <h1>Latest Blog Posts</h1>

      <div
        className="status-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0",
        }}
      >
        <div>
          {markdownLoading && (
            <div style={{ color: "blue" }}>Loading markdown posts...</div>
          )}
          {markdownError && (
            <div className="error-message" style={{ color: "red" }}>
              Error loading markdown: {markdownError}
            </div>
          )}
          {lastUpdated && (
            <div
              className="last-updated"
              style={{ fontSize: "0.9em", color: "#666" }}
            >
              API last updated: {lastUpdated} (Poll count: {pollCount})
            </div>
          )}
          {isLoading && (
            <div style={{ color: "blue" }}>Loading API articles...</div>
          )}
          {fetchError && (
            <div className="error-message" style={{ color: "red" }}>
              API Error: {fetchError}
            </div>
          )}
        </div>

        <button
          onClick={handleRefresh}
          disabled={isLoading}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? "Refreshing..." : "Refresh Now"}
        </button>
      </div>

      <div className="blog-grid">
        {getAllBlogPosts().map((blog) => (
          <div key={blog.id} className="blog-card">
            <img
              src={blog.imageUrl || blog.coverImage}
              alt={blog.title}
              className="blog-image"
            />
            <div className="blog-content">
              <h2>
                {blog.slug ? (
                  <Link
                    to={`/blog/${blog.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {blog.title}
                  </Link>
                ) : (
                  blog.title
                )}
              </h2>
              <p>{blog.excerpt}</p>
              <div className="blog-meta">
                <span className="blog-date">{blog.date}</span>
                <div
                  style={{
                    marginLeft: "0px",
                    fontSize: "0.8em",
                    color: "#888",
                  }}
                >
                  {blog.author && (
                    <span className="blog-author">By {blog.author}</span>
                  )}
                  {/* {blog.source && (
                    <span
                      className="blog-source"
                      style={{ marginLeft: blog.author ? "10px" : "0" }}
                    >
                      Source: {blog.source}
                    </span>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
