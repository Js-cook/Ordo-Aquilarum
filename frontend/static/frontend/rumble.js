window.onload = function(){
  if (window.sessionStorage("firstExecute") === null){
    document.getElementById("start-modal").click()

    window.sessionStorage("firstExecute", false)
  }
}