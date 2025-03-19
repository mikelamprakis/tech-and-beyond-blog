---
title: JavaScript Promises and Async/Await
slug: javascript-promises-async-await
date: 2024-02-26
excerpt: Master asynchronous JavaScript with Promises and async/await patterns.
coverImage: https://picsum.photos/800/400?random=11
author: Tamara Joniec
---

# JavaScript Promises and Async/Await

Asynchronous programming is a fundamental part of JavaScript, especially when working with operations like fetching data from servers, reading files, or handling user interactions. This guide explores two powerful patterns for managing asynchronous code: Promises and the async/await syntax.

## Understanding Asynchronous JavaScript

JavaScript is single-threaded, meaning it can only execute one piece of code at a time. Asynchronous programming allows operations to be performed without blocking the main thread.

### Callback Hell

Before Promises, asynchronous code often resulted in deeply nested callbacks, known as "callback hell":

```javascript
getData(function(data) {
  processData(data, function(processedData) {
    saveData(processedData, function(result) {
      displayData(result, function() {
        console.log('Data flow complete');
      }, handleDisplayError);
    }, handleSaveError);
  }, handleProcessError);
}, handleGetError);
```

This code is difficult to read, maintain, and debug. Promises and async/await provide cleaner alternatives.

## Promises

A Promise is an object representing the eventual completion or failure of an asynchronous operation.

### Promise States

A Promise can be in one of three states:
- **Pending**: Initial state, neither fulfilled nor rejected
- **Fulfilled**: The operation completed successfully
- **Rejected**: The operation failed

### Creating Promises

```javascript
const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation
  const success = true;
  
  if (success) {
    resolve('Operation succeeded');
  } else {
    reject(new Error('Operation failed'));
  }
});
```

### Using Promises

```javascript
myPromise
  .then(result => {
    console.log(result); // 'Operation succeeded'
    return 'Next step';
  })
  .then(nextResult => {
    console.log(nextResult); // 'Next step'
  })
  .catch(error => {
    console.error('Error:', error.message);
  })
  .finally(() => {
    console.log('Promise completed (successfully or not)');
  });
```

### Promise Chaining

Promises can be chained to perform sequential asynchronous operations:

```javascript
getData()
  .then(data => processData(data))
  .then(processedData => saveData(processedData))
  .then(result => displayData(result))
  .then(() => console.log('Data flow complete'))
  .catch(error => console.error('Error in data flow:', error));
```

### Multiple Promises

#### Promise.all()

Waits for all promises to be fulfilled or for one to be rejected:

```javascript
const promise1 = fetchUserData();
const promise2 = fetchUserPosts();
const promise3 = fetchUserFriends();

Promise.all([promise1, promise2, promise3])
  .then(([userData, userPosts, userFriends]) => {
    // All promises fulfilled
    displayUserProfile(userData, userPosts, userFriends);
  })
  .catch(error => {
    // At least one promise was rejected
    console.error('Failed to load user profile:', error);
  });
```

#### Promise.allSettled()

Waits for all promises to be settled, regardless of fulfillment or rejection:

```javascript
Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('Fulfilled:', result.value);
      } else {
        console.log('Rejected:', result.reason);
      }
    });
  });
```

#### Promise.race()

Returns as soon as one promise is settled (fulfilled or rejected):

```javascript
const timeoutPromise = new Promise((_, reject) => {
  setTimeout(() => reject(new Error('Request timed out')), 5000);
});

Promise.race([fetchData(), timeoutPromise])
  .then(data => console.log('Data received:', data))
  .catch(error => console.error('Error:', error.message));
```

#### Promise.any()

Returns as soon as one promise is fulfilled, or all promises are rejected:

```javascript
const server1 = fetchFromServer1();
const server2 = fetchFromServer2();
const server3 = fetchFromServer3();

Promise.any([server1, server2, server3])
  .then(firstSuccess => console.log('First successful response:', firstSuccess))
  .catch(error => console.error('All servers failed:', error));
```

## Async/Await

Async/await is syntactic sugar built on top of Promises, making asynchronous code look and behave more like synchronous code.

### Basic Syntax

```javascript
async function fetchUserData() {
  try {
    const response = await fetch('https://api.example.com/user');
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}
```

The `async` keyword marks a function as asynchronous, and the `await` keyword pauses execution until the Promise is fulfilled.

### Transforming Promise Chains

The callback hell example from earlier can be rewritten using async/await:

