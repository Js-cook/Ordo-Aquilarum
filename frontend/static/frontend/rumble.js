const loggedUser = document.getElementById("logged-user").innerHTML
const teamList = document.getElementById("player-list")

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
   teamList.innerHTML += `
    <li class="list-group-item list-group-item-primary">${loggedUser}</li>  
    ` 
  }
  else {
    teamList.innerHTML += `
    <li class="list-group-item list-group-item-danger">${loggedUser}</li>
    `
  }
}