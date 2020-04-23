$('#username').text('Hi, '+ localStorage.getItem('name'))

$.ajax({
  headers: {
    'Authorization' : 'Bearer ' + localStorage.getItem('Token')
  },
  type: "GET",
  url: localStorage.getItem('BASE_URL')+'/pasien',
  contentType: "application/json",
  dataType: "json",
}).done(function(response) {
  if(response.success){
    $('#name').val(response.data.nama),
    $('#datepicker').val(response.data.tanggal_lahir),
    $('#email').val(response.data.email),
    $('#password').val(response.data.password)
    // alert("Registrasi "+ response.message) 
  }else{
    alertNav(response.message)
    window.location.href = "/profil/#alert"
  }

}).fail(function(response) {
  alert('Error: ' + response.message)
})   

document.getElementById("btnSubmit").addEventListener("click", async () => {
  const myData = {}
  myData['nama'] = $('#name').val(),
  myData['tanggal_lahir'] = $('#datepicker').val(),
  myData['email'] = $('#email').val(),
  myData['password'] = $('#password').val()
  $.ajax({
    headers: {
      'Authorization' : 'Bearer ' + localStorage.getItem('Token')
    },
    type: "POST",
    url: localStorage.getItem('BASE_URL')+'/pasien/update',
    data: myData,
    entType: "application/json",
    dataType: "json",
  }).done(function(response) {
    if(response.success){
      alert("Update "+ response.message) 
      window.location.href = "/home";
    }else{
      alertNav(response.message) 
    }
    
  }).fail(function(response) {
    alert('Error: ' + response.message)
  })            
})

document.getElementById("logout").addEventListener("click", async () => {
  localStorage.removeItem('Token')
  localStorage.removeItem('name')

  window.location.href = "/";
})

function alertNav(message) {
  $('#alert').append(`
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`)
  
}
