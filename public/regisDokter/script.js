document.getElementById("btnSubmit").addEventListener("click", async () => {
  const myData = {}
  myData['nama'] = $('#name').val(),
  myData['gender'] = $("input[name='gender']:checked").val(),
  myData['tanggal_lahir'] = $('#datepicker').val(),
  myData['email'] = $('#inputEmail3').val(),
  myData['password'] = $('#inputPassword3').val()
  myData['bidang'] = 'Dokter Umum'
  myData['pengalaman'] = '1 - 5 Tahun'
  localStorage.setItem('nama', myData.nama)
  $.ajax({
    type: "POST",
    url: localStorage.getItem('BASE_URL')+'/dokter/registrasi',
    data: JSON.stringify(myData),
    contentType: "application/json",
    dataType: "json",
  }).done(function(response) {
    if(response.success){
      alert("Registrasi "+ response.message) 
      window.location.href = "/";
    }else{
      alert(response.message) 
    }
    
  }).fail(function(response) {
    alert('Error: ' + response.sqlMessage)
  })            
})