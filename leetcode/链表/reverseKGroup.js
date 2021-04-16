// K 个一组翻转链表（困难）

// 输入：head = [1,2,3,4,5], k = 2
// 输出：[2,1,4,3,5]
// 示例 2：


// 输入：head = [1,2,3,4,5], k = 3
// 输出：[3,2,1,4,5]
// 示例 3：

// 输入：head = [1,2,3,4,5], k = 1
// 输出：[1,2,3,4,5]
// 示例 4：

// 输入：head = [1], k = 1
// 输出：[1]

const head = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: null
        }
      }
    }
  }
}

// function reverseGroup(head, k) {
//   let a = head; b = head;
//   for(let i = 0; i < k; i++) {
//     if(b === null) return head;
//     b = b.next;
//   }
//   const newHead = reverse(a, b);
//   a.next = reverseGroup(b, k);
//   return newHead;
// }

// function reverse(a, b) {
//   let prev = null;
//   let cur = a, nxt = b;
//   while (cur !== b) {
//     nxt = cur.next;
//     cur.next = prev;
//     prev = cur;
//     cur = nxt;
//   }
//   return prev
// }

function reverseGroup(head, k) {
  let a = head;
  let b = head;
  for(let i = 0; i < k; i++) {
    if(b === null) return head;
    b = b.next;
  }
  const newHead = reverse(a, b);
  a.next = reverseGroup(b, k);
  return newHead;
}


function reverse(a, b) {
  let prev = null, cur = a, nxt = b;
  while (cur !== b) {
    nxt = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nxt;
  }
  return prev;
}

console.log(reverseGroup(head, 2))