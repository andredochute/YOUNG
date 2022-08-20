const botao = document.getElementById('navegar');
const fechar = document.getElementById('navegar2');

function Aparecer(){
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
    
}

function FecharMenu(){
    const lista = document.getElementById('lista');

    if (lista.style.display = "block"){
        lista.style.display = "none"
        navegar2.style.display = "none"
        
    } 
}

fechar.addEventListener('click', FecharMenu);
botao.addEventListener('click', Aparecer);