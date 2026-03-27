<template>
  <main class="about-page">
    <section class="about-hero">
      <p class="about-hero__eyebrow">O nas</p>
      <h1 class="about-hero__title">
        Tworzymy miejsce, w ktorym szukanie nieruchomosci jest prostsze
      </h1>
      <p class="about-hero__text">
        Naszym celem jest polaczenie nowoczesnego wygladu, czytelnej wyszukiwarki
        i dobrze uporzadkowanych ofert w jednej platformie.
      </p>
    </section>

    <section class="about-values">
      <article class="about-card">
        <h2 class="about-card__title">Przejrzystosc</h2>
        <p class="about-card__text">
          Stawiamy na jasne informacje, czytelny uklad i wygodna nawigacje po serwisie.
        </p>
      </article>

      <article class="about-card">
        <h2 class="about-card__title">Nowoczesnosc</h2>
        <p class="about-card__text">
          Projekt opiera sie na nowoczesnym podejsciu do budowy aplikacji webowych i UX.
        </p>
      </article>

      <article class="about-card">
        <h2 class="about-card__title">Wygoda</h2>
        <p class="about-card__text">
          Uzytkownik ma szybko znalezc interesujace go oferty bez niepotrzebnego chaosu.
        </p>
      </article>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 24px 64px;
}

.about-hero {
  margin-bottom: 40px;
  padding: 40px;
  border-radius: 28px;
  background-color: #ffffff;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.06);
}

.about-hero__eyebrow {
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2563eb;
}

.about-hero__title {
  max-width: 800px;
  margin: 0 0 18px;
  font-size: 46px;
  line-height: 1.1;
  color: #0f172a;
}

.about-hero__text {
  max-width: 760px;
  margin: 0;
  font-size: 18px;
  line-height: 1.7;
  color: #475569;
}

.about-values {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.about-card {
  padding: 28px;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  background-color: #ffffff;
}

.about-card__title {
  margin: 0 0 14px;
  font-size: 24px;
  color: #0f172a;
}

.about-card__text {
  margin: 0;
  font-size: 17px;
  line-height: 1.7;
  color: #64748b;
}

@media (max-width: 900px) {
  .about-values {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .about-page {
    padding: 24px 16px 48px;
  }

  .about-hero {
    padding: 24px;
  }

  .about-hero__title {
    font-size: 34px;
  }
}
</style>