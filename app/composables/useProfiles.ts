export interface StreamProfile {
  id: string
  name: string
  color: string
  kids: boolean
  audience: 'kids' | 'teens' | 'adults'
  maturityLimit: 13 | 16 | 18
  isActive: boolean
  verificationEmail?: string
  birthDate?: string
  emailVerifiedAt?: number | null
}

export interface ContinueWatchingEntry {
  id: string
  currentTime: number
  duration: number
  progress: number
  updatedAt: number
}

export interface AdultVerificationState {
  profileId: string
  profileName: string
  email: string
  maskedEmail: string
  birthDate: string
  verificationToken: string
  status: 'idle' | 'sending' | 'code-sent' | 'verifying' | 'verified'
  verifiedAt: number | null
  expiresAt: number | null
}

const audienceConfig = {
  kids: {
    color: '#f59e0b',
    kids: true,
    maturityLimit: 13 as const,
  },
  teens: {
    color: '#8b5cf6',
    kids: false,
    maturityLimit: 16 as const,
  },
  adults: {
    color: '#10b981',
    kids: false,
    maturityLimit: 18 as const,
  },
}

const defaultProfiles: StreamProfile[] = [
  { id: 'p1', name: 'Piotr', color: '#1f80d7', kids: false, audience: 'adults', maturityLimit: 18, isActive: true, emailVerifiedAt: Date.now() },
  { id: 'p2', name: 'Profil 13+', color: '#f59e0b', kids: true, audience: 'kids', maturityLimit: 13, isActive: true, emailVerifiedAt: null },
]

const defaultAdultVerification: AdultVerificationState = {
  profileId: '',
  profileName: '',
  email: '',
  maskedEmail: '',
  birthDate: '',
  verificationToken: '',
  status: 'idle',
  verifiedAt: null,
  expiresAt: null,
}

interface VerificationPayload {
  profileId: string
  profileName: string
  email: string
  birthDate: string
  verifiedAt: number
}

interface VerificationRequestInput {
  profileId: string
  profileName: string
  email: string
  birthDate: string
}

