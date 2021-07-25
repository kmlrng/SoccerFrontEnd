// import axios from 'axios';
// import {
//     USER_LOGIN_REQUEST,
//   USER_LOGIN_SUCCESS,
//   USER_LOGIN_FAIL,
// } from '../../constants/userConstants';






// export const login = (email_id,name, password) => async (dispatch) => {
//     try {
//       dispatch({
//         type: USER_LOGIN_REQUEST,
//       });
  
//       const config = {
//         method:'POST',
//         headers: {
//             'accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//       };
  
//       const {data} = await axios.post(
//         'http://127.0.0.1:8080/sign_up/',
//         {email_id, name, password},
//         config
//       );
  
//       dispatch({
//         type: USER_LOGIN_SUCCESS,
//         payload: data,
//       });

//       localStorage.setItem('userInfo', JSON.stringify(data));
//     } catch (error) {
//       dispatch({
//         type: USER_LOGIN_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       })
//     }
//   }