/*
================================
Coder: Emily Yu 
Date: 02/11/2019 - 02/23/2019
Main Related Files: textAdventureGame.html, textGameStyle.css

Description: 
Text adventure game where player types in instructions to forward the story.

Feature within This Javascript File:
All data storage information about the game is located here.
For future versions/implementations, 
I should consider whether storing them as objects might be better or not.
====================================
*/


//"use strict";
/*--Messages about current game location--*/
let map = [];
map[0] = "A lighthouse.";
map[1] = "A forest.";
map[2] = "A blue cottage.";
map[3] = "~*|| THE Room of Mysteries ||*~";
map[4] = "A sunlit garden room.";
map[5] = "An entrance to his residence.";
map[6] = "A staircase leading to the second floor.";
map[7] = "Room with a clock.";
map[8] = "A library.";
map[9] = "An alley.";
map[10] = "A theater.";
map[11] = "A fortune reading shop.";


/*--Storage for game location images--*/
let images = [];
images[0] = "lighthouse.jpg";
images[1] = "forest.jpg";
images[2] = "blue_house.jpg";
images[3] = "secret_room.jpg";
images[4] = "sun_room.jpg";
images[5] = "entrance.jpg";
images[6] = "staircase.jpg";
images[7] = "clock_room.jpeg";
images[8] = "library.jpg";
images[9] = "alley.jpg";
images[10] = "theater.jpg";
images[11] = "psychic_shop.jpg";


/*--Additional information/clues about current game location that would help the player--*/
let game = [];
game[0] = "Waves splash against the rock.<br>The sea wind gives you chills.<br>You spot an oval-shaped piece of <strong>glass</strong> on the ground.";
game[1] = "Tunnels of green surround you, giving you a sense of serenity.<br>You imagine fireflies showing themselves in the dark.<br>Walking around, you accidentally kick a <strong>mirror</strong>.<br>Luckily, it's not broken.";
game[2] = "A blue cottage sits on the rocks.<br>You walk closer to the windows.<br>There's no lights on.<br>No one's been here for months. <br>Seems to be a seasonal place to relax in.";
game[3] = "The windows face the mountains.<br>You hear distant echoes and faint whispers.<br>Footsteps draw closer. You turn, and finally have found him.<br><br>CONGRATULATIONS!!<br>END OF GAME.";
game[4] = "There's a chair in the sun room.<br>A <strong>book</strong> and a pair of <strong>spectacles</strong> idle on top.<br>Looks like someone's been reading before he/she left.";
game[5] = "The light's still on.<br>The door's shut close, but there's a door <strong>mat</strong>.";
game[6] = "There's a <strong>chair</strong> facing the wall.<br>You wonder why there's a pair of chairs at the bend of the staircase.";
game[7] = "A <strong>clock</strong> sits on the stand.<br>The clock is working but the time is wrong though.<br>You wonder if there's a way to wind it.";
game[8] = "The room smells pleasant, like how old paper gives you the years-ago memories of a beloved grandfather kind of pleasant.<br>You look around at the unending shelves of bookcases and see something shiny on top of one of them.<br>You notice a <strong>stool</strong> next to you.";
game[9] = "The alley's filled with shops but it's past store hours.<br>No one's around.<br>Then, the evening lamposts light up the place, making you feel less lonely.";
game[10] = "You hear muffled voices and thunderous sounds coming from the theater.<br>There's a <strong>movie</strong> playing, no charge.";
game[11] = "You see the sign and wonder if a tarot reading will help.<br>The teller's in but she wants something shiny and valuable.";


/*--Messages about blocked paths--*/
let blockedPath = [];
blockedPath[0] = "There's no path beyond the lighthouse.";
blockedPath[1] = "Keepers of the forest prevent you from moving forward.";
blockedPath[2] = "Door to the blue house is sealed shut.";
blockedPath[3] = "";
blockedPath[4] = "The sun's too bright for you to go outside.";
blockedPath[5] = "";
blockedPath[6] = "";
blockedPath[7] = "Time is amiss, but nothing else is out there.";
blockedPath[8] = "Sorry, no secret passages behind the book cases.";
blockedPath[9] = "The alley's labyrinth of passages is too complicated to venture further.";
blockedPath[10] = "There're no doors or windows on this side of the theater.";
blockedPath[11] = "Don't mess with the teller.";

let backpack = [];//store player's items
let doAction = "";//look for and store direction and action keywords
let interactItem = "";//look for and store item keywords
let magic = false;//check to see if the player can access a secret room; initialized to false 


let events = ["north", "south", "east", "west", "take", "use", "drop"];
let items = ["glass", "mirror", "book", "spectacles", "mat", "chair", "clock", "stool", "movie"];//all current know items in game world
let itemsLocation = [0, 1, 4, 4, 5, 6, 7, 8, 10]
let itemsToTake = ["glass", "mirror", "book", "spectacles"];//items that player can store in backpack
