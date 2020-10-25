import React from 'react';
import Container from '@material-ui/core/Container';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container maxWidth='sm'>
          <h1>Welcome to Ecommerce</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
