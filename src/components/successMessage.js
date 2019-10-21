export default function successMessage(username, onSuccessMessageClose)
{

    function behavior()
    {
        const component = this;
        $(this).find("#closeButton").on("click", function(){
            onSuccessMessageClose();
        })
    }

    return ({
        template: `<div class="jumbotron">
                    <h3 style="width:70%; display:inline-block;">Welcome to your dashboard, ${username}!</h3>
                    <div style="width:30%; display:inline-block; font-size:3em; cursor: pointer" id="closeButton">X</div>
                   </div>`,
        behavior
    });

}