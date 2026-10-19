function submitForm() {
    const actionArea = document.getElementById('actionArea');
    const statusTicket = document.getElementById('statusTicket');
    const postSubmitNote = document.getElementById('postSubmitNote');
    
    // Nonaktifkan form input agar tidak bisa diubah
    document.getElementById('tglPinjam').disabled = true;
    document.getElementById('tglKembali').disabled = true;
    document.getElementById('deskripsi').disabled = true;

    // Sembunyikan tombol "Ajukan Peminjaman"
    actionArea.classList.add('hidden');

    // Tampilkan tiket status kuning "Menunggu Persetujuan"
    statusTicket.classList.remove('hidden');
    postSubmitNote.classList.remove('hidden');

    console.log("Peminjaman berhasil diajukan. Status: Menunggu Persetujuan.");
}