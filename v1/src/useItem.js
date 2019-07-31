/*
================================
Coder: Emily Yu 
Date: 02/11/2019 - 02/23/2019
Main Related Files: textAdventureGame.html, textGameStyle.css

Description: 
Text adventure game where player types in instructions to forward the story.

Feature within This Javascript File:
All methods associated with use item is located here.
Here is the breakdown of how items are used and the result from the interaction:
1) Nothing happens no matter where:
Glass and Mirror
2) Items materialize in the game world after interaction and is pushed to items array:
Key -- shows up after lifting mat (map[5]),
Watch -- shows up after opening the book,
Lock -- shows up after placing the book ontop of the stool; has to use together with stool (map[8]),
Brooch -- shows up after placing the book ontop of the stool; has to use together with stool (map[8]),
Cards -- shows up after trading in the brooch (map[11])
3) Items have other things happening after interaction:
Spectacles (map[6]),
Book (map[8]),
Stool (map[8]),
Chair (map[6]); this might be deleted in future versions,
Mat (map[5]),
Watch (map[7]),
Key (map[7])
4) Game displays information/clues after interaction with item:
Movie (explaining plot of movie),
Lock (explain the digit dials),
Cards (explain the cards and corresponding numbers),
Clock (explain the correct time to wind)
====================================
*/

//"use strict";


function useItem(){
    let backpackIndexNumber = backpack.indexOf(interactItem);
    let itemIndexNumber = items.indexOf(interactItem); 
    //console.log(interactItem);
    //console.log(interactItem.length);
    //console.log(itemIndexNumber);
    //console.log(backpackIndexNumber);
    //check for one item (use of typeof method instead of length property will prevent errors)
    if(typeof(interactItem) == "string"){
        if(backpackIndexNumber !== -1){
            useBackpackItem();
        }else if(itemIndexNumber !== -1){
            //for cases where the player can use the item immediately
            useGameWorldItem();         
        }else{
            outputItem.innerHTML = "Great Scott! You're violating the space time continuum.";         
        }
    }
    //check for two items (use of typeof method instead of length property will prevent errors)
    if(typeof(interactItem) == "object"){
        useTwoItems();
    }
}

