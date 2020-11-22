import { enableScreens } from 'react-native-screens';

enableScreens();

import React, { useReducer, useEffect } from "react";
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppStackNavigator from "./navigation";
import { expo } from "./app.json";
import * as hehe from './utils';
import { reducer, initialState } from "./reducer";
import { stateContext, dispatchContext } from "./contexts";
import { createDBTables, getCartFromDB, getOrdersFromDB } from "./db_handler";
import { SetCartProducts, SetOrderList } from "./actions";
import OurModal from "./components/OurModal";
import "./i18n";

/**Контейнер приложения */
const AppContainer = () => {
	return (
		<>
			<NavigationContainer>
				<AppStackNavigator/>
			</NavigationContainer>
			<OurModal/>
		</>
	);	
}

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect( () => {
		createDBTables();

		/*
        * Подгружаем данные корзины из базы данных
        * */
		getCartFromDB((tr, result) => {
			const data = new Map();
			result.rows["_array"].map( (v, i) => {
				data.set(v.productId, v);
			});
			dispatch(SetCartProducts(data));
		},
		(err) => {
			console.log("WELL SHIT", err)
		});

		/*
        * Подгружаем данные заказов из базы данных
        * */
		getOrdersFromDB((tr, result) => {
			const data = new Map();
			result.rows["_array"].map( (v, i) => {
				let products = new Map();
				try {
					const json = JSON.parse(v.products);
					products = new Map(Object.entries(json));
				} catch(err) { console.log("WTF", err) }

				const order = {
					id: v.id,
					uuid: v.uuid,
					deliveryDetails: {
						name: v.customerName,
						phone: v.customerPhone,
						address: v.customerAddress,
						floor: v.customerFloor,
						notes: v.orderNotes,
						time: v.orderDeliveryTime,
					},
					products: products,
					status: v.status,
					totalPrice: v.totalPrice,
				};
				data.set(order.uuid, order);
			});
			dispatch(SetOrderList(data));
		},
		(err) => {
			console.log("WELL SHIT", err)
		});
	}, []);

	return (
		<stateContext.Provider value={state}>
			<dispatchContext.Provider value={dispatch}>
				<AppContainer/>
			</dispatchContext.Provider>
		</stateContext.Provider>
	);
};
AppRegistry.registerComponent(expo.name, () => App);

export default App;