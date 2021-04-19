// 给定一个链表，判断链表中是否有环。

// 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

// 如果链表中存在环，则返回 true 。 否则，返回 false 。

//  

// 进阶：

// 你能用 O(1)（即，常量）内存解决此问题吗？

//  

// 示例 1：



// 输入：head = [3,2,0,-4], pos = 1
// 输出：true
// 解释：链表中有一个环，其尾部连接到第二个节点。
// 示例 2：



// 输入：head = [1,2], pos = 0
// 输出：true
// 解释：链表中有一个环，其尾部连接到第一个节点。
// 示例 3：



// 输入：head = [1], pos = -1
// 输出：false
// 解释：链表中没有环。

const head = {
  val: 3,
  next: {
    val: 2,
    next: {
      val: 0,
      next: {
        val: -4,
        next: null
      }
    }
  }
}

function hasCycle(head) {
  if (head == null || head.next == null) return false;
  let slower = head, faster = head;
  while (faster !== null && faster.next !== null) {
      slower = slower.next;
      faster = faster.next.next;
      if (slower === faster) return true;
  }
  return false;
}

console.log(hasCycle(head))