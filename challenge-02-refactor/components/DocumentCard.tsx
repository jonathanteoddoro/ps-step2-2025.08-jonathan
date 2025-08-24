import React from 'react'

interface Document {
  title: string
  content: string
  tags: string[]
  author: string
  createdAt: string
  category: string
}

interface DocumentCardProps {
  doc: Document
  getCategoryColor: (category: string) => string
  formatDate: (dateString: string) => string
}

const DocumentCard: React.FC<DocumentCardProps> = ({ doc, getCategoryColor, formatDate }) => (
  <div
    style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: '#fafafa',
      transition: 'transform 0.2s',
      cursor: 'pointer',
    }}
    tabIndex={0}
    aria-label={`Documento: ${doc.title}`}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
      <h3 style={{ margin: '0', color: '#333' }}>{doc.title}</h3>
      <span
        style={{
          padding: '4px 8px',
          borderRadius: '4px',
          backgroundColor: getCategoryColor(doc.category),
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
      >
        {doc.category.toUpperCase()}
      </span>
    </div>
    <p style={{ color: '#666', marginBottom: '15px' }}>{doc.content}</p>
    <div style={{ marginBottom: '10px' }}>
      {doc.tags.map((tag) => (
        <span
          key={tag}
          style={{
            display: 'inline-block',
            padding: '4px 8px',
            borderRadius: '12px',
            background: '#e7f3ff',
            color: '#007bff',
            fontSize: '12px',
            marginRight: '6px',
          }}
        >
          {tag}
        </span>
      ))}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#888' }}>
      <span>{doc.author}</span>
      <span>{formatDate(doc.createdAt)}</span>
    </div>
  </div>
)

export default DocumentCard
