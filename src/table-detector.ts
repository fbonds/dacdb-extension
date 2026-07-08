export const CONFIG = {
  MIN_ROWS: 2,
  MIN_COLS: 2,
  DATA_ATTR: 'data-dacdb-exported',
  WRAPPER_CLASS: 'dacdb-export-wrapper',
  BUTTON_CLASS: 'dacdb-export-btn',
};

export interface QualifiedTable {
  table: HTMLTableElement;
  index: number;
}

export function isQualifiedTable(table: HTMLTableElement): boolean {
  const rows = table.querySelectorAll('tr');
  if (rows.length < CONFIG.MIN_ROWS) {
    return false;
  }

  const headerRow = table.querySelector('thead tr') || rows[0];
  if (!headerRow) {
    return false;
  }

  const headerCells = headerRow.querySelectorAll('th');
  if (headerCells.length === 0 && rows[0].querySelectorAll('th').length === 0) {
    return false;
  }

  const colCount = Math.max(
    headerCells.length,
    headerRow.querySelectorAll('td').length
  );
  if (colCount < CONFIG.MIN_COLS) {
    return false;
  }

  return true;
}

export function detectTables(): QualifiedTable[] {
  const tables = Array.from(document.querySelectorAll('table'));
  const qualified: QualifiedTable[] = [];

  tables.forEach((table, idx) => {
    if (isQualifiedTable(table)) {
      qualified.push({ table, index: idx });
    }
  });

  return qualified;
}