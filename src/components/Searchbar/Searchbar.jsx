import { useState } from 'react';
import { SearchbarStyled } from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';
import { Notify } from 'notiflix';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => setQuery(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      Notify.failure('Please fill out the form');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchbarStyled>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <AiOutlineSearch size="25px" color="black" />
        </button>

        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </SearchbarStyled>
  );
}
