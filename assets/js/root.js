import React, { Component } from "react";
import Dashboard from './containers/Dashboards/Dashboard';
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { brown, teal } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/api',
  cache: new InMemoryCache()
});

const darkTheme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: brown,
    type: 'dark',
    background: {
      default: "#000000",
      paper: "#000000"
    }
  },
  typography: {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    }
  }
});

class Root extends Component {
  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <ApolloProvider client={client}>
          <CssBaseline />
          <Dashboard />
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}

export default Root;
