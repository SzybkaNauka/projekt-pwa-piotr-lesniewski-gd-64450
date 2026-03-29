<script setup lang="ts">
const route = useRoute()
const { verifyAdultProfileByLink } = useProfiles()

const status = ref<'loading' | 'success' | 'error'>('loading')
const message = ref('Trwa potwierdzanie adresu email...')

onMounted(async () => {
  const token = typeof route.query.token === 'string' ? route.query.token : ''

  if (!token) {
    status.value = 'error'
    message.value = 'Brakuje tokenu weryfikacyjnego w linku.'
    return
  }

  const result = await verifyAdultProfileByLink(token)

  if (!result.ok) {
    status.value = 'error'
    message.value = result.reason === 'missing-profile'
      ? 'Link jest poprawny, ale ten profil nie istnieje w tym urzadzeniu. Otworz wiadomosc na tym samym urzadzeniu, na ktorym zalozono profil.'
      : 'Nie udalo sie potwierdzic emaila. Link moze byc nieprawidlowy albo wygasl.'
    return
  }

  status.value = 'success'
  message.value = 'Email zostal potwierdzony. Profil 18+ jest aktywny.'
})
</script>

<template>
  <main class="verify-page section">
    <section class="verify-page__box box">
      <p class="verify-page__eyebrow">Weryfikacja email</p>
      <h1 class="verify-page__title">
        {{ status === 'loading' ? 'Potwierdzanie...' : status === 'success' ? 'Konto aktywne' : 'Blad potwierdzenia' }}
      </h1>
      <p class="verify-page__text">
        {{ message }}
      </p>
      <div class="buttons verify-page__actions">
        <NuxtLink to="/" class="button is-info">Wroc do strony glownej</NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.verify-page {
  min-height: calc(100vh - 96px);
  display: grid;
  place-items: center;
  padding: 32px 20px 60px;
}

.verify-page__box {
  width: min(100%, 720px);
  padding: 32px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    radial-gradient(circle at top right, rgba(24, 146, 255, 0.16), transparent 30%),
    #102131;
  color: #f7fbff;
}

.verify-page__eyebrow {
  margin: 0 0 10px;
  color: #8ac6ff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.verify-page__title {
  margin: 0 0 12px;
  font-size: clamp(30px, 4vw, 42px);
}

.verify-page__text {
  margin: 0;
  color: #b7c6d4;
  font-size: 16px;
  line-height: 1.7;
}

.verify-page__actions {
  margin-top: 24px;
}
</style>
