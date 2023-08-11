export default ((r) => {
  const cache = {}
  Object.keys(r).forEach((key) => {
    const apis = r[key]
    Object.keys(apis).forEach((name) => {
      if (cache[name]) {
        throw new Error(`Api '${name}' conflict in '${key}'!`)
      }
      cache[name] = apis[name]
    })
  })
  return cache
})(import.meta.glob('./list/*.js', { eager: true }))
