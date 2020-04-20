$('#username').text('Hi, '+ localStorage.getItem('name'))

document.getElementById("logout").addEventListener("click", async () => {
  localStorage.removeItem('Token')
  localStorage.removeItem('name')

  window.location.href = "/";
})