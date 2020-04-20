document.getElementById("btnSubmit").addEventListener("click", async () => {
  const baseURL = "http://localhost:3000/api"
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
      alert(response.message) 
    }
    
  }).fail(function(response) {
    alert('Error: ' + response.sqlMessage)
  })            
})