import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      nav: {
        about: 'About',
        focus: 'Focus',
        projects: 'Projects',
        research: 'Research',
        writing: 'Writing',
        tooling: 'Tooling',
        contact: 'Contact'
      },
      hero: {
        eyebrow: 'FIELD NOTES',
        title: 'Kerem explores',
        titleHighlight: 'cybersecurity, systems & technology',
        description: 'Through a build, break, and learn mindset',
        cta: 'View Work',
        status: 'Available for opportunities'
      },
      about: {
        title: 'About',
        description: 'I\'m Kerem, a security researcher exploring how systems fail and how thoughtful security makes them more resilient. My work spans cybersecurity, web security, and Linux internals.',
        annotation: 'Currently based in <b>Istanbul, TR</b>'
      },
      focus: {
        title: 'Focus',
        cybersecurity: {
          title: 'Cybersecurity',
          description: 'Understanding how systems fail, and how thoughtful security makes them more resilient.'
        },
        webSecurity: {
          title: 'Web security',
          description: 'Exploring the assumptions and attack surfaces behind modern web applications.'
        },
        redTeam: {
          title: 'Red team',
          description: 'Learning adversarial methods in ethical, controlled environments.'
        },
        linux: {
          title: 'Linux',
          description: 'Getting closer to the operating system, one experiment at a time.'
        },
        programming: {
          title: 'Programming',
          description: 'Building small tools and projects to turn curiosity into working code.'
        },
        ai: {
          title: 'AI',
          description: 'Following the new questions that emerge where AI and security meet.'
        }
      },
      contact: {
        title: 'Let\'s build something interesting.',
        description: 'Interested in security, systems, or an idea worth exploring? I\'m always glad to connect and learn from people building thoughtful things.'
      },
      terminal: {
        welcome: 'Welcome to Kerem\'s terminal. Type "help" for available commands.',
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
  rm         - Remove file/directory`
      }
    }
  },
  tr: {
    translation: {
      nav: {
        about: 'Hakkımda',
        focus: 'Odak',
        projects: 'Projeler',
        research: 'Araştırma',
        writing: 'Yazılar',
        tooling: 'Araçlar',
        contact: 'İletişim'
      },
      hero: {
        eyebrow: 'ALAN NOTLARI',
        title: 'Kerem',
        titleHighlight: 'siber güvenlik, sistemler ve teknoloji',
        description: 'Yap, kır ve öğren yaklaşımıyla',
        cta: 'Çalışmaları Gör',
        status: 'Fırsatlara açık'
      },
      about: {
        title: 'Hakkımda',
        description: 'Ben Kerem, sistemlerin nasıl başarısız olduğunu ve düşünceli güvenliğin bunları nasıl daha dayanıklı hale getirdiğini araştıran bir güvenlik araştırmacısıyım. Çalışmalarım siber güvenlik, web güvenliği ve Linux iç mimarisi üzerine.',
        annotation: 'Şu anda <b>İstanbul, TR</b>\'da yaşıyorum'
      },
      focus: {
        title: 'Odak',
        cybersecurity: {
          title: 'Siber Güvenlik',
          description: 'Sistemlerin nasıl başarısız olduğunu ve düşünceli güvenliğin bunları nasıl daha dayanıklı hale getirdiğini anlamak.'
        },
        webSecurity: {
          title: 'Web Güvenliği',
          description: 'Modern web uygulamalarının arkasındaki varsayımları ve saldırı yüzeylerini keşfetmek.'
        },
        redTeam: {
          title: 'Red Team',
          description: 'Etik ve kontrollü ortamlarda düşmanca yöntemleri öğrenmek.'
        },
        linux: {
          title: 'Linux',
          description: 'İşletim sistemine yaklaşmak, deneyim deneyim.'
        },
        programming: {
          title: 'Programlama',
          description: 'Merakı çalışan koda dönüştürmek için küçük araçlar ve projeler inşa etmek.'
        },
        ai: {
          title: 'Yapay Zeka',
          description: 'Yapay zeka ve güvenliğin birleştiği yerde ortaya çıkan yeni soruları takip etmek.'
        }
      },
      contact: {
        title: 'İlginç bir şeyler inşa edelim.',
        description: 'Siber güvenlik, sistemler veya keşfilmeye değer bir fikir mi ilgini çekiyor? Düşünceli şeyler inşa eden insanlarla bağlantı kurmaktan ve onlardan öğrenmekten her zaman mutluluk duyarım.'
      },
      terminal: {
        welcome: 'Kerem\'in terminaline hoş geldiniz. Mevcut komutlar için "help" yazın.',
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
  rm         - Dosya/dizin siler`
      }
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
