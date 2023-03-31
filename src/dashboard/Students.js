import UserAppBar from "../components/UserNavbar";
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { writeToDatabase } from '../config/firebasemethods';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

function Students() {
  const [studentObj, setStudentObj] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const navigate = useNavigate();

  const submit = () => {
      setButtonLoading(true)
      if (Object.values(studentObj).length >= 8) {
          writeToDatabase(studentObj)
              .then((success) => {
                  // Signed in 
                  alert(success);
                  navigate("/showReg", {
                      state: studentObj
                  });
                  setButtonLoading(false)
              })
              .catch((error) => {
                  const errorMessage = error.message;
                  const errorMessageUp = errorMessage.toUpperCase();
                  alert(errorMessageUp)
                  setButtonLoading(false)
              });
      } else {
          alert('ALL FIELDS MUST BE FILLED')
          setButtonLoading(false)
      }
  }

  const selectValHandler = (e) => {
      setStudentObj({ ...studentObj, course: e.target.value })
  }
  const selectValHandler1 = (e) => {
    setStudentObj({ ...studentObj, qualification: e.target.value })
}
const selectValHandler2 = (e) => {
  setStudentObj({ ...studentObj, city: e.target.value })
}
const selectValHandler3 = (e) => {
  setStudentObj({ ...studentObj, institute: e.target.value })
}
  return (
    <div > 
    <UserAppBar/>
    <div className='main-regis'>
            <UserAppBar />
            <Box sx={{ marginTop: 2 }}>
                <h1 className='regisdetail'>Students detail</h1>
            </Box>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 2, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Box>
                    <TextField label="Student Name" variant="outlined" onChange={e => setStudentObj({ ...studentObj, firstName: e.target.value })} />
                </Box>
                <Box>
                    <TextField label="Father Name" variant="outlined" onChange={e => setStudentObj({ ...studentObj, fatherName: e.target.value })}/>
                </Box>
                <Box>
                    <TextField label="Your Contact" onChange={e => setStudentObj({ ...studentObj, stuContact: e.target.value })} type='number' variant="outlined" />
                </Box>
                <Box>
                    <TextField label="CNIC" type='number' onChange={e => setStudentObj({ ...studentObj, stuCnic: e.target.value })} variant="outlined" />
                </Box>
                <Box>
                    <TextField label="Email" type='text' onChange={e => setStudentObj({ ...studentObj, email: e.target.value })} variant="outlined" />
                </Box>
                <Box>
                    <TextField label="Password" type='text' onChange={e => setStudentObj({ ...studentObj, password: e.target.value })} variant="outlined" />
                </Box>
                <Box>
                    <TextField label="Date of Birth" onChange={e => setStudentObj({ ...studentObj, dob: e.target.value })} variant="outlined" />
                </Box>
                <Box>
                    <TextField label="Address" onChange={e => setStudentObj({ ...studentObj, address: e.target.value })} type='text' variant="outlined" />
                </Box>
  
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Course</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select Course"
                            onChange={selectValHandler}
                            value={studentObj?.course || 'none'}
                        >
                    
                            <MenuItem value='Web and Mobile App Dev'>Web and Mobile App Dev</MenuItem>
                            <MenuItem value='Graphics Designing'>Graphic Designing</MenuItem>
                            <MenuItem value='Blockchain Development'>Blockchain Development</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Qualification</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select qualification"
                            onChange={selectValHandler1}
                            value={studentObj?.qualification || 'none'}
                        >
                            
                            <MenuItem value='matric'>Matric</MenuItem>
                            <MenuItem value='Inter'>Inter</MenuItem>
                            <MenuItem value='Master'>Master</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">City</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select City"
                            onChange={selectValHandler2}
                            value={studentObj?.city || 'none'}
                        >
                            
                            <MenuItem value='karachi'>karachi</MenuItem>
                            <MenuItem value='Lahore'>Lahore</MenuItem>
                            <MenuItem value='Blochishtan'>Blochishtan</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Institute</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select Institute"
                            onChange={selectValHandler3}
                            value={studentObj?.institute || 'none'}
                        >
                    
                            <MenuItem value='School'>School</MenuItem>
                            <MenuItem value='College'>College</MenuItem>
                            <MenuItem value='University'>University</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    {buttonLoading
                        ?
                        <Button>
                            <CircularProgress />
                        </Button>
                        :
                        <Button onClick={submit}>
                            Submit
                        </Button>
                    }
                </Box>
            </Box>
        
        </div>
    </div>

  );
}
export default Students;