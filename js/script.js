async function callAPI(uri){
    const response = await fetch(uri);
    const data = await response.json();
    return data ;
}

//constante globale : l'URI du endpoint de demande de nouveau deck
const API_ENDPOINT_NEW_DECK = "https://deckofcardsapi.com/api/deck/new";

//fonction de demande de nouveau deck
async function getNewDeck() {
    return await callAPI(API_ENDPOINT_NEW_DECK);
}

//variable globale : l'id du deck utilisé, dans lequel on pioche 
let idDeck = null;

//fonctions qui renvoient des URI dynamiques de demande de mélange du deck et de pioche 
let getApiEndpointShuffleDeck = () =>`https://deckofcardsapi.com/api/deck/${idDeck}/shuffle`;


async function shuffleDeck(){
    return await callAPI(getApiEndpointShuffleDeck());
}

let getApiEndpointDrawCard = () =>`https://deckofcardsapi.com/api/deck/${idDeck}/draw/?count=1`;

async function drawCard(){
    return await callAPI(getApiEndpointDrawCard());
}

const cleanDomCardsFromPreviousDeck = () => document.querySelectorAll(".card").forEach((child) => child.remove());

async function actionReset() {
    cleanDomCardsFromPreviousDeck();

    const newDeckResponse = await getNewDeck();
    idDeck = newDeckResponse.deck_id;

    await shuffleDeck();
}
