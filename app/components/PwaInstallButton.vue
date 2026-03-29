<script setup lang="ts">
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
}

const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)
const installState = ref<'idle' | 'ready' | 'installing' | 'installed' | 'unsupported'>('unsupported')

const isStandalone = () => {
  if (!import.meta.client) {
    return false
  }

  return window.matchMedia('(display-mode: standalone)').matches
    || window.matchMedia('(display-mode: window-controls-overlay)').matches
}

const syncInstallState = () => {
  if (isStandalone()) {
    installState.value = 'installed'
    deferredPrompt.value = null
    return
  }

  installState.value = deferredPrompt.value ? 'ready' : 'idle'
}

const handleBeforeInstallPrompt = (event: Event) => {
  event.preventDefault()
  deferredPrompt.value = event as BeforeInstallPromptEvent
  syncInstallState()
}

const handleInstalled = () => {
  installState.value = 'installed'
  deferredPrompt.value = null
}

const installApp = async () => {
  if (!deferredPrompt.value) {
    syncInstallState()
    return
  }

  installState.value = 'installing'
  await deferredPrompt.value.prompt()
  const choice = await deferredPrompt.value.userChoice

  if (choice.outcome === 'accepted') {
    installState.value = 'installed'
    deferredPrompt.value = null
    return
  }

  installState.value = 'idle'
}

const buttonLabel = computed(() => {
  if (installState.value === 'installed') {
    return 'Aplikacja zainstalowana'
  }

  if (installState.value === 'installing') {
    return 'Instalowanie...'
  }

  return 'Zainstaluj aplikacje'
})

const helperText = computed(() => {
  if (installState.value === 'installed') {
    return 'Chrome uruchomi StreamBox jak natywna aplikacje.'
  }

  if (installState.value === 'ready') {
    return 'Instalacja otworzy okno aplikacji bez paska przegladarki.'
  }

  return 'Jesli przycisk nie jest aktywny, uruchom build/preview na localhost i otworz menu Chrome > Zainstaluj aplikacje.'
})

onMounted(() => {
  installState.value = 'idle'
  syncInstallState()

  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  window.addEventListener('appinstalled', handleInstalled)

  const standaloneMedia = window.matchMedia('(display-mode: standalone)')
  const overlayMedia = window.matchMedia('(display-mode: window-controls-overlay)')

  standaloneMedia.addEventListener('change', syncInstallState)
  overlayMedia.addEventListener('change', syncInstallState)

  onBeforeUnmount(() => {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.removeEventListener('appinstalled', handleInstalled)
    standaloneMedia.removeEventListener('change', syncInstallState)
    overlayMedia.removeEventListener('change', syncInstallState)
  })
})
</script>

<template>
  <div class="pwa-install">
    <button
      class="pwa-install__button"
      :class="{
        'pwa-install__button--ready': installState === 'ready',
        'pwa-install__button--installed': installState === 'installed',
      }"
      type="button"
      :disabled="installState !== 'ready'"
      :title="helperText"
      @click="installApp"
    >
      {{ buttonLabel }}
    </button>
  </div>
</template>

<style scoped>
.pwa-install {
  display: flex;
  align-items: center;
}

.pwa-install__button {
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: #d7e1ea;
  font-size: 14px;
  font-weight: 700;
  cursor: not-allowed;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.pwa-install__button--ready {
  border-color: transparent;
  background: linear-gradient(135deg, #33a7ff, #1f80d7);
  color: #fff;
  cursor: pointer;
}

.pwa-install__button--installed {
  border-color: rgba(51, 167, 255, 0.45);
  background: rgba(51, 167, 255, 0.14);
  color: #fff;
}

.pwa-install__button--ready:hover {
  transform: translateY(-1px);
}

@media (max-width: 980px) {
  .pwa-install {
    width: 100%;
    justify-content: center;
    order: 4;
  }

  .pwa-install__button {
    width: 100%;
    justify-content: center;
  }
}
</style>
