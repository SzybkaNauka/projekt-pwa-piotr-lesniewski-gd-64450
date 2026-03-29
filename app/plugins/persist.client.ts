export default defineNuxtPlugin(() => {
  const profiles = useState<any[]>('profiles')
  const activeProfileId = useState<string>('active-profile-id')
  const favoriteMap = useState<Record<string, string[]>>('favorite-map')
  const hiddenMap = useState<Record<string, string[]>>('hidden-map')
  const continueMap = useState<Record<string, any[]>>('continue-map')
  const adultVerification = useState<Record<string, any>>('adult-verification')

  const restore = (key: string, stateRef: any) => {
    const raw = localStorage.getItem(key)
    if (!raw) {
      return
    }

    try {
      stateRef.value = JSON.parse(raw)
    } catch {
      //
    }
  }

  restore('streambox-profiles', profiles)
  restore('streambox-active-profile-id', activeProfileId)
  restore('streambox-favorite-map', favoriteMap)
  restore('streambox-hidden-map', hiddenMap)
  restore('streambox-continue-map', continueMap)
  restore('streambox-adult-verification', adultVerification)

  watch(profiles, value => localStorage.setItem('streambox-profiles', JSON.stringify(value)), { deep: true })
  watch(activeProfileId, value => localStorage.setItem('streambox-active-profile-id', JSON.stringify(value)))
  watch(favoriteMap, value => localStorage.setItem('streambox-favorite-map', JSON.stringify(value)), { deep: true })
  watch(hiddenMap, value => localStorage.setItem('streambox-hidden-map', JSON.stringify(value)), { deep: true })
  watch(continueMap, value => localStorage.setItem('streambox-continue-map', JSON.stringify(value)), { deep: true })
  watch(adultVerification, value => localStorage.setItem('streambox-adult-verification', JSON.stringify(value)), { deep: true })
})
