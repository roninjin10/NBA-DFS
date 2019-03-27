import { ObjectWithValues } from './types'

type TrieChildren<T> = { [key in string]: (undefined | Trie<T>) }

export class Trie<T> {
  private readonly _children: TrieChildren<T> = {}
  private readonly _item: T | null = null

  get children(): Array<Trie<T>> {
    return Object.values(this._children)
  }

  get item(): T | null {
    return this._item
  }

  public readonly findNode = (word: string, startIndex = 0): Trie<T> | null => {
    if (startIndex >= word.length) {
      console.error('startIndex is greater than word length')
      return null
    }

    if (startIndex === word.length - 1) {
      return this
    }

    const nextNode = this._children[word[startIndex]]

    if (!nextNode) {
      return null
    }

    return nextNode
  }

  public readonly traverse = (cb: (node: Trie<T>) => void) => {
    cb(this)
    this.children.forEach(child => child.traverse(cb))
  }

  public readonly addItems = (items: ObjectWithValues<T>) =>
    Object.keys(items).forEach(word => this._addItem(items[word], word))

  public readonly findAllValues = (): T[] => {
    const allValues: T[] = []

    this.traverse(node => node.item && allValues.push(node.item))

    return allValues
  }

  private readonly _addItem = (item: T, word: string) => {
    const _word = word.toLowerCase()

    if (_word === '') {
      this._item = item
      return
    }

    const nextLetter = _word[0]
    const restOfWord = _word.slice(1)

    this._children[nextLetter] = this._children[nextLetter] || new Trie<T>()

    this._children[nextLetter]!._addItem(item, restOfWord)
  }
}
