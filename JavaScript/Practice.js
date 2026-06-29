
//  
//            PRACTICE SESSION 


/*
console.log(s)  // undefined as initialisation phase value stored in memory is undefined
var s
console.log(s)
var s = "Amit"  // can be redeclare
console.log(s)

s = "Tiwari"  // can be reassigned
console.log(s)
*/



/*
//console.log(p)  //throws error as p will be initialised but remain in tdz
let p
console.log(p)
let  q = "Tiwari"
console.log(q)     // throws as error cannot be redeclare

p = "Tiwari"       // can be reassigned
console.log(p)  

*/



/*
// console.log(a)  // throws an error , since a is in memory but in tdz having value undefined
const a = 'Amit'
console.log(a)

// const a = 'Tiwari' // throws an error cannot be redeclare
// console.log(a)

a = 'class'       // throws error , assignment to constant

console.log(a)
*/


//    FUNCTIONS 
// var greet = function (name){
//     return "Hello" +" "+  name
// }

// console.log(greet("Amit"))

console.log("______________________")

// Problem - 1
function square (n){
    return n*n
}

console.log(square(5))


// Problem - 2
console.log("______________________")

let squares = function(n){
    return n*n
}
console.log(squares(5))

console.log("______________________")

let sqr = (n) => {
    return n*n
}
console.log(sqr(5))

console.log("______________________")

// Problem - 3
function createCounter() {
    let count = 0;

    return function() {
        return ++count;
    };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
console.log("______________________")

// Problem - 4
Amit 
RAhul
console.log("______________________")

// Problem - 5
// no error to fix here
for (var i = 1; i<=3;i++){
    setTimeout(() =>{
        console.log(i);
    }, 1000)
}
console.log("______________________")

// Problem - 6
let a = [1,2,3,4,5]
const doubled = a.map(num => num*2)
console.log(doubled)

console.log("______________________")

// Problem - 7
let b = [1,2,3,4,5,6]
const fltr = b.filter(nums => nums%2 )
console.log(fltr)

console.log("______________________")

// Problem - 8
let c = [1,2,3,4]
const sum = c.reduce(nums =>nums+nums)
console.log(sum)

console.log("______________________")

// Problem - 9
let d = [1,1,2,2,3,4,4]
const removDuplicate = d.filter(nums => unique(nums))
console.log(removDuplicate)
console.log("______________________")

// Problem - 10
let e = "Amit"
const reverse = e.map(s => -s)
console.log("______________________")




// const user = {
//     name: "Rahul",
//     age: 25,
// };

// function greet({ name, age}){
//     console.log(name, age);
// }

// greet(user);



// const user = {
//     name: "Amit",
//     Roll: 17,
//     address : {
//         city: "Faridabad",
//         pin: 121001
//     }
// };

// const { Roll, address : {city} } = user;
// console.log(Roll, city);


// const user = {
//     name: "rahul",
//     age: 25
// };

// const { name } = user;

// console.log(name);


// const arr =  [1, 2, 3];

// const copy = [...arr];

// copy.push(5);

// console.log(arr);
// console.log(copy);


// const obj1 = {
//     name: "Rahul",
//     age: 25
// };
// const obj2 = {
//      ...obj1,
//      age: 25
// };
// console.log(obj2);

// function sum(...nums){
//     console.log(nums);

// }
// sum(1, 2, 3, 4, 5);

// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];

// const result  = [...arr1,...arr2];

// console.log(result)

// const [a, ...rest ] = [1, 2, 3, 4, 5];

// console.log(a);
// console.log(rest);



// map(), reduce(), filter()

// map() -- is used to transform the values of collections

// const arr = [4,8,5,2,8];

// function double(x){
//     return x * 2;
    
// }
// const output = arr.map(double);
// console.log(output);

// filter() -- is used to filter the values of collections

// filter values greater than 4


// const arr1 = [4,8,5,2,8];

// const output1 = arr1.filter(function greaterThanFour(x){
//     return x > 4;
// });
// console.log(output1);


// reduce() 
// -- is used to combine the values of collections into a single value



/* const arr2 = [4,8,5,2,8];
function sum(arr2){
    let sum = 0;
    for(i = 0; i< arr2.length; i++){
        sum = sum += arr2[i];
    }
    return sum;
}
const output2 = arr2.reduce(function (accumulator, currentValue){
    return accumulator + currentValue;
});

console.log(output2);

*/








