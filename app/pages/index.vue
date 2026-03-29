<script setup lang="ts">
const { catalog, movies, series, getByIds, filterVisible } = useCatalog()
const { currentProfile, hiddenIds, continueWatchingEntries, favoriteIds } = useProfiles()

const visibleCatalog = computed(() => filterVisible(catalog, currentProfile.value, hiddenIds.value))
const visibleMovies = computed(() => filterVisible(movies, currentProfile.value, hiddenIds.value))
const visibleSeries = computed(() => filterVisible(series, currentProfile.value, hiddenIds.value))
const profileLimit = computed(() => currentProfile.value?.maturityLimit || 18)
const trendTick = ref(0)

const getTrendBaseScore = (title: string) =>
  Array.from(title).reduce((score, char) => score + char.charCodeAt(0), 0)

let trendInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  trendInterval = setInterval(() => {
    trendTick.value += 1
  }, 12000)
})

onBeforeUnmount(() => {
  if (trendInterval) {
    clearInterval(trendInterval)
  }
})

const heroItem = computed(() => visibleCatalog.value[3] || visibleCatalog.value[0] || catalog[0])
const trendingItems = computed(() =>
  visibleCatalog.value
    .map((item, index) => ({
      item,
      score: (getTrendBaseScore(item.title) + trendTick.value * 17 + index * 13) % 1000,
    }))
    .sort((left, right) => right.score - left.score)
    .map(entry => entry.item)
    .slice(0, 6),
)
const freshItems = computed(() => visibleCatalog.value.slice(3, 9))
const movieSpotlight = computed(() => visibleMovies.value.slice(0, 6))
const seriesSpotlight = computed(() => visibleSeries.value.slice(0, 6))
const profile13Items = computed(() => visibleCatalog.value.filter(item => item.maturity === '7+' || item.maturity === '13+').slice(0, 6))
const profile16Items = computed(() => visibleCatalog.value.filter(item => item.maturity === '16+').slice(0, 6))
const profile18Items = computed(() => visibleCatalog.value.filter(item => item.maturity === '18+').slice(0, 6))
const favorites = computed(() => getByIds(favoriteIds.value))
const continueItems = computed(() => {
  const progressById = new Map(continueWatchingEntries.value.map(entry => [entry.id, entry.progress]))
  return getByIds(continueWatchingEntries.value.map(entry => entry.id)).map(item => ({
    ...item,
    progress: progressById.get(item.id) || 0,
  }))
})
</script>

<template>
  <main class="home-page">
    <MediaHero :item="heroItem" />

    <section class="home-page__lead page-wrap">
      <p class="home-page__lead-title">Biblioteka dopasowana do aktywnego profilu</p>
      <p class="home-page__lead-copy">
        Profil 13+ widzi tylko bezpieczniejsze tytuly, profil 16+ dostaje tez mocniejsze pozycje,
        a profil 18+ ma pelny katalog wraz z tresciami dla doroslych.
      </p>
    </section>

    <MediaRow
      v-if="continueItems.length"
      title="Obecnie ogladane"
      :subtitle="`Sekcja zmienia sie od razu po przelaczeniu na profil ${currentProfile?.name || ''}.`"
      :items="continueItems"
    />
    <MediaRow
      title="Trenduje teraz"
      subtitle="Kolejnosc odswieza sie dynamicznie, aby symulowac zywy ranking Prime Video."
      :items="trendingItems"
    />
    <MediaRow title="Nowosci" subtitle="Swieze premiery i glosne dodatki do biblioteki." :items="freshItems" />
    <MediaRow title="Tresci do 13+" subtitle="Tytuly dostepne dla profilu 13+ oraz wyzszych." :items="profile13Items" />
    <MediaRow
      v-if="profileLimit >= 16"
      title="Tresci 16+"
      subtitle="Mocniejsze filmy i seriale widoczne dla profilu 16+ i 18+."
      :items="profile16Items"
    />
    <MediaRow
      v-if="profileLimit >= 18"
      title="Tresci 18+"
      subtitle="Pelny katalog dla profilu 18+ z najmocniejszymi tytulami."
      :items="profile18Items"
    />
    <MediaRow title="Filmy" subtitle="Akcja, thriller, science fiction i mocne premiery." :items="movieSpotlight" />
    <MediaRow title="Seriale" subtitle="Sezony, ktore warto zaczac jeszcze dzisiaj." :items="seriesSpotlight" />
    <MediaRow v-if="favorites.length" title="Moja lista" subtitle="Zapisane pozycje aktywnego profilu." :items="favorites" />
  </main>
</template>

<style scoped>
.home-page {
  padding-bottom: 40px;
}

.home-page__lead {
  padding-top: 12px;
  padding-bottom: 20px;
}

.home-page__lead-title {
  margin: 0 0 6px;
  font-size: 17px;
  font-weight: 700;
  color: #f1f5f9;
}

.home-page__lead-copy {
  margin: 0;
  max-width: 840px;
  color: #93a8bc;
  font-size: 15px;
  line-height: 1.6;
}
</style>
