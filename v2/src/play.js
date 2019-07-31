/*
================================
Coder: Emily Yu 
Date: 03/18/2019 - 03/22/2019
Main Related Files: game.html, style.css, greensock.js

Description: 
Text adventure game where player types in instructions to forward the story.

1. Create a multiple room area: have at least 9 areas and no more than 20 areas.
2. The player types in directions (for example: "east", "west", "north") and then will be taken to the next room. Current game location is also described.
3. The player picks up at least 5 items and uses that item in another room.  
4. The game will have a "save" option. When the player returns to the game, in the same browser, s/he can start the game in the same room with the same backpack objects from last time. 
5. Have a start screen, play screen, and end screen.
6. Update code to utilize ES6:
(1) at least one example of template literals
(2) use let and const
(3) include methods such as startsWith, endsWith, and includes.
(4) convert at least one function to an arrow function
(5) use at least one object literal
7. Use jQuery, Greensock or any other Javascript library in the game. 
8. Every room/area has its corresponding image.
9. Primary part of code should pass JSLint, ESLint, or JSHint.
10. Add sound effects.
11. Have a cheat-sheet at hand. 

====================================

WHAT I UPDATED/ADDED:
1) stored information and most innerHTML messages as properties in objects
2) added template literals in some innerHTML messages (need to remember to use back tick marks instead of quotation marks)
3) used a canvas object to display map area (as learned from chapter 6 of the textbook)
4) changed indexOf() to includes
5) changed to search input for one item only; no longer need to pair items together for an effect
6) added sound effects
7) used greensock for end screen animation
8) used jQuery for slideToggle()

====================================
*/

"use strict";//was able to use "use strict" this time

