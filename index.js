var deck = [];
var suits = ["&spades;", "&hearts;", "&clubs;", "&diams;"];
var ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
var player = [];
var dealer = [];
let summa = 0;

// När vi laddat in allt.
document.addEventListener('DOMContentLoaded', function() {

    createDeck();
    shuffle(deck);
    // console.log(deck);
    deal(player, 2);
    deal(dealer, 1);

    // console.log(hand);
    renderHand(player, "main");
    renderHand(dealer, "dealerArea");

    var button = document.getElementById('hit');
    button.addEventListener('click', () => {
        deal(player, 1);
        renderHand(player, "main");
    })

    // Eller via mellanslag.
    document.addEventListener("keyup", event => {
        if (event.key === " ") {
            deal(player, 1);
            renderHand(player, "main");
        }
    });

    /* Stop button */
    var stopBtn = document.getElementById('stop');
    stopBtn.addEventListener('click', () => {
        stop();
    })

    // Eller via ENTER.
    document.addEventListener("keyup", event => {
        if (event.key === "Enter") {
            stop();
        }
    });


});

function createDeck() {
    suits.forEach((suit) => {
        ranks.forEach((rank) => {
            let card = new Card(suit, rank);
            deck.push(card);
        })
    })
}

function Card(suit, rank) {
    this.suit = suit;
    this.rank = rank;
}

function stop() {

    let x = setInterval(function() {
        deal(dealer, 1);
        renderHand(dealer, "dealerArea");
        if (summera(dealer) >= 17) {
            clearInterval(x);
        }
    }, 1000);

}


function renderHand(hand, area) {
    let place = document.getElementById(area);
    // Börja med att rensa innehållet.
    place.innerHTML = "";

    hand.forEach((kort) => {
            let card = document.createElement('div');
            card.innerHTML = `
          <section>
            <span>${kort.suit}</span>
            <span>${kort.rank}</span>
          </section>`;
            card.classList.add('card');
            // Svart eller rött kort?
            if (kort.suit == '&spades;' || kort.suit == '&clubs;') {
                card.classList.add('black');
            } else {
                card.classList.add('red');
            }
            place.appendChild(card);
        })
        // Skriv ut kortens värde.
    let summaArea;
    if (area == 'main') {
        summaArea = document.getElementsByTagName('header');
        summaArea[0].innerHTML = summera(player);
    } else {
        summaArea = document.getElementsByTagName('footer');
        summaArea[0].innerHTML = summera(dealer);
    }
}

function deal(hand, n) {
    for (let i = 0; i < n; i++) {
        hand.push(deck.shift());
    }
}

function summera(hand) {
    summa = 0;
    let numberOfAces = 0;
    let altString = "";

    hand.forEach((kort) => {
            // Räkna ut kortets valör (rank) och lägg till summa.
            if (kort.rank == 'A') {
                summa += 11;
                numberOfAces++;
            } else if (ranks.indexOf(kort.rank) > '8') {
                summa += 10;
            } else {
                summa += ranks.indexOf(kort.rank) + 2;
            }
        })
        /* Kolla om spelaren är tjock (över 21)
            Isåfall, kolla om det finns ett ess.
            Om ess finns, minska summan med 10.
        */

    if (numberOfAces == 0) {
        if (summa > 21) {
            altString = `och är tjock.`;
        }
        if (summa == 21) {
            altString = ``;
        }
    } else {
        for (let i = 0; i < numberOfAces; i++) {
            if (summa > 21) {
                summa = summa - 10;
            } else if (summa == 21) {
                altString = `(Black jack)`;
            } else {
                altString = `(eller ${summa-10})`;
            }
        }
    }

    return summa;
}


// Blanda korten.
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}