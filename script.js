// Menyimpan data ke localStorage
function saveData() {
    const schedules = getSchedules();
    localStorage.setItem('schedules', JSON.stringify(schedules));
}

// Mengambil data dari localStorage
function getSchedules() {
    const data = localStorage.getItem('schedules');
    return data ? JSON.parse(data) : [];
}

// Menambahkan jadwal baru
function addSchedule() {
    const tanggal = document.getElementById('tanggal').value;
    const jam = document.getElementById('jam').value;
    const namaKegiatan = document.getElementById('namaKegiatan').value;
    const keterangan = document.getElementById('keterangan').value;

    if (!tanggal || !jam || !namaKegiatan || !keterangan) {
        alert("Semua kolom harus diisi!");
        return;
    }

    const schedules = getSchedules();
    schedules.push({ tanggal, jam, namaKegiatan, keterangan });
    saveData();
    renderSchedules();
    clearForm();
}

// Menampilkan jadwal di tabel
function renderSchedules() {
    const schedules = getSchedules();
    const tbody = document.querySelector('#scheduleTable tbody');
    tbody.innerHTML = '';

    schedules.forEach((schedule, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${schedule.tanggal}</td>
            <td>${schedule.jam}</td>
            <td>${schedule.namaKegiatan}</td>
            <td>${schedule.keterangan}</td>
            <td>
                <button onclick="deleteSchedule(${index})">Hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Menghapus jadwal
function deleteSchedule(index) {
    const schedules = getSchedules();
    schedules.splice(index, 1);
    saveData();
    renderSchedules();
}

// Membersihkan form input
function clearForm() {
    document.getElementById('tanggal').value = '';
    document.getElementById('jam').value = '';
    document.getElementById('namaKegiatan').value = '';
    document.getElementById('keterangan').value = '';
}

// Menampilkan laporan dalam format PDF
function generatePDF() {
    const doc = new jsPDF();
    const schedules = getSchedules();

    doc.text('Laporan Jadwal Kerja Harian', 20, 20);
    doc.text('Tanggal: ' + new Date().toLocaleDateString(), 20, 30);

    let y = 40;
    schedules.forEach((schedule, index) => {
        doc.text(`No. ${index + 1}`, 20, y);
        doc.text(`Tanggal: ${schedule.tanggal}`, 30, y + 10);
        doc.text(`Jam: ${schedule.jam}`, 30, y + 20);
        doc.text(`Kegiatan: ${schedule.namaKegiatan}`, 30, y + 30);
        doc.text(`Keterangan: ${schedule.keterangan}`, 30, y + 40);
        y += 50;
    });

    doc.save('jadwal-kerja-harian.pdf');
}

// Menjalankan renderSchedules saat halaman dimuat
window.onload = function() {
    renderSchedules();
};
