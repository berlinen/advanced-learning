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

function isPalindrome(head) {
 let left = head;
 function traverse(right) {
  if(right === null) return true;
  let res = traverse(right.next);
  res = res && (right.val === left.val);
  left = left.next;
  return res;
 }
 return traverse(head);
}

console.log(isPalindrome(head))