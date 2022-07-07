import React, { useState } from 'react'
import Constants from '../utilities/Constants'

export default function ProductUpdateForm(props) {

    const initialFormData = Object.freeze({
        id: props.product.id,
        barCode: props.product.barCode,
        info: props.product.info,
        brand: props.product.brand,
        idCategory: '1',
        price: props.product.price
    });

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const productToUpdate = {
            id: props.product.id,
            barCode: formData.barCode,
            info: formData.info,
            brand: formData.brand,
            idCategory: 1,
            price: formData.price
        }

        console.log(productToUpdate);

        const url = Constants.API_URL_UPDATE_PRODUCT;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productToUpdate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        props.OnProductUpdated(productToUpdate);
    };

    return (
        <div>
            <form className='w-100 px-5'>
                <h1 className='mt-5'>Actualizar un producto</h1>
                <div className='mt-5'>
                    <label className='h3 form-label'>Codigo de Barras</label>
                    <input value={formData.barCode} name='barCode' type='text' className='form-control' onChange={
                        handleChange
                    } />
                </div>
                <div className='mt-3'>
                    <label className='h3 form-label'>Informacion</label>
                    <input value={formData.info} name='info' type='text' className='form-control' onChange={
                        handleChange
                    } />
                </div>
                <div className='mt-3'>
                    <label className='h3 form-label'>Marca</label>
                    <input value={formData.brand} name='brand' type='text' className='form-control' onChange={
                        handleChange
                    } />
                </div>
                <div className='mt-3'>
                    <label className='h3 form-label'>Precio</label>
                    <input value={formData.price} name='price' type='text' className='form-control' onChange={
                        handleChange
                    } />
                </div>
                <button onClick={handleSubmit} className='btn btn-dark btn-lg w-100 mt-5'>Actualizar</button>
                <button onClick={() => props.OnProductUpdated(null)} className='btn btn-secondary btn-lg w-100 mt-3'>Cancelar</button>
            </form>
        </div>
    )
}
