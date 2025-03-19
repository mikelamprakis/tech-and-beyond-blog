---
title: CSS Typography Best Practices
slug: css-typography-best-practices
date: 2024-03-04
excerpt: Learn how to create readable, accessible, and beautiful typography with CSS.
coverImage: https://picsum.photos/800/400?random=5
author: Tamara Joniec
---

# CSS Typography Best Practices

Typography is a fundamental aspect of web design that affects readability, user experience, and visual appeal. Here are best practices for implementing typography with CSS.

## Font Selection

### Use Web-Safe Fonts or Web Fonts

```css
/* Web-safe font stack */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}
```

### Limit Font Families

- Use no more than 2-3 font families per website
- Typically, one for headings and one for body text

## Font Size and Responsiveness

### Use Relative Units

```css
html {
  font-size: 16px; /* Base font size */
}

h1 {
  font-size: 2.5rem; /* 40px at base size */
}

p {
  font-size: 1rem; /* 16px at base size */
}

/* For smaller screens */
@media (max-width: 768px) {
  html {
    font-size: 14px; /* Reduce base size */
  }
}
```

## Line Height

### Set Appropriate Line Height

```css
body {
  line-height: 1.5; /* Good for body text */
}

h1, h2, h3 {
  line-height: 1.2; /* Tighter for headings */
}
```

## Text Spacing

### Use Adequate Spacing

```css
p {
  margin-bottom: 1.5em; /* Space between paragraphs */
}

h2 {
  margin-top: 2em; /* Space before new sections */
  margin-bottom: 0.5em; /* Space after heading */
}

.content {
  max-width: 70ch; /* Optimal line length for readability */
}
```

## Text Color and Contrast

### Ensure Sufficient Contrast

```css
body {
  color: #333; /* Dark gray, not pure black */
  background-color: #fff;
}

/* For dark mode */
@media (prefers-color-scheme: dark) {
  body {
    color: #f0f0f0; /* Light gray, not pure white */
    background-color: #121212;
  }
}
```

## Font Weight and Style

### Use Font Weight Purposefully

```css
h1, h2, h3 {
  font-weight: 700; /* Bold */
}

p {
  font-weight: 400; /* Regular */
}

.highlight {
  font-weight: 600; /* Semi-bold for emphasis */
}
```

## Text Alignment

### Use Left Alignment Generally

```css
body {
  text-align: left; /* Best for most languages that read left-to-right */
}

.center-text {
  text-align: center; /* For specific elements like titles */
}
```

## Letter Spacing

### Adjust Letter Spacing for Headings

```css
h1, h2 {
  letter-spacing: -0.02em; /* Slightly tighter for large headings */
}

.all-caps {
  text-transform: uppercase;
  letter-spacing: 0.05em; /* More space for uppercase text */
}
```

## Text Decoration

### Use Text Decoration Purposefully

```css
a {
  text-decoration: none;
  border-bottom: 1px solid currentColor; /* More subtle than underline */
}

a:hover {
  border-bottom-width: 2px; /* Strengthen on hover */
}
```

## Accessibility

### Support Font Resizing

```css
/* Use relative units throughout */
p {
  font-size: 1rem;
  margin-bottom: 1.5em;
  line-height: 1.5;
}
```

### Support User Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

## Mobile Typography

### Adjust Size for Mobile

```css
h1 {
  font-size: 2.5rem;
}

@media (max-width: 480px) {
  h1 {
    font-size: 2rem; /* Smaller on mobile */
  }
}
```

## Conclusion

Good typography is the foundation of good web design. By following these principles, you can create more readable, accessible, and visually appealing content for your users.

Always test your typography on different devices and screen sizes to ensure a consistent experience for all users. 