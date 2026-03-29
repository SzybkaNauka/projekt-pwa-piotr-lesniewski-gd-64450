<script setup lang="ts">
const route = useRoute()
const search = computed(() => String(route.query.q || '').trim().toLowerCase())

const { movies, filterVisible } = useCatalog()
const { currentProfile, hiddenIds, getProfileAudienceLabel } = useProfiles()

const visibleMovies = computed(() => filterVisible(movies, currentProfile.value, hiddenIds.value))
const filteredMovies = computed(() =>
  visibleMovies.value.filter((item) => {
    if (!search.value) {
      return true
    }

    return [
      item.title,
      item.description,
      item.shortDescription,
      ...item.genres,
    ].some(value => value.toLowerCase().includes(search.value))
  }),
)

const featuredMovies = computed(() => filteredMovies.value.slice(0, 6))
const topMovies = computed(() => filteredMovies.value.slice(2, 8))
</script>

<template>
  <main class="page">
    <section class="page__hero page-wrap">
      <h1 class="page__title">Filmy</h1>
      <p class="page__text">Katalog filmow widoczny dla aktywnego profilu: {{ getProfileAudienceLabel(currentProfile) }}.</p>
    </section>

    <MediaRow
      title="Polecane filmy"
      subtitle="Akcja, sci-fi i thrillery z lokalnej biblioteki."
      :items="featuredMovies"
    />
    <MediaRow title="Top filmy" subtitle="Tytuly, do ktorych widzowie wracaja najczesciej." :items="topMovies" />
  </main>
</template>

<style scoped>
.page {
  padding-top: 24px;
}

.page__hero {
  padding-bottom: 18px;
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
