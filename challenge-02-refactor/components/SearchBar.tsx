import React from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <div>
    <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Buscar:</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Digite para buscar..."
      style={{
        padding: '8px 12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        width: '250px',
      }}
      aria-label="Buscar documentos"
    />
  </div>
)

export default SearchBar
