<script setup lang="ts">
import type { MediaItem } from '../composables/useCatalog'

const props = defineProps<{
  item: MediaItem
}>()

const { isFavorite, toggleFavorite } = useProfiles()

const favoriteActive = computed(() => isFavorite(props.item.id))
const isWielkiMarsz = computed(() => props.item.id === 'wielki-marsz')
const heroBrand = computed(() => isWielkiMarsz.value ? 'prime' : 'prime video')
const heroPackage = computed(() => isWielkiMarsz.value ? 'W pakiecie z Prime' : 'W pakiecie Prime Video')
const titleLines = computed(() => {
  const words = props.item.title.toUpperCase().split(' ')
  const lines: string[] = []

  for (let index = 0; index < words.length; index += 1) {
    const nextWord = words[index + 1]
    lines.push(nextWord ? `${words[index]} ${nextWord}` : words[index])
    if (nextWord) {
      index += 1
    }
  }

  return lines
})
</script>

<template>
  <section
    class="hero"
    :style="{
      backgroundImage: `linear-gradient(90deg, rgba(2,8,16,0.98) 0%, rgba(2,8,16,0.95) 24%, rgba(2,8,16,0.68) 42%, rgba(2,8,16,0.24) 65%, rgba(2,8,16,0.78) 100%), url(${item.cover})`
    }"
  >
    <div class="hero__inner">
      <div class="hero__copy">
        <div class="hero__brand" :class="{ 'hero__brand--prime': isWielkiMarsz }">
          <span class="hero__brand-text">{{ heroBrand }}</span>
          <span v-if="isWielkiMarsz" class="hero__brand-smile" aria-hidden="true"></span>
        </div>

        <div class="hero__title-block">
          <h1 class="hero__title">
            <span v-for="line in titleLines" :key="line" class="hero__title-line">{{ line }}</span>
          </h1>
        </div>

        <p class="hero__ranking">{{ item.ranking }}</p>
        <p class="hero__description">{{ item.description }}</p>

        <div class="hero__actions">
          <NuxtLink :to="`/watch/${item.id}`" class="hero__button hero__button--primary">
            <span class="hero__play-icon" aria-hidden="true"></span>
            Obejrzyj teraz
          </NuxtLink>

          <button class="hero__button hero__button--round" type="button" title="Dodaj do listy" @click="toggleFavorite(item.id)">
            <span class="hero__round-icon" :class="favoriteActive ? 'hero__round-icon--check' : 'hero__round-icon--plus'" aria-hidden="true"></span>
          </button>

          <NuxtLink :to="`/watch/${item.id}?trailer=1`" class="hero__button hero__button--round" title="Szczegoly">
            <span class="hero__round-icon hero__round-icon--info" aria-hidden="true"></span>
          </NuxtLink>
        </div>

        <p class="hero__package">
          <span class="hero__package-check" aria-hidden="true"></span>
          {{ heroPackage }}
        </p>
      </div>

      <div class="hero__stamp">
        <p class="hero__stamp-text">prime video</p>
      </div>
    </div>

    <div class="hero__footer">
      <div class="hero__dots">
        <span class="hero__dot hero__dot--active"></span>
        <span class="hero__dot"></span>
        <span class="hero__dot"></span>
        <span class="hero__dot"></span>
      </div>

      <span class="hero__maturity">{{ item.maturity }}</span>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 78vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.hero::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  height: 180px;
  background: linear-gradient(180deg, rgba(5, 16, 27, 0), #07131f 86%);
}

.hero__inner {
  display: grid;
  grid-template-columns: minmax(640px, 760px) minmax(280px, 1fr);
  align-items: stretch;
  justify-content: space-between;
  width: min(100%, 1800px);
  min-height: 78vh;
  margin: 0 auto;
  padding: 82px 34px 120px 32px;
}

.hero__copy {
  position: relative;
  z-index: 1;
  max-width: 700px;
  align-self: center;
}

.hero__brand {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  margin: 0 0 18px;
  color: #1b88ff;
}

.hero__brand-text {
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
}

.hero__brand--prime .hero__brand-text {
  color: #1292ff;
}

.hero__brand-smile {
  position: relative;
  width: 42px;
  height: 12px;
  margin-top: 2px;
  margin-left: 1px;
  border-bottom: 3px solid #1292ff;
  border-radius: 0 0 999px 999px;
  transform: rotate(-7deg);
}

.hero__brand-smile::after {
  content: "";
  position: absolute;
  right: -1px;
  bottom: -2px;
  width: 8px;
  height: 8px;
  border-top: 3px solid #1292ff;
  border-right: 3px solid #1292ff;
  transform: rotate(32deg);
}

