var user = document.getElementById("user").innerHTML
var incorrectBanner = document.getElementById("incorrect-banner")
var correctBanner = document.getElementById("correct-banner")
var submitBtn = document.getElementById("submit-btn")

var startHolder = document.getElementById("time-start")
var correctHolder = document.getElementById("num-correct")
var incorrectHolder = document.getElementById("num-incorrect")
var dateHolder = document.getElementById("date").innerHTML
var correct = 0
var incorrect = 0
var today = new Date()

function retrieveQuestion(){
  correctHolder.innerHTML = correct
  incorrectHolder.innerHTML = incorrect
  startHolder.innerHTML = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  dateHolder = today.getDate()
  submitBtn.disabled = false
  correctBanner.className="position-absolute bottom-0 start-50 translate-middle-x alert alert-success d-none"
  incorrectBanner.className="position-absolute bottom-0 start-50 translate-middle-x alert alert-danger d-none"
  var declension = document.getElementById("selected-declension").innerHTML
  if (declension) {
    var header = document.getElementById("question")
    var case_container = document.getElementById("case-answers")
    var number_container = document.getElementById("number-answers")
    case_container.innerHTML = ""
    number_container.innerHTML = ""
    var url = `https://ordo-aquilarum.p3rplexed.repl.co/api/retrieve-question/${declension}/`
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
      var list = data
      for (var i=0; i<list.length; i++){
        case_container.innerHTML += list[i].case
        number_container.innerHTML += list[i].number
      }
      header.innerHTML = list[0].term
    })
  }
}

// Possibly revert changes later idk
function changeStats(result){
  if (result == "correct"){
    correct += 1
    var url = `https://ordo-aquilarum.p3rplexed.repl.co/api/add-correct/${user}/`
    fetch(url)
    // retrieveQuestion()
  }
  else {
    incorrect += 1
    var url = `https://ordo-aquilarum.p3rplexed.repl.co/api/add-incorrect/${user}/`
    fetch(url)
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

var formWrapper = document.getElementById("form-wrapper")
formWrapper.addEventListener("submit", function(e){
  e.preventDefault()
  var caseAnswer = document.querySelector("[name='case']:checked").value
  var numberAnswer = document.querySelector("[name='number']:checked").value
  checkAnswer(caseAnswer, numberAnswer)
})

// function findUser(username){
//   var usernamePlaceholder = document.getElementById("user-placeholder")
//   var correctPlaceholder = document.getElementById("correct-placeholder")
//   var incorrectPlaceholder = document.getElementById("incorrect-placeholder")
//   var pointsPlaceholder = document.getElementById("points-placeholder")
//   var rolePlaceholder = document.getElementById("role-placeholder")
//   usernamePlaceholder.innerHTML = ""
//   correctPlaceholder.innerHTML = ""
//   incorrectPlaceholder.innerHTML = ""
//   pointsPlaceholder.innerHTML = ""
//   rolePlaceholder.innerHTML = ""
//   url = `https://ordo-aquilarum.p3rplexed.repl.co/api/retrieve-stats/${username}/`
//   fetch(url)
//   .then((resp) => resp.json())
//   .then(function(data){
//     usernamePlaceholder.innerHTML = data.username
//     correctPlaceholder.innerHTML = data.correct
//     incorrectPlaceholder.innerHTML = data.incorrect
//     pointsPlaceholder.innerHTML = data.points
//     rolePlaceholder.innerHTML = data.role
//   })
// }

// var userSearch = document.getElementById("search-form")
// userSearch.addEventListener("submit", function(f){
//   f.preventDefault()
//   console.log("form submitted")
//   var username = document.getElementById("username")
//   findUser(username)
// })
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
  var endTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
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
      "date": dateHolder,
      "time_start": startHolder,
      "time_end": endTime,
      "correct": correct,
      "incorrect": incorrect,
      "average": avg
    })
  })

  
}