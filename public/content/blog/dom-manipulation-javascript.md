---
title: DOM Manipulation with JavaScript
slug: dom-manipulation-javascript
date: 2024-03-03
excerpt: Learn how to efficiently manipulate the DOM using vanilla JavaScript.
coverImage: https://picsum.photos/800/400?random=6
author: Tamara Joniec
---

# DOM Manipulation with JavaScript

The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content. This guide covers how to manipulate the DOM using vanilla JavaScript.

## Selecting Elements

### By ID

```javascript
const element = document.getElementById('myElement');
```

### By Class

```javascript
const elements = document.getElementsByClassName('myClass');
// Returns HTMLCollection, not an array
```

### By Tag Name

```javascript
const paragraphs = document.getElementsByTagName('p');
```

### Using CSS Selectors

```javascript
// Select first matching element
const element = document.querySelector('.myClass');

// Select all matching elements
const elements = document.querySelectorAll('div.note, div.alert');
// Returns NodeList
```

## Creating Elements

### Creating New Elements

```javascript
const div = document.createElement('div');
const textNode = document.createTextNode('Hello World');
div.appendChild(textNode);
```

### Adding Elements to the DOM

```javascript
// Append at the end of parent element
parentElement.appendChild(newElement);

// Insert before a specific element
parentElement.insertBefore(newElement, referenceElement);

// Using newer methods
parentElement.append(element1, element2, 'text node');
parentElement.prepend(element);
referenceElement.before(element);
referenceElement.after(element);
```

## Modifying Elements

### Changing Content

```javascript
// Set HTML content (potential security risk with user input)
element.innerHTML = '<span>New content</span>';

// Set text content (safer)
element.textContent = 'New content';

// Legacy method
element.innerText = 'New content';
```

### Modifying Attributes

```javascript
// Get attribute
const value = element.getAttribute('src');

// Set attribute
element.setAttribute('class', 'new-class');

// Remove attribute
element.removeAttribute('disabled');

// Check if attribute exists
const hasAttribute = element.hasAttribute('id');

// Direct property access for common attributes
element.id = 'newId';
element.className = 'class1 class2';
element.src = 'image.jpg';
```

### Working with Classes

```javascript
// Add class
element.classList.add('active');

// Remove class
element.classList.remove('disabled');

// Toggle class
element.classList.toggle('expanded');

// Replace class
element.classList.replace('old-class', 'new-class');

// Check if class exists
const hasClass = element.classList.contains('highlighted');
```

### Modifying Styles

```javascript
// Direct inline styles
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.cssText = 'color: red; background-color: blue;';

// Get computed style
const computedStyle = window.getComputedStyle(element);
const color = computedStyle.getPropertyValue('color');
```

## Removing Elements

```javascript
// Remove from parent
element.parentNode.removeChild(element);

// Modern method
element.remove();
```

## Event Handling

### Adding Event Listeners

```javascript
element.addEventListener('click', function(event) {
  console.log('Element clicked!');
  // Access the target element
  console.log(event.target);
  // Prevent default behavior
  event.preventDefault();
});
```

### Removing Event Listeners

```javascript
function handleClick(event) {
  console.log('Clicked!');
}

element.addEventListener('click', handleClick);
// Later when you want to remove it:
element.removeEventListener('click', handleClick);
```

## Traversing the DOM

### Parent, Children, and Siblings

```javascript
// Get parent
const parent = element.parentNode; // or parentElement

// Get children
const children = element.childNodes; // includes text nodes, comments
const elementChildren = element.children; // only element nodes

// First and last child
const firstChild = element.firstChild; // might be a text node
const firstElementChild = element.firstElementChild;
const lastChild = element.lastChild;
const lastElementChild = element.lastElementChild;

// Siblings
const nextSibling = element.nextSibling; // might be a text node
const nextElementSibling = element.nextElementSibling;
const previousSibling = element.previousSibling;
const previousElementSibling = element.previousElementSibling;
```

## Performance Considerations

### Document Fragments

Use document fragments for batch operations to minimize reflows:

```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}

// Only one reflow/repaint here
document.getElementById('myList').appendChild(fragment);
```

### Element Cloning

```javascript
// Clone without events/children
const shallowClone = element.cloneNode(false);

// Clone with all descendants
const deepClone = element.cloneNode(true);
```

## Conclusion

Effective DOM manipulation is crucial for building interactive web applications. By understanding these core concepts, you can create more efficient and responsive user interfaces without relying on external libraries.

Remember to minimize direct DOM manipulations for better performance, especially in loops or frequently executed code. 