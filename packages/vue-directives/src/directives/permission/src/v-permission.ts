const permission = (
  el: HTMLElement,
  permission: string,
  systemPermission: string[]
) => {
  if (permission && !systemPermission.includes(permission)) {
    el.parentNode && el.parentNode.removeChild(el)
  }
}
export { permission }
