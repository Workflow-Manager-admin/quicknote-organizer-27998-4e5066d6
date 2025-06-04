/**
 * NoteItem component for displaying a single note with edit and delete options
 */
export default function NoteItem({ note, onEdit, onDelete }) {
  const { id, title, content } = note;
  
  // Truncate content for preview
  const truncateContent = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + '...';
  };
  
  return (
    <div className="card">
      <h3 className="note-title">{title}</h3>
      <p className="note-content">{truncateContent(content)}</p>
      <div className="note-actions">
        <button 
          className="btn btn-primary btn-icon" 
          onClick={() => onEdit(note)}
          aria-label="Edit note"
        >
          <i className="fas fa-edit"></i>
        </button>
        <button 
          className="btn btn-danger btn-icon" 
          onClick={() => onDelete(id)}
          aria-label="Delete note"
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
}
