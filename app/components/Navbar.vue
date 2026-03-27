<template>
  <header class="site-header">
    <div class="site-header__container">
      <NuxtLink to="/" class="site-header__logo">
        Nieruchomosci
      </NuxtLink>

      <nav class="site-header__nav">
        <NuxtLink to="/" class="site-header__link">
          Strona glowna
        </NuxtLink>
        <NuxtLink to="/about" class="site-header__link">
          O nas
        </NuxtLink>
        <a href="#oferty" class="site-header__link">
          Oferty
        </a>
        <a href="#kontakt" class="site-header__link">
          Kontakt
        </a>
      </nav>

      <div class="site-header__actions">
        <button class="site-header__button site-header__button--light" type="button">
          Zaloguj
        </button>
        <button class="site-header__button" type="button">
          Dodaj ogloszenie
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid #e2e8f0;
  background-color: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
}

.site-header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 18px 24px;
}

.site-header__logo {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
}

.site-header__nav {
  display: flex;
  align-items: center;
  gap: 24px;
}

.site-header__link {
  position: relative;
  font-size: 16px;
  font-weight: 500;
  color: #475569;
  transition: color 0.2s ease;
}

.site-header__link:hover {
  color: #0f172a;
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.site-header__button {
  padding: 12px 18px;
  border: none;
  border-radius: 12px;
  background-color: #0f172a;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.site-header__button:hover {
  transform: translateY(-1px);
  opacity: 0.95;
}

.site-header__button--light {
  background-color: #e2e8f0;
  color: #0f172a;
}

@media (max-width: 980px) {
  .site-header__container {
    flex-wrap: wrap;
  }

  .site-header__nav {
    order: 3;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }

  .site-header__actions {
    margin-left: auto;
  }
}

@media (max-width: 640px) {
  .site-header__container {
    padding: 16px;
  }

  .site-header__logo {
    width: 100%;
    text-align: center;
  }

  .site-header__actions {
    width: 100%;
    justify-content: center;
  }

  .site-header__button {
    flex: 1;
  }
}
</style>