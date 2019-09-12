// import React, { Component } from 'react';
// import FolderList from './FolderList';
// //import NoteList from '../notelist/notelist';
// import NoteContext from './NoteContext';

// class Note extends Component {
//   static contextType = NoteContext;

//   render() {
//     //will need to add in our handeDelete below and update event handler line 31
//     const { folders, notes } = this.context;
//     const noteId = this.props.match.params.noteId;
//     //const note = notes.find(note => note.id === noteId);
//     const filteredNotes = notes.filter(note => note.id.toString() === noteId)

//     return (
//       <main role="main" className="App">
//         <section className="main-layout">
//           <div className="left-menu">
//             <FolderList goBack folders={folders.filter(folder => folder.id === note.folderId)} selected={note.folderId}/>
//           </div>

//           <div className="right-content">
//             <ul className="notes-list">
//               <li key={note.id}>
//                 <h3>{note.name}</h3>
//                 <p>Date modified: {note.modified}</p>
//                   <input 
//                     className="favorite styled"
//                     type="button"
//                     value="Delete note" /> 
//                     {/* Add in event handler for delete button */}
//                 </li>  
//                 <li>
//                   <p>
//                     {note.content}
//                   </p>
//                 </li>
//             </ul>
//           </div>
//         </section>
//       </main>
//     )
//   }
// }

//export default Note;

import React from 'react';
import NoteContext from './NoteContext';
import {withRouter} from 'react-router-dom';

class Note extends React.Component {
  static contextType = NoteContext;

  render() {
    const { notes, handleDeleteNote } = this.context;
    const noteId = this.props.match.params.noteId;
    const filteredNotes = notes.filter(note => note.id.toString() === noteId)
    
    return (
      <main role="main" className="App">
        <section className="main-layout">
          <div className="right-content">
            <ul className="notes-list">
              {filteredNotes.map((note, index) => 
                <li key={index}>
                  <h3>{note.note_name}</h3>
                  <p>{note.content}</p>
                  <p>Date modified: {note.modified}</p>
                <input 
                  className="favorite styled"
                  type="button"
                  value="Delete note" 
                  onClick={() => { handleDeleteNote(note.id)
                }}  
                  /> 
                </li> 
                )}
            </ul>
          </div>
        </section>
      </main>
    )
  }
}

export default withRouter(Note);