/*MAP OBJECT*/
/*--LOCATION--*/
/*--TEXT: Messages about current game location--*/
/*--IMAGE: Storage for game location images--*/
/*--MESSAGE: Additional information/clues about current game location that would help the player--*/
/*--BLOCK: Messages about blocked paths--*/
/*--HELP: Additional text to help the player when stuck--*/
/*--AUDIO: Way to access the audio files from HTML and play them when a player enters a room--*/
let map =
    {
        0: {
            text: "A lighthouse.",
            image: "lighthouse.jpg",
            message: "Waves splash against the rock.<br>The sea wind gives you chills.<br>You spot an oval-shaped piece of <strong>glass</strong> on the ground.",
            block: "There's no path beyond the lighthouse.",
            help: "You can take the glass.<br>Once you've finished exploring this place. Want to head somewhere else?",
            audio: document.querySelector('#lighthouse')
        },
        1: {
            text: "A forest.",
            image: "forest.jpg",
            message: "Tunnels of green surround you, giving you a sense of serenity.<br>You imagine fireflies showing themselves in the dark.<br>Walking around, you accidentally kick a <strong>mirror</strong>.<br>Luckily, it's not broken.",
            block: "Keepers of the forest prevent you from moving forward.",
            help: "You can take the mirror.<br>Once you've finished exploring this place. Want to head somewhere else?",
            audio: document.querySelector('#forest')
        },
        2: {
            text: "A blue cottage.",
            image: "blue_house.jpg",
            message: "A blue cottage sits on the rocks.<br>You walk closer to the windows.<br>There's no lights on.<br>No one's been here for months. <br>Seems to be a seasonal place to relax in.",
            block: "Door to the blue house is sealed shut.",
            help: "Once you've finished exploring this place. Want to head somewhere else?"
        },
        3: {
            text: "A pathway along the train tracks.",
            image: "train_tracks.jpg",
            message: "You hear distant echoes of a train whistle.<br>A train rustles by.<br>Fortunately, you're out of the way.<br>You look ahead and the pathway seems to lead to someplace far and deserted.",
            block: "Creatures lurking in the tunnel prevent you from going further.",
            help: "Once you've finished exploring this place. Want to head somewhere else?",
            audio: document.querySelector('#train')
        },
        4: {
            text: "A sunlit garden room.",
            image: "sun_room.jpg",
            message: "There's a chair in the sun room.<br>A <strong>book</strong> and a pair of <strong>spectacles</strong> idle on top.<br>Looks like someone's been reading before he/she left.",
            block: "The sun's too bright for you to go outside.",
            help: "You can take the book or the spectacles or both."
        },
        5: {
            text: "An entrance to his residence.",
            image: "entrance.jpg",
            message: "The light's still on.<br>The door's shut close, but there's a door <strong>mat</strong>.",
            block: "",
            help: "Look under the mat. Maybe there's something there to help open the door?"
        },
        6: {
            text: "A staircase leading to the second floor.",
            image: "staircase.jpg",
            message: "There's a <strong>chair</strong> facing the wall.<br>You wonder why there's a pair of chairs at the bend of the staircase.",
            block: "",
            help: "Why don't you sit on one of the chairs since they're there?"
        },
        7: {
            text: "Room with a clock.",
            image: "clock_room.jpeg",
            message: "A <strong>clock</strong> sits on the stand.<br>The clock is working but the time is wrong though.<br>You wonder if there's a way to wind it.",
            block: "Time is amiss, but nothing else is out there.",
            help: "Try fixing the time on the clock.",
            audio: document.querySelector('#clock')
        },
        8: {
            text: "A library.",
            image: "library.jpg",
            message: "The room smells pleasant, like how old paper gives you the years-ago memories of a beloved grandfather kind of pleasant.<br>You look around at the unending shelves of bookcases and see something shiny on top of one of them.<br>You notice a <strong>stool</strong> next to you.",
            block: "Sorry, no secret passages behind the book cases.",
            help: "Maybe use the stool to see what's on top of the bookcase?"
        },
        9: {
            text: "An alley.",
            image: "alley.jpg",
            message: "The alley's filled with shops but it's past store hours.<br>No one's around.<br>Then, the evening lamposts light up the place, making you feel less lonely.",
            block: "The alley's labyrinth of passages is too complicated to venture further.",
            help: "Once you've finished exploring this place. Want to head somewhere else?"
        },
        10: {
            text: "A theater.",
            image: "theater.jpg",
            message: "You hear muffled voices an thunderous sounds coming from the theater.<br>There's a movie playing. You see a forgotten <strong>ticket</strong> on the floor.",
            block: "There're no doors or windows on this side of the theater.",
            help: "There's a movie playing. Want to use your movie ticket?"
        },
        11: {
            text: "A fortune reading shop.",
            image: "psychic_shop.jpg",
            message: "You see the sign and wonder if a tarot reading will help.<br>The fortune teller's in but she wants something shiny and valuable.",
            block: "Don't mess with the fortune teller.",
            help: "Do you still have the brooch with you?",
            audio: document.querySelector('#fortune')
        },
    };

