const {ipcRenderer} = require('electron')
const Utils = require('./utils/utils')

document.addEventListener('dragover', event => event.preventDefault())
document.addEventListener('drop', event => event.preventDefault())

document.getElementById('close').addEventListener('click', function (e) {
  ipcRenderer.send('finish-microbreak', false)
})

ipcRenderer.on('microbreakIdea', (event, message, strictMode) => {
  if (!strictMode) {
    document.getElementById('close').style.visibility = 'visible'
  }
  let microbreakIdea = document.getElementsByClassName('microbreak-idea')[0]
  microbreakIdea.innerHTML = message
})

ipcRenderer.on('progress', (event, started, duration) => {
  let progress = document.getElementById('progress')
  let progressTime = document.getElementById('progress-time')
  window.setInterval(Utils.updateProgress.bind(null, started, duration, progress, progressTime), 10)
})

ipcRenderer.on('danger', (event, danger) => {
  if (danger > 0) {
    let dangerA = document.getElementById('danger-a')
    let dangerB = document.getElementById('danger-b')
    let dangerC = document.getElementById('danger-c')
    dangerA.style.boxShadow = `0px 0px 500px 100px rgba(255,0,0,${0.1 * danger})`
    dangerB.style.boxShadow = `0px 0px 1500px 50px rgba(255,0,0,${0.1 * danger})`
    dangerC.style.boxShadow = `0px 0px 1000px 100px rgba(255,0,0,${0.1 * danger})`
  }
})
