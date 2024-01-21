// Empty array of previous searches, needed for buttons and localstorage
let userIngredientsSearch = [];


function getInfo(ingredient) {

  //APi for the food search conform the ingredients 
  const apiKeySearch = "cee5a04b58e44eb4986476154872470f";

  const queryUrlSearch = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredient}&addRecipeInformation=true&fillIngredients=true&number=4&apiKey=${apiKeySearch}`

  fetch(queryUrlSearch)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);

      // The if statement checks if the user already searched an ingredient with the same name (in the userIngredientSearch array) if not it will push the new ingredient to the array and generate a new button and save it to local storage.
      if (!userIngredientsSearch.includes(ingredient)) {
        userIngredientsSearch.push(ingredient);
        renderButton(ingredient);
        saveToLocalStorage();
      }
      // Calling the function to generate recipes cards.
      recipesCards(data);

      // Empty the #userData-input box after each search.
      $(`#userData-input`).val(``);
    });
}
function captureDropdownIntoleranceClick() {
  $('.btn-group.intolerance-dropdown').on('click', '.dropdown-item', function () {
    var selectedValue = $(this).text();
    // Store the selected value in local storage with a specific key
    localStorage.setItem('userIntolerance', selectedValue);
  });
}
function captureDropdownDietClick() {
  $('.btn-group.diet-dropdown').on('click', '.dropdown-item', function () {
    var selectedValueDiet = $(this).text();
    // Store the selected value in local storage with a specific key
    localStorage.setItem('userDiet', selectedValueDiet);
  });
}
// Call the function
captureDropdownIntoleranceClick()
captureDropdownDietClick()

function userInput() {
  $("#search-form").on("submit", function (e) {
    e.preventDefault();

    let userInputIngredients = $("#userData").val().trim();

    // If the user inputs any ingredient with capital letter the method will tranform every letter to lowercase.
    if (/[A-Z]/.test(userInputIngredients)) {
      userInputIngredients = userInputIngredients.toLowerCase();
    }
    const capitalizedUserInputIngredients = capitalizeWords(userInputIngredients);

    getInfo(capitalizedUserInputIngredients);
    // Clearing the search input field from previous search.
    $("#userData").val("");
  });
}

userInput();


// This function capitalize any string parameter will be passed in. It makes sure that each input ingredient from the user will be capitalized and then used for the name of the buttons (this is happening in the userInput function).
function capitalizeWords(inputString) {
  return inputString.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}


// This function creates buttons for each user search and it appends them to the aside section.
function renderButton(capitalizedUserInputIngredients) {
  const createButton = $("<button class = buttonSearch>").text(`${capitalizedUserInputIngredients}`);
  $(`.history`).append(createButton);
}


// Event listener for click on buttonSearch, it will regenerate a search when clicking on the history buttons.
$(document).on("click", ".buttonSearch", function (event) {
  // console.log("Button clicked:", event.target.textContent)
  getInfo(event.target.textContent)
});


// Saving the ingredients seach to local storage.
function saveToLocalStorage() {
  localStorage.setItem(`ingredientsSearch`, JSON.stringify(userIngredientsSearch));
}

// This function retrives info from local storage, so if the user refreshes the page the previous history buttons persist.
function loadFromLocalStorage() {
  const storedIngredients = localStorage.getItem('ingredientsSearch');
  // console.log("Stored Ingredients:", storedIngredients)
  if (storedIngredients) {
    userIngredientsSearch = JSON.parse(storedIngredients);
    // console.log("Loaded Ingredients:", userIngredientsSearch)
    for (let i = 0; i < userIngredientsSearch.length; i++) {
      renderButton(userIngredientsSearch[i]);
    }
  }
}
loadFromLocalStorage();



//API for the food Nutrition
// !Test the input
function nutrition() {

  const ingredientsNutrition = `${data.ingredients}`

  const apiKeyNutrition = '3d3be652dc9fb5eed687451afb2224d5';
  const apiIdNutrition = '3b7c2557';

  // const apiKeyNutrition = '8ac12198fbdb382b08155c59b542c40f';
  // const apiIdNutrition = 'c3a22b69';

  // const apiKeyNutrition = '3d3be652dc9fb5eed687451afb2224d5';
  // const apiIdNutrition = '3b7c2557';

  const queryUrl = `https://api.edamam.com/api/nutrition-data?app_id=${apiIdNutrition}&app_key=${apiKeyNutrition}&nutrition-type=cooking&ingr=${ingredientsNutrition}`;

  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (dataIngredients) {
      console.log(dataIngredients);
    });
}


function recipesCards(data) {
  $(`.food-options`).empty()
  for (let i = 0; i < data.results.length; i++) {
    const divCard = $(`<div class = card>`);
    const divCardBody = $(`<div class=card-body>`);
    const recipeTitle = $(`<h5>`).text(data.results[i].title);
    const recipeImg = $(`<img class = imgRecipe>`).attr(`src`, data.results[i].image);
    const recipeTime = $(`<p class = readyInMinutes>`).text(`Ready in ${data.results[i].readyInMinutes} min`)
    const recipeServingTitle = $(`<h6 class = servingTitle>`).text(`Serving:`)
    const recipeServing = $(`<p class = serving>`).text(`${data.results[i].servings}`)

    const dietsDiv = $(`<div class = "dietsInfo">`)
    const dietsTitle = $(`<h6>`).text(`Diets:`)
    let dietsString = "";
    for (let j = 0; j < data.results[i].diets.length; j++) {
      const recipeDiets = data.results[i].diets[j];
      const capitalizedDiets = recipeDiets.charAt(0).toUpperCase() + recipeDiets.slice(1).toLowerCase();
      dietsString += capitalizedDiets + `, `
    }
    dietsString = dietsString.slice(0, -2);
    dietsDiv.append(dietsTitle, ($(`<p>`).text(dietsString)))

    const ingredientsDiv = $(`<div class = ingredientsInfo>`)
    const ingredientsTitle = $(`<h6>`).text(`Ingredients:`)
    const ingredientsList = $(`<ul>`)
    // let ingredientsString = "";
    for (let k = 0; k < data.results[i].extendedIngredients.length; k++) {
      const ingredientName = data.results[i].extendedIngredients[k].original;
      // console.log(ingredientName)
      const capitalizedIngredient = ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1).toLowerCase();
      const listItemIngredient = $(`<li>`).text(capitalizedIngredient);
      ingredientsList.append(listItemIngredient);
      // ingredientsString += capitalizedIngredient + `, `
    }
    // ingredientsString = ingredientsString.slice(0, -2);
    ingredientsDiv.append(ingredientsTitle, ingredientsList);


    const linkDiv = $(`<div class = externalLink>`);
    // Added target="_blank" to open the link in a new tab.
    const recipeLink = $(`<a href=${data.results[i].sourceUrl} class=btn id=btnRecipe target="_blank">Go to Recipe</a>`);
    linkDiv.append(recipeLink);

    $(`.food-options`).append(divCard);
    divCard.append(divCardBody);
    divCardBody.append(recipeTitle, recipeImg, recipeTime, recipeServingTitle, recipeServing, dietsDiv, ingredientsDiv, linkDiv);
  }
}