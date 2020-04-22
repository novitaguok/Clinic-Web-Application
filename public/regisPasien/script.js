document.getElementById("btnSubmit").addEventListener("click", async () => {
  const myData = {}
  myData['nama'] = $('#name').val(),
  myData['gender'] = $("input[name='gender']:checked").val(),
  myData['tanggal_lahir'] = $('#datepicker').val(),
  myData['email'] = $('#inputEmail3').val(),
  myData['password'] = $('#inputPassword3').val()
  $.ajax({
    type: "POST",
    url: localStorage.getItem('BASE_URL')+'/pasien/registrasi',
    data: JSON.stringify(myData),
    contentType: "application/json",
    dataType: "json",
  }).done(function(response) {
    if(response.success){
      alert("Registrasi "+ response.message) 
      window.location.href = "/";
    }else{
      alertNav(response.message) 
    }
    
  }).fail(function(response) {
    alert('Error: ' + response.sqlMessage)
  })            
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