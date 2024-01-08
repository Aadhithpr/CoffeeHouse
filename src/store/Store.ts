import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

export const useStore = create(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],
      addTocart: (CartItem: any) =>
        set(
          produce(state => {
            let found = false;
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == CartItem.id) {
                found = true;
                let size = false;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (
                    state.CartList[i].prices[j].size == CartItem.prices[0].size
                  ) {
                    size = true;
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
                if (size == false) {
                  state.CartList[i].prices.push(CartItem.prices[0]);
                }
                state.CartList[i].prices.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }
            if (found == false) {
              state.CartList.push(CartItem);
            }
          }),
        ),
      calculateCartPrice: () =>
        set(
          produce(state => {
            let totalPrice = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let tempprice = 0;
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                const price = parseFloat(state.CartList[i].prices[j].price);
                const quantity = state.CartList[i].prices[j].quantity;

                if (!isNaN(price) && !isNaN(quantity)) {
                  tempprice += price * quantity;
                } else {
                  console.log('Invalid price or quantity detected!');
                }
              }
              state.CartList[i].itemPrice = tempprice.toFixed(2).toString();
              totalPrice += tempprice;
            }
            state.CartPrice = totalPrice.toFixed(2).toString();
          }),
        ),

      addTofavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            if (type === 'Coffee') {
              const coffeeItem = state.CoffeeList.find(
                (item: {id: string}) => item.id === id,
              );
              if (coffeeItem) {
                if (!coffeeItem.favorites) {
                  coffeeItem.favorites = true;
                  state.FavoritesList.unshift(coffeeItem);
                }
              }
            } else if (type === 'Bean') {
              const beanItem = state.BeanList.find(
                (item: {id: string}) => item.id === id,
              );
              if (beanItem) {
                if (!beanItem.favorites) {
                  beanItem.favorites = true;
                  state.FavoritesList.unshift(beanItem);
                }
              }
            }
          }),
        ),

      deleteFromFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            if (type === 'Coffee') {
              const coffeeItem = state.CoffeeList.find(
                (item: {id: string}) => item.id === id,
              );
              if (coffeeItem) {
                if (coffeeItem.favorites) {
                  coffeeItem.favorites = false;
                }
                const spliceIndex = state.FavoritesList.findIndex(
                  (item: {id: string}) => item.id === id,
                );
                if (spliceIndex !== -1) {
                  state.FavoritesList.splice(spliceIndex, 1);
                }
              }
            } else if (type === 'Bean') {
              const beanItem = state.BeanList.find(
                (item: {id: string}) => item.id === id,
              );
              if (beanItem) {
                if (beanItem.favorites) {
                  beanItem.favorites = false;
                }
                const spliceIndex = state.FavoritesList.findIndex(
                  (item: {id: string}) => item.id === id,
                );
                if (spliceIndex !== -1) {
                  state.FavoritesList.splice(spliceIndex, 1);
                }
              }
            }
          }),
        ),
      incrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size == size) {
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
              }
            }
          }),
        ),
      decrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size == size) {
                    if (state.CartList[i].prices.length > 1) {
                      if (state.CartList[i].prices[j].quantity > 1) {
                        state.CartList[i].prices[j].quantity--;
                      } else {
                        state.CartList[i].prices.splice(j, 1);
                      }
                    } else {
                      if (state.CartList[i].prices[j].quantity > 1) {
                        state.CartList[i].prices[j].quantity--;
                      } else {
                        state.CartList.splice(i, 1);
                      }
                    }
                    break;
                  }
                }
              }
            }
          }),
        ),
      addToOrderHistoryFromCart: () =>
        set(
          produce(state => {
            let temp = state.CartList.reduce(
              (accumulator: number, currentValue: any) =>
                accumulator + parseFloat(currentValue.itemPrice),
              0,
            );
            let currentCartListTotalPrice = temp.toFixed(2).toString();
            if (state.OrderHistoryList.length > 0) {
              state.OrderHistoryList.unshift({
                orderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleDateString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            } else {
              state.OrderHistoryList.unshift({
                orderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleDateString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            }
            state.CartList = [];
          }),
        ),
    }),
    {name: 'coffee-app', storage: createJSONStorage(() => AsyncStorage)},
  ),
);
