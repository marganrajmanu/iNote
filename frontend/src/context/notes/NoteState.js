import React, { useState } from 'react'
import NoteContext from './noteContext'

const host = "http://localhost:5000/api/";

const NoteState = (props) => {

    const [userDetail, setUserDetail] = useState()
    const [number, setNumber] = useState(0)

    // POST req to add, update notes
    async function postData(url, method, data) {

        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(data),
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
    // Specific method req without body to fetch all notes and delete
    async function getData(url, method) {

        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    const [notes, setNotes] = useState([]);

    const [currentNote, setCurrentNote] = useState({
        title: "",
        content: "",
        tags: ""
    });

    const fetchAllNotes = async () => {
        const url = `${host}notes/fetchallnotes`;
        const method = "GET";
        const allNotes = await getData(url, method);
        setNotes(allNotes);
        setNumber(allNotes.length);
    }

    const addNote = async (note) => {
        const url = `${host}notes/addnote`;
        const method = "POST";
        await postData(url, method, note);
    }

    const noteToBeUpdated = async (note) => {
        setCurrentNote(note);
    }

    const updateNote = async (note) => {
        const { _id, title, content, tag } = note;
        const url = `${host}notes/updatenote/${_id}`;
        const method = "PUT";
        await postData(url, method, note);

        notes.forEach(element => {
            if (element._id === _id) {
                element.title = title;
                element.content = content;
                element.tag = tag;
            }
        });
        setNotes(notes);
    }
    const deleteNote = async (id) => {
        const url = `${host}notes/deletenote/${id}`;
        const method = "DELETE";
        await getData(url, method);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, fetchAllNotes, addNote, updateNote, deleteNote, currentNote, noteToBeUpdated, userDetail, setUserDetail, number }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState