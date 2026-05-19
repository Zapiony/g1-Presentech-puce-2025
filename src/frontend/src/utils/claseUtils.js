const dayOrderByJsDay = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
}

export function formatTime(value) {
  if (!value) return ''
  return value.toString().slice(0, 5)
}

export function formatHorario(horario) {
  return `${horario.nombre_dia} ${formatTime(horario.hora_inicio)}-${formatTime(
    horario.hora_fin,
  )}`
}

export function getProximaClase(horarios = []) {
  if (!horarios.length) return null

  const now = new Date()
  const todayOrder = dayOrderByJsDay[now.getDay()] ?? 8
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  const sorted = [...horarios].sort((a, b) => {
    if (a.orden_dia !== b.orden_dia) return a.orden_dia - b.orden_dia
    return formatTime(a.hora_inicio).localeCompare(formatTime(b.hora_inicio))
  })

  const upcoming = sorted.find((horario) => {
    if (horario.orden_dia > todayOrder) return true
    if (horario.orden_dia < todayOrder) return false

    const [hours, minutes] = formatTime(horario.hora_inicio)
      .split(':')
      .map(Number)

    return hours * 60 + minutes >= currentMinutes
  })

  return upcoming ?? sorted[0]
}
