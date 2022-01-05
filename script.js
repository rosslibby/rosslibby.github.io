const htmlSection = document.getElementById('html')
const markupWhat = document.getElementById('markup-what')
const wtfBro = document.getElementById('wtf-bro')

htmlSection.addEventListener('click', e => {
  htmlSection.classList.toggle('active')
  document.getElementById('html-description').classList.toggle('visible')
})