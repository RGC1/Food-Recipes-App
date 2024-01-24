// Empty array of previous searches, needed for localstorage
let userIngredientsSearch = [];

function getInfo(ingredient, selectedValueIntolerance, selectedValueDiet) {
  //  const apiKeySearch = "cee5a04b58e44eb4986476154872470f";
  //  const apiKeySearch = "20fa1c17de69490f93632c908260c7bb";
  //  const apiKeySearch = "e74daa4c1fba4dea89c7a0c637bd6d4d";
  const apiKeySearch = 'e74daa4c1fba4dea89c7a0c637bd6d4d'
  const queryUrlSearch = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredient}&diet=${selectedValueDiet}&intolerances=${selectedValueIntolerance}&addRecipeInformation=true&fillIngredients=true&number=4&apiKey=${apiKeySearch}`;

  fetch(queryUrlSearch)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.results && data.results.length > 0) {

        const recipesList = JSON.parse(localStorage.getItem('ingredientsSearch')) || [];
        const existingRecipesList = recipesList.findIndex(function (item) {
          return item.ingredient === ingredient && item.selectedValueDiet === selectedValueDiet && item.selectedValueIntolerance === selectedValueIntolerance;
        });

        if (existingRecipesList === -1) {
          renderButton(ingredient, selectedValueIntolerance, selectedValueDiet);
          saveToLocalStorage(ingredient, selectedValueIntolerance, selectedValueDiet);
        }

        // Calling the function to generate recipes cards.
        recipesCards(data);
      } else {
        // The API did not return results for the specified ingredient
        const alert = $('<p>');
        const message = 'Ingredient not found. Please enter a valid ingredient.';
        alert.append(message);
        $("#search-form").prepend(alert);

        alert.css({
          color: 'red',
          fontSize: '20px',
          textAlign: 'center',
        });

        setTimeout(function () {
          if (alert) {
            alert.remove();
          }
        }, 3000);
      }

      // Empty the #userData-input box after each search.
      $(`#userData-input`).val(``);
    })
    .catch(function (error) {
      // Handle errors from the fetch or JSON parsing
      console.error('Error:', error);
    });
}



//API for the food Nutrition
function nutrition(ingredientName, capitalizedIngredient, listItemIngredient) {
  if (!ingredientName) {
    // Handle empty input or show an error message
    console.error("Please enter valid ingredients");
    return;
  }

  const apiKeyNutrition = '3d3be652dc9fb5eed687451afb2224d5';
  const apiIdNutrition = '3b7c2557';

  // const apiKeyNutrition = '8ac12198fbdb382b08155c59b542c40f';
  // const apiIdNutrition = 'c3a22b69';

  // const apiKeyNutrition = '3d3be652dc9fb5eed687451afb2224d5';
  // const apiIdNutrition = '3b7c2557';

  const queryUrl = `https://api.edamam.com/api/nutrition-data?app_id=${apiIdNutrition}&app_key=${apiKeyNutrition}&nutrition-type=cooking&ingr=${ingredientName}`;

  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (dataNutrition) {
      const nutrition = dataNutrition.calories

      listItemIngredient.text(capitalizedIngredient + " - " + nutrition + " Kcal");
    })
}


