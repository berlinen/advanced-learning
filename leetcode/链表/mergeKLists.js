// 给你一个链表数组，每个链表都已经按升序排列。

// 请你将所有链表合并到一个升序链表中，返回合并后的链表。

//  

// 示例 1：

// 输入：lists = [[1,4,5],[1,3,4],[2,6]]
// 输出：[1,1,2,3,4,4,5,6]
// 解释：链表数组如下：
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// 将它们合并到一个有序链表中得到。
// 1->1->2->3->4->4->5->6
// 示例 2：

// 输入：lists = []
// 输出：[]
// 示例 3：

// 输入：lists = [[]]
// 输出：[]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/merge-k-sorted-lists
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
const lists = [
  {
    val: 1,
    next: {
      val: 4,
      next: {
        val: 5,
        next: null
      }
    }
  },
  {
    val: 1,
    next: {
      val: 3,
      next: {
        val: 4,
        next: null
      }
    }
  },
  {
    val: 2,
    next: {
      val: 6,
      next: null
    }
  },
]

// function mergeKLists(lists) {
//   if(lists.length === 0) return null;
//   return mergeArr(lists);
// }

// function mergeArr(lists) {
//   if(lists.length <= 1) return lists[0];
//   let index = Math.floor(lists.length / 2);
//   const left = mergeArr(lists.slice(0, index));
//   const right = mergeArr(lists.slice(index));
//   return merge(left, right);
// }

// function merge(l1, l2) {
//   if(l1 === null && l2 === null) return null;
//   if(l1 !== null && l2 === null) return l1;
//   if(l1 === null && l2 !== null) return l2;
//   let newHead = null, head = null;
//   while(l1 !== null && l2 !== null) {
//     if(l1.val < l2.val) {
//       if(!head) {
//         newHead = l1;
//         head = l1;
//       } else {
//         newHead.next = l1;
//         newHead = newHead.next;
//       }
//       l1 = l1.next;
//     } else {
//       if(!head) {
//         newHead = l2;
//         head = l2;
//       } else {
//         newHead.next = l2;
//         newHead = newHead.next;
//       }
//       l2 = l2.next;
//     }
//   }
//   newHead.next = l1 ? l1 : l2;
//   return head;
// }

function mergeKLists(lists) {
  if(lists.length === 0) return null;
  return mergeArr(lists)
}

function mergeArr(lists) {
  if(lists.length <= 1) return lists[0];
  let index = Math.floor(lists.length / 2);
  let left = mergeArr(lists.slice(0, index));
  let right = mergeArr(lists.slice(index));
  return merge(left, right);
}

function merge(l1, l2) {
  if(l1 === null && l2 === null) return null;
  if(l1 !== null && l2 === null) return l1;
  if(l1 === null && l2 !== null) return l2;
  let newHead = null, head = null;
  while(l1 !== null && l2 !== null) {
    if(l1.val < l2.val) {
      if(!head) {
        newHead = l1;
        head = l1
      } else {
        newHead.next = l1;
        newHead = newHead.next
      }
      l1 = l1.next;
    } else {
      if(!head) {
        newHead = l2;
        head = l2;
      } else {
        newHead.next = l2;
        newHead = newHead.next
      }
      l2 = l2.next
    }
  }
  newHead.next = l1 ? l1 : l2;
  return head;
}

console.log(mergeKLists(lists))