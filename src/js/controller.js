const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const api_key = '6a1f9a3d-b072-4351-8b88-a629f043cd36'  //* Needs refreshing every 1 hour
let id = '664c8f193e7aa067e94e89c9'
const url = `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`

const showRecipe = async function () {
    try {
        const res = await fetch(url);
        const data = await res.json()

        if (!res.ok) throw new Error(`${data.message} (${res.status})`)
        let {recipe} = data.data;

        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }

        console.log(recipe);
    } catch (e) {
        alert(e)
    }
}

showRecipe()