<template>
  <main class="home-page">
    <section class="hero">
      <div class="hero__content">
        <p class="hero__eyebrow">Projekt PWA</p>
        <h1 class="hero__title">Pierwsza wersja aplikacji w Nuxt</h1>
        <p class="hero__description">
          Startujemy od czystej, prostej struktury i czytelnego kodu.
        </p>

        <div class="hero__actions">
          <button class="hero__button" type="button">Zobacz więcej</button>
          <button class="hero__button hero__button--secondary" type="button">
            Kontakt
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  padding: 48px 20px;
  background-color: #f5f7fb;
}

.hero {
  max-width: 1100px;
  margin: 0 auto;
  padding: 64px 40px;
  border-radius: 24px;
  background-color: #ffffff;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
}

.hero__content {
  max-width: 680px;
}

.hero__eyebrow {
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2563eb;
}

.hero__title {
  margin: 0 0 16px;
  font-size: 48px;
  line-height: 1.1;
  color: #0f172a;
}

.hero__description {
  margin: 0 0 32px;
  font-size: 18px;
  line-height: 1.7;
  color: #475569;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.hero__button {
  min-width: 160px;
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  background-color: #2563eb;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hero__button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.2);
}

.hero__button--secondary {
  background-color: #e2e8f0;
  color: #0f172a;
}

.hero__button--secondary:hover {
  box-shadow: 0 12px 24px rgba(148, 163, 184, 0.25);
}

@media (max-width: 768px) {
  .home-page {
    padding: 24px 16px;
  }

  .hero {
    padding: 40px 24px;
  }

  .hero__title {
    font-size: 36px;
  }

  .hero__description {
    font-size: 16px;
  }

  .hero__button {
    width: 100%;
  }
}
</style>