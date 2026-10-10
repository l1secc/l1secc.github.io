import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const en = {
  translation: {
    a11y: {
      skip: 'Skip to content',
      main: 'Main navigation',
      themeToggle: 'Toggle colour theme',
      languageToggle: 'Switch to Turkish',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      commandPalette: 'Open command palette',
      terminal: "A snapshot of Kerem's current interests",
      paletteDialog: 'Command palette',
      paletteInput: 'Search commands',
      socialLink: 'Social links',
      scrollCue: 'Go to about section',
      localTime: 'Local time',
      activeSection: 'Current section'
    },
    nav: {
      about: 'About',
      focus: 'Focus',
      projects: 'Projects',
      research: 'Research',
      writing: 'Writing',
      tooling: 'Tooling',
      blog: 'Blog',
      contact: 'Contact',
      social: 'Social',
      home: 'Home'
    },
    theme: {
      label: 'Theme',
      dark: 'Dark',
      light: 'Light'
    },
    hero: {
      eyebrow: 'CYBERSECURITY · TECHNOLOGY · RESEARCH',
      title: 'Kerem explores',
      titleHighlight: 'cybersecurity, systems & technology',
      description: 'Through a build, break, and learn mindset',
      cta: 'View Work',
      ctaSecondary: 'Read the blog',
      status: 'Available for opportunities',
      scrollCue: 'SCROLL TO EXPLORE',
      indexA: 'INDEPENDENT PRACTICE',
      indexB: '01 — 06'
    },
    about: {
      title: 'About',
      description: "I'm Kerem, a security researcher exploring how systems fail and how thoughtful security makes them more resilient. My work spans cybersecurity, web security, and Linux internals.",
      noteOne: 'Cybersecurity, web security, Linux, red team methodologies, programming, AI and security research all give me a different way to ask the same question: <em>how does this system really work?</em>',
      noteTwo: "I'm learning by experimenting, making small things, and studying what happens when assumptions meet reality. There's always more to understand.",
      annotation: 'CURRENTLY BASED IN',
      location: 'Istanbul, TR'
    },
    focus: {
      title: 'Focus',
      heading: 'Areas of curiosity.',
      detail: 'A few of the domains I keep coming back to.',
      cybersecurity: { title: 'Cybersecurity', description: 'Understanding how systems fail, and how thoughtful security makes them more resilient.' },
      webSecurity: { title: 'Web security', description: 'Exploring the assumptions and attack surfaces behind modern web applications.' },
      redTeam: { title: 'Red team', description: 'Learning adversarial methods in ethical, controlled environments.' },
      linux: { title: 'Linux', description: 'Getting closer to the operating system, one experiment at a time.' },
      programming: { title: 'Programming', description: 'Building small tools and projects to turn curiosity into working code.' },
      ai: { title: 'AI', description: 'Following the new questions that emerge where AI and security meet.' }
    },
    projects: {
      title: 'Selected work.',
      detail: 'Built to answer a question, test an idea, or learn something new.',
      source: 'Source',
      demo: 'Live demo',
      emptyLabel: 'WORK IN PROGRESS',
      emptyTitle: 'The next experiment starts here.',
      emptyBody: 'Projects will appear here as they take shape. No placeholders, just work worth sharing.',
      emptyCoordinate: '[ 00 · 00 · 00 ]'
    },
    research: {
      title: 'The lab notebook.',
      detail: 'An open record of questions, tests, and things learned along the way.',
      coverLabel: 'RESEARCH JOURNAL',
      volume: 'VOL. 01',
      coverFootA: 'OBSERVE / TEST / LEARN',
      coverFootB: 'FIELD STUDY SERIES',
      notesLabel: 'NOTES TAKING SHAPE',
      notesIntro: 'Future entries may include:',
      notes: {
        ctf: 'CTF writeups',
        web: 'Web security experiments',
        linux: 'Linux & tooling',
        reversing: 'Reverse engineering',
        ai: 'AI security'
      }
    },
    writing: {
      title: 'Notes & writing.',
      detail: 'Ideas make more sense when you put them into words.',
      emptyLabel: 'THE FIRST NOTE IS IN PROGRESS',
      emptyBody: 'Short writeups and practical notes will find a home here soon.'
    },
    tooling: {
      label: 'TOOLS ALONG THE WAY',
      description: 'A working toolkit, updated as I learn.',
      prompt: 'Tool list ready to personalise as your practice takes shape.'
    },
    blog: {
      title: 'Blog.',
      detail: 'Thoughts, ideas, and writeups.',
      loading: 'Loading…',
      emptyLabel: 'COMING SOON',
      emptyBody: 'Blog posts will be published here.',
      back: 'Back to Blog',
      minutes: '{{count}} min read',
      notFoundLabel: 'POST NOT FOUND',
      notFoundBody: 'This note does not exist, or it has not been published yet.',
      backToBlog: 'Return to the blog index.'
    },
    contact: {
      title: "Let's build something interesting.",
      description: "Interested in security, systems, or an idea worth exploring? I'm always glad to connect and learn from people building thoughtful things.",
      addLink: 'ADD LINK'
    },
    footer: {
      tagline: 'Cybersecurity · Technology · Research',
      backToTop: 'BACK TO TOP'
    },
    palette: {
      title: 'COMMAND PALETTE',
      placeholder: 'Type a command or search…',
      navigate: 'NAVIGATE',
      actions: 'ACTIONS',
      empty: 'No matches.',
      hint: 'Use ↑ ↓ to move · ↵ to run · esc to close'
    },
    terminal: {
      welcome: 'Welcome to Kerem\'s terminal. Type "help" for available commands.',
      title: 'PERSONAL ENVIRONMENT',
      brand: 'FIELD NOTES · 001',
      coordinate: 'TR / 41°',
      inputLabel: 'Terminal input',
      help: `Available commands:
  whoami     - Display your identity
  focus      - Show current focus areas
  status     - Show current status
  skills     - List technical skills
  social     - Show social links
  clear      - Clear terminal
  date       - Show current date
  ls         - List directory contents
  pwd        - Print working directory
  cd         - Change directory
  cat        - Display file contents
  echo       - Print text
  mkdir      - Create directory
  touch      - Create file
  rm         - Remove file/directory`,
      whoami: 'kerem',
      status: 'learning... building... researching...',
      notFound: 'Command not found: {{cmd}}. Type "help" for available commands.',
      missingOperand: 'missing operand',
      noSuchDirectory: 'No such directory',
      noSuchFile: 'No such file',
      isDirectory: 'Is a directory',
      notDirectory: 'Not a directory',
      exists: 'File exists',
      hint: 'Try "help"'
    }
  }
} as const