/*OBJ OBJECT*/
/*--ITEM NAME--*/
/*--CANUSE: Text shown when evaluated that player can use object--*/
/*--CANNOTUSE: Text shown when evaluated that player cannot use object--*/
/*--SPECIAL: Functions that perform additional things, such as added items to the game world--*/
let obj = {
    glass: {canUse:"Besides magnifying the stuff you're trying to read, sorry, nothing else happens.", 
            cannotUse:"Not in backpack.<br>It seems that sea monsters and ghost pirates are looking for you.<br>Watch out!"},
    mirror: {canUse: "There's a nice reflection in the mirror, but other than that, nothing else happens.", 
             cannotUse:"Not in backpack.<br>Wooden fairies have played tricks on you."},
    book: {canUse: "Books are nice to read, but this book is sealed shut, unreadable.",
           cannotUse: "Not in backpack.<br>Rainbow of unicorns! You have been day-dreaming again.",
           special: function(){
               if(play.mapLocation === 8){//tell player need to interact with another object
                   outputItem.innerHTML = "Using the stool and placing the book on top of it, you can finally reach and grab the shiny object.<br>It's a <strong>brooch</strong>.<br>You wonder what it's doing there.<br>Then you notice something else.<br><br>There's a <strong>lock</strong> on the book.";        
                   if(play.items.indexOf("brooch") === -1){
                       play.items.push("brooch");
                       play.itemsLocation.push(play.mapLocation);
                       play.itemsToTake.push("brooch");   
                       outputItem.innerHTML += "<br>The book couldn't be opened because there's a lock.<br>It's a numeral lock with 6 dials.<br>Need to find the right numbers somewhere.";
                   }   
                   if(play.items.indexOf("lock") === -1){
                       play.items.push("lock");
                       play.itemsLocation.push(play.mapLocation);
                       play.itemsToTake.push("lock");
                       outputItem.innerHTML += "<br>The brooch is shaped like an owl with jade-colored beads.<br>It's pretty but you wonder if it's of any value.";
                   }               
                }
            }
          },
    spectacles: {canUse: "Glasses are good for seeing things, but that's all.",
                 cannotUse: "Not in backpack.<br>Why are there sparkles, you say?<br>Confused again, you are.",
                 special: function(){
                     if(play.mapLocation === 6){//tell player need to interact with another object
                         outputItem.innerHTML = "There's a writing on the wall written in invisible ink.<br>The spectacles enable you to make out the full message:<br><br><em>If I'm gone from this realm, go to the Teller of Futures and prove your worth with some Green Ingenuity.<em>";
                     }
                 }
                },
    mat: {canUse: "You bend down and peek under the mat.<br>A <strong>key</strong> is hidden there.",
          cannotUse: "No mat here, just a cat in a hat.",
          special: function(){
              if(play.items.indexOf("key") === -1){
                  play.items.push("key");
                  play.itemsLocation.push(play.mapLocation);
                  play.itemsToTake.push("key");  
              }
          }
         },
    key: {canUse: "You know, there's more uses for a key than opening a lock.<br>Like it's a long-shaped iron that can be attached to something and turned.",
          cannotUse: "Not in backpack.<br>You always assume there must be a key in an adventure, eh?",
          special: function(){
              if(play.mapLocation === 5){
                   outputItem.innerHTML = "There's no lock to the door.<br>You give a gentle shove and the door opens.<br>Weird, what's the key for then?<br>Maybe this long-shaped iron can be attached to something and turned.";
              }
              if(play.mapLocation === 7 && (play.backpack.includes("key") || play.itemsLocation[play.items.indexOf("key")] === 7)  && (play.backpack.includes("watch") || play.itemsLocation[play.items.indexOf("watch")] === 7)){
                //this results in SUCCESSFUL gameplay, allowing the user to access the secret room
                    //pause/stop the audio before starting endGame()
                    
                    endGame();
           }
          }
         },
    chair: {canUse: "A chair is good for resting and sitting, but out of all the places, you wonder why your uncle put a chair here.<br>Maybe it's because of the view? Something worth looking through a new perspective?",
            cannotUse: "You're tired and want to sit down. I get it."},
    clock: {canUse: "You bend the hands to the correct time, but nothing else happens.<br>You think you ought not try that again since it's damaging the clock (and you don't want to upset your uncle).<br>You wonder if there's something to rewind the clock with and what time to rewind it to.<br>Maybe something magical will happen once you figure out those questions.",
            cannotUse: "There're no Captain Hooks or crocodiles, no running-late rabbits or Alices here."},
    stool: {canUse: "Using the stool is still not enough to reach the top of the bookcase.<br>If only there's something else to place on the stool and help shorten that distance.<br>Seeing so many books in here reminds you of something.",
            cannotUse: "You're tired and want to sit down. I get it."},
    lock: {canUse: "So, what's the six-digit code to the lock?<br>Where would you find a sequence of numbers?",
           cannotUse: "Not in backpack.<br>You always assume there must be a lock in an adventure, eh?"},
    brooch: {canUse: "Wonder who would like a shiny object.<br>Wonder who would like a trade.",
             cannotUse: "Not in backpack.<br>Sorry, there's no treasure hidden in this cave.<br>Are we in a cave? I'm confused.",
             special: function(){
                 if(play.mapLocation === 11){
                     outputItem.innerHTML = "The teller likes the brooch you just traded and has offered you a tarot reading.<br>There are three <strong>cards</strong> on the table.";
                     //check to see if item is not in game world, then add item
                     if(play.items.indexOf("cards") === -1){
                         play.items.push("cards");
                         play.itemsLocation.push(11);
                         play.itemsToTake.push("cards");
                     }
                 }
             }
            },
    ticket: {canUse: "You stay to see the movie.<br>The plot is about a long-lost heir looking for a magician.",
            cannotUse: "There's no movie showing here."},
    cards: {canUse:"Wonder what these tarot cards are for and why the teller allowed me to take them.",
            cannotUse: "Not in backpack or something's missing.<br>Desperate for a round of cards to try your luck?<br>There's no card tricks out of thin air.",
            special: function(){
                if(play.items.includes("lock") && (play.backpack.includes("book")|| play.itemsLocation[play.items.indexOf("book")] === play.mapLocation)){
                outputItem.innerHTML = "The three card readings you get are: Three of Swords, The Hermit, and Queen of Wands.<br>The cards have given you an idea to try the numbers on them for the lock.<br>You turn the numbers to match 030913 and..<br><br>the book is unlocked!<br>Revealing a pocket <strong>watch</strong> inside the hidden cache.";
                //check to see if item is not in game world, then add item
                if(play.items.indexOf("watch") === -1){
                    play.items.push("watch");
                    play.itemsLocation.push(play.mapLocation);
                    play.itemsToTake.push("watch");
                    outputItem.innerHTML += "<br>The pocket watch looks old but has a certain glamour.<br>Looks like a heirloom.<br>Wonder if there's a clock somewhere to wind the watch the right time or something.";
                }   
             }
            }
           },
    watch: {canUse: "Why was the pocket watch hidden? With the time not moving?<br>You come to ponder these questions.",
            cannotUse: "Not in backpack.<br>Desperate for a round of cards to try your luck?<br>There's no card tricks out of thin air.",
            special: function(){
                if(play.mapLocation === 7){//tell player need to interact with another object
                outputItem.innerHTML = "Hmm..you'd like to set the time on the clock to the time on the pocket watch, but you still need something to wind the clock with...";
                }
            }
           }     
};

