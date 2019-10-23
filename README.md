# patchScriptUI
A UI framework for people who already know JavaScript DOM manipulation and event handling.
[Click here to view a brief tutorial with examples!](https://medium.com/@patrickwees/flexible-javascript-components-w-o-the-overhead-b0c5c0dcb42e?source=friends_link&sk=99c4370a3ae8aa2c7f990401185240a3)

The example files are using the new js module syntax, so you may need to serve the directory locally to view them.  I use [npm serve](https://www.npmjs.com/package/serve).

# Feature List

  * Potential container divs are removed from the DOM until a component is rendered using that container.
  * patchScript.createComponent(componentOptions, containerID) now returns a reference to the HTMLNode of the created component.


# Things to note

  * User's behavior() function runs AFTER the element is attatched to the DOM.  This allows for more straightfoward child-component rendering.
	NOTE: This does not prevent the user from being able to fetch data before the component is rendered.  If any of the 'props' of the componet are
		async, then the component will not be rendered until those have been resolved.
		Alternatively, the user could return a template of 'placeholder' data, and in the behavior() function could start fetching data in the background,
			THEN manipulate itself to display the fetched data.
  * The property ```.patchScriptUIContainerID``` is provided on the component element.  This allows you to re-render a component by calling the following from inside of the component itself:
  ```javascript
  	patchScript.createComponent(componentFunctionName(), this.patchScriptUIContainerID)
  ```
  * Once a container is registered, it's remembered.  This means that you can call ```patchScript.detatch('myContainerID')``` and both the component and the container will be removed from the DOM.  You can then render another component into the ```'myContainerID'``` container without having to re-register it.


# Requirements

  * A component is defined as:
  ```javascript
	{
		template: htmlTemplateLiteral,
		behavior: function()
	}
  ```

These objects can be created inline, but it's nice to write a reusable function that returns a component object.
This allows the componet to have 'props' and stateful behaviors.


  * Component templates need to have at least 1 outer HTML element that wraps around the whole thing.  
	i.e. a `<div>` or a `<ul>`, really any html tag will work.


# Public API

  * patchScript.registerContainer(containerID)
  * patchScript.createComponent(componentOptions, containerID)
  * patchScript.detatch(containerID)
  * patchScript.getUniqueID()
