# AGENTS.md — l1secc.github.io (Kerem Portfolio)

Vite 6 · React 18.3 · TS 5.6 · react-router-dom 7 · i18next · react-markdown 10 +
rehype-sanitize · GitHub Pages.

## Önce skill'i yükle

Bu repo için `kerem-portfolio` skill'i var: tasarım sözleşmesi, bölüm anatomisi,
içerik yazımı, Decap CMS akışı, build/deploy. Kod okumadan veya düzenlemeden
önce yükle. Bu dosya yalnızca skill'de olmayanları tutar.

## Durum (2026-10-10)

Build sağlıklı, blog prod'da çalışıyor, koyu/açık tema ve tam EN/TR i18n var.

- `npm run build` temiz geçiyor. Deploy her push'ta başarılı.
- `content/` → `public/content/` taşındı; `dist/content/blog/posts.json` üretiliyor.
- Tema: `<html data-theme="dark|light">`, `localStorage['kerem.theme']`,
  sistem tercihine düşer, FOUC'u `public/theme-init.js` engelliyor.
- Dil: `localStorage['kerem.lang']` = `en|tr`, `<html lang>` güncellenir,
  `public/theme-init.js` ilk yüklemede `navigator.language`'e bakar.
- CSP build sırasında `vite.config.ts` → `cspPlugin()` ile `<meta>` olarak
  enjekte edilir (sadece production; dev'de Vite'in inline preamble'i CSP'ye takılır).

## Komutlar

```bash
npm install      # node_modules repo ile gelmiyor, ilk komut bu
npm run dev
npm run build    # tsc -b && vite build → dist/
npm run preview  # dist'i yerelde doğrula
```

- **Test / lint /typecheck script'i yok.** `npm test`, `npm run lint` uydurma.
  Tek doğrulama aracı `tsc -b` (build'e gömülü) + `npm run preview`.
- CI Node 20 kullanıyor; yerel sürüm farklı olabilir (`npm ci` ikisinde de temiz).

## Güvenlik kuralları

- **`dangerouslySetInnerHTML` kullanma.** HTML gereken yerlerde i18next `<em>`
  etiketi + `Trans` (`About.tsx` örneği).
- Markdown `rehype-sanitize` + `skipHtml` ile render ediliyor.
- `target="_blank"` her zaman `rel="noopener noreferrer"`.
- `404.html` + `App.tsx → safePath()` SPA redirect'i: `//host`, `\`, kontrol
  karakteri ve protokol-göreli yollar reddedilir. Burada gevşetme **açık
  yönlendirme** demek.
- `lib/blog.ts → isValidSlug()` yol geçişini engeller; `isSafeUrl()` `javascript:`
  / `data:` reddeder.
- Kullanıcı girdisi hiçbir yerde `eval`/`new Function` ile değerlendirilmiyor.

## Veri kasıtlı olarak boş

`src/data/site.ts` içindeki `projects`, `articles`, `tooling` dizileri boştur ve
bölümler boş-durum kartı basar (`WORK IN PROGRESS`, sabit `[ 00 · 00 · 00 ]`
koordinatları gibi). Bunlar bilinçli tasarım kararları — placeholder ya da uydurma
veri ekleme, boş durumları "düzeltme". `socials`'ta boş link, gizlenmek yerine
"ADD LINK" rozetiyle gösterilir; aynı mantık.

## Deploy

`main`'e push → `.github/workflows/deploy.yml`: Node 20 → `npm ci` →
`npm run build` → `./dist` → Pages. Yani **push = canlıya çıkma**.

- `dist/` commit'leme (`.gitignore`'da).
- Decap CMS `/admin/` üzerinden commit attığında aynı pipeline tetiklenir.
- Decap `folder: public/content/blog` — `public/` altına yazıyor, build'e giriyor.
- `base: '/'` sabit, site kökten sunuluyor (`l1secc.github.io` kullanıcı sayfası).

## Stil ve düzen

- Bölüm JSX'i **tek satır, yoğun**; `styles.css` elle minify-benzeri tek satır
  kurallar. Okunabilirlik için yeniden biçimlendirme, tutarlılık için koru.
- **Renk yalnızca CSS değişkeni.** `styles.css` içinde ham hex yazma; yeni bir
  ton ekliyorsan hem `:root` hem `:root[data-theme='light']` altına tanımla.
  Aksan kırmızı hâlâ sadece mikro etiket / ince çizgi / durum noktası.
- Yeni bölüm 5 adımlık bir akış (skill'e bak). Bölüm sayısı `SectionHeading`
  içinde değil `data/site.ts → SECTION_COUNT`'te tanımlıdır.
- Yeni metin eklerken **her şey** `src/i18n/config.ts` içinde `en` **ve** `tr`
  altında olmalı. Bölümler artık `data/site.ts`'ten İngilizce sabit metin okumuyor;
  `focusAreas` yalnızca `key` + `icon` taşır, metin `t('focus.<key>.title')`.
- Yorum yazma; ikonlar `lucide-react`, ince `strokeWidth` (1.3–1.5).
- Yeni animasyon eklerken **her zaman** `@media(prefers-reduced-motion:no-preference)`
  bloğuna yaz (`prefers-reduced-motion:reduce` altında hepsi kapanır).
- Tailwind **kaldırıldı**. Utility class kullanma; `styles.css` içine kural ekle.