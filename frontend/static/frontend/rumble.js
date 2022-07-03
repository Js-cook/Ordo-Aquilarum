const loggedUser = document.getElementById("logged-user").innerHTML
const teamList = document.getElementById("player-list")
const blueTeamBtn = document.getElementById("blue-team-btn")
const redTeamBtn = document.getElementById("red-team-btn")

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
    blueTeamBtn.disabled = true
    redTeamBtn.disabled = true
    let url = `https://ordo-aquilarum.p3rplexed.repl.co/api/change-team/${loggedUser}/blue/`
  }
  else {
    teamList.innerHTML += `
    <li class="list-group-item list-group-item-danger">${loggedUser}</li>
    `
    blueTeamBtn.disabled = true
    redTeamBtn.disabled = true
    let url = `https://ordo-aquilarum.p3rplexed.repl.co/api/change-team/${loggedUser}/red/`
  }
  fetch(url)
}