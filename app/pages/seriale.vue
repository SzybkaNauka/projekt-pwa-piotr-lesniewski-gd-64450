<script setup>
const series = [
  { title: 'Granica Mroku', image: '/images/posters/poster-7.jpg' },
  { title: 'Miasto Bez Snu', image: '/images/posters/poster-8.jpg' },
  { title: 'Kod 47', image: '/images/posters/poster-9.jpg' },
  { title: 'Ostatnia Linia', image: '/images/posters/poster-10.jpg' },
  { title: 'Widmo', image: '/images/posters/poster-1.jpg' },
  { title: 'Punkt Krytyczny', image: '/images/posters/poster-2.jpg' },
]
</script>

<template>
  <main class="page">
    <section class="page__hero">
      <h1 class="page__title">Seriale</h1>
      <p class="page__text">Nowe sezony, polecane serie i najmocniejsze premiery.</p>
    </section>

    <MovieRow title="Popularne seriale" :items="series" />
    <MovieRow title="Ogladaj dalej" :items="series" />
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