$('#username').text('Hi, '+ localStorage.getItem('name'))

document.getElementById("btnSubmit").addEventListener("click", async () => {
  const myData = {}
  myData['tinggi_badan'] = $('#tinggi_badan').val(),
  myData['berat_badan'] = $('#berat_badan').val(),
  myData['keluhan'] = $('#keluhan').val(),
  $.ajax({
    headers: {
      'Authorization' : 'Bearer ' + localStorage.getItem('Token')
    },
    type: "POST",
    url: localStorage.getItem('BASE_URL')+'/medis/update/1',
    data: myData,
    entType: "application/json",
    dataType: "json",
  }).done(function(response) {
    if(response.success){
      alert("Input "+ response.message) 
      window.location.href = "/home";
    }else{
      alertNav(response.message) 
    }
    
  }).fail(function(response) {
    alert('Error: ' + response.message)
  })            
})