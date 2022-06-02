var user = document.getElementById("user").innerHTML

function retrieveQuestion(){
  var declension = document.getElementById("selected-declension").innerHTML
  if (declension) {
    var header = document.getElementById("question")
    var case_container = document.getElementById("case")
    var number_container = document.getElementById("number")
    var url = `https://ordo-aquilarum.p3rplexed.repl.co/api/retrieve-question/${declension}/`
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
      header.innerHTML = data.term
      case_container.innerHTML = data.case
      number_container.innerHTML = data.number
    })
  }
}

var formWrapper = document.getElementById("form-wrapper")
formWrapper.addEventListener("submit", function(e){
  e.preventDefault()
  var caseAnswer = document.querySelector("[name='case']:checked").value
  var numberAnswer = document.querySelector("[name='number']:checked").value
  console.log(caseAnswer)
  console.log(numberAnswer)
})