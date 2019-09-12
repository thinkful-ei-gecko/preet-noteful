import React, { Component } from 'react';
import { Route } from 'react-router-dom';
//import { browserHistory }  from 'react-router-dom';
import './App.css';
//import DummyStore from './dummy-store';
import Header from './Header';
import HomePage from './HomePage';
import Folder from './Folder';
import Note from './Note';
import NoteContext from './NoteContext';

class App extends Component {
  state = {
    folders: [],
    notes: [],
  }

  fetchApi(endpoint, method='GET', key){
    fetch(`http://localhost:9090/${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(res => res.json())
    .then(res => {
      if(method !== "DELETE") {
        this.setState({[key]: res});
      }
    })
  }


  componentDidMount(){
        this.fetchApi('folders', 'folders');
        this.fetchApi('notes', 'notes');

  }

  handleDeleteNote(id){
    this.fetchApi(`notes.${id.noteId}`, 'notes', 'DELETE');
    //let filtered 
  }
 
  render() {
    return (
      <NoteContext.Provider value ={{
        folders: this.state.folders,
        notes: this.state.notes,
        //handleDeleteNote()
      }}>
        <>
          <Header />
          <Route exact path="/" Component={ HomePage } />
          <Route exact path="/folder/:folderId" Component={ Folder } />
          <Route exact path="/notes/:noteId" Component={ Note } />
        </>
      </NoteContext.Provider>
    )}
}

export default App;

