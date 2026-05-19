import { api } from './api'

export async function importarEstudiantes(idParalelo, payload) {
  const response = await api.post(`/estudiantes/importar/${idParalelo}`, payload)
  return response.data
}
