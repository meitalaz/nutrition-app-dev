# מדריך הרצת Voxelize

## מצב נוכחי
- הפרויקט נמצא ב: `/workspace/voxelize/`
- התלויות (pnpm) הותקנו בהצלחה
- Rust והכלים שלו מותקנים

## בעיות שנתקלנו בהן
1. **תהליכים תקועים**: פקודות ארוכות נתקעות (timeout אחרי 900 שניות)
2. **הרצה בבקשה**: הפקודה `pnpm demo` מנסה להריץ גם TypeScript וגם Rust במקביל

## פתרונות מוצעים

### 1. הרצה נפרדת של רכיבים

#### הרצת לקוח בלבד (TypeScript):
```bash
cd /workspace/voxelize/examples/client
pnpm demo
```
זה יפעיל שרת פיתוח Vite על פורט 3000

#### הרצת שרת בלבד (Rust):
```bash
cd /workspace/voxelize
source ~/.cargo/env
cargo run --release --example demo
```

### 2. בניה שלבית
```bash
# בניית חבילות TypeScript
cd /workspace/voxelize/packages
pnpm -r build

# בניית הליבה
cd /workspace/voxelize/packages/core
pnpm build
```

### 3. אפשרויות חלופיות
- **בדיקת דוגמאות אחרות**: ייתכן שיש דוגמאות פשוטות יותר בתיקייה `examples/`
- **מצב פיתוח**: שימוש ב-`pnpm watch` במקום `demo`
- **הרצה ידנית**: הרצת Vite ישירות ללא הסקריפטים

### 4. נקודות לבדיקה
- האם פורט 3000 פנוי
- האם יש תהליכים רצים ברקע
- בדיקת לוגים של השגיאות

## מבנה הפרויקט
- `examples/client/` - דמו הלקוח (Three.js + TypeScript)
- `examples/server/` - שרת המשחק (Rust)
- `packages/` - חבילות הליבה של Voxelize
- `docs/` - תיעוד

## הסיבה לבעיות
נראה שהסביבה נתקעת בתהליכים ארוכים. זה יכול להיות בגלל:
- בניה ראשונית ארוכה של Rust
- התקנות רבות של dependencies
- תהליכים תקועים ברקע

## המלצה הבאה
1. לנסות הרצה נפרדת של הלקוח בלבד
2. לבדוק שאין תהליכים תקועים
3. לנסות דוגמאות פשוטות יותר אם יש כאלה