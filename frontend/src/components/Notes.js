import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import { Link } from 'react-router-dom'

const Notes = (props) => {

    const context = useContext(noteContext);
    const { notes, fetchAllNotes } = context;

    useEffect(() => {
        fetchAllNotes();
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <div className="d-flex align-items-center">
                <h2 className="col">My Notes</h2>
                <div className="justify-content-end">
                    <Link to="/home/addnote"><button className="btn btn-primary" type="button">Add Note</button></Link>
                </div>
            </div>
            <div className="row my-4">
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} showAlert={props.showAlert} />;
                })}
            </div>
        </>
    )
}

export default Notes