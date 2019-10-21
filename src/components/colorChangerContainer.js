import colorChanger from './colorChanger.js';

//First example of component that renders children.
export default function colorChangerContainer(numColorChangers) {
    var colorChangers = [];

    const removeFromContainer = function (componentToRemove) {
        const indexOfComponent = colorChangers.findIndex(el => el === componentToRemove && patchScript.detatchComponent(componentToRemove));
        if(indexOfComponent > -1)
            colorChangers.splice(indexOfComponent, 1);
    };

    function behavior() {

        var containersToRegister = [];

        //register all containers:
        for (var i = 0; i < numColorChangers; i++) {
            patchScript.registerContainers(`${i}`);
            colorChangers.push(patchScript.createComponent(colorChanger({removeFromContainer}), `${i}`));
        }
    }

    return ({
        template: `<div>
                      <h1>Here are my favorite colors... I hope you like them!</h1>
                      <div class="row">
                        ${Array(numColorChangers).join(0).split(0).map((el, index) => `<div class="col-sm-3" id=${index}></div>`).join('')}
                      </div>
                  </div>
        `,
        behavior
    })

}