import netlifyIdentity from 'netlify-identity-widget'

export function openAuth() {
  netlifyIdentity.open()
}

export function currentUser() {
  return netlifyIdentity.currentUser()
}

export default netlifyIdentity
