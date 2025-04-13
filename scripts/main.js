let hz = 1000;

const buttons = document.querySelectorAll('button[data-popup]');
const popups = document.querySelectorAll('.popup-container')
const closebtn = document.querySelectorAll('.close-btn')

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const popupId = button.getAttribute('data-popup');
        const popup = document.getElementById(`${popupId}-popup`);
        if (popup.style.display === 'block') {
            bringToFront(popup);
        }
        else {
            popup.style.display = 'block';
            bringToFront(popup);
        }
    });
});

closebtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const popup = btn.closest('.popup-container');
        popup.style.display = 'none';
    });
});

popups.forEach(popup => {
    makePopupDraggable(popup);
    popup.addEventListener('mousedown', () => {
        bringToFront(popup);
    });
});

function makePopupDraggable(popup) {
    const header = popup.querySelector('.popup-header');
    let offsetX, offsetY, isDragging = false;
    header.addEventListener('mousedown', startDrag);
    function startDrag(e) {
        if (e.target.tagName === 'BUTTON') return;
        isDragging = true;
        offsetX = e.clientX - popup.getBoundingClientRect().left;
        offsetY = e.clientY - popup.getBoundingClientRect().top;
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
        e.preventDefault();
    }

    function drag(e) {
        if (!isDragging) return;

        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;

        const popupWidth = popup.offsetWidth;
        const popupHeight = popup.offsetHeight;
        const maxX = window.innerWidth - popupWidth;
        const maxY = window.innerHeight - popupHeight;

        x = Math.max(0, Math.min(x, maxX));
        y = Math.max(0, Math.min(y, maxY));

        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;
    }

    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
    }
}

function bringToFront(popup) {
    hz++;
    popup.style.zIndex = hz;
}
