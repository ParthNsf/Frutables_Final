import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchProducts } from '../../../../redux/Action/products.action';
import { addToCarting } from '../../../../reduxToolkit/cartSlice';

const Shop = () => {
    const [fruits, setFruits] = useState([]);
    const [category, setCategory] = useState([]);
    const [type, setType] = useState([]);
    const [search, setSearchData] = useState("");
    const [sortBy, setSortBy] = useState('');
    const [sortedData, setSortedData] = useState('');
    const [range, setRange] = useState('');

    const dispatch = useDispatch()

    const dataFromRedux = useSelector((state) => state.productInAdmin)

    const cartinginshop = useSelector((state) => state.cartinToolkit)


    useEffect(() => {
        fruitData();
        dispatch(fetchProducts())
    }, []);


    const fruitData = async () => {
        const response = await fetch("http://localhost:3000/fruits");
        const data = await response.json();

        let uniqueCategories = [...new Set(data.map((fruit) => fruit.name))];

        let uniqueTypes = [...new Set(data.map((fruit) => fruit.category))];

        setType(uniqueTypes);
        setCategory(uniqueCategories);
        setFruits(data);
    };

    const handleAllData = () => {
        let filteredData = fruits.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

        if (sortBy) {
            return filteredData.filter(item => item.name === sortBy);
        }

        if (sortedData === "atoz") {
            filteredData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortedData === "ztoa") {
            filteredData.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortedData === "lowtohigh") {
            filteredData.sort((a, b) => a.price - b.price);
        } else if (sortedData === "hightolow") {
            filteredData.sort((a, b) => b.price - a.price);
        } else {
            return filteredData;
        }

        if (range !== '') {
            filteredData = filteredData.filter(item => Math.round(item.price) <= range);
        }

        return filteredData;
    };

    const finalData = handleAllData();

    let { id } = useParams();

    const handleAddInCart = (id, event, count) => {
        event.preventDefault();
        dispatch(addToCarting({ id, count }));
    }


    return (
        <div>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Shop</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Shop</li>
                </ol>
            </div>
            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Fresh fruits shop</h1>
                    <div className="row g-4">
                        <div className="col-lg-12">
                            <div className="row g-4">
                                <div className="col-xl-3">
                                    <div className="input-group w-100 mx-auto d-flex">
                                        <input type="text" className="form-control p-3" onChange={(e) => setSearchData(e.target.value)} placeholder="keywords" aria-describedby="search-icon-1" />
                                        <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                                    </div>
                                </div>
                                <div className="col-6" />
                                <div className="col-xl-3">
                                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                        <label htmlFor="fruits">Default Sorting:</label>
                                        <select id="fruits" onChange={(e) => setSortedData(e.target.value)} name="fruitlist" className="border-0 form-select-sm bg-light me-3" form="fruitform">
                                            <option value="all">All</option>
                                            <option value="atoz">A to Z</option>
                                            <option value="ztoa">Z to A</option>
                                            <option value="lowtohigh">Low to High</option>
                                            <option value="hightolow">High to Low</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-lg-3">
                                    <div className="row g-4">
                                        <div className="col-lg-12">

                                            <div className="mb-3">
                                                <h4>Categories</h4>
                                                <ul className="list-unstyled fruite-categorie">
                                                    <li>
                                                        <div className="d-flex justify-content-between fruite-name" >
                                                            <a href="#" onClick={() => setSortBy('')} ><i className="fas fa-apple-alt me-2" />ALL</a>
                                                            <span>({fruits.length})</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                                {
                                                    category.map((n) => (
                                                        <ul className="list-unstyled fruite-categorie">
                                                            <li>
                                                                {console.log(n)}
                                                                <div className="d-flex justify-content-between fruite-name" >
                                                                    <a href="#" onClick={() => setSortBy(n)} ><i className="fas fa-apple-alt me-2" />{n}</a>
                                                                    <span>({fruits.filter(v => v.name === n).length})</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    ))
                                                }


                                            </div>

                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4 className="mb-2">Price</h4>
                                                {/* onChange={(e) => setFruits(fruits.filter(fruit => fruit.price <= e.target.value))} */}
                                                <input type="range" onChange={(e) => setFruits(fruits.filter(fruit => fruit.price <= e.target.value))} className="form-range w-100" id="rangeInput" name="rangeInput" />
                                                <output id="amount" name="amount" min-velue={1} max-value={10} htmlFor="rangeInput">{range}</output>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4>Additional</h4>
                                                <div>
                                                    <div className="mb-2">
                                                        <input type="radio" onClick={() => setFruits(fruits.filter(fruit => fruit.type === "Organic"))} className="me-2" id="Categories-1" name="Categories-1" defaultValue="Beverages" />
                                                        <label htmlFor="Categories-1"> Organic</label>
                                                    </div>
                                                    <div className="mb-2">
                                                        <input type="radio" onClick={() => setFruits(fruits.filter(fruit => fruit.type === "Fresh"))} className="me-2" id="Categories-2" name="Categories-1" defaultValue="Beverages" />
                                                        <label htmlFor="Categories-2"> Fresh</label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <div className="row g-4 justify-content-center">

                                        {
                                            dataFromRedux.products.map((v, i) => (
                                                <div className="col-md-6 col-lg-6 col-xl-4" key={i}>
                                                    <Link to={`/shop/${v.id}`}>
                                                        <div className="rounded position-relative fruite-item">
                                                            <div className="fruite-img">
                                                                <img src={v.image} className="img-fluid w-100 rounded-top" alt="" />
                                                            </div>
                                                            <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                                                            <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                                <h4>{v.name}</h4>
                                                                <p>{v.description}</p>
                                                                <div className="d-flex justify-content-between flex-lg-wrap">
                                                                    <p className="text-dark fs-5 fw-bold mb-0">${v.price} / kg</p>

                                                                    <button onClick={(event) => handleAddInCart(v.id, event, 1)} className="btn border border-secondary rounded-pill px-3 text-primary">
                                                                        <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
                                                                    </button>


                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
}

export default Shop