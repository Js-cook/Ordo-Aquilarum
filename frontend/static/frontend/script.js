var user = document.getElementById("user").innerHTML
var incorrectBanner = document.getElementById("incorrect-banner")
var correctBanner = document.getElementById("correct-banner")
var submitBtn = document.getElementById("submit-btn")

var startHolder = document.getElementById("time-start")
var correctHolder = document.getElementById("num-correct")
var incorrectHolder = document.getElementById("num-incorrect")
var dateHolder = document.getElementById("date")
var correct = 0
var incorrect = 0
var today = new Date()
var adj_container = document.getElementById("adj-answer")
var caseHeader = document.getElementById("case-num")
var adjHeader = document.getElementById("adj")
var formWrapper = document.getElementById("form-wrapper")
var adjFormWrapper = document.getElementById("second-form-wrapper")
var pointsMultiplier = document.getElementById("point-mult").innerHTML
var pointsInsurance = document.getElementById("point-insur").innerHTML
var qId = null

function retrieveQuestion(){
  var qType = Math.floor(Math.random() * 2)
  correctHolder.innerHTML = correct
  incorrectHolder.innerHTML = incorrect
  startHolder.innerHTML = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  dateHolder.innerHTML = today.getDate()
  submitBtn.disabled = false
  correctBanner.className="position-absolute bottom-0 start-50 translate-middle-x alert alert-success d-none"
  incorrectBanner.className="position-absolute bottom-0 start-50 translate-middle-x alert alert-danger d-none"
  var declension = document.getElementById("selected-declension").innerHTML
  if (declension) {
    if (qType == 0){
      var header = document.getElementById("question")
      header.innerHTML = `<div class="spinner-border text-secondary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`
      var case_container = document.getElementById("case-answers")
      var number_container = document.getElementById("number-answers")
      case_container.innerHTML = ""
      number_container.innerHTML = ""
      adj_container.innerHTML = ""
      var url = `https://ordo-aquilarum.p3rplexed.repl.co/api/retrieve-question/${declension}/`
      fetch(url)
      .then((resp) => resp.json())
      .then(function(data){
        caseHeader.className = "text-center mt-4"
        adj.className = "text-center mt-4 d-none"
        formWrapper.className = ""
        adjFormWrapper.className = "d-none"
        var list = data
        for (var i=0; i<list.length; i++){
          case_container.innerHTML += list[i].case
          number_container.innerHTML += list[i].number
        }
        header.innerHTML = list[0].term
        qId = list[0].id
      })
    }
    else if(qType == 1){
      console.log("selected")
      var header = document.getElementById("adj-question")
      header.innerHTML = `<div class="spinner-border text-secondary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`
      var btn1 = document.getElementById("option1")
      var btn2 = document.getElementById("option2")
      var btn3 = document.getElementById("option3")
      var url = `https://ordo-aquilarum.p3rplexed.repl.co/api/retrieve-others/${declension}/`
      fetch(url)
      .then((resp) => resp.json())
      .then(function(data){
        console.log("api responded")
        adj.className = "text-center mt-4"
        caseHeader.className = "text-center mt-4 d-none"
        formWrapper.className = "d-none"
        adjFormWrapper.className = "d-flex justify-content-center me-4"
        var btn = Math.floor(Math.random() * 3)
        var resp_selec = data[0]
        qId = data[0].id
        var splitTerm = resp_selec.term.split(" ")

        var secondSplit = data[1].term.split(" ")
        var thirdSplit = data[2].term.split(" ")
        
        header.innerHTML = splitTerm[0]
        adj_container.innerHTML = splitTerm[1]
        // var splitTerm = data.term.split(" ")
        if (btn == 0){
          btn1.value = splitTerm[1]
          btn2.value = secondSplit[1]
          btn3.value = thirdSplit[1]
        }
        else if (btn == 1){
          btn2.value = splitTerm[1]
          btn1.value = secondSplit[1]
          btn3.value = thirdSplit[1]
        }
        else {
          btn3.value = splitTerm[1]
          btn1.value = secondSplit[1]
          btn2.value = thirdSplit[1]
        }
      })
    }
  }
}

// Possibly revert changes later idk
function changeStats(result){
  if (result == "correct"){
    correct += 1
    var added = 5 * pointsMultiplier
    var url = `https://ordo-aquilarum.p3rplexed.repl.co/api/add-correct/${user}/`
    fetch(url)
    var secondUrl = `https://ordo-aquilarum.p3rplexed.repl.co/api/change-points/${user}/${added}/`
    fetch(secondUrl)
    // retrieveQuestion()
  }
  else {
    incorrect += 1
    var subtracted = Math.ceil(15 / pointsInsurance)
    var url = `https://ordo-aquilarum.p3rplexed.repl.co/api/add-incorrect/${user}/`
    fetch(url)
    var secondUrl = `https://ordo-aquilarum.p3rplexed.repl.co/api/subtract-points/${user}/${subtracted}/`
    fetch(secondUrl)
    console.log(qId)
    var thirdUrl = `https://ordo-aquilarum.p3rplexed.repl.co/api/add-ques-incorrect/${qId}/`
    fetch(thirdUrl)
    // retrieveQuestion()
  }
}

function checkAnswer(caseAns, numAns){
  var ansCorrect = false
  var caseContainer = document.getElementById("case-answers").innerHTML
  var possibleCase = caseContainer.split(" ")
  var numberContainer = document.getElementById("number-answers").innerHTML
  var possibleNumber = numberContainer.split(" ")
  for (var i=0; i<possibleCase.length; i++){
    if (possibleCase[i] == caseAns && possibleNumber[i] == numAns){
      ansCorrect = true
    }
  }
  if (ansCorrect == true){
    // var incorrectBanner = document.getElementById("incorrect-banner")
    correctBanner.className="position-absolute bottom-0 start-50 translate-middle-x alert alert-success"
    submitBtn.disabled = true
    changeStats("correct")
  }
  else{
    // var correctBanner = document.getElementById("correct-banner")
    incorrectBanner.className="position-absolute bottom-0 start-50 translate-middle-x alert alert-danger"
    submitBtn.disabled = true
    changeStats("incorrect")
  }
}

// var formWrapper = document.getElementById("form-wrapper")
formWrapper.addEventListener("submit", function(e){
  e.preventDefault()
  var caseAnswer = document.querySelector("[name='case']:checked").value
  var numberAnswer = document.querySelector("[name='number']:checked").value
  checkAnswer(caseAnswer, numberAnswer)
})

function checkAdjAnswer(answer){
  if (answer == adj_container.innerHTML){
    correctBanner.className="position-absolute bottom-0 start-50 translate-middle-x alert alert-success"
    changeStats("correct")
  }
  else {
    incorrectBanner.className="position-absolute bottom-0 start-50 translate-middle-x alert alert-danger"
    changeStats("incorrect")
  }
}

// var adjFormWrapper = document.getElementById("second-form-wrapper")
adjFormWrapper.addEventListener("click", function(e){
  e.preventDefault()
  var answer = e.target.value
  checkAdjAnswer(answer)
})


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

function collectStats(){
  var newDate = new Date()
  var endTime = newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
  var avg = correct/(correct+incorrect)
  var url = `https://ordo-aquilarum.p3rplexed.repl.co/api/add-session/`
  fetch(url,{
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({
      "username": user,
      "time_start": startHolder.innerHTML,
      "time_end": endTime,
      "correct": correct,
      "incorrect": incorrect,
      "average": avg
    })
  })
  // "date": dateHolder.innerHTML,
  // Update when hosted
  window.location.href = "https://ordo-aquilarum.p3rplexed.repl.co/"
}