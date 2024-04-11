import React, { useState } from 'react';
import SearchBar from './SearchBar';

const BooksPage = () => {
    const [searchResults, setSearchResults] = useState([]);

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
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    return (
        <div>
            <h1>Поиск книг</h1>
            <SearchBar onSearch={handleSearch} />
            {/* Вывод результатов поиска */}
            <ul>
                {searchResults.map(book => (
                    <li key={book.id}>{book.name} {book.author} {book.price} {book.pathimg}</li>
                ))}
            </ul>
        </div>
    );
};

export default BooksPage;