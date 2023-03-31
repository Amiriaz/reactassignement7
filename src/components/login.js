import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import * as ReactBootStrap from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { loginUser } from "../config/firebasemethods";

function Login() {
  const [model, setModel] = useState({});
  const [Loader, setLoader] = useState(false);
  const Navigate = useNavigate();
  
  let signIn = () => {
    setLoader(true)
    loginUser(model)
      .then((res) => {
        setLoader(false)
        console.log(res);
      })
      .catch((err) => {
        setLoader(false)
        console.log(err);
        Navigate("/mainlayout")

      });
  };

  return (
    <>  
      <Box
        sx={{ height: "100vh" }}
        className="d-flex justify-content-center align-items-center "
      >
        <Box>
          <Typography variant="h3">Login</Typography>
          <Box className="p-2">
            <TextField
              onChange={(e) => setModel({ ...model, email: e.target.value })}
              variant="standard"
              label="Email"
            />
          </Box>
          <Box className="p-2">
            <TextField
              onChange={(e) => setModel({ ...model, password: e.target.value })}
              variant="standard"
              label="Password"
            />
          </Box>
          <Box className="p-2">
          {Loader ? <ReactBootStrap.Spinner/> :
            (<Button onClick={signIn} variant="contained">
               Login
            </Button>)}
         </Box>
        </Box>
      </Box>
      
    </>
  );
}
export default Login;