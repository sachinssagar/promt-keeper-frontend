import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import CardList from './components/CardList';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import DetailView from './components/DetailView';

function App() {
  return (
    <div className="container  mt-4">
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<CardList />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/edit/:id" element={<EditItem />} />
        <Route path="/view/:id" element={<DetailView />} />
      </Routes>
    </div>
  );
}

export default App;
