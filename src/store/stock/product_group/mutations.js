export function setAction (state, action) {
  state.productGroup.action = action
}

export function setDialog (state, dialog) {
  state.productGroup.dialog = dialog
}

export function setProductGroup (state, productGroup) {
  state.productGroup.form = productGroup
}

export function setProductsGroup (state, productsGroup) {
  state.table.productsGroup = productsGroup
}

export function updateRow (state, params) {
  for (let i = 0; i < Object.keys(state.table.productsGroup[params.index]).length; i++) {
    const key = Object.keys(state.table.productsGroup[params.index])[i]

    state.table.productsGroup[params.index][key] = params.data[key]
  }
}
