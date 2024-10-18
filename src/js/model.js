export const state = {
    recipe: {}
}

export const loadRecipe = async function(id){
    try{
        const api_key = '6a1f9a3d-b072-4351-8b88-a629f043cd36'  //* Needs refreshing every 1 hour
        const url = (id) => `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        console.log('from model',id)
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        const data = await res.json()

        if (!res.ok) throw new Error(`${data.message} (${res.status})`)
        const {recipe} = data.data;

        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
        console.log('State recipe from the model: ', state.recipe)
    } catch (e) {
        alert(e)
    }
}