// Framework Rules:
//New Rule: all eventhandler functions will have the HTMLNode bound to 'this' AND get passed the component props.

//Idea: 
//User only passes in one function that gets executed once the DOM element has been created.

const patchScript = (function (options) {

    this.createComponent = function (componentOptions) {
        const container = document.createElement("div");
        container.innerHTML = componentOptions.template;
        const component = container.firstChild;

        //Now, component.firstChild is our componentHTML.
        //We have a DOM node.  Let's run the user's provided behavior function to apply the user's settings
        componentOptions.behavior.call(component);

        // this.bindEvents(container, componentOptions);

        //attach component to DOM:
        document.getElementById(componentOptions.elementID).appendChild(component);

    }.bind(this);

    // this.bindEvents = function(component, componentOptions)
    // {
    //   if(componentOptions.hasOwnProperty("eventHandlers"))
    //     {
    //       const eventHandlers = Object.entries(componentOptions.eventHandlers);
    //       for (const [eventName, handlerFunc] of eventHandlers) {
    //         component.firstChild.addEventListener(eventName, handlerFunc.bind(component.firstChild));
    //         console.log("eventname: " + eventName + " funcName: " + handlerFunc.name + " child: " + component.firstChild.outerHTML)
    //       }
    //       // componentRenderQueue
    //     }
    // }.bind(this);

    return {
        createComponent
    }

})();