import { Routes, Route } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import PrivateRoutes from './Routes/PrivateRoutes';
import { Provider } from 'react-redux';
import { configureStore } from './redux/Reducer/store';
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  const { store, persistor } = configureStore();
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes >
            <Route exact path='/*' element={<UserRoutes />} />
            <Route element={<PrivateRoutes />}>
              <Route exact path='/admin/*' element={<AdminRoutes />} />
            </Route>
          </Routes>
        </PersistGate>
      </Provider >
    </>
  );
}

export default App;
