$('#username').text('Hi, Dr. '+ localStorage.getItem('name'))

document.getElementById("logout").addEventListener("click", async () => {
  localStorage.removeItem('Token')
  localStorage.removeItem('name')

  window.location.href = "/dokter";
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
        let image = ''
        if(data.gender=='Perempuan'){
          image = '../images/female.png'
        }else{
          image = '../images/male.png'
        }
        $('#listPasien').append(`
        <div class="col">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">${data.nama}</h5>
            </div>
            <div class="card-body">
              <div class="img-dr">
                <img src="${image}"/>
              </div>
              <div class="info-dr">
                <p class="card-text">
                  Tanggal Lahir : ${data.tanggal_lahir} <br>
                  Keluhan : ${data.keluhan}
                </p>
              </div>
            </div>
            <center>
              <a class="btn btn-success" onclick="pilih(${data.id_rekam_medis})" style="color: white;">Lihat Pasien</a>
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
        $('#listPasien').append(`
        <div class="col">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">${data.nama} (Selesai)</h5>
            </div>
            <div class="card-body">
              <div class="img-dr">
                <img src="${image}"/>
              </div>
              <div class="info-dr">
                <p class="card-text">
                  Tanggal Lahir : ${data.tanggal_lahir} <br>
                  Keluhan : ${data.keluhan}
                </p>
              </div>
            </div>
            <center>
              <a class="btn btn-success" onclick="pilih(${data.id_rekam_medis})" style="color: white;">Lihat Pasien</a>
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
  window.location.href = "/diagnosa";
}