
//La fonction "callAPI" envoie une requête HTTP à une URI donnée, attend la réponse,
// la convertit en JSON,
// et retourne les données obtenues.

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



//---------------------------------------
// creation de la fonction actionreset
//-----------------------------------------

//supprime les cartes de l'ancien deck du DOM  => récupere des cartes et le foreach pour supprimer chaque carte récupéré 
const cleanDomCardsFromPreviousDeck = () => document.querySelectorAll(".card").forEach((child) => child.remove());

//fonction rénitialisation (nv deck +melange du nv deck)
async function actionReset() {
    cleanDomCardsFromPreviousDeck();

    const newDeckResponse = await getNewDeck();
    idDeck = newDeckResponse.deck_id;

    await shuffleDeck();
}


//---------------------------------------
// creation de la fonction actiondraw
//-----------------------------------------

const cardsContainer = document.getElementById("cards-container");

function addCardToDomByImgUri(imgUri) {
    const imgCardHtmlElement = document.createElement("img");
    imgCardHtmlElement.classList.add("card");
    imgCardHtmlElement.src = imgUri;

    cardsContainer.append(imgCardHtmlElement);
}

async function actionDraw() {
    const drawCardResponse = await drawCard();
    const imgCardUri = drawCardResponse.cards[0].image;

    addCardToDomByImgUri(imgCardUri);
}

//---------------------------------------
// ecouteurs d'événements 
//-----------------------------------------

const actionResetButton = document.getElementById("action-reset");
const actionDrawButton = document.getElementById("action-draw");

//ecouteurs d'événement sur les boutons d'action
actionResetButton.addEventListener("click", actionReset);
actionDrawButton.addEventListener("click", actionDraw);
