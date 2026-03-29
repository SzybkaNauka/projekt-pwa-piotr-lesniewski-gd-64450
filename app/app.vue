<script setup lang="ts">
const { closeProfileSelector } = useProfiles()

onMounted(() => {
  closeProfileSelector()
})
</script>

<template>
  <div class="app-shell">
    <AppNavbar />
    <ProfileSelector />
    <NuxtPage />
  </div>
</template>