/*GAME OBJECT*/
/*--MAP LOCATION: Map location--*/
/*--BACKPACK: Player's backpack--*/
/*--ITEMS: All current items in game world (do not include special puzzle objects)--*/
/*--ITEMSLOCATION: Items corresponding location--*/
/*--ITEMSTOTAKE: Check to see if the item can be taken or is in backpack--*/
let game = {
    mapLocation: 5,
    backpack: [],
    items: ["glass", "mirror", "book", "spectacles", "mat", "chair", "clock", "stool", "ticket"],
    itemsLocation: [0, 1, 4, 4, 5, 6, 7, 8, 10],
    itemsToTake: ["glass", "mirror", "book", "spectacles", "ticket"]
};

/*NAV CANVAS OBJECT*/
let nav = {
    image: "../img/map.png",
    //tile sheet of 4 columns with 3 rows
    column: 4,
    //both width and height are the same size
    size: 144,
            
    //set frame to 5 since player starts at location 5
    currentFrame: 5,
    sourceX: 0,
    sourceY: 0,
            
    position: function(){//arrow function does not work in this case
        //get corresponding x position based on what is remaining after being divided by column and times that by the width of image
        this.sourceX = Math.floor(this.currentFrame % this.column) * this.size; 
        //get corresponding y position based on the result after being divided by column and times that by the height of image
        this.sourceY = Math.floor(this.currentFrame / this.column) * this.size;
    }
};
//clone the game object to change the values and be used by the player
//keep the original game object for when the game needs to reset (by clicking the restart button without refreshing the page)
let play = Object.assign({}, game);//cloned the object [did not use textbook's method because it didn't work as I expected]
let doAction = "";//look for and store direction and action keywords
let interactItem = "";//look for and store item keywords
let events = ["north", "south", "east", "west", "take", "use", "drop"];

