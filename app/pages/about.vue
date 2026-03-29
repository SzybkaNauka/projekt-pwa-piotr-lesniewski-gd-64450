<template>
  <main class="about-page">
    <section class="about-page__box">
      <p class="about-page__eyebrow">O aplikacji</p>
      <h1 class="about-page__title">StreamBox</h1>
      <p class="about-page__text">
        Projekt inspirowany nowoczesnymi platformami VOD. Aplikacja zostala przygotowana w Nuxt 4
        z naciskiem na nowoczesny interfejs, routing oraz PWA.
      </p>

      <div class="about-page__install">
        <div>
          <p class="about-page__install-label">Instalacja w Chrome</p>
          <p class="about-page__install-text">
            Po uruchomieniu builda lub preview na localhost Chrome powinien pokazac mozliwosc
            instalacji jako aplikacji. Po instalacji StreamBox otworzy sie w osobnym oknie i mozna
            go normalnie odinstalowac z poziomu Chrome.
          </p>
        </div>

        <PwaInstallButton />
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

@media (max-width: 900px) {
  .about-page__install {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
