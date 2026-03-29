# StreamBox PWA

Desktop-first aplikacja VOD zbudowana w `Nuxt 4`, z warstwa `PWA`, profilem 18+ i weryfikacja email przez `Resend`.

## Stack

- `Nuxt 4`
- `@vite-pwa/nuxt`
- `Bulma`
- `Vue 3`
- `Vercel Functions`
- `Resend Email API`

## Uruchomienie

Zainstaluj zaleznosci:

```bash
npm install
```

Uruchom development:

```bash
npm run dev
```

Zbuduj wersje produkcyjna:

```bash
npm run build
```

Uruchom gotowy build:

```bash
node .output/server/index.mjs
```

## Zmienne srodowiskowe

Ustaw lokalnie w `.env` i na Vercel:

```bash
RESEND_API_KEY=re_xxx
RESEND_FROM="Prime Video <onboarding@resend.dev>"
EMAIL_VERIFICATION_SECRET=very-strong-random-secret
NUXT_PUBLIC_APP_URL=https://twoja-domena.vercel.app
```

Uwagi:

- `RESEND_API_KEY` jest wymagany do wysylki maili.
- `RESEND_FROM` moze zostac `onboarding@resend.dev` na start, ale dla produkcji warto podpiac zweryfikowana domene w Resend.
- `EMAIL_VERIFICATION_SECRET` podpisuje linki i kody weryfikacyjne. Ustaw dlugi losowy sekret.
- `NUXT_PUBLIC_APP_URL` powinien wskazywac na publiczny adres aplikacji, zeby link z maila otwieral poprawna strone `verify-email`.

## Weryfikacja email dla profilu 18+

Flow dziala tak:

1. Uzytkownik dodaje profil `18+`.
2. Front wysyla formularz do `server/api/auth/register-adult.post.ts`.
3. Backend generuje kod i podpisany token, a potem wysyla email przez Resend.
4. Profil pozostaje nieaktywny do czasu wpisania kodu albo klikniecia linku z wiadomosci.
5. Aktywacja dzieje sie przez `server/api/auth/verify-code.post.ts` albo `server/api/auth/verify-link.get.ts`.

## Instalacja jako aplikacja w Chrome

Po uruchomieniu buildu wejdz na:

```text
http://localhost:3000
```

Nastepnie w Chrome:

- kliknij ikone instalacji w pasku adresu, albo
- wybierz `Zainstaluj StreamBox` z menu Chrome.
