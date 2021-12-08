var searchInputEl = document.querySelector("#search-input");
var recipeSearchEl = document.querySelector("#search-form");
var singleRecipeEl = document.querySelector("#single-recipe");
var recipeTitleEl = document.querySelector("#recipe-title");
var ingredientListEl = document.querySelector("#ingredient-list");
var winePairingEl = document.querySelector("#wine-pairing");
var instructionsEl = document.querySelector("#instructions");
var recipeImgEl = document.querySelector("#recipe-img");
var noResultEl = document.querySelector("#no-result");
var dropdownEl = document.querySelector("#dropdown-items");
var dropSectionEl = document.querySelector("#drop-section");
var saveFavoritesEl = document.querySelector("#saved-favorites");
var showRecipes = document.querySelector("#recipes-list");
var recipeBtn = document.querySelector("#recipe-item");
var pageDataId = "";
var storedTitle = "";
var favStorage = JSON.parse(localStorage.getItem("favorites"));

// The endpoint for recipeOptions data
var getSpoonacularId = function (searchTerm) {
    var spoonacularIdUrl = "https://api.spoonacular.com/recipes/complexSearch?query=" + searchTerm + "&number=9&apiKey=ae730946c55249789b6e18443db02fa9";

    fetch(spoonacularIdUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data.results.length == 0) {
                    showRecipes.classList = "column";
                    showRecipes.textContent = "No Results Match your Search";
                } else {
                    showRecipes.textContent = ""
                    recipeOptions(data);
                }
            })
        } else {
            showRecipes.classList = "column";
            showRecipes.textContent = "Error: " + response.statusText;
        }
    })
        .catch(function (error) {
            showRecipes.textContent = "Unable to connect!"
            console.log(error);
        })
};


// The endpoint for recipeInfo data
var getSpoonacularRecipe = function () {
    var recipeDataId = JSON.parse(localStorage.getItem("elementId"));

    pageDataId = recipeDataId;

    var recipeUrl = "https://api.spoonacular.com/recipes/" + recipeDataId + "/information?apiKey=ae730946c55249789b6e18443db02fa9";

    // 2166a058487242eea34e1d18d83401d7
    // 8486a65f1f3a44f4a3d245898bc2b721
    // 26e612b0048144bfbea4351fc9eb3f60
    // ae730946c55249789b6e18443db02fa9

    recipeSearchEl.removeEventListener("submit", formSubmitHandler);

    fetch(recipeUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                recipeInfo(data);
            })
        } else {
            instructionsEl.textContent = "Error: " + response.statusText;
        }
    })
        .catch(function (error) {
            window.location.replace("./index.html");
        })
};

// Gets all ingredients and other information from the user chosen recipe
var recipeInfo = function (data) {
    var title = data.title;
    var winePair = data.winePairing.pairingText;
    var instructions = data.instructions;
    var image = data.image;

    storedTitle = title;
    recipeTitleEl.textContent = title;
    recipeImgEl.setAttribute("src", image);

    for (var i = 0; i < data.extendedIngredients.length; i++) {
        var ingredient = data.extendedIngredients[i].originalString;
        var listItem = document.createElement("li");
        listItem.textContent = ingredient;
        ingredientListEl.appendChild(listItem);
    }

    instructionsEl.innerHTML = instructions;
    winePairingEl.textContent = winePair;
};


// Gets the stock photo and name of recipe and gives an id to be used to find that recipes info
var recipeOptions = function (data) {

    while (showRecipes.firstChild) {
        showRecipes.removeChild(showRecipes.firstChild);
    };

    showRecipes.classList = "column";

    for (var i = 0; i < data.results.length; i++) {

        var dish = data.results[i].title;
        var recipeId = data.results[i].id;
        var image = data.results[i].image;

        var recipeContainer = document.createElement("button");
        var recipeImage = document.createElement("img");
        var dishTitle = document.createElement("h3");
        recipeImage.setAttribute("src", image);
        dishTitle.textContent = dish;
        recipeContainer.id = "recipe-item";
        recipeContainer.setAttribute("data-id", recipeId);
        recipeImage.setAttribute("data-id", recipeId);
        dishTitle.setAttribute("data-id", recipeId);

        recipeContainer.setAttribute("class", "column");

        showRecipes.appendChild(recipeContainer);
        recipeContainer.appendChild(recipeImage);
        recipeContainer.appendChild(dishTitle);
    }
};

//Sends the input from the form to the API URL
var formSubmitHandler = function (event) {
    event.preventDefault();

    var searchTerm = searchInputEl.value.trim();

    if (searchTerm) {
        getSpoonacularId(searchTerm);
        searchInputEl.value = "";
    };
};

// Changes the page to ./second.html
var pageChange = function () {
    var element = event.target;
    var elementId = element.getAttribute("data-id");
    saveRecipeId(elementId);

    if (element.matches("img") || element.matches("h3") || element.matches("button")) {
        window.location.replace("./second.html");
    }
}

// Gets the stored recipe Id
var storedRecipeId = function () {
    var storage = JSON.parse(localStorage.getItem("elementId"));

    if (storage === null) {
        storage = [];
        var elementId = "";
        storage.push(elementId);
    } else {
        return;
    }
};

// Sets the favStorage variable to an empty array on first visit to site, populates user favorites to drop down menu on all visits after
var storedFavorites = function () {
    if (favStorage === null) {
        favStorage = [];

    } else {
        for (var i = 0; i < favStorage.length; i++) {
            var listItem = document.createElement("li");
            var aEl = document.createElement("a");

            aEl.classList = "dropdown-item";
            aEl.setAttribute("href", "#");
            dropdownEl.appendChild(listItem);
            listItem.appendChild(aEl);
            aEl.textContent = favStorage[i].title;
            aEl.setAttribute("data-id", favStorage[i].id);
        }
    }
};

// Saves favorite recipes to local storage
var saveToFavorites = function () {
    var favorites = {
        title: storedTitle,
        id: pageDataId
    };
    favStorage.push(favorites);

    localStorage.setItem("favorites", JSON.stringify(favStorage));
};

//Saves recipe to local storage
var saveRecipeId = function (elementId) {
    localStorage.setItem('elementId', JSON.stringify(elementId));
};

// Adds functionality to recipes stored in favorites dropdown
var goToFavorite = function (event) {
    var element = event.target;
    var elementId = element.getAttribute("data-id");
    saveRecipeId(elementId);

    if (element.matches("a")) {
        window.location.replace("./second.html");
    }
};

if (location.pathname.includes("second.html")) {
    getSpoonacularRecipe();
};


storedFavorites();
storedRecipeId();
recipeSearchEl.addEventListener("submit", formSubmitHandler);
showRecipes.addEventListener("click", pageChange);
saveFavoritesEl.addEventListener("click", saveToFavorites);
dropSectionEl.addEventListener("click", goToFavorite);

