<template>
  <div class="app-shell">
    <Navbar />
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
}

body {
  margin: 0;
  background-color: #f5f7fb;
  color: #1e293b;
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