import { ObjectWithValues } from "./types";

type TrieChildren<T> = { [key in string]: Trie<T> }

export class Trie<T> {
  private readonly _children: TrieChildren<T> = {}
  private _item: T | null = null

  get children(): Trie<T>[] {
    return Object.values(this._children)
  }

  get item(): T | null {
    return this._item
  }

  public findNode = (word: string): Trie<T> | null => {
    const letterStack = word.split('').reverse()

    let currentTrie: Trie<T> | null = this

    while (currentTrie && letterStack.length) {
      currentTrie = currentTrie._children[letterStack.pop() as string]
    }

    return currentTrie
  }

  public traverse = (cb: (node: Trie<T>) => void) => {
    cb(this)
    this.children.forEach(child => child.traverse(cb))
  }

  public addItems = (items: ObjectWithValues<T>) => Object.keys(items).forEach(word => this._addItem(items[word], word))

  public findAllValues = (): T[] => {
    const allValues: T[] = []

    this.traverse(({ item }) => item && allValues.push(item))

    return allValues
  }

  private _addItem = (item: T, word: string) => {
    if (word === '') {
      this._item === item
      return
    }

    const nextLetter = word[0]
    const restOfWord = word.slice(1)

    this._children[nextLetter] = this._children[nextLetter] || new Trie<T>()

    this._children[nextLetter]!._addItem(item, restOfWord)
  }
}
