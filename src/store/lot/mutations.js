export function setAction (state, action) {
  state.lot.action = action
}

export function setDialog (state, dialog) {
  state.lot.dialog = dialog
}

export function setLot (state, lot) {
  state.lot.form = lot
}

export function setLots (state, lots) {
  state.table.lots = lots
}

export function updateRow (state, params) {
  for (let i = 0; i < Object.keys(state.table.lots[params.index]).length; i++) {
    const key = Object.keys(state.table.lots[params.index])[i]

    state.table.lots[params.index][key] = params.data[key]
  }
}
