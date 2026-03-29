<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const accountOpen = ref(false)
const watchlistOpen = ref(false)
const searchOpen = ref(false)
const searchInput = ref('')
const searchField = ref<HTMLInputElement | null>(null)

const { catalog, getByIds, filterVisible } = useCatalog()
const {
  currentProfile,
  favoriteIds,
  continueWatchingEntries,
  hiddenIds,
  openProfileSelector,
} = useProfiles()

const watchlistItems = computed(() => getByIds(favoriteIds.value))
const continueItems = computed(() => getByIds(continueWatchingEntries.value.map(item => item.id)))
const visibleCatalog = computed(() => filterVisible(catalog, currentProfile.value, hiddenIds.value))

const categories = computed(() =>
  Array.from(new Set(visibleCatalog.value.flatMap(item => item.genres))).slice(0, 10),
)

const searchPreview = computed(() => {
  const query = searchInput.value.trim().toLowerCase()

  if (!query) {
    return []
  }

  return visibleCatalog.value.filter((item) => {
    return [
      item.title,
      item.description,
      item.shortDescription,
      ...item.genres,
    ].some(value => value.toLowerCase().includes(query))
  }).slice(0, 5)
})

const syncSearchFromRoute = () => {
  searchInput.value = String(route.query.q || '')
}

const submitSearch = async () => {
  const query = searchInput.value.trim()
  await router.push({
    path: '/szukaj',
    query: query ? { q: query } : {},
  })
}

const openSearch = async () => {
  searchOpen.value = true
  await nextTick()
  searchField.value?.focus()
}

const searchCategory = async (genre: string) => {
  searchInput.value = genre
  await router.push({
    path: '/szukaj',
    query: { q: genre },
  })
}

watch(
  () => route.fullPath,
  () => {
    accountOpen.value = false
    watchlistOpen.value = false
    syncSearchFromRoute()
  },
  { immediate: true },
)
</script>

