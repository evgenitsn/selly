const CHANGE_HEADER_TITLE = 'CHANGE_HEADER_TITLE'

const initialState = {
  headerTitle: initialHeaderTitle()
}

export const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_HEADER_TITLE:
      return { ...state, headerTitle: action.payload }
    default:
      return state
  }
}

export function changeTitleHeader(title) {
  return {
    type: CHANGE_HEADER_TITLE,
    payload: title
  }
}

function initialHeaderTitle() {
  let title = 'selly'
  if(window.location.pathname.startsWith('/search')) {
    title = 'search'
  } else if(window.location.pathname.startsWith('/create')){
    title = 'create'
  } else if(window.location.pathname.startsWith('/saved')){
    title = 'saved'
  } else if(window.location.pathname.startsWith('/profile')){
    title = 'profile'
  }
  return title
}
