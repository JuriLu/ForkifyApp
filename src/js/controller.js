import 'core-js/stable'                 //* Polyfilling anything else
import 'regenerator-runtime/runtime'    //* Polyfilling async/await
import {loadSearchResults} from "./model";

import * as model from './model'
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//* Part of Parcel
if(module.hot){
    module.hot.accept()
}

const controlRecipes = async function () {
    try {
        const id = window.location.hash.slice(1)
        console.log(id)

        if (!id) return; //* guard close for id
        recipeView.renderSpinner();

        //* 1) Loading recipe
        await model.loadRecipe(id)

        //* 2) Rendering recipe
        recipeView.render(model.state.recipe)
    } catch (err) {
        recipeView.renderError(`${err} 💥💥💥`);
    }
};

const controlSearchResults = async function(){
    try{
        resultsView.renderSpinner()

        //* 1) Get Search Query
        const query = searchView.getQuery();
        if (!query) return;

        //* 2) Load search results
        await model.loadSearchResults(query);

        //* 3) Rendering Search resultS
        resultsView.render(model.state.search.results)
    } catch (err) {
        console.log(err)
    }
}
controlSearchResults()

const init = function () {
    recipeView.addHandleRender(controlRecipes)
    searchView.addHandlerSearch(controlSearchResults)
}

init()