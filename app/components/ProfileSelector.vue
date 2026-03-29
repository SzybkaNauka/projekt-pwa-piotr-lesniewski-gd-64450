<script setup lang="ts">
const {
  profiles,
  currentProfile,
  profileSelectorOpen,
  setActiveProfile,
  addProfile,
  removeProfile,
  closeProfileSelector,
  adultVerificationStatus,
  adultVerificationMaskedEmail,
  isAdultVerified,
  isAdultVerificationBusy,
  pendingAdultProfile,
  confirmAdultVerification,
  resendAdultVerification,
  resetAdultVerification,
  getProfileAudienceLabel,
  getProfileStatusLabel,
} = useProfiles()

const newProfileName = ref('')
const newProfileAudience = ref<'kids' | 'teens' | 'adults'>('adults')
const newProfileEmail = ref('')
const newProfileBirthDate = ref('')
const addError = ref('')
const verificationError = ref('')
const verificationCode = ref('')

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

const showAdultVerificationPanel = computed(() =>
  newProfileAudience.value === 'adults' || adultVerificationStatus.value === 'code-sent' || isAdultVerified.value,
)

const adultCreateButtonLabel = computed(() => {
  if (isAdultVerificationBusy.value) {
    return 'Wysylanie...'
  }

  return 'Utworz profil i wyslij email'
})

const resolveAddError = (reason?: string) => {
  if (!reason) {
    return 'Nie udalo sie wyslac maila weryfikacyjnego. Sprawdz dane i sprobuj ponownie.'
  }

  if (reason === 'invalid-name') {
    return 'Podaj nazwe profilu.'
  }

  if (reason === 'duplicate-name') {
    return 'Taki profil juz istnieje. Wybierz inna nazwe.'
  }

  if (reason === 'invalid-email') {
    return 'Wpisz poprawny adres email dla profilu 18+.'
  }

  if (reason === 'missing-birth-date') {
    return 'Podaj date urodzenia dla profilu 18+.'
  }

  if (reason === 'Profil 18+ wymaga pelnoletnosci.' || reason === 'underage') {
    return 'Profil 18+ mozna aktywowac tylko po potwierdzeniu pelnoletnosci.'
  }

  if (reason === 'Brakuje zmiennej RESEND_API_KEY na serwerze.') {
    return 'Brakuje konfiguracji Resend na serwerze. Ustaw RESEND_API_KEY.'
  }

  if (reason === 'Brakuje EMAIL_VERIFICATION_SECRET na serwerze.') {
    return 'Brakuje EMAIL_VERIFICATION_SECRET na serwerze.'
  }

  if (reason === 'missing-request') {
    return 'Najpierw utworz profil 18+, aby wyslac email weryfikacyjny.'
  }

  if (reason.includes('Resend zwrocil blad podczas wysylki emaila.')) {
    return reason.replace('Resend zwrocil blad podczas wysylki emaila. ', '')
  }

  return 'Nie udalo sie wyslac maila weryfikacyjnego. Sprawdz dane i sprobuj ponownie.'
}

const handleAddProfile = async () => {
  const result = await addProfile(newProfileName.value, newProfileAudience.value, {
    email: newProfileEmail.value,
    birthDate: newProfileBirthDate.value,
  })

  if (!result.ok) {
    addError.value = resolveAddError(result.reason)
    return
  }

  addError.value = ''
  verificationError.value = ''

  if (result.pendingVerification) {
    verificationCode.value = ''
    return
  }

  newProfileName.value = ''
  newProfileAudience.value = 'adults'
  newProfileEmail.value = ''
  newProfileBirthDate.value = ''
}

const handleConfirmVerification = async () => {
  const result = await confirmAdultVerification(verificationCode.value)

  if (!result.ok) {
    verificationError.value = result.reason === 'Kod potwierdzajacy jest nieprawidlowy.'
      ? result.reason
      : 'Nie udalo sie potwierdzic kodu. Sprawdz kod albo popros o nowy email.'
    return
  }

  verificationError.value = ''
  addError.value = ''
  newProfileName.value = ''
  newProfileAudience.value = 'adults'
  newProfileEmail.value = ''
  newProfileBirthDate.value = ''
}

const handleResendVerification = async () => {
  const result = await resendAdultVerification()

  if (!result.ok) {
    verificationError.value = resolveAddError(result.reason)
    return
  }

  verificationError.value = ''
}

