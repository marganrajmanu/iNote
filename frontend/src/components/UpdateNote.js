import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {

    const context = useContext(noteContext);
    const { currentNote, updateNote } = context;

    const [oneNote, setOneNote] = useState(currentNote)

    const handleUpdate = (e) => {
        e.preventDefault();
        updateNote(oneNote);
        props.showAlert("Note updated successfully", "success");
    }

    const onChange = (event) => {
        setOneNote({ ...oneNote, [event.target.name]: event.target.value });
    }
    return (
        <div className='container'>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input className="form-control" id="title" name="title" placeholder="Title" onChange={onChange} value={oneNote.title} />
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="form-label">Content</label>
                <textarea className="form-control" id="content" name="content" rows="3" placeholder="Content" onChange={onChange} value={oneNote.content}></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="tags" className="form-label">Tags</label>
                <input className="form-control" id="tag" name="tag" placeholder="Tags" onChange={onChange} value={oneNote.tag} />
            </div>
            <div>
                <button type="submit" className="btn btn-primary" onClick={handleUpdate}>Update Note</button>
            </div>
        </div>
    )
}

export default AddNote