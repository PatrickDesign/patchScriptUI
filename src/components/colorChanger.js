export default function colorChanger(props) {

    var numberOfTimesClicked = 0;

    function getColor() 
    {
        return Math.floor(Math.random() * 255);
    }

    function randomColorMode()
    {
        var rgb = {
            r: getColor(),
            g: getColor(),
            b: getColor()
        }

        $(this).css("background-color", `rgb(${rgb.r},${rgb.g}, ${rgb.b})`);

        $(this).on("click", function () {

            numberOfTimesClicked++;
            if (numberOfTimesClicked === 5) {
                return props.removeFromContainer(this);
            }

            rgb.r = getColor();
            rgb.g = getColor();
            rgb.b = getColor();

            $(this).css("background-color", `rgb(${rgb.r},${rgb.g}, ${rgb.b})`);
        });
    }

    function pickFromColorOptionsMode()
    {
        //get initial color:
        $(this).css("background-color", props.colorOptions[Math.floor(Math.random() * (props.colorOptions.length))]);

        $(this).on("click", function () {

            //set the background color from the list and run the colorChanged function
                //that was provided in props.
            var newColor = props.colorOptions[Math.floor(Math.random() * (props.colorOptions.length))]
            $(this).fadeOut("fast", function(){
                $(this).css("background-color", newColor);
                $(this).fadeIn("fast");

                if (props.colorChangedFunc) 
                {
                    props.colorChangedFunc();
                }
            })
        })
    }

    function behavior() 
    {
        if(props.removeFromContainer)
        {
            randomColorMode = randomColorMode.bind(this);
            randomColorMode();
        }
        else if(props.colorOptions)
        {
            pickFromColorOptionsMode = pickFromColorOptionsMode.bind(this);
            pickFromColorOptionsMode();
        }
    }

    return ({
            template: `<div style="width:${props.width ? props.width : `250`}px;height:${props.height ? props.height : `250`}px; border:"1px solid black">
                     </div>`,
            behavior
        }
    )
}