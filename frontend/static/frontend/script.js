var user = document.getElementById("user").innerHTML

function retrieveQuestion(){
  var declension = document.getElementById("selected-declension").innerHTML
  var header = document.getElementById("question")
  var url = `https://ordo-aquilarum.p3rplexed.repl.co/api/retrieve-question/${declension}/`
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data){
    header.innerHTML = data.term
  })
}