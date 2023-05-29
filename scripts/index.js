import './edit-profile.js'
import "./like-button.js";
import './data.js';
import './open-picture.js';
import './render-card.js';
import './add-place.js'
import {initialCards} from "./data.js";
import {renderCard} from "./render-card.js";

initialCards.forEach(function (item){
    renderCard(item.name, item.link)
});
