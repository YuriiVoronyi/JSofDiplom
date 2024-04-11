import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import SearchBar from './SearchBar';

const BooksPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleSearch = async (searchTerm) => {
        try {
            // Отправка запроса на серверный эндпоинт для поиска книг
            const response = await fetch(`/api/books/${searchTerm}`);
            if (!response.ok) {
                throw new Error('Ошибка при выполнении запроса');
            }
            const data = await response.json();
            
            // Обновление состояния компонента с результатами поиска
            setSearchResults(data);

            // Показать модальное окно, если результаты поиска пусты
            if (data.length === 0) {
                setShowModal(true);
            } else {
                setShowModal(false);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <h1>Поиск книг</h1>
            <SearchBar onSearch={handleSearch} />
            {/* Вывод результатов поиска */}
            {searchResults.length > 0 && (
                <ul>
                    {searchResults.map(book => (
                        <li key={book.id}>{book.name}, {book.author}, {book.price}, {book.pathimg}</li>
                    ))}
                </ul>
            )}
            {/* Модальное окно "Книга не найдена" */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Книга не найдена</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>К сожалению, по вашему запросу книга не найдена.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BooksPage;