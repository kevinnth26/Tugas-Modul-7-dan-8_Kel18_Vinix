let currentFilter = 'menunggu';

function filterStatus(status, btnElement) {
    currentFilter = status;

    const filterBtns = document.querySelectorAll('.tab-pill');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    const sectionTitle = document.getElementById('section-title');
    const sectionCounter = document.getElementById('section-counter');
    const footerNote = document.getElementById('footer-note');

    const counts = {
        menunggu: document.querySelectorAll('.approval-card[data-status="menunggu"]').length,
        diterima: document.querySelectorAll('.approval-card[data-status="diterima"]').length,
        ditolak: document.querySelectorAll('.approval-card[data-status="ditolak"]').length
    };

    if (status === 'menunggu') {
        sectionTitle.textContent = 'Menunggu persetujuan';
        sectionCounter.textContent = `${counts.menunggu} permintaan`;
        sectionCounter.style.display = 'inline-block';
        footerNote.style.display = 'flex';
    } else if (status === 'diterima') {
        sectionTitle.textContent = 'Persetujuan Diterima';
        sectionCounter.style.display = 'none';
        footerNote.style.display = 'none';
    } else if (status === 'ditolak') {
        sectionTitle.textContent = 'Persetujuan Ditolak';
        sectionCounter.style.display = 'none';
        footerNote.style.display = 'none';
    }

    const cards = document.querySelectorAll('.approval-card');
    let visibleCount = 0;

    cards.forEach(card => {
        if (card.getAttribute('data-status') === status) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    const emptyState = document.getElementById('empty-state');
    if (visibleCount === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
    }
}

function updateStatus(buttonElement, newStatus) {
    const card = buttonElement.closest('.approval-card');
    const badge = card.querySelector('.status-badge');
    const actions = card.querySelector('.card-actions');

    card.setAttribute('data-status', newStatus);
    badge.className = `status-badge ${newStatus}`;
    badge.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);

    if (actions) {
        actions.remove();
    }

    recalculateCounts();
    const activeBtn = document.querySelector('.tab-pill.active');
    filterStatus(currentFilter, activeBtn);

    showToast(newStatus === 'diterima' ? 'Peminjaman berhasil DITERIMA' : 'Peminjaman telah DITOLAK');
}

function recalculateCounts() {
    const counts = {
        menunggu: document.querySelectorAll('.approval-card[data-status="menunggu"]').length,
        diterima: document.querySelectorAll('.approval-card[data-status="diterima"]').length,
        ditolak: document.querySelectorAll('.approval-card[data-status="ditolak"]').length
    };

    document.getElementById('count-menunggu').textContent = counts.menunggu;
    document.getElementById('count-diterima').textContent = counts.diterima;
    document.getElementById('count-ditolak').textContent = counts.ditolak;

    const sectionCounter = document.getElementById('section-counter');
    if (currentFilter === 'menunggu') {
        sectionCounter.textContent = `${counts.menunggu} permintaan`;
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}