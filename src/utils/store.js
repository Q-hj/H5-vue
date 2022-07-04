/*
 * @Date: 2022-06-13 10:43:34
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-06-20 09:16:20
 * @Description: 封装 storeage，并与vuex联调,具有加密功能
 */
import Vue from "vue";
import store from "@/store";
import { mapMutations } from "vuex";
// import { encrypt, decrypt } from "./crypto";

/**
 * 存入
 * @param key
 * @param value
 */
export function setStore(key, value, needEncrypt, type = "session") {
  // console.log(store.commit);
  // debugger;
  try {
    if (key == "user") store.commit("set_" + key, value);
    // store.commit("set_user", { name: "123" });
  } catch (error) {
    console.log(error);
  }
  const Storage = { session: sessionStorage, local: localStorage };
  if (typeof value === "object") value = JSON.stringify(value);
  // console.log(typeof value);
  // if (needEncrypt) value = encrypt(value);
  Storage[type].setItem(key, value);
}

/**
 * 读取
 * @param key
 * @returns
 */
export function getStore(key, needDecrypt, type = "session") {
  // store.state[key] = value;
  // debugger;
  const Storage = { session: sessionStorage, local: localStorage };
  // if (needEncrypt) value = encrypt(value);
  let value = Storage[type].getItem(key);
  if (typeof value === "object") value = JSON.stringify(value);
  if (needDecrypt) value = decrypt(value);
  if (value.includes("}")) value = JSON.parse(value);
  return value;
}

export function clearStore(key, type = "session") {
  const Storage = { session: sessionStorage, local: localStorage };
  if (key === true) return Storage[type].clear();
  Storage[type].clear(key);
  store.state[key] = null;
}
Vue.prototype.setStore = setStore;
Vue.prototype.getStore = getStore;

Vue.prototype.setLocalStore = (key, value, needEncrypt) =>
  setStore(key, value, needEncrypt, "local");

Vue.prototype.getLocalStore = (key, needEncrypt) =>
  getStore(key, needEncrypt, "local");

Vue.prototype.clearStore = clearStore;
