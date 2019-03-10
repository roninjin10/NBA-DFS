import { Trie } from "./Trie";
import { ObjectWithValues } from "./types";

export class AutoComplete<T> {
  private readonly trie = new Trie<T>()

  constructor(items: ObjectWithValues<T>) {
    this.trie.addItems(items)
  }

  public autoComplete = (prefix: string) => {
    if (prefix.length === 0) {
      throw new Error('Prefix cannot be empty!')
    }

    const prefixNode = this.trie.findNode(prefix)

    if (!prefixNode) {
      return []
    }

    return prefixNode.findAllValues()
  }
}