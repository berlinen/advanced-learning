// 示例 1：

// 输入：strs = ["flower","flow","flight"]
// 输出："fl"
// 示例 2：

// 输入：strs = ["dog","racecar","car"]
// 输出：""
// 解释：输入不存在公共前缀。


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/longest-common-prefix
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// 最长公共前缀【双指针】

const strs = ["flower","flow","flight"]

function logestCommonPrefix(strs) {
  if(strs.length === 0) return "";
  let first = strs[0];
  if(first === '') return "";
  let minLen = Number.MAX_SAFE_INTEGER;
  for(let i = 0; i < strs.length; i++) {
    const len = twoStrLongestCommonPrefix(first, strs[i]);
    minLen = Math.min(len, minLen);
  }
  return first.slice(0, minLen);
}

function twoStrLongestCommonPrefix(s, t) {
  console.log('s====', s)
  console.log('t====', t)
  let i = 0;
  let j = 0;
  let cnt = 0;
  while(i < s.length && j < t.length) {
    console.log(s[i], t[j], cnt);
    if(s[i] === t[j]) {
      cnt++;
    } else {
      return cnt;
    }
    i++;
    j++;
  }
  return cnt;
}

console.log('==', logestCommonPrefix(strs))