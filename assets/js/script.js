//API for the food Nutrition
// !Test the input
const input = $('.userData').val()
const foodSearch = $('input')
const searchBtn = $('.search-button')
const apiKeyNutrition = '3d3be652dc9fb5eed687451afb2224d5';
const apiIdNutrition = '3b7c2557';

// const queryUrl = `https://api.edamam.com/api/nutrition-data?app_id=${apiIdNutrition}&app_key=${apiKeyNutrition}&nutrition-type=cooking&ingr=10 oz egg`;

fetch(queryUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // console.log(data);
    
    const ingredientsNutrition = JSON.stringify(data.totalNutrientsKCal);
    localStorage.setItem('ingredientsNutrition', ingredientsNutrition)

  })

   function displayNutrition(){
    const displayNutrition= $('.food-options')
    searchBtn.on('click', function (e) {
      e.preventDefault(); 
      // const alergy = `${data.healthLabels}`
      const print = $('<div>')

      const nutrition = `${data.totalNutrientsKcal}`
      console.log(nutrition)
        });}
  

//APi for the food search conform the ingredients 
// //!Test the input!
// const apiKeySearch = "20fa1c17de69490f93632c908260c7bb";

// const queryUrlSearch = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=egg&number=4&apiKey=${apiKeySearch}`;

// fetch(queryUrlSearch)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     // console.log(data);
//   })

//  function displayMenu(data){
 
//   searchBtn.on('click', function(e){
//     e.preventdefault
//     data.forEach(function(recipeData) {
//       const createRecipe = $('<div>');
//       const recipeTitle = recipeData.title;
//       console.log(recipeTitle)
//       createRecipe.text(recipeTitle);
//       $('body').append(createRecipe);
//   })
//   })}
//   displayMenu()