function useBackpackItem(){
    switch(interactItem){
        case "glass":
            outputItem.innerHTML = "Besides magnifying the stuff you're trying to read, sorry, nothing else happens.";
            break;
        case "mirror":
            outputItem.innerHTML = "There's a nice reflection in the mirror, but other than that, nothing else happens.";
            break;
        case "book":
            if(mapLocation === 8){//tell player need to interact with another object
                outputItem.innerHTML = "Hmm..rather wondering which bookcase the book belongs to, think on where the book could be on top of or underneath.<br>Good thing about books is that besides knowledge, they can also give you an instant growth sprout.";
            }else{
                outputItem.innerHTML = "Books are nice to read, but this book is sealed shut, unreadable."; 
            }
            break;
        case "spectacles":
            if(mapLocation === 6){//tell player need to interact with another object
                outputItem.innerHTML = "Hmm..There seems to be invisible ink on the walls, but the message is only partially clear.<br>Wonder if there's a certain angle to read it in full, like standing somewhere or sitting somewhere.";
            }else{
                outputItem.innerHTML = "Glasses are good for seeing things, but that's all."; 
            }
            break;
        case "key":
            if(mapLocation === 7){//tell player need to interact with another object
                outputItem.innerHTML = "Hmm..that's smart of you to think that a key can be used to rewind a clock, but the question is what time to wind it to...";
            }else{
                outputItem.innerHTML = "You know, there's more uses for a key than opening a lock.<br>Like it's a long-shaped iron that can be attached to something and turned."; 
            }
            break;
        case "lock":
                outputItem.innerHTML = "So, what's the six-digit code to the lock?<br>Where would you find a sequence of numbers?"; 
                break;
        case "brooch":
            if(mapLocation === 11){
                outputItem.innerHTML = "The teller likes the brooch you just traded and has offered you a tarot reading.<br>There are three <strong>cards</strong> on the table.";
                //check to see if item is not in game world, then add item
                if(items.indexOf("cards") === -1){
                    items.push("cards");
                    itemsLocation.push(11);
                    itemsToTake.push("cards");
                }
            }else{
                outputItem.innerHTML = "Wonder who would like a shiny object.<br>Wonder who would like a trade."; 
            }
            break;
        case "cards":
            if(items.indexOf("lock") !== -1 && (backpack.indexOf("book") !== -1 || itemsLocation[items.indexOf("book")] === mapLocation)){
                outputItem.innerHTML = "The cards have given you an idea to try the numbers on them for the lock. And..<br><br>the book is unlocked! Revealing a pocket <strong>watch</strong> inside the hidden cache.";
                //check to see if item is not in game world, then add item
                if(items.indexOf("watch") === -1){
                    items.push("watch");
                    itemsLocation.push(mapLocation);
                    itemsToTake.push("watch");   
                }
            }else{
                outputItem.innerHTML = "Wonder what these tarot cards are for and why the teller allowed me to take them."; 
            }
            break;
        case "watch":
            if(mapLocation === 7){//tell player need to interact with another object
                outputItem.innerHTML = "Hmm..you'd like to set the time on the clock to the time on the pocket watch, but you still need something to wind the clock with...";
            }else{
                outputItem.innerHTML = "Why was the pocket watch hidden? With the time not moving?<br>You come to ponder these questions."; 
            }
            break;
        default:
            outputItem.innerHTML = "What the Sherlock Holmes?!<br>He congratulates you on see this line of text.";
    }
}

