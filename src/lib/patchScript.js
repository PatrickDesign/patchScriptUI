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

    //DOM utility functions:
    this.insertAfter = function(elementToInsert, referenceElement)
    {
        referenceElement.parentNode.insertBefore(elementToInsert, referenceElement.nextSibling);
    }

    this.insertBefore = function(elementToInsert, referenceElement)
    {
        referenceElement.parentNode.insertBefore(elementToInsert, referenceElement);
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
        const container = this.containers.find(container => container.elementToAttachTo.id === containerID);

        if(container)
        {
            //Todo:
                //empty container of any existing components
                //insert component into container
                //insert container into DOM
            container.elementToAttachTo.innerHTML = '';
            container.elementToAttachTo.appendChild(component);
            
            //Check if container is already on the page. In this case, the 
                //component is being re-rendered, so we don't need to attatch the container.
            var containerNotInDOM = !document.getElementById(container.elementToAttachTo.id);
            if(containerNotInDOM)
            {
                if (container.isFirstChild) 
                {
                    //Directly prepend to previous node:
                    container.previousNode.prepend(container.elementToAttachTo);
                }
                else 
                {
                    //else, we need to be inserted after a sibling.
                    this.insertAfter(container.elementToAttachTo, container.previousNode);

                    //If previousSibling was component, we need to remove the placeholder <section> we placed.
                    if (container.previousNodeIsComponent)
                    {
                        container.previousNode.parentElement.removeChild(container.previousNode);
                    }
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
            var indexOfContainer = this.containers.findIndex(el => el.elementToAttachTo.id === containerID);
            if(indexOfContainer > -1)
            {
                this.containers.splice(indexOfContainer, 1);
            }


            var container = document.getElementById(containerID);

            if(container.tagName !== "BODY")
            {
                //First, find previous node

                //Check if parent has only one child. If so, our previousNode is our parent and we are a firstChild.

                //If the parent has more than one child, record the direct previous sibling
                    //if no direct sibling up the tree, then again, our previous node is our parent, and we are a firstChild
                var parent = container.parentElement,
                    parentsChildren = parent.children,
                    previousSibling = container.previousElementSibling;

                //If we are an only child, or the first child.
                if(parentsChildren.length === 1 || !previousSibling)
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
                        //insert a temporary <section> tag to use as a temp previous node.
                        //We'll remove it if our component is ever rendered.
                    var siblingIsComponent = containerIDs.includes(previousSibling.id) || this.containers.includes(containerObj => containerObj.elementToAttachTo.id === previousSibling.id);

                    if(siblingIsComponent)
                    {
                        var placeHolder = document.createElement('section');
                        placeHolder.setAttribute('aria-hidden', 'true');
                        
                        this.insertAfter(placeHolder, previousSibling);
                        previousSibling = placeHolder;
                    }

                    this.containers.push(
                        new Container(previousSibling, container, false, siblingIsComponent)
                    )
                }
                //remove the container from the DOM until it eventually gets rendered... maybe...
                containersToRemove.push(container);
            } 
        }
        containersToRemove.forEach(el => el.parentElement.removeChild(el));
    }.bind(this);

    //Removes the component and container from the DOM.
        //Then re-registers the container for possible re-use.
    this.detatchComponent = function(componentToDetatch)
    {
        const containerOfComponent = componentToDetatch.parentElement;
        containerOfComponent.innerHTML = ''; //delete the component that was being held
        const indexOfContainerToDetatch = this.containers.findIndex(el => el.elementToAttachTo.id === containerOfComponent.id);
        this.containers.splice(indexOfContainerToDetatch, 1);

        //Maybe should create a 'recycle container' function
        this.registerContainers(containerOfComponent.id);
    }.bind(this);

    this.getUniqueID = function()
    {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }

    return ({
        createComponent,
        registerContainers,
        detatchComponent,
        getUniqueID
    })

})();