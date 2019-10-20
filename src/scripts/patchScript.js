//Framework Rules:
//New Rule: all eventhandler functions will have the HTMLNode bound to 'this'.
//New Rule:  framework will automatically remove all div's that are targeted for anchoring
      //This way, the div won't be on the page if the component never gets rendered.

//Idea: 
    //User only passes in one function that gets executed once the DOM element has been created.
    //This is so the user can define all of their own event handlers, and also have a reference to the object.

const patchScript = (function (options) {

    //Will hold Container objects.
    this.containers = [];

    this.Container = function(previousNode, elementToAttachTo, isFirstChild, previousNodeIsComponent)
    {
        return {
            previousNode,
            elementToAttachTo,
            isFirstChild,
            previousNodeIsComponent
        }
    }

    this.createComponent = function (componentOptions, containerID) 
    {
        const container = document.createElement("div");
        container.innerHTML = componentOptions.template;
        const component = container.firstChild;
        
        //Now we have a DOM node.  
        //attach component to DOM:
            //This involves reattaching the container to the dom, then rendering the component.
        this.renderComponentToDOM(component, containerID);

        //Let's run the user's provided behavior function to apply the user's settings
        //User's behavior function runs AFTER the component is attatched to the dom.
            //this allows for child components.
        Object.defineProperty(component, "patchScriptUIContainerID", { configurable: false, writable: false, value: containerID });
        componentOptions.behavior.call(component);

        //Return a reference to the created DOM node.
        return component;
    }.bind(this);

    this.renderComponentToDOM = function(component, containerID)
    {
        //First, find the container in this.containers.
        const container = this.containers.find(container => container.elementToAttachTo.attr("id") === containerID);

        if(container)
        {
            //Todo:
                //empty container of any existing components
                //insert component into container
                //insert container into DOM
            container.elementToAttachTo.html('');
            container.elementToAttachTo.prepend(component);
            
            //Check if container is already on the page. In this case, the 
                //component is being re-rendered, so we don't need to attatch the container.
            var containerNotInDOM = !$(`#${container.elementToAttachTo.attr("id")}`).length
            if(containerNotInDOM)
            {
                if (container.isFirstChild) {
                    //Directly prepend to previous node:
                    container.previousNode.prepend(container.elementToAttachTo);
                }
                else {
                    //else, we need to be inserted after a sibling.
                    container.elementToAttachTo.insertAfter(container.previousNode);

                    //If previousSibling was component, we need to remove the placeholder <section> we placed.
                    if (container.previousNodeIsComponent)
                        container.previousNode.remove();
                }
            }
        }
    }.bind(this)
    
    //Behavior:
        //Removes the container divs from the page, but keeps reference to it's position so we
        //can replace if the component gets rendered.  This way, we can keep the markup clean, and not littered with 
        //empty div tags.  This also allows us to put more logic into our layout as a result.
    this.registerContainers = function(containerIDs)
    {
        //This line allows us to accept a single ID OR an arry of ID's.
        containerIDs = [].concat(containerIDs || []);

        var containersToRemove = [];

        //Edge Case: our container is the body element.  In this case, do nothing.
        for(const containerID of containerIDs)
        {

            //This allows child containers to be rendered correctly
            var indexOfContainer = this.containers.findIndex(el => el.elementToAttachTo.attr("id") === containerID);
            if(indexOfContainer > -1)
            {
                this.containers.splice(indexOfContainer, 1);
            }


            var container = $("#" + containerID);

            if(container.prop("tagName") !== "BODY")
            {
                //First, find previous node

                //Check if parent has only one child. If so, our previousNode is our parent and we are a firstChild.

                //If the parent has more than one child, record the direct previous sibling
                    //if no direct sibling up the tree, then again, our previous node is our parent, and we are a firstChild
                var parent = container.parent(),
                    parentsChildren = parent.children();

                if(parentsChildren.length === 1)
                {
                    //Our previousNode is the parent.
                    this.containers.push(
                        new Container(parent, container, true, false)
                    )
                }
                else
                {
                    var previousSibling = container.prev();
                    if(previousSibling.length === 0)
                    {
                        //Our previousNode is the parent.
                        this.containers.push(
                            new Container(parent, container, true, false)
                        )
                    }
                    else
                    {
                        //We have a previous sibling.
                        //IF THE PREVIOUS SIBLING IS A COMPONENT:
                            //insert a temporary <section tag> to use as a temp previous node.
                            //We'll remove it if our component is ever rendered.
                        var siblingIsComponent = containerIDs.includes($(previousSibling).attr("id")) || this.containers.includes(containerObj => containerObj.elementToAttachTo.attr("id") === $(previousSibling).attr("id"));

                        if(siblingIsComponent)
                        {
                            var placeHolder = $("<section aria-hidden='true'></section>");
                            placeHolder.insertAfter(previousSibling);
                            previousSibling = placeHolder;
                        }

                        this.containers.push(
                            new Container(previousSibling, container, false, siblingIsComponent)
                        )
                    }
                }
                //remove the container from the DOM until it eventually gets rendered... maybe...
                containersToRemove.push(container);
            } 
        }
        containersToRemove.forEach(el => el.remove());
    }.bind(this);

    //Removes the component and container from the DOM.
        //Then re-registers the container for possible re-use.
    this.detatchComponent = function(componentToDetatch)
    {
        const containerOfComponent = $(componentToDetatch).parent();
        containerOfComponent.html(''); //delete the component that was being held
        const indexOfContainerToDetatch = this.containers.findIndex(el => el.elementToAttachTo.attr("id") === containerOfComponent.attr("id"));
        this.containers.splice(indexOfContainerToDetatch, 1);

        //Maybe should create a 'recycle container' function
        this.registerContainers(containerOfComponent.attr("id"));
    }.bind(this);

    return {
        createComponent,
        registerContainers,
        detatchComponent
    }

})();