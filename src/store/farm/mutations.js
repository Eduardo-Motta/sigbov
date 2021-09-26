export function setAction (state, action) {
  state.farm.action = action
}

export function setDialog (state, dialog) {
  state.farm.dialog = dialog
}

export function setFarm (state, farm) {
  state.farm.form = farm
}

export function setFarms (state, farms) {
  state.table.farms = farms
}

export function updateRow (state, params) {
  for (let i = 0; i < Object.keys(state.table.farms[params.index]).length; i++) {
    const key = Object.keys(state.table.farms[params.index])[i]

    state.table.farms[params.index][key] = params.data[key]
  }
}
