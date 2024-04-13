import { NextComponentType } from 'next';
import Router from 'next/router';
import { clearStorages } from './storage';

export const checkUserAuthentication = (): boolean => {
  let expired = null
  if (typeof window !== 'undefined') {
    expired = localStorage.getItem('isLoggedIn');
  }

  if (expired === 'true') return true;

  return false;
}

const withAuth = (Component: any) => {
  const Auth = (props: any) => {
    const isLoggedIn = checkUserAuthentication()
    if (!isLoggedIn) {
      if (typeof window !== 'undefined') {
        clearStorages()
        Router.push('/login')
      }
    }

    return <Component {...props} />
  }

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps
  }
  return Auth
}

export default withAuth;
