// 反转一个单链表。

// 示例:

// 输入: 1->2->3->4->5->NULL
// 输出: 5->4->3->2->1->NULL
const head = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: null
    }
  }
}

let a = {
  val: 4,
  next: null
}



// function reverseList(head) {
//   if(head === null || head.next === null) return head;
//   let last = reverseList(head.next);
//   head.next.next = head;
//   head.next = null
//   return last;
// }
// console.log(reverseList(head))

function reverseList2(head) {
  if(head === null || head.next === null) return head;
  let last = reverseList2(head.next);
  head.next.next = head;
  head.next = null;
  return last;
}

console.log(reverseList2(head))