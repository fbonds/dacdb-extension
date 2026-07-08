import { serializeTableToCSV, downloadCSV, generateFilename, } from './csv-serializer';
import { detectTables, CONFIG, } from './table-detector';
let observer = null;
function createExportButton(table, index) {
    const button = document.createElement('button');
    button.className = CONFIG.BUTTON_CLASS;
    button.textContent = '⬇ CSV';
    button.type = 'button';
    button.title = 'Export table to CSV';
    button.addEventListener('click', () => {
        const csvContent = serializeTableToCSV(table);
        const filename = generateFilename(index);
        downloadCSV(csvContent, filename);
    });
    return button;
}
function wrapTable(table) {
    if (table.parentElement?.classList.contains(CONFIG.WRAPPER_CLASS)) {
        return table.parentElement;
    }
    const wrapper = document.createElement('div');
    wrapper.className = CONFIG.WRAPPER_CLASS;
    const parent = table.parentElement;
    if (parent) {
        parent.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    }
    return wrapper;
}
function injectButtonsForTable({ table, index }) {
    if (table.getAttribute(CONFIG.DATA_ATTR)) {
        return;
    }
    table.setAttribute(CONFIG.DATA_ATTR, 'true');
    const wrapper = wrapTable(table);
    const button = createExportButton(table, index);
    wrapper.appendChild(button);
}
function processTables() {
    const qualifiedTables = detectTables();
    qualifiedTables.forEach(injectButtonsForTable);
}
function initObserver() {
    observer = new MutationObserver((mutations) => {
        let needsProcessing = false;
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                needsProcessing = true;
                break;
            }
        }
        if (needsProcessing) {
            processTables();
        }
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}
function init() {
    processTables();
    initObserver();
}
init();
