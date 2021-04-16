// 示例 1:
// 输入: 1->2
// 输出: false

// 示例 2:
// 输入: 1->2->3->3->2->1

// 输出: true
let head = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 3,
        next: {
          val: 2,
          next: {
            val: 1,
            next: null
          }
        }
      }
    }
  }
}


// function findCenter(head) {
//   let slower = head;
//   let faster = head;
//   while(faster && faster.next !== null) {
//     slower = slower.next;
//     faster = faster.next.next;
//   }
//   // 如果 faster 不等于 null，说明是奇数个，slower 再移动一格
//   if(faster !== null) {
//     slower = slower.next;
//   }
//   return slower;
// }

// function reverse(head) {
//   let prev = null, cur = head, nxt = head;
//   while(cur !== null) {
//     nxt = cur.next;
//     cur.next = prev;
//     prev = cur;
//     cur = nxt;
//   }
//   return prev;
// }

// function isPalindrome(head) {
//   // 反转 slower 链表
//   let right = reverse(findCenter(head));
//   let left = head;
//   // 开始比较
//   while(right !== null) {
//     if(left.val !== right.val) {
//       return false;
//     }
//     left = left.next;
//     right = right.next;
//   }
//   return true;
// }

// console.log(isPalindrome(head))



function findCenter2(head) {
  let slower = head, faster = head;
  while(faster && faster.next !== null) {
    slower = slower.next;
    faster = faster.next.next
  }
  if(faster !== null) {
    slower = slower.next;
  }
  return slower;
}

function reverse2(head) {
  let prev = null, cur = head, nxt = head;
  while (cur !== null) {
    nxt = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nxt;
  }
  return prev;
}

function isPailindrome2(head) {
  // 获取右边
  let right = reverse2(findCenter2(head));
  let left = head;
  while(right !== null) {
    if(right.val !== left.val) {
      return false;
    }
    left = left.next;
    right = right.next
  }
  return true;
}

console.log('2', isPailindrome2(head))