const cards = [
    "apple.jpg",
    "banana.jpg",
    "coconut.jpg",
    "coconut.jpg",
    "grapefruit.jpg",
    "lemon.jpg",
    "banana.jpg",
    "strawberry.jpg",
    "apple.jpg",
    "lemon.jpg",
    "strawberry.jpg",
    "grapefruit.jpg"
];
// Funkcja sortująca karty w losowym porządku
cards.sort((a, b) => {
    let losowe1 = Math.round( Math.random () * (10 - 1) + 1),
        losowe2 = Math.round( Math.random () * (10 - 1) + 1);
    return losowe1 - losowe2;
});

// Utworzenie tablicy z uchwytami do kart
let c = [];
for(let i = 0; i<12; i++){
    c[i] = document.getElementById(`c${i}`);
}

// Podpięcie listenerów do kart
c.forEach((el, index)=> el.addEventListener('click', ()=> revealCard(index)));

// Zmienne związane z logiką gry (stan początkowy)
let oneVisible = false,
    turnCounter = 0,
    visible_nr,
    lock = false,
    pairsLeft = 6;

// Funkcja "odwaracająca" karty
function revealCard(nr){
	let opacityValue = $('#c'+nr).css('opacity');
	if (opacityValue !== 0 && lock == false){
		lock = true;
        let image = "url(img/" + cards[nr] + ")";
        $('#c'+nr).css('background-image', image);
        $('#c'+nr).addClass('cardA');
        $('#c'+nr).removeClass('card');

        if(oneVisible == false){
            oneVisible = true;
            visible_nr = nr;
            lock = false;
        } else {
	//druga karta
            if(cards[visible_nr] === cards[nr]){
                if(visible_nr === nr){
                    window.alert("You have to click on different squares!"); // Weryfikacja kliknięć na tę samą kartę
                    setTimeout(()=>restore2Cards(visible_nr), 300);
                } else {
                    setTimeout(()=>hide2Cards(nr, visible_nr), 750);
                }
            } else {
                    setTimeout(()=>restore2Cards(nr, visible_nr), 1000);
            }
            turnCounter++;
            $('.score').html('Turn counter: '+turnCounter);
            oneVisible = false;
        }
	}
}

// Funkcja usuwająca karty
function hide2Cards(nr1, nr2){
	$('#c'+nr1).css('opacity', '0');
	$('#c'+nr2).css('opacity', '0');
	lock = false;
	pairsLeft--;
	if(pairsLeft === 0){
		$(".board").html('<h1>You win!<br>Done in '+turnCounter+' turns</h1><br><button onclick="onclickHandler();">Play again</button>');
	}
}

// Funkcja odwaracająca karty na ich rewers
function restore2Cards(nr1, nr2){
	$('#c'+nr1).css('background-image', 'url(img/card.jpg)');
	$('#c'+nr1).addClass('card');
	$('#c'+nr1).removeClass('cardA');

	$('#c'+nr2).css('background-image', 'url(img/card.jpg)');
	$('#c'+nr2).addClass('card');
    $('#c'+nr2).removeClass('cardA');

	lock = false;
}

// Ponowna gra
function onclickHandler (){
	location.reload();
}