<template>
  <header class="navbar">
    <div class="navbar__container">
      <div class="navbar__brand">
        <NuxtLink to="/" class="navbar__logo" aria-label="Prime Video">
          <span class="navbar__logo-prime">prime</span>
          <span class="navbar__logo-video">video</span>
          <span class="navbar__logo-smile" aria-hidden="true"></span>
        </NuxtLink>
      </div>

      <nav class="navbar__nav" aria-label="Nawigacja glowna">
        <NuxtLink to="/" class="navbar__nav-link" :class="{ 'navbar__nav-link--active': route.path === '/' }">
          Strona glowna
        </NuxtLink>
        <NuxtLink to="/filmy" class="navbar__nav-link" :class="{ 'navbar__nav-link--active': route.path === '/filmy' }">
          Filmy
        </NuxtLink>
        <NuxtLink to="/seriale" class="navbar__nav-link" :class="{ 'navbar__nav-link--active': route.path === '/seriale' }">
          Seriale
        </NuxtLink>
        <span class="navbar__divider" aria-hidden="true"></span>
        <NuxtLink to="/about" class="navbar__nav-link navbar__nav-link--prime">
          <span class="navbar__nav-prime-text">prime</span>
          <span class="navbar__nav-prime-smile" aria-hidden="true"></span>
        </NuxtLink>
        <NuxtLink to="/moja-lista" class="navbar__nav-link">
          Subskrypcje
        </NuxtLink>
      </nav>

      <div class="navbar__actions">
        <div class="navbar__search" :class="{ 'navbar__search--open': searchOpen }">
          <button class="navbar__icon-button" type="button" title="Szukaj" @click="openSearch">
            <span class="navbar__icon navbar__icon--search"></span>
          </button>

          <form class="navbar__search-form" @submit.prevent="submitSearch">
            <input
              ref="searchField"
              v-model="searchInput"
              class="navbar__search-input"
              type="search"
              placeholder="Szukaj filmow, seriali i kategorii"
              @focus="searchOpen = true"
            >
          </form>

          <div v-if="searchOpen" class="navbar__search-dropdown">
            <p class="navbar__dropdown-label">Szukaj</p>
            <p class="navbar__search-hint">
              Wpisz tytul, opis lub gatunek i nacisnij Enter.
            </p>

            <div v-if="searchPreview.length" class="navbar__search-results">
              <NuxtLink
                v-for="item in searchPreview"
                :key="item.id"
                :to="`/watch/${item.id}`"
                class="navbar__search-result"
                @click="searchOpen = false"
              >
                <span class="navbar__search-result-title">{{ item.title }}</span>
                <span class="navbar__search-result-meta">{{ item.type === 'film' ? 'Film' : 'Serial' }} / {{ item.genres.join(', ') }}</span>
              </NuxtLink>
            </div>

            <button v-else-if="searchInput.trim()" class="navbar__search-empty" type="button" @click="submitSearch">
              Zobacz pelne wyniki dla "{{ searchInput }}"
            </button>

            <div v-else class="navbar__search-tags">
              <button
                v-for="genre in categories.slice(0, 4)"
                :key="genre"
                class="navbar__genre-pill"
                type="button"
                @click="searchCategory(genre)"
              >
                {{ genre }}
              </button>
            </div>
          </div>
        </div>

        <div class="navbar__menu navbar__menu--hover">
          <button class="navbar__icon-button navbar__icon-button--dots" type="button" title="Kategorie">
            <span class="navbar__dots">
              <span v-for="index in 9" :key="index" class="navbar__dot"></span>
            </span>
          </button>

          <div class="navbar__dropdown navbar__dropdown--categories">
            <div class="navbar__dropdown-columns">
              <div>
                <p class="navbar__dropdown-label">Kategorie</p>
                <button
                  v-for="genre in categories"
                  :key="genre"
                  class="navbar__dropdown-link navbar__dropdown-link--button"
                  type="button"
                  @click="searchCategory(genre)"
                >
                  {{ genre }}
                </button>
              </div>

              <div>
                <p class="navbar__dropdown-label">Przegladaj</p>
                <NuxtLink to="/filmy" class="navbar__dropdown-link">Filmy</NuxtLink>
                <NuxtLink to="/seriale" class="navbar__dropdown-link">Seriale</NuxtLink>
                <NuxtLink to="/moja-lista" class="navbar__dropdown-link">Ogladaj dalej</NuxtLink>
                <NuxtLink to="/about" class="navbar__dropdown-link">O projekcie</NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div class="navbar__menu">
          <button class="navbar__icon-button navbar__icon-button--bookmark" type="button" title="Moja lista" @click="watchlistOpen = !watchlistOpen">
            <span class="navbar__icon navbar__icon--bookmark"></span>
          </button>

          <div v-if="watchlistOpen" class="navbar__dropdown navbar__dropdown--watchlist">
            <p class="navbar__dropdown-label">Twoje listy</p>

            <div v-if="continueItems.length" class="navbar__dropdown-section">
              <p class="navbar__dropdown-subtitle">Kontynuuj ogladanie</p>
              <NuxtLink
                v-for="item in continueItems.slice(0, 4)"
                :key="item.id"
                :to="`/watch/${item.id}`"
                class="navbar__dropdown-link"
              >
                {{ item.title }}
              </NuxtLink>
            </div>

            <div v-if="watchlistItems.length" class="navbar__dropdown-section">
              <p class="navbar__dropdown-subtitle">Moja lista</p>
              <NuxtLink
                v-for="item in watchlistItems.slice(0, 4)"
                :key="item.id"
                :to="`/watch/${item.id}`"
                class="navbar__dropdown-link"
              >
                {{ item.title }}
              </NuxtLink>
            </div>

            <NuxtLink to="/moja-lista" class="navbar__dropdown-link navbar__dropdown-link--strong">
              Otworz pelna liste
            </NuxtLink>
          </div>
        </div>

        <div class="navbar__menu">
          <button class="navbar__avatar" type="button" @click="accountOpen = !accountOpen">
            <span class="navbar__avatar-icon" aria-hidden="true"></span>
          </button>

          <div v-if="accountOpen" class="navbar__dropdown navbar__dropdown--account">
            <p class="navbar__dropdown-label">Aktywny profil</p>
            <p class="navbar__profile-name">{{ currentProfile?.name }}</p>
            <p class="navbar__profile-meta">
              {{ currentProfile?.kids ? 'Tryb dzieci' : 'Tryb standardowy' }}
            </p>

            <button class="navbar__profile-button" type="button" @click="openProfileSelector">
              Zarzadzaj profilami
            </button>
            <NuxtLink to="/about" class="navbar__dropdown-link">O aplikacji</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 2px 2px 0;
  background:
    linear-gradient(180deg, rgba(18, 26, 35, 0.98), rgba(18, 26, 35, 0.92) 70%, rgba(18, 26, 35, 0.2)),
    #121a23;
  backdrop-filter: blur(12px);
}

