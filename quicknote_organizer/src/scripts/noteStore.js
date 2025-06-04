/**
 * Client-side note management module using localStorage
 */

// Generate a unique ID for notes
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// Initialize notes from localStorage or use empty array
const initNotes = () => {
  const notes = localStorage.getItem('notes');
  return notes ? JSON.parse(notes) : [];
};

// Save notes to localStorage
const saveNotes = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

// Get all notes
export const getNotes = () => {
  return initNotes();
};

// Add a new note
export const addNote = (title, content) => {
  const notes = initNotes();
  const newNote = {
    id: generateId(),
    title,
    content,
    createdAt: new Date().toISOString()
  };
  
  notes.push(newNote);
  saveNotes(notes);
  return newNote;
};

// Update an existing note
export const updateNote = (id, title, content) => {
  const notes = initNotes();
  const index = notes.findIndex(note => note.id === id);
  
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      content,
      updatedAt: new Date().toISOString()
    };
    
    saveNotes(notes);
    return notes[index];
  }
  
  return null;
};

// Delete a note
export const deleteNote = (id) => {
  const notes = initNotes();
  const filteredNotes = notes.filter(note => note.id !== id);
  
  saveNotes(filteredNotes);
  return filteredNotes;
};

// Search notes by query string (in title or content)
export const searchNotes = (query) => {
  if (!query || query.trim() === '') return getNotes();
  
  const notes = initNotes();
  const lowercaseQuery = query.toLowerCase();
  
  return notes.filter(note => 
    note.title.toLowerCase().includes(lowercaseQuery) || 
    note.content.toLowerCase().includes(lowercaseQuery)
  );
};
