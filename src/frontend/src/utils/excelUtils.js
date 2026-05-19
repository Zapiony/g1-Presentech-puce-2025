import * as XLSX from 'xlsx'

function normalizeHeader(value) {
  return value
    ?.toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function pickValue(row, names) {
  const entry = Object.entries(row).find(([key]) =>
    names.includes(normalizeHeader(key)),
  )

  return entry?.[1]?.toString().trim() ?? ''
}

export async function parseEstudiantesExcel(file) {
  const buffer = await file.arrayBuffer()
  const workbook = XLSX.read(buffer, { type: 'array' })
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' })

  return rows
    .map((row) => ({
      nombres: pickValue(row, ['nombres', 'nombre']),
      apellidos: pickValue(row, ['apellidos', 'apellido']),
    }))
    .filter((student) => student.nombres && student.apellidos)
}
