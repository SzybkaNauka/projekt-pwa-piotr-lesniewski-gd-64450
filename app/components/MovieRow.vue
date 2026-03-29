<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="movie-row">
    <div class="movie-row__header">
      <h2 class="movie-row__title">{{ title }}</h2>
      <button class="movie-row__more" type="button">Zobacz wiecej</button>
    </div>

    <div class="movie-row__grid">
      <MovieCard
        v-for="item in items"
        :key="item.title"
        :title="item.title"
        :image="item.image"
      />
    </div>
  </section>
</template>

<style scoped>
.movie-row {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px 34px;
}

.movie-row__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.movie-row__title {
  margin: 0;
  font-size: 34px;
  font-weight: 700;
}

.movie-row__more {
  border: none;
  background: none;
  font-size: 16px;
  font-weight: 700;
  color: #d7e1ea;
  cursor: pointer;
}

.movie-row__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 18px;
}

@media (max-width: 1200px) {
  .movie-row__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 900px) {
  .movie-row__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .movie-row__title {
    font-size: 26px;
  }
}
</style>