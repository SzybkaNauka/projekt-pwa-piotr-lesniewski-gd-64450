<template>
  <main class="about-page section">
    <section class="about-page__box box">
      <p class="about-page__eyebrow">O aplikacji</p>
      <h1 class="about-page__title">Prime Video</h1>
      <p class="about-page__text">
        Prime Video to projekt pokazowy przygotowany w celach naukowych jako dopracowana, nowoczesna
        wersja aplikacji streamingowej z wyraznym klimatem premium. Calosc skupia sie na szybkim
        przegladaniu katalogu, wygodnym wyborze profili, plynnej nawigacji i mocnym, filmowym interfejsie.
      </p>
      <p class="about-page__text about-page__text--secondary">
        Od strony technicznej projekt laczy Nuxt 4, Vue 3, Bulme i PWA w jedna spojna calosc.
        Efekt to lekka aplikacja webowa, ktora moze dzialac jak osobny program: instalowac sie,
        otwierac w osobnym oknie i trzymac najwazniejsze dane lokalnie.
      </p>

      <div class="tags are-medium about-page__tags">
        <span class="tag is-info is-light">Nuxt 4</span>
        <span class="tag is-link is-light">Vue 3</span>
        <span class="tag is-primary is-light">Bulma</span>
        <span class="tag is-info is-light">PWA</span>
      </div>

      <div class="about-page__install">
        <div>
          <p class="about-page__install-label">Instalacja jako aplikacja</p>
          <p class="about-page__install-text">
            Po instalacji Prime Video uruchamia sie jak prawdziwa aplikacja: w osobnym oknie, bez
            zbednych elementow przegladarki i z szybkim dostepem z pulpitu. W kazdej chwili mozna
            ja tez normalnie odinstalowac bezposrednio z Chrome.
          </p>
        </div>

        <PwaInstallButton />
      </div>

      <div class="buttons about-page__actions">
        <NuxtLink to="/" class="button is-info is-light is-rounded">
          Strona glowna
        </NuxtLink>
        <NuxtLink to="/moja-lista" class="button is-link is-light is-rounded">
          Moja lista
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px 24px 60px;
}

.about-page__box {
  padding: 34px;
  border-radius: 20px;
  background-color: #102131;
}

.about-page__eyebrow {
  margin: 0 0 10px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #33a7ff;
}

.about-page__title {
  margin: 0 0 14px;
  font-size: 46px;
}

.about-page__text {
  max-width: 760px;
  margin: 0;
  font-size: 18px;
  line-height: 1.7;
  color: #d7e1ea;
}

.about-page__text--secondary {
  margin-top: 14px;
  color: #aebdcb;
}

.about-page__tags {
  margin-top: 22px;
}

.about-page__install {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.about-page__install-label {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8ea2b6;
}

.about-page__install-text {
  max-width: 720px;
  margin: 0;
  color: #d7e1ea;
  line-height: 1.7;
}

.about-page__actions {
  margin-top: 24px;
}

</style>
