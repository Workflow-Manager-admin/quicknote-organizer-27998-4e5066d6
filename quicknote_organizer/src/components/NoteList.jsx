import NoteItem from './NoteItem';

/**
 * NoteList component for displaying a list of notes
 */
export default function NoteList({ notes, onEditNote, onDeleteNote }) {
  if (!notes.length) {
    return (
      <div className="empty-state">
        <i className="fas fa-sticky-note" style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}></i>
        <h3>No notes yet</h3>
        <p>Create a new note by clicking the + button below</p>
      </div>
    );
  }

  return (
    <div>
      {notes.map(note => (
        <NoteItem 
          key={note.id} 
          note={note} 
          onEdit={onEditNote} 
          onDelete={onDeleteNote}
        />
      ))}
    </div>
  );
}
