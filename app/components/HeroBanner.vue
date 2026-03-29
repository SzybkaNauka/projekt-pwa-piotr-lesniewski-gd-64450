<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  backgroundImage: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section
    class="hero-banner"
    :style="{ backgroundImage: `linear-gradient(90deg, rgba(7,19,31,0.95) 0%, rgba(7,19,31,0.82) 35%, rgba(7,19,31,0.15) 70%, rgba(7,19,31,0.85) 100%), url(${backgroundImage})` }"
  >
    <div class="hero-banner__content">
      <p class="hero-banner__eyebrow">StreamBox Original</p>
      <h1 class="hero-banner__title">{{ title }}</h1>
      <p class="hero-banner__description">{{ description }}</p>

      <div class="hero-banner__actions">
        <button class="hero-banner__button" type="button">Obejrzyj teraz</button>
        <button class="hero-banner__button hero-banner__button--secondary" type="button">+ Moja lista</button>
        <button class="hero-banner__circle" type="button">i</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-banner {
  min-height: 72vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.hero-banner__content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 120px 24px 90px;
}

.hero-banner__eyebrow {
  margin: 0 0 18px;
  font-size: 18px;
  font-weight: 700;
  color: #33a7ff;
}

.hero-banner__title {
  max-width: 560px;
  margin: 0 0 18px;
  font-size: 84px;
  line-height: 0.95;
  letter-spacing: -0.04em;
  text-transform: uppercase;
}

.hero-banner__description {
  max-width: 620px;
  margin: 0 0 28px;
  font-size: 24px;
  line-height: 1.45;
  color: #d7e1ea;
}

.hero-banner__actions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.hero-banner__button {
  padding: 14px 28px;
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  color: #07131f;
  cursor: pointer;
}

.hero-banner__button--secondary {
  background-color: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.hero-banner__circle {
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.16);
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 900px) {
  .hero-banner__content {
    padding-top: 90px;
  }

  .hero-banner__title {
    font-size: 56px;
  }

  .hero-banner__description {
    font-size: 18px;
  }
}
</style>