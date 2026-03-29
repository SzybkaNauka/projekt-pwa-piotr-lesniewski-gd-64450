<script setup lang="ts">
import type { MediaItem } from '../composables/useCatalog'

defineProps<{
  item: MediaItem
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="xray-shell">
      <button class="xray-backdrop" type="button" aria-label="Zamknij X-Ray" @click="emit('close')" />

      <aside class="xray" :class="{ 'xray--open': open }">
        <div class="xray__header">
          <div>
            <p class="xray__eyebrow">X-Ray</p>
            <h2 class="xray__title">{{ item.title }}</h2>
          </div>

          <button class="xray__close" type="button" aria-label="Zamknij X-Ray" @click="emit('close')">X</button>
        </div>

        <div class="xray__body">
          <div class="xray__hero">
            <div class="xray__hero-copy">
              <p class="xray__label">Opis</p>
              <p class="xray__text">{{ item.description }}</p>
            </div>

            <div class="xray__facts">
              <span class="xray__fact">{{ item.year }}</span>
              <span class="xray__fact">{{ item.duration }}</span>
              <span class="xray__fact">{{ item.maturity }}</span>
            </div>
          </div>

          <div class="xray__grid">
            <div class="xray__section">
              <p class="xray__label">Gatunki</p>
              <p class="xray__text">{{ item.genres.join(' / ') }}</p>
            </div>

            <div class="xray__section">
              <p class="xray__label">Soundtrack</p>
              <p class="xray__text">{{ item.music }}</p>
            </div>

            <div class="xray__section">
              <p class="xray__label">Obsada</p>
              <ul class="xray__list">
                <li v-for="person in item.cast" :key="person">{{ person }}</li>
              </ul>
            </div>

            <div class="xray__section">
              <p class="xray__label">Ciekawostki</p>
              <ul class="xray__list">
                <li v-for="fact in item.trivia" :key="fact">{{ fact }}</li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </Teleport>
</template>

<style scoped>
.xray-shell {
  position: fixed;
  inset: 0;
  z-index: 140;
  pointer-events: none;
}

.xray-backdrop {
  position: absolute;
  inset: 0;
  border: none;
  background: rgba(4, 10, 18, 0.58);
  backdrop-filter: blur(4px);
  cursor: pointer;
  pointer-events: auto;
}

.xray {
  position: absolute;
  top: 92px;
  right: 28px;
  width: min(360px, calc(100vw - 40px));
  height: min(620px, calc(100vh - 120px));
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(24, 43, 63, 0.96), rgba(8, 17, 28, 0.98)),
    rgba(8, 17, 28, 0.98);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.42);
  transform: translate3d(0, 10px, 0) scale(0.98);
  opacity: 0;
  transition: transform 0.25s ease, opacity 0.25s ease;
  overflow: hidden;
  pointer-events: auto;
}

.xray--open {
  transform: translate3d(0, 0, 0) scale(1);
  opacity: 1;
}

.xray__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin: -14px -14px 12px;
  padding: 14px 14px 12px;
  background: linear-gradient(180deg, rgba(11, 21, 34, 0.98), rgba(11, 21, 34, 0.88));
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px 20px 14px 14px;
}

.xray__body {
  height: calc(100% - 72px);
  padding-right: 6px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(95, 166, 255, 0.55) rgba(255, 255, 255, 0.06);
}

.xray__body::-webkit-scrollbar {
  width: 8px;
}

.xray__body::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 999px;
}

.xray__body::-webkit-scrollbar-thumb {
  background: rgba(95, 166, 255, 0.55);
  border-radius: 999px;
}

.xray__hero {
  margin-bottom: 12px;
  padding: 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
}

.xray__hero-copy {
  margin-bottom: 16px;
}

.xray__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.xray__fact {
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  color: #d7e1ea;
  font-size: 13px;
  font-weight: 600;
}

.xray__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.xray__eyebrow {
  margin: 0 0 6px;
  color: #33a7ff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.xray__title {
  margin: 0;
  font-size: 20px;
}

.xray__close {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border: none;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.18);
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.24);
}

.xray__section {
  height: fit-content;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
}

.xray__label {
  margin: 0 0 10px;
  color: #8ea2b6;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.xray__text {
  margin: 0 0 8px;
  line-height: 1.6;
  color: #d7e1ea;
}

.xray__list {
  margin: 0;
  padding-left: 18px;
  color: #d7e1ea;
}

.xray__list li + li {
  margin-top: 8px;
}

@media (max-width: 720px) {
  .xray {
    top: 86px;
    right: 16px;
    bottom: 16px;
    left: 16px;
    width: auto;
    height: min(68vh, calc(100vh - 110px));
    padding: 12px;
    border-radius: 18px;
  }

  .xray__title {
    font-size: 18px;
  }

  .xray__header {
    margin: -12px -12px 12px;
    padding: 12px 12px 10px;
    border-radius: 18px 18px 14px 14px;
  }

  .xray__body {
    height: calc(100% - 62px);
  }
}
</style>
