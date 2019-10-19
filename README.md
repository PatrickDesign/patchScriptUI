# patchScriptUI
A UI framework for people who already know JavaScript DOM manipulation and event handling.

============
# Feature List
============

>Potential container divs are removed from the DOM until a component is rendered using that container.
>patchScript.createComponent(componentOptions, containerID) now returns a reference to the HTMLNode of the created component.


==============
Things to note
==============

>User's behavior() function runs AFTER the element is attatched to the DOM.  This allows for more straightfoward child-component rendering.
	NOTE: This does not prevent the user from being able to fetch data before the component is rendered.  If any of the 'props' of the componet are
		async, then the component will not be rendered until those have been resolved.
		Alternatively, the user could return a template of 'placeholder' data, and in the behavior() function could start fetching data in the background,
			THEN manipulate itself to display the fetched data.


============
# Requirements
============

>A component is defined as: 
	{
		template: htmlTemplateLiteral
		bahavior: function()
	}.

These objects can be created inline, but it's nice to write a reusable function that returns a component object.
This allows the componet to have 'props' and stateful behaviors.


>Component templates need to have at least 1 outer HTML element that wraps around the whole thing.  
	i.e. a <div> or a <ul>, really any html tag will work.


==========
# Public API
==========

>patchScript.registerContainer(containerID)
>patchScript.createComponent(componentOptions, anchorElementID)
>patchScript.detatchComponent(component)