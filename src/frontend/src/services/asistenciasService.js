import { api } from './api'

export async function obtenerRegistroAsistencia(idHorario, fecha) {
  const response = await api.get(`/asistencias/${idHorario}/${fecha}`)
  return response.data
}

export async function registrarAsistencia(payload) {
  const response = await api.post('/asistencias', payload)
  return response.data
}

export async function actualizarAsistencia(idRegistro, payload) {
  const response = await api.put(`/asistencias/${idRegistro}`, payload)
  return response.data
}
