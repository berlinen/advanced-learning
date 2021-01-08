function isArray(obj) {
  Array.isArray ? Array.isArray(obj) : Object.prototype.toString.call(obj) === '[object Array]'
}

function isObject(obj) {
  let type = typeof obj;
  return type === 'function' || type === 'object' && ！!obj
}