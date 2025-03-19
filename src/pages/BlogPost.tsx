import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import { getPostBySlug, BlogPost as BlogPostType } from "../utils/markdown";
import "highlight.js/styles/github.css";
import "./BlogPost.css";

interface BlogPostParams {
  slug: string;
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<keyof BlogPostParams>() as BlogPostParams;
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      setError("No slug provided");
      setLoading(false);
      return;
    }

    async function loadPost() {
      try {
        const postData = await getPostBySlug(slug);
        setPost(postData);
        setLoading(false);
      } catch (err) {
        console.error("Error loading blog post:", err);
        setError("Error loading blog post");
        setLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className="blog-post-container">Loading...</div>;
  }

  if (error || !post) {
    return (
      <div className="blog-post-container">
        <div className="error-message">{error || "Post not found"}</div>
        <button onClick={handleGoBack} className="back-button">
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <button onClick={handleGoBack} className="back-button">
        ← Back to Blog
      </button>

      <div className="blog-post-header">
        <h1>{post.title}</h1>
        <div className="blog-post-meta">
          <span className="blog-post-date">{post.date}</span>
          {post.author && (
            <span className="blog-post-author">By: {post.author}</span>
          )}
          <span className="blog-post-source">Source: {post.source}</span>
        </div>
      </div>

      {post.coverImage && (
        <div className="blog-post-cover">
          <img src={post.coverImage} alt={post.title} />
        </div>
      )}

      <div className="blog-post-content">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogPost;
