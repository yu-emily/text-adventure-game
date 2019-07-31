let black = document.getElementById('blackScreen');
let one = document.getElementById('lineOne');
let two = document.getElementById('lineTwo');
let three = document.getElementById('lineThree');
let four = document.getElementById('lineFour');
let five = document.getElementById('lineFive');

let room = document.getElementById('secretRoom');
let won = document.getElementById('congratulations');
let exit = document.getElementById('endGame');

let endScreen = new TimelineLite({paused: true});

//endScreen
endScreen
    .from(one, 1.2, {opacity: 0, ease: Circ.easeIn})
    .from(two, 1.2, {opacity: 0, ease: Circ.easeIn}, "+=1")
    .from(three, 1.2, {opacity: 0, ease: Circ.easeIn}, "+=1")
    .from(four, 1.2, {opacity: 0, ease: Circ.easeIn}, "+=1")
    .from(five, 1.2, {opacity: 0, ease: Circ.easeIn}, "+=1")
    .set(room, {zIndex: 2})
    .from(room, 1.5, {opacity: 0, ease: Circ.easeOut})
    .from(won, 1.2, {opacity: 0, scale: 0.1, ease: Elastic.easeOut.config(1, 0.3)})
    .from(exit, 1.2, {opacity: 0, scale: 0.1, ease: Elastic.easeOut.config(1, 0.3)}, "+=1.2");