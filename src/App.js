import React from 'react';
import './App.css';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import 'bootstrap/dist/css/bootstrap.css';
import Footer from './Footer';
import Swal from 'sweetalert2';

function App() {
  const handleGuide = () => {
    Swal.fire({
      title: 'Panduan',
      html: '<ul><li>Masukkan judul catatan dengan maksimal 20 karakter.</li><li>Tambahkan setiap item dengan maksimal 20 karakter.</li><li>Maksimal 15 item dalam satu catatan.</li><li>Klik tombol "+" untuk menambah item, dan "-" untuk mengurangi.</li><li>Setelah selesai, klik "Tambah Catatan" untuk menyimpan.</li><li>Checklist ketika dirasa sudah dilakukan (jika kegiatan) atau sudah di beli (jika barang)</li><li>Untuk menghapus salah satu catatan klik tombol hapus pada bagian catatan yang akan dihapus.</li><li>Untuk menghapus semua catatan, klik tombol "Hapus semua Catatan".</li></ul> <p>Tidak perlu khawatir soal keamanan, hanya kamu yang bisa melihat catatan kamu</p>',
      icon: 'info',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Mengerti'
    });
  };
  return (
    <>
      <div className="container mt-5 p-5">
        <div className='card'>
          <div className='card-header text-center'>
            <div className='justify-content-center d-flex'>
              <div className='col-auto'>
                <h1>Catatan</h1>
              </div>
              <div className='col-auto'>
                <button type="button" onClick={handleGuide} className='btn btn-light'>?</button>
              </div>
            </div>
          </div>
          <div className='card-body p-5'>
            <NoteForm />
            <hr className='mb-5' />
            <div className='text-center'>
              <h2>Daftar Catatan kamu</h2>
            </div>
            <NoteList />

          </div>
        </div>
      </div>
      <Footer />
    </>

  );
}

export default App;
