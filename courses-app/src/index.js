import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { authorsReducer } from './store/authors/reducer';
import { coursesReducer } from './store/courses/reducer';
import { userReducer } from './store/user/reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));

let allReducers = combineReducers({
	user: userReducer,
	courses: coursesReducer,
	authors: authorsReducer,
});
const store = createStore(allReducers, applyMiddleware(thunk));

store.subscribe(() => {});

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
