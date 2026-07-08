export function escapeCSVField(value) {
    const needsQuoting = /[",\n\r]/.test(value);
    if (needsQuoting) {
        const escaped = value.replace(/"/g, '""');
        return `"${escaped}"`;
    }
    return value;
}
export function serializeTableToCSV(table) {
    const rows = Array.from(table.querySelectorAll('tr'));
    const lines = [];
    for (const row of rows) {
        const cells = Array.from(row.querySelectorAll('th, td'));
        const line = cells
            .map(cell => {
            if (cell.classList.contains('dacdb-export-btn')) {
                return null;
            }
            return escapeCSVField(cell.textContent?.trim() || '');
        })
            .filter(cell => cell !== null)
            .join(',');
        lines.push(line);
    }
    return lines.join('\n');
}
export function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}
export function generateFilename(tableIndex) {
    const pageTitle = document.title.replace(/[^a-z0-9]/gi, '_').slice(0, 30);
    const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, '-')
        .slice(0, 19);
    return `${pageTitle}_${tableIndex}_${timestamp}.csv`;
}