function useGameWorldItem(){
    let itemIndexNumber = items.indexOf(interactItem); 
    
    switch(interactItem){
        case "glass"://also can be in backpack
            if(mapLocation === itemsLocation[itemIndexNumber]){
                outputItem.innerHTML = "Besides magnifying the stuff you're trying to read, sorry, nothing else happens."
            }else{
                outputItem.innerHTML = "Not in backpack.<br>It seems that sea monsters and ghost pirates are looking for you.<br>Watch out!";   
            }
            break;
        case "mirror"://also can be in backpack
            if(mapLocation === itemsLocation[itemIndexNumber]){
                outputItem.innerHTML = "There's a nice reflection in the mirror, but other than that, nothing else happens."
            }else{
                outputItem.innerHTML = "Not in backpack.<br>Wooden fairies have played tricks on you.";   
            }
            break;
        case "book"://also can be in backpack
            if(mapLocation === itemsLocation[itemIndexNumber]){
                outputItem.innerHTML = "Books are nice to read, but this book is sealed shut, unreadable.";
            }else{
                outputItem.innerHTML = "Not in backpack.<br>Rainbow of unicorns! You have been day-dreaming again."; 
            }
            break;
        case "spectacles"://also can be in backpack
            if(mapLocation === itemsLocation[itemIndexNumber]){
                outputItem.innerHTML = "Glasses are good for seeing things. Maybe there's something to see in another room.";
            }else{
                outputItem.innerHTML = "Not in backpack.<br>Why are there sparkles, you say?<br>Confused again, you are."; 
            }
            break;
        case "mat":
            if(mapLocation === itemsLocation[itemIndexNumber]){
                outputItem.innerHTML = "You bend down and peek under the mat.<br>A <strong>key</strong> is hidden there.";
                //check to see if item is not in game world, then add item
                if(items.indexOf("key") === -1){
                    items.push("key");
                    itemsLocation.push(mapLocation);
                    itemsToTake.push("key");
                }
            }else{
                outputItem.innerHTML = "No mat here, just a cat in a hat."; 
            }
            break;
        case "key"://also can be in backpack
            if(mapLocation === itemsLocation[itemIndexNumber]){
                outputItem.innerHTML = "There's no lock to the door.<br>You give a gentle shove and the door opens.<br>Weird, what's the key for then?<br>Maybe this long-shaped iron can be attached to something and turned.";
            }else{
                outputItem.innerHTML = "Not in backpack.<br>You always assume there must be a key in an adventure, eh?"; 
            }
            break;
        case "chair":
            if(mapLocation === itemsLocation[itemIndexNumber]){
                outputItem.innerHTML = "A chair is good for resting and sitting, but out of all the places, you wonder why your uncle put a chair here.<br>Maybe it's because of the view?";
            }else{
                outputItem.innerHTML = "You're tired and want to sit down. I get it."; 
            }
            break;
        case "clock":
            if(mapLocation === itemsLocation[itemIndexNumber]){
                outputItem.innerHTML = "The clock ticks and tocks, but nothing else happens.<br>Maybe try rewinding the clock to a certain time might have something magical happen.";
            }else{
                outputItem.innerHTML = "There're no Captain Hooks or crocodiles, no running-late rabbits or Alices here."; 
            }
            break;
        case "stool":
            if(mapLocation === itemsLocation[itemIndexNumber]){
                outputItem.innerHTML = "Using the stool is still not enough to reach the top of the bookcase.<br>If only there's something else to place on the stool and help shorten that distance.";
            }else{
                outputItem.innerHTML = "You're tired and want to sit down. I get it."; 
            }
            break;
        case "lock":
            //check to see if book is with player and in the game world or else cannot use lock
            if(mapLocation === itemsLocation[itemIndexNumber] || (items.indexOf("lock") !== -1 && backpack.indexOf("book") !== -1)){
                outputItem.innerHTML = "The book couldn't be opened because there's a lock.<br>It's a numeral lock with 6 dials.<br>Need to find the right numbers somewhere.";    
            }else{
                outputItem.innerHTML = "Not in backpack.<br>You always assume there must be a lock in an adventure, eh?"; 
            }
            break;
        case "brooch"://also can be in backpack
            if(mapLocation === itemsLocation[itemIndexNumber]){
                outputItem.innerHTML = "The brooch is shaped like an owl with jade-colored beads.<br>It's pretty but you wonder if it's of any value.";                               
            }else{
                outputItem.innerHTML = "Not in backpack.<br>Sorry, there's no treasure hidden in this cave.<br>Are we in a cave? I'm confused."; 
            }
            break;
        case "movie":
            if(mapLocation === itemsLocation[itemIndexNumber]){
                outputItem.innerHTML = "You stay to see the movie.<br>The plot is about a long-lost heir looking for a magician.";          
            }else{
                outputItem.innerHTML = "There's no movie showing here."; 
            }
            break;
        case "cards"://also can be in backpack
            //check to see if book is with player (including if the previously dropped book is at current location) and lock is in game world to receive watch
            if(mapLocation === itemsLocation[itemIndexNumber] && items.indexOf("lock") !== -1 && (backpack.indexOf("book") !== -1 || itemsLocation[items.indexOf("book")] === mapLocation)){
                outputItem.innerHTML = "The three card readings you get are: Three of Swords, The Hermit, and Queen of Wands.<br>The cards have given you an idea to try the numbers on them for the lock.<br>You turn the numbers to match 030913 and..<br><br>the book is unlocked!<br>Revealing a pocket <strong>watch</strong> inside the hidden cache.";
                if(items.indexOf("watch") === -1){
                    items.push("watch");
                    itemsLocation.push(mapLocation);
                    itemsToTake.push("watch");    
                }   
            }else{
                outputItem.innerHTML = "Not in backpack or something's missing.<br>Desperate for a round of cards to try your luck?<br>There's no card tricks out of thin air."; 
            }
            break;
        case "watch"://also can be in backpack
            if(mapLocation === itemsLocation[itemIndexNumber]){
               outputItem.innerHTML = "The pocket watch looks old but has a certain glamour.<br>Looks like a heirloom.<br>You'd like to set the time on the clock to the time on the pocket watch, but you still need something to wind the clock with...";
            }else{
                outputItem.innerHTML = "Not in backpack.<br>Desperate for a round of cards to try your luck?<br>There's no card tricks out of thin air."; 
            }
            break;
        default:
            outputItem.innerHTML = "What the Sherlock Holmes?!<br>He congratulates you on see this line of text.";
   }
}

