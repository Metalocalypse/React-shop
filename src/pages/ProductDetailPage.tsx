import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { type AppDispatch, type RootState } from '../store';
import { fetchProductById, clearSelectedProduct } from '../store/product-slice';
import { cartActions } from '../store/cart-slice';
import Card from '../components/UI/Card';
import BasicButton from '../components/UI/BasicButton';
import classes from './ProductDetailPage.module.css';

const ProductDetailPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { selectedProduct, status, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(cartActions.addItemToCart(selectedProduct));
    }
  };

  if (status === 'loading') {
    return <div className={classes.centerText}><p>Loading product details...</p></div>;
  }

  if (!selectedProduct) {
    if (status === 'failed') {
      return <div className={classes.centerText}><p>Error: {error || 'Could not load product details.'}</p></div>;
    }
    if (status === 'succeeded' && id) {
      return <div className={classes.centerText}><p>Product with ID '{id}' not found.</p></div>;
    }
    return <div className={classes.centerText}><p>No product data or invalid ID specified.</p></div>;
  }
  
  return (
    <div className={classes.detailContainer}>
      <BasicButton 
        onClick={() => navigate(-1)} 
        visualStyle="secondary"
        className={classes.backButton}
      >
        Back to List
      </BasicButton>
      <Card className={classes.productDetailCard}>
          <div className={classes.imageContainer}>
              <img src={selectedProduct.image} alt={selectedProduct.title} className={classes.productImage} />
          </div>
          <div className={classes.contentContainer}>
              <h1 className={classes.productTitle}>{selectedProduct.title}</h1>
              <p className={classes.productCategory}>Category: {selectedProduct.category}</p>
              <p className={classes.productDescription}>{selectedProduct.description}</p>
              <p className={classes.productRating}>Rating: {selectedProduct.rating.rate}/5 ({selectedProduct.rating.count} ratings)</p>
              <p className={classes.productPrice}>Price: ${selectedProduct.price.toFixed(2)}</p>
              <BasicButton 
                onClick={handleAddToCart}
                className={classes.addToCartButton}
              >
                Add to Cart
              </BasicButton>
          </div>
      </Card>
    </div>
  );
};

export default ProductDetailPage;