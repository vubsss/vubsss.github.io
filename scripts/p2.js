function getTimestamp() {
    return new Date().toISOString();
}

function getObjectType(el) {
    if (el.tagName === 'IMG') return 'image';
    if (el.tagName === 'BUTTON') return 'button';
    if (el.tagName === 'A') return 'link';
    if (el.tagName === 'SELECT') return 'dropdown';
    if (el.tagName === 'P' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'H4') return 'text';
    if (el.closest('.popup-container')) return 'popup';
    return el.tagName.toLowerCase();
}

document.addEventListener('click', function(event) {
    const target = event.target;
    const objectType = getObjectType(target);
    console.log(`${getTimestamp()} , click , ${objectType}`);
});

window.addEventListener('DOMContentLoaded', function () {
    console.log(`${getTimestamp()} , view , page`);
});

