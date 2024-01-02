import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
    };
    const onChange = (event) => {
        const { name, value } = event.target;
        setNote({ ...note, [name]: value })
    };
    const onBlur = (event) => {
        const { value } = event.target;
        let hasClass = event.target.classList.contains('is-invalid');
        if (value.length >= 5 && hasClass) {
            event.target.classList.remove('is-invalid');
        }
        if (value.length < 5) {
            event.target.classList.add('is-invalid');
        }
    };
    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onBlur={onBlur} onChange={onChange} minLength={5} required value={note.title} />
                        <small id="namevalid" className="form-text text-muted invalid-feedback" style={{ color: "red" }}>
                            Title must be atleast 5 characters long
                        </small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" name="description" id="description" onBlur={onBlur} onChange={onChange} minLength={5} required value={note.description} />
                        <small id="namevalid" className="form-text text-muted invalid-feedback" style={{ color: "red" }}>
                            Description must be atleast 5 characters long
                        </small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" name="tag" id="tag" onChange={onChange} value={note.tag} />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote