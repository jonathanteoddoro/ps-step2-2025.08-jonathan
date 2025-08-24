import React from 'react'

interface TagSelectorProps {
  tags: string[]
  selectedTags: string[]
  onToggle: (tag: string) => void
}

const TagSelector: React.FC<TagSelectorProps> = ({ tags, selectedTags, onToggle }) => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    {tags.map((tag) => (
      <button
        key={tag}
        onClick={() => onToggle(tag)}
        style={{
          padding: '4px 8px',
          border: selectedTags.includes(tag) ? '2px solid #007bff' : '1px solid #ddd',
          borderRadius: '20px',
          background: selectedTags.includes(tag) ? '#e7f3ff' : 'white',
          cursor: 'pointer',
          fontSize: '12px',
        }}
        aria-pressed={selectedTags.includes(tag)}
        aria-label={`Filtrar por tag: ${tag}`}
      >
        {tag}
      </button>
    ))}
  </div>
)

export default TagSelector
