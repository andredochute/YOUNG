const botao = document.getElementById('menu');

function Aparecer(){
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
    
}

botao.addEventListener('click', Aparecer);