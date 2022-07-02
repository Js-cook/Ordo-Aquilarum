window.onload = function(){
  if (window.sessionStorage("firstExecute") === null){
    console.log("yes")
    document.getElementById("start-modal").click()

    window.sessionStorage("firstExecute", false)
  }
  else {
    console.log("no")
  }
}