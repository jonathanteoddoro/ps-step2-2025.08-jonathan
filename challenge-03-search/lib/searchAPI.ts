import mockData from './mockData.json'

export type SearchResult = {
    id: string
    title: string
    content: string
    category: 'documentation' | 'api' | 'wiki' | 'slack' | 'email'
    source: string
    score: number
    snippet: string
    timestamp: string
    author?: string
}

const mockResults: SearchResult[] = mockData as SearchResult[]

const normalizeText = (text: string): string => {
    if (!text) return ''
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}

function levenshteinDistance(a: string, b: string): number {
    if (a.length === 0) return b.length
    if (b.length === 0) return a.length
    const matrix = Array(a.length + 1)
        .fill(null)
        .map(() => Array(b.length + 1).fill(null))
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j
    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, 
                matrix[i][j - 1] + 1, 
                matrix[i - 1][j - 1] + cost, 
            )
        }
    }
    return matrix[a.length][b.length]
}

export async function searchKnowledge(query: string, limit = 10): Promise<SearchResult[]> {
    if (!query.trim()) {
        return []
    }

    const normalizedQuery = normalizeText(query)
    const queryTerms = normalizedQuery.split(/\s+/).filter(Boolean)

    const totalDocs = mockResults.length

    const docFrequency: Record<string, number> = {}
    for (const term of queryTerms) {
        let count = 0
        for (const result of mockResults) {
            const normalizedTitle = normalizeText(result.title)
            const normalizedContent = normalizeText(result.content)
            if (normalizedTitle.includes(term) || normalizedContent.includes(term)) {
                count++
            }
        }
        docFrequency[term] = count
    }

    const scoredResults = mockResults
        .map((result) => {
            let totalScore = 0

            const normalizedTitle = normalizeText(result.title)
            const normalizedContent = normalizeText(result.content)

            for (const term of queryTerms) {
                const df = docFrequency[term] || 1
                const idf = Math.log(totalDocs / df)

                const titleMatches = (normalizedTitle.match(new RegExp(term, 'g')) || []).length
                const contentMatches = (normalizedContent.match(new RegExp(term, 'g')) || []).length

                totalScore += (titleMatches * 3 + contentMatches * 1) * idf

                const titleWords = normalizedTitle.split(/\s+/)
                const contentWords = normalizedContent.split(/\s+/)

                for (const word of titleWords) {
                    const distance = levenshteinDistance(term, word)
                    if (distance > 0 && distance <= 2) {
                        totalScore += (1 / distance) * 1.5 * idf
                    }
                }
                for (const word of contentWords) {
                    const distance = levenshteinDistance(term, word)
                    if (distance > 0 && distance <= 2) {
                        totalScore += (1 / distance) * idf
                    }
                }
            }

            return { ...result, score: totalScore }
        })
        .filter((result) => result.score > 0)

    return scoredResults.sort((a, b) => b.score - a.score).slice(0, limit)
}


// SUAS TAREFAS:
// Calcular score baseado em frequência do termo
// Título 3x mais relevante que conteúdo
// Normalizar acentos: "nao" encontra "não"
// Fuzzy matching: "buca" encontra "busca"
// Performance para grandes volumes, quais estratégias?
