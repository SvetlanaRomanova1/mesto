import {initialCards} from "./data.js";
import {createNewCard} from "./create-new-card.js";

initialCards.forEach(function (item){
    createNewCard(item.name, item.link)
})