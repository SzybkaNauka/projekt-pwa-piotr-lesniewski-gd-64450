<script setup lang="ts">
const {
  profiles,
  currentProfile,
  profileSelectorOpen,
  setActiveProfile,
  addProfile,
  removeProfile,
  closeProfileSelector,
  getProfileAudienceLabel,
} = useProfiles()

const newProfileName = ref('')
const newProfileAudience = ref<'kids' | 'teens' | 'adults'>('adults')
const addError = ref('')

const audienceOptions = [
  {
    value: 'kids' as const,
    label: 'Profil 13+',
    helper: 'Widoczne tylko tresci do 13+',
  },
  {
    value: 'teens' as const,
    label: 'Profil 16+',
    helper: 'Widoczne tresci 13+ i 16+',
  },
  {
    value: 'adults' as const,
    label: 'Profil 18+',
    helper: 'Widoczne wszystkie tresci, takze 18+',
  },
]

const handleAddProfile = () => {
  const created = addProfile(newProfileName.value, newProfileAudience.value)

  if (!created) {
    addError.value = 'Podaj unikalna nazwe profilu. Maksymalnie mozna miec 6 profili.'
    return
  }

  addError.value = ''
  newProfileName.value = ''
  newProfileAudience.value = 'adults'
}
</script>

<template>
  <div v-if="profileSelectorOpen" class="profile-modal">
    <div class="profile-modal__backdrop" @click="closeProfileSelector"></div>

    <div class="profile-modal__box">
      <div class="profile-modal__header">
        <div>
          <p class="profile-modal__eyebrow">Profile</p>
          <h2 class="profile-modal__title">Wybierz lub dodaj profil</h2>
          <p class="profile-modal__lead">
            Kazdy profil pokazuje tylko swoj zakres tresci: 13+, 16+ albo pelen katalog 18+.
          </p>
        </div>

        <button class="profile-modal__close" type="button" @click="closeProfileSelector">X</button>
      </div>

      <div class="profile-modal__grid">
        <article
          v-for="profile in profiles"
          :key="profile.id"
          class="profile-card"
        >
          <button class="profile-card__select" type="button" @click="setActiveProfile(profile.id)">
            <div class="profile-card__avatar" :style="{ backgroundColor: profile.color }">
              {{ profile.name.charAt(0) }}
            </div>
            <span class="profile-card__name">{{ profile.name }}</span>
            <span class="profile-card__meta">
              {{ getProfileAudienceLabel(profile) }}
            </span>
          </button>

          <span v-if="profile.id === currentProfile?.id" class="profile-card__active">
            Aktywny
          </span>

          <button
            v-if="profiles.length > 1 && profile.id !== currentProfile?.id"
            class="profile-card__delete"
            type="button"
            @click.stop="removeProfile(profile.id)"
          >
            Usun
          </button>
        </article>
      </div>

      <div class="profile-modal__create">
        <h3 class="profile-modal__subtitle">Dodaj profil</h3>

        <div class="profile-modal__form">
          <input
            v-model="newProfileName"
            class="profile-modal__input input"
            type="text"
            maxlength="16"
            @input="addError = ''"
            @keydown.enter.prevent="handleAddProfile"
            placeholder="Np. Ola"
          >

          <div class="profile-modal__audiences">
            <button
              v-for="option in audienceOptions"
              :key="option.value"
              class="profile-modal__audience"
              :class="{ 'profile-modal__audience--active': newProfileAudience === option.value }"
              type="button"
              @click="newProfileAudience = option.value"
            >
              <span class="profile-modal__audience-label">{{ option.label }}</span>
              <span class="profile-modal__audience-helper">{{ option.helper }}</span>
            </button>
          </div>

          <p v-if="addError" class="profile-modal__error">{{ addError }}</p>

          <button class="profile-modal__create-button button is-info" type="button" @click="handleAddProfile">
            Dodaj
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-modal {
  position: fixed;
  inset: 0;
  z-index: 200;
}

.profile-modal__backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(7, 19, 31, 0.78);
}

.profile-modal__box {
  position: relative;
  max-width: 1080px;
  margin: 72px auto 0;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  background:
    radial-gradient(circle at top right, rgba(24, 146, 255, 0.16), transparent 28%),
    #102131;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

.profile-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 22px;
}

.profile-modal__eyebrow {
  margin: 0 0 8px;
  color: #8ac6ff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.profile-modal__title {
  margin: 0;
  font-size: 36px;
}

.profile-modal__lead {
  max-width: 620px;
  margin: 10px 0 0;
  color: #b1c0ce;
  font-size: 15px;
  line-height: 1.6;
}

.profile-modal__close {
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
}

.profile-modal__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.profile-card {
  position: relative;
  min-height: 218px;
  padding: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 22px;
  background-color: #13273a;
}

.profile-card__select {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  border: none;
  background: transparent;
  color: #fff;
  text-align: left;
  cursor: pointer;
}

.profile-card__avatar {
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  margin-bottom: 16px;
  border-radius: 20px;
  font-size: 28px;
  font-weight: 700;
}

.profile-card__name {
  margin-bottom: 8px;
  font-size: 22px;
  font-weight: 700;
}

.profile-card__meta {
  color: #cdd7e1;
  font-size: 14px;
  line-height: 1.5;
}

.profile-card__active {
  position: absolute;
  left: 22px;
  bottom: 22px;
  padding: 6px 10px;
  border-radius: 999px;
  background-color: rgba(34, 228, 199, 0.14);
  color: #22e4c7;
  font-size: 12px;
  font-weight: 700;
}

.profile-card__delete {
  position: absolute;
  right: 22px;
  bottom: 18px;
  padding: 8px 14px;
  border: none;
  border-radius: 12px;
  background-color: #25384b;
  color: #fff;
  cursor: pointer;
}

.profile-modal__create {
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.profile-modal__subtitle {
  margin: 0 0 14px;
  font-size: 20px;
}

.profile-modal__form {
  display: grid;
  gap: 16px;
}

.profile-modal__input {
  width: min(100%, 360px);
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  background-color: #13273a;
  color: #fff;
}

.profile-modal__audiences {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.profile-modal__audience {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  color: #f7fbff;
  cursor: pointer;
  text-align: left;
}

.profile-modal__audience--active {
  border-color: rgba(24, 146, 255, 0.62);
  background: rgba(24, 146, 255, 0.12);
  box-shadow: inset 0 0 0 1px rgba(24, 146, 255, 0.3);
}

.profile-modal__audience-label {
  font-size: 16px;
  font-weight: 700;
}

.profile-modal__audience-helper {
  color: #b7c6d4;
  font-size: 13px;
  line-height: 1.5;
}

.profile-modal__create-button {
  justify-self: start;
  padding: 12px 18px;
  border: none;
  border-radius: 12px;
  background-color: #1f80d7;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

.profile-modal__error {
  margin: -4px 0 0;
  color: #ff9f9f;
  font-size: 13px;
  line-height: 1.5;
}

@media (max-width: 860px) {
  .profile-modal__box {
    margin: 24px 16px 0;
  }

  .profile-modal__grid {
    grid-template-columns: 1fr;
  }

  .profile-modal__audiences {
    grid-template-columns: 1fr;
  }
}
</style>
