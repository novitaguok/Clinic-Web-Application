$.ajax({
  type: "GET",
  url: localStorage.getItem('BASE_URL')+'/dokter/get',
  dataType: "json"
}).done(function(response) {
  if(response.success){
    response.data.map((data,index)=>{
      $('#listDokter').append(`
      <div class="col-md-6">
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
                Dokter pada bidang ${data.bidang} yang memiliki pengalaman ${data.pengalaman}.
              </p>
            </div>
          </div>
          <center>
          <a style="color: white;" onclick="pilih(${data.id_dokter})" class="btn btn-success">Pilih Dokter</a>
          </center>
        </div>
      </div>`)
    })
  }else{
    alert(response.message) 
  }
  
}).fail(function(response) {
  alert('Error: ' + response.message)
})            
  


function pilih(id) {
  $('#listDokter').append(`
  <div class="col-md-6">
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">Pilih Dokter id ${id}</h5>
      </div>
      <div class="card-body">
        <div class="img-dr">
          <img src="../images/resource/doctor_default_seo.png" />
        </div>
        <div class="info-dr">
          <p class="card-text">
            With supporting text below as a natural lead-in to
            additional content.
          </p>
        </div>
      </div>
      <center>
        <a href="#" class="btn btn-success">Pilih Dokter</a>
      </center>
    </div>
  </div>`)
}