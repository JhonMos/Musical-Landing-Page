/*===== MENU SHOW =====*/ 
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLink = document.querySelectorAll('.nav__link')
const urlApi = 'https://api.giphy.com/v1/gifs/search?api_key=eoycvRumE85sXI1MYmPthZdmkcHJymgu&q=guitar-bass&limit=3&offset=0&rating=g&lang=en';
const gif = document.querySelector('.gif');

/*===== SHOW MENU MOBILE =====*/
navToggle.addEventListener('click',()=>{
    navMenu.classList.toggle('show');
})
 
/*===== REMOVE MENU MOBILE =====*/ 
function removeMenu(){
    navMenu.classList.remove('show');
}
navLink.forEach(element => element.addEventListener('click',removeMenu));

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 100){
        header.classList.add('scroll-header'); 
    }else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader)

/*=============== INSTRUMENT ===============*/
let audioContext = new AudioContext()//esto es un objeto
let oscillator = audioContext.createOscillator();

function jsNota(frecuencia) {
   let oscillator = audioContext.createOscillator();
   let gainNode=audioContext.createGain()//para darle tiempo a la nota
   oscillator.connect(gainNode)
   oscillator.type="sine";
   oscillator.frequency.value=frecuencia//frecuencia del sonido
   gainNode.connect(audioContext.destination)//conectado el gain con el destino del contxto
   oscillator.start(0)
   gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5)//funcion para darle un tiempo
}
    
/*=============== API GIPHY ===============*/

function giphy(){
    fetch(urlApi)
    .then(response => response.json())
    .then(resultJson => viewDom(resultJson.data))
    .catch(error => console.log(error))
}
function viewDom(gifData){
    let gifDom = '';
    gifData.forEach(dataAll => {
        const imageUrl = dataAll.images.fixed_width_small.url;
        gifDom += `
            <img src='${imageUrl}'>
        `
    })
    gif.innerHTML= gifDom;
}

giphy();