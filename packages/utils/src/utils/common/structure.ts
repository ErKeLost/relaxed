export function arrayToTree(arr, parentId) {
  function loop(parentId) {
    return arr.reduce((pre, cur) => {
      if (cur.parentId === parentId) {
        cur.children = loop(cur.id)
        pre.push(cur)
      }

      return pre
    }, [])
  }
  return loop(parentId)
}
