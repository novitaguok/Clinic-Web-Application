document.getElementById("btnRegis").addEventListener("click", async () => {
  window.location.href = "/regisDokter";
})
document.getElementById("btnRegis2").addEventListener("click", async () => {
  window.location.href = "/regisDokter";
})

localStorage.setItem('BASE_URL', window.location.origin + '/api')
localStorage.setItem('pasien',false)

document.getElementById("btnLogin").addEventListener("click", async () => {
  const myData = {}
  myData['email'] = $('#email').val()
  myData['password'] = $('#password').val()
  $.ajax({
    type: "POST",
    url: localStorage.getItem('BASE_URL')+'/dokter/login',
    data: JSON.stringify(myData),
    contentType: "application/json",
    dataType: "json",
  }).done(function(response) {
    if(response.success){
      localStorage.setItem('Token', response.token)
      localStorage.setItem('name', response.data.nama)
      alert("Login "+ response.message) 
      window.location.href = "/homeDokter";
    }else{
      alert(response.message) 
    }
    
  }).fail(function(response) {
    alert('Error: ' + response.message)
  })            
})