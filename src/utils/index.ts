export const getSessionStorage = (keyname: string) => {
  const value = sessionStorage.getItem(keyname)
  try {
    if (value && typeof JSON.parse(value) === 'object') {
      return JSON.parse(value)
    } else {
      return value
    }
  } catch (e) {
    return value
  }
}

export const setSessionStorage = (keyname: string, value: any) => {
  if(!value) {
    sessionStorage.removeItem(keyname)
  }
  if (typeof value === 'string') {
    sessionStorage.setItem(keyname, value)
  } else if (value instanceof Object) {
    sessionStorage.setItem(keyname, JSON.stringify(value))
  }
}