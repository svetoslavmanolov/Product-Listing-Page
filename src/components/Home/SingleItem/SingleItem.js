import { ButtonActions } from '../../../constants/ButtonActionsConstants';

import './SingleItem.css';
import '../Home.css';

export default function SingleItem({
    product,
    onActionClick
}) {

    return (
        <div className="product">
            <div className="product-card">
                <h2 className="name">{product.name}</h2>
                <span className="description">{product.description}</span>
                <span className="price">{product.price}.00$</span>
                <span className="color">{product.color}</span>
                <span className="rating">{product.rating}</span>
                <button
                    className='add-to-card-btn'
                    onClick={() => onActionClick(product.name, ButtonActions.AddToCart)}
                >
                    Add to Cart
                </button>
                <img src={product.img} className="product-img" alt="photo" />
            </div>
        </div>
    );
}