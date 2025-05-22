import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type AppDispatch, type RootState } from '../store';
import { fetchProducts } from '../store/product-slice'; 
import { cartActions } from '../store/cart-slice'; 
import { type Product } from '../types';
import Card from '../components/UI/Card';
import BasicButton from '../components/UI/BasicButton';
import DetailsButton from '../components/UI/DetailsButton';
import classes from './ProductListPage.module.css';

const ProductListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items: products, status, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts()); 
    }
  }, [status, dispatch]);

  const handleAddToCart = (product: Product) => {
    dispatch(cartActions.addItemToCart(product));
  };


  if (status === 'loading' && products.length === 0) {
    return <div className={classes.centerText}><p>Loading products...</p></div>;
  }

  if (status === 'failed') {
    return <div className={classes.centerText}><p>Error while loading products: {error || 'An error occurred.'}</p></div>;
  }

  if (status === 'succeeded' && products.length === 0) {
    return <div className={classes.centerText}><p>There are no available products.</p></div>;
  }

  if (products.length === 0 && status !== 'loading') {
    return <div className={classes.centerText}><p>No products to show.</p></div>;
  }
  
  return (
    <div className={classes.productListContainer}>
      <h1>Products</h1>
      <div className={classes.productList}>
        {products.map((product) => (
          <Card key={product.id} className={classes.productCard}>
            <img src={product.image} alt={product.title} className={classes.productImage} />
            <h3 className={classes.productTitle}>{product.title}</h3>
            <p className={classes.productDescription}>{product.description.substring(0,100)}...</p>
            <p className={classes.productPrice}>Price: ${product.price.toFixed(2)}</p>
            <div className={classes.productActions}>
              <BasicButton
                onClick={() => handleAddToCart(product)}
                className={classes.addToCartBtnSpecifics}
              >
                Add to Cart
              </BasicButton>
              <DetailsButton
                to={`/products/${product.id}`}
                className={classes.detailsBtnSpecifics}
              >
                Details
              </DetailsButton>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;