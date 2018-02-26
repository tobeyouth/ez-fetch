import json2string from '.json2string'

export function urlWitlQuery(url, query, encode=false) {
  let originWithPath = url.split('?').shift()
  let oldQuery = getQuery(url)
  let paramsObj = Object.assign(oldQuery, query)
  let params = json2string(paramsObj, encode)

  return originWithPath + '?' + params
}

export function getQuery(url=window.location.href, name) {
  let query = url.indexOf('?') > 0 ? url.split('?').pop() : window.location.search.substring(1)
  let vars = query.split('&')
  let result = {}

  for (let i = 0,len = vars.length;i < len;i++) {
    let pair = vars[i].split('=');
    if (name && pair[0] === name) {
      return pair[1]
    }
    if (pair[0]) {
      result[pair[0]] = pair[1]
    }
  }

  if (name && !Object.keys(result).includes(name)) {
    return null
  }

  return result
}

