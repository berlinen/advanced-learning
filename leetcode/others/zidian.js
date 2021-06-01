class PrefixTreeNode {
  constructor(value) {
    // 存储子节点
    this.children = {}
    this.isEnd = null
    this.value = value
  }

  addWord(str) {
    const addWordHelper = (node, str) => {
        // 当前 node 不含当前 str 开头的目标
        if (!node.children[str[0]]) {
            // 以当前 str 开头的第一个字母，创建一个 PrefixTreeNode 实例
            node.children[str[0]] = new PrefixTreeNode(str[0])
            if (str.length === 1) {
                node.children[str[0]].isEnd = true
            }
            else if (str.length > 1) {
                addWordHelper(node.children[str[0]], str.slice(1))
            }
        }
    }
    addWordHelper(this, str)
  }
  // 给定一个字符串，返回字典树种以该字符串开头的所有单词
  predictWord(str) {
    let getRemainingTree = function(str, tree) {
      let node = tree
      while (str) {
        node = node.children[str[0]]
        str = str.substr(1)
      }
      return node
    }
    // 该数组维护所有以 str 开头的单词
    let allWords = []
    let allWordsHelper = function(stringSoFar, tree) {
      for (let k in tree.children) {
        const child = tree.children[k]
        let newString = stringSoFar + child.value
        if (child.endWord) {
          allWords.push(newString)
        }
        allWordsHelper(newString, child)
      }
    }
    let remainingTree = getRemainingTree(str, this)
    if (remainingTree) {
      allWordsHelper(str, remainingTree)
    }
    return allWords
  }


}

class PrefixTree extends PrefixTreeNode {
  constructor() {
    super(null)
  }
}