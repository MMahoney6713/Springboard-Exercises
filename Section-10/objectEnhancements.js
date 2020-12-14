// function createInstructor(firstName, lastName){
//     return {
//       firstName: firstName,
//       lastName: lastName
//     }
//   }

function createInstructor(firstName, lastName) {
    return {
        firstName,
        lastName
    }
}

// var favoriteNumber = 42;

// var instructor = {
//   firstName: "Colt"
// }

// instructor[favoriteNumber] = "That is my favorite!"

let favoriteNumber = 42;

const instructor = {
    firstName: "Colt",
    [favoriteNumber]: "That is my favorite!"
}

// var instructor = {
//     firstName: "Colt",
//     sayHi: function(){
//       return "Hi!";
//     },
//     sayBye: function(){
//       return this.firstName + " says bye!";
//     }
//   }

const instructor = {
    firstName: "Colt",
    sayHi() {
        return "Hi!";
    },
    sayBye() {
        return this.firstName + " Says bye!";
    }
}



function createAnimal(species, verb, noise) {
    return {
        species,
        [verb]() {
            return noise;
        }
    }
}