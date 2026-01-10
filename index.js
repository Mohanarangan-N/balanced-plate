const form = document.getElementById("mealForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      ingredients: ingredients.value,
      diet: diet.value,
      goal: goal.value
    };

    localStorage.setItem("mealData", JSON.stringify(data));
    window.location.href = "result.html";
  });
}

const resultBox = document.getElementById("mealResult");
if (resultBox) {
  const data = JSON.parse(localStorage.getItem("mealData"));

  resultBox.innerHTML = `
    <h3>Vegetable Dal Rice Bowl</h3>
    <p><strong>Diet:</strong> ${data.diet}</p>
    <p><strong>Goal:</strong> ${data.goal}</p>
    <p>This meal follows balanced plate principles.</p>
  `;
}
