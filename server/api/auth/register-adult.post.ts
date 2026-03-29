import { createError } from 'h3'
import { calculateAge, createVerificationToken, generateVerificationCode, maskEmail } from '../../utils/adultVerification'
import { sendVerificationEmail } from '../../utils/resend'

interface RegisterAdultBody {
  profileId: string
  profileName: string
  email: string
  birthDate: string
}

export default defineEventHandler(async event => {
  const body = await readBody<RegisterAdultBody>(event)
  const config = useRuntimeConfig(event)
  const email = body.email?.trim().toLowerCase() || ''
  const profileName = body.profileName?.trim() || ''
  const profileId = body.profileId?.trim() || ''
  const birthDate = body.birthDate || ''
  const age = calculateAge(birthDate)

  if (!profileId || !profileName) {
    throw createError({ statusCode: 400, statusMessage: 'Brakuje danych profilu.' })
  }

  if (!/.+@.+\..+/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Wpisz poprawny adres email.' })
  }

  if (!birthDate) {
    throw createError({ statusCode: 400, statusMessage: 'Podaj date urodzenia.' })
  }

  if (age < 18) {
    throw createError({ statusCode: 400, statusMessage: 'Profil 18+ wymaga pelnoletnosci.' })
  }

  if (!config.emailVerificationSecret) {
    throw createError({ statusCode: 500, statusMessage: 'Brakuje EMAIL_VERIFICATION_SECRET na serwerze.' })
  }

  if (!config.resendApiKey) {
    throw createError({ statusCode: 500, statusMessage: 'Brakuje zmiennej RESEND_API_KEY na serwerze.' })
  }

  const expiresAt = Date.now() + 1000 * 60 * 15
  const code = generateVerificationCode()
  const token = createVerificationToken({
    profileId,
    profileName,
    email,
    birthDate,
    code,
    exp: expiresAt,
  }, config.emailVerificationSecret)
  const appUrl = config.public.appUrl || getRequestURL(event).origin
  const verifyUrl = `${appUrl.replace(/\/$/, '')}/verify-email?token=${encodeURIComponent(token)}`

  await sendVerificationEmail({
    to: email,
    profileName,
    code,
    verifyUrl,
    apiKey: config.resendApiKey,
    from: config.resendFrom,
  })

  return {
    maskedEmail: maskEmail(email),
    verificationToken: token,
    expiresAt,
  }
})
