export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  content: string;
  source: string;
}

// Blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: "getting-started-with-react",
    slug: "getting-started-with-react",
    title: "Getting Started with React",
    date: "2024-03-09",
    excerpt: "Learn the basics of React and how to create your first component.",
    coverImage: "https://picsum.photos/800/400?random=1",
    source: "markdown",
    content: `
# Getting Started with React

React is a popular JavaScript library for building user interfaces, particularly single-page applications. It's used by many large companies including Facebook, Instagram, Netflix, and Airbnb.

## Why React?

React offers several advantages:

- **Component-Based**: Build encapsulated components that manage their own state
- **Declarative**: Design simple views for each state in your application
- **Learn Once, Write Anywhere**: Develop new features without rewriting existing code

## Setting Up Your First React App

The easiest way to start with React is by using Create React App:

\`\`\`bash
npx create-react-app my-first-app
cd my-first-app
npm start
\`\`\`

This will create a new React application and start a development server.

## Creating Your First Component

Here's a simple React component:

\`\`\`jsx
import React from 'react';

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

export default Welcome;
\`\`\`

You can use this component in another component like this:

\`\`\`jsx
import React from 'react';
import Welcome from './Welcome';

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
\`\`\`

## State and Lifecycle

React components can have state and lifecycle methods. Here's an example of a component with state:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Conclusion

This is just the beginning of your React journey. As you continue to learn, you'll discover more advanced concepts like context, hooks, and more.

Happy coding!`
  },
  {
    id: "typescript-best-practices",
    slug: "typescript-best-practices",
    title: "TypeScript Best Practices",
    date: "2024-03-08",
    excerpt: "Discover how to write better TypeScript code with these tips.",
    coverImage: "https://picsum.photos/800/400?random=2",
    source: "markdown",
    content: `
# TypeScript Best Practices

TypeScript has become the language of choice for many developers building large-scale applications. Here are some best practices to help you write cleaner, more maintainable TypeScript code.

## Use Strict Mode

Always enable strict mode in your TypeScript configuration to catch more errors:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

This enables several strict type-checking options, including:

- \`noImplicitAny\`
- \`strictNullChecks\`
- \`strictFunctionTypes\`
- \`strictBindCallApply\`

## Define Types for Everything

Be explicit about your types. This helps catch errors and provides better documentation:

\`\`\`typescript
// Bad
let age = 30;
let name = 'John';

// Good
let age: number = 30;
let name: string = 'John';
\`\`\`

## Use Interfaces for Objects

Always define interfaces for objects to ensure type safety:

\`\`\`typescript
// Define an interface
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
}

// Use the interface
function getUserInfo(user: User): string {
  return \`\${user.name} (\${user.email})\`;
}
\`\`\`

## Avoid \`any\` Type

The \`any\` type defeats the purpose of using TypeScript. Use it sparingly:

\`\`\`typescript
// Bad
function getUser(id: any): any {
  // ...
}

// Good
interface User {
  id: number;
  name: string;
}

function getUser(id: number): User {
  // ...
  return { id, name: 'John' };
}
\`\`\`

## Use Type Guards

Type guards help you narrow down the type of a variable:

\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processValue(value: unknown): void {
  if (isString(value)) {
    // TypeScript knows value is a string here
    console.log(value.toUpperCase());
  }
}
\`\`\`

## Conclusion

Following these best practices will help you write more robust TypeScript code. Remember, the goal is to catch errors at compile time rather than runtime.

Happy coding!`
  },
]; 