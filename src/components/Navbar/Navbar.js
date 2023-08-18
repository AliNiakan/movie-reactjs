import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./Navbar.css"
function Navbar() {
    const [activeItem, setActiveItem] = React.useState('');

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };
    const { user, isAdmin } = useContext(AuthContext);
    return (
        <div className="navbar">
            <a
                className={activeItem === 'home' ? 'active' : ''}
                onClick={() => handleItemClick('home')}
                href="/"
            >
                Home <i className="fa fa-home" aria-hidden="true"></i>
            </a>
            {user ?
                null : <a
                    className={activeItem === 'login' ? 'active' : ''}
                    onClick={() => handleItemClick('login')}
                    href="/login"
                >
                    Login <i className="fa fa-sign-in" aria-hidden="true"></i>
                </a>}
            {user && <a
                className={activeItem === 'info' ? 'active' : ''}
                onClick={() => handleItemClick('info')}
                href="/myinfo"
            >
                My Info <i className="fa fa-address-card" aria-hidden="true"></i>
            </a>

            }
            {user && <a
                className={activeItem === 'friends' ? 'active' : ''}
                onClick={() => handleItemClick('friends')}
                href="/friends"
            >
                Friends <i className="fa fa-address-book" aria-hidden="true"></i>
            </a>
            }

            {user && <a
                className={activeItem === 'inbox' ? 'active' : ''}
                onClick={() => handleItemClick('inbox')}
                href="/inbox"
            >
                Inbox <i className="fa fa-inbox" aria-hidden="true"></i>
            </a>
            }

            <a
                className={activeItem === 'contact' ? 'active' : ''}
                onClick={() => handleItemClick('genres')}
                href="/genres"
            >
                Genres <i className="fa fa-film" aria-hidden="true"></i>
            </a>
            {user &&
                <a
                    className={activeItem === 'favorites' ? 'active' : ''}
                    onClick={() => handleItemClick('favorites')}
                    href="/favorites"
                >

                    Favorites <i className="fa fa-star" aria-hidden="true"></i>
                </a>
            }

            <a
                className={activeItem === 'contact' ? 'active' : ''}
                onClick={() => handleItemClick('contact')}
                href="/contactus"
            >
                Contact Us <i className="fa fa-phone" aria-hidden="true"></i>
            </a>
            {
                user &&
                <a
                    className={activeItem === 'logout' ? 'active' : ''}
                    onClick={() => handleItemClick('logout')}
                    href="/logout"
                >
                    Log Out <i className="fa fa-sign-out" aria-hidden="true"></i>
                </a>
            }

            {
                isAdmin && user && (
                    <a
                        className={activeItem === 'addmovie' ? 'active' : ''}
                        onClick={() => handleItemClick('addmovie')}
                        href="/addmovie"
                        style={{ color: '#FFD700' }}
                    >
                        Add Movie <i className="fa fa-plus" aria-hidden="true"></i>
                    </a>
                )
            }

        </div >
    )
}

export default Navbar;