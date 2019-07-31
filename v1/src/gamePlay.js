/*
================================
Coder: Emily Yu 
Date: 02/11/2019 - 02/23/2019
Main Related Files: textAdventureGame.html, textGameStyle.css

Description: 
Text adventure game where player types in instructions to forward the story.

Feature within This Javascript File:
This part of the file checks user's input and locates keywords about directions, actions, and items.
Once found a match, the function either changes the mapLocation, adds the item to the backapack, or drops the item from backpack.
Since use item has too many different cases, an individual file is created to accomodate that, and thus is taken out from this file.
====================================
*/

//"use strict";

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
    let input = happen.value.toLowerCase();
    
    //reset value to empty string
    outputItem.innerHTML = "";//reset from switch case "use"
    doAction = "";
    interactItem = "";
    
    //check for direction and action keywords
    for(var act of events){
        if(input.indexOf(act) !== -1){
            doAction = act;
            break;
        }
    }
    
    //check for item keywords
    for(var obj of items){
        if(input.indexOf(obj) !== -1){
            interactItem = obj;
            break;
        }
    }
    
    switch(doAction){
        case "north":
            if(mapLocation >= G){
                mapLocation -= G;
                outputGame.innerHTML = game[mapLocation];
            }else{
                outputGame.innerHTML = blockedPath[mapLocation];
            } 
            break;
        case "south":
            if(mapLocation < 2*G){
                mapLocation += G;
                outputGame.innerHTML = game[mapLocation];
            }else{
                outputGame.innerHTML = blockedPath[mapLocation];
            }
            break;
        case "east":
            if(mapLocation % G !== 3){
                mapLocation += 1;
                outputGame.innerHTML = game[mapLocation];
            }else{
                outputGame.innerHTML = blockedPath[mapLocation];
            }
            break;
        case "west":
            if(mapLocation % G !== 0){
                mapLocation -= 1;
                outputGame.innerHTML = game[mapLocation];
            }else{
                outputGame.innerHTML = blockedPath[mapLocation];
            }
            break;
        case "take":
            takeItem(); 
            break;
        case "use":
            //check whether the player interacts with two items and then store the items in an array 
            if(input.indexOf("and") !== -1){
                interactItem = [];
                for(var obj of items){
                    if(input.indexOf(obj) == -1){
                        outputItem.innerHTML = "There's no such combination.";
                    }else{
                        interactItem.push(obj);
                    }
                }
                useItem();
                break;
            }else{//if there's only one item, call the useItem() method
                useItem();
                break;    
            }
        case "drop":
            dropItem();
            break; 
        default:
            outputGame.innerHTML = "I don't understand that.";
    }
    render();
}


function takeItem(){
    let takeIndexNumber = itemsToTake.indexOf(interactItem);
    let itemIndexNumber = items.indexOf(interactItem);
    
    console.log(itemsToTake);
    
    //because the case for the item lock is special, check its condition first
    //before the player can take the lock, check whether the lock is in current gameplay
    if(interactItem === "lock" && items.indexOf("lock") !== -1){
        //before the player can take the lock, check whether the book is in backpack or the book is at current location
        if(backpack.indexOf(interactItem) === -1 && (backpack.indexOf("book") !== -1 || itemsLocation[items.indexOf("book")] === mapLocation)){
            outputItem.innerHTML = "The item lock is now in your backpack.";
            backpack.push(interactItem);
            
            itemsToTake.splice(takeIndexNumber, 1);//remove one item from array starting from the position takeIndexNumber
            itemsLocation.splice(itemIndexNumber, 1, 100);//remove one value from array starting from the position itemIndexNumber and add the value of "in-transit" in its place(I don't put a string in case javascript later on interprets mapLocation as a string instead of an integer)
            
            //if the book is at current location but not in backpack, add the book to backpack 
            if(backpack.indexOf("book") === -1 && itemsLocation[items.indexOf("book")] === mapLocation){
                outputItem.innerHTML += "<br>The book is also now back in your backpack.";
                backpack.push("book");
                
                //take book out from the array and give the mapLocation value of 100 for "in-transit" (I don't put a string in case javascript later on interprets mapLocation as a string instead of an integer)
                itemsToTake.splice(itemsToTake.indexOf("book"), 1);
                itemsLocation.splice(items.indexOf("book"), 1, 100);
            }
        }else{
            outputItem.innerHTML = "Sorry, you do not have the book with you so you cannot take the lock.";
        }       
    }else if(takeIndexNumber !== -1 && itemsLocation[itemIndexNumber] === mapLocation){//check whether the item is takeable from the game
        outputItem.innerHTML = "The item " + interactItem + " is now in your backpack.";
        backpack.push(interactItem);
        
        itemsToTake.splice(takeIndexNumber, 1);//remove one item from array starting from the position takeIndexNumber
        itemsLocation.splice(itemIndexNumber, 1, 100);//remove one value from array starting from the position itemIndexNumber and add the value of "in-transit" in its place
    }else if(takeIndexNumber !== -1 && itemsLocation[itemIndexNumber] !== mapLocation){//for re-taking items that have dropped elsewhere
        outputItem.innerHTML = "The item " + interactItem + " can be taken but is not located here.";        
    }else if((items.indexOf(interactItem) !== -1 && itemsLocation[itemIndexNumber] === mapLocation) || interactItem === "chair" && mapLocation === 4){//in case user decides to take chair in the sunroom
        outputItem.innerHTML = "Sorry, you cannot take the " + interactItem + ". It stays here.<br>Or maybe you've already taken the item. Check your backpack.";
    }else{
        outputItem.innerHTML = "I don't understand that request.<br>Either you have already taken the item<br>or there's no such item here.";
    }
    //console.log("In-World items: " + items);
    //console.log("Items to take: " + itemsToTake);
    //console.log("Backpack: " + backpack);
}


function dropItem(){
    if(backpack.length !== 0){
        let backpackIndexNumber = backpack.indexOf(interactItem);
        if(backpackIndexNumber !== -1){

            outputItem.innerHTML = "The " + interactItem + " is no longer in your backpack.";
            
            if(interactItem === "book"){
                if(backpack.indexOf("lock") !== -1){//drop the lock if the book is dropped, since the lock is attached to the book
                    backpack.splice(backpack.indexOf("lock"), 1);//remove the lock from backpack, if it's in there
                    itemsLocation.splice(items.indexOf("lock"), 1, mapLocation);//update the itemLocation for lock with the current mapLocation
                    outputItem.innerHTML += "<br>The lock with the book is also no longer in your backpack.";
                }
            }
            
            itemsToTake.push(interactItem);//push the object back to the array
            //itemsLocation needs to be updated too
            //find the index number from the items array
            let itemIndexNumber = items.indexOf(interactItem);
            itemsLocation.splice(itemIndexNumber, 1, mapLocation);//remove one value from array starting from the position itemIndexNumber, and adding the value of mapLocation in its place

            backpack.splice(backpackIndexNumber, 1);//remove one item from array starting from the position backpackIndexNumber
        }else{
            outputItem.innerHTML = "You do not have that in your backpack.";
        }
    }else{
        outputItem.innerHTML = "There's nothing in your backpack.";
    }
}