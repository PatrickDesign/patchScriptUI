export default function colorChanger(removeFromContainer) {

    var numberOfTimesClicked = 0;

    function getColor() {
        return Math.random() * Math.floor(255)
    }

    function behavior() {

        var rgb = {
            r: getColor(),
            g: getColor(),
            b: getColor()
        }

        $(this).css("background-color", `rgb(${rgb.r},${rgb.g}, ${rgb.b})`);

        $(this).on("click", function () {

            numberOfTimesClicked++;

            if (numberOfTimesClicked === 5) {
                return removeFromContainer(this);
            }

            rgb.r = getColor();
            rgb.g = getColor();
            rgb.b = getColor();

            $(this).css("background-color", `rgb(${rgb.r},${rgb.g}, ${rgb.b})`);

        });
    }

    return (
        {
            template: `<div style="width:250px;height:250px">
                     </div>`,

            behavior
        }
    )
}