const tr = {
  translation: {
    a11y: {
      skip: 'İçeriğe geç',
      main: 'Ana gezinme',
      themeToggle: 'Renk temasını değiştir',
      languageToggle: 'İngilizceye geç',
      openMenu: 'Menüyü aç',
      closeMenu: 'Menüyü kapat',
      commandPalette: 'Komut paletini aç',
      terminal: "Kerem'in güncel ilgi alanlarının anlık görüntüsü",
      paletteDialog: 'Komut paleti',
      paletteInput: 'Komut ara',
      socialLink: 'Sosyal bağlantılar',
      scrollCue: 'Hakkında bölümüne git',
      localTime: 'Yerel saat',
      activeSection: 'Geçerli bölüm'
    },
    nav: {
      about: 'Hakkımda',
      focus: 'Odak',
      projects: 'Projeler',
      research: 'Araştırma',
      writing: 'Yazılar',
      tooling: 'Araçlar',
      blog: 'Blog',
      contact: 'İletişim',
      social: 'Sosyal',
      home: 'Ana sayfa'
    },
    theme: {
      label: 'Tema',
      dark: 'Koyu',
      light: 'Açık'
    },
    hero: {
      eyebrow: 'SİBER GÜVENLİK · TEKNOLOJİ · ARAŞTIRMA',
      title: 'Kerem',
      titleHighlight: 'siber güvenlik, sistemler ve teknoloji',
      description: 'Yap, kır ve öğren yaklaşımıyla',
      cta: 'Çalışmaları Gör',
      ctaSecondary: 'Blogu oku',
      status: 'Fırsatlara açık',
      scrollCue: 'KEŞFETMEK İÇİN KAYDIR',
      indexA: 'BAĞIMSIZ ÇALIŞMA',
      indexB: '01 — 06'
    },
    about: {
      title: 'Hakkımda',
      description: 'Ben Kerem, sistemlerin nasıl başarısız olduğunu ve düşünceli güvenliğin bunları nasıl daha dayanıklı hale getirdiğini araştıran bir güvenlik araştırmacısıyım. Çalışmalarım siber güvenlik, web güvenliği ve Linux iç mimarisi üzerine.',
      noteOne: 'Siber güvenlik, web güvenliği, Linux, red team metodolojileri, programlama, yapay zeka ve güvenlik araştırması bana aynı soruyu farklı biçimlerde sorma imkânı veriyor: <em>bu sistem gerçekte nasıl çalışıyor?</em>',
      noteTwo: 'Deneyerek, küçük şeyler üreterek ve varsayımlar gerçeklikle karşılaştığında ne olduğunu inceleyerek öğreniyorum. Anlaşılacak çok şey var.',
      annotation: 'ŞU ANDA BULUNDUĞU YER',
      location: 'İstanbul, TR'
    },
    focus: {
      title: 'Odak',
      heading: 'İlgi alanları.',
      detail: 'Sık sık geri döndüğüm birkaç alan.',
      cybersecurity: { title: 'Siber Güvenlik', description: 'Sistemlerin nasıl başarısız olduğunu ve düşünceli güvenliğin bunları nasıl daha dayanıklı hale getirdiğini anlamak.' },
      webSecurity: { title: 'Web Güvenliği', description: 'Modern web uygulamalarının arkasındaki varsayımları ve saldırı yüzeylerini keşfetmek.' },
      redTeam: { title: 'Red Team', description: 'Etik ve kontrollü ortamlarda düşmanca yöntemleri öğrenmek.' },
      linux: { title: 'Linux', description: 'İşletim sistemine, her seferinde bir deney daha yaklaşmak.' },
      programming: { title: 'Programlama', description: 'Merakı çalışan koda dönüştürmek için küçük araçlar ve projeler inşa etmek.' },
      ai: { title: 'Yapay Zeka', description: 'Yapay zeka ve güvenliğin birleştiği yerde ortaya çıkan yeni soruları takip etmek.' }
    },
    projects: {
      title: 'Seçilmiş çalışmalar.',
      detail: 'Bir soruyu yanıtlamak, bir fikri test etmek ya da yeni bir şey öğrenmek için inşa edildi.',
      source: 'Kaynak',
      demo: 'Canlı demo',
      emptyLabel: 'ÇALIŞMA SÜRECİNDE',
      emptyTitle: 'Bir sonraki deney burada başlıyor.',
      emptyBody: 'Projeler şekillendikçe burada görünecek. Yer tutucu yok, sadece paylaşmaya değer iş var.',
      emptyCoordinate: '[ 00 · 00 · 00 ]'
    },
    research: {
      title: 'Laboratuvar defteri.',
      detail: 'Yol boyunca edilen soruların, testlerin ve öğrenilen şeylerin açık bir kaydı.',
      coverLabel: 'ARAŞTIRMA GÜNLÜĞÜ',
      volume: 'CİLT 01',
      coverFootA: 'GÖZLEMLE / TEST ET / ÖĞREN',
      coverFootB: 'SAHA ÇALIŞMASI SERİSİ',
      notesLabel: 'NOTLAR ŞEKİLLENİYOR',
      notesIntro: 'Gelecek kayıtlar şunları içerebilir:',
      notes: {
        ctf: 'CTF çözümleri',
        web: 'Web güvenliği deneyleri',
        linux: 'Linux ve araçlar',
        reversing: 'Tersine mühendislik',
        ai: 'Yapay zeka güvenliği'
      }
    },
    writing: {
      title: 'Notlar ve yazılar.',
      detail: 'Fikirler kelimelere döküldüğünde daha anlamlı hale gelir.',
      emptyLabel: 'İLK NOT HAZIRLANIYOR',
      emptyBody: 'Kısa çözümler ve pratik notlar yakında burada yerini alacak.'
    },
    tooling: {
      label: 'YANIMDAKİ ARAÇLAR',
      description: 'Öğrendikçe güncellenen çalışma araçları.',
      prompt: 'Araç listesi, uygulamalarınız şekillendikçe kişiselleştirmeye hazır.'
    },
    blog: {
      title: 'Blog.',
      detail: 'Düşünceler, fikirler ve çözümler.',
      loading: 'Yükleniyor…',
      emptyLabel: 'YAKINDA',
      emptyBody: 'Blog yazıları burada yayımlanacak.',
      back: 'Bloga dön',
      minutes: '{{count}} dk okuma',
      notFoundLabel: 'YAZI BULUNAMADI',
      notFoundBody: 'Bu not mevcut değil ya da henüz yayımlanmadı.',
      backToBlog: 'Blog dizinine dön.'
    },
    contact: {
      title: 'İlginç bir şeyler inşa edelim.',
      description: 'Güvenlik, sistemler veya keşfedilmeye değer bir fikir mi ilgini çekiyor? Düşünceli şeyler inşa eden insanlarla bağlantı kurmaktan ve onlardan öğrenmekten her zaman mutluluk duyarım.',
      addLink: 'BAĞLANTI EKLE'
    },
    footer: {
      tagline: 'Siber Güvenlik · Teknoloji · Araştırma',
      backToTop: 'BAŞA DÖN'
    },
    palette: {
      title: 'KOMUT PALETİ',
      placeholder: 'Bir komut yaz veya ara…',
      navigate: 'GEZİN',
      actions: 'EYLEMLER',
      empty: 'Eşleşme yok.',
      hint: '↑ ↓ ile seç · ↵ ile çalıştır · esc ile kapat'
    },
    terminal: {
      welcome: "Kerem'in terminaline hoş geldiniz. Mevcut komutlar için \"help\" yazın.",
      title: 'KİŞİSEL ORTAM',
      brand: 'ALAN NOTLARI · 001',
      coordinate: 'TR / 41°',
      inputLabel: 'Terminal girişi',
      help: `Mevcut komutlar:
  whoami     - Kimliğinizi gösterir
  focus      - Odak alanlarını gösterir
  status     - Mevcut durumu gösterir
  skills     - Teknik yetenekleri listeler
  social     - Sosyal linkleri gösterir
  clear      - Terminali temizler
  date       - Tarih gösterir
  ls         - Dizin içeriğini listeler
  pwd        - Çalışma dizinini gösterir
  cd         - Dizin değiştirir
  cat        - Dosya içeriğini gösterir
  echo       - Metin yazdırır
  mkdir      - Dizin oluşturur
  touch      - Dosya oluşturur
  rm         - Dosya/dizin siler`,
      whoami: 'kerem',
      status: 'öğreniyor... inşa ediyor... araştırıyor...',
      notFound: 'Komut bulunamadı: {{cmd}}. Mevcut komutlar için "help" yazın.',
      missingOperand: 'eksik operand',
      noSuchDirectory: 'Böyle bir dizin yok',
      noSuchFile: 'Böyle bir dosya yok',
      isDirectory: 'Bir dizin',
      notDirectory: 'Bir dizin değil',
      exists: 'Dosya mevcut',
      hint: '"help" dene'
    }
  }
} as const

const boot = (window as unknown as { __KEREM_BOOT__?: { lang?: string; theme?: string } }).__KEREM_BOOT__

i18n
  .use(initReactI18next)
  .init({
    resources: { en, tr },
    lng: boot?.lang === 'tr' ? 'tr' : 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'tr'],
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    react: { useSuspense: false }
  })

export default i18n