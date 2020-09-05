import { format, parseISO } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'

export const formatDate = (date, dateForm) => {
  if (!date) return

  let resultDate
  // const resultDate = typeof date === 'string' ? date.replace(/ /g, 'T') : date

  if (typeof date === 'string') {
    if (date.split(' ').length > 1) {
      // resultDate = date.replace(/ /g, 'T') + '.417+08:00'
      // console.log(parseISO(date))
      resultDate = parseISO(date)
    } else {
      resultDate = date
    }
  } else {
    resultDate = date
  }
  // console.log(resultDate, date)

  return format(new Date(resultDate), dateForm, { locale: ruLocale })
}

// return format(new Date(date.replace(/\s/, 'T')), dateForm, { locale: ruLocale });

export const declensionOfNumerals = (number, titles) => {
  // Функция склонения числительных. Взято отсюда https://gist.github.com/realmyst/1262561 . Может не работать с отрицательными значениями. По ссылке есть решение, но на первом этапе решил не заморачиваться.
  // пример использования: declensionOfNumerals(count, ['найдена', 'найдено', 'найдены']);
  const cases = [2, 0, 1, 1, 1, 2]
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
}
export const isMobileDevice = () => (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
export const weeksInMonth = (month, year) => {
  // Считаем количество недель и определяем число первого дня и последнего дня недели
  // Образцовая функция
  const firstDate = new Date(year, month, 1)
  const lastDate = new Date(year, month + 1, 0)
  const numDays = lastDate.getDate()
  const weeks = []
  let start = 1
  let end = firstDate.getDay() === 0 ? 1 : 7 - firstDate.getDay() + 1 // день недели начинается с понедельника через переменную end

  while (start <= numDays) {
    weeks.push({ start, end })

    start = end + 1
    end += 7
    end = start === 1 && end === 8 ? 1 : end

    if (end > numDays) end = numDays
  }
  return weeks
}
export const shortUserName = (value) => {
  // Фильтр ФИО
  // Выводим краткое ФИО пример: 'Иванов Иван Иванович' => 'Иванов И. И.'
  if (!value) return

  const reg = value.replace(/[^a-яА-ЯёЁ]+/g, ' ').trim()
  const array = reg.split(' ')

  if (array.length < 2) return array[0]

  let result = `${array[0]} `

  for (let i = 1; i < array.length; i++) {
    if (i === array.length - 1) {
      result += `${array[i][0]}.`
    } else {
      result += `${array[i][0]}. `
    }
  }

  return result
}
export const formatSize = (bytes, decimalPoint) => {
  // Форматирование вывода размера файла
  // decimalPoint количество знаков после запятой
  // formatSize(2234) // 2.23 KB
  if (bytes === 0) return '0 Bytes'
  const k = 1000
  const dm = decimalPoint || 2
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
export const transformedObj = (object) => {
  // Преобразование объекта с вложеным массивом перед отправкой
  let outObj = {}
  for (let prop in object) {
    if (Array.isArray(object[prop])) {
      object[prop].forEach((item, index) => {
        outObj[`${prop}[${index}]`] = item
      })
    } else {
      outObj[`${prop}`] = object[prop]
    }
  }
  return outObj
}
export const numberWithSpaces = (sum) => {
  if (sum) {
    const number = parseFloat(sum).toFixed(2)
    const parts = number.toString().split('.')

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

    return parts.join('.')
  }
}

export const TESTnumberWithSpaces = (sum) => {
  /*
  * 2 отличия от numberWithSpaces:
  * 1) эта функция ГАРАНТИРОВАННО возвращает число
  * 2) округляет до первого нуля
  * -----
  * первое отличие - иногда НУЖНО, чтобы функция не возвращала 0, чтобы ничего не рендерить. Используется минимум в Бюджетировании
  * второе отличие - иногда значение может прийти 0.00 в виде строки, поэтому его округляют.
  * */
  if (sum === null) return 0
  // округляем правильно
  let result = (Math.round(sum * 100) / 100)
  // выводи число с разделением разрядов
  return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

/**
 * Высчитывает размер элемента и возвращает массив из 2х элементов:
 * 1) Вертикальное расположение относительно экрана (Bool: true - ниже половины экрана)
 * 2) Горизонтальное положение (Bool: true - левее половины экрана)
 * @param {Object} element
 */
export const setScreenPosition = (element) => {
  if (typeof element.getBoundingClientRect === 'function') {
    const elemRect = element.getBoundingClientRect()

    // Если картинка без ширины и высоты, не прекращаем выполнение функции
    if (!elemRect.width && !elemRect.height) {
      return [ false, true ]
    }

    const halfInnerWidth = window.innerWidth / 2
    const halfInnerHeight = window.innerHeight / 2

    // Проверяем можем ли расположить сверху или снизу
    const isOnBottom = (elemRect.top > halfInnerHeight && elemRect.bottom > halfInnerHeight)
    // Проверяем можем ли расположить слева или справа
    const isOnLeft = (elemRect.left < halfInnerWidth && elemRect.right < halfInnerWidth)

    return [ isOnBottom, isOnLeft ]
  } else {
    console.error('Type of element.getBoundingClientRect IS NOT a function')
    return []
  }
}

/**
 * Конвертирует цвет hex в rgba
 * @param {String} hex
 * @param {Number} alpha
 */
export const hexToRGB = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  return alpha
    ? `rgba(${r}, ${g}, ${b}, ${alpha})`
    : `rgba(${r}, ${g}, ${b})`
}

export const colorYiq = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000

  return yiq >= 190
    ? shadeColor(hex, -50)
    : shadeColor(hex, 0)
}

const shadeColor = (color, percent) => {
  let R = parseInt(color.substring(1, 3), 16)
  let G = parseInt(color.substring(3, 5), 16)
  let B = parseInt(color.substring(5, 7), 16)

  R = parseInt(R * (100 + percent) / 100)
  G = parseInt(G * (100 + percent) / 100)
  B = parseInt(B * (100 + percent) / 100)

  R = (R < 255) ? R : 255
  G = (G < 255) ? G : 255
  B = (B < 255) ? B : 255

  const RR = ((R.toString(16).length === 1) ? '0' + R.toString(16) : R.toString(16))
  const GG = ((G.toString(16).length === 1) ? '0' + G.toString(16) : G.toString(16))
  const BB = ((B.toString(16).length === 1) ? '0' + B.toString(16) : B.toString(16))

  return '#' + RR + GG + BB
}

export const randomHexColor = () => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  const letters = ['a', 'b', 'c', 'd', 'e', 'f']
  let hexValue = '#'
  for (let i = 0; i < 6; i++) {
    if (Math.floor((Math.random() * 2)) % 2 === 0) {
      hexValue += numbers[Math.floor((Math.random() * 9))]
    } else {
      hexValue += letters[Math.floor((Math.random() * 5))]
    }
  }
  return hexValue
}

export const getColorContrast = (hex, customThreshold = 200) => {
  /*
  * Метод проверяет контрастность цвета
  * Пример, если передать #000000 (черный цвет фона), вернет false нужен светлый цвет текста (#ffffff)
  * getColorContrast(#ffffff) ? 'text-black' : 'text-white'
  * */

  /*
  *  From this W3C document: http://www.webmasterworld.com/r.cgi?f=88&d=9769&url=http://www.w3.org/TR/AERT#color-contrast
  *  Color brightness is determined by the following formula:
  *  ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000
  * */

  const threshold = customThreshold // Максимальное значение 256 (чем выше значение тем более светлый цвет, может быть на переданом hex)

  let hRed = hexToR(hex)
  let hGreen = hexToG(hex)
  let hBlue = hexToB(hex)

  function hexToR (h) { return parseInt((cutHex(h)).substring(0, 2), 16) }
  function hexToG (h) { return parseInt((cutHex(h)).substring(2, 4), 16) }
  function hexToB (h) { return parseInt((cutHex(h)).substring(4, 6), 16) }
  function cutHex (h) { return (h.charAt(0) === '#') ? h.substring(1, 7) : h }

  let cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000

  return cBrightness > threshold
}
