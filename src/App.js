
import './App.css';
import SignInSide from './MyComponents/SignInSide';
import PrimarySearchAppBar from './MyComponents/PrimarySearchAppBar';
import SignUp from './MyComponents/SignUp';
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from '@material-ui/core/styles';
import {BrowserRouter,Route, Switch, Redirect } from 'react-router-dom';







const theme = createTheme({
  
  overrides: {

    MuiMenuItem:{
      root:{
      color:"#ffffff",
      },
    },

    MuiOutlinedInput:{
      notchedOutline:{
      borderColor:"#ffffff",
    },
  },

    MuiFormLabel:{
      root:{
        color:"#808080",
      },
    },

      MuiCssBaseline:{ 
        '@global':{
        body:{
          backgroundColor:"#190a28",
        },
      },
      },
    
    MuiIconButton:{
      label:{
        color:"#ffffff",
      },
    },
    MuiPaper: {
      root: {
        backgroundColor:'#190a28',
      },
    },
    MuiTypography:{
      root:{
        color:"White",
      },
    },
    MuiListItemIcon:{
      root:{
        color:'#ffffff',
      },
    },
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#d2ff00',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#ffffff',
      main: '#190a28',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffffff',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});




function App() {
 return (
 <>
 
 <ThemeProvider theme={theme}>
  <PrimarySearchAppBar/> 
  
  
 
</ThemeProvider></>
  );
 
}

export default App;

