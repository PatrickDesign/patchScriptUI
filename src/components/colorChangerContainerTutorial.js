import colorChangerTutorial from './colorChangerTutorial.js';

export default function colorChangerContainer(numColorChangers) {
    var colorChangerIDs = [];
    for (var i = 0; i < numColorChangers; i++) {
        //The library provides a function to get a uniqueID
        colorChangerIDs.push(patchScript.getUniqueID())
    }
    function behavior() {
        //Register all of our containers:
        patchScript.registerContainers(colorChangerIDs);
        //Render all child colorChangers:
        for (const uniqueID of colorChangerIDs) {
            patchScript.createComponent(colorChangerTutorial(), uniqueID)
        }
    }
    return ({
        template: `<div>
                <h1>Here are ${numColorChangers} colorChangers!</h1>
                ${colorChangerIDs.map(uniqueID => `<div
                                   id=${uniqueID}></div>`).join('')}
              </div>`,
        behavior
    });
}