const resetVerificationFlow = () => {
  resetAdultVerification()
  verificationCode.value = ''
  verificationError.value = ''
}

const handleProfileSelect = (profileId: string) => {
  const result = setActiveProfile(profileId)

  if (!result.ok) {
    addError.value = 'Ten profil jest jeszcze nieaktywny. Najpierw potwierdz email.'
  }
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
          :class="{ 'profile-card--inactive': !profile.isActive }"
        >
          <button
            class="profile-card__select"
            type="button"
            :disabled="!profile.isActive"
            @click="handleProfileSelect(profile.id)"
          >
            <div class="profile-card__avatar" :style="{ backgroundColor: profile.color }">
              {{ profile.name.charAt(0) }}
            </div>
            <span class="profile-card__name">{{ profile.name }}</span>
            <span class="profile-card__meta">
              {{ getProfileAudienceLabel(profile) }}
            </span>
            <span v-if="!profile.isActive" class="profile-card__pending">
              {{ getProfileStatusLabel(profile) }}
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
        <p class="profile-modal__verification-copy">
          Profil 18+ wymaga potwierdzenia pelnoletnosci i adresu email. Do czasu wpisania kodu profil pozostaje nieaktywny.
        </p>

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

          <div v-if="newProfileAudience === 'adults'" class="profile-modal__verification-grid">
            <label class="profile-modal__field profile-modal__field--wide">
              <span class="profile-modal__field-label">Adres email do potwierdzenia</span>
              <input
                v-model="newProfileEmail"
                class="profile-modal__input profile-modal__input--wide input"
                type="text"
                name="profile_email"
                autocomplete="email"
                spellcheck="false"
                autocapitalize="off"
                maxlength="120"
                placeholder="twoj@email.com"
                @input="addError = ''"
              >
            </label>

            <label class="profile-modal__field">
              <span class="profile-modal__field-label">Data urodzenia</span>
              <input
                v-model="newProfileBirthDate"
                class="profile-modal__input input"
                type="date"
                @input="addError = ''"
              >
            </label>
          </div>

          <div v-if="newProfileAudience === 'adults'" class="profile-modal__step-box">
            <p class="profile-modal__step-title">Krok 1</p>
            <p class="profile-modal__step-copy">
              Najpierw utworzymy profil 18+ i od razu wyslemy email z linkiem aktywacyjnym oraz kodem.
            </p>
          </div>

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

          <div class="profile-modal__primary-actions">
            <button class="profile-modal__create-button button is-info" type="button" :disabled="isAdultVerificationBusy" @click="handleAddProfile">
              {{ newProfileAudience === 'adults' ? adultCreateButtonLabel : 'Dodaj profil' }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="showAdultVerificationPanel" class="profile-modal__create profile-modal__create--verification">
        <h3 class="profile-modal__subtitle">Potwierdzenie email dla profilu 18+</h3>
        <p class="profile-modal__verification-copy">
          Po dodaniu profilu 18+ wysylamy kod na podany adres email. Profil stanie sie aktywny dopiero po wpisaniu kodu albo kliknieciu linku w wiadomosci.
        </p>

        <div v-if="adultVerificationStatus === 'code-sent' && pendingAdultProfile" class="profile-modal__form">
          <div class="profile-modal__verification-box">
            <p class="profile-modal__step-title">Krok 2</p>
            <p class="profile-modal__verification-step">
              Profil <strong>{{ pendingAdultProfile.name }}</strong> czeka na aktywacje. Wiadomosc wyslalismy na adres <strong>{{ adultVerificationMaskedEmail }}</strong>.
            </p>
            <p class="profile-modal__verification-demo">
              Sprawdz skrzynke pocztowa i kliknij link aktywacyjny albo wpisz kod z maila ponizej.
            </p>

            <div class="profile-modal__verification-grid">
              <label class="profile-modal__field profile-modal__field--wide">
                <span class="profile-modal__field-label">Kod z emaila</span>
                <input
                  v-model="verificationCode"
                  class="profile-modal__input input"
                  type="text"
                  name="verification_code"
                  inputmode="numeric"
                  maxlength="6"
                  placeholder="Wpisz 6-cyfrowy kod"
                  @input="verificationError = ''"
                >
              </label>
            </div>

            <div class="profile-modal__verification-actions">
              <button class="profile-modal__create-button button is-info" type="button" :disabled="isAdultVerificationBusy" @click="handleConfirmVerification">
                {{ isAdultVerificationBusy ? 'Potwierdzanie...' : 'Potwierdz email' }}
              </button>
              <button class="profile-modal__ghost button" type="button" :disabled="isAdultVerificationBusy" @click="handleResendVerification">
                Wyslij email ponownie
              </button>
              <button class="profile-modal__ghost button" type="button" :disabled="isAdultVerificationBusy" @click="resetVerificationFlow">
                Wyczysc oczekujace potwierdzenie
              </button>
            </div>

            <p v-if="verificationError" class="profile-modal__error">{{ verificationError }}</p>
          </div>
        </div>

        <div v-else-if="isAdultVerified" class="profile-modal__verified">
          <p class="profile-modal__verified-title">Konto 18+ aktywne</p>
          <p class="profile-modal__verified-copy">
            Email zostal potwierdzony. Profil 18+ jest juz aktywny i mozna go normalnie wybrac.
          </p>
          <button class="profile-modal__ghost button" type="button" @click="resetVerificationFlow">
            Wyczysc stan potwierdzenia
          </button>
        </div>

        <div v-else class="profile-modal__verified">
          <p class="profile-modal__verified-title">Brak oczekujacego potwierdzenia</p>
          <p class="profile-modal__verified-copy">
            Dodaj profil 18+, podaj email i date urodzenia, a potem aktywuj go kodem albo linkiem z wiadomosci email.
          </p>
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
  overflow-y: auto;
  padding: 24px 16px;
}

.profile-modal__backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(7, 19, 31, 0.78);
}

