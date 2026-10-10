(function () {
  var root = document.documentElement
  var theme = 'dark'
  var lang = 'en'
  try {
    var storedTheme = localStorage.getItem('kerem.theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      theme = storedTheme
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      theme = 'light'
    }
  } catch (e) {
    theme = 'dark'
  }
  try {
    var storedLang = localStorage.getItem('kerem.lang')
    if (storedLang === 'en' || storedLang === 'tr') {
      lang = storedLang
    } else if ((navigator.language || '').toLowerCase().indexOf('tr') === 0) {
      lang = 'tr'
    }
  } catch (e) {
    lang = 'en'
  }
  root.setAttribute('data-theme', theme)
  root.setAttribute('lang', lang)
  root.style.colorScheme = theme
  var meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'light' ? '#f7f7f4' : '#101110')
  window.__KEREM_BOOT__ = { theme: theme, lang: lang }
})()