import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/noteContext';

const User = () => {

    const { userDetail, number, fetchAllNotes } = useContext(NoteContext);

    useEffect(() => {
        fetchAllNotes();
        // eslint-disable-next-line
    }, [])


    return (
        <div className='container'>
            <div className="mb-10"><h2>User details</h2></div>
            <p><strong>Name:</strong> {userDetail?.name}</p>
            <p><strong>Email:</strong> {userDetail?.email}</p>
            <p><strong>Notes:</strong> {number}</p>
        </div>
    )
}

export default User