import { api } from './api'

export async function obtenerMisClases() {
  const response = await api.get('/clases/mis-clases')
  return response.data
}

export async function obtenerHorarioClase(idClase) {
  const response = await api.get(`/clases/${idClase}/horario`)
  return response.data
}

export async function obtenerEstudiantesClase(idClase) {
  const response = await api.get(`/clases/${idClase}/estudiantes`)
  return response.data
}
