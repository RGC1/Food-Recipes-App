// Empty array of previous searches, needed for buttons and localstorage
let userIngredientsSearch = [];


function getInfo(ingredient) {

    //APi for the food search conform the ingredients 
    const apiKeySearch = "2577d71950714c1ba832e6d94daa3f21";

    const queryUrlSearch = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredient}&addRecipeInformation=true&fillIngredients=true&number=4&apiKey=${apiKeySearch}`

    fetch(queryUrlSearch)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        renderButton(ingredient)

        recipesCards(data)

        $(`#userData-input`).val(``);

      });
}

function userInput() {
  $("#search-form").on("submit", function (e) {
    e.preventDefault();

    let userInputIngredients = $("#userData").val().trim();

    getInfo(userInputIngredients)
  })
}

userInput()


// This function capitalize any string parameter will be passed in. It makes sure that each input ingredient from the user will be capitalized and then used for the name of the buttons (this is happening in the renderButton function).
function capitalizeWords(inputString) {
  return inputString.replace(/\b\w/g, function(char) {
    return char.toUpperCase();
  });
}


// This function creates buttons for each user search and it checks if the button with the same ingredient already exist, if not it will append it to the aside section.
function renderButton(userInputIngredients) {
  // If the user inputs any ingredient with capital letter the method will tranform every letter to lowercase.
  if (/[A-Z]/.test(userInputIngredients)) {
    userInputIngredients = userInputIngredients.toLowerCase();
  }
  const capitalizedUserInputIngredients = capitalizeWords(userInputIngredients);
  if (!userIngredientsSearch.includes(capitalizedUserInputIngredients)){
    const createButton = $("<button class = `buttonSearch`>").text(`${capitalizedUserInputIngredients}`);
    $(`.history`).append(createButton);
    userIngredientsSearch.push(capitalizedUserInputIngredients)
  }
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
      const divCard = $(`<div class = "card">`);
      const divCardBody = $(`<div class= "card-body">`);
      const recipeTitle = $(`<h5>`).text(data.results[i].title);
      const recipeImg = $(`<img class = "imgRecipe">`).attr(`src`, data.results[i].image);
      const recipeTime = $(`<p class = "readyInMinutes">`).text(`Ready in ${data.results[i].readyInMinutes} min`)
      const recipeServing = $(`<p class = "serving">`).text(`Serving: ${data.results[i].servings}`)
  
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
      divCardBody.append(recipeTitle, recipeImg, recipeTime, recipeServing, dietsDiv, ingredientsDiv)
      // we could add cusines and link to external URL
    }
  }

  getInfo()