let happen = document.getElementById("event");//user's input
let outputMap = document.getElementById("mapMessage");
let outputGame = document.getElementById("gameMessage");
let outputItem = document.getElementById("itemMessage");
let mapImage = document.getElementById("background");


/*--Explanation for Blocked Path Messages:--
To get the value for when the player will travel out of bounds, store it to the variable of G.
Since it's 3 rows X 4 columns game area, drawing out the map I know that:
First Row (0,1,2,3) can't go north (less than 4);
Third Row (8,9,10,11) can't go south (equal to or more than 8, which is 4 X 2);
1st Column (0, 4, 8) can't go west ( x % 4 === 0 );
3rd Column (3, 7, 11) can't go east ( x % 4 === 3, which is G-1)
To move north, subtract 4; to move south, add four
All factors have 4 in it and suppose we were to add more rows or columns,
we would only need to change the value of G in the future
*/

let G = 4;


function gameAction(){
    //pause/stop the audio first before rendering since it might take longer
    if(map[play.mapLocation].hasOwnProperty('audio')){
        map[play.mapLocation].audio.pause();
        map[play.mapLocation].audio.currentTime = 0;
    }
    
    let input = happen.value.toLowerCase();
    
    //reset value to empty string
    outputItem.innerHTML = "";//reset from switch case "use"
    doAction = "";
    interactItem = "";
    
    //check for direction and action keywords
    for(let act of events){
        if(input.includes(act)){
            doAction = act;
            break;
        }
    }
    
    //check for item keywords
    for(let obj of play.items){
        if(input.includes(obj)){
            interactItem = obj;
            break;
        }
    }
    
    switch(doAction){
        case "north":
            if(play.mapLocation >= G){
                play.mapLocation -= G;
                outputGame.innerHTML = map[play.mapLocation].message;
            }else{
                outputGame.innerHTML = map[play.mapLocation].block;
            } 
            break;
        case "south":
            if(play.mapLocation < 2*G){
                play.mapLocation += G;
                outputGame.innerHTML = map[play.mapLocation].message;
            }else{
                outputGame.innerHTML = map[play.mapLocation].block;
            }
            break;
        case "east":
            if(play.mapLocation % G !== 3){
                play.mapLocation += 1;
                outputGame.innerHTML = map[play.mapLocation].message;
            }else{
                outputGame.innerHTML = map[play.mapLocation].block;
            }
            break;
        case "west":
            if(play.mapLocation % G !== 0){
                play.mapLocation -= 1;
                outputGame.innerHTML = map[play.mapLocation].message;
            }else{
                outputGame.innerHTML = map[play.mapLocation].block;
            }
            break;
        case "take":
            takeItem(); 
            break;
        case "use":
            useItem();
            break;    
        case "drop":
            dropItem();
            break; 
        default:
            outputGame.innerHTML = "I don't understand that.";
    }
    render();
}


