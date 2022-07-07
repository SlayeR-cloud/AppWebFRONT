import React, { useState } from "react";
import Constants from "./utilities/Constants";
import ProductCreateForm from "./components/ProductCreateForm";
import ProductUpdateForm from "./components/ProductUpdateForm";

export default function App() {

  const [products, setProducts] = useState([]);
  const [showingCreateNewProductForm, setShowingCreateNewProductForm] = useState(false);
  const [productBeingUpdated, setProductBeingUpdated] = useState(null);

  function getProducts() {
    const url = Constants.API_URL_GET_ALL_PRODUCTS;

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(productsOfServer => {
        setProducts(productsOfServer.response);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function deleteProduct(productId) {
    const url = `${Constants.API_URL_DELETE_A_PRODUCT}/${productId}`;

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer.response);
        OnProductDeleted(productId);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {(showingCreateNewProductForm === false && productBeingUpdated === null) && (
            <div>
              <h1 align="center">Aplicativo CRUD WEB</h1>
              <h2 align="center">(ASP.NET Core (back) React (front))</h2>
              <div className="mt-5">
                <button onClick={getProducts} className="btn btn-dark btn-lg w-100">Obtener productos del servidor</button>
                <button onClick={() => setShowingCreateNewProductForm(true)} className="btn btn-secondary btn-lg w-100 mt-4">Crear nuevo producto</button>
              </div>
            </div>
          )}
          {(products.length > 0 && showingCreateNewProductForm === false && productBeingUpdated === null) && renderProductsTable()}
          {showingCreateNewProductForm && <ProductCreateForm OnProductCreated={OnProductCreated} />}
          {productBeingUpdated !== null && <ProductUpdateForm product={productBeingUpdated} OnProductUpdated={OnProductUpdated} />}
        </div>
      </div>
    </div>
  );

  function renderProductsTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-hordered border-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">CODIGO DE BARRA</th>
              <th scope="col">DESCRIPCION</th>
              <th scope="col">MARCA</th>
              <th scope="col">ID DE CATEGORIA</th>
              <th scope="col">PRECIO</th>
              <th scope="col">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.barCode}</td>
                <td>{product.info}</td>
                <td>{product.brand}</td>
                <td>{product.idCategory}</td>
                <td>{product.price}</td>
                <td>
                  <button onClick={() => setProductBeingUpdated(product)} className="btn btn-dark btn-lg mx-3 my-3">Actualizar</button>
                  <button onClick={() => {
                    if (window.confirm(`Seguro que desea eliminar el producto seleccionado?`))
                      deleteProduct(product.id)
                  }} className="btn btn-secondary btn-lg">Eliminar</button>
                </td>
              </tr>))}
          </tbody>
        </table>
        <button onClick={() => setProducts([])} className="btn btn-dark btn-lg w-100 mb-4">Limpiar Productos del Array</button>
      </div>
    )
  }


  function OnProductCreated(createdProduct) {
    setShowingCreateNewProductForm(false);
    if (createdProduct === null) {
      return;
    }
    alert(`Producto creado satisfactoriamente, revisa la tabla`);
    getProducts();
  }

  function OnProductUpdated(updatedProduct) {
    setProductBeingUpdated(null);
    if (updatedProduct === null) {
      return;
    }

    let productsCopy = [...products];

    const index = productsCopy.findIndex((productsCopyProducts, currentIndex) => {
      if (productsCopyProducts.id === updatedProduct.id) {
        return true;
      }
    });

    if (index !== -1) {
      productsCopy[index] = updatedProduct;
    }

    setProducts(productsCopy);

    alert('Producto Actualizado, revisar la tabla');
  }

  function OnProductDeleted(deletedProductProductId) {
    let productsCopy = [...products];

    const index = productsCopy.findIndex((productsCopyProducts, currentIndex) => {
      if (productsCopyProducts.id === deletedProductProductId) {
        return true;
      }
    });

    if (index !== -1) {
      productsCopy.splice(index, 1);
    }

    setProducts(productsCopy);

    alert('Producto Eliminado Correctamente, revisar la tabla');
  }
}
