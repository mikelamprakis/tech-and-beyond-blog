---
title: HTML5 Page Structure
slug: html5-page-structure
date: 2024-03-01
excerpt: Learn how to structure HTML5 pages with semantic elements for better accessibility and SEO.
coverImage: https://picsum.photos/800/400?random=8
author: Tamara Joniec
---

# HTML5 Page Structure: A Comprehensive Guide

HTML5 introduced a set of semantic elements that clearly define different parts of a web page. Using these elements properly improves accessibility, SEO, and code readability. This guide explains how to structure modern HTML5 pages.

## Basic HTML5 Template

Every HTML5 document should start with this basic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Description of your page">
  <title>Page Title</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Your content here -->
  <script src="script.js"></script>
</body>
</html>
```

## Semantic Structural Elements

### Header

The `<header>` element represents introductory content or navigational aids:

```html
<header>
  <h1>Site Title</h1>
  <nav>
    <!-- Navigation menu -->
  </nav>
</header>
```

### Navigation

The `<nav>` element represents a section of navigation links:

```html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

### Main Content

The `<main>` element represents the main content of the document:

```html
<main>
  <article>
    <h2>Article Title</h2>
    <p>Article content...</p>
  </article>
</main>
```

### Article

The `<article>` element represents a self-contained composition:

```html
<article>
  <header>
    <h2>Article Title</h2>
    <p>Published on <time datetime="2023-04-15">April 15, 2023</time></p>
  </header>
  <p>Article content...</p>
  <footer>
    <p>Author: John Doe</p>
  </footer>
</article>
```

### Section

The `<section>` element represents a standalone section of content:

```html
<section>
  <h2>Section Heading</h2>
  <p>Section content...</p>
</section>
```

### Aside

The `<aside>` element represents content tangentially related to the content around it:

```html
<aside>
  <h3>Related Information</h3>
  <ul>
    <li><a href="#">Related Link 1</a></li>
    <li><a href="#">Related Link 2</a></li>
  </ul>
</aside>
```

### Footer

The `<footer>` element represents a footer for its nearest sectioning content:

```html
<footer>
  <p>&copy; 2024 Your Company. All rights reserved.</p>
  <nav>
    <ul>
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/terms">Terms of Service</a></li>
    </ul>
  </nav>
</footer>
```

## Other Semantic Elements

### Figure and Figcaption

Used for illustrations, diagrams, photos, code listings, etc.:

```html
<figure>
  <img src="image.jpg" alt="Description of image">
  <figcaption>Caption for the image</figcaption>
</figure>
```

### Time

Represents a specific period in time:

```html
<p>The event starts at <time datetime="2024-04-20T19:00">7 PM on April 20</time>.</p>
```

### Mark

Represents text that is highlighted:

```html
<p>The most <mark>important</mark> part of the text.</p>
```

### Details and Summary

Creates an interactive disclosure widget:

```html
<details>
  <summary>Click to show more information</summary>
  <p>Additional information that is initially hidden.</p>
</details>
```

## Complete Page Example

Here's how these elements come together in a complete page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Example of HTML5 structure">
  <title>HTML5 Structure Example</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>My Website</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <header>
        <h2>Article Title</h2>
        <p>Published on <time datetime="2024-03-01">March 1, 2024</time></p>
      </header>
      
      <section>
        <h3>First Section</h3>
        <p>Content of the first section...</p>
        <figure>
          <img src="image1.jpg" alt="Relevant image">
          <figcaption>Image caption</figcaption>
        </figure>
      </section>
      
      <section>
        <h3>Second Section</h3>
        <p>Content of the second section...</p>
      </section>
      
      <footer>
        <p>Author: Jane Smith</p>
      </footer>
    </article>
    
    <aside>
      <h3>Related Articles</h3>
      <ul>
        <li><a href="#">Related Article 1</a></li>
        <li><a href="#">Related Article 2</a></li>
      </ul>
      
      <details>
        <summary>More Information</summary>
        <p>Additional details that are initially hidden.</p>
      </details>
    </aside>
  </main>

  <footer>
    <p>&copy; 2024 My Website. All rights reserved.</p>
    <nav>
      <ul>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms of Service</a></li>
      </ul>
    </nav>
  </footer>

  <script src="script.js"></script>
</body>
</html>
```

## Benefits of Semantic HTML5

Using semantic HTML5 elements provides several advantages:

1. **Accessibility**: Screen readers can better interpret the page structure
2. **SEO**: Search engines understand the content hierarchy better
3. **Maintainability**: Code is more readable and easier to maintain
4. **Mobile Friendliness**: Semantic elements contribute to responsive design
5. **Future-Proofing**: Ensures compatibility with evolving web standards

## Conclusion

Structuring your HTML5 pages with semantic elements is essential for building accessible, SEO-friendly, and maintainable websites. By using the appropriate elements in the right context, you create web pages that are better understood by browsers, search engines, and assistive technologies. 