import { createError } from 'h3'
import { readVerificationToken } from '../../utils/adultVerification'

interface VerifyCodeBody {
  token: string
  code: string
}

export default defineEventHandler(async event => {
  const body = await readBody<VerifyCodeBody>(event)
  const config = useRuntimeConfig(event)

  if (!config.emailVerificationSecret) {
    throw createError({ statusCode: 500, statusMessage: 'Brakuje EMAIL_VERIFICATION_SECRET na serwerze.' })
  }

  const payload = readVerificationToken(body.token || '', config.emailVerificationSecret)

  if ((body.code || '').trim() !== payload.code) {
    throw createError({ statusCode: 400, statusMessage: 'Kod potwierdzajacy jest nieprawidlowy.' })
  }

  return {
    profileId: payload.profileId,
    profileName: payload.profileName,
    email: payload.email,
    birthDate: payload.birthDate,
    verifiedAt: Date.now(),
  }
})
