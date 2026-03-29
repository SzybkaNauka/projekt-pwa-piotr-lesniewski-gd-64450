<script setup>
const featured = [
  { title: 'Aniol Stroz', image: '/images/posters/poster-1.jpg' },
  { title: 'Agent', image: '/images/posters/poster-2.jpg' },
  { title: 'Wielki Marsz', image: '/images/posters/poster-3.jpg' },
  { title: 'Borderlands', image: '/images/posters/poster-4.jpg' },
  { title: 'Kruk', image: '/images/posters/poster-5.jpg' },
]

const top10 = [
  { title: 'Zaginiony', image: '/images/posters/poster-6.jpg' },
  { title: 'Dark City', image: '/images/posters/poster-7.jpg' },
  { title: 'Skok', image: '/images/posters/poster-8.jpg' },
  { title: 'Strefa Cienia', image: '/images/posters/poster-9.jpg' },
  { title: 'Projekt Zero', image: '/images/posters/poster-10.jpg' },
]
</script>

<template>
  <main class="home-page">
    <HeroBanner
      title="Aniol Stroz"
      description="Poczatkujacy, ale pelen dobrych checi aniol wywraca do gory nogami zycie magazyniera i oplywajacego w luksusy kapitalisty."
      background-image="/images/hero/hero-main.jpg"
    />

    <MovieRow title="Filmy z napisami" :items="featured" />
    <MovieRow title="Top 10 w tym tygodniu" :items="top10" />
    <MovieRow title="Popularne teraz" :items="featured" />
  </main>
</template>

<style scoped>
.home-page {
  padding-bottom: 40px;
}
</style>