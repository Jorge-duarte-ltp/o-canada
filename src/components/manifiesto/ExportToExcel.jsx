import XLSX from 'xlsx';

function exportToExcel(tableId, fileName) {
  // Obtiene la tabla HTML que se va a exportar
  const table = document.getElementById(tableId);

  // Convierte la tabla en una hoja de cálculo de Excel
  const workbook = XLSX.utils.table_to_book(table);

  // Descarga la hoja de cálculo como archivo de Excel
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}