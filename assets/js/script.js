var recipesEl = document.querySelector("#recipes-list");

var getSpoonacularId = function() {
    var spoonacularIdUrl = "https://api.spoonacular.com/recipes/complexSearch?query=pasta&number=6&apiKey=2166a058487242eea34e1d18d83401d7";

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

var getSpoonacularRecipe = function () {
    var recipeUrl = "https://api.spoonacular.com/recipes/654901/information?apiKey=2166a058487242eea34e1d18d83401d7";

    fetch(recipeUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
              console.log(data);
              recipeInfo(data);
            })
        } else {
            //discuss ways to address errors
        }
    })
        .catch(function (error) {
            //discuss ways to discuss errors
        })
};

var recipeInfo = function(data) {
    for (var i = 0; i < data.extendedIngredients.length; i++) {
        var ingredient = data.extendedIngredients[i].name
      //   console.log(ingredient);
    }
    var winePair = data.winePairing.pairingText;
  //   console.log(winePair);
}

var recipeOptions = function(data) {
    for(var i = 0; i < data.results.length; i++) {

            var dish = data.results[i].title;
            var id = data.results[i].id;
            var image = data.results[i].image;

            // console.log(dish);
            // console.log(id);
            // console.log(image);

            var recipeImageContainer = document.createElement("a");
            var recipeImage = document.createElement("img");
            var dishTitle = document.createElement("h3");
            recipeImage.setAttribute("src", image);
            dishTitle.textContent = dish;

            recipeImageContainer.setAttribute("class", "column");

            recipesEl.appendChild(recipeImageContainer);
            recipeImageContainer.appendChild(recipeImage);
            recipeImageContainer.appendChild(dishTitle);
    }
}
  
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

getSpoonacularRecipe();
// getKroger();