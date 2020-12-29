// (add 2 (subtract 40 2))
// add(2, subtract(4, 2))

// 分词
function generateToken(str: string) {
  let current = 0;
  let tokens = [];

  while(current < str.length) {
    let char = str[current];

    if(char === '(') {
      tokens.push({
        type: 'paren',
        value: '('
      });
      current++;
      continue;
    }

    if(char === ')') {
      tokens.push({
        type: 'paren',
        value: ')'
      })
      current++;
      continue;
    }

    if (/\s/.test(char)) {
      current++;
      continue;
    }

    if (/[0-9]/.test(char)) {
      let numberValue = '';
      while(/[0-9]/.test(char)) {
        numberValue += char;
        char = str[++current];
      }
      tokens.push({
        type: 'number',
        value: numberValue
      });
      continue;
    }

   if (/[a-z]/.test(char)) {
      let stringValue = '';
      while(/[a-z]/.test(char)) {
        stringValue += char;
        char = str[++current];
      }
      tokens.push({
        type: 'name',
        value: stringValue
      });
      continue;
    }

    throw new TypeError("未能识别的字符");
  }

  return tokens;
}


let str = generateToken("(add 2 (subtract 40 2))")
console.log(str)