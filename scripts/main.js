let hz = 1000;

const buttons = document.querySelectorAll('button[data-popup]');
const popups = document.querySelectorAll('.popup-container');
const closebtn = document.querySelectorAll('.close-btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const popupId = button.getAttribute('data-popup');
        const popup = document.getElementById(`${popupId}-popup`);
        if (popup.style.display === 'block') {
            bringToFront(popup);
        } else {
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
    popup.addEventListener('mousedown', () => bringToFront(popup));
    popup.addEventListener('touchstart', () => bringToFront(popup));
});

function makePopupDraggable(popup) {
    const header = popup.querySelector('.popup-header');
    let offsetX = 0, offsetY = 0, isDragging = false;

    const startDrag = (x, y) => {
        isDragging = true;
        const rect = popup.getBoundingClientRect();
        offsetX = x - rect.left;
        offsetY = y - rect.top;
    };

    const drag = (x, y) => {
        if (!isDragging) return;

        let newX = x - offsetX;
        let newY = y - offsetY;

        const maxX = window.innerWidth - popup.offsetWidth;
        const maxY = window.innerHeight - popup.offsetHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        popup.style.left = `${newX}px`;
        popup.style.top = `${newY}px`;
    };

    const stopDrag = () => {
        isDragging = false;
    };

    // Mouse events
    header.addEventListener('mousedown', e => {
        if (e.target.tagName === 'BUTTON') return;
        startDrag(e.clientX, e.clientY);
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
        e.preventDefault();
    });

    const mouseMove = e => drag(e.clientX, e.clientY);
    const mouseUp = () => {
        stopDrag();
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    };

    // Touch events
    header.addEventListener('touchstart', e => {
        if (e.target.tagName === 'BUTTON') return;
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
        document.addEventListener('touchmove', touchMove);
        document.addEventListener('touchend', touchEnd);
        e.preventDefault();
    });

    const touchMove = e => {
        const touch = e.touches[0];
        drag(touch.clientX, touch.clientY);
    };

    const touchEnd = () => {
        stopDrag();
        document.removeEventListener('touchmove', touchMove);
        document.removeEventListener('touchend', touchEnd);
    };
}

function bringToFront(popup) {
    hz++;
    popup.style.zIndex = hz;
}
