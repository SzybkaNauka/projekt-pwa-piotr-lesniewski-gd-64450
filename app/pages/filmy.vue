<script setup>
const movies = [
  { title: 'Aniol Stroz', image: '/images/posters/poster-1.jpg' },
  { title: 'Agent', image: '/images/posters/poster-2.jpg' },
  { title: 'Wielki Marsz', image: '/images/posters/poster-3.jpg' },
  { title: 'Borderlands', image: '/images/posters/poster-4.jpg' },
  { title: 'Kruk', image: '/images/posters/poster-5.jpg' },
  { title: 'Zaginiony', image: '/images/posters/poster-6.jpg' },
]
</script>

<template>
  <main class="page">
    <section class="page__hero">
      <h1 class="page__title">Filmy</h1>
      <p class="page__text">Najpopularniejsze filmy w stylu premium streaming.</p>
    </section>

    <MovieRow title="Polecane filmy" :items="movies" />
    <MovieRow title="Nowosci" :items="movies" />
  </main>
</template>

<style scoped>
.page {
  padding-top: 24px;
}

.page__hero {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px 32px;
}

.page__title {
  margin: 0 0 10px;
  font-size: 52px;
}

.page__text {
  margin: 0;
  font-size: 18px;
  color: #d7e1ea;
}
</style>