.profile-modal__box {
  position: relative;
  z-index: 1;
  width: min(1080px, 100%);
  max-width: 1080px;
  max-height: calc(100vh - 48px);
  margin: 0 auto;
  padding: 32px;
  overflow-y: auto;
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

.profile-card--inactive {
  opacity: 0.76;
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

.profile-card__select:disabled {
  cursor: not-allowed;
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

.profile-card__pending {
  margin-top: 12px;
  color: #ffd38a;
  font-size: 12px;
  font-weight: 700;
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

.profile-modal__create--verification {
  margin-top: 24px;
}

.profile-modal__subtitle {
  margin: 0 0 14px;
  font-size: 20px;
}

.profile-modal__form {
  display: grid;
  gap: 16px;
}

.profile-modal__step-box {
  display: grid;
  gap: 6px;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
}

.profile-modal__step-title {
  margin: 0;
  color: #8ac6ff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.profile-modal__step-copy {
  margin: 0;
  color: #cdd7e1;
  font-size: 14px;
  line-height: 1.6;
}

.profile-modal__verification-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.profile-modal__field {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.profile-modal__field--wide {
  grid-column: 1 / -1;
}

.profile-modal__field-label {
  color: #dbe7f2;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.profile-modal__input {
  width: 100%;
  min-width: 0;
  max-width: none;
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  background-color: #13273a;
  color: #fff;
}

.profile-modal__input--wide {
  width: 100%;
  max-width: none;
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

.profile-modal__primary-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.profile-modal__create-button:disabled,
.profile-modal__ghost:disabled {
  opacity: 0.65;
  cursor: wait;
}

.profile-modal__error {
  margin: -4px 0 0;
  color: #ff9f9f;
  font-size: 13px;
  line-height: 1.5;
}

.profile-modal__verification-copy,
.profile-modal__verified-copy,
.profile-modal__verification-step,
.profile-modal__verification-demo {
  margin: 0;
  color: #b7c6d4;
  line-height: 1.6;
}

.profile-modal__verification-box,
.profile-modal__verified {
  display: grid;
  gap: 14px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.03);
}

.profile-modal__verification-demo strong,
.profile-modal__verified-title {
  color: #ffffff;
}

.profile-modal__verified-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.profile-modal__verification-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.profile-modal__ghost {
  padding: 12px 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  color: #ffffff;
  cursor: pointer;
}

@media (max-width: 860px) {
  .profile-modal__box {
    max-height: calc(100vh - 32px);
    padding: 24px;
  }

  .profile-modal__grid {
    grid-template-columns: 1fr;
  }

  .profile-modal__audiences {
    grid-template-columns: 1fr;
  }

  .profile-modal__verification-grid {
    grid-template-columns: 1fr;
  }
}
</style>
