export function setAction (state, action) {
  state.pasture.action = action
}

export function setDialog (state, dialog) {
  state.pasture.dialog = dialog
}

export function setPasture (state, pasture) {
  state.pasture.form = pasture
}

export function setPastures (state, pastures) {
  state.table.pastures = pastures
}

export function updateRow (state, params) {
  for (let i = 0; i < Object.keys(state.table.pastures[params.index]).length; i++) {
    const key = Object.keys(state.table.pastures[params.index])[i]

    state.table.pastures[params.index][key] = params.data[key]
  }
}
