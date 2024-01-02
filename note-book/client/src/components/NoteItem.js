import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {

    const context = useContext(noteContext);
    const { deleteNote } = context;

    const { note, updateNote } = props;
    // console.log(note);
    let tagStyle = {
        "fontSize": "0.7rem",
        "background": "red",
        "position": "absolute",
        "borderRadius": "5px",
        "padding": "0px 5px",
        "color": "white"
    }
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <span style={ tagStyle }> {note.tag} </span>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-regular fa-pen-to-square mx-2 btn-edit" onClick={() => { updateNote(note) }}></i>
                    <i className="fa-regular fa-trash-can mx-2 btn-delete" onClick={() => deleteNote(note._id)}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;