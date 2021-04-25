// 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

// 注意：如果 s 中存在这样的子串，我们保证它是唯一的答案。

//  

// 示例 1：

// 输入：s = "ADOBECODEBANC", t = "ABC"
// 输出："BANC"
// 示例 2：

// 输入：s = "a", t = "a"
// 输出："a"
//  

// 提示：

// 1 <= s.length, t.length <= 105
// s 和 t 由英文字母组成
//  

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/minimum-window-substring
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

let s = "ADOBECODEBANC", t = "ABC";

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
 var minWindow = function(s, t) {
  let need = {}, window = {};
  for (let c of t) {
      if (!need[c]) need[c] = 1;
      else need[c]++;
  }
  let left = 0, right = 0;
  let valid = 0, len = Object.keys(need).length;
  let minLen = s.length + 1, minStr = '';
  while (right < s.length) {
      const d = s[right];
      right++;
      if (!window[d]) window[d] = 1;
      else window[d]++;
      if (need[d] && need[d] === window[d]) {
          valid++;
      }
      console.log('left - right', left, right);
      while (valid === len) {
          if (right - left < minLen) {
              minLen = right - left;
              minStr = s.slice(left, right);
          }
          console.lo
          let c = s[left];
          left++;
          window[c]--;
          if (need[c] && window[c] < need[c]) {
              valid--;
          }
      }
  }
  return minStr;
};

console.log(minWindow(s, t))