function takeItem(){
    let takeIndexNumber = play.itemsToTake.indexOf(interactItem);
    let itemIndexNumber = play.items.indexOf(interactItem);
    
    
    //because the case for the item lock is special, check its condition first
    //before the player can take the lock, check whether the lock is in current gameplay
    if(play.interactItem === "lock" && play.items.indexOf("lock") !== -1){
        //before the player can take the lock, check whether the book is in backpack or the book is at current location
        if(play.backpack.includes(interactItem) && (play.backpack.includes("book") || play.itemsLocation[play.items.indexOf("book")] === play.mapLocation)){
            outputItem.innerHTML = "The item lock is now in your backpack.";
            play.backpack.push(interactItem);
            
            play.itemsToTake.splice(takeIndexNumber, 1);//remove one item from array starting from the position takeIndexNumber
            play.itemsLocation.splice(itemIndexNumber, 1, 100);//remove one value from array starting from the position itemIndexNumber and add the value of "in-transit" in its place(I don't put a string in case javascript later on interprets mapLocation as a string instead of an integer)
            
            //if the book is at current location but not in backpack, add the book to backpack 
            if(play.backpack.includes("book") && play.itemsLocation[play.items.indexOf("book")] === play.mapLocation){
                outputItem.innerHTML += "<br>The book is also now back in your backpack.";
                play.backpack.push("book");
                
                //take book out from the array and give the mapLocation value of 100 for "in-transit" (I don't put a string in case javascript later on interprets mapLocation as a string instead of an integer)
                play.itemsToTake.splice(play.itemsToTake.indexOf("book"), 1);
                play.itemsLocation.splice(play.items.indexOf("book"), 1, 100);
            }
        }else{
            outputItem.innerHTML = "Sorry, you do not have the book with you so you cannot take the lock.";
        }       
    }else if(takeIndexNumber !== -1 && play.itemsLocation[itemIndexNumber] === play.mapLocation){//check whether the item is takeable from the game
        outputItem.innerHTML = `The item ${interactItem} is now in your backpack.`;
        play.backpack.push(interactItem);
        
        play.itemsToTake.splice(takeIndexNumber, 1);//remove one item from array starting from the position takeIndexNumber
        play.itemsLocation.splice(itemIndexNumber, 1, 100);//remove one value from array starting from the position itemIndexNumber and add the value of "in-transit" in its place
    }else if(takeIndexNumber !== -1 && play.itemsLocation[itemIndexNumber] !== play.mapLocation){//for re-taking items that have dropped elsewhere
        outputItem.innerHTML = `The item ${interactItem} can be taken but is not located here.`;        
    }else if((play.items.includes(interactItem) && play.itemsLocation[itemIndexNumber] === play.mapLocation) || interactItem === "chair" && play.mapLocation === 4){//in case user decides to take chair in the sunroom
        outputItem.innerHTML = `Sorry, you cannot take the ${interactItem}. It stays here.<br>Or maybe you've already taken the item. Check your backpack.`;
    }else{
        outputItem.innerHTML = "I don't understand that request.<br>Either you have already taken the item<br>or there's no such item here.";
    }
    //console.log("In-World items: " + items);
    //console.log("Items to take: " + itemsToTake);
    //console.log("Backpack: " + backpack);
}


function dropItem(){
    if(play.backpack.length !== 0){
        let backpackIndexNumber = play.backpack.indexOf(interactItem);
        if(backpackIndexNumber !== -1){

            outputItem.innerHTML = `The ${interactItem} is no longer in your backpack.`;
            
            if(interactItem === "book"){
                if(play.backpack.includes("lock")){//drop the lock if the book is dropped, since the lock is attached to the book
                    play.backpack.splice(play.backpack.indexOf("lock"), 1);//remove the lock from backpack, if it's in there
                    play.itemsLocation.splice(play.items.indexOf("lock"), 1, play.mapLocation);//update the itemLocation for lock with the current mapLocation
                    outputItem.innerHTML += "<br>The lock with the book is also no longer in your backpack.";
                }
            }
            
            play.itemsToTake.push(interactItem);//push the object back to the array
            //itemsLocation needs to be updated too
            //find the index number from the items array
            let itemIndexNumber = play.items.indexOf(interactItem);
            play.itemsLocation.splice(itemIndexNumber, 1, play.mapLocation);//remove one value from array starting from the position itemIndexNumber, and adding the value of mapLocation in its place

            play.backpack.splice(backpackIndexNumber, 1);//remove one item from array starting from the position backpackIndexNumber
        }else{
            outputItem.innerHTML = "You do not have that in your backpack.";
        }
    }else{
        outputItem.innerHTML = "There's nothing in your backpack.";
    }
}
       
