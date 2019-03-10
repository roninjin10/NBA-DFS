import { Trie } from "./Trie";

export class AutoComplete {
  private readonly trie = new Trie()

  public addWords = (wordList: string[]) => this.trie.addWords(wordList)

  public autoComplete = (prefix: string) => {
    if (prefix.length === 0) {
      throw new Error('Prefix cannot be empty!')
    }

    const prefixNode = this.trie.findNode(prefix)

    if (!prefixNode) {
      return []
    }

    return prefixNode.findAllWords()
  }
}