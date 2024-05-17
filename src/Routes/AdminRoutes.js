import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import Layout from '../user/admin/admin/components/Layout'
import Fruits from '../user/admin/admin/components/Fruits/Fruits'
import Vegetables from '../user/admin/admin/components/Vegetables/Vegetables'
import AdminCategory from '../user/admin/admin/components/AdminCategory/AdminCategory'
import Facilties from '../user/admin/admin/components/Facilties/Facilties'
import AdminGroceries from '../user/admin/admin/components/AdminGroceries/AdminGroceries'
import Products from '../user/admin/admin/components/Products/Products'
import CounterToolkit from '../user/admin/admin/components/CounterToolkit/CounterToolkit'
import Coupon from '../user/admin/admin/components/Coupon/Coupon'

const AdminRoutes = () => {
    return (
        <>
            <Layout>
                <Routes element= {<PrivateRoutes />}> 
                    <Route path="/fruits" element={<Fruits />} />
                    <Route path="/vegetables" element={<Vegetables />} />
                    <Route path="/category" element={<AdminCategory />} />
                    <Route path="/facilties" element={<Facilties />} />
                    <Route path="/groceries" element={<AdminGroceries />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/counter" element={<CounterToolkit />} />
                    <Route path="/coupon" element={<Coupon />} />

                </Routes>
            </Layout>
        </>
    )
}

export default AdminRoutes
