<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <article class="movie-card">
    <img :src="image" :alt="title" class="movie-card__image">
    <div class="movie-card__overlay">
      <h3 class="movie-card__title">{{ title }}</h3>
    </div>
  </article>
</template>

<style scoped>
.movie-card {
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  background-color: #122334;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
}

.movie-card:hover {
  transform: scale(1.04);
  box-shadow: 0 18px 28px rgba(0, 0, 0, 0.35);
}

.movie-card__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.movie-card__overlay {
  position: absolute;
  inset: auto 0 0 0;
  padding: 22px 16px 14px;
  background: linear-gradient(180deg, transparent, rgba(7, 19, 31, 0.95));
}

.movie-card__title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}
</style>