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
  if(window.location.pathname.startsWith('/search')) {
    index = 1
  } else if(window.location.pathname.startsWith('/create')){
    index = 2
  } else if(window.location.pathname.startsWith('/saved')){
    index = 3
  } else if(window.location.pathname.startsWith('/profile')){
    index = 4
  }
  
  return index
}
