var user = document.getElementById("user").innerHTML

function retrieveQuestion(){
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

function changeStats(result){
  if (result == "correct"){
    var url = `https://ordo-aquilarum.p3rplexed.repl.co/api/add-correct/${user}/`
    fetch(url)
    retrieveQuestion()
  }
  else {
    var url = `https://ordo-aquilarum.p3rplexed.repl.co/api/add-incorrect/${user}/`
    fetch(url)
    retrieveQuestion()
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
    changeStats("correct")
  }
  else{
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
