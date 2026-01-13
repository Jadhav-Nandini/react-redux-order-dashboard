import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
// import { addProduct } from '../features/productSlice';
import { useNavigate } from 'react-router-dom';
const Product = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser)
    const products = useSelector((state) => state.product.products);

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [discount, setDiscount] = useState('')


    const handleAddProduct = () => {
        if (!name || !price || !quantity || !discount) {
            alert("please fill  all fields")
            return;
        }

        // dispatch(addProduct({
        //     userId: currentUser.id,
        //     name,
        //     price: Number(price),
        //     quantity: Number(quantity),
        //     discount: Number(discount),
        // }));

        setName('')
        setPrice('')
        setQuantity('')
    };

    if (!currentUser) {
    return <h3 className="text-center mt-5">Please login first</h3>;
    // return console.log("login first");
    
}

    const userProducts = products.filter(
        (p) => p.userId === currentUser.id
    )


    return (
        <div className='container  my-5'>
            <h1 className='text-center mb-3'>Product Detail</h1>

            <div className="card   p-4 shadow-lg ">
                <h3 className='mb-4'>Add New Product</h3>
                <div className="row ">
                    <div className="col-md-4">
                        <input type="text"
                            placeholder='Product Name'
                            className='form-control mb-3'
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                        <input type="number"
                            placeholder='Price'
                            className='form-control mb-3'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                        <input type="number"
                            placeholder='Quantity'
                            className='form-control mb-3'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)} />
                    </div>

                    <div className="col-md-2">
                        <input type="number"
                            placeholder='Discount%'
                            className='form-control mb-3'
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)} />
                    </div>

                    <div className="col-md-2">
                        <button onClick={handleAddProduct}
                            className='btn btn-primary  w-100 p-2 '>
                            Add Product
                        </button>
                    </div>
                </div>
            </div>

            <h3 className='mt-5'>All Products</h3>
            {userProducts.length === 0 ?

                (<p className='text-center text-muted'>No Products Yet</p>)

                : (
                    <div className="table-responsive">
                        <table className='table table-striped table-hover'>
                            <thead className='table-dark'>
                                <tr>
                                    <th>No.</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>discount</th>
                                    <th>Total Value</th>
                                    <th>Discounted</th>

                                </tr>
                            </thead>

                            <tbody>
                                {userProducts.map((p, i) => {
                                    const total = p.price * p.quantity;

                                    return (

                                        <tr key={p.id}>
                                            <td>{i + 1}</td>
                                            <td>{p.name}</td>
                                            <td>{p.price}</td>
                                            <td>{p.quantity}</td>
                                            <td>{p.discount}</td>
                                            <td>{total}</td>
                                            <td>{(total) - (total * p.discount) / 100}</td>
                                        </tr>
                                    )
                                })}

                            </tbody>

                        </table>
                    </div>
                )}


        </div>
    )
}






export default Product;