import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import products from '../../products';
import SingleItem from './SingleItem/SingleItem';
import Congratulations from '../Congratulations/Congratulations';
import { ButtonActions } from '../../constants/ButtonActionsConstants';
import './Home.css';
import './SingleItem/SingleItem.css';

export default function Home() {

    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);
    const [sortType, setSortType] = useState('');
    const [result, setResult] = useState();
    const [productAction, setProductAction] = useState({ product: null, action: null });
    const [filterAction, setFilterAction] = useState();
    const [menuAction, setMenuAction] = useState();

    const watchesCollection = products.watches;
    const clothesCollection = products.clothes;
    const shoesCollection = products.shoes;

    let currentCollection = activePath === '/watches'
        ? watchesCollection
        : activePath === '/clothes'
            ? clothesCollection
            : activePath === '/shoes'
                ? shoesCollection
                : watchesCollection

    const [currentCollectionLength, setcurrentCollectionLength] = useState(currentCollection.length);
    const [state, setState] = useState({
        query: '',
        list: []
    });

    const [addedItems, setAddedItems] = useState([]);
    const [productsPerLoad, setProductsPerLoad] = useState(3);

    const loadElements = (e) => {
        setProductsPerLoad((c) => c + 3);
    }

    useEffect(() => {
        setState((prev) => ({
            ...prev,
            list: [...currentCollection.slice(0, productsPerLoad)]
        }));
        setAddedItems([...currentCollection.slice(0, productsPerLoad)]);
    }, [currentCollection, productsPerLoad]);

    const setNavStyle = ({ isActive }) => {
        return isActive
            ? {
                color: 'white',
                fontWeight: 'bold'
            }
            : undefined;
    };

    useEffect(() => {
        setActivePath(location.pathname);
        setProductsPerLoad(c => 3);
        setResult();
    }, [location.pathname]);

    const itemsForFilter = addedItems.length ? addedItems : currentCollection.slice(0, productsPerLoad);

    const onFilterChange = (e) => {
        const results = itemsForFilter.filter(item => {
            if (e.target.value === 'default') return itemsForFilter;
            return (item['color'].includes(e.target.value)
                || item['price'] < e.target.value);
        });
        setResult(results);
        setState({
            query: e.target.value,
            list: sortFunc(results, sortType)
        });
    }

    function sortFunc(results, sortType) {
        if (sortType === 'ascA-Z') {
            results.sort((a, b) => a['name'] < b['name'] ? -1 : 1)
        } else if (sortType === 'descZ-A') {
            results.sort((a, b) => b['name'] > a['name'] ? 1 : -1)
        } else if (sortType === 'ascPrice') {
            results.sort((a, b) => a['price'] < b['price'] ? -1 : 1)
        } else if (sortType === 'descPrice') {
            results.sort((a, b) => b['price'] > a['price'] ? 1 : -1)
        }
        return results;
    }

    function updatePoints(e) {
        setSortType(e);
        setState({
            query: state.query,
            list: !result
                ? sortFunc(itemsForFilter, e)
                : sortFunc(result, e)
        });
    }

    const productActionClickHandler = (currentProductName, actionType) => {
        const currentProduct = state.list.find(product => product.name === currentProductName);
        setProductAction({
            product: currentProduct,
            action: actionType
        });
    }

    const filterButtonClickHandler = (openFilterIcon) => {
        setFilterAction(openFilterIcon)
    }

    const menuButtonClickHandler = (hamburgerIcon) => {
        setMenuAction(hamburgerIcon)
    }

    const closeCongratulationsHandler = () => {
        setProductAction({ product: null, action: null });
    }

    const closeMenuHandler = () => {
        setMenuAction();
    }

    const closeFilterHandler = () => {
        setFilterAction()
    }

    return (
        <>
            <nav className="navbar">
                <div className="brand">
                    <Link to='/watches'><span>StorePro</span></Link>
                </div>
                <button
                    aria-label="toggle menu"
                    id="responsiveMenuToggleButton"
                    className={menuAction === ButtonActions.OpenMenu ? "" : "open"}
                    onClick={() => menuButtonClickHandler(ButtonActions.OpenMenu)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="openIcon">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
                <button
                    aria-label="toggle menu close"
                    id="responsiveMenuToggleButtonClose"
                    className={menuAction === ButtonActions.OpenMenu ? "open" : ""}
                    onClick={closeMenuHandler}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="closeIcon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className={menuAction === ButtonActions.OpenMenu ? "navbar-links open" : "navbar-links"}>
                    <ul onClick={closeMenuHandler}>
                        <li><NavLink style={setNavStyle} to="/watches">Watches</NavLink></li>
                        <li><NavLink style={setNavStyle} to="/clothes">Clothes</NavLink></li>
                        <li><NavLink style={setNavStyle} to="/shoes">Shoes</NavLink></li>
                    </ul>
                </div>
            </nav>
            {productAction.action === ButtonActions.AddToCart &&
                <Congratulations
                    currentProduct={productAction.product}
                    onClose={closeCongratulationsHandler}
                />
            }
            <div className="main-category-container">
                <div className="filter-container">
                    <button
                        aria-label="toggle filter button"
                        id="openFilterButton"
                        onClick={() => filterButtonClickHandler(ButtonActions.OpenFilter)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="openFilterIcon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                    <div className='filter'>
                        <p className='p-filter-standard'>FILTER</p>
                        <p className='p-filter-shrinked'>Open filter</p>
                        <div className='select'>
                            <label htmlFor="color">Color</label>
                            <select
                                name="color"
                                id="color"
                                value={state.query}
                                onChange={onFilterChange}
                            >
                                <option value="default">Select color</option>
                                <option value="black">Black</option>
                                <option value="grey">Grey</option>
                                <option value="white">White</option>
                                <option value="red">Red</option>
                                <option value="blue">Blue</option>
                                <option value="green">Green</option>
                                <option value="orange">Orange</option>
                                <option value="yellow">Yellow</option>
                                <option value="brown">Brown</option>
                            </select>
                        </div>
                        <div className='select'>
                            <label htmlFor="price">Price</label>
                            <select
                                name="price"
                                id="price"
                                value={state.query}
                                onChange={onFilterChange}
                            >
                                <option value="default">Select price</option>
                                <option value="100">up to 100$</option>
                                <option value="200">up to 200$</option>
                                <option value="300">up to 300$</option>
                                <option value="500">up to 500$</option>
                                <option value="1000">up to 1 000$</option>
                                <option value="5000">up to 5 000$</option>
                                <option value="9000">up to 9 000$</option>
                            </select>
                        </div>

                    </div>
                    <div id="borderBottom"></div>
                </div>
                {filterAction === ButtonActions.OpenFilter &&
                    <div className='popup-view-wrapper'>
                        <div className='popup-filter-section'>
                            <button
                                aria-label="toggle filter button"
                                id="closeFilterButton"
                                onClick={closeFilterHandler}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="closeFilterIcon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className='filter-popup'>
                                <p>FILTER</p>
                                <div className='select'>
                                    <label htmlFor="color">Color</label>
                                    <select
                                        name="color"
                                        id="color"
                                        value={state.query}
                                        onChange={onFilterChange}
                                    >
                                        <option value="default">Select color</option>
                                        <option value="black">Black</option>
                                        <option value="grey">Grey</option>
                                        <option value="white">White</option>
                                        <option value="red">Red</option>
                                        <option value="blue">Blue</option>
                                        <option value="green">Green</option>
                                        <option value="orange">Orange</option>
                                        <option value="yellow">Yellow</option>
                                        <option value="brown">Brown</option>
                                    </select>
                                </div>
                                <div className='select'>
                                    <label htmlFor="price">Price</label>
                                    <select
                                        name="price"
                                        id="price"
                                        value={state.query}
                                        onChange={onFilterChange}
                                    >
                                        <option value="default">Select price</option>
                                        <option value="100">up to 100$</option>
                                        <option value="200">up to 200$</option>
                                        <option value="300">up to 300$</option>
                                        <option value="500">up to 500$</option>
                                        <option value="1000">up to 1 000$</option>
                                        <option value="5000">up to 5 000$</option>
                                        <option value="9000">up to 9 000$</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="name-description-container">
                    <p className='name-description-title'>{activePath.slice(1).toUpperCase()} Collection</p>
                    {activePath === '/watches'
                        ? <p className='name-description-text'>
                            Explore the art of horology with our stunning watch collection, now available in our e-store.
                        </p>
                        : activePath === '/clothes'
                            ? <p className='name-description-text'>
                                Discover a carefully curated range of jackets that combine fashion-forward designs with reliable cold-weather protection.
                            </p>
                            : activePath === '/shoes'
                                ? <p className='name-description-text'>
                                    Step into style and comfort with our exclusive shoe collection, where fashion meets function.
                                </p>
                                : <p className='name-description-text'>
                                    Explore the art of horology with our stunning watch collection, now available in our e-store.
                                </p>
                    }
                </div>
                <div className="sort-container">
                    <div className='select-sort'>
                        <label htmlFor="sort">Sort by</label>
                        <select
                            name="sort"
                            id="sort"
                            defaultValue={'default'}
                            onChange={(e) => updatePoints(e.target.value)}
                        >
                            <option value="default">Relevance</option>
                            <option value="ascA-Z">Brand A-Z</option>
                            <option value="descZ-A">Brand Z-A</option>
                            <option value="ascPrice">Price (low-high)</option>
                            <option value="descPrice">Price (high-low)</option>
                        </select>
                    </div>
                    <div id="borderBottom"></div>
                </div>
                <div className="grid-container">
                    <p className='product-counter'>{state.list.length} products shown</p>
                    {state.list.length
                        ? state.list.map(product =>
                            <SingleItem
                                key={product.id}
                                // key={Math.random()}
                                product={product}
                                onActionClick={productActionClickHandler}
                            />
                        )
                        : <p className='no-products-found'>No items found...</p>
                    }
                </div>
            </div>
            <div className="load-more-btn-container">
                {currentCollectionLength > productsPerLoad &&
                    <button
                        className='load-more-btn'
                        onClick={loadElements}
                    >
                        Load more
                    </button>
                }
            </div>
            <footer>
                <div className="footer-row">
                    <p>Find us on</p>
                </div>
                <div className="footer-row">
                    <ul className='media-links'>
                        <li><Link to="#"><i className="fa fa-facebook-square" aria-hidden="true"></i></Link></li>
                        <li><Link to="#"><i className="fa fa-linkedin-square" aria-hidden="true"></i></Link></li>
                        <li><Link to="#"><i className="fa fa-instagram" aria-hidden="true"></i></Link></li>
                        <li><Link to="#"><i className="fa fa-envelope" aria-hidden="true"></i></Link></li>
                    </ul>
                </div>
                <div className="footer-row">
                    <ul className='service-links'>
                        <li><Link to="#">Terms & Conditions</Link></li>
                        <li><Link to="#">Privacy Policy</Link></li>
                        <li><Link to="#">About us</Link></li>
                        <li><Link to="#">Contact us</Link></li>
                    </ul>
                </div>
                <div className="footer-row">
                    <p>
                        &copy; Copyrights. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    );
}