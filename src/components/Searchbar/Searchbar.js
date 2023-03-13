import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
// import { Formik, Field, Form } from 'formik';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleOnChage = evt => {
    const query = evt.currentTarget.value;
    setSearchQuery(query.toLowerCase().trim());
  };

  const handleOnSubmit = evt => {
    if (!searchQuery) {
      toast.error('Please, enter find name', { duration: 1000 });
    }
    evt.preventDefault();
    onSubmit(searchQuery);
    reset();
  };

  const reset = () => {
    setSearchQuery('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleOnSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          type="text"
          name="searchQuery"
          onChange={handleOnChage}
          value={searchQuery}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
