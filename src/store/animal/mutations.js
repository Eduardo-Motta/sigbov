export function setAction (state, action) {
  state.animal.action = action
}

export function setDialog (state, dialog) {
  state.animal.dialog = dialog
}

export function setAnimal (state, animal) {
  state.animal.form = animal
}

export function setAnimals (state, animals) {
  state.table.animals = animals
}

export function updateRow (state, params) {
  for (let i = 0; i < Object.keys(state.table.animals[params.index]).length; i++) {
    const key = Object.keys(state.table.animals[params.index])[i]

    state.table.animals[params.index][key] = params.data[key]
  }
}

export function setAnimalWeighings (state, weighings) {
  state.animal.weighings.data = weighings
}
