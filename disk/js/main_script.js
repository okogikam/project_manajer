async function loadPage(btnKlick,page) {
    const content = document.getElementById('content');
    let btnMenu = document.querySelectorAll('.menu button');
    btnMenu.forEach(btn => btn.classList.remove('active'));
    btnKlick.classList.add('active');
    content.style.opacity = 0;

    setTimeout(async () => {
        const response = await fetch(`./pages/${page}/index.html`);
        const html = await response.text();

        content.innerHTML = html;
        content.style.opacity = 1;
    }, 200);
}

window.onload = () => {
    loadPage(document.querySelectorAll('.menu button')[0], 'dashboard');
}
