# Hook menu test
This is a proof of concept for an api that generates nav items based on hooks.

## Usage
Wrap any components that use toolbar hooks with a [`Parent`](https://github.com/alexwaeseperlman/hook-menu/blob/5449bf9b16e614920cc14aa9c85e85caa3aac40f/src/Parent.tsx#L96) component. Now these components can use the [`useToggle`](https://github.com/alexwaeseperlman/hook-menu/blob/5449bf9b16e614920cc14aa9c85e85caa3aac40f/src/Parent.tsx#L40) and [`useTextfield`](https://github.com/alexwaeseperlman/hook-menu/blob/5449bf9b16e614920cc14aa9c85e85caa3aac40f/src/Parent.tsx#L57) hooks. These hooks will generate inputs that render in the nav bar, and return their current values.

### Example code
This will add two inputs to the nav bar, and render their values
```javascript
function Child() {
  const [toggle, setToggle] = useToggle(false, "Toggle");
  const [text, setText] = useTextfield("", "Text box");
  return (
    <div>
        <div>Toggle: {toggle.toString()}</div>
        <div>Text: {text}</div>
    </div>
  );
}
```


## Is this architecture useful?
I'm not entirely sure. I am making this as a proof of concept to demonstrate one way we can generate the unique-to-each-view toolbars in [ePlant](https://bar.utoronto.ca/eplant/). We could leave rendering the toolbar as the responsibility of each view, but this might lead to a user experience that isn't consistent enough, and feels more like a set of separate programs. We could also allow each view to provide a configuration object for the toolbar, but that might require more boilerplate than a system with hooks like this.
