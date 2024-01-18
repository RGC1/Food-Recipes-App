//API for the food Nutrition
// !Test the input
const input = $('.ingredients').val()
const foodSearch = $('input')

const queryUrl = `https://api.edamam.com/api/nutrition-data?app_id=${apiIdNutrition}&app_key=${apiKeyNutrition}&nutrition-type=cooking&ingr=${foodSearch}`;

fetch(queryUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    const file = $('.container')
    searchBtn.on('click', function (e) {
      e.preventDefault(); 
      // const alergy = `${data.healthLabels}`
      const print = $('<div>')

      const nutrition = `${data.ingredients}`
      console.log(nutrition)
        print.append(nutrition)
        // print.append(alergy)
        file.append(print)
    });
  })

//APi for the food search conform the ingredients 
//!Test the input!
const inputSearch = "apple";
const apiKeySearch = "20fa1c17de69490f93632c908260c7bb";

const queryUrlSearch = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${inputSearch}&number=4&apiKey=${apiKeySearch}`;

fetch(queryUrlSearch)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
