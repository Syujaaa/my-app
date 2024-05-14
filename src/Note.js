import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function Note({ index, note }) {
    const [checkedItems, setCheckedItems] = useState([]);


    useEffect(() => {
        const notes = JSON.parse(localStorage.getItem('notes'));
        if (notes && notes[index] && notes[index].checkedItems) {
            setCheckedItems(notes[index].checkedItems);
        }
    }, [index]);

    const handleDelete = () => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Catatan akan dihapus permanen!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                const notes = JSON.parse(localStorage.getItem('notes'));
                notes.splice(index, 1);
                localStorage.setItem('notes', JSON.stringify(notes));
                Swal.fire(
                    'Terhapus!',
                    'Catatan telah dihapus.',
                    'success'
                ).then(() => {

                    window.location.reload();
                });
            }
        });
    };

    const handleCheck = (i) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[i] = !checkedItems[i];
        setCheckedItems(updatedCheckedItems);
        const notes = JSON.parse(localStorage.getItem('notes'));
        notes[index].checkedItems = updatedCheckedItems;
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    const renderItems = () => {
        if (Array.isArray(note.items)) {
            return (
                <ul className='list-group'>
                    {note.items.map((item, i) => (
                        <li key={i} className='d-flex justify-content-between'>
                            <textarea
                                value={item}
                                onChange={(e) => handleItemChange(e, i)}
                                className='form-control'
                                style={{ backgroundColor: checkedItems[i] ? '#cfe2f3' : 'inherit' }}
                                readOnly
                            />
                            <input
                                type="checkbox"
                                checked={checkedItems[i] || false}
                                onChange={() => handleCheck(i)}
                                className='form-check-input mt-3'
                                id={i}
                            />
                        </li>
                    ))}
                </ul>
            );
        }
        return null;
    };

    const handleItemChange = (e, i) => {
        const updatedItems = [...note.items];
        updatedItems[i] = e.target.value;
        const updatedNote = { ...note, items: updatedItems };
        const updatedNotes = JSON.parse(localStorage.getItem('notes')).map((item, idx) => {
            if (idx === index) {
                return updatedNote;
            }
            return item;
        });
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    };
    return (


        <div className="col-md-4 mt-5">
            <div className='card'>
                <div className='card-header text-center'>
                    <h3>{note.title}</h3>
                </div>
                <div className='card-body'>
                    {renderItems()}
                </div>
                <button onClick={handleDelete} className='btn btn-danger'>Hapus</button>
            </div>
        </div>

    );
}

export default Note;
