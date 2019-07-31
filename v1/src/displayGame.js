/*
================================
Coder: Emily Yu 
Date: 02/11/2019 - 02/23/2019
Main Related Files: textAdventureGame.html, textGameStyle.css

Description: 
Text adventure game where player types in instructions to forward the story.

Feature within This Javascript File:
User interface related events are located in this file.
Event listeners include clicking a button or entering an input or closing a modal.
The page is displayed using the render function.
====================================
*/

//"use strict";

function checkBackpack(){
    if(backpack == "undefined" || backpack.length === 0){
       outputItem.innerHTML = "";
    }else{
       outputItem.innerHTML = "You find " + backpack.join(", ") + " in your backpack."; 
    }
}

function saveGame(){
    let saveLocation = mapLocation;
    let saveItems = JSON.stringify(itemsToTake);
    let saveBackpack = JSON.stringify(backpack);
    let saveMagic = JSON.stringify(magic);
    let saveGameWorldItems = JSON.stringify(items);
    let saveGameItemsLocation = JSON.stringify(itemsLocation);
    
    localStorage.setItem("location", saveLocation);
    localStorage.setItem("item", saveItems);
    localStorage.setItem("backpack", saveBackpack);
    localStorage.setItem("magic", saveMagic);//in case the player saves the progress at the end of game
    localStorage.setItem("inWorldItems", saveGameWorldItems);//to track items that have already materialized in game but are not initialized in game
    localStorage.setItem("inWorldItemsLocation", saveGameItemsLocation);//to track items that have already materialized in game but are not initialized in game
    
    //since localStorage is not empty, enable the restore button
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
    //even if mapLocation has not gone through JSON.stringify, need to remember to parse the value, or else the script will treat it as a string and this will cause an error
    mapLocation = JSON.parse(localStorage.getItem("location"));
    itemsToTake = JSON.parse(localStorage.getItem("inWorldItem"));
    backpack = JSON.parse(localStorage.getItem("backpack"));
    magic = JSON.parse(localStorage.getItem("magic"));//in case the player saves the progress at the end of game
    items = JSON.parse(localStorage.getItem("inWorldItems"));
    itemsLocation = JSON.parse(localStorage.getItem("inWorldItemsLocation"));
    
    //console.log(itemsToTake);
    checkBackpack();
    //I don't use the render() here to prevent from showing the wrong game messages and I don't want to adjust the render() since the messages are taken care of by other methods 
    mapImage.src = "../img/" + images[mapLocation]; 
    outputMap.innerHTML = "You are currently at: " + map[mapLocation];
    outputGame.innerHTML = game[mapLocation];
}

function endGame(){
    outputItem.innerHTML = "You wind the clock using the key to match the time on the watch and ....<br><br><br>Masters of Magic!!! You've been teleported to a secret room!!!";
    magic = true;
    mapLocation = 3;
    
    enterButton.removeEventListener("click", gameAction, false);//prevent the player from entering input again
    window.removeEventListener("keydown", keydownHandler, false);//prevent the player from entering input again
}

function restartGame(){
    localStorage.clear();
    //even though the storage is cleared, things are not set to their initialized state so here's a repeat of the items which might be written as a object/function in a future version
    backpack = [];
    magic = false;
    items = ["glass", "mirror", "book", "spectacles", "mat", "chair", "clock", "stool", "movie"];
    itemsLocation = [0, 1, 4, 4, 5, 6, 7, 8, 10]
    itemsToTake = ["glass", "mirror", "book", "spectacles"];
    
    //restart game with mapLocation at 5
    mapLocation = 5;
    outputGame.innerHTML = game[5];
    outputItem.innerHTML = "";
    //disable the restore button
    disableRestore();
    render();
}

function render(){
    //an attempt to access the secret room forces the player to start journey at mapLocation[5] again 
    if(mapLocation == 3 && magic == false){
        mapLocation = 5;
        mapImage.src = "../img/" + images[mapLocation];
        outputMap.innerHTML = "You are currently at: " + map[mapLocation]; 
        outputGame.innerHTML = "I'm sorry. You breached into something that is forbidden. You're not <em>there<em> yet.";
    }else{
        mapImage.src = "../img/" + images[mapLocation]; 
        outputMap.innerHTML = "You are currently at: " + map[mapLocation];
    }
    happen.value = "";//reset input value to blank and allow player to conveniently type stuff in again
}

function keydownHandler(e){
    //press enter to start game
    if(e.keyCode === 13){
        gameAction();
    }
}

let mapLocation = 5;
outputGame.innerHTML = game[5];

//wait till the window loads to render the game
window.addEventListener("load", render, false);

let enterButton = document.getElementById("enter");
enterButton.addEventListener("click", gameAction, false);
window.addEventListener("keydown", keydownHandler, false);

//toggle cheat sheet to display
let displayCS = document.getElementById("cheatSheet");
let cheatContent = document.getElementById("cheatContent");
displayCS.addEventListener("click", () => {if(cheatContent.style.display === "block"){cheatContent.style.display = "none"}else{cheatContent.style.display = "block"};}, false)

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

let modalIntro = document.getElementById("modalIntro");
let closeModal = document.getElementById("close");
let modalGamePlay = document.getElementById("modalGamePlay");
let closeModalTwo = document.getElementById("closeTwo");

closeModal.addEventListener("click", () => {modalIntro.style.display = "none";}, false);
window.addEventListener("click", () => {if(event.target == modalIntro){modalIntro.style.display = "none";}}, false);//closes the modal by clicking anywhere on the page (which is within the area of the modal)

gameplayButton.addEventListener("click", () => {modalGamePlay.style.display = "block";}, false);
closeModalTwo.addEventListener("click", () => {modalGamePlay.style.display = "none";}, false);
window.addEventListener("click", () => {if(event.target == modalGamePlay){modalGamePlay.style.display = "none";}}, false);//closes the modal by clicking anywhere on the page (which is within the area of the modal)