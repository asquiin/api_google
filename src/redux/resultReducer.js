import axios from "axios"

const instance = axios.create({
    baseURL: "https://www.googleapis.com/books/v1/volumes",
})

export const bookAPI = {
    searchBook(searchString, orderBy, category) {
        if (category != '') {
            return instance.get(`?maxResults=30&orderBy=${orderBy}&q=${(searchString) + '+subject:' + (category) + '&key=AIzaSyBSdsuDMR2_8Rj8oSkDhvYfilF5gPz4e5A'}`)
        } else {
            return instance.get(`?maxResults=30&orderBy=${orderBy}&q=${(searchString) + '&key=AIzaSyBSdsuDMR2_8Rj8oSkDhvYfilF5gPz4e5A'}`)
        }
    },

    showBookCard(userId) {
        return instance.get('/' + userId + '?' + '&key=AIzaSyBSdsuDMR2_8Rj8oSkDhvYfilF5gPz4e5A')
    },

    loadMoreButton(booksCount, searchString) {
        return instance.get(`?maxResults=30&startIndex=${booksCount}&q=${(searchString)}`)
    }
}

const LOAD_BOOK = 'LOAD-BOOK';
const LOAD_SEARCH_RESULTS = 'LOAD-SEARCH-RESULTS';
const SET_TOTAL_ITEMS = 'SET-TOTAL-ITEMS';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const SET_BOOK_CARD = 'SET-BOOK-CARD';
const LOAD_MORE = 'LOAD-MORE';
const SET_FETCH_ERROR = 'SET_FETCH_ERROR';
const CLEAN_RESULTS = 'CLEAN-RESULTS';

let initialState = {
    results: [],
    totalItems: 0,
    isFetching: true,
    bookCard: null,
    isFetchError: false,
};

const resultReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOAD_BOOK: {
            return {
                ...state,
            };
        }
        case LOAD_SEARCH_RESULTS: {
            return {
                ...state,
                results: action.results,
            }
        }

        case SET_TOTAL_ITEMS: {
            return {
                ...state,
                totalItems: action.totalItems,
            }
        }

        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        }

        case SET_BOOK_CARD: {
            return {
                ...state,
                bookCard: action.bookCard,
            }
        }

        case LOAD_MORE: {
            return {
                ...state,
                results: [...state.results, ...action.moreBooks],
            }
        }

        case SET_FETCH_ERROR: {
            return {
                ...state,
                isFetchError: action.isError,
            }
        }

        case CLEAN_RESULTS: {
            return {
                ...state,
                results: [],
            }
        }

        default:
            return state;
    }
}

export const loadBook = () => ({ type: LOAD_BOOK });
export const loadSearchResults = (results) => ({ type: LOAD_SEARCH_RESULTS, results });
export const setTotalItems = (totalItems) => ({ type: SET_TOTAL_ITEMS, totalItems });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const setBookCard = (bookCard) => ({ type: SET_BOOK_CARD, bookCard });
export const loadMore = (moreBooks) => ({ type: LOAD_MORE, moreBooks });
export const setFetchError = (isError) => ({ type: SET_FETCH_ERROR, isError })
export const cleanResults = () => ({ type: CLEAN_RESULTS, })

export const startSearchBook = (searchString, orderBy, category) => {
    return async (dispatch) => {
        try {
            dispatch(setFetchError(false));
            dispatch(toggleIsFetching(true));
            let response = await bookAPI.searchBook(searchString, orderBy, category);
            dispatch(toggleIsFetching(false));
            dispatch(setTotalItems(response.data.totalItems));
            if (response.data.totalItems != 0) {
                dispatch(loadSearchResults(response.data.items));
            } else {
                dispatch(cleanResults());
            }
        } catch (e) {
            dispatch(setFetchError(true));
            dispatch(toggleIsFetching(false));
        }
    }
}

export const getBookCard = (userId) => {
    return async (dispatch) => {
        try {
            dispatch(setFetchError(false));
            let response = await bookAPI.showBookCard(userId);
            dispatch(setBookCard(response.data));
        } catch (e) {
            dispatch(setFetchError(true));
            dispatch(toggleIsFetching(false));
        }
    };
}

export const loadMoreBooks = (booksCount, previousState, searchString) => {

    return async (dispatch) => {
        try {
            dispatch(setFetchError(false));
            let response = await bookAPI.loadMoreButton(booksCount, searchString);
            dispatch(loadMore(response.data.items, previousState));
        } catch (e) {
            dispatch(setFetchError(true));
            dispatch(toggleIsFetching(false));
        }
    }
}

export default resultReducer;

