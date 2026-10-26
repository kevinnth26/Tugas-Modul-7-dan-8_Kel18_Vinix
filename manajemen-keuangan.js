// Format input nominal otomatis
const nominalInput = document.getElementById('expenseNominal');
if (nominalInput) {
    nominalInput.addEventListener('keyup', function(e) {
        let value = this.value.replace(/[^0-9]/g, '');
        if (value) {
            this.value = 'Rp ' + parseInt(value).toLocaleString('id-ID');
        } else {
            this.value = '';
        }
    });
}

// Update teks saat file dipilih
function updateFileName(input) {
    const uploadText = document.getElementById('uploadText');
    if (input.files && input.files[0]) {
        uploadText.textContent = input.files[0].name;
    }
}

// Tangani simpan form pengeluaran
function handleSaveExpense(event) {
    event.preventDefault();
    document.getElementById('successModal').classList.add('active');
}

// Tutup modal popup
function closeModal() {
    document.getElementById('successModal').classList.remove('active');
    document.getElementById('expenseForm').reset();
    document.getElementById('uploadText').textContent = "Upload Bukti Transaksi";
}