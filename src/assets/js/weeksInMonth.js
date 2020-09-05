function weeksInMonth (month, year) {
  // Считаем количество недель и определяем число первого дня и последнего дня недели
  // Образцовая функция
  const weeks = []
  const firstDate = new Date(year, month, 1)
  const lastDate = new Date(year, month + 1, 0)
  const numDays = lastDate.getDate()

  let start = 1
  // день недели начинается с понедельника через переменную end
  let end = firstDate.getDay() === 0 ? 1 : 7 - firstDate.getDay() + 1

  while (start <= numDays) {
    weeks.push({ start, end })

    start = end + 1
    end += 7
    end = start === 1 && end === 8 ? 1 : end

    if (end > numDays) end = numDays
  }
  return weeks
}

export default weeksInMonth()
