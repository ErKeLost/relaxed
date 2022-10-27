export function groupBy(array, id, isArray) {
  let groups = {}
  array.forEach(function (o) {
    let group = JSON.stringify(o[id])
    groups[group] = groups[group] || []
    groups[group].push(o)
  })
  if (isArray) {
    return Object.values(groups)
  }
  return groups
}
