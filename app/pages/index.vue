<template>
  <main class="home-page">
    <section class="hero">
      <div class="hero__content">
        <p class="hero__eyebrow">Nowoczesna platforma nieruchomosci</p>
        <h1 class="hero__title">
          Znajdz miejsce, ktore naprawde pasuje do Ciebie
        </h1>
        <p class="hero__description">
          Przegladaj oferty mieszkan, domow i dzialek w jednym miejscu.
          Prosto, szybko i bez zbednego chaosu.
        </p>

        <div class="hero__actions">
          <button class="hero__button" type="button">
            Przegladaj oferty
          </button>
          <button class="hero__button hero__button--secondary" type="button">
            Dowiedz sie wiecej
          </button>
        </div>
      </div>

      <div class="hero__card">
        <h2 class="hero__card-title">Szybkie wyszukiwanie</h2>
        <div class="hero__card-grid">
          <div class="hero__card-item">
            <span class="hero__card-label">Lokalizacja</span>
            <strong class="hero__card-value">Warszawa</strong>
          </div>
          <div class="hero__card-item">
            <span class="hero__card-label">Typ</span>
            <strong class="hero__card-value">Mieszkanie</strong>
          </div>
          <div class="hero__card-item">
            <span class="hero__card-label">Budzet</span>
            <strong class="hero__card-value">do 850 000 zl</strong>
          </div>
          <div class="hero__card-item">
            <span class="hero__card-label">Pokoje</span>
            <strong class="hero__card-value">3 pokoje</strong>
          </div>
        </div>
      </div>
    </section>

    <section id="oferty" class="offers">
      <div class="section-heading">
        <p class="section-heading__eyebrow">Polecane</p>
        <h2 class="section-heading__title">Wybrane oferty</h2>
      </div>

      <div class="offers__grid">
        <article class="offer-card">
          <div class="offer-card__image"></div>
          <div class="offer-card__body">
            <h3 class="offer-card__title">Nowoczesne mieszkanie w centrum</h3>
            <p class="offer-card__location">Warszawa, Srodmiescie</p>
            <p class="offer-card__price">799 000 zl</p>
          </div>
        </article>

        <article class="offer-card">
          <div class="offer-card__image"></div>
          <div class="offer-card__body">
            <h3 class="offer-card__title">Dom z ogrodem dla rodziny</h3>
            <p class="offer-card__location">Gdansk, Oliwa</p>
            <p class="offer-card__price">1 290 000 zl</p>
          </div>
        </article>

        <article class="offer-card">
          <div class="offer-card__image"></div>
          <div class="offer-card__body">
            <h3 class="offer-card__title">Dzialka pod inwestycje</h3>
            <p class="offer-card__location">Krakow, obrzeza miasta</p>
            <p class="offer-card__price">540 000 zl</p>
          </div>
        </article>
      </div>
    </section>

    <section id="kontakt" class="contact">
      <div class="section-heading">
        <p class="section-heading__eyebrow">Kontakt</p>
        <h2 class="section-heading__title">Skontaktuj sie z nami</h2>
      </div>

      <div class="contact__box">
        <p class="contact__text">
          Masz pytania o oferte albo chcesz dodac swoje ogloszenie?
          Napisz do nas i odezwiemy sie jak najszybciej.
        </p>
        <button class="contact__button" type="button">
          Napisz do nas
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-page {
  padding: 32px 24px 64px;
}

.hero,
.offers,
.contact {
  max-width: 1280px;
  margin: 0 auto;
}

.hero {
  display: grid;
  grid-template-columns: 1.4fr 0.9fr;
  gap: 32px;
  align-items: stretch;
  padding: 48px 0 64px;
}

.hero__content {
  padding: 48px;
  border-radius: 28px;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #ffffff;
}

.hero__eyebrow {
  margin: 0 0 14px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #93c5fd;
}

.hero__title {
  margin: 0 0 18px;
  font-size: 52px;
  line-height: 1.05;
}

.hero__description {
  max-width: 620px;
  margin: 0 0 32px;
  font-size: 18px;
  line-height: 1.7;
  color: #cbd5e1;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.hero__button {
  padding: 14px 24px;
  border: none;
  border-radius: 14px;
  background-color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  cursor: pointer;
}

.hero__button--secondary {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: #ffffff;
}

.hero__card {
  padding: 32px;
  border: 1px solid #e2e8f0;
  border-radius: 28px;
  background-color: #ffffff;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.06);
}

.hero__card-title {
  margin: 0 0 24px;
  font-size: 24px;
  color: #0f172a;
}

.hero__card-grid {
  display: grid;
  gap: 18px;
}

.hero__card-item {
  padding: 18px;
  border-radius: 16px;
  background-color: #f8fafc;
}

.hero__card-label {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  color: #64748b;
}

.hero__card-value {
  font-size: 18px;
  color: #0f172a;
}

.section-heading {
  margin-bottom: 28px;
}

.section-heading__eyebrow {
  margin: 0 0 10px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2563eb;
}

.section-heading__title {
  margin: 0;
  font-size: 36px;
  color: #0f172a;
}

.offers {
  padding: 16px 0 56px;
}

.offers__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.offer-card {
  overflow: hidden;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  background-color: #ffffff;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.05);
}

.offer-card__image {
  height: 220px;
  background: linear-gradient(135deg, #cbd5e1, #94a3b8);
}

.offer-card__body {
  padding: 24px;
}

.offer-card__title {
  margin: 0 0 10px;
  font-size: 22px;
  color: #0f172a;
}

.offer-card__location {
  margin: 0 0 10px;
  color: #64748b;
}

.offer-card__price {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #2563eb;
}

.contact {
  padding-bottom: 24px;
}

.contact__box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 32px;
  border-radius: 24px;
  background-color: #e2e8f0;
}

.contact__text {
  max-width: 760px;
  margin: 0;
  font-size: 18px;
  line-height: 1.7;
  color: #334155;
}

.contact__button {
  padding: 14px 24px;
  border: none;
  border-radius: 14px;
  background-color: #0f172a;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
}

@media (max-width: 1100px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .offers__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .home-page {
    padding: 24px 16px 48px;
  }

  .hero {
    padding: 24px 0 48px;
  }

  .hero__content,
  .hero__card,
  .contact__box {
    padding: 24px;
  }

  .hero__title {
    font-size: 38px;
  }

  .section-heading__title {
    font-size: 28px;
  }

  .offers__grid {
    grid-template-columns: 1fr;
  }

  .contact__box {
    flex-direction: column;
    align-items: flex-start;
  }

  .contact__button {
    width: 100%;
  }
}
</style>