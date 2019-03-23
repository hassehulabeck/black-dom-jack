var deck = [];
var suits = ["&spades;", "&hearts;", "&clubs;", "&diams;"];
var ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
var hand = [];
let summa = 0;

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


createDeck();
shuffle(deck);
// console.log(deck);
deal(2);
// console.log(hand);
renderHand();

function renderHand() {
    let mainArea = document.getElementsByTagName('main');
    // Börja med att rensa innehållet.
    mainArea[0].innerHTML = "";

    hand.forEach((kort) => {
            let card = document.createElement('div');
            card.innerHTML = `
          <section>
            <span>${kort.suit}</span>
            <span>${kort.rank}</span>
          </section>`;
            card.classList.add('card');
            // Svart eller rött kort?
            if (kort.suit == '&spades;' || kort.suit == '&clubs') {
                card.classList.add('black');
            } else {
                card.classList.add('red');
            }
            mainArea[0].appendChild(card);
        })
        // Skriv ut kortens värde.
    let summaArea = document.getElementsByTagName('header');
    summaArea[0].innerHTML = summera();
}

function deal(n) {
    for (let i = 0; i < n; i++) {
        hand.push(deck.shift());
    }
}

function summera() {
    summa = 0;
    let altString = "";
    let gotAce = false;

    hand.forEach((kort) => {
        // Räkna ut kortets valör (rank) och lägg till summa.
        if (kort.rank == 'A') {
            summa += 11;
            gotAce = true;
        } else if (ranks.indexOf(kort.rank) > '8') {
            summa += 10;
        } else {
            summa += ranks.indexOf(kort.rank) + 2;
        }
    })
    if ((gotAce) && (summa == 21)) {
        altString = ` (eller ${summa-10})`;
    }
    return `Spelaren har ${summa} ${altString}`;
}


// Blanda korten.
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}