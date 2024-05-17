import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../user/admin/component/Header/Header'
import Footer from '../user/admin/component/Footer/Footer'
import Shop from '../user/admin/container/Shop/Shop'
import ShopDetail from '../user/admin/container/ShopDetail/ShopDetail'
import Contact from '../user/admin/container/Contact/Contact'
import Error404 from '../user/admin/container/Pages_SubPages/Error404'
import Cart from '../user/admin/container/Pages_SubPages/Cart'
import CheckOut from '../user/admin/container/Pages_SubPages/CheckOut'
import Testimonials from '../user/admin/container/Pages_SubPages/Testimonials'
import Home from '../user/admin/container/Home/Home'

const UserRoutes = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:id" element={<ShopDetail />} />
                <Route path="/" element={<Home />}>
                    <Route path="/shopdetail" element={<ShopDetail />} />
                </Route>
                <Route path='/contact' element={<Contact />} />
                <Route path="/error" element={<Error404 />} />
                <Route path='/cart' element={<Cart />} />
                <Route path="/checkout" element={<CheckOut />} />
                <Route path='/testimonials' element={<Testimonials />} />
            </Routes>
            <Footer />
        </>
    )
}

export default UserRoutes
