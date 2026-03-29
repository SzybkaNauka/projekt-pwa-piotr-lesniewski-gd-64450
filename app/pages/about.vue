<template>
  <main class="about-page">
    <section class="about-page__box">
      <p class="about-page__eyebrow">O aplikacji</p>
      <h1 class="about-page__title">StreamBox</h1>
      <p class="about-page__text">
        Projekt inspirowany nowoczesnymi platformami VOD. Aplikacja zostala przygotowana w Nuxt 4
        z naciskiem na nowoczesny interfejs, routing oraz PWA.
      </p>
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
</style>