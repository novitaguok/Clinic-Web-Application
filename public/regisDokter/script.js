document.getElementById("btnSubmit").addEventListener("click", async () => {
  const myData = {}
  myData['nama'] = $('#name').val(),
  myData['gender'] = $("input[name='gender']:checked").val(),
  myData['tanggal_lahir'] = $('#datepicker').val(),
  myData['email'] = $('#inputEmail3').val(),
  myData['password'] = $('#inputPassword3').val()
  myData['bidang'] = $("#bidang :selected").text()
  myData['pengalaman'] = $("#pengalaman :selected").text()
  localStorage.setItem('nama', myData.nama)
  $.ajax({
    type: "POST",
    url: localStorage.getItem('BASE_URL')+'/dokter/registrasi',
    data: JSON.stringify(myData),
    contentType: "application/json",
    dataType: "json",
  }).done(function(response) {
    if(response.success){
      // alert("Registrasi "+ response.message) 
      window.location.href = "/dokter";
    }else{
      alertNav(response.message)
      window.location.href = "/regisDokter/#alert"
    }

  }).fail(function(response) {
    alert('Error: ' + response.message)
  })   
  // const foto = document.getElementById('foto')
  // const formData = new FormData()

  // formData.append('foto', foto.files[0]);
  // $.ajax({
  //   type: "POST",
  //   method: "POST",
  //   cache: false,
  //   contentType: false,
  //   processData: false,
  //   url: localStorage.getItem('BASE_URL')+'/dokter/foto',
  //   data: formData,
  //   dataType: "json",
  // }).done(function(response) {
  //   if(response.success){
  //     alert("Foto  "+ response.message) 
  //   }else{
  //     alert(response.message) 
  //   }

  // }).fail(function(response) {
  //   alert('Error: ' + response.message)
  // })
  
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