function useItem(){
    let backpackIndexNumber = play.backpack.indexOf(interactItem);
    let itemIndexNumber = play.items.indexOf(interactItem); 
    
    if(backpackIndexNumber !== -1){
        useBackpackItem();
    }else if(itemIndexNumber !== -1){
        //for cases where the player can use the item immediately
        useGameWorldItem();         
    }else{
        outputItem.innerHTML = "Great Scott! You're violating the space time continuum.";         
    }
}

function useBackpackItem(){
    if(play.items.includes(interactItem)){
        outputItem.innerHTML = obj[interactItem].canUse;
        //check whether object has property to prevent undefined errors
        if(obj[interactItem].hasOwnProperty('special')){
            obj[interactItem].special();
        }
    }else{
        outputItem.innerHTML = "What the Sherlock Holmes?!<br>He congratulates you on see this line of text.";
    }             
}

function useGameWorldItem(){
    let itemIndexNumber = play.items.indexOf(interactItem); 
    if(play.mapLocation === play.itemsLocation[itemIndexNumber]){
        outputItem.innerHTML = obj[interactItem].canUse;
        //check whether object has property to prevent undefined errors
        if(obj[interactItem].hasOwnProperty('special')){
            obj[interactItem].special();
        }
    }else if(play.mapLocation !== play.itemsLocation[itemIndexNumber]){
        outputItem.innerHTML = obj[interactItem].cannotUse;
    }else{
        outputItem.innerHTML = "What the Sherlock Holmes?!<br>He congratulates you on see this line of text.";     
    }
}

//CANVAS OBJECT
let canvas = document.getElementById("canvas");
let draw = canvas.getContext("2d");
        
let image = new Image();
//image.addEventListener("load", navigate, false);
image.src = nav.image;


function checkBackpack(){
    if(play.backpack == "undefined" || play.backpack.length === 0){
       outputItem.innerHTML = "";
    }else{
       outputItem.innerHTML = `You find ${play.backpack.join(", ")} in your backpack.`; 
    }
}

function saveGame(){   
    localStorage.setItem("save", JSON.stringify(play));
    
    restoreButton.disabled = false;
}

function disableRestore(){
    restoreButton.disabled = true;
    
    //if localStorage is not empty, enable the restore button
    if(localStorage.length !== 0){
        restoreButton.disabled = false;
    }
}

function restoreGame(){
    //restock the play obejct with the saved object after refreshing the page 
    play = JSON.parse(localStorage.getItem("save"));
    
    //console.log(itemsToTake);
    checkBackpack();
    checkSoundEffect();
    //I don't use the render() here to prevent from showing the wrong game messages and I don't want to adjust the render() since the messages are taken care of by other methods 
    mapImage.src = "../img/" + map[play.mapLocation].image; 
    outputMap.innerHTML = "You are currently at: " + map[play.mapLocation].text;
    outputGame.innerHTML = map[play.mapLocation].message;
}

function endGame(){
    if(map[play.mapLocation].hasOwnProperty('audio')){
        map[play.mapLocation].audio.pause();
        map[play.mapLocation].audio.currentTime = 0;
    }
    //endgame animation
    endScreen.play();
    //set play screen to display: none and end screen to display: block
    go.style.display = "none";
    end.style.display = "block";
}

