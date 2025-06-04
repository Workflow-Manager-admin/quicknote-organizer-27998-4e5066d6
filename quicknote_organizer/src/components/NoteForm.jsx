import { useState, useEffect } from 'react';

/**
 * NoteForm component for creating and editing notes
 */
export default function NoteForm({ note, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const isEditing = !!note;
  
  // Set initial values if editing an existing note
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Please enter both title and content for the note.');
      return;
    }
    
    onSave({
      id: note?.id,
      title: title.trim(),
      content: content.trim()
    });
    
    // Reset form
    setTitle('');
    setContent('');
  };
  
  return (
    <div className="form-modal">
      <div className="form-container">
        <div className="form-header">
          <h2 className="form-title">
            {isEditing ? 'Edit Note' : 'Create New Note'}
          </h2>
          <button className="close-btn" onClick={onCancel} aria-label="Close form">
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="sr-only">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="content" className="sr-only">Content</label>
            <textarea
              id="content"
              placeholder="Note Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
