<script setup lang="ts">
const { series, filterVisible } = useCatalog()
const { currentProfile, hiddenIds, continueWatchingEntries, getProfileAudienceLabel } = useProfiles()

const visibleSeries = computed(() => filterVisible(series, currentProfile.value, hiddenIds.value))
const seriesLead = computed(() => visibleSeries.value.slice(0, 6))
const recentSeries = computed(() => visibleSeries.value.slice(1, 7))

const continueMap = computed(() => new Map(continueWatchingEntries.value.map(entry => [entry.id, entry.progress])))
const continueSeries = computed(() =>
  visibleSeries.value
    .filter(item => continueMap.value.has(item.id))
    .map(item => ({ ...item, progress: continueMap.value.get(item.id) || 0 })),
)
</script>

<template>
  <main class="page">
    <section class="page__hero page-wrap">
      <h1 class="page__title">Seriale</h1>
      <p class="page__text">Seriale dopasowane do aktywnego profilu: {{ getProfileAudienceLabel(currentProfile) }}.</p>
    </section>

    <MediaRow title="Popularne seriale" subtitle="Kryminal, dramat i mocny klimat." :items="seriesLead" />
    <MediaRow
      v-if="continueSeries.length"
      title="Ogladaj dalej"
      subtitle="Wznow od ostatnio zapisanego momentu."
      :items="continueSeries"
    />
    <MediaRow title="Swieze sezony" subtitle="Nowe odcinki i premiery serialowe." :items="recentSeries" />
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
