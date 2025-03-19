import React, { useEffect, useState } from "react";
import { getPostBySlug } from "../utils/markdown";

const TestMarkdown: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    async function loadTest() {
      try {
        // Try to load the post
        console.log("Starting to load post...");
        const post = await getPostBySlug("getting-started-with-react");
        console.log("Post loaded successfully:", post);
        setContent(post.content);
        setError(null);
      } catch (err) {
        console.error("Test Error:", err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    loadTest();
  }, []);

  return (
    <div>
      <h1>Markdown Test</h1>
      {loading && <p>Loading...</p>}
      {error && (
        <div style={{ color: "red" }}>
          <h2>Error:</h2>
          <pre>{error}</pre>
        </div>
      )}
      {content && (
        <div>
          <h2>Content loaded successfully!</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {content.substring(0, 100)}...
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestMarkdown;
