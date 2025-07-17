class NutritionApp {
    constructor() {
        this.foods = this.loadFromStorage();
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
    }

    initializeElements() {
        this.form = document.getElementById('food-form');
        this.foodNameInput = document.getElementById('food-name');
        this.caloriesInput = document.getElementById('calories');
        this.proteinInput = document.getElementById('protein');
        this.carbsInput = document.getElementById('carbs');
        this.fatInput = document.getElementById('fat');
        this.foodList = document.getElementById('food-list');
        this.totalCalories = document.getElementById('total-calories');
        this.totalProtein = document.getElementById('total-protein');
        this.totalCarbs = document.getElementById('total-carbs');
        this.totalFat = document.getElementById('total-fat');
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const food = {
            id: Date.now(),
            name: this.foodNameInput.value.trim(),
            calories: parseFloat(this.caloriesInput.value) || 0,
            protein: parseFloat(this.proteinInput.value) || 0,
            carbs: parseFloat(this.carbsInput.value) || 0,
            fat: parseFloat(this.fatInput.value) || 0
        };

        if (food.name && food.calories > 0) {
            this.addFood(food);
            this.clearForm();
        }
    }

    addFood(food) {
        this.foods.push(food);
        this.saveToStorage();
        this.updateDisplay();
    }

    removeFood(id) {
        this.foods = this.foods.filter(food => food.id !== id);
        this.saveToStorage();
        this.updateDisplay();
    }

    clearForm() {
        this.form.reset();
        this.foodNameInput.focus();
    }

    updateDisplay() {
        this.renderFoodList();
        this.updateSummary();
    }

    renderFoodList() {
        if (this.foods.length === 0) {
            this.foodList.innerHTML = '<p style="text-align: center; color: #6c757d; font-style: italic;">No food items added yet. Start tracking your nutrition!</p>';
            return;
        }

        this.foodList.innerHTML = this.foods.map(food => `
            <div class="food-item">
                <div class="food-details">
                    <h3>${food.name}</h3>
                    <div class="food-nutrients">
                        <span>${food.calories} cal</span>
                        <span>Protein: ${food.protein}g</span>
                        <span>Carbs: ${food.carbs}g</span>
                        <span>Fat: ${food.fat}g</span>
                    </div>
                </div>
                <button class="delete-btn" onclick="app.removeFood(${food.id})">Delete</button>
            </div>
        `).join('');
    }

    updateSummary() {
        const totals = this.foods.reduce((acc, food) => ({
            calories: acc.calories + food.calories,
            protein: acc.protein + food.protein,
            carbs: acc.carbs + food.carbs,
            fat: acc.fat + food.fat
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

        this.totalCalories.textContent = Math.round(totals.calories);
        this.totalProtein.textContent = `${totals.protein.toFixed(1)}g`;
        this.totalCarbs.textContent = `${totals.carbs.toFixed(1)}g`;
        this.totalFat.textContent = `${totals.fat.toFixed(1)}g`;
    }

    saveToStorage() {
        try {
            localStorage.setItem('nutritionAppData', JSON.stringify(this.foods));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    loadFromStorage() {
        try {
            const data = localStorage.getItem('nutritionAppData');
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return [];
        }
    }

    // Utility method to clear all data
    clearAllData() {
        if (confirm('Are you sure you want to clear all nutrition data? This cannot be undone.')) {
            this.foods = [];
            this.saveToStorage();
            this.updateDisplay();
        }
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new NutritionApp();
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = document.getElementById('food-form');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape to clear form
    if (e.key === 'Escape') {
        const form = document.getElementById('food-form');
        if (form) {
            form.reset();
            document.getElementById('food-name').focus();
        }
    }
});

// Add some sample data for demonstration (optional)
// Uncomment the following lines if you want to start with sample data
/*
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (app.foods.length === 0) {
            app.addFood({ id: 1, name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 });
            app.addFood({ id: 2, name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 });
            app.addFood({ id: 3, name: 'Brown Rice (1 cup)', calories: 216, protein: 5, carbs: 45, fat: 1.8 });
        }
    }, 100);
});
*/