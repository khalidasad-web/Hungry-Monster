const fetchMealInfo = () => {
    const searchInput = document.getElementById('search-meal').value.toLowerCase();
    const searchLtr = searchInput.charAt(0);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchLtr}`)
        .then(response => response.json())
        .then(data => displayMealInfo(data))
        .catch(error => {
            const errorMsg = `
            <h4>Info: No meal is found in the database....</h4>
            `;
            document.getElementById('display-meal-details').innerHTML = errorMsg;
        });
}
const displayMealInfo = meal => {
    const mealsContainer = document.getElementById('meals-container');
    const mealArray = meal.meals;
    mealArray.forEach(element => {
        const mealContainer = document.createElement('div');
        mealContainer.className = 'meal-container';
        const mealInfo = `
            <img onclick="displayMealDetails(${element.idMeal})" src=${element.strMealThumb} alt="">
            <p>${element.strMeal}</p>`;
        mealContainer.innerHTML = mealInfo;
        mealsContainer.appendChild(mealContainer);
    });
}
const displayMealDetails = id => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const mealDetail = document.getElementById('display-meal-details');
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const meal = `
                    <h4>Name: ${data.meals[0].strMeal}</h4>
                    <p>Category: ${data.meals[0].strCategory}</p>
                    <p>Area: ${data.meals[0].strArea}</p>
                    <p>Instruction: ${data.meals[0].strInstructions}</p>
                    `;
            mealDetail.innerHTML = meal;
        });
}