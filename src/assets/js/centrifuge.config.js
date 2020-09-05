// 29.10.18. Версия центирфуги выше 2.0 не работает с сервером.
// Рекомендуется использовать версию от 1 до 1.9
import Centrifuge from 'centrifuge'
import Cookies from 'js-cookie'

// Конкретно эта версия SockJS используется для Центрифуги. Новая версия не работает!
import * as SockJS from '@/assets/js/sockjs'

// 27.03.20 Удалить через несколько месяцев, если не возникнет ошибок
// import jsSHA from 'jssha'
// import '@/assets/js/sockjs'

const JsSHA = require('jssha')

const userId = Cookies.get('userid')
const memberId = userId || '-1'

const hostParts = `${process.env.NODE_ENV === 'production'
  ? window.location.host
  : 'nd-api.gio.ru'}`.split('.')
const subdomain = hostParts[0]

// Генерируем ключ
const timestamp = Math.floor(Date.now() / 1000).toString()
const hmacBody = memberId + timestamp
const secret = '63948a09-e75d-4012-83d1-ea94283b9e74'
const shaObj = new JsSHA('SHA-256', 'TEXT')

shaObj.setHMACKey(secret, 'TEXT')
shaObj.update(hmacBody)

const token = shaObj.getHMAC('HEX')
const centrifuge = new Centrifuge({
  // Конфиг центрифуги
  url: 'https://centrifugo.gio.ru/connection',
  token,
  user: memberId,
  sockjs: SockJS,
  timestamp
})

// Подключаемся
centrifuge.connect()
centrifuge.on('connect', () => {
  console.log(`Центрифуга подключена. Пользователь: ${memberId}, домен: ${hostParts[0]}`)
})

export {
  subdomain,
  centrifuge
}
