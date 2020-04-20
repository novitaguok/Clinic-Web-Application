document.getElementById("btnRegis").addEventListener("click", async () => {
  window.location.href = "/regisPasien";
})
document.getElementById("btnRegis2").addEventListener("click", async () => {
  window.location.href = "/regisPasien";
})

localStorage.setItem('BASE_URL', 'http://localhost:3000/api')
document.getElementById("btnLogin").addEventListener("click", async () => {
  const myData = {}
  myData['email'] = $('#email').val()
  myData['password'] = $('#password').val()
  $.ajax({
    type: "POST",
    url: localStorage.getItem('BASE_URL')+'/pasien/login',
    data: JSON.stringify(myData),
    contentType: "application/json",
    dataType: "json",
  }).done(function(response) {
    if(response.success){
      localStorage.setItem('Token', response.token)
      localStorage.setItem('name', response.data.nama)
      
      alert("Login "+ response.message) 
      window.location.href = "/home";
    }else{
      alert(response.message) 
    }
    
  }).fail(function(response) {
    alert('Error: ' + response.sqlMessage)
  })            
  // window.location.href = "/login";
})


