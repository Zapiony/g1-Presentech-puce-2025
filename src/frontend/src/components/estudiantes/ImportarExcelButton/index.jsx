import { useRef, useState } from 'react'
import { Button, Modal } from '../../common'
import { importarEstudiantes } from '../../../services/estudiantesService'
import { getApiErrorMessage } from '../../../services/api'
import { parseEstudiantesExcel } from '../../../utils/excelUtils'

export function ImportarExcelButton({ children = 'Importar Excel', idParalelo, onImportSuccess }) {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState([])
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const openFilePicker = () => {
    setError('')
    inputRef.current?.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    try {
      const estudiantes = await parseEstudiantesExcel(file)

      if (!estudiantes.length) {
        setError('El archivo no contiene columnas nombres y apellidos válidas.')
        return
      }

      setPreview(estudiantes)
      setIsModalOpen(true)
    } catch {
      setError('No se pudo leer el archivo Excel seleccionado.')
    }
  }

  const confirmImport = async () => {
    setIsLoading(true)
    setError('')

    try {
      await importarEstudiantes(idParalelo, { estudiantes: preview })
      setIsModalOpen(false)
      onImportSuccess?.()
    } catch (requestError) {
      setError(getApiErrorMessage(requestError))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <input
        accept=".xlsx,.xls"
        className="hidden"
        onChange={handleFileChange}
        ref={inputRef}
        type="file"
      />
      <Button className="w-full min-h-9 text-sm" variant="secondary" onClick={openFilePicker}>
        {children}
      </Button>
      {error ? <p className="text-sm text-[#b42318]">{error}</p> : null}
      <Modal
        confirmLabel="Importar"
        isOpen={isModalOpen}
        isSubmitting={isLoading}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmImport}
        title="Importar estudiantes"
      >
        <p>
          Se importarán {preview.length} estudiantes en el paralelo {idParalelo}.
        </p>
        <ul className="mt-3 max-h-40 overflow-auto rounded-md border border-[#d9e2ef]">
          {preview.slice(0, 6).map((student, index) => (
            <li
              className="border-b border-[#eef2f7] px-3 py-2 last:border-b-0"
              key={`${student.nombres}-${student.apellidos}-${index}`}
            >
              {student.apellidos}, {student.nombres}
            </li>
          ))}
        </ul>
      </Modal>
    </>
  )
}
