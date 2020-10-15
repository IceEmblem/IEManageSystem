import { AsyncStorage } from 'react-native'

export const getCookie = async (name) => {
    return AsyncStorage.getItem(name);
}

export const setCookie = (name, value, expiredays) => {
    return AsyncStorage.setItem(name, value);
}

export const delCookie = (name) => {
    return AsyncStorage.removeItem(name);
}