function userInput() {
  $("#search-form").on("submit", function (e) {
    e.preventDefault();

    let userInputIngredients = $("#userData").val().trim();
    
    // If the user inputs any ingredient with capital letter the method will tranform every letter to lowercase.
    if (/[A-Z]/.test(userInputIngredients)) {
      userInputIngredients = userInputIngredients.toLowerCase();
    }
    const capitalizedUserInputIngredients = capitalizeWords(userInputIngredients);

    const selectedValueIntolerance = $('.btn-group.intolerance-dropdown .dropdown-item.active').text();
    const selectedValueDiet = $('.btn-group.diet-dropdown .dropdown-item.active').text();

    getInfo(capitalizedUserInputIngredients, selectedValueIntolerance, selectedValueDiet);

    // Clear active state of dropdown items
    $('.btn-group.intolerance-dropdown .dropdown-item').removeClass('active');
    $('.btn-group.diet-dropdown .dropdown-item').removeClass('active');

    // Clearing the search input field from previous search.
    $("#userData").val("");
  });

  // Event listener for click on dropdown items (intolerance)
  $('.btn-group.intolerance-dropdown').on('click', '.dropdown-item', function () {
    // Toggle active class for styling if needed
    $('.btn-group.intolerance-dropdown .dropdown-item');
    $(this).addClass('active');
  });
  // Event listener for click on dropdown items (diet)
  $('.btn-group.diet-dropdown').on('click', '.dropdown-item', function () {
    // Toggle active class for styling if needed
    $('.btn-group.diet-dropdown .dropdown-item');
    $(this).addClass('active');
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
function renderButton(capitalizedUserInputIngredients, selectedValueIntolerance, selectedValueDiet) {

  const createButton = $("<button class='buttonSearch'>")
    .text(`${capitalizedUserInputIngredients} - Intolerance: ${selectedValueIntolerance || 'None'} - Diet: ${selectedValueDiet || 'None'}`);

  // Creating data attribute for each buttons so we can use them to make a new search when the user click on the buttons.
  createButton.attr(`data-ingredient`, capitalizedUserInputIngredients);
  createButton.attr(`data-intolerance`, selectedValueIntolerance);
  createButton.attr(`data-diet`, selectedValueDiet);
  
  $(".history").append( createButton);

}


// Event listener for click on buttonSearch, it will regenerate a search when clicking on the history buttons.
$(document).on("click", ".buttonSearch", function (event) {
  // event.target grabing just the data attributes for each button and passing them in the getInfo function to regenerate the search with these parameters.
  // console.log("Button clicked:", event.target)
  const ingredientButton = $(event.target).attr(`data-ingredient`)
  const intoleranceButton = $(event.target).attr(`data-intolerance`)
  const dietButton = $(event.target).attr(`data-diet`)
  // console.log(ingredient, intolerance, diet)
  getInfo(ingredientButton, intoleranceButton, dietButton)
});


// Saving the searches to local storage.
function saveToLocalStorage(ingredient, selectedValueIntolerance, selectedValueDiet) {
  // Retrieve existing data from local storage
  const storedIngredients = JSON.parse(localStorage.getItem('ingredientsSearch')) || [];

  storedIngredients.push({
    ingredient: ingredient,
    selectedValueIntolerance: selectedValueIntolerance,
    selectedValueDiet: selectedValueDiet
  });
  localStorage.setItem('ingredientsSearch', JSON.stringify(storedIngredients));
}

// This function retrives info from local storage, so if the user refreshes the page the previous history buttons persist.
function loadFromLocalStorage() {
  const storedIngredients = JSON.parse(localStorage.getItem('ingredientsSearch')) || [];

  if (storedIngredients) {
    userIngredientsSearch = storedIngredients;
    for (let i = 0; i < userIngredientsSearch.length; i++) {
      const { ingredient, selectedValueIntolerance, selectedValueDiet } = userIngredientsSearch[i];
      renderButton(ingredient, selectedValueIntolerance, selectedValueDiet);
    }
  }
}
loadFromLocalStorage();


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
    const ingredientsTitle = $(`<h6>`).text(`Ingredients and Calories:`)
    const ingredientsList = $(`<ul>`)

    for (let k = 0; k < data.results[i].extendedIngredients.length; k++) {
      const ingredientName = data.results[i].extendedIngredients[k].original;
      const capitalizedIngredient = ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1).toLowerCase();
      const listItemIngredient = $(`<li>`).text(capitalizedIngredient);
      ingredientsList.append(listItemIngredient);
      nutrition(ingredientName, capitalizedIngredient, listItemIngredient)
    }
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
