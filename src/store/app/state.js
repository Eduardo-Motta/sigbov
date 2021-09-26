export default function () {
  return {
    session: localStorage.getItem('sigbov:token') ? JSON.parse(atob(localStorage.getItem('sigbov:token').split('.')[1])) : {}
  }
}
