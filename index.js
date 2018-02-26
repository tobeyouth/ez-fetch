import 'whatwg-fetch'
import json2string from './utils/json2string'
import { urlWithQuery } from './utils/url-parse'

const METHODS = ['post', 'get', 'put', 'delete']

const ContentTypes = {
  'form': 'application/x-www-form-urlencoded; charset=UTF-8',
  'json': 'application/json; charset=utf-8',
}

const DEFAULT_HEADER = {
  'Accept': 'application/json',
  'Content-Encoding': 'gzip',
  'Content-Type': ContentTypes['form']
}
const DATATYPES = ['text', 'json', 'blob', 'arrayBuffer', 'formData']
const DEFAULT_REQUSET_CONFIG = {
  'mode': 'cors',
  'credentials': 'include',
  'cache': 'no-cache'
}

function FetchGen(method) {

  if (!METHODS.indexOf(method) < 0) {
    throw new Error(`method error,it must one of:${METHODS.join(',')}`)
    return false
  }

  return function (url, params, restParams, customHeader,
                   otherConfig=DEFAULT_REQUSET_CONFIG,
                   dataType='json', originResponse=false) {

    let _url = url

    try {
      if (process.env.NODE_ENV === 'test') {
        _url = url
      }
    } catch (e) {}

    if (restParams) {
      Object.keys(restParams).map( (key) => {
        let re = new RegExp(':'+key,'gi')
        _url = _url.replace(re,restParams[key])
      })
    }

    let default_header = { ...DEFAULT_HEADER }
    let headers = Object.assign({}, default_header, customHeader)

    if (Object.prototype.toString.call(params) === '[object FormData]') {
      delete headers['Content-Type']
    }

    if (method === 'get') {
      _url = urlWithQuery(_url, params, true)
    }


    let config = {
      'method': method.toUpperCase(),
      'headers': headers,
      'mode': otherConfig.mode,
      'credentials': otherConfig.credentials,
      'cache': otherConfig.cache,
    }


    if (method !== 'get' && method !== 'head') {
      if (headers['Content-Type'] == ContentTypes['json']) {
        config['body'] = JSON.stringify(params)
      } else {
        config['body'] = parseBody(params)
      }
    }

    let request = new Request(_url, config)
    return fetch(request).then((res) => {
      if (originResponse) {
        return res
      }
      if (DATATYPES.indexOf(dataType) >= 0) {
        return res[dataType]()
      }
      return res.json()
    })
  }

}

function parseBody(body) {
  let type = Object.prototype.toString.call(body)
  if (type === '[object Object]') {
    return json2string(body, false, true)
  }
  return body
}

export default {
  'get': FetchGen('get'),
  'post': FetchGen('post'),
  'put': FetchGen('put'),
  'delete': FetchGen('delete')
}


