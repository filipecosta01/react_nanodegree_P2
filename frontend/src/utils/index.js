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
    token = JSON.parse(Math.random().toString(36).substr(2))
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
