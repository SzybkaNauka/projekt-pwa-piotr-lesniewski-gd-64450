import { createHmac, timingSafeEqual } from 'node:crypto'
import { createError } from 'h3'

export interface VerificationTokenPayload {
  profileId: string
  profileName: string
  email: string
  birthDate: string
  code: string
  exp: number
}

const toBase64Url = (value: string) => Buffer.from(value, 'utf8').toString('base64url')
const fromBase64Url = (value: string) => Buffer.from(value, 'base64url').toString('utf8')

const sign = (input: string, secret: string) =>
  createHmac('sha256', secret).update(input).digest('base64url')

export const createVerificationToken = (payload: VerificationTokenPayload, secret: string) => {
  const encodedPayload = toBase64Url(JSON.stringify(payload))
  const signature = sign(encodedPayload, secret)
  return `${encodedPayload}.${signature}`
}

export const readVerificationToken = (token: string, secret: string) => {
  const [encodedPayload, signature] = token.split('.')

  if (!encodedPayload || !signature) {
    throw createError({ statusCode: 400, statusMessage: 'Nieprawidlowy token weryfikacyjny.' })
  }

  const expectedSignature = sign(encodedPayload, secret)
  const signatureBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expectedSignature)

  if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) {
    throw createError({ statusCode: 400, statusMessage: 'Podpis tokenu jest nieprawidlowy.' })
  }

  const payload = JSON.parse(fromBase64Url(encodedPayload)) as VerificationTokenPayload

  if (!payload.exp || Date.now() > payload.exp) {
    throw createError({ statusCode: 400, statusMessage: 'Link lub kod weryfikacyjny juz wygasl.' })
  }

  return payload
}

export const calculateAge = (birthDate: string) => {
  if (!birthDate) {
    return 0
  }

  const today = new Date()
  const date = new Date(`${birthDate}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return 0
  }

  let age = today.getFullYear() - date.getFullYear()
  const monthDiff = today.getMonth() - date.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age -= 1
  }

  return age
}

export const generateVerificationCode = () => String(Math.floor(100000 + Math.random() * 900000))

export const maskEmail = (email: string) => {
  const [localPart, domain] = email.split('@')

  if (!localPart || !domain) {
    return email
  }

  const visibleLocal = localPart.slice(0, 2)
  const maskedLocal = `${visibleLocal}${'*'.repeat(Math.max(localPart.length - 2, 1))}`
  return `${maskedLocal}@${domain}`
}
