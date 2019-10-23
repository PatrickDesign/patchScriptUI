// function colorChanger()
// {
//     function getColor()
//     {
//         function getColorNum()
//         {
//             return Math.floor(Math.random() * 255);
//         }
//         var rgb = {
//             r: getColorNum(),
//             g: getColorNum(),
//             b: getColorNum()
//         }
//         return `rgb(${rgb.r},${rgb.g}, ${rgb.b})`;
//     }
//     function behavior()
//     {
//         //get initial color:
//         $(this).css("background-color", getColor());
//         //Setup actual event handler:
//         $(this).on("click", function () {
//             $(this).css("background-color", getColor());
//         });
//     }
//     return ({
//         template: `<div style="width:250px;height:250px">
//                    </div>`,
//         behavior
//     })
// }
export default function colorChangerTutorial() {
    function getColor() {
        function getColorNum() {
            return Math.floor(Math.random() * 255);
        }
        var rgb = {
            r: getColorNum(),
            g: getColorNum(),
            b: getColorNum()
        }
        return `rgb(${rgb.r},${rgb.g}, ${rgb.b})`;
    }
    function behavior() {
        //get initial color:
        $(this).css("background-color", getColor());
        //Setup actual event handler:
        $(this).on("click", function () {
            $(this).css("background-color", getColor());
        });
    }
    return ({
        template: `<div style="width:250px;height:250px">
                   </div>`,
        behavior
    })
}