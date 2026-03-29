export interface StreamProfile {
  id: string
  name: string
  color: string
  kids: boolean
  audience: 'kids' | 'teens' | 'adults'
  maturityLimit: 13 | 16 | 18
}

export interface ContinueWatchingEntry {
  id: string
  currentTime: number
  duration: number
  progress: number
  updatedAt: number
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
  { id: 'p1', name: 'Piotr', color: '#1f80d7', kids: false, audience: 'adults', maturityLimit: 18 },
  { id: 'p2', name: 'Profil 13+', color: '#f59e0b', kids: true, audience: 'kids', maturityLimit: 13 },
]

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

  const setActiveProfile = (profileId: string) => {
    activeProfileId.value = profileId
    ensureAllBuckets(profileId)
    profileSelectorOpen.value = false
  }

  const openProfileSelector = () => {
    profileSelectorOpen.value = true
  }

  const closeProfileSelector = () => {
    profileSelectorOpen.value = false
  }

  const addProfile = (name: string, audience: StreamProfile['audience'] = 'adults') => {
    const normalizedName = name.trim()

    if (!normalizedName || profiles.value.length >= 6) {
      return false
    }

    if (profiles.value.some(profile => profile.name.toLowerCase() === normalizedName.toLowerCase())) {
      return false
    }

    const newId = `p${Date.now()}`
    const config = audienceConfig[audience]

    profiles.value.push({
      id: newId,
      name: normalizedName,
      color: config.color,
      kids: config.kids,
      audience,
      maturityLimit: config.maturityLimit,
    })

    ensureAllBuckets(newId)
    setActiveProfile(newId)
    return true
  }

  const removeProfile = (profileId: string) => {
    if (profiles.value.length === 1) {
      return
    }

    profiles.value = profiles.value.filter(profile => profile.id !== profileId)
    delete favoriteMap.value[profileId]
    delete hiddenMap.value[profileId]
    delete continueMap.value[profileId]

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

  return {
    profiles,
    activeProfileId,
    currentProfile,
    favoriteIds,
    hiddenIds,
    continueWatchingEntries,
    profileSelectorOpen,
    setActiveProfile,
    openProfileSelector,
    closeProfileSelector,
    addProfile,
    removeProfile,
    getProfileAudienceLabel,
    isFavorite,
    isHidden,
    toggleFavorite,
    hideTitle,
    unhideTitle,
    updateContinueWatching,
    removeFromContinueWatching,
  }
}
