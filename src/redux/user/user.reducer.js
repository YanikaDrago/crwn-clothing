import {UserActionTypes} from "./user.types";

const INITIAL_STATE = {  // устанавливаем начальное состояние
    currentUser: null
}

//функция, которая получает объект состояния и действие в зависимости от типа действия
const userReducer = (state = INITIAL_STATE, action) => { // state = INITIAL_STATE если состояние когда-либо не определено /не установлено/ оно откатится
    switch(action.type) {         
        case UserActionTypes.SET_CURRENT_USER:  //проверит, равен ли case строке 'SET_CURRENT_USER' для action.type
            return {
                ...state,
                currentUser: action.payload
            };
        default:                 // если не равен - вернет текущее состояние
            return state;
    }
};

export default userReducer;