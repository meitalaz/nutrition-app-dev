class NutritionApp {
    constructor() {
        this.foods = this.loadFromStorage();
        this.aiAnalysis = this.loadAIAnalysis();
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
        this.initializeAI();
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
        
        // AI elements
        this.aiMessages = document.getElementById('ai-messages');
        this.aiInput = document.getElementById('ai-input');
        this.aiSendBtn = document.getElementById('ai-send-btn');
        this.smartSuggestions = document.getElementById('smart-suggestions');
        this.aiAnalysisContainer = document.getElementById('ai-analysis');
        this.recommendationsContainer = document.getElementById('ai-recommendations');
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // AI event listeners
        this.aiSendBtn.addEventListener('click', () => this.sendAIMessage());
        this.aiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendAIMessage();
        });
        
        document.getElementById('get-suggestions-btn').addEventListener('click', () => this.generateSuggestions());
        document.getElementById('ai-analyze-btn').addEventListener('click', () => this.analyzeWithAI());
        document.getElementById('update-recommendations-btn').addEventListener('click', () => this.updateRecommendations());
    }

    initializeAI() {
        this.generateSuggestions();
        this.updateRecommendations();
        this.analyzeCurrentIntake();
    }

    // AI Food Database
    getFoodDatabase() {
        return [
            { name: 'תפוח', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, benefits: 'עשיר בסיבים וויטמין C' },
            { name: 'בננה', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, benefits: 'מקור טוב לאשלגן' },
            { name: 'חזה עוף (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6, benefits: 'חלבון רזה איכותי' },
            { name: 'ביצה', calories: 70, protein: 6, carbs: 0.6, fat: 5, benefits: 'חלבון מלא עם ויטמינים' },
            { name: 'אורז חום (כוס)', calories: 216, protein: 5, carbs: 45, fat: 1.8, benefits: 'פחמימות מורכבות' },
            { name: 'שקדים (30g)', calories: 173, protein: 6.3, carbs: 6.1, fat: 15, benefits: 'שומנים בריאים' },
            { name: 'יוגורט יווני (150g)', calories: 100, protein: 17, carbs: 6, fat: 0.4, benefits: 'פרוביוטיקה וחלבון' },
            { name: 'אבוקדו (חצי)', calories: 160, protein: 2, carbs: 8.5, fat: 15, benefits: 'שומנים חד בלתי רוויים' },
            { name: 'ברוקולי (כוס)', calories: 25, protein: 3, carbs: 5, fat: 0.3, benefits: 'ויטמין K וחומצה פולית' },
            { name: 'סלמון (100g)', calories: 208, protein: 22, carbs: 0, fat: 13, benefits: 'אומגה 3 וחלבון איכותי' },
            { name: 'קינואה (כוס)', calories: 222, protein: 8, carbs: 39, fat: 3.6, benefits: 'חלבון מלא צמחי' },
            { name: 'גזר', calories: 25, protein: 0.5, carbs: 6, fat: 0.1, benefits: 'בטא קרוטן לראייה' }
        ];
    }

    // AI Message System
    sendAIMessage() {
        const message = this.aiInput.value.trim();
        if (!message) return;

        this.addAIMessage(message, 'user');
        this.aiInput.value = '';
        
        // Simulate AI thinking
        setTimeout(() => {
            const response = this.generateAIResponse(message);
            this.addAIMessage(response, 'assistant');
        }, 1000);
    }

    addAIMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${sender}`;
        
        const avatar = sender === 'assistant' ? '🤖' : '👤';
        const backgroundColor = sender === 'assistant' ? '#f0f7ff' : '#667eea';
        
        messageDiv.innerHTML = `
            <span class="ai-avatar">${avatar}</span>
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
        
        this.aiMessages.appendChild(messageDiv);
        this.aiMessages.scrollTop = this.aiMessages.scrollHeight;
    }

    generateAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('המלצ') || message.includes('מה לאכול')) {
            return this.getRandomRecommendation();
        } else if (message.includes('קלורי') || message.includes('משקל')) {
            return this.getCalorieAdvice();
        } else if (message.includes('חלבון')) {
            return 'לחלבון יש תפקיד חשוב בבניית שריר ותיקון רקמות. מומלץ לצרוך 1.6-2.2 גרם חלבון לכל קילוגרם משקל גוף. מקורות טובים: עוף, ביצים, קטניות, אגוזים.';
        } else if (message.includes('פחמימות')) {
            return 'פחמימות הן מקור האנרגיה העיקרי לגוף. העדיפו פחמימות מורכבות כמו אורז מלא, קינואה וירקות על פני סוכרים פשוטים.';
        } else if (message.includes('שומן')) {
            return 'שומנים בריאים חיוניים לבריאות. התמקדו בשומנים חד בלתי רוויים מאבוקדו, אגוזים ושמן זית, והימנעו משומנים טרנס.';
        } else if (message.includes('מים') || message.includes('שתי')) {
            return 'מומלץ לשתות לפחות 8 כוסות מים ביום. תזכורת: אם אתם מתאמנים, תשתו עוד יותר להחלפת הנוזלים שאבדו.';
        } else {
            const responses = [
                'זה שאלה מעניינת! אני כאן לעזור לך עם כל נושא תזונתי.',
                'בוא נדבר על זה יותר - איך אני יכול לעזור לך להשיג את המטרות התזונתיות שלך?',
                'תזונה נכונה היא מפתח לבריאות טובה. מה עוד תרצה לדעת?',
                'אני כאן לעזור! תוכל לשאול אותי על קלוריות, חלבונים, פחמימות או כל נושא תזונתי אחר.'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }

    getRandomRecommendation() {
        const recommendations = [
            'מומלץ להתחיל את היום עם ארוחת בוקר עתירת חלבון - ביצים עם ירקות ופרוסת לחם מלא.',
            'לחטיף בריא: תערובת של אגוזים ופירות יבשים עם יוגורט יווני.',
            'ארוחת צהריים מושלמת: סלט עם חלבון רזה, אבוקדו וקינואה.',
            'לארוחת ערב: דג אפוי עם ירקות מאודים ובטטה.',
            'זכור לשתות מים לפני כל ארוחה - זה עוזר לעיכול ותחושת השובע.'
        ];
        return recommendations[Math.floor(Math.random() * recommendations.length)];
    }

    getCalorieAdvice() {
        const currentCalories = this.getCurrentTotalCalories();
        if (currentCalories < 1200) {
            return 'נראה שאתה צורך מעט קלוריות. חשוב לוודא שאתה מקבל מספיק אנרגיה לתפקוד תקין של הגוף.';
        } else if (currentCalories > 2500) {
            return 'צריכת הקלוריות שלך גבוהה. אולי כדאי להתמקד במזונות עתירי חומרי הזנה אך דלי קלוריות.';
        } else {
            return 'צריכת הקלוריות שלך נראית סבירה. המשך לעקוב אחר האיכות של המזון שאתה צורך.';
        }
    }

    // Smart Food Suggestions
    generateSuggestions() {
        const suggestions = this.getSmartSuggestions();
        this.displaySuggestions(suggestions);
    }

    getSmartSuggestions() {
        const currentTotals = this.getCurrentTotals();
        const foodDb = this.getFoodDatabase();
        let suggestions = [];

        // Logic for intelligent suggestions based on current intake
        if (currentTotals.protein < 50) {
            suggestions.push(...foodDb.filter(food => food.protein > 15));
        }
        
        if (currentTotals.calories < 1500) {
            suggestions.push(...foodDb.filter(food => food.calories > 150));
        }
        
        if (suggestions.length === 0) {
            // Default healthy suggestions
            suggestions = [
                foodDb.find(food => food.name === 'תפוח'),
                foodDb.find(food => food.name === 'יוגורט יווני (150g)'),
                foodDb.find(food => food.name === 'שקדים (30g)'),
                foodDb.find(food => food.name === 'ברוקולי (כוס)')
            ].filter(Boolean);
        }

        // Limit to 4 suggestions and remove duplicates
        return [...new Set(suggestions)].slice(0, 4);
    }

    displaySuggestions(suggestions) {
        this.smartSuggestions.innerHTML = suggestions.map(food => `
            <div class="suggestion-card" onclick="app.addSuggestedFood('${food.name}', ${food.calories}, ${food.protein}, ${food.carbs}, ${food.fat})">
                <h4>${food.name}</h4>
                <p>${food.benefits}</p>
                <div class="suggestion-nutrients">
                    <span>${food.calories} קל'</span>
                    <span>חלבון: ${food.protein}g</span>
                    <span>פחמימות: ${food.carbs}g</span>
                    <span>שומן: ${food.fat}g</span>
                </div>
            </div>
        `).join('');
    }

    addSuggestedFood(name, calories, protein, carbs, fat) {
        const food = {
            id: Date.now(),
            name,
            calories,
            protein,
            carbs,
            fat
        };
        
        this.addFood(food);
        this.addAIMessage(`הוספתי "${name}" לרשימת המזון שלך! 👍`, 'assistant');
    }

    // AI Analysis
    analyzeWithAI() {
        const analysis = this.performNutritionAnalysis();
        this.displayAIAnalysis(analysis);
    }

    performNutritionAnalysis() {
        const totals = this.getCurrentTotals();
        const analysis = [];

        // Calorie analysis
        if (totals.calories < 1200) {
            analysis.push({
                type: 'warning',
                title: 'צריכת קלוריות נמוכה',
                description: 'ייתכן שאינך צורך מספיק קלוריות. זה עלול להאט את חילוף החומרים.'
            });
        } else if (totals.calories > 2500) {
            analysis.push({
                type: 'caution',
                title: 'צריכת קלוריות גבוהה',
                description: 'שקול להפחית מעט בקלוריות או להגדיל את הפעילות הגופנית.'
            });
        } else {
            analysis.push({
                type: 'good',
                title: 'צריכת קלוריות טובה',
                description: 'צריכת הקלוריות שלך נמצאת בטווח בריא.'
            });
        }

        // Protein analysis
        const proteinRatio = (totals.protein * 4) / totals.calories;
        if (proteinRatio < 0.15) {
            analysis.push({
                type: 'warning',
                title: 'חוסר בחלבון',
                description: 'מומלץ להגדיל את צריכת החלבון לשמירה על מסת השריר.'
            });
        } else {
            analysis.push({
                type: 'good',
                title: 'צריכת חלבון טובה',
                description: 'אתה צורך כמות חלבון מתאימה.'
            });
        }

        // Carbs analysis
        const carbsRatio = (totals.carbs * 4) / totals.calories;
        if (carbsRatio > 0.6) {
            analysis.push({
                type: 'caution',
                title: 'פחמימות גבוהות',
                description: 'שקול להפחית בפחמימות ולהגדיל חלבונים ושומנים בריאים.'
            });
        }

        return analysis;
    }

    displayAIAnalysis(analysis) {
        if (analysis.length === 0) {
            this.aiAnalysisContainer.innerHTML = '<p>אין מספיק נתונים לניתוח</p>';
            return;
        }

        this.aiAnalysisContainer.innerHTML = analysis.map(item => `
            <div class="analysis-item">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        `).join('');
    }

    analyzeCurrentIntake() {
        if (this.foods.length > 0) {
            setTimeout(() => this.analyzeWithAI(), 500);
        }
    }

    // Personalized Recommendations
    updateRecommendations() {
        const recommendations = this.generatePersonalizedRecommendations();
        this.displayRecommendations(recommendations);
    }

    generatePersonalizedRecommendations() {
        const totals = this.getCurrentTotals();
        const recommendations = [];

        // Time-based recommendations
        const hour = new Date().getHours();
        if (hour < 10) {
            recommendations.push({
                title: 'ארוחת בוקר מומלצת',
                description: 'התחל את היום עם ביצים, אבוקדו ולחם מלא לאנרגיה מתמשכת.'
            });
        } else if (hour < 14) {
            recommendations.push({
                title: 'ארוחת צהריים מאוזנת',
                description: 'שלב חלבון רזה עם ירקות וקינואה לארוחת צהריים מזינה.'
            });
        } else {
            recommendations.push({
                title: 'ארוחת ערב קלה',
                description: 'בחר בדג אפוי עם ירקות מאודים - קל לעיכול לפני השינה.'
            });
        }

        // Nutrient-based recommendations
        if (totals.protein < 20) {
            recommendations.push({
                title: 'הגדל צריכת חלבון',
                description: 'הוסף יוגורט יווני, ביצים או חזה עוף לתפריט היומי שלך.'
            });
        }

        if (totals.calories < 1000) {
            recommendations.push({
                title: 'הגדל צריכת קלוריות',
                description: 'הוסף אגוזים, אבוקדו או שמן זית למזון שלך לקלוריות בריאות.'
            });
        }

        // Weekly goals
        recommendations.push({
            title: 'מטרה השבועית',
            description: 'נסה לאכול לפחות 5 מנות של פירות וירקות מדי יום.'
        });

        return recommendations.slice(0, 4); // Limit to 4 recommendations
    }

    displayRecommendations(recommendations) {
        this.recommendationsContainer.innerHTML = recommendations.map(rec => `
            <div class="recommendation-item">
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
            </div>
        `).join('');
    }

    // Helper methods
    getCurrentTotals() {
        return this.foods.reduce((acc, food) => ({
            calories: acc.calories + food.calories,
            protein: acc.protein + food.protein,
            carbs: acc.carbs + food.carbs,
            fat: acc.fat + food.fat
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
    }

    getCurrentTotalCalories() {
        return this.foods.reduce((total, food) => total + food.calories, 0);
    }

    // Original methods with AI enhancements
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
            
            // AI feedback
            setTimeout(() => {
                this.addAIMessage(`נהדר! הוספת "${food.name}" עם ${food.calories} קלוריות. 🎉`, 'assistant');
                this.analyzeWithAI();
                this.updateRecommendations();
            }, 500);
        }
    }

    addFood(food) {
        this.foods.push(food);
        this.saveToStorage();
        this.updateDisplay();
        this.generateSuggestions(); // Update suggestions based on new food
    }

    removeFood(id) {
        this.foods = this.foods.filter(food => food.id !== id);
        this.saveToStorage();
        this.updateDisplay();
        this.analyzeWithAI();
        this.updateRecommendations();
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
            this.foodList.innerHTML = '<p style="text-align: center; color: #6c757d; font-style: italic;">עדיין לא הוספת מזון. התחל לעקוב אחר התזונה שלך!</p>';
            return;
        }

        this.foodList.innerHTML = this.foods.map(food => `
            <div class="food-item">
                <div class="food-details">
                    <h3>${food.name}</h3>
                    <div class="food-nutrients">
                        <span>${food.calories} קל'</span>
                        <span>חלבון: ${food.protein}g</span>
                        <span>פחמימות: ${food.carbs}g</span>
                        <span>שומן: ${food.fat}g</span>
                    </div>
                </div>
                <button class="delete-btn" onclick="app.removeFood(${food.id})">מחק</button>
            </div>
        `).join('');
    }

    updateSummary() {
        const totals = this.getCurrentTotals();

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

    saveAIAnalysis() {
        try {
            localStorage.setItem('aiAnalysisData', JSON.stringify(this.aiAnalysis));
        } catch (error) {
            console.error('Error saving AI analysis:', error);
        }
    }

    loadAIAnalysis() {
        try {
            const data = localStorage.getItem('aiAnalysisData');
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Error loading AI analysis:', error);
            return {};
        }
    }

    // Utility method to clear all data
    clearAllData() {
        if (confirm('האם אתה בטוח שברצונך למחוק את כל הנתונים התזונתיים? פעולה זו לא ניתנת לביטול.')) {
            this.foods = [];
            this.aiAnalysis = {};
            this.saveToStorage();
            this.saveAIAnalysis();
            this.updateDisplay();
            this.aiMessages.innerHTML = '';
            this.initializeAI();
        }
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new NutritionApp();
});

// Enhanced keyboard shortcuts
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

    // Alt + A to focus on AI input
    if (e.altKey && e.key === 'a') {
        e.preventDefault();
        document.getElementById('ai-input').focus();
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