import React from 'react'

interface CategoryFilterProps {
  value: string
  onChange: (value: string) => void
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ value, onChange }) => (
  <div>
    <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Categoria:</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: '8px 12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
      }}
      aria-label="Filtrar por categoria"
    >
      <option value="all">Todas</option>
      <option value="docs">Documentação</option>
      <option value="wiki">Wiki</option>
      <option value="api">API</option>
    </select>
  </div>
)

export default CategoryFilter
