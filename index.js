// -----------------------------
// MOCK DATA / PLACEHOLDERS
// In real use, fetch from n8n Excel webhook
// -----------------------------
let currentUser = {
  name: "Mohanarangan",
  caloriesTarget: 2000,
  proteinTarget: 50,
  carbsTarget: 250,
  fatsTarget: 70,
  meals: [
    {
      type: "Breakfast",
      name: "Oatmeal with fruits",
      calories: 350,
      protein: 10,
      carbs: 60,
      fats: 8,
      eaten: false
    },
    {
      type: "Lunch",
      name: "Grilled chicken salad",
      calories: 500,
      protein: 40,
      carbs: 30,
      fats: 15,
      eaten: false
    },
    {
      type: "Dinner",
      name: "Vegetable stir fry with tofu",
      calories: 450,
      protein: 20,
      carbs: 50,
      fats: 12,
      eaten: false
    }
  ]
};

// -----------------------------
// DASHBOARD POPULATION
// -----------------------------
function populateDashboard() {
  const userNameEl = document.getElementById("user-name");
  if (userNameEl) userNameEl.innerText = currentUser.name;

  const caloriesEl = document.getElementById("calories");
  const proteinEl = document.getElementById("protein");
  const carbsEl = document.getElementById("carbs");
  const fatsEl = document.getElementById("fats");

  let totalCalories = currentUser.meals.reduce((acc, m) => acc + m.calories, 0);
  let totalProtein = currentUser.meals.reduce((acc, m) => acc + m.protein, 0);
  let totalCarbs = currentUser.meals.reduce((acc, m) => acc + m.carbs, 0);
  let totalFats = currentUser.meals.reduce((acc, m) => acc + m.fats, 0);

  if (caloriesEl) caloriesEl.innerText = `${totalCalories} / ${currentUser.caloriesTarget} kcal`;
  if (proteinEl) proteinEl.innerText = `${totalProtein} / ${currentUser.proteinTarget}g`;
  if (carbsEl) carbsEl.innerText = `${totalCarbs} / ${currentUser.carbsTarget}g`;
  if (fatsEl) fatsEl.innerText = `${totalFats} / ${currentUser.fatsTarget}g`;
}

// -----------------------------
// MEAL GENERATION FORM
// -----------------------------
const mealForm = document.getElementById("meal-form");
if (mealForm) {
  mealForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const ingredients = document.getElementById("ingredients").value;
    const mealType = document.getElementById("meal-type").value;
    const dietType = document.getElementById("diet-type").value;
    const healthGoal = document.getElementById("health-goal").value;

    // Simulate AI meal generation (replace with n8n webhook)
    const generatedMeal = {
      name: `${dietType} ${mealType} with ${ingredients.split(',')[0]}`,
      ingredients: ingredients,
      calories: Math.floor(Math.random() * 500) + 200,
      protein: Math.floor(Math.random() * 30) + 5,
      carbs: Math.floor(Math.random() * 70) + 20,
      fats: Math.floor(Math.random() * 20) + 5
    };

    // Populate generated meal section
    document.getElementById("meal-name").innerText = generatedMeal.name;
    document.getElementById("meal-ingredients").innerText = `Ingredients: ${generatedMeal.ingredients}`;
    document.getElementById("meal-calories").innerText = `Calories: ${generatedMeal.calories} kcal`;
    document.getElementById("meal-macros").innerText = `Protein: ${generatedMeal.protein}g | Carbs: ${generatedMeal.carbs}g | Fats: ${generatedMeal.fats}g`;

    // Save Meal button
    const saveBtn = document.getElementById("save-meal-btn");
    saveBtn.onclick = () => {
      alert("Meal saved successfully! (Here you can call n8n webhook to save to Excel)");
      currentUser.meals.push({
        type: mealType,
        ...generatedMeal,
        eaten: false
      });
      populateDashboard(); // Update dashboard totals
    };
  });
}

// -----------------------------
// MARK MEAL AS EATEN
// -----------------------------
document.querySelectorAll(".meal-card .btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const mealName = e.target.parentElement.querySelector("h3").innerText;
    const meal = currentUser.meals.find(m => m.name === mealName);
    if (meal) {
      meal.eaten = true;
      e.target.innerText = "Eaten ✅";
      e.target.disabled = true;
      alert(`${mealName} marked as eaten! (Sync with n8n Excel sheet)`);
    }
  });
});

// -----------------------------
// PROGRESS PAGE CHARTS (CHART.JS)
// -----------------------------
function populateProgressCharts() {
  if (!document.getElementById("weight-chart")) return;

  // Mock data
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weightData = [70, 70.2, 70.1, 69.8, 69.5, 69.6, 69.4];
  const bmiData = [22.5, 22.6, 22.5, 22.4, 22.3, 22.4, 22.3];
  const adherenceData = [80, 85, 75, 90, 88, 80, 95];

  const ctxWeight = document.getElementById("weight-chart").getContext("2d");
  const ctxBMI = document.getElementById("bmi-chart").getContext("2d");
  const ctxAdherence = document.getElementById("adherence-chart").getContext("2d");

  new Chart(ctxWeight, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Weight (kg)',
        data: weightData,
        borderColor: '#4caf50',
        fill: false
      }]
    }
  });

  new Chart(ctxBMI, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'BMI',
        data: bmiData,
        borderColor: '#388e3c',
        fill: false
      }]
    }
  });

  new Chart(ctxAdherence, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Meal Adherence (%)',
        data: adherenceData,
        backgroundColor: '#4caf50'
      }]
    }
  });
}

// -----------------------------
// CONTACT FORM
// -----------------------------
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const message = document.getElementById("contact-message").value;

    alert(`Thank you ${name}! Your message has been sent. (Integrate with n8n email webhook)`);
    contactForm.reset();
  });
}

// -----------------------------
// SETTINGS FORM
// -----------------------------
const updateProfileForm = document.getElementById("update-profile-form");
if (updateProfileForm) {
  updateProfileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Profile updated! (Sync with n8n Excel sheet)");
  });
}

const updateDietForm = document.getElementById("update-diet-form");
if (updateDietForm) {
  updateDietForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Health goals & diet preferences updated! (Sync with n8n Excel sheet)");
  });
}

const changePasswordForm = document.getElementById("change-password-form");
if (changePasswordForm) {
  changePasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      alert("Password updated! (Sync with n8n Excel sheet)");
    }
  });
}

// -----------------------------
// INITIALIZE
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  populateDashboard();
  populateProgressCharts();
});
