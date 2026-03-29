import { createError } from 'h3'
import { readVerificationToken } from '../../utils/adultVerification'

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const token = typeof query.token === 'string' ? query.token : ''
  const config = useRuntimeConfig(event)

  if (!config.emailVerificationSecret) {
    throw createError({ statusCode: 500, statusMessage: 'Brakuje EMAIL_VERIFICATION_SECRET na serwerze.' })
  }

  const payload = readVerificationToken(token, config.emailVerificationSecret)

  return {
    profileId: payload.profileId,
    profileName: payload.profileName,
    email: payload.email,
    birthDate: payload.birthDate,
    verifiedAt: Date.now(),
  }
})
