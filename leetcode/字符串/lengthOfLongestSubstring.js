// 示例 1:

// 输入: s = "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 示例 2:

// 输入: s = "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 示例 3:

// 输入: s = "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
// 示例 4:

// 输入: s = ""
// 输出: 0

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// 无重复字符的最长子串【双指针】

let str = "pwwkew"

function lengthOfLongestSubstring(s) {
  let window = {};
  let left = 0;
  let right = 0;
  let maxLen = 0;
  let maxStr = '';
  while(right < s.length) {
    let c = s[right]
    right++;
    if(window[c]) window[c]++
    else window[c] = 1;
    console.log('window c',  window)
    while(window[c] > 1) {
      let d = s[left];
      left++;
      window[d]--
    }
    if(maxLen < right - left) {
      maxLen = right - left;
    }
  }
  return maxLen;
}

console.log('===', lengthOfLongestSubstring(str))