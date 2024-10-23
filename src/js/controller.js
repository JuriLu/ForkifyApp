import 'core-js/stable' //* Polyfilling anything else
import 'regenerator-runtime/runtime' //* Polyfilling async/await
import * as model from "./model";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//* Part of Parcel
// if (module.hot) {
//     module.hot.accept()
// }

const controlRecipes = async function () {
    try {
        const id = window.location.hash.slice(1)

        if (!id) return; //* guard close for id
        recipeView.renderSpinner();

        //* 0) Update results view to mark selected search result
        resultsView.update(model.getSearchResultsPage())

        //* 1) Loading recipe
        await model.loadRecipe(id)

        //* 2) Rendering recipe
        recipeView.render(model.state.recipe)
    } catch (err) {
        recipeView.renderError(`${err} 💥💥💥`);
    }
};

const controlSearchResults = async function () {
    try {
        resultsView.renderSpinner()

        //* 1) Get Search Query
        const query = searchView.getQuery();
        if (!query) return;

        //* 2) Load search results
        await model.loadSearchResults(query);

        //* 3) Rendering Search resultS
        resultsView.render(model.getSearchResultsPage());

        //* 4) Render initial page buttons
        paginationView.render(model.state.search)
    } catch (err) {
        console.log(err)
    }
}

const controlPagination = function (goToPage) {
    //* 1) Rendering NEW Search resultS
    resultsView.render(model.getSearchResultsPage(goToPage));

    //* 2) Render NEW page buttons
    paginationView.render(model.state.search)
}

const controlServings = function (newServings) {
    //* 1) Update recipe servings (in state)
    model.updateServings(newServings);

    //* 2) Update recipe view
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
}

const init = function () {
    recipeView.addHandleRender(controlRecipes)
    recipeView.addHandlerUpdateServings(controlServings)
    searchView.addHandlerSearch(controlSearchResults)
    paginationView.addHandlerClick(controlPagination)
}

init()