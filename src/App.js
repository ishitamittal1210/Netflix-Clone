// import logo from './logo.svg';
// import './App.css';
import "./styles.css";
import Header from "./components/Header";
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
import React, { useEffect, useState } from "react";
import Count from "./components/Count";
import Footer from "./components/Footer";
import { MdLocalActivity } from "react-icons/md";

// To get the data from local storage

const getLocalItems = () => {
  let note = localStorage.getItem('note');
  console.log(note);

  if (note) {
    return JSON.parse(localStorage.getItem('note'));
  } else {
      return [];
  }
}


function App(props) {
const[notes, setNotes] = useState(getLocalItems());

 
function addNote(newNote) {
  setNotes((prevValue) => {
    return [...prevValue, newNote];
  });
}

function deleteNotes(id) {
  setNotes((preValue) => {
    return [...preValue.filter((note, index) => index !== id)];
  });
}

// add data to local storage
useEffect(() => {
localStorage.setItem('note', JSON.stringify(notes))
   }, [notes]);





  return (
    <div className="App">
       <Header />
       <Count count={notes.length === 0
        ? "Empty":`Showing ${notes.length} Notes in
         Database`
         } />
       <CreateArea onAdd={addNote} />
       {notes.map((note,index) => (
      <Note
       key={index} 
       id={index} 
       title={note.title} 
       content={note.content} 
       onDelete={deleteNotes}
       />
       ))}
       <Footer />
    </div>
  );
}

export default App;
