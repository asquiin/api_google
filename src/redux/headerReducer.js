const UPDATE_SEARCH_TEXT = 'UPDATE-SEARCH-TEXT';
const PUSH_SEARCH_BUTTON = 'PUSH-SEARCH-BUTTON';
const SELECTED_CATEGORY = 'SELECTED-CATEGORY;';
const SORTING_SELECTION = 'SORTING-SELECTION';

let initialState = {
    newSearchString: '',
    category: '',
    orderBy: 'relevance',
};

const headerReducer = (state = initialState, action) => {

    switch (action.type) {

        case PUSH_SEARCH_BUTTON: {
            return {
                ...state,
            }
        }
        case UPDATE_SEARCH_TEXT: {
            return {
                ...state,
                newSearchString: action.text,
            };
        }
        case SELECTED_CATEGORY: {
            return {
                ...state,
                category: action.category,
            }
        }
        case SORTING_SELECTION: {
            return {
                ...state,
                orderBy: action.orderBy,
            }
        }
        default:
            return state;
    }
}

export const updateSearchText = (text) => ({ type: UPDATE_SEARCH_TEXT, text });
export const pushSearchButton = () => ({ type: PUSH_SEARCH_BUTTON, });
export const selectedCategory = (category) => ({ type: SELECTED_CATEGORY, category })
export const sortingSelection = (orderBy) => ({ type: SORTING_SELECTION, orderBy })

export default headerReducer;