.navbar__container {
  display: flex;
  align-items: center;
  gap: 24px;
  width: min(100%, 1808px);
  margin: 0 auto;
  min-height: 54px;
  padding: 0 18px 0 20px;
  border-radius: 0 0 14px 14px;
  background: linear-gradient(180deg, rgba(49, 56, 65, 0.98), rgba(40, 46, 54, 0.98));
  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.04);
}

.navbar__brand {
  flex: 0 0 auto;
}

.navbar__logo {
  position: relative;
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-template-areas:
    "prime video"
    "smile smile";
  align-items: end;
  column-gap: 2px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
}

.navbar__logo-prime {
  grid-area: prime;
  color: #f6f8fb;
}

.navbar__logo-video {
  grid-area: video;
  color: #f6f8fb;
}

.navbar__logo-smile {
  position: relative;
  grid-area: smile;
  justify-self: end;
  width: 31px;
  height: 9px;
  margin-top: 1px;
  border-bottom: 2px solid #b7e5ff;
  border-radius: 0 0 999px 999px;
  transform: rotate(-8deg);
  opacity: 0.95;
}

.navbar__logo-smile::after {
  content: "";
  position: absolute;
  right: -1px;
  bottom: -2px;
  width: 6px;
  height: 6px;
  border-top: 2px solid #b7e5ff;
  border-right: 2px solid #b7e5ff;
  transform: rotate(34deg);
}

.navbar__nav {
  display: flex;
  align-items: center;
  gap: 0;
  margin-right: auto;
  margin-left: 8px;
}

.navbar__nav-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 15px;
  border-radius: 11px;
  color: #f1f4f7;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.015em;
  transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.navbar__nav-link:hover {
  background: rgba(255, 255, 255, 0.08);
}

.navbar__nav-link--active {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.26), rgba(255, 255, 255, 0.12));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    0 2px 10px rgba(0, 0, 0, 0.14);
}

.navbar__divider {
  width: 1px;
  height: 26px;
  margin: 0 12px;
  background: rgba(255, 255, 255, 0.28);
}

.navbar__nav-link--prime {
  gap: 4px;
  padding-right: 12px;
}

.navbar__nav-prime-text {
  position: relative;
  top: -1px;
}

.navbar__nav-prime-smile {
  position: relative;
  width: 26px;
  height: 10px;
  margin-left: -2px;
}

.navbar__nav-prime-smile::before,
.navbar__nav-prime-smile::after {
  content: "";
  position: absolute;
}

.navbar__nav-prime-smile::before {
  inset: 3px 2px 0 1px;
  border-bottom: 2px solid #b7e5ff;
  border-radius: 0 0 999px 999px;
  transform: rotate(-7deg);
}

.navbar__nav-prime-smile::after {
  right: 0;
  bottom: 1px;
  width: 5px;
  height: 5px;
  border-top: 2px solid #b7e5ff;
  border-right: 2px solid #b7e5ff;
  transform: rotate(30deg);
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
}

.navbar__menu,
.navbar__search {
  position: relative;
}

.navbar__icon-button,
.navbar__avatar {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.navbar__icon-button:hover,
.navbar__avatar:hover {
  background: rgba(255, 255, 255, 0.08);
}

.navbar__avatar {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #55b6e4, #2e8dce);
}

.navbar__avatar-icon {
  position: relative;
  width: 18px;
  height: 18px;
}

.navbar__avatar-icon::before,
.navbar__avatar-icon::after {
  content: "";
  position: absolute;
  left: 50%;
  background: #ffffff;
  transform: translateX(-50%);
}

.navbar__avatar-icon::before {
  top: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.navbar__avatar-icon::after {
  bottom: 0;
  width: 16px;
  height: 8px;
  border-radius: 8px 8px 4px 4px;
}

.navbar__icon {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
}

.navbar__icon--search::before,
.navbar__icon--search::after {
  content: "";
  position: absolute;
}

.navbar__icon--search::before {
  inset: 0 4px 4px 0;
  border: 2px solid #ffffff;
  border-radius: 50%;
}

.navbar__icon--search::after {
  right: 0;
  bottom: 0;
  width: 8px;
  height: 2px;
  border-radius: 999px;
  background: #ffffff;
  transform: rotate(45deg);
  transform-origin: center;
}

.navbar__icon--bookmark::before,
.navbar__icon--bookmark::after {
  content: "";
  position: absolute;
}

.navbar__icon--bookmark::before {
  inset: 0;
  border: 2px solid #ffffff;
  border-radius: 4px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 76%, 0 100%);
}

.navbar__dots {
  display: grid;
  grid-template-columns: repeat(3, 4px);
  gap: 3px;
}

.navbar__dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #ffffff;
}

