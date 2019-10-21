import colorChanger from './colorChanger.js';

export default function colorBoxCaptcha(onSuccessFunc)
{
    //get rand number between 3-5
    const numColorChangers = Math.random() * (6 - 3) + 3;
    const uniqueBoxIDs = [];

    var state = {
        colorBoxes: []
    }

    for(var i = 0; i < numColorChangers; i++)
    {
        uniqueBoxIDs.push(patchScript.getUniqueID());
    }

    const colorOptions = ['red', 'turquoise', 'pink', 'red'];

    function boxChangedColor()
    {
        var captchaIsValid = true,
            firstColor = $(state.colorBoxes[0]).css("background-color"),
            currColor;

        for(var i = 1; i < state.colorBoxes.length; i++)
        {
            currColor = $(state.colorBoxes[i]).css("background-color");
            if(firstColor !== currColor)
            {
                captchaIsValid = false;
                break;
            }
        }

        if(captchaIsValid)
        {
            onSuccessFunc();
        }
    }

    function behavior()
    {
        patchScript.registerContainers(uniqueBoxIDs);
        var currColorBox;
        for(var uniqueID of uniqueBoxIDs)
        {
            currColorBox = patchScript.createComponent(colorChanger({ colorOptions, colorChangedFunc: boxChangedColor, width: "100", height: "100" }), uniqueID);
            state.colorBoxes.push(currColorBox);
        }
    }

    return({
        template: `<div class="row">
                    <h4 class="col-sm-12">Prove you're human.  By making all the boxes the same color...</h4>
                    <p class="col-sm-12">A robot couldn't do that.</p>
                    ${uniqueBoxIDs.map(uniqueID => `<div class="col-sm-4" style="margin:10px" id=${uniqueID}></div>`).join('')}
                   </div>`,
        behavior
    })
}