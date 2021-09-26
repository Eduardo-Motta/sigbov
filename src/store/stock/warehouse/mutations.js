export function setAction (state, action) {
  state.warehouse.action = action
}

export function setDialog (state, dialog) {
  state.warehouse.dialog = dialog
}

export function setWarehouse (state, warehouse) {
  state.warehouse.form = warehouse
}

export function setWarehouses (state, warehouses) {
  state.table.warehouses = warehouses
}

export function updateRow (state, params) {
  for (let i = 0; i < Object.keys(state.table.warehouses[params.index]).length; i++) {
    const key = Object.keys(state.table.warehouses[params.index])[i]

    state.table.warehouses[params.index][key] = params.data[key]
  }
}
