import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Drawer, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import Images from './Images';
import './style/paginas.css'; // Importa los estilos CSS

const drawerWidth = 180;

const Home = () => {
    const [randomItems, setRandomItems] = useState([]);
    const [showAddIngredient, setShowAddIngredient] = useState(false);
    const [ingredient, setIngredient] = useState({
        name: '',
        quantity: '',
        unit: '',
        price: '',
    });
    const [isLogged, setIsLogged] = useState(true);
    const navigate = useNavigate();

    //parte de notas
    const handleShowAddIngredient = () => {
        setShowAddIngredient(!showAddIngredient);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setIngredient({ ...ingredient, [name]: value });
    };

    const handleAddIngredient = () => {
        // Aquí puedes manejar la lógica para agregar el ingrediente a la lista de compras
        // Por ejemplo, puedes almacenar el ingrediente en una lista o realizar una acción específica con estos datos
        console.log('Agregando ingrediente:', ingredient);
        // Después de manejar la lógica, puedes reiniciar los valores de ingredient
        setIngredient({ name: '', quantity: '', unit: '', price: '' });
        setShowAddIngredient(false);
    };
    //fin de notas

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const getRandomItems = () => {
        const shuffledItems = Images.sort(() => 0.5 - Math.random());
        const selectedItems = shuffledItems.slice(0, 3).map(item => ({
            ...item,
            description: truncateText(item.description, 100), // Trunca la descripción a 100 caracteres
        }));
        setRandomItems(selectedItems);
    };

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');

    const handleItemClick = (text) => {
        if (text === 'Cerrar sesión') {
            setIsLogged(false); // Cierra la sesión al hacer clic en 'Cerrar sesión'
            navigate('/');
        } else {
            setMessage(`Lo sentimos, pero por el momento estamos trabajando en ${text}`);
            setShowMessage(true);
        }
    };

    const handleClose = () => {
        setShowMessage(false);
    };


    useEffect(() => {
        getRandomItems();
    }, []);

    const handleLogout = () => {
        // Aquí realizas las acciones necesarias para cerrar la sesión
        setIsLogged(false);
    };

    return (
        <div>
            {/* Sidebar */}
            <Drawer className="drawer-contend" variant="permanent" classes={{ paper: "drawerPaper" }} anchor="left">
                <div className="toolbar">
                    <List className="menu-list">
                        {['Editar perfil', 'Mis recetas', 'Consultar recetas', 'Crear receta', 'Cerrar sesión'].map((text, index) => (
                            <ListItem
                                button
                                className="menu-list-item"
                                key={text}
                                onClick={() => handleItemClick(text)}
                            >
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>

            {/* Message Dialog */}
            <Dialog open={showMessage} onClose={handleClose}>
                <DialogTitle>Advertencia</DialogTitle>
                <DialogContent dividers>
                    <p>{message}</p>
                    <Button onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogContent>
            </Dialog>


            {/* Main content */}
            <div className="content">
                {/* Contenido principal */}
                <h1>Platillos recomendados para el día de hoy</h1>
                <div className="recommended-dishes">
                    {randomItems.map((item) => (
                        <div className="dish" key={item.id}>
                            <img src={item.src} alt={item.alt} />
                            <div className="dish-info">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Nuevos divs para la lista de compra */}
                <div className="bottom-section">
                    <div className="list-section">
                        <h3>Mi lista de compra</h3>
                        <p>{/* Puedes mostrar la fecha aquí si lo deseas */}</p>
                        {showAddIngredient && (
                            <div className="add-ingredient">
                                <input
                                    type="text"
                                    name="name"
                                    value={ingredient.name}
                                    onChange={handleInputChange}
                                    placeholder="Ingrediente"
                                />
                                <input
                                    type="text"
                                    name="quantity"
                                    value={ingredient.quantity}
                                    onChange={handleInputChange}
                                    placeholder="Cantidad"
                                />
                                <input
                                    type="text"
                                    name="unit"
                                    value={ingredient.unit}
                                    onChange={handleInputChange}
                                    placeholder="Unidad"
                                />
                                <input
                                    type="text"
                                    name="price"
                                    value={ingredient.price}
                                    onChange={handleInputChange}
                                    placeholder="Precio"
                                />
                                <button onClick={handleAddIngredient}>Agregar</button>
                            </div>
                        )}
                    </div>
                    <div className="button-section">
                        <button className="add-button" onClick={handleShowAddIngredient}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
