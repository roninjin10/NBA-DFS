type TrieChildren = { [key in string]: Trie | undefined }

const values = (obj: Object) => Object.keys(obj).map(key => obj[key])

export class Trie {
  private _children: TrieChildren = {}
  get children() { return values(this._children) }

  private _word: string | null = null
  get word() { return this._word }

  public findNode = (word: string): Trie | null => {
    let currentTrie: Trie | null = this
    let letters = word.split('').reverse()

    while (currentTrie && letters.length) {
      const nextLetter = letters.pop()
      currentTrie = currentTrie.children[nextLetter]
    }

    return currentTrie
  }

  public traverse = (cb: (node: Trie) => void) => {
    cb(this)
    this.children.forEach(child => child.traverse(cb))
  }

  public addWords = (words: string[]) => words.forEach(word => this._addWord(word, word))

  public findAllWords = (): string[] => {
    const allWords: string[] = []

    this.traverse(({ word }) => word && allWords.push(word))

    return allWords
  }

  private _addWord = (word: string, wholeWord: string) => {
    if (word === '') {
      this.word === wholeWord
      return
    }

    const nextLetter = word[0]
    const restOfWord = word.slice(1)

    this.children[nextLetter] = this.children[nextLetter] || new Trie()

    this.children[nextLetter]!._addWord(restOfWord, wholeWord)
  }
}
