// Drive "tilt" left or right depending on what side of the page the mouse is
window.addEventListener('mousemove', e => {
    const mid = window.innerWidth / 2;
    const rotate = (e.clientX < mid ? 0.6 : -0.6);
    document.documentElement.style.setProperty('--tilt', `${rotate}deg`);
});
