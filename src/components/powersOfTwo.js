//A component that returns it's options in an async fashion!
export default async function powersOfTwo() {
    //define props
    var lastPowerOfTwo = 2;
    var numberFact = await axios.get(`http://numbersapi.com/${lastPowerOfTwo}/trivia?noFound=default`).then(numData => numData.data);

    function behavior() {
        $(this).find("li").first().on("click", async function () {
            var lastSibling = $(this).siblings().last();


            if (!lastSibling.length)

                lastSibling = $(this);

            var newPowerOfTwo = lastPowerOfTwo * 2;
            lastPowerOfTwo = newPowerOfTwo;

            numberFact = await axios.get(`http://numbersapi.com/${newPowerOfTwo}/trivia?noFound=default`).then(numData => numData.data);

            $(`<li>${numberFact}</li>`).insertAfter(lastSibling);
        });
    }

    return ({
        template: `<ul>
                    <li>${numberFact}</li>
                  </ul>`,
        behavior
    })
}