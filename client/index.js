import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { Auth0Provider } from '@auth0/auth0-react'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Auth0Provider
      domain="mako-2022-louis.au.auth0.com"
      clientId="gYY3mOkg7NFJh0cn4GzqHS7g7bfbSO80"
      redirectUri={window.location.origin}
      audience="https://receipts/api"
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>,
    document.getElementById('app')
  )
})
