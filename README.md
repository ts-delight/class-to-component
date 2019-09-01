# About

class-to-component is a simple library that takes in a class name and gives you back a react component which renders a container with that class name applied.

This is especially useful in conjunction with [css-modules](https://github.com/css-modules/css-modules) or css-in-js libraries like [typestyle](https://typestyle.github.io/#/).

## Basic usage:

```js
import classToComponent from '@ts-delight/class-to-component';

const C = classToComponent('foo');

// Now you can use C as a component:
const Container = () => <C />
// Renders <div className="foo" />
```

We can also pass multiple class names (which are combined using [classcat](https://github.com/jorgebucaran/classcat)):

```js
const C = classToComponent(['foo', 'bar']);
```

## Advanced Usage:

```js
const ListView = classToComponent({
    element: "span", // div by default
    class: ['foo', 'bar'],
    displayName: 'ListView'
    // Also see: https://github.com/ts-delight/inject-display-name.macro
});

// Later:
<ListView useCompactView />
```

# License

MIT
