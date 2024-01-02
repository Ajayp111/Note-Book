import { useState, useContext } from "react";
import NoteContext from "./noteContext";
import alertContext from "../alert/alertContext";

const NoteState = (props) => {
  const context = useContext(alertContext);
  const { showAlert } = context;

  const host = "http://localhost:5000";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Add a Note
  const getNotes = async () => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-token": process.env.REACT_APP_API_TOKEN,
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();
    setNotes(json);
    // console.log(json);
  };

  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // console.log("frontend",JSON.stringify({ title, description, tag }));

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-token": process.env.REACT_APP_API_TOKEN,
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // adding the note in client side
    const json = await response.json();
    const msgType = json.msgType;
    // console.log(json.savedNote);
    if (msgType === "success") {
      showAlert(json.msgType, json.message);
      setNotes([json.savedNote, ...notes]);
    } else {
      showAlert("danger", "some error occured.");
    }
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // TODO: API Call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "api-token": process.env.REACT_APP_API_TOKEN,
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    // const json = await response.json();
    // console.log(json);
    let newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);

    const json = await response.json();
    const msgType = json.msgType;
    if (msgType === "success") {
      showAlert(json.msgType, json.message);
    } else {
      showAlert("danger", "some error occured.");
    }
  };

  // Edit/Update a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    let data = { title, description, tag };
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "api-token": process.env.REACT_APP_API_TOKEN,
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    const msgType = json.msgType;
    // console.log(msgType);

    if (msgType === "success") {
      let newNotes = JSON.parse(JSON.stringify(notes));
      // Logic to edit a note in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
      showAlert(json.msgType, json.message);
    } else {
      showAlert("danger", "some error occured.");
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
