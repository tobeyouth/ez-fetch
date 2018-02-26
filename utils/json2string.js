export default (str) => {
  let vars = str.split('&')
  let result = {}

  if (!str || typeof(str) !== 'string') {
    return str
  }

  for (let i = 0,len = vars.length;i < len;i++) {
    let pair = vars[i].split('=');
    if (pair[0] === name) {
      return pair[1]
    }
    result[pair[0]] = pair[1]
  }

  return result
}

