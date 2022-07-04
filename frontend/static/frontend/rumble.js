const loggedUser = document.getElementById("logged-user").innerHTML
const teamList = document.getElementById("player-list")
const blueTeamBtn = document.getElementById("blue-team-btn")
const redTeamBtn = document.getElementById("red-team-btn")
const modalBody = document.getElementById("modal-body")
const loggedTeam = document.getElementById("logged-team")
const closeBtn = document.getElementById("close-btn")
const altBody = document.getElementById("secondary-body")
const incorrectBanner = document.getElementById("incorrect-banner")
const correctBanner = document.getElementById("correct-banner")
const submitBtn = document.getElementById("submit-btn")
let startTime = null

window.onload = function(){
  if (sessionStorage.getItem("firstExecute") === null){
    console.log("yes")
    document.getElementById("start-modal").click()
    let url = `https://ordo-aquilarum.p3rplexed.repl.co/api/update-competing/${loggedUser}/true/`
    fetch(url)
    sessionStorage.setItem("firstExecute", false)
  }
  else {
    console.log("no")
  }
}

function joinTeam(team){
  if (team == "blue"){
    loggedTeam.innerHTML = "blue"
   teamList.innerHTML += `
    <li class="list-group-item list-group-item-primary">${loggedUser}</li>  
    `
    blueTeamBtn.innerHTML = "Selected Team"
    redTeamBtn.innerHTML = "Selected Opposition"
    blueTeamBtn.disabled = true
    redTeamBtn.disabled = true
    let url = `https://ordo-aquilarum.p3rplexed.repl.co/api/change-team/${loggedUser}/blue/`
  }
  else {
    loggedTeam.innerHTML = "red"
    teamList.innerHTML += `
    <li class="list-group-item list-group-item-danger">${loggedUser}</li>
    `
    blueTeamBtn.innerHTML = "Selected Opposition"
    redTeamBtn.innerHTML = "Selected Team"
    blueTeamBtn.disabled = true
    redTeamBtn.disabled = true
    let url = `https://ordo-aquilarum.p3rplexed.repl.co/api/change-team/${loggedUser}/red/`
  }
  fetch(url)
}

function startMatch(){
  startTime = new Date().getTime()
  if (loggedTeam.innerHTML == "blue"){
    closeBtn.click()
    retrieveQuestion()
  }
  else {
    modalBody.className = "modal-body d-none"
    altBody.className = "modal-body"
  }
}

let switchTime = startTime + 300000
let endTime = switchTime + 300000

function getTime(){
  let ct = new Date().getTime()
  if (ct >= switchTime){
    let switchTime = 99999999999999999999
    switchSides()
  }
  if (ct >= endTime){
    let endTime = 99999999999999999999
    // Call function to end match
  }
}

function switchSides(){
  if (loggedTeam.innerHTML == "blue"){
    document.getElementById("start-modal").click()
  }
  else {
    closeBtn.click()
  }
}

function retrieveQuestion(){
  let url = `https://ordo-aquilarum.p3rplexed.repl.co/api/retrieve-question/all/`
  const questionPlaceholder = document.getElementById("question")
  questionPlaceholder.innerHTML = `<div class="spinner-border text-secondary" role="status"></div>`
  const caseAnswers = document.getElementById("case-answers")
  const numAnswers = document.getElementById("number-answers")
  correctBanner.className="position-absolute bottom-0 start-50 translate-middle-x alert alert-success d-none"
  incorrectBanner.className="position-absolute bottom-0 start-50 translate-middle-x alert alert-danger d-none"
  caseAnswers.innerHTML = ""
  numAnswers.innerHTML = ""
  submitBtn.disabled = false
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data){
    questionPlaceholder.innerHTML = data[0].term
    for (var i=0; i<data.length; i++){
      caseAnswers.innerHTML += data[i].case
      numAnswers.innerHTML += data[i].number
    }
  })
}

const formWrapper = document.getElementById("form-wrapper")
formWrapper.addEventListener("submit", function(e){
  e.preventDefault()
  let caseAnswer = document.querySelector("[name='case']:checked").value
  let numberAnswer = document.querySelector("[name='number']:checked").value
  checkAnswer(caseAnswer, numberAnswer)
})

function checkAnswer(caseAns, numAns){
  let ansCorrect = false
  const caseContainer = document.getElementById("case-answers").innerHTML
  const possibleCase = caseContainer.split(" ")
  const numberContainer = document.getElementById("number-answers").innerHTML
  const possibleNumber = numberContainer.split(" ")
  for (var i=0; i<possibleCase.length; i++){
    if (possibleCase[i] == caseAns && possibleNumber[i] == numAns){
      ansCorrect = true
    }
  }
  if (ansCorrect == true){
    correctBanner.className="position-absolute bottom-0 start-50 translate-middle-x alert alert-success"
    submitBtn.disabled = true
    changeStats("correct")
  }
  else{
    incorrectBanner.className="position-absolute bottom-0 start-50 translate-middle-x alert alert-danger"
    submitBtn.disabled = true
    changeStats("incorrect")
  }
}

function changeStats(result){
  if (result == "correct"){
    let url = `https://ordo-aquilarum.p3rplexed.repl.co/api/add-comp-points/${loggedUser}/${20}/`
    fetch(url)
  }
  else {
    let url = `https://ordo-aquilarum.p3rplexed.repl.co/api/subtract-comp-points/${loggedUser}/${Math.ceil(40)}/`
    fetch(url)
  }
}