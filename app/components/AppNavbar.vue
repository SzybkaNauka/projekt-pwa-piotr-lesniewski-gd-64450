<template>
  <header class="navbar">
    <div class="navbar__container">
      <NuxtLink to="/" class="navbar__logo">
        StreamBox
      </NuxtLink>

      <nav class="navbar__nav">
        <NuxtLink to="/" class="navbar__link">Strona glowna</NuxtLink>
        <NuxtLink to="/filmy" class="navbar__link">Filmy</NuxtLink>
        <NuxtLink to="/seriale" class="navbar__link">Seriale</NuxtLink>
        <NuxtLink to="/about" class="navbar__link">O aplikacji</NuxtLink>
      </nav>

      <div class="navbar__actions">
        <button class="navbar__icon-button" type="button">⌕</button>
        <button class="navbar__avatar" type="button">P</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: linear-gradient(180deg, rgba(7, 19, 31, 0.96), rgba(7, 19, 31, 0.72));
  backdrop-filter: blur(10px);
}

.navbar__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 18px 24px;
}

.navbar__logo {
  font-size: 30px;
  font-weight: 700;
  color: #ffffff;
}

.navbar__nav {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-right: auto;
  margin-left: 28px;
}

.navbar__link {
  font-size: 16px;
  font-weight: 600;
  color: #d7e1ea;
  transition: color 0.2s ease;
}

.navbar__link:hover {
  color: #ffffff;
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.navbar__icon-button,
.navbar__avatar {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  cursor: pointer;
}

.navbar__avatar {
  font-weight: 700;
  background-color: #1f80d7;
}

@media (max-width: 900px) {
  .navbar__container {
    flex-wrap: wrap;
  }

  .navbar__nav {
    width: 100%;
    margin: 0;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>