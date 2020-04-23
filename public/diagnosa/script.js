$.ajax({
  headers: {
    'Authorization' : 'Bearer ' + localStorage.getItem('Token')
  },
  type: "GET",
  url: localStorage.getItem('BASE_URL')+'/medis/get/'+localStorage.getItem('id_rekam_medis'),
  dataType: "json"
}).done(function(response) {
  $('#nama').text(response.data.nama)
  $('#email').text(response.data.email)
  $('#tanggal_lahir').text(response.data.tanggal_lahir)
  $('#gender').text(response.data.gender)
  $('#tinggi_badan').text(response.data.tinggi_badan)
  $('#berat_badan').text(response.data.berat_badan)
  $('#keluhan').text(response.data.keluhan)
  $('#diagnosa').text(response.data.diagnosa)
}).fail(function(response) {
  alert('Error: ' + response.message)
})
function simpan() {
  const myData = {}
  myData['id_rekam_medis'] = localStorage.getItem('id_rekam_medis')
  myData['diagnosa'] = $('#diagnosa').val()
  $.ajax({
    headers: {
      'Authorization' : 'Bearer ' + localStorage.getItem('Token')
    },
    type: "POST",
    url: localStorage.getItem('BASE_URL')+'/medis/update/0',
    data: myData,
    dataType: "json"
  }).done(function(response) {
    alert('Simpan '+ response.message)
    window.location.href = '/diagnosa'
  }).fail(function(response) {
    alert('Error: ' + response.message)
  })
}

function back() {
  if(localStorage.getItem('pasien')=='true'){
    window.location.href = '/riwayat'
  }else{
    localStorage.removeItem('pasien')
    window.location.href = '/homeDokter'
  }
}
function pilih(id) {
  localStorage.setItem('id_rekam_medis', id)
  window.location.href = "/diagnosa";
}

document.getElementById("logout").addEventListener("click", async () => {
  localStorage.removeItem('Token')
  localStorage.removeItem('name')
  localStorage.removeItem('id_rekam_medis')

  if(localStorage.getItem('pasien')=='true'){
    localStorage.removeItem('pasien')
    window.location.href = "/";
  }else{
    localStorage.removeItem('pasien')
    window.location.href = "/dokter";
  }
})

if(localStorage.getItem('pasien')=='true'){
  $('#username').text('Hi, '+ localStorage.getItem('name'))
  $('#diagnosa').attr('disabled', true)
  $('#btnSubmit').remove()
  $('#btnHapus').remove()
}else{
  $('#username').text('Hi, Dr. '+ localStorage.getItem('name'))
}