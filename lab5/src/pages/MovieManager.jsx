// src/pages/MovieManager.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import { MovieProvider } from '../contexts/MovieContext';
import MovieForm from '../components/MovieForm';
import FilterBar from '../components/FilterBar';
import MovieTable from '../components/MovieTable';

const MovieManagerContent = () => {
  return (
    <Container className="mt-4">
      <h2>🎬 Quản lý phim</h2>
      <MovieForm />
      <FilterBar />
      <MovieTable />
    </Container>
  );
};

const MovieManager = () => {
  return (
    <MovieProvider>
      <MovieManagerContent />
    </MovieProvider>
  );
};

export default MovieManager;
