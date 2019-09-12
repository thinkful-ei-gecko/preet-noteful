import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
//import DummyStore from './dummy-store';
import Header from './Header';
import HomePage from './HomePage';
import Folder from './Folder';
import Note from './Note';
import NoteContext from './NoteContext';
import config from './config'
import {withRouter} from 'react-router-dom';

class App extends Component {
  state = {
    folders: [],
    notes: [],
  }

  // fetchApi(endpoint, method='GET', key){
  //   fetch(`http://localhost:9090/${endpoint}`, {
  //     method: method,
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //   })
  //   .then(res => res.json())
  //   .then(res => {
  //     if(method !== "DELETE") {
  //       this.setState({[key]: res});
  //     }
  //   })
  // }

  fetchApi(endpoint, stateKey, method = 'GET', apiBody ) {
    let url = config.API_ENDPOINT + `/${endpoint}`
    fetch(url, {
      method: method,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(apiBody)
    })
    .then(response => {
      if (method === 'DELETE') {
        return ; 
      } else {
        return response.json() 
      }
    }) 
    .then(response => {
      if(method !== 'DELETE' && method !== 'POST') {
        this.setState( {[stateKey]: response} );
      } 
      if(method === 'POST') {
        if(stateKey === 'folders') {
          let newFolder = { id: response.id, folder_name: apiBody.folder_name };
          this.setState({folders: [...this.state.folders, newFolder]})
        }
        if(stateKey === 'notes') {
          let newNote = { id: response.id, note_name: apiBody.note_name, modified: response.modified, content: apiBody.content, folder_id: apiBody.folder_id };
          this.setState({
            notes: [...this.state.notes, newNote],
            folders: [...this.state.folders],
          })
        }
      }
    })
    .catch(error => console.error('Error:', error));
  }

  componentDidMount(){
      this.fetchApi('folders', 'folders');
      this.fetchApi('notes', 'notes');
  }


  handleDeleteNote(id){
    this.fetchApi(`notes.${id.noteId}`, 'notes', 'DELETE');
    let filtered = this.state.notes.filter(note => note.id !== id.noteId)
    this.setState({
      notes:filtered,
      folders: [...this.state.folders]
    },() => {return this.props.history.push('/')})
  }
 
  render() {
    return (
      <NoteContext.Provider value ={{
        folders: this.state.folders,
        notes: this.state.notes,
        handleDeleteNote: noteId => this.handleDeleteNote({noteId})
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

export default withRouter(App);
