for (let i = 1; i < 5; i++) {
  $('#listDokter').append(`
  <div class="col-md-6">
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">Dr. Blabla</h5>
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
      <a style="color: white;" onclick="pilih(${i})" class="btn btn-success">Pilih Dokter</a>
      </center>
    </div>
  </div>`)
}

function pilih(id) {
  $('#listDokter').append(`
  <div class="col-md-6">
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">Dr. Blabla ${id}</h5>
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