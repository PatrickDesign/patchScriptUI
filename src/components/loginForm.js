import successMessage from './successMessage.js';
import colorBoxCaptcha from './colorBoxCaptcha.js';

export default function loginForm()
{
    var state = {
        usernameInput: {},
        passwordInput: {},
        form: {},
        successMessageComponent: {},
        colorBoxCaptchaComponent: {},
        component : {}
    }

    const successMessageUniqueID = patchScript.getUniqueID(),
          colorBoxCaptchaUniqueID = patchScript.getUniqueID();
    
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
                displayCaptcha();
            }
        }
    }

    function presubmitValidation()
    {
        return usernameInstaCheck(state.usernameInput) && passwordInstaCheck(state.passwordInput)
    }

    function displayCaptcha()
    {
        disableForm();
        state.colorBoxCaptchaComponent = patchScript.createComponent(colorBoxCaptcha(displaySuccess), colorBoxCaptchaUniqueID);
        $("#" + state.colorBoxCaptchaComponent.patchScriptUIContainerID).fadeIn();
    }

    function disableForm()
    {
        state.usernameInput.attr("disabled", "disabled");
        state.passwordInput.attr("disabled", "disabled");
    }

    //A function we'll pass to our child component. 
        //When the successMesage is closed, let's refresh the component
    function onSuccessMessageClose()
    {
        patchScript.createComponent(loginForm(), state.component.patchScriptUIContainerID)
    }

    //This is called when the captcha is successfully filled out
    function displaySuccess()
    {
        //Let's do a bit of animation
        //fade out the captcha and form
        $("#" + state.colorBoxCaptchaComponent.patchScriptUIContainerID).fadeOut();
        $(state.form).fadeOut("fast", function(){
            state.successMessageComponent = patchScript.createComponent(successMessage(state.usernameInput.val(), onSuccessMessageClose), successMessageUniqueID);
            $("#" + state.successMessageComponent.patchScriptUIContainerID).fadeIn();       
        })
    }

    function behavior()
    {
        state.usernameInput = $(this).find("input[name='username']");
        state.passwordInput = $(this).find("input[name='password']");
        state.form = $(this).find("form");
        state.component = this;

        //Register our potential successMessage and captcha containers
        patchScript.registerContainers([successMessageUniqueID, colorBoxCaptchaUniqueID]);

        state.usernameInput.on("keyup", function(){
            usernameInstaCheck(state.usernameInput);
        })

        state.passwordInput.on("keyup", function()
        {
            passwordInstaCheck(state.passwordInput);
        })

        //listen for a enter press to submit the form
        $(state.form).on("keydown", function(e){
            attemptSubmit(e);
        })
    }

    return({
        template: `<div style="padding:20px; display:inline-block; box-shadow: 5px 5px 5px rgba(68,68,68,0.6); border: 2px solid black; margin:30px">
                    <form>
                        <h1 style="color:red">A great interactive form!</h1>
                        <div>
                            <label for="username"><b>Username</b></label>
                            <input name="username" type="text"/>
                        </div>
                        <div>
                            <label for="password"><b>Password</b></label>
                            <input name="password" type="password"/>
                        </div>
                    </form>
                    <div id=${colorBoxCaptchaUniqueID} style="display:none"></div>
                    <div id=${successMessageUniqueID} style="display:none"></div>
                   </div>`,
        behavior
    })
}