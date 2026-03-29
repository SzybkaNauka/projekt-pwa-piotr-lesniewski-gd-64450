import { createError } from 'h3'

interface SendVerificationEmailInput {
  to: string
  profileName: string
  code: string
  verifyUrl: string
  apiKey: string
  from: string
}

export const sendVerificationEmail = async ({
  to,
  profileName,
  code,
  verifyUrl,
  apiKey,
  from,
}: SendVerificationEmailInput) => {
  const normalizedFrom = from
    .replace(/\\"/g, '"')
    .trim()
    .replace(/^"(.*)"$/, '$1')

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: normalizedFrom,
      to: [to],
      subject: `Potwierdz email dla profilu ${profileName}`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #07131f; color: #f7fbff; padding: 32px;">
          <div style="max-width: 560px; margin: 0 auto; background: #102131; border-radius: 20px; padding: 32px; border: 1px solid rgba(255,255,255,0.08);">
            <p style="margin: 0 0 12px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #8ac6ff;">Prime Video PWA</p>
            <h1 style="margin: 0 0 16px; font-size: 28px; line-height: 1.2;">Potwierdz adres email</h1>
            <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #dbe7f2;">Profil <strong>${profileName}</strong> czeka na aktywacje. Kliknij przycisk albo wpisz kod w aplikacji.</p>
            <div style="margin: 24px 0; padding: 18px; border-radius: 16px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);">
              <p style="margin: 0 0 8px; font-size: 13px; color: #b7c6d4;">Kod weryfikacyjny</p>
              <p style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 0.2em; color: #ffffff;">${code}</p>
            </div>
            <a href="${verifyUrl}" style="display: inline-block; padding: 14px 20px; background: #1f80d7; color: #ffffff; border-radius: 12px; text-decoration: none; font-weight: 700;">Aktywuj konto</a>
            <p style="margin: 20px 0 0; font-size: 13px; line-height: 1.6; color: #93a8bc;">Jesli przycisk nie dziala, otworz ten link:<br><a href="${verifyUrl}" style="color: #8ac6ff;">${verifyUrl}</a></p>
          </div>
        </div>
      `,
    }),
  })

  if (!response.ok) {
    const payload = await response.text()
    let message = payload

    try {
      const parsed = JSON.parse(payload)
      message = parsed?.message || parsed?.error?.message || payload
    } catch {
      //
    }

    throw createError({
      statusCode: 502,
      statusMessage: `Resend zwrocil blad podczas wysylki emaila. ${message}`,
    })
  }

  return response.json()
}
