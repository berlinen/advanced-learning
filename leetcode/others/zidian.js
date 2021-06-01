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

}

class PrefixTree extends PrefixTreeNode {
  constructor() {
    super(null)
  }
}