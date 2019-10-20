import powersOfTwo from './components/powersOfTwo.js';
import treatList from './components/treatList.js';
import userListItem from './components/userListItem.js';
import colorChangerContainer from './components/colorChangerContainer.js';
import loginForm from './components/loginForm.js';


//===================================
// Sample Data to pass to components:
//===================================

const myUsers = [
    {
        firstName: "Michelle",
        lastName: "Michelleson",
        age: 92,
        weight: "please don't ask that"
    },
    {
        firstName: "Patrick",
        lastName: "Wees",
        age: 21,
        weight: "prefer not to answer"
    }
];

const myFavoriteTreats = [
    "Sour Patch Kids",
    "Sour Patch Parents (walmart exclusive)",
    "Redvines (stale)",
    "hot DOGS.  From costco tho."
]

//===================================
// End Global Data
//===================================

patchScript.registerContainers([
    'renderHere', 
    'renderHere2', 
    'favoriteTreats', 
    'powersOfTwo', 
    'colorChanger', 
    'colorChangerContainer',
    'loginForm',
    'anotherLogin'
]);

//Actually create components and render them.
patchScript.createComponent(userListItem(myUsers[0]), 'renderHere');
patchScript.createComponent(userListItem(myUsers[1]), 'renderHere2');
patchScript.createComponent(treatList(myFavoriteTreats), 'favoriteTreats');

//Render an async component:
var powerOfTwoComponent = powersOfTwo().then(twoComponent => {
    patchScript.createComponent(twoComponent, 'powersOfTwo');
});

//Render a component with children!!
patchScript.createComponent(colorChangerContainer(48), 'colorChangerContainer')
patchScript.createComponent(loginForm(), 'loginForm');
