<script setup lang="ts">
import type { MediaItem } from '~/app/composables/useCatalog'

const props = defineProps<{
  item: MediaItem & { progress?: number }
}>()

const {
  isFavorite,
  toggleFavorite,
  hideTitle,
  removeFromContinueWatching,
} = useProfiles()

const favoriteActive = computed(() => isFavorite(props.item.id))
const hasContinueProgress = computed(() => typeof props.item.progress === 'number')
const progressValue = computed(() => Math.round(props.item.progress || 0))
const quickActionLabel = computed(() => hasContinueProgress.value ? 'Usun z ogladaj dalej' : 'Ukryj tytul')
const primaryActionLabel = computed(() => hasContinueProgress.value ? 'Wznow' : 'Odtworz')
const packageLabel = computed(() => hasContinueProgress.value ? 'W pakiecie Prime Video' : 'Dostepne w Prime Video')
</script>

<template>
  <article class="media-card" :class="{ 'media-card--continue': hasContinueProgress }">
    <div class="media-card__surface">
      <div class="media-card__poster-wrap">
        <img :src="item.poster" :alt="item.title" class="media-card__image">
        <div class="media-card__gradient"></div>
        <span class="media-card__image-badge">{{ item.badge }}</span>
        <span class="media-card__image-mark">prime video</span>

        <button
          v-if="hasContinueProgress"
          class="media-card__quick-remove button is-dark is-small"
          type="button"
          title="Usun z ogladaj dalej"
          @click.stop="removeFromContinueWatching(item.id)"
        >
          Kontynuuj ogladanie
        </button>

        <div v-if="hasContinueProgress" class="media-card__progress">
          <div class="media-card__progress-bar" :style="{ width: `${progressValue}%` }"></div>
        </div>
      </div>

      <div class="media-card__body">
        <h3 class="media-card__title">{{ item.title }}</h3>

        <p class="media-card__package">
          <span class="media-card__package-dot"></span>
          {{ packageLabel }}
        </p>

        <div class="media-card__buttons">
          <NuxtLink :to="`/watch/${item.id}`" class="media-card__play button is-light">
            <span class="media-card__play-icon" aria-hidden="true"></span>
            {{ primaryActionLabel }}
          </NuxtLink>

          <NuxtLink
            :to="`/watch/${item.id}?trailer=1`"
            class="media-card__circle button is-dark is-rounded"
            title="Obejrzyj zwiastun"
          >
            <span class="media-card__icon media-card__icon--trailer" aria-hidden="true"></span>
          </NuxtLink>

          <button
            class="media-card__circle button is-dark is-rounded"
            type="button"
            title="Moja lista"
            @click="toggleFavorite(item.id)"
          >
            <span
              class="media-card__icon"
              :class="favoriteActive ? 'media-card__icon--check' : 'media-card__icon--plus'"
              aria-hidden="true"
            ></span>
          </button>

          <button
            class="media-card__circle button is-dark is-rounded"
            type="button"
            :title="quickActionLabel"
            @click="hasContinueProgress ? removeFromContinueWatching(item.id) : hideTitle(item.id)"
          >
            <span class="media-card__icon media-card__icon--hide" aria-hidden="true"></span>
          </button>
        </div>

        <p class="media-card__ranking">{{ item.ranking }}</p>

        <div class="media-card__meta">
          <span class="media-card__badge">{{ item.badge }}</span>
          <span class="media-card__badge media-card__badge--dark">{{ item.maturity }}</span>
          <span class="media-card__year">{{ item.year }}</span>
          <span class="media-card__year">{{ item.duration }}</span>
          <span class="media-card__year">{{ item.type === 'film' ? 'Film' : 'Serial' }}</span>
          <span v-if="hasContinueProgress" class="media-card__year">{{ progressValue }}% obejrzane</span>
        </div>

        <p class="media-card__description">{{ item.shortDescription }}</p>

        <button
          v-if="hasContinueProgress"
          class="media-card__remove button is-info is-light"
          type="button"
          @click.stop="removeFromContinueWatching(item.id)"
        >
          Usun z ogladaj dalej
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.media-card {
  position: relative;
  flex: 0 0 308px;
  isolation: isolate;
}

.media-card__surface {
  overflow: hidden;
  min-height: 390px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 22px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.015)),
    #0b1522;
  transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
}

.media-card:hover .media-card__surface,
.media-card:focus-within .media-card__surface {
  transform: translateY(-6px);
  border-color: rgba(96, 178, 244, 0.3);
  box-shadow: 0 22px 40px rgba(0, 0, 0, 0.34);
}

.media-card__poster-wrap {
  position: relative;
  overflow: hidden;
}

