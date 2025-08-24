import React from 'react'

interface SortSelectorProps {
  value: string
  onChange: (value: string) => void
}

const SortSelector: React.FC<SortSelectorProps> = ({ value, onChange }) => (
  <div>
    <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Ordenar por:</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: '8px 12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
      }}
      aria-label="Ordenar documentos"
    >
      <option value="title">Título</option>
      <option value="date">Data</option>
      <option value="author">Autor</option>
    </select>
  </div>
)

export default SortSelector
