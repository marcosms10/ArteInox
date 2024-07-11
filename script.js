let count = 1
document.getElementById("radio1").checked = true

setInterval(function() {
    nextImage()
}, 4000)

function nextImage(){
    count ++
    if(count > 4) {
        count = 1
    }

    document.getElementById("radio" + count).checked = true

}

/*========== SCROLL UP ========== */

const scrollUp = () =>{
    const scrollUp = document.getElementById( "scroll-up" );
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                : scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp)

const headerButtons = document.querySelectorAll('.header .nav ul a') 

headerButtons.forEach(headerButton => {
    headerButton.addEventListener("click", () => {
        document.querySelector("#check").checked = false
    })
})



