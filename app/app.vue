<template>
  <div class="app-shell">
    <AppNavbar />
    <NuxtPage />
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: Arial, sans-serif;
  background-color: #07131f;
}

body {
  margin: 0;
  background-color: #07131f;
  color: #ffffff;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
select,
textarea {
  font: inherit;
}

img {
  display: block;
  max-width: 100%;
}

.app-shell {
  min-height: 100vh;
}
</style>