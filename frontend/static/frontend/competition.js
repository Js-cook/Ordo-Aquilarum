const loggedUser = document.getElementById("logged-user").innerHTML
const incorrectBanner = document.getElementById("incorrect-banner")
const correctBanner = document.getElementById("correct-banner")
const submitBtn = document.getElementById("submit-btn")
let mult = document.getElementById("mult").innerHTML
let insurance = document.getElementById("insurance").innerHTML
const endTime = document.getElementById("time-end").innerHTML
const curTime = document.getElementById("time-now").innerHTML

function startComp(){
  let secondUrl = `https://ordo-aquilarum.p3rplexed.repl.co/api/reset-comp-points/${loggedUser}/`
  fetch(secondUrl)
  retrieveQuestion()
}

function updateItems(){
  let url = `https://ordo-aquilarum.p3rplexed.repl.co/api/retrieve-stats/${loggedUser}/`
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data){
    mult = data.comp_multiplier
    insurance = data.comp_insurance
    console.log(mult)
  })
}

function addInsurance(amount){
  let url = `https://ordo-aquilarum.p3rplexed.repl.co/api/add-comp-insurance/${loggedUser}/${amount}/`
  fetch(url)
}

function addMultiplier(amount){
  let url = `https://ordo-aquilarum.p3rplexed.repl.co/api/add-comp-multiplier/${loggedUser}/${amount}/`
  fetch(url)
}

function updateLeaderboard(){
  let url = `https://ordo-aquilarum.p3rplexed.repl.co/api/get-comp-users/`
  const container = document.getElementById("table-body")
  const finContainer = document.getElementById("fin-table-body")
  container.innerHTML = ""
  finContainer.innerHTML = ""
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data){
    for (var i=0; i<data.length; i++){
      if (i <= 9 && data[i].comp_points != 0){
        container.innerHTML += `
        <tr>
          <th scope="row">${i+1}</th>
          <td>${data[i].username}</td>
          <td>${data[i].comp_points}</td>
          <td><button class="btn btn-primary">X</button></td>
        </tr>
        `
      }
      else if (data[i].username == loggedUser && data[i].comp_points != 0){
        container.innerHTML += `
        <tr>
          <th scope="row">${i+1}</th>
          <td>${data[i].username}</td>
          <td>${data[i].comp_points}</td>
        </tr>
        ` 
      }

      if (data[i].comp_points != 0){
        finContainer.innerHTML += `
        <tr>
          <th scope="row">${i+1}</th>
          <td>${data[i].username}</td>
          <td>${data[i].comp_points}</td>
        </tr>
        `
      }
    }
  })
}

function retrieveQuestion(){
  updateLeaderboard()
  updateItems()
  let endDateTime = new Date(endTime)
  let currentDateTime = new Date()
  if (currentDateTime >= endDateTime){
    document.getElementById("end-modal").click()
    enableRewards()
  }
  let url = `https://ordo-aquilarum.p3rplexed.repl.co/api/retrieve-question/all/`
  const questionPlaceholder = document.getElementById("question")
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
  let endDateTime = new Date(endTime)
  let currentDateTime = new Date()
  if (currentDateTime >= endDateTime){
    document.getElementById("end-modal").click()
    enableRewards()
  }
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
    // console.log("correct")
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
    let url = `https://ordo-aquilarum.p3rplexed.repl.co/api/add-comp-points/${loggedUser}/${20 * mult}/`
    fetch(url)
  }
  else {
    let url = `https://ordo-aquilarum.p3rplexed.repl.co/api/subtract-comp-points/${loggedUser}/${Math.ceil(40/insurance)}/`
    fetch(url)
  }
  updateLeaderboard()
}

function enableRewards(){
  const firstPrize = document.getElementById("first-prize")
  const secondPrize = document.getElementById("second-prize")
  const thirdPrize = document.getElementById("third-prize")
  let url = `https://ordo-aquilarum.p3rplexed.repl.co/api/get-comp-users/`
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data){
    if (data[0].username == loggedUser){
      firstPrize.className = ""
    }
    else if (data[1].username == loggedUser){
      secondPrize.className = ""
    }
    else if (data[2].username == loggedUser){
      thirdPrize.className = ""
    }
  })
  // let secondUrl = `https://ordo-aquilarum.p3rplexed.repl.co/api/reset-comp-points/${loggedUser}/`
  // fetch(secondUrl)
}

function addPoints(amount, btn){
  const fbtn = document.getElementById(btn)
  fbtn.innerHTML = "Received!"
  fbtn.disabled = true
  let url = `https://ordo-aquilarum.p3rplexed.repl.co/api/change-points/${loggedUser}/${amount}/`
  fetch(url)
}

function addTitle(btn){
  const fbtn = document.getElementById(btn)
  fbtn.innerHTML = "Title Applied!"
  fbtn.disabled = true
  let url = `https://ordo-aquilarum.p3rplexed.repl.co/api/change-role/${loggedUser}/Champion/`
  fetch(url)
}

// updateLeaderboard()