.navbar__search {
  display: flex;
  align-items: center;
  min-width: 36px;
  min-height: 36px;
  border-radius: 999px;
}

.navbar__search--open {
  padding-right: 8px;
  background: rgba(255, 255, 255, 0.06);
}

.navbar__search-form {
  overflow: hidden;
}

.navbar__search-input {
  width: 0;
  padding: 0;
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 14px;
  outline: none;
  transition: width 0.24s ease, padding 0.24s ease;
}

.navbar__search-input::placeholder {
  color: #8ea2b7;
}

.navbar__search--open .navbar__search-input {
  width: 290px;
  padding: 0 10px 0 2px;
}

.navbar__dropdown,
.navbar__search-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  min-width: 290px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  background:
    radial-gradient(circle at top right, rgba(73, 160, 255, 0.14), transparent 26%),
    rgba(8, 18, 29, 0.98);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.46);
}

.navbar__search-dropdown {
  width: 360px;
}

.navbar__menu--hover:hover .navbar__dropdown,
.navbar__menu--hover:focus-within .navbar__dropdown {
  display: block;
}

.navbar__menu--hover .navbar__dropdown {
  display: none;
}

.navbar__dropdown--categories {
  width: 540px;
}

.navbar__dropdown--watchlist {
  width: 320px;
}

.navbar__dropdown--account {
  width: 300px;
}

.navbar__dropdown-columns {
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: 24px;
}

.navbar__dropdown-label {
  margin: 0 0 12px;
  color: #7fbaff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.navbar__dropdown-subtitle {
  margin: 12px 0 8px;
  color: #8ba0b6;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.navbar__dropdown-link,
.navbar__profile-button {
  display: block;
  width: 100%;
  padding: 9px 0;
  border: none;
  background: transparent;
  color: #f3f7fb;
  text-align: left;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.navbar__dropdown-link:hover,
.navbar__profile-button:hover,
.navbar__search-result:hover {
  color: #7ec4ff;
}

.navbar__dropdown-link--button {
  padding-right: 8px;
}

.navbar__dropdown-link--strong {
  margin-top: 8px;
  color: #7ec4ff;
}

.navbar__dropdown-section + .navbar__dropdown-section {
  margin-top: 6px;
}

.navbar__search-hint {
  margin: 0 0 14px;
  color: #afc1d1;
  font-size: 14px;
  line-height: 1.5;
}

.navbar__search-results {
  display: grid;
  gap: 4px;
}

.navbar__search-result {
  display: block;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.navbar__search-result:last-child {
  border-bottom: none;
}

.navbar__search-result-title {
  display: block;
  font-size: 15px;
  font-weight: 700;
}

.navbar__search-result-meta {
  display: block;
  margin-top: 3px;
  color: #90a6bb;
  font-size: 12px;
}

.navbar__search-empty {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid rgba(126, 196, 255, 0.22);
  border-radius: 14px;
  background: rgba(126, 196, 255, 0.08);
  color: #ffffff;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}

.navbar__search-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.navbar__genre-pill {
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: #ebf3fa;
  cursor: pointer;
}

.navbar__profile-name {
  margin: 0 0 4px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.navbar__profile-meta {
  margin: 0 0 14px;
  color: #9cb1c5;
  font-size: 14px;
}

@media (max-width: 1024px) {
  .navbar__container {
    gap: 14px;
    padding: 0 12px;
  }

  .navbar__nav {
    gap: 2px;
  }

  .navbar__nav-link {
    padding: 0 11px;
    font-size: 14px;
  }

  .navbar__divider {
    margin: 0 8px;
  }

  .navbar__search--open .navbar__search-input {
    width: 180px;
  }
}

@media (max-width: 820px) {
  .navbar__container {
    flex-wrap: wrap;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .navbar__nav {
    order: 3;
    width: 100%;
    overflow-x: auto;
    padding-bottom: 2px;
  }

  .navbar__actions {
    margin-left: auto;
  }
}
</style>