.media-card__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  transition: transform 0.32s ease;
}

.media-card:hover .media-card__image,
.media-card:focus-within .media-card__image {
  transform: scale(1.03);
}

.media-card__gradient {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.1) 58%, rgba(0, 0, 0, 0.28) 100%),
    linear-gradient(120deg, rgba(32, 112, 192, 0.08), transparent 44%);
}

.media-card__image-badge {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  padding: 4px 12px 5px;
  border-radius: 0 0 0 12px;
  background: rgba(255, 255, 255, 0.96);
  color: #132033;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.media-card__image-mark {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 2;
  color: rgba(255, 255, 255, 0.94);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.05em;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
}

.media-card__quick-remove {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: rgba(8, 17, 28, 0.78);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  backdrop-filter: blur(12px);
}

.media-card__body {
  padding: 16px 16px 18px;
}

.media-card__title {
  min-height: 52px;
  margin: 0 0 6px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.media-card__package {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 14px;
  color: #eef5fb;
  font-size: 13px;
  font-weight: 600;
}

.media-card__package-dot {
  width: 11px;
  height: 11px;
  border: 2px solid #1ce0ba;
  border-radius: 50%;
}

.media-card__buttons {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.media-card__play {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-width: 136px;
  padding: 12px 18px;
  border-radius: 14px;
  background: linear-gradient(180deg, #eef5fb, #d9e8f8);
  color: #08111c;
  font-size: 16px;
  font-weight: 700;
}

.media-card__circle {
  position: relative;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  min-width: 44px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
}

.media-card__circle:hover {
  background: rgba(255, 255, 255, 0.13);
}

.media-card__play-icon,
.media-card__icon {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  flex: 0 0 18px;
}

.media-card__play-icon::before {
  content: "";
  position: absolute;
  inset: 1px 0 1px 3px;
  background: #08111c;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
}

.media-card__icon--plus::before,
.media-card__icon--plus::after,
.media-card__icon--check::before,
.media-card__icon--check::after,
.media-card__icon--hide::before,
.media-card__icon--hide::after,
.media-card__icon--trailer::before,
.media-card__icon--trailer::after {
  content: "";
  position: absolute;
}

.media-card__icon--plus::before {
  top: 8px;
  left: 2px;
  width: 14px;
  height: 2px;
  border-radius: 999px;
  background: #ffffff;
}

.media-card__icon--plus::after {
  top: 2px;
  left: 8px;
  width: 2px;
  height: 14px;
  border-radius: 999px;
  background: #ffffff;
}

.media-card__icon--check::before {
  left: 3px;
  top: 8px;
  width: 6px;
  height: 2px;
  border-radius: 999px;
  background: #ffffff;
  transform: rotate(45deg);
}

.media-card__icon--check::after {
  right: 2px;
  top: 7px;
  width: 10px;
  height: 2px;
  border-radius: 999px;
  background: #ffffff;
  transform: rotate(-45deg);
}

.media-card__icon--hide::before {
  inset: 1px;
  border: 2px solid #ffffff;
  border-radius: 50%;
}

.media-card__icon--hide::after {
  left: 1px;
  top: 8px;
  width: 16px;
  height: 2px;
  border-radius: 999px;
  background: #ffffff;
  transform: rotate(-45deg);
}

.media-card__icon--trailer::before {
  inset: 1px;
  border: 2px solid #ffffff;
  border-radius: 4px;
}

.media-card__icon--trailer::after {
  left: 6px;
  top: 5px;
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 7px solid #ffffff;
}

.media-card__icon--trailer {
  box-shadow:
    -5px 0 0 -4px #ffffff,
    5px 0 0 -4px #ffffff;
}

.media-card__ranking {
  margin: 0 0 10px;
  color: #14d9a7;
  font-size: 13px;
  font-weight: 700;
}

.media-card__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.media-card__badge {
  padding: 4px 8px;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.12);
  color: #eef4fb;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.media-card__badge--dark {
  background: rgba(255, 255, 255, 0.08);
}

.media-card__year {
  color: #c7d5e2;
  font-size: 12px;
  font-weight: 600;
}

.media-card__description {
  min-height: 38px;
  margin: 0;
  color: #dce7f1;
  font-size: 14px;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.media-card__remove {
  width: 100%;
  margin-top: 14px;
  padding: 10px 14px;
  border: 1px solid rgba(96, 178, 244, 0.28);
  border-radius: 12px;
  background: rgba(31, 128, 215, 0.12);
  color: #dfefff;
}

.media-card__progress {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
}

.media-card__progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #edf4fb, #ffffff);
}
</style>
