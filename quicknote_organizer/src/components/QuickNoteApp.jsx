import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import * as noteStore from '../scripts/noteStore';

/**
 * Main QuickNote Organizer App component
 * Integrates all features: create, edit, delete, and search notes
 */
export default function QuickNoteApp() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  
  // Initialize notes from store on component mount
  useEffect(() => {
    const allNotes = noteStore.getNotes();
    setNotes(allNotes);
    setFilteredNotes(allNotes);
  }, []);
  
  // Handle search functionality
  const handleSearch = (query) => {
    const searchResults = noteStore.searchNotes(query);
    setFilteredNotes(searchResults);
  };
  
  // Open form to create a new note
  const handleAddNote = () => {
    setCurrentNote(null);
    setIsFormOpen(true);
  };
  
  // Open form to edit an existing note
  const handleEditNote = (note) => {
    setCurrentNote(note);
    setIsFormOpen(true);
  };
  
  // Handle note save (create or update)
  const handleSaveNote = (noteData) => {
    let updatedNotes;
    
    if (noteData.id) {
      // Update existing note
      const updatedNote = noteStore.updateNote(noteData.id, noteData.title, noteData.content);
      updatedNotes = notes.map(note => note.id === noteData.id ? updatedNote : note);
    } else {
      // Create new note
      const newNote = noteStore.addNote(noteData.title, noteData.content);
      updatedNotes = [...notes, newNote];
    }
    
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes);
    setIsFormOpen(false);
  };
  
  // Handle note deletion
  const handleDeleteNote = (id) => {
    if (confirm('Are you sure you want to delete this note?')) {
      const updatedNotes = noteStore.deleteNote(id);
      setNotes(updatedNotes);
      setFilteredNotes(updatedNotes);
    }
  };
  
  // Close the form
  const handleCancelForm = () => {
    setIsFormOpen(false);
  };
  
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      
      <NoteList 
        notes={filteredNotes}
        onEditNote={handleEditNote}
        onDeleteNote={handleDeleteNote}
      />
      
      {isFormOpen && (
        <NoteForm
          note={currentNote}
          onSave={handleSaveNote}
          onCancel={handleCancelForm}
        />
      )}
      
      <button 
        className="fab" 
        onClick={handleAddNote}
        aria-label="Add new note"
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
}
