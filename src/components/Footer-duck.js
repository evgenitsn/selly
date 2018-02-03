const SELECT_NAVBAR_OPTION = 'SELECT_NAVBAR_OPTION'

const initialState = {
  selectedOption: initialNavBarSelectedItem()
}

export const footerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_NAVBAR_OPTION:
      return { ...state, selectedOption: action.payload }
    default:
      return state
  }
}

export function changeNavBarOption(index) {
  return {
    type: SELECT_NAVBAR_OPTION,
    payload: index
  }
}

function initialNavBarSelectedItem() {
  let index = 0
  switch (window.location.pathname) {
    case '/search':
      index = 1
      break
    case '/create':
      index = 2
      break
    case '/saved':
      index = 3
      break
    case '/profile':
      index = 4
      break
    default:
      index = 0
      break
  }
  return index
}
