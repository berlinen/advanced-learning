// 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。

// 进阶：

// 你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？
//  

// 示例 1：


// 输入：head = [4,2,1,3]
// 输出：[1,2,3,4]
// 示例 2：


// 输入：head = [-1,5,3,4,0]
// 输出：[-1,0,3,4,5]
// 示例 3：

// 输入：head = []
// 输出：[]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/sort-list
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

var head = {
  val: -1,
  next: {
    val: 5,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 0,
          next: null
        }
      }
    }
  }
}

function sortList(head) {
  if(head === null) return null;
  let newHead = head;
  return mergeSort(head);
}

function mergeSort(head) {
  if(head.next !== null) {
    let slower = getCenter(head);
    let nxt = slower.next;
    slower.next = null;
    console.log(head, slower, nxt);
    const left = mergeSort(head);
    const right = mergeSort(nxt);
    head = merge(left, right);
  }
  return head;
}

function merge(left, right) {
  let newHead = null;
  let head = null;
  while(left !== null && right !== null) {
    if(left.val < right.val) {
      if(!head) {
        newHead = left;
        head = left;
      } else {
        newHead.next = left;
        newHead = newHead.next;
      }
      left = left.next;
    } else {
      if(!head) {
        newHead = right;
        head = right;
      } else {
        newHead.next = right;
        newHead = newHead.next;
      }
      right = right.next;
    }
  }
  newHead.next = left ? left : right;
  return head;
}

function getCenter(head) {
  let slower = head;
  let faster = head.next;
  while(faster !== null && faster.next !== null) {
    slower = slower.next;
    faster = faster.next.next;
  }
  return slower;
}
console.log('========', sortList(head))