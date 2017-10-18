import 'isomorphic-fetch'

const JSONHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export const API_BASE = 'http://localhost:3001'

// Used for local data storage when 'localStorage' is unavailable
const memoryStore = {
  getItem(key, value) {
    return this[`_${key}`]
  },
  setItem(key, value) {
    this[`_${key}`] = value
  }
}

export const createUUID = () => {
  // http://www.ietf.org/rfc/rfc4122.txt
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

const storageAvailable = type => {
  try {
    var storage = window[type]
    var x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (error) {
    console.warn(
      "Your browser has disabled or does not support 'localStorage'.\n" +
        "Please enable 'localStorage' or switch to a browser that supports Web Storage\n" +
        'features to prevent potential issues while using this site.'
    )
    return false
  }
}

const dataStore = storageAvailable('localStorage') ? window.localStorage : memoryStore

const fetchToken = () => {
  let token = dataStore.getItem('token')
  if (!token) {
    token = Math.random().toString(36).substr(2)
    dataStore.setItem('token', token)
  }
  
  return token
}

export const serializeParams = params => {
  const searchParams = new URLSearchParams()

  for (let key of Object.keys(params)) {
    searchParams.set(key, params[key])
  }

  return searchParams.toString()
}

export const xhr = async (url, options) => {
  let headers = Object.assign({}, JSONHeaders)
  const token = fetchToken()

  if (options.searchParams) {
    url += '?' + serializeParams(options.searchParams)
    delete options.searchParams
  }

  if (token) {
    headers['Authorization'] = `${token}`
  }

  const res = await fetch(url, Object.assign({ headers }, options))

  // If status is 204, no body was sent and no need to parse body. Just return empty object.
  if (res.status === 204) {
    return {}
  }

  if (res.status >= 500) {
    /*
      We can grab the errors here and centrilize how we handle errors.
     */
    console.log('An error occurred...')
  }

  const json = await res.json()

  if (res.status >= 200 && res.status < 300) {
    return json
  }

  const error = new Error(res.statusText)
  error.status = res.status
  const defaultMessage = 'An error occurred. Please try again or contact support.'
  error.response = json.verbose || json.code || defaultMessage
  throw error
}
