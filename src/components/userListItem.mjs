//Component Declaration
export default function userListItem(user) {
    //Define component behavior:
    function behavior() {
        //our 'this' keyword is the HTMLNode that was created.  We can also access the 'user'
        //variable thanks to some cool js closures :)

        //For each <li> in our component, let's add an onclick function that reads it's innerHTML,
        //and alerts some prop value (just to test)
        $(this).find('li').on("click", function () {
            alert(`${$(this).html()} and my favorite name is ${user.firstName}`);
        });

    }

    return ({
        template: `<ul>
                      <li>User's firstName: ${user.firstName}</li>
                      <li>lastName: ${user.lastName}</li>
                      <li>age: ${user.age}</li>
                      <li>weight: ${user.weight}</li>
                    </ul>`,
        behavior
    });
}