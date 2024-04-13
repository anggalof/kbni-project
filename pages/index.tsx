import React, { useEffect } from 'react';
import Router from 'next/router';
import { AppContext } from 'next/app';
import Login from './login';

function Home(props: any) {
  useEffect(() => {
    Router.push('/login');
  }, []);

  return (
    <React.Fragment>
      <Login {...props} />
    </React.Fragment>
  );
}

export async function getServerSideProps(context: AppContext) {
  return {
    props: {},
  }
}

export default Home;
