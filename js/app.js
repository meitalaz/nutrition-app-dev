// משתנים גלובליים לשמירת מידע
let currentUser = {
    role: null,
    name: '',
    data: {}
};

// נתונים לדוגמה
let sampleData = {
    athlete: {
        name: "דני כהן",
        currentWeight: 72.5,
        targetWeight: 73.0,
        lastWeights: [
            {date: "2025-01-06", weight: 73.2},
            {date: "2025-01-07", weight: 72.8},
            {date: "2025-01-08", weight: 72.5}
        ],
        competition: {
            name: "אליפות ישראל",
            date: "2025-01-20",
            daysLeft: 12
        }
    },
    nutritionist: {
        name: "ד\"ר שרה כהן",
        athletes: [
            {name: "דני כהן", weight: 72.5, status: "danger", lastUpdate: "היום"},
            {name: "שרה לוי", weight: 57.2, status: "warning", lastUpdate: "אתמול"},
            {name: "מיכאל רון", weight: 81.0, status: "success", lastUpdate: "היום"}
        ],
        alerts: [
            {athlete: "דני כהן", message: "ירידה חריגה במשקל", type: "danger"},
            {athlete: "שרה לוי", message: "לא מילאה הערכה שבועית", type: "warning"}
        ]
    }
};

// פונקציה לבחירת תפקיד
function selectRole(role) {
    console.log('נבחר תפקיד:', role);
    currentUser.role = role;
    
    // הסתרת מסך הברוכים הבאים
    document.getElementById('welcomeScreen').classList.add('hidden');
    
    // הצגת המסך המתאים
    if (role === 'athlete') {
        showAthleteScreen();
    } else if (role === 'nutritionist') {
        showNutritionistScreen();
    }
    
    // שמירה בזיכרון הדפדפן
    localStorage.setItem('userRole', role);
}

// הצגת מסך ספורטאי
function showAthleteScreen() {
    document.getElementById('athleteScreen').classList.remove('hidden');
    updateAthleteData();
}

// הצגת מסך מאמן תזונה
function showNutritionistScreen() {
    document.getElementById('nutritionistScreen').classList.remove('hidden');
    updateNutritionistData();
}

// עדכון נתוני ספורטאי
function updateAthleteData() {
    const data = sampleData.athlete;
    
    // עדכון השם
    const nameElement = document.querySelector('#athleteScreen h1');
    if (nameElement) {
        nameElement.innerHTML = `שלום ${data.name}! 🥋`;
    }
    
    // עדכון ימים לתחרות
    const daysElement = document.querySelector('#athleteScreen .header p');
    if (daysElement) {
        daysElement.textContent = `התחרות הבאה בעוד ${data.competition.daysLeft} ימים`;
    }
    
    // עדכון המשקל הנוכחי
    const currentWeightElement = document.querySelector('#athleteScreen .stat-number');
    if (currentWeightElement) {
        currentWeightElement.textContent = data.currentWeight;
    }
    
    // עדכון יעד הקטגוריה
    const statNumbers = document.querySelectorAll('#athleteScreen .stat-number');
    if (statNumbers.length > 1) {
        statNumbers[1].textContent = data.targetWeight;
    }
}

// עדכון נתוני מאמן תזונה
function updateNutritionistData() {
    const data = sampleData.nutritionist;
    
    // עדכון השם
    const nameElement = document.querySelector('#nutritionistScreen .header p');
    if (nameElement) {
        nameElement.textContent = data.name + ' - מאמנת תזונה';
    }
    
    // עדכון מספר ספורטאים
    const athleteCountElement = document.querySelector('#nutritionistScreen .stat-number');
    if (athleteCountElement) {
        athleteCountElement.textContent = data.athletes.length;
    }
    
    // עדכון מספר התראות
    const statNumbers = document.querySelectorAll('#nutritionistScreen .stat-number');
    if (statNumbers.length > 1) {
        statNumbers[1].textContent = data.alerts.length;
    }
}

// חזרה למסך הראשי
function goBack() {
    console.log('חזרה למסך ראשי');
    
    // הסתרת כל המסכים
    document.getElementById('athleteScreen').classList.add('hidden');
    document.getElementById('nutritionistScreen').classList.add('hidden');
    
    // הצגת מסך הברוכים הבאים
    document.getElementById('welcomeScreen').classList.remove('hidden');
    
    // איפוס המשתמש הנוכחי
    currentUser.role = null;
    localStorage.removeItem('userRole');
}

// פונקציות לכפתורי הפעולות (בינתיים יציגו הודעה)
function openWeightEntry() {
    alert('בקרוב: מסך הזנת משקל 📊');
    console.log('פותח מסך הזנת משקל');
}

function openAssessment() {
    alert('בקרוב: הערכה שבועית 📋');
    console.log('פותח הערכה שבועית');
}

function openNutrition() {
    alert('בקרוב: יומן תזונה 🍽️');
    console.log('פותח יומן תזונה');
}

function openChat() {
    alert('בקרוב: צ\'אט עם המאמן 💬');
    console.log('פותח צ\'אט');
}

function openAthletesList() {
    alert('בקרוב: רשימת ספורטאים 👥');
    console.log('פותח רשימת ספורטאים');
}

function openAnalytics() {
    alert('בקרוב: דוחות וניתוחים 📊');
    console.log('פותח ניתוחים');
}

function openMessages() {
    alert('בקרוב: מערכת הודעות 💬');
    console.log('פותח הודעות');
}

function openSettings() {
    alert('בקרוב: הגדרות מערכת ⚙️');
    console.log('פותח הגדרות');
}

// פונקציה שרצה כשהדף נטען
document.addEventListener('DOMContentLoaded', function() {
    console.log('האפליקציה טעונה וזמינה! 🚀');
    
    // בדיקה אם יש תפקיד שמור מהעבר
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
        console.log('נמצא תפקיד שמור:', savedRole);
        // אפשר לבחור אם לחזור אוטומטית או לא
        // selectRole(savedRole);
    }
    
    // הוספת מאזינים לכל הכפתורים (עבור דיבוג)
    const buttons = document.querySelectorAll('button, .role-card, .action-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('נלחץ כפתור:', this.textContent || this.innerText);
        });
    });
    
    console.log('נתונים לדוגמה:', sampleData);
});

// פונקציות עזר
function saveUserData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
    console.log('נתונים נשמרו:', data);
}

function loadUserData() {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
}

// פונקציה להצגת הודעות למשתמש
function showMessage(message, type = 'info') {
    console.log(`${type.toUpperCase()}: ${message}`);
    // בהמשך נוסיף כאן toast notifications
}

// הצגת מידע על הדפדפן (לדיבוג)
console.log('מידע על הדפדפן:', {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    localStorage: !!window.localStorage
});

console.log('🎉 JavaScript טעון בהצלחה! האפליקציה מוכנה לשימוש.');