function restartGame(){
    localStorage.clear();
    //even though the storage is cleared, things are not set to their initialized state so the object being recreated
    play = Object.create(game);
    
    //since we don't know whether the room previously visited has audio or not, loop through every audio property to pause/stop the audio
    //IMPORTANT: this is how you loop through nested objects (use for/in instead of for/of)
    for(let key in map){
        //check whether object has property to pause the audio
        if(map[key].hasOwnProperty('audio')){
                map[key].audio.pause();
                map[key].audio.currentTime = 0;
        }
    }
    

    //restart game with mapLocation at 5
    outputGame.innerHTML = map[5].message;
    outputItem.innerHTML = "";
    //disable the restore button
    disableRestore();
    render();
}

function checkSoundEffect(){
    //check if room has audio and then play it
    if(map[play.mapLocation].hasOwnProperty('audio')){
        map[play.mapLocation].audio.volume = 0.5;
        map[play.mapLocation].audio.play();
    }
}

function render(){
    //set current frame to current map location
    nav.currentFrame = play.mapLocation;
    //update the x and y starting positions
    nav.position();
    //clear canvas from previous use
    draw.clearRect(0, 0, canvas.width, canvas.height);
    draw.drawImage(
        image,
        nav.sourceX, nav.sourceY, nav.size, nav.size,
        0, 0, nav.size, nav.size
    );
    
    checkSoundEffect();
    
    mapImage.src = "../img/" + map[play.mapLocation].image; 
    outputMap.innerHTML = "You are currently at: " + map[play.mapLocation].text;
    
    happen.value = "";//reset input value to blank and allow player to conveniently type stuff in again
}

function keydownHandler(e){
    //press enter to start game
    if(e.keyCode === 13){
        gameAction();
    }
}

//output message when the game loads
outputGame.innerHTML = map[5].message;

//wait till the window loads to render the game
window.addEventListener("load", render, false);

//ADDED help button
let helpButton = document.getElementById("help");
helpButton.addEventListener("click", ()=>{outputItem.innerHTML = map[play.mapLocation].help;}, false);

//elements related to start, play and end screen
let startButton = document.querySelector("#startScreen>button");
let start = document.getElementById("startScreen");
let go = document.getElementById("playScreen");
let end = document.getElementById("endScreen");

//display the play screen once the button is clicked
startButton.addEventListener("click", ()=>{start.style.display = "none"; go.style.display = "block";}, false);

let enterButton = document.getElementById("enter");
enterButton.addEventListener("click", gameAction, false);
window.addEventListener("keydown", keydownHandler, false);

//jQuery used to toggle cheat sheet
$("#cheatSheet").click(()=>{$("#cheatContent").slideToggle("easeInOutCirc");});

//check backpack
let checkBP = document.getElementById("backpackCheck");
checkBP.addEventListener("click", checkBackpack, false);

let saveButton = document.getElementById("save");
let restoreButton = document.getElementById("restore");
let restartButton = document.getElementById("restart");

//to prevent the player from clicking on the restore button with no saved game, check for whether to disable the button once the page is loaded
window.addEventListener("load", disableRestore, false);


//check if browser supports local storage
if(typeof(Storage) !== "undefined"){
    saveButton.addEventListener("click", saveGame, false);
    restoreButton.addEventListener("click", restoreGame, false);//since button is disabled, I'll add the event listener here instead of adding it when the button is enabled
    restartButton.addEventListener("click", restartGame, false); 
}else{
    //do nothing
}

let gameplayButton = document.getElementById("gameplay");//target gameplay walkthrough button


let modalGamePlay = document.getElementById("modalGamePlay");
let closeModalTwo = document.getElementById("closeTwo");



gameplayButton.addEventListener("click", () => {modalGamePlay.style.display = "block";}, false);
closeModalTwo.addEventListener("click", () => {modalGamePlay.style.display = "none";}, false);
window.addEventListener("click", () => {if(event.target == modalGamePlay){modalGamePlay.style.display = "none";}}, false);//closes the modal by clicking anywhere on the page (which is within the area of the modal)
