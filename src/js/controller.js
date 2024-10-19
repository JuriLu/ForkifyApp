import * as model from './model'
import recipeView from "./views/recipeView.js";

import 'core-js/stable'                 //* Polyfilling anything else
import 'regenerator-runtime/runtime'    //* Polyfilling async/await

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
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
        console.log(`An error ocurred: ${err}`)
    }
};

const init = function () {
    recipeView.addHandleRender(controlRecipes)
}

init()