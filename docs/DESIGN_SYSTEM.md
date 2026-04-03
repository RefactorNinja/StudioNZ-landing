# DESIGN SYSTEM — НЕ СТУДИЯ ЗВУКОЗАПИСИ

## Концепция
**"Ночная студия"** — как будто ты зашёл в студию в 2 ночи, всё готово, аппаратура светится, 
пахнет кофе и возможностями. Тепло, атмосферно, не пафосно.

---

## Цветовая палитра

```css
:root {
  /* Фоны */
  --bg-primary:    #0a0705;   /* Почти чёрный с тёплым оттенком */
  --bg-secondary:  #110e0a;   /* Карточки и секции */
  --bg-card:       #1a1510;   /* Карточки услуг */
  --bg-elevated:   #221c15;   /* Поднятые элементы */

  /* Акцент */
  --accent:        #FF5500;   /* Неоновый оранжевый — главный */
  --accent-dim:    #CC4400;   /* Приглушённый акцент */
  --accent-glow:   rgba(255, 85, 0, 0.3);  /* Glow вокруг акцента */
  --accent-subtle: rgba(255, 85, 0, 0.08); /* Очень лёгкий фон */

  /* Текст */
  --text-primary:  #F5EDE0;   /* Тёплый белый — основной текст */
  --text-secondary:#A08060;   /* Приглушённый текст */
  --text-muted:    #5A4535;   /* Очень приглушённый */

  /* Специальные */
  --border:        rgba(255, 85, 0, 0.15); /* Границы */
  --border-subtle: rgba(240, 200, 150, 0.08); /* Нейтральные границы */
  --separator:     rgba(255, 85, 0, 0.2);  /* Разделители */
}
```

---

## Типографика

### Шрифты
```css
/* Display — для заголовков (мощный, кириллический) */
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&display=swap');

/* Body — чистый, читаемый */  
@import url('https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600&display=swap');
```

**Unbounded** — геометрический гротеск, отлично работает на кириллице, ощущение силы  
**Golos Text** — российский шрифт, разработан для экрана, отличная читаемость

### Шкала размеров
```css
--text-xs:   0.75rem;   /* 12px — мелкие подписи */
--text-sm:   0.875rem;  /* 14px — вторичный текст */
--text-base: 1rem;      /* 16px — основной текст */
--text-lg:   1.25rem;   /* 20px — подзаголовки */
--text-xl:   1.5rem;    /* 24px — заголовки секций */
--text-2xl:  2rem;      /* 32px */
--text-3xl:  2.75rem;   /* 44px */
--text-hero: clamp(3rem, 8vw, 7rem); /* Hero — адаптивный */
```

### Применение
- `Unbounded 900` — Hero-заголовок "НЕ СТУДИЯ ЗВУКОЗАПИСИ"
- `Unbounded 700` — Заголовки секций
- `Unbounded 400` — Подзаголовки карточек
- `Golos Text 400/500` — Основной текст, описания
- `Golos Text 600` — Цены, важные акценты

---

## Пространство и отступы

```css
--space-xs:  0.5rem;    /* 8px */
--space-sm:  1rem;      /* 16px */
--space-md:  1.5rem;    /* 24px */
--space-lg:  2.5rem;    /* 40px */
--space-xl:  4rem;      /* 64px */
--space-2xl: 6rem;      /* 96px */
--space-3xl: 8rem;      /* 128px */

--section-padding: clamp(4rem, 8vw, 8rem); /* Отступы секций */
--container-max:   1200px;
--container-pad:   clamp(1rem, 4vw, 3rem);
```

---

## Анимации

### Принципы
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` — плавный вход, резкий выход (ощущение уверенности)
- Длительность базовая: `0.6s`
- Stagger между карточками: `0.1s`
- Параллакс: `transform: translateY()` на JS scroll event

### Scroll-triggered (IntersectionObserver)
```css
/* Базовое состояние до появления */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Glow-пульсация на акцентных элементах
```css
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px var(--accent-glow); }
  50%       { box-shadow: 0 0 40px rgba(255,85,0,0.5); }
}
```

### Hero fadeIn
```css
@keyframes hero-enter {
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
```

---

## Компоненты

### Кнопки
```
Первичная:  bg #FF5500, text #0a0705, font Unbounded 700, glow на hover
Вторичная:  border 1px #FF5500, text #FF5500, bg transparent, fill на hover
```

### Карточки
```
bg: var(--bg-card)
border: 1px solid var(--border)
border-radius: 16px
padding: 2rem
hover: border-color #FF5500, translateY(-4px), glow
```

### Separator-линия
```
1px solid var(--separator)
с оранжевым градиентом по центру
```

---

## Glow-эффекты

```css
/* Текстовый glow */
.glow-text {
  text-shadow: 0 0 30px rgba(255,85,0,0.4), 0 0 60px rgba(255,85,0,0.2);
}

/* Блок glow */  
.glow-box {
  box-shadow: 0 0 40px rgba(255,85,0,0.15), inset 0 0 40px rgba(255,85,0,0.05);
}

/* Кнопка glow */
.btn-primary:hover {
  box-shadow: 0 0 30px rgba(255,85,0,0.5), 0 8px 30px rgba(255,85,0,0.3);
}
```

---

## Кастомный курсор

```js
// Логотип SVG следует за курсором с lag-эффектом (lerp)
// Размер: 48x48px
// opacity: 0.85
// mix-blend-mode: normal
// transition: transform 0.1s ease (smooth follow)
```
