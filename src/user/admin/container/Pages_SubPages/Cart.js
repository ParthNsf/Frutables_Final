import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQuantity, incrementQuantity, removeFromCart } from '../../../../reduxToolkit/cartSlice'
import { getCoupon } from '../../../../reduxToolkit/couponSlice'

const Cart = () => {

    const dispatch = useDispatch()


    // ------------ Coupon Functionality ----------------------------

    const couponFromAdmin = useSelector(state => state.couponInCart);
    console.log(couponFromAdmin.coupon);

    const [isValid, setIsValid] = useState(false);
    const [couponApplied, setCouponApplied] = useState('');

    const handleApplyCoupon = () => {
        if (productsInCart.length === 0) {
            alert('Cart is empty');
        } else {
            const appliedCouponDetails = couponFromAdmin.coupon.find(v => v.couponename === couponApplied);

            if (appliedCouponDetails) {
                const currentDate = new Date();
                const expiryDate = new Date(appliedCouponDetails.date);

                if (currentDate > expiryDate) {
                    alert('Coupon is not valid');
                    setIsValid(false);
                } else {
                    console.log('Applied');
                    setIsValid(true);
                }
            } else {
                console.log('Not Applied');
                setIsValid(false);
            }
        }
    };


    const getDiscountedTotal = () => {
        const appliedCouponDetails = couponFromAdmin.coupon.find(v => v.couponename === couponApplied);

        if (appliedCouponDetails) {
            const discountPercentage = appliedCouponDetails.percentage / 100;
            return productsInCart.reduce((a, b) => a + b.price * b.quantity, 0) * (1 - discountPercentage);
        }

        return productsInCart.reduce((a, b) => a + b.price * b.quantity, 0);
    };



    // ------------ Coupon Functionality ----------------------------

    const cartingInCart = useSelector(state => state.cartinToolkit)

    const products = useSelector(state => state.productInAdmin)

    const productsInCart = cartingInCart.carting.map((cart) => {
        const product = products.products.find((product) => product.id === cart.pId)

        return { ...product, quantity: cart.quantity }
    })



    useEffect(() => {
        dispatch(getCoupon())
    }, [dispatch])

    const handleInc = (id) => {
        dispatch(incrementQuantity(id))
    }

    const handleDec = (id) => {
        dispatch(decrementQuantity(id))
    }

    const handleRemove = (pId) => {
        dispatch(removeFromCart(pId));
    }

    return (
        <>
            <div>
                {/* Modal Search Start */}
                <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-fullscreen">
                        <div className="modal-content rounded-0">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body d-flex align-items-center">
                                <div className="input-group w-75 mx-auto d-flex">
                                    <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                    <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal Search End */}
                {/* Single Page Header start */}
                <div className="container-fluid page-header py-5">
                    <h1 className="text-center text-white display-6">Cart</h1>
                    <ol className="breadcrumb justify-content-center mb-0">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Pages</a></li>
                        <li className="breadcrumb-item active text-white">Cart</li>
                    </ol>
                </div>
                {/* Single Page Header End */}
                {/* Cart Page Start */}
                <div className="container-fluid py-5">
                    <div className="container py-5">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Products</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {productsInCart.map((item, index) => (
                                        <>
                                            <tr>
                                                <th scope="row">
                                                    <div className="d-flex align-items-center">
                                                        <img src={item.image} className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                                                    </div>
                                                </th>
                                                <td>
                                                    <p className="mb-0 mt-4">{item.name}</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0 mt-4">{item.price} $</p>
                                                </td>
                                                <td>
                                                    <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                                        <div className="input-group-btn">
                                                            <button
                                                                onClick={() => handleDec(item.id)}
                                                                className="btn btn-sm btn-minus rounded-circle bg-light border"
                                                            >
                                                                <i className="fa fa-minus" />
                                                            </button>
                                                        </div>
                                                        <span className="form-control bg-light border-0 text-center">{item.quantity}</span>
                                                        <div className="input-group-btn">
                                                            <button
                                                                onClick={() => handleInc(item.id)}
                                                                className="btn btn-sm btn-plus rounded-circle bg-light border"
                                                            >
                                                                <i className="fa fa-plus" />
                                                            </button>
                                                        </div>

                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-0 mt-4 text-primary fw-bold">{String(item.price * item.quantity).substring(0, 5)} $</p>
                                                </td>
                                                <td>
                                                    <button onClick={() => handleRemove(item.id)} className="btn btn-md rounded-circle bg-light border mt-4">
                                                        <i className="fa fa-times text-danger" />
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}


                                </tbody>
                            </table>
                        </div>
                        <div className="mt-5">
                            <input
                                type="text"
                                className="border-0 border-bottom rounded me-5 py-3 mb-4"
                                placeholder="Coupon Code"
                                onChange={(e) => setCouponApplied(e.target.value)}
                            />
                            <button onClick={handleApplyCoupon} className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Apply Coupon</button>

                            <span className="ms-5">
                                {
                                    isValid ? (
                                        <div className="">
                                            <p className="text-success mb-0">Coupon Applied: {couponApplied}</p>
                                            {couponFromAdmin.coupon.find(v => v.couponename === couponApplied && v.expiryDate) ? (
                                                <p className="text-muted mt-1">Date Not Valid</p>
                                            ) : null}
                                        </div>
                                    ) : (
                                        <p className="text-danger mb-0">Coupon Not Valid</p>
                                    )
                                }



                            </span>


                        </div>




                        <div className="row g-4 justify-content-end">
                            <div className="col-12 col-sm-8 col-md-7 col-lg-6 col-xl-4">
                                <div className="bg-light rounded shadow-sm">
                                    <div className="p-4">
                                        <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                        {
                                            productsInCart.map((item, index) => (
                                                <div key={index} className="mb-3">
                                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                                        <h5 className="mb-0">{item.name}</h5>
                                                        <p className="mb-0">$ {item.price.toFixed(2)}</p>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-0">Quantity: {item.quantity}</p>
                                                        <p className="mb-0">$ {(item.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between align-items-center">
                                            {/* <h5 className="mb-0">Total</h5> */}
                                            {/* <p className="mb-0 fw-bold text-primary ">$ {productsInCart.reduce((a, b) => a + b.price * b.quantity, 0).toFixed(2)}</p> */}

                                            <p className="mb-0 fw-bold text-primary ">

                                                {
                                                    isValid && couponApplied ? (
                                                        <div className="fw-normal text-dark">
                                                            <p className="mb-2">Total: <strong>${productsInCart.reduce((a, b) => a + b.price * b.quantity, 0).toFixed(2)}</strong></p>
                                                            <p className="mb-0">Total After Discount: <span className="text-success fs-4 "><strong>${getDiscountedTotal().toFixed(2)}</strong></span> (<span>{couponFromAdmin.coupon.find(v => v.couponename === couponApplied).percentage}% discount applied</span>)</p>
                                                        </div>
                                                    ) : (
                                                        <div className="text-dark">
                                                            <p className="mb-0">Total: <span className="text-success fs-5 "><strong>${productsInCart.reduce((a, b) => a + b.price * b.quantity, 0).toFixed(2)}</strong> </span></p>
                                                        </div>
                                                    )
                                                }





                                            </p>

                                        </div>
                                        <button className="btn btn-primary rounded-pill px-4 py-2 text-uppercase w-100" type="button">Proceed to Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
                {/* Cart Page End */}
                {/* Copyright Start */}
                <div className="container-fluid copyright bg-dark py-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                <span className="text-light"><a href="#"><i className="fas fa-copyright text-light me-2" />Your Site Name</a>, All right reserved.</span>
                            </div>
                            <div className="col-md-6 my-auto text-center text-md-end text-white">
                                {/*/*** This template is free as long as you keep the below author’s credit link/attribution link/backlink. *** /*/}
                                {/*/*** If you'd like to use the template without the below author’s credit link/attribution link/backlink, *** /*/}
                                {/*/*** you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". *** /*/}
                                Designed By <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a> Distributed By <a className="border-bottom" href="https://themewagon.com">ThemeWagon</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Copyright End */}
            </div>

        </>
    )
}

export default Cart