export const useProfiles = () => {
  const profiles = useState<StreamProfile[]>('profiles', () => defaultProfiles)
  const activeProfileId = useState<string>('active-profile-id', () => 'p1')
  const favoriteMap = useState<Record<string, string[]>>('favorite-map', () => ({
    p1: [],
    p2: [],
  }))
  const hiddenMap = useState<Record<string, string[]>>('hidden-map', () => ({
    p1: [],
    p2: [],
  }))
  const continueMap = useState<Record<string, ContinueWatchingEntry[]>>('continue-map', () => ({
    p1: [],
    p2: [],
  }))
  const profileSelectorOpen = useState('profile-selector-open', () => false)
  const adultVerification = useState<AdultVerificationState>('adult-verification', () => defaultAdultVerification)

  const normalizeProfile = (profile: Partial<StreamProfile>, index: number): StreamProfile => {
    const audience = profile.audience || (profile.kids ? 'kids' : 'adults')
    const config = audienceConfig[audience]

    return {
      id: profile.id || `p${index + 1}`,
      name: profile.name?.trim() || `Profil ${index + 1}`,
      color: profile.color || config.color,
      kids: typeof profile.kids === 'boolean' ? profile.kids : config.kids,
      audience,
      maturityLimit: profile.maturityLimit || config.maturityLimit,
      isActive: typeof profile.isActive === 'boolean' ? profile.isActive : true,
      verificationEmail: profile.verificationEmail?.trim().toLowerCase() || '',
      birthDate: profile.birthDate || '',
      emailVerifiedAt: typeof profile.emailVerifiedAt === 'number' ? profile.emailVerifiedAt : null,
    }
  }

  profiles.value = profiles.value.map(normalizeProfile)

  const ensureBucket = <T>(mapRef: Ref<Record<string, T[]>>, profileId: string) => {
    if (!profileId) {
      return
    }

    if (!mapRef.value[profileId]) {
      mapRef.value[profileId] = []
    }
  }

  const ensureAllBuckets = (profileId: string) => {
    ensureBucket(favoriteMap, profileId)
    ensureBucket(hiddenMap, profileId)
    ensureBucket(continueMap, profileId)
  }

  const isValidVerificationEmail = (email: string) => /.+@.+\..+/.test(email.trim())

  const adultVerificationStatus = computed(() => adultVerification.value.status)
  const adultVerificationEmail = computed(() => adultVerification.value.email)
  const adultVerificationMaskedEmail = computed(() => adultVerification.value.maskedEmail || adultVerification.value.email)
  const isAdultVerified = computed(() => adultVerification.value.status === 'verified')
  const isAdultVerificationBusy = computed(() => adultVerification.value.status === 'sending' || adultVerification.value.status === 'verifying')
  const pendingAdultProfile = computed(
    () => profiles.value.find(profile => profile.id === adultVerification.value.profileId) || null,
  )

  ensureAllBuckets(activeProfileId.value)

  const currentProfile = computed(
    () => profiles.value.find(profile => profile.id === activeProfileId.value) || profiles.value[0],
  )

  const favoriteIds = computed(() => {
    ensureBucket(favoriteMap, activeProfileId.value)
    return favoriteMap.value[activeProfileId.value] || []
  })

  const hiddenIds = computed(() => {
    ensureBucket(hiddenMap, activeProfileId.value)
    return hiddenMap.value[activeProfileId.value] || []
  })

  const continueWatchingEntries = computed(() => {
    ensureBucket(continueMap, activeProfileId.value)
    return [...(continueMap.value[activeProfileId.value] || [])].sort((a, b) => b.updatedAt - a.updatedAt)
  })

  const requestAdultVerification = async ({
    profileId,
    profileName,
    email,
    birthDate,
  }: VerificationRequestInput) => {
    const response = await $fetch<{
      maskedEmail: string
      verificationToken: string
      expiresAt: number
    }>('/api/auth/register-adult', {
      method: 'POST',
      body: {
        profileId,
        profileName,
        email,
        birthDate,
      },
    })

    adultVerification.value = {
      profileId,
      profileName,
      email,
      maskedEmail: response.maskedEmail,
      birthDate,
      verificationToken: response.verificationToken,
      status: 'code-sent',
      verifiedAt: null,
      expiresAt: response.expiresAt,
    }

    return response
  }

  const activateAdultProfile = ({ profileId, email, birthDate, verifiedAt }: VerificationPayload) => {
    const profileIndex = profiles.value.findIndex(profile => profile.id === profileId)

    if (profileIndex === -1) {
      return { ok: false, reason: 'missing-profile' as const }
    }

    profiles.value[profileIndex] = {
      ...profiles.value[profileIndex],
      isActive: true,
      verificationEmail: email,
      birthDate,
      emailVerifiedAt: verifiedAt,
    }

    adultVerification.value = {
      ...adultVerification.value,
      profileId,
      email,
      maskedEmail: email,
      birthDate,
      status: 'verified',
      verifiedAt,
    }

    activeProfileId.value = profileId
    ensureAllBuckets(profileId)
    profileSelectorOpen.value = false

    return { ok: true as const }
  }

  const setActiveProfile = (profileId: string) => {
    const profile = profiles.value.find(item => item.id === profileId)

    if (!profile?.isActive) {
      return { ok: false, reason: 'profile-inactive' as const }
    }

    activeProfileId.value = profileId
    ensureAllBuckets(profileId)
    profileSelectorOpen.value = false
    return { ok: true as const }
  }

  const openProfileSelector = () => {
    profileSelectorOpen.value = true
  }

  const closeProfileSelector = () => {
    profileSelectorOpen.value = false
  }

  const addProfile = async (
    name: string,
    audience: StreamProfile['audience'] = 'adults',
    verificationData?: { email?: string, birthDate?: string },
  ) => {
    const normalizedName = name.trim()

    if (!normalizedName || profiles.value.length >= 6) {
      return { ok: false, reason: 'invalid-name' as const }
    }

    if (profiles.value.some(profile => profile.name.toLowerCase() === normalizedName.toLowerCase())) {
      return { ok: false, reason: 'duplicate-name' as const }
    }

    const newId = `p${Date.now()}`
    const config = audienceConfig[audience]

    if (audience === 'adults') {
      const normalizedEmail = verificationData?.email?.trim().toLowerCase() || ''
      const birthDate = verificationData?.birthDate || ''

      if (!isValidVerificationEmail(normalizedEmail)) {
        return { ok: false, reason: 'invalid-email' as const }
      }

      if (!birthDate) {
        return { ok: false, reason: 'missing-birth-date' as const }
      }

      adultVerification.value = {
        ...defaultAdultVerification,
        profileId: newId,
        profileName: normalizedName,
        email: normalizedEmail,
        birthDate,
        status: 'sending',
      }

      try {
        await requestAdultVerification({
          profileId: newId,
          profileName: normalizedName,
          email: normalizedEmail,
          birthDate,
        })

        profiles.value.push({
          id: newId,
          name: normalizedName,
          color: config.color,
          kids: config.kids,
          audience,
          maturityLimit: config.maturityLimit,
          isActive: false,
          verificationEmail: normalizedEmail,
          birthDate,
          emailVerifiedAt: null,
        })

        ensureAllBuckets(newId)
        return { ok: true as const, pendingVerification: true as const }
      } catch (error: any) {
        adultVerification.value = {
          ...defaultAdultVerification,
        }

        return {
          ok: false,
          reason: error?.data?.statusMessage || error?.data?.message || 'verification-send-failed' as const,
        }
      }
    }

    profiles.value.push({
      id: newId,
      name: normalizedName,
      color: config.color,
      kids: config.kids,
      audience,
      maturityLimit: config.maturityLimit,
      isActive: true,
      emailVerifiedAt: null,
    })

    ensureAllBuckets(newId)
    setActiveProfile(newId)
    return { ok: true as const }
  }

  const removeProfile = (profileId: string) => {
    if (profiles.value.length === 1) {
      return
    }

    profiles.value = profiles.value.filter(profile => profile.id !== profileId)
    delete favoriteMap.value[profileId]
    delete hiddenMap.value[profileId]
    delete continueMap.value[profileId]

    if (adultVerification.value.profileId === profileId) {
      resetAdultVerification()
    }

    if (activeProfileId.value === profileId) {
      activeProfileId.value = profiles.value[0]?.id || ''
      ensureAllBuckets(activeProfileId.value)
    }
  }

  const isFavorite = (id: string) => favoriteIds.value.includes(id)
  const isHidden = (id: string) => hiddenIds.value.includes(id)

  const toggleFavorite = (id: string) => {
    favoriteMap.value[activeProfileId.value] = isFavorite(id)
      ? favoriteIds.value.filter(itemId => itemId !== id)
      : [...favoriteIds.value, id]
  }

  const hideTitle = (id: string) => {
    if (!isHidden(id)) {
      hiddenMap.value[activeProfileId.value] = [...hiddenIds.value, id]
    }
  }

  const unhideTitle = (id: string) => {
    hiddenMap.value[activeProfileId.value] = hiddenIds.value.filter(itemId => itemId !== id)
  }

  const updateContinueWatching = ({
    id,
    currentTime,
    duration,
  }: {
    id: string
    currentTime: number
    duration: number
  }) => {
    if (!duration || Number.isNaN(duration)) {
      return
    }

    const progress = Math.min(100, Math.round((currentTime / duration) * 100))

    if (progress >= 97) {
      removeFromContinueWatching(id)
      return
    }

    const list = [...(continueMap.value[activeProfileId.value] || [])]
    const existingIndex = list.findIndex(item => item.id === id)
    const payload: ContinueWatchingEntry = {
      id,
      currentTime,
      duration,
      progress,
      updatedAt: Date.now(),
    }

    if (existingIndex >= 0) {
      list[existingIndex] = payload
    } else {
      list.push(payload)
    }

    continueMap.value[activeProfileId.value] = list
  }

  const removeFromContinueWatching = (id: string) => {
    continueMap.value[activeProfileId.value] =
      continueWatchingEntries.value.filter(item => item.id !== id)
  }

  const confirmAdultVerification = async (code: string) => {
    const normalizedCode = code.trim()

    if (adultVerification.value.status !== 'code-sent' || !adultVerification.value.verificationToken) {
      return { ok: false, reason: 'missing-request' as const }
    }

    adultVerification.value = {
      ...adultVerification.value,
      status: 'verifying',
    }

    try {
      const response = await $fetch<VerificationPayload>('/api/auth/verify-code', {
        method: 'POST',
        body: {
          token: adultVerification.value.verificationToken,
          code: normalizedCode,
        },
      })

      return activateAdultProfile(response)
    } catch (error: any) {
      adultVerification.value = {
        ...adultVerification.value,
        status: 'code-sent',
      }

      return {
        ok: false,
        reason: error?.data?.statusMessage || error?.data?.message || 'invalid-code' as const,
      }
    }
  }

  const resendAdultVerification = async () => {
    const pendingProfile = profiles.value.find(profile => profile.id === adultVerification.value.profileId)

    if (!pendingProfile || !adultVerification.value.email || !adultVerification.value.birthDate) {
      return { ok: false, reason: 'missing-request' as const }
    }

    adultVerification.value = {
      ...adultVerification.value,
      status: 'sending',
    }

    try {
      await requestAdultVerification({
        profileId: pendingProfile.id,
        profileName: pendingProfile.name,
        email: adultVerification.value.email,
        birthDate: adultVerification.value.birthDate,
      })

      return { ok: true as const }
    } catch (error: any) {
      adultVerification.value = {
        ...adultVerification.value,
        status: 'code-sent',
      }

      return {
        ok: false,
        reason: error?.data?.statusMessage || error?.data?.message || 'verification-send-failed' as const,
      }
    }
  }

  const verifyAdultProfileByLink = async (token: string) => {
    if (!token) {
      return { ok: false, reason: 'missing-token' as const }
    }

    try {
      const response = await $fetch<VerificationPayload>('/api/auth/verify-link', {
        method: 'GET',
        query: { token },
      })

      return activateAdultProfile(response)
    } catch (error: any) {
      return {
        ok: false,
        reason: error?.data?.statusMessage || error?.data?.message || 'invalid-token' as const,
      }
    }
  }

  const resetAdultVerification = () => {
    adultVerification.value = {
      ...defaultAdultVerification,
    }
  }

  const getProfileAudienceLabel = (profile?: Pick<StreamProfile, 'audience' | 'maturityLimit'> | null) => {
    if (!profile) {
      return 'Profil'
    }

    if (profile.audience === 'kids') {
      return 'Profil 13+'
    }

    if (profile.audience === 'teens') {
      return 'Profil 16+'
    }

    return 'Profil 18+'
  }

  const getProfileStatusLabel = (profile?: Pick<StreamProfile, 'isActive' | 'audience'> | null) => {
    if (!profile) {
      return ''
    }

    if (!profile.isActive && profile.audience === 'adults') {
      return 'Oczekuje na potwierdzenie emaila'
    }

    if (!profile.isActive) {
      return 'Nieaktywny'
    }

    return 'Aktywny'
  }

  return {
    profiles,
    activeProfileId,
    currentProfile,
    favoriteIds,
    hiddenIds,
    continueWatchingEntries,
    profileSelectorOpen,
    adultVerification,
    adultVerificationStatus,
    adultVerificationEmail,
    adultVerificationMaskedEmail,
    isAdultVerified,
    isAdultVerificationBusy,
    pendingAdultProfile,
    setActiveProfile,
    openProfileSelector,
    closeProfileSelector,
    addProfile,
    resendAdultVerification,
    removeProfile,
    confirmAdultVerification,
    verifyAdultProfileByLink,
    resetAdultVerification,
    getProfileAudienceLabel,
    getProfileStatusLabel,
    isFavorite,
    isHidden,
    toggleFavorite,
    hideTitle,
    unhideTitle,
    updateContinueWatching,
    removeFromContinueWatching,
  }
}
