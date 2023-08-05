import './Congratulations.css'

const Congratulations = ({
    currentProduct,
    onClose
}) => {

    return (
        <div className="modal-order-div-wrapper">
            <div className="main-div">
                <div className="main-text">
                    <p className="text-1">You have successfully added the following product to your cart!</p>
                    <p className="text-2">{currentProduct.name}
                        <br />
                        {currentProduct.description}
                        <br />
                        {currentProduct.price}.00$
                    </p>
                    <button className="successful-order-button" type="button" onClick={onClose}>
                        <span>OK</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Congratulations;