function useTwoItems(){
    interactItem = interactItem.join(" and ");//join the items in array with and to test switch cases
    //console.log(interactItem);
    switch(interactItem){
        case "spectacles and chair":
        case "chair and spectacles":
            //check to see if spectacles are in backpack or at current location
            if(mapLocation === 6 && (backpack.indexOf("spectacles")!== -1 || itemsLocation[items.indexOf("spectacles")] === 6)){
                outputItem.innerHTML = "There's a writing on the wall written in invisible ink.<br>The spectacles enable you to make out the full message:<br><br><em>If I'm gone from this realm, go to the Teller of Futures and prove your worth with some Green Ingenuity.<em>";
            }else if(mapLocation === 6 && backpack.indexOf("spectacles") == -1){
                outputItem.innerHTML = "The pair of spectacles is still in the sun room or somewhere else around here.";
            }else{
                outputItem.innerHTML = "Posing for an image or looking around in the wrong room, I should say.";
            }
            break;
        case "key and watch":
        case "watch and key":
            //check to see if key and watch are both in backpack or at current location
            if(mapLocation === 7 && (backpack.indexOf("key")!== -1 || itemsLocation[items.indexOf("key")] === 7)  && (backpack.indexOf("watch") !== -1 || itemsLocation[items.indexOf("watch")] === 7)){
                //this results in SUCCESSFUL gameplay and the magic variable is set to true, allowing the user to access the secret room
                endGame();
            }else if(mapLocation === 7 && backpack.indexOf("key") == -1){
                outputItem.innerHTML = "You forgot the key. Go back and get it.";
            }else if(mapLocation === 7 && items.indexOf("watch") == -1){
                outputItem.innerHTML = "What realm did you conjure the watch from?";
            }else if(mapLocation === 7 && mapLocation !== itemsLocation[items.indexOf("watch")]){
                outputItem.innerHTML = "You did not carry the pocket watch with you.";
            }else{
                outputItem.innerHTML = "Nope. There's no hidden rabbit holes or lock to wonderlands here.";
            }
            break;
        case "book and stool":
        case "stool and book":
            //check to see if book is both in backpack or at current location
            if(mapLocation === 8 && (backpack.indexOf("book")!== -1 || itemsLocation[items.indexOf("book")] === 8)){
                outputItem.innerHTML = "Using the stool and placing the book on top of it, you can finally reach and grab the shiny object.<br>It's a <strong>brooch</strong>.<br>You wonder what it's doing there.<br>Then you notice something else.<br><br>There's a <strong>lock</strong> on the book.<br>No wonder you couldn't read the book earlier.";
                if(items.indexOf("brooch") === -1){
                    items.push("brooch");
                    itemsLocation.push(mapLocation);
                    itemsToTake.push("brooch");   
                }   
                if(items.indexOf("lock") === -1){
                    items.push("lock");
                    itemsLocation.push(mapLocation);
                    itemsToTake.push("lock");   
                }   
            }else if(mapLocation === 8 && backpack.indexOf("book") == -1){
                outputItem.innerHTML = "You don't have a book in your backpack.";
            }else{
                outputItem.innerHTML = "Where did you find a stool?<br>And wouldn't reading a book using a stool be uncomfortable?";
            }
            break;
        default:
            outputItem.innerHTML = "Nice try Einstein. Either you don't have the object(s) or I don't see the ingenuity of using those two things.";
    }
}
