$('#username').text('Hi, '+ localStorage.getItem('name'))

document.getElementById("logout").addEventListener("click", async () => {
  localStorage.removeItem('Token')
  localStorage.removeItem('name')

  window.location.href = "/dokter";
})

document.getElementById("riwayat").addEventListener("click", async () => {
  window.location.href = "/riwayat";
})

document.getElementById("profil").addEventListener("click", async () => {
  window.location.href = "/profil";
})

$.ajax({
  headers: {
    'Authorization' : 'Bearer ' + localStorage.getItem('Token')
  },
  type: "GET",
  url: localStorage.getItem('BASE_URL')+'/medis/getAll',
  dataType: "json"
}).done(function(response) {
  if(response.success){
    if(response.data.length > 0) $('#noData').remove()
    response.data.map((data,index)=>{
      if(data.diagnosa == ''){
        $('#listDokter').append(`
        <div class="col">
              <!-- Per Card -->
              <div class="card">
                <div class="card-header">
                  <h5 class="card-title">Dr. ${data.nama}</h5>
                </div>
                <div class="card-body">
                  <div class="img-dr">
                    <img src="../images/resource/doctor_default_seo.png" />
                  </div>
                  <div class="info-dr">
                    <p class="card-text">
                      Keluhan  : ${data.keluhan} <br>
                      Diagnosa : -
                    </p>
                  </div>
                </div>
                <center>
                  <a href="#" class="btn btn-success">Lihat Diagnosa</a>
                </center>
              </div>
            </div>`)
      }else{
        let image = ''
        if(data.gender=='Perempuan'){
          image = '../images/female.png'
        }else{
          image = '../images/male.png'
        }
        $('#listDokter').append(`
        <div class="col">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Dr. ${data.nama} (Selesai)</h5>
            </div>
            <div class="card-body">
              <div class="img-dr">
                <img src="../images/resource/doctor_default_seo.png" />
              </div>
              <div class="info-dr">
                <p class="card-text">
                  Keluhan  : ${data.keluhan} <br>
                  Diagnosa : ${data.diagnosa.slice(0,10)} ...
                </p>
              </div>
            </div>
            <center>
              <a class="btn btn-success" onclick="pilih(${data.id_rekam_medis})">Lihat Diagnosa</a>
            </center>
          </div>
        </div>`)
      }
    })
  }else{
    alert(response.message) 
  }
}).fail(function(response) {
  alert('Error: ' + response.message)
})

function pilih(id) {
  localStorage.setItem('id_rekam_medis', id)
  localStorage.setItem('pasien', true)
  window.location.href = "/diagnosa";
}