.hero__title-block {
  max-width: 640px;
  margin-bottom: 12px;
}

.hero__title {
  margin: 0;
  color: #f75a12;
  font-size: 158px;
  font-weight: 900;
  line-height: 0.83;
  letter-spacing: -0.08em;
  text-transform: uppercase;
  text-shadow: 0 6px 24px rgba(0, 0, 0, 0.28);
}

.hero__title-line {
  display: block;
  filter: saturate(1.05);
}

.hero__ranking {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 18px;
  color: #27f0c3;
  font-size: 18px;
  font-weight: 700;
}

.hero__ranking::before {
  content: "";
  width: 28px;
  height: 28px;
  border: 3px solid #27f0c3;
  border-radius: 50%;
  box-sizing: border-box;
  background:
    linear-gradient(135deg, transparent 38%, #27f0c3 39%, #27f0c3 54%, transparent 55%) center / 100% 100% no-repeat;
}

.hero__description {
  max-width: 700px;
  margin: 0 0 22px;
  color: #f2f6f9;
  font-size: 19px;
  font-weight: 600;
  line-height: 1.38;
}

.hero__actions {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.hero__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
}

.hero__button--primary {
  gap: 12px;
  padding: 0 34px;
  background: #ffffff;
  color: #07131f;
  font-size: 20px;
  font-weight: 700;
}

.hero__button--round {
  width: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  backdrop-filter: blur(12px);
}

.hero__play-icon {
  position: relative;
  width: 24px;
  height: 24px;
}

.hero__play-icon::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-top: 11px solid transparent;
  border-bottom: 11px solid transparent;
  border-left: 17px solid #0b1320;
  transform: translate(-40%, -50%);
}

.hero__round-icon {
  position: relative;
  display: block;
  width: 24px;
  height: 24px;
}

.hero__round-icon::before,
.hero__round-icon::after {
  content: "";
  position: absolute;
  background: #f5f7fa;
  border-radius: 999px;
}

.hero__round-icon--plus::before {
  top: 11px;
  left: 3px;
  width: 18px;
  height: 3px;
}

.hero__round-icon--plus::after {
  top: 3px;
  left: 11px;
  width: 3px;
  height: 18px;
}

.hero__round-icon--check::before {
  left: 3px;
  top: 13px;
  width: 8px;
  height: 3px;
  transform: rotate(45deg);
}

.hero__round-icon--check::after {
  right: 1px;
  top: 10px;
  width: 14px;
  height: 3px;
  transform: rotate(-45deg);
}

.hero__round-icon--info::before {
  inset: 1px;
  width: 22px;
  height: 22px;
  border: 3px solid #f5f7fa;
  border-radius: 50%;
  background: transparent;
}

.hero__round-icon--info::after {
  top: 6px;
  left: 11px;
  width: 3px;
  height: 11px;
  background: #f5f7fa;
  border-radius: 999px;
  box-shadow: 0 -5px 0 0 #f5f7fa inset;
}

.hero__package {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  color: #c6d2de;
  font-size: 16px;
  font-weight: 700;
}

.hero__package-check {
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #1992ff;
}

.hero__package-check::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 3px;
  width: 6px;
  height: 3px;
  border-left: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
  transform: rotate(-45deg);
}

.hero__stamp {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding-top: 18px;
}

.hero__stamp-text {
  margin: 0;
  color: rgba(29, 135, 255, 0.18);
  font-size: clamp(64px, 7vw, 118px);
  font-weight: 800;
  letter-spacing: -0.06em;
  text-transform: lowercase;
  text-shadow: 0 14px 40px rgba(0, 0, 0, 0.24);
  text-align: right;
}

.hero__footer {
  position: absolute;
  right: 24px;
  bottom: 22px;
  left: 24px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__dots {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hero__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.38);
}

.hero__dot--active {
  width: 18px;
  border-radius: 999px;
  background: #ffffff;
}

.hero__maturity {
  position: absolute;
  right: 0;
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}

@media (max-width: 980px) {
  .hero__inner {
    grid-template-columns: minmax(0, 1fr);
    padding: 72px 20px 110px;
  }

  .hero__stamp {
    display: none;
  }

  .hero__title {
    font-size: 116px;
  }

  .hero__description {
    font-size: 17px;
  }
}

@media (max-width: 720px) {
  .hero {
    min-height: 68vh;
  }

  .hero__inner {
    min-height: 68vh;
    padding: 56px 18px 96px;
  }

  .hero__copy {
    max-width: 100%;
  }

  .hero__title {
    font-size: 72px;
  }

  .hero__actions {
    flex-wrap: wrap;
  }

  .hero__button--primary {
    width: 100%;
  }
}
</style>
