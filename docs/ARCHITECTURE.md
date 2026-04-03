# ARCHITECTURE — НЕ СТУДИЯ ЗВУКОЗАПИСИ

Каноническая структура проекта (статический лендинг). Подробности бизнес-логики и контента: `PROJECT_OVERVIEW.md`, `DESIGN_SYSTEM.md`, `CONTENT.md`.

## Стек

- HTML5, CSS3, Vanilla JS — без UI-фреймворков
- Шрифты: Google Fonts (в `variables.css`)
- Локальная разработка: Vite (только dev-сервер и превью, без изменения стека страницы)

## Структура файлов

```
ne-studiya/
├── index.html
├── package.json
├── vite.config.js
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── base.css
│   ├── hero.css
│   ├── sections.css
│   ├── cards.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── cursor.js
│   ├── parallax.js
│   ├── scroll-animations.js
│   └── main.js
├── assets/
│   ├── images/
│   ├── icons/
│   │   └── logo.svg
│   └── fonts/
└── docs/
    ├── ARCHITECTURE.md
    ├── PROJECT_OVERVIEW.md
    ├── DESIGN_SYSTEM.md
    ├── CONTENT.md
    └── CURRENT_STATUS.md
```

## Секции страницы (порядок в DOM)

1. Hero  
2. Для кого  
3. Что получите  
4. Услуги  
5. О студии  
6. Footer  

## JS-модули

| Файл | Назначение |
|------|------------|
| `cursor.js` | Кастомный курсор с логотипом (lerp) |
| `parallax.js` | Параллакс Hero |
| `scroll-animations.js` | IntersectionObserver, класс `.reveal` |
| `main.js` | Точка входа, инициализация |
