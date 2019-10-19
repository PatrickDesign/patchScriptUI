import powersOfTwo from './components/powersOfTwo.mjs';
import treatList from './components/treatList.mjs';
import userListItem from './components/userListItem.mjs';
import colorChangerContainer from './components/colorChangerContainer.mjs';


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

patchScript.registerContainers(['renderHere', 'renderHere2', 'favoriteTreats', 'powersOfTwo', 'colorChanger', 'colorChangerContainer']);

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