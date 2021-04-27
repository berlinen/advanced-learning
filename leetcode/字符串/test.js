const str = "abc.def.ghk.i";

function clac(str) {
  let feedback = [];
  if(typeof str !== 'string') return [];
  if(!str.includes('.')) return [str];
  const strArr = str.split('.');
  strArr.pop();
  let prev = '';
  for(let i = 0; i < strArr.length; i++) {
    let subStr = i === 0 ? `${strArr[i]}` : `.${strArr[i]}`
    prev =  prev + subStr
    feedback.push(prev)
  }
  return feedback;
}

clac(str)