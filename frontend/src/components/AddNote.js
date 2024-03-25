import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({
        title: "",
        content: "",
        tag: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note);
        setNote({
            title: "",
            content: "",
            tag: ""
        })
        props.showAlert("Note added successfully", "success")
    }

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    }
    return (
        <div className='container'>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input className="form-control" id="title" name="title" placeholder="Title" onChange={onChange} value={note.title} />
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="form-label">Content</label>
                <textarea className="form-control" id="content" name="content" rows="3" placeholder="Content" onChange={onChange} value={note.content} ></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="tags" className="form-label">Tags</label>
                <input className="form-control" id="tag" name="tag" placeholder="Tags" onChange={onChange} value={note.tag} />
            </div>
            <div>
                <button type="submit" disabled={note.title.length < 3 || note.content.length < 5} className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
            </div>
        </div>
    )
}

export default AddNote