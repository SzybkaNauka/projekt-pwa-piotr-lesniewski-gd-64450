<script setup lang="ts">
const { getByIds, filterVisible } = useCatalog()
const {
  currentProfile,
  favoriteIds,
  hiddenIds,
  continueWatchingEntries,
  getProfileAudienceLabel,
  unhideTitle,
} = useProfiles()

const favorites = computed(() => filterVisible(getByIds(favoriteIds.value), currentProfile.value, hiddenIds.value))
const continueItems = computed(() => {
  const progressById = new Map(continueWatchingEntries.value.map(entry => [entry.id, entry.progress]))
  return getByIds(continueWatchingEntries.value.map(entry => entry.id)).map(item => ({
    ...item,
    progress: progressById.get(item.id) || 0,
  }))
})

const hiddenItems = computed(() => getByIds(hiddenIds.value))
</script>

<template>
  <main class="list-page page-wrap">
    <section class="list-page__intro">
      <p class="list-page__eyebrow">Twoj profil</p>
      <h1 class="list-page__title">Moja lista</h1>
      <p class="list-page__text">
        Aktywny profil: <strong>{{ currentProfile?.name }}</strong>
        / {{ getProfileAudienceLabel(currentProfile) }}
      </p>
    </section>

    <MediaRow title="Kontynuuj ogladanie" subtitle="Zapisany postep odtwarzania." :items="continueItems" />
    <MediaRow title="Ulubione" subtitle="Lista zapisanych tytulow." :items="favorites" />

    <section class="list-page__hidden">
      <h2 class="section-title">Ukryte tytuly</h2>

      <div v-if="hiddenItems.length" class="list-page__hidden-grid">
        <article v-for="item in hiddenItems" :key="item.id" class="list-page__hidden-card">
          <img :src="item.poster" :alt="item.title" class="list-page__hidden-image">
          <div>
            <h3 class="list-page__hidden-title">{{ item.title }}</h3>
            <p class="list-page__hidden-meta">{{ item.year }} / {{ item.type }}</p>
          </div>
          <button class="list-page__hidden-button" type="button" @click="unhideTitle(item.id)">
            Przywroc
          </button>
        </article>
      </div>

      <div v-else class="empty-state">
        Nie masz obecnie ukrytych tytulow.
      </div>
    </section>
  </main>
</template>

<style scoped>
.list-page {
  padding-top: 28px;
  padding-bottom: 60px;
}

.list-page__intro {
  margin-bottom: 12px;
}

.list-page__eyebrow {
  margin: 0 0 10px;
  color: #33a7ff;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.list-page__title {
  margin: 0 0 10px;
  font-size: 52px;
}

.list-page__text {
  margin: 0;
  color: #d7e1ea;
  font-size: 18px;
}

.list-page__hidden {
  padding: 8px 24px 0;
}

.list-page__hidden-grid {
  display: grid;
  gap: 16px;
}

.list-page__hidden-card {
  display: grid;
  grid-template-columns: 160px 1fr auto;
  gap: 18px;
  align-items: center;
  padding: 16px;
  border-radius: 18px;
  background-color: #102131;
}

.list-page__hidden-image {
  width: 100%;
  border-radius: 12px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.list-page__hidden-title {
  margin: 0 0 8px;
  font-size: 22px;
}

.list-page__hidden-meta {
  margin: 0;
  color: #a4b4c4;
}

.list-page__hidden-button {
  padding: 10px 14px;
  border: none;
  border-radius: 12px;
  background-color: rgba(51, 167, 255, 0.16);
  color: #fff;
  cursor: pointer;
}
</style>
