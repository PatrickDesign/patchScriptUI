import successMessage from './successMessage.js';

export default function loginForm()
{

    var state = {
        usernameInput: {},
        passwordInput: {},
        component : {}
    }
    
    function usernameInstaCheck(input)
    {
        const curVal = input.val();
        //username must be 3 characters and have only letters.
        if(curVal.length > 3 && !/\d/.test(curVal))
        {
            markInputAsValid(input)
            return true;
        }
        else
        {
            markInputAsInvalid(input)
            return false;
        }
    }

    function markInputAsValid(input)
    {
        input.css("outline-color", "green");
        input.css("border-color", "green");
    }

    function markInputAsInvalid(input)
    {
        input.css("outline-color", "red");
        input.css("border-color", "red");
    }

    function passwordInstaCheck(input)
    {
        const curVal = input.val();
        //Require at least 7 characters, and at least 1 number
        if (curVal.length > 3 && /\d/.test(curVal)) 
        {
            markInputAsValid(input)
            return true;
        }
        else 
        {
            markInputAsInvalid(input)
            return false;
        }
    }

    function attemptSubmit(event)
    {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (presubmitValidation()) {
                // $(this).submit();
                // disableForm(state);
                displaySuccess(state.usernameInput.val());
            }
        }
    }

    function presubmitValidation()
    {
        return usernameInstaCheck(state.usernameInput) && passwordInstaCheck(state.passwordInput)
    }

    function disableForm(form)
    {
        form.usernameInput.attr("disabled", "disabled").css("display", "none");
        form.passwordInput.attr("disabled", "disabled").css("display", "none");
    }

    //A function we'll pass to our child component. 
        //When the successMesage is closed, let's refresh the component
    function onSuccessMessageClose()
    {
        patchScript.createComponent(loginForm(), state.component.patchScriptUIContainerID)
    }

    function displaySuccess(username)
    {
        patchScript.createComponent(successMessage(username, onSuccessMessageClose), 'successMessage');
    }

    function behavior()
    {
        state.usernameInput = $(this).find("input[name='username']");
        state.passwordInput = $(this).find("input[name='password']");
        state.component = this;

        //Register our potential successMessage container
        patchScript.registerContainers('successMessage');

        state.usernameInput.on("keyup", function(){
            usernameInstaCheck(state.usernameInput);
        })

        state.passwordInput.on("keyup", function()
        {
            passwordInstaCheck(state.passwordInput);
        })

        //listen for a enter press to submit the form
        $(this).on("keydown", function(e){
            attemptSubmit(e);
        })
    }
    
    return({
        template: `<form>
                    <h1>A great interactive form!</h1>
                    <div>
                        <label for="username"><b>Username</b></label>
                        <input name="username" type="text"/>
                    </div>
                    <div>
                        <label for="password"><b>Password</b></label>
                        <input name="password" type="password"/>
                    </div>
                    <div id="successMessage"></div>
                   </form>`,
        behavior
    })
}