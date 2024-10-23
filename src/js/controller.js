import 'core-js/stable'; //* Polyfilling anything else
import 'regenerator-runtime/runtime'; //* Polyfilling async/await
import { MODAL_CLOSE_SEC } from './config';
import * as model from "./model";
import addRecipeView from './views/addRecipeView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from "./views/paginationView";
import recipeView from "./views/recipeView.js";
import resultsView from "./views/resultsView";
import searchView from "./views/searchView";

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
        resultsView.update(model.getSearchResultsPage());

        //* 1) Updating bookmarks view
        bookmarksView.update(model.state.bookmarks)

        //* 2) Loading recipe
        await model.loadRecipe(id);

        //* 3) Rendering recipe
        recipeView.render(model.state.recipe);
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

const controlAddBookmark = function () {

    //* 1) Add/remove bookmark
    if(!model.state.recipe.bookmarked){
        model.addBookmark(model.state.recipe)
    } else {
        model.deleteBookmark(model.state.recipe.id)
    }

    //* 2) Update recipe view
    recipeView.update(model.state.recipe)

    //* 3) Render bookmarks
    bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function(){
    bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function(newRecipe){
    try{
        //* 1) Show loading spinner
        addRecipeView.renderSpinner()

        //* 2) Upload the new recipe data
       await model.uploadRecipe(newRecipe);

       //* 3) Render recipe
       recipeView.render(model.state.recipe);

       //* 4) Success message
        addRecipeView.renderMessage();

       //* 5) Close Form window
       setTimeout(()=>{
        addRecipeView.toggleWindow()
       },MODAL_CLOSE_SEC * 1000)

       //* 6) Render bookmark view
       bookmarksView.render(model.state.bookmarks);

       //* 7) Change ID in URL
       window.history.pushState(null,'',`#${model.state.recipe.id}`)



    } catch(err) {
        console.error(err);
        addRecipeView.renderError(err.message);
    }
    model.uploadRecipe(newRecipe)
}

const init = function () {
    bookmarksView.addHandlerRender(controlBookmarks)
    recipeView.addHandleRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe)
}

const recipeView = addRecipeView  //* trick VSCODE on not removing unused import for addRecipeView

init()