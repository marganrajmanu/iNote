import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { Link } from "react-router-dom";

const NoteItem = (props) => {
   const context = useContext(noteContext);
   const { deleteNote, noteToBeUpdated } = context;
   const { note } = props;

   return (
      <div className="card col-md-3 m-2" style={{ width: "18rem", height: "12rem" }}>
         <div className="card-body">
            <h5 className="card-title  lh-sm">{note.title}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary  lh-sm">{note.tag}</h6>
            <p className="card-text lh-sm">{note.content}</p>
            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
               <Link to="/home/updatenote" type="button" className="btn btn-warning" onClick={() => noteToBeUpdated(note)}>
                  Edit
               </Link>
               <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                     deleteNote(note._id);
                     props.showAlert("Note deleted successfully", "success");
                  }}>
                  Delete
               </button>
            </div>
         </div>
      </div>
   );
};

export default NoteItem;
