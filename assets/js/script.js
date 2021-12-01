
   
var searchInputEl = document.querySelector("#search-input");
var recipeSearchEl = document.querySelector("#search-form");
var showRecipes = document.querySelector("#recipes-list");
var recipeBtn = document.querySelector("#recipe-item");

// The endpoint for recipeOptions data
var getSpoonacularId = function (searchTerm) {
    var spoonacularIdUrl = "https://api.spoonacular.com/recipes/complexSearch?query=" + searchTerm + "&number=6&apiKey=2166a058487242eea34e1d18d83401d7";

    fetch(spoonacularIdUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // console.log(data);
                recipeOptions(data);
            })
        } else {
            //discuss ways to address errors
        }
    })
        .catch(function (error) {
            //discuss ways to address errors
        })
};


// The endpoint for recipeInfo data
var getSpoonacularRecipe = function () {

    var element = event.target;
    var recipeDataId = element.getAttribute("data-id");

    if(element.matches("img")||element.matches("h3")||element.matches("button")) {

    var recipeUrl = "https://api.spoonacular.com/recipes/" + recipeDataId + "/information?apiKey=2166a058487242eea34e1d18d83401d7";

    fetch(recipeUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // console.log(data);
                recipeInfo(data);
            })
        } else {
            //discuss ways to address errors
        }
    })
        .catch(function (error) {
            //discuss ways to discuss errors
        })
    } 
};


// Gets all ingredients and other information from the user chosen recipe
var recipeInfo = function (data) {
   
        for (var i = 0; i < data.extendedIngredients.length; i++) {
            var ingredient = data.extendedIngredients[i].name
            console.log(ingredient);
        }
        var winePair = data.winePairing.pairingText;
        console.log(winePair);    
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

        // console.log(dish);
        // console.log(id);
        // console.log(image);

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


var formSubmitHandler = function (event) {
    event.preventDefault();

    var searchTerm = searchInputEl.value.trim();

    if (searchTerm) {
        getSpoonacularId(searchTerm);
        searchInputEl.value = "";
    };
};

//	zcKjTp9a3eNAQwE1wKSEJlAiK96-3gc8QRHL1gsX secret

// na-6ec66e124fb93c190e9207b0b82f542a4952163125802803846     id
// var getKroger = function () {

//     var set = {
//         "async": true,
//         "crossDomain": true,
//         "url": "https://api-ce.kroger.com/v1/products?filter.brand=Kroger&filter.term=milk",
//         "method": "GET",
//         "headers": {
//           "Accept": "application/json",
//           "Authorization": "Bearer na-6ec66e124fb93c190e9207b0b82f542a4952163125802803846:cKjTp9a3eNAQwE1wKSEJlAiK96-3gc8QRHL1gsX"

//         }
//       }

//     fetch(set).then(function (response) {
//         if (response.ok) {
//             response.json().then(function (data) {
//               console.log(data);
//             })
//         } else {
//             //discuss ways to address errors
//         }
//     })
//         .catch(function (error) {
//             //discuss ways to discuss errors
//         })
// };

// getKroger();

recipeSearchEl.addEventListener("submit", formSubmitHandler);
showRecipes.addEventListener("click", getSpoonacularRecipe);