```javascript
async function processDataFlow() {
  try {
    const data = await getData();
    const processedData = await processData(data);
    const result = await saveData(processedData);
    await displayData(result);
    console.log('Data flow complete');
  } catch (error) {
    console.error('Error in data flow:', error);
  }
}
```

### Parallel Operations with async/await

Using `Promise.all` with async/await:

```javascript
async function loadUserProfile() {
  try {
    const [userData, userPosts, userFriends] = await Promise.all([
      fetchUserData(),
      fetchUserPosts(),
      fetchUserFriends()
    ]);
    
    displayUserProfile(userData, userPosts, userFriends);
  } catch (error) {
    console.error('Failed to load user profile:', error);
  }
}
```

### Async Arrow Functions

```javascript
const fetchData = async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
};
```

### Top-level await (ES2022)

In modern JavaScript modules, you can use await at the top level without an async function:

```javascript
// Only works in ES modules (not CommonJS)
const data = await fetch('https://api.example.com/data').then(r => r.json());
console.log(data);
```

## Error Handling

### With Promises

```javascript
fetchData()
  .then(processData)
  .then(displayData)
  .catch(error => {
    console.error('Error:', error);
    showErrorMessage(error);
  });
```

### With Async/Await

```javascript
async function getData() {
  try {
    const data = await fetchData();
    const processedData = await processData(data);
    await displayData(processedData);
  } catch (error) {
    console.error('Error:', error);
    showErrorMessage(error);
  } finally {
    hideLoadingSpinner();
  }
}
```

## Best Practices

### 1. Always Handle Errors

```javascript
// With Promises
fetchData()
  .then(data => {
    // Process data
  })
  .catch(error => {
    // Handle error
  });

// With Async/Await
async function getData() {
  try {
    const data = await fetchData();
    // Process data
  } catch (error) {
    // Handle error
  }
}
```

### 2. Use finally for Cleanup

```javascript
showLoadingSpinner();

fetchData()
  .then(data => {
    // Process data
  })
  .catch(error => {
    // Handle error
  })
  .finally(() => {
    hideLoadingSpinner();
  });
```

### 3. Avoid Mixing Promises and Callbacks

Stick to one pattern throughout your codebase for better consistency.

### 4. Remember That async Functions Always Return Promises

```javascript
async function getData() {
  return 'data';
}

// This logs Promise { 'data' }
console.log(getData());

// Use it as a Promise
getData().then(data => console.log(data)); // logs 'data'
```

### 5. Don't Overuse async/await

Not every function needs to be async. Only use it when you're dealing with Promises.

## Real-World Example

Here's a complete example of fetching and displaying user data using async/await:

```javascript
// Data fetching functions
async function fetchUserProfile(userId) {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }
  return response.json();
}

async function fetchUserPosts(userId) {
  const response = await fetch(`/api/users/${userId}/posts`);
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status}`);
  }
  return response.json();
}

// UI functions
function showLoadingState() {
  document.getElementById('profile').innerHTML = '<p>Loading...</p>';
}

function displayUserProfile(user, posts) {
  const profileDiv = document.getElementById('profile');
  
  profileDiv.innerHTML = `
    <h2>${user.name}</h2>
    <p>${user.email}</p>
    <h3>Posts (${posts.length})</h3>
    <ul>
      ${posts.map(post => `<li>${post.title}</li>`).join('')}
    </ul>
  `;
}

function showError(message) {
  document.getElementById('profile').innerHTML = `
    <div class="error">
      <p>Error: ${message}</p>
      <button id="retry">Retry</button>
    </div>
  `;
  
  document.getElementById('retry').addEventListener('click', loadUserData);
}

// Main function
async function loadUserData() {
  const userId = document.getElementById('user-id').value;
  
  showLoadingState();
  
  try {
    // Fetch user and posts in parallel
    const [user, posts] = await Promise.all([
      fetchUserProfile(userId),
      fetchUserPosts(userId)
    ]);
    
    displayUserProfile(user, posts);
  } catch (error) {
    console.error('Failed to load user data:', error);
    showError(error.message);
  }
}

// Event listener
document.getElementById('load-profile').addEventListener('click', loadUserData);
```

## Conclusion

Promises and async/await are powerful tools for managing asynchronous operations in JavaScript. While Promises provide a solid foundation, async/await offers a more readable and maintainable syntax for complex asynchronous code.

Choose the approach that best fits your use case:
- Use raw Promises for simpler operations or when composing multiple operations (with Promise.all, etc.)
- Use async/await for more complex flows or when readability is a priority

Both approaches will help you avoid callback hell and write cleaner, more maintainable asynchronous code. 