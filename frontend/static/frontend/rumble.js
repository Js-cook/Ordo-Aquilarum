window.onload = function(){
  if (sessionStorage.getItem("firstExecute") === null){
    console.log("yes")
    document.getElementById("start-modal").click()

    sessionStorage.setItem("firstExecute", false)
  }
  else {
    console.log("no")
  }
}