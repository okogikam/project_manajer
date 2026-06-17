// import MainScript from "../main_script.js";

async function loadPage(btnKlick, page) {
    const content = document.getElementById("content");
    const btnMenu = document.querySelectorAll(".menu button");
    // const mc = new MainScript();

    btnMenu.forEach(btn => btn.classList.remove("active"));
    btnKlick.classList.add("active");

    content.style.opacity = 0;

    setTimeout(async () => {
        const response = await fetch(`./pages/${page}/index.html`);
        const html = await response.text();

        content.innerHTML = html;
        content.style.opacity = 1;

        await loadScriptOnce(`./disk/js/${page}/${page}.js`);
        if (typeof window[`init${page}`] === "function") {
            window[`init${page}`]();
        }

    }, 200);
}


function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = src;

        script.onload = resolve;
        script.onerror = reject;

        document.body.appendChild(script);
    });
}