//Component with dynamic template.
export default function treatList(favoriteTreats) {
    function behavior() {
        $(this).find("li").on("click", function () {
            $(this).remove();
        });
    }

    return ({
        template: `<ul>
                    ${favoriteTreats.map(treat => `<li>${treat}</li>`).join('')}
                  </ul>`,
        behavior
    })
}