function getInfo() {

  $("#search-form").on("submit", function (e) {
    e.preventDefault();

    let userInputIngredients = $("#userData").val().trim();

    //APi for the food search conform the ingredients 
    //!Test the input!
    const apiKeySearch = "20fa1c17de69490f93632c908260c7bb";

    // const queryUrlSearch = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${userInputIngredients}&number=4&apiKey=${apiKeySearch}`;

    const queryUrlSearch = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${userInputIngredients}&addRecipeInformation=true&fillIngredients=true&number=4&apiKey=${apiKeySearch}`

    fetch(queryUrlSearch)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        recipesCards(data)

      });
  });
}





// //API for the food Nutrition
// // !Test the input
// const input = $('.ingredients').val()
// const foodSearch = $('input')

// const queryUrl = `https://api.edamam.com/api/nutrition-data?app_id=${apiIdNutrition}&app_key=${apiKeyNutrition}&nutrition-type=cooking&ingr=${foodSearch}`;

// fetch(queryUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);

//     const file = $('.container')
//     searchBtn.on('click', function (e) {
//       e.preventDefault();
//       // const alergy = `${data.healthLabels}`
//       const print = $('<div>')

//       const nutrition = `${data.ingredients}`
//       console.log(nutrition)
//       print.append(nutrition)
//       // print.append(alergy)
//       file.append(print)
//     });
//   })




  function recipesCards(data) {
    $(`.food-options`).empty()
    for (let i = 0; i < data.results.length; i++) {
      const divCard = $(`<div class = card>`);
      const divCardBody = $(`<div class=card-body>`);
      const recipeTitle = $(`<h5>`).text(data.results[i].title);
      const recipeImg = $(`<img class = imgRecipe>`).attr(`src`, data.results[i].image);
      const recipeTime = $(`<p class = readyInMinutes>`).text(`Ready in ${data.results[i].readyInMinutes} min`)
      const recipeServing = $(`<p class = serving>`).text(`Serving: ${data.results[i].servings}`)
  
      const dietsDiv = $(`<div class = "dietsInfo">`)
      const dietsTitle = $(`<h6>`).text(`Diets:`)
      let dietsString = "";
      for (let j = 0; j < data.results[i].diets.length; j++) {
        const recipeDiets = data.results[i].diets[j];
        dietsString += recipeDiets + `, `
      }
      dietsString = dietsString.slice(0, -2);
      dietsDiv.append(dietsTitle, ($(`<p>`).text(dietsString)))
  
      const ingredientsDiv = $(`<div class = "ingredientsInfo">`)
      const ingredientsTitle = $(`<h6>`).text(`Ingredients:`)
      let ingredientsString = "";
      for (let k = 0; k < data.results[i].extendedIngredients.length; k++) {
        const ingredientName = data.results[i].extendedIngredients[k].name;
        ingredientsString += ingredientName + `, `
      }
      ingredientsString = ingredientsString.slice(0, -2);
      ingredientsDiv.append(ingredientsTitle, ($(`<p>`).text(ingredientsString)))
  
      $(`.food-options`).append(divCard);
      divCard.append(divCardBody);
      divCardBody.append(recipeTitle, recipeImg, recipeTime,recipeServing, dietsDiv, ingredientsDiv)
      // we could add cusines and link to external URL
    }
  }

  getInfo()