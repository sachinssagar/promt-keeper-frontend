import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import CardList from './components/CardList';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import DetailView from './components/DetailView';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <div className="container mt-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<CardList />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/edit/:id" element={<EditItem />} />
          <Route path="/view/:id" element={<DetailView />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
