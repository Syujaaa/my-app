import React, { useState } from 'react';
import Swal from 'sweetalert2';

function NoteForm() {
    const [title, setTitle] = useState('');
    const [items, setItems] = useState(['']);
    const [count, setCount] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.length > 20) {
            alert('Judul harus memiliki maksimal 20 karakter.');
            return;
        }

        for (let i = 0; i < items.length; i++) {
            if (items[i].length > 20) {
                alert('Setiap item harus memiliki maksimal 20 karakter.');
                return;
            }
        }

        const note = { title, items };
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        localStorage.setItem('notes', JSON.stringify([...notes, note]));
        setTitle('');
        setItems(['']);
        setCount(1);
        // Refresh page to reflect changes
        window.location.reload();
    };

    const handleAdd = () => {
        if (count < 15) {
            setCount(count + 1);
            setItems([...items, '']);
        } else {
            alert('Maksimum 15 item diizinkan.');
        }
    };

    const handleSubtract = () => {
        if (count > 1) {
            setCount(count - 1);
            setItems(items.slice(0, -1));
        }
    };

    const handleChange = (e, index) => {
        const newItems = [...items];
        newItems[index] = e.target.value;
        setItems(newItems);
    };

    const handleDeleteAll = () => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Semua catatan akan dihapus.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus semua!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('notes');
                Swal.fire(
                    'Berhasil!',
                    'Semua catatan telah dihapus.',
                    'success'
                ).then(() => {

                    window.location.reload();
                });
            }
        });
    };


    return (
        <>
            <div className='d-flex justify-content-center align-items-center'>

                <div className='col-md-5'>

                    <div className='justify-content-between d-flex'>
                        <div className='col-auto'>
                            <button type="button" onClick={handleDeleteAll} className='btn btn-danger my-3'>Hapus semua Catatan</button>
                        </div>
                        <div className='col-auto'>

                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='form-floating mb-3'>
                            <input
                                type="text"
                                placeholder=""
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className='form-control'
                                id='judul'
                                maxLength={20}
                                required />
                            <label htmlFor='judul'>Judul List</label>
                        </div>

                        <div className='mb-3'>
                            <label className=''>Jumlah Item: </label>
                            <button type="button" onClick={handleSubtract} className='btn btn-outline-danger me-3'>-</button>
                            <span>{count}</span>
                            <button type="button" onClick={handleAdd} className='btn btn-outline-success ms-3'>+</button>
                        </div>

                        {items.map((item, index) => (
                            <div className='form-floating mb-2'>
                                <input
                                    key={index}
                                    type="text"
                                    placeholder={`Item ${index + 1}`}
                                    value={item}
                                    onChange={(e) => handleChange(e, index)}
                                    className='form-control'
                                    maxLength={20}
                                    id={index + 1}
                                    required />

                                <label htmlFor={index + 1}>{`Item ke-${index + 1}`}</label>
                            </div>
                        ))}




                        <div className='justify-content-end d-flex'>
                            <button type="submit" className='btn btn-primary mt-3'>Tambah Catatan</button>
                        </div>


                    </form>
                </div>
            </div>
        </>
    );
}

export default NoteForm;
