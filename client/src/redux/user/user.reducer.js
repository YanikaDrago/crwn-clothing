import UserActionTypes from "./user.types";

const INITIAL_STATE = {  // устанавливаем начальное состояние
    currentUser: null,
    error: null
}

//функция, которая получает объект состояния и действие в зависимости от типа действия
const userReducer = (state = INITIAL_STATE, action) => { // state = INITIAL_STATE если состояние когда-либо не определено /не установлено/ оно откатится
    switch(action.type) {         
        case UserActionTypes.SIGN_IN_SUCCESS:  //проверит, равен ли case строке 'GOOGLE_SIGN_IN_SUCCESS' для action.type   
            return {
                ...state,
                currentUser: action.payload,
                error: null                          // очищаем ошибки
            };
            case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            };
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:                 // если не равен - вернет текущее состояние
            return state;
    }
};

export default userReducer;