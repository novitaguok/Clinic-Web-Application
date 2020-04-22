$('#username').text('Hi, '+ localStorage.getItem('name'))

document.getElementById("logout").addEventListener("click", async () => {
  localStorage.removeItem('Token')
  localStorage.removeItem('name')

  window.location.href = "/";
})

document.getElementById("profil").addEventListener("click", async () => {

  window.location.href = "/profil";
})