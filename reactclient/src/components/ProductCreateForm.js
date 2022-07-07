import React, { useState } from 'react'
import Constants from '../utilities/Constants'

export default function ProductCreateForm(props) {

    const initialFormData = Object.freeze({
        barCode: '111111111',
        info: 'XXXXX',
        brand: 'XXXXXXXX',
        idCategory: '1',
        price: 0
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

        const productToCreate = {
            barCode: formData.barCode,
            info: formData.info,
            brand: formData.brand,
            idCategory: 1,
            price: formData.price
        }

        const url = Constants.API_URL_CREATE_PRODUCT;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productToCreate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        props.OnProductCreated(productToCreate);
    };

    return (
        <div>
            <form className='w-100 px-5'>
                <h1 className='mt-5'>Crear nuevo producto</h1>
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
                <button onClick={handleSubmit} className='btn btn-dark btn-lg w-100 mt-5'>Crear</button>
                <button onClick={() => props.OnProductCreated(null)} className='btn btn-secondary btn-lg w-100 mt-3'>Cancelar</button>
            </form>
        </div>
    )
}
