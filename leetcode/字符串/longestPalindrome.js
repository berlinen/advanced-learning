// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。
// 示例 2：

// 输入：s = "cbbd"
// 输出："bb"
// 示例 3：

// 输入：s = "a"
// 输出："a"
// 示例 4：

// 输入：s = "ac"
// 输出："a"

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/longest-palindromic-substring
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

let str = "baaacd";

function longestPalindrome(s) {
  if(s.length <= 1) return s;
  let maxStr = '';
  let maxRes = 0;
  for(let i = 0; i < s.length; i++) {
    let str1 = palindrome(s, i, i);
    let str2 = palindrome(s, i, i+1);
    if(str1.length > maxRes) {
      maxRes = str1.length;
      maxStr = str1;
    }
    if(str2.length > maxRes) {
      maxRes = str2.length;
      maxStr = str2;
    }
  }
  return maxStr;
}

function palindrome(s, l, r) {
  while(l >= 0 && r < s.length && s[l] === s[r]) {
    l--;
    r++
  }
  return s.slice(l+1, r);
}

console.log('====', longestPalindrome(str))