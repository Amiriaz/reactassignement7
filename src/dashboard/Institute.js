import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addCourse, DeleteDataFromDataBase, updateData } from '../config/firebasemethods'
import { ReadFromDatabase } from '../config/firebasemethods';
import TextField from '@mui/material/TextField';
import Card from 'react-bootstrap/Card';
import CircularProgress from '@mui/material/CircularProgress';
const drawerWidth = 240;

function Institutedashboard(props) {
  const [courseObj, setCourseObj] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [editMode, setEditMode] = useState(false)
  const [EditData, setEditData] = useState()
  const [editIndex, setEditIndex] = useState(null)
  // console.log(courseObj)

  const addCourses = () => {
      if (Object.values(courseObj).length >= 6) {
          addCourse(courseObj)
              .then((success) => {
                  alert(success);
              })
              .catch((err) => {
                  console.log(err);
              })
      }
      else {
          alert("All Fields Must Be filled")
      }
  }


  useEffect(() => {
      ReadFromDatabase('course data')
          .then((res) => {
              setCourseData(Object.values(res));
              setIsLoading(false)
          })
          .catch((err) => {
              console.log(err)
              setIsLoading(false)
          })
  }, [])

  const UpdateCourse = (data, id) => {
      setEditData(data)
      setEditIndex(id)
      setEditMode(!editMode)
  }

  const EditCourseHandler = () => {
      courseData[editIndex] = EditData
      updateData(EditData)
      setCourseData([...courseData])
      setEditMode(!editMode)
      setEditData(false)
      setEditIndex(null)
  }

  const cancelEdit = () => {
      setEditData(false)
      setEditMode(!editMode)
  }
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Course List', 'Course form', 'Registration Control', 'Result'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
        
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="center"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
            >
            <MenuIcon />
          </IconButton>
          <Typography className='text-center' variant="h5" noWrap component="div">
          Institute dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
        >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
          >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
        <Toolbar />
       <Box>

       </Box>
      <Box sx={{ display: { xs: '', sm: 'block' } }}>
                        {
                            [
                            {
                                route: '/Course', name: 'Course form'
                            },
                           
                        ]
                            .map((page, index) => (
                                <Button key={index} onClick={() => navigate(page.route)} sx={{ color: '#fff' }}>
                                    {page.name}
                                </Button>
                            ))
                        }
                    </Box>
      
                    <div>
            <Box sx={{ justifyContent: 'center', marginTop: 1, color: 'white', display: 'flex' }}>
                <h1 className='h1courses'>Add Courses</h1>
            </Box>
            {EditData
                ?
                <Box
                    sx={{
                        '& > :not(style)': { m: 2, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Box>
                        <TextField label={'COURSE NAME'} value={EditData.courseName} variant='outlined' onChange={e => setEditData({ ...EditData, courseName: e.target.value })} />
                    </Box>
                    <Box>
                        <TextField label={'COURSE DESCRIPTION'} value={EditData.courseDes} variant='outlined' onChange={e => setEditData({ ...EditData, courseDes: e.target.value })} />
                    </Box>
                    <Box>
                        <TextField label={"LEAD TEACHER"} value={EditData.nolt} variant='outlined' onChange={e => setEditData({ ...EditData, nolt: e.target.value })} />
                    </Box>
                    <Box>
                        <TextField value={EditData.assissTeacher} label='ASSISTANT TEACHER' variant='outlined' onChange={e => setEditData({ ...EditData, assissTeacher: e.target.value })} />
                    </Box>
                    <Box>
                        <TextField label={'SEATS'} value={EditData.maxSeats} variant='outlined' type='number' onChange={e => setEditData({ ...EditData, maxSeats: e.target.value })} />
                    </Box>
                    <Box>
                        <TextField label='PRICE' value={EditData.price} variant='outlined' type='number' onChange={e => setEditData({ ...EditData, price: e.target.value })} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button onClick={EditCourseHandler}>
                            UPDATE DATA
                        </Button>
                        <Button onClick={cancelEdit}>
                            CANCEL
                        </Button>
                    </Box>
                </Box>
                :
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 2, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <>
                        <Box>
                            <TextField value={courseObj.courseName} label="Course Name" variant="outlined" onChange={e => setCourseObj({ ...courseObj, courseName: e.target.value })} />
                        </Box>
                        <Box>
                            <TextField value={courseObj.courseDes} label="Course Description" onChange={e => setCourseObj({ ...courseObj, courseDes: e.target.value })} variant="outlined" />
                        </Box>
                        <Box>
                            <TextField value={courseObj.nolt} label="Name of Lead Teacher" onChange={e => setCourseObj({ ...courseObj, nolt: e.target.value })} type='text' variant="outlined" />
                        </Box>
                        <Box>
                            <TextField value={courseObj.assissTeacher} label="Name of Assisstant Teachers" type='text' onChange={e => setCourseObj({ ...courseObj, assissTeacher: e.target.value })} variant="outlined" />
                        </Box>
                        <Box>
                            <TextField value={courseObj.maxSeats} label="Maximum Seats" type='number' onChange={e => setCourseObj({ ...courseObj, maxSeats: e.target.value })} variant="outlined" />
                        </Box>
                        <Box>
                            <TextField value={courseObj.price} label="Price" type='number' onChange={e => setCourseObj({ ...courseObj, price: e.target.value })} variant="outlined" />
                        </Box>
                        <Box>
                            <Button onClick={addCourses}>
                                Add
                            </Button>
                        </Box>
                    </>
                </Box>
            }
            <Box sx={{ justifyContent: 'center', color: 'white', display: 'flex' }}>
                <h1 className='h1courses'>Your Courses</h1>
            </Box>
            <Box sx={{ marginTop: 2 }}>
                {
                    isLoading
                        ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <CircularProgress />
                        </Box>
                        :
                        <Box>

                            {
                                courseData.map((e, i) => {
                                    return (

                                        <Card style={{ width: '100%', marginBottom: 20 }} key={i}>

                                            <Card.Body>
                                                <Card.Title>{e.courseName}</Card.Title>
                                                <Card.Text>
                                                    {e.courseDes}
                                                </Card.Text>
                                                <Card.Text>
                                                    Course Lead Teacher: <b> {e.nolt} </b>
                                                </Card.Text>
                                                <Card.Text>
                                                    Course Assisstant Teacher: <b> {e.assissTeacher} </b>
                                                </Card.Text>
                                                <Card.Text>
                                                    Seats: {e.maxSeats}
                                                </Card.Text>
                                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <h3>{e.price}/- Rs</h3>
                                                </Box>

                                            </Card.Body>

                                            <Box sx={{ display: 'flex', gap: 1, marginLeft: 2, marginBottom: 2 }}>
                                                <Box>
                                                    {
                                                        !editMode &&
                                                        <Button onClick={() => UpdateCourse(e, i)}>
                                                            Edit Course
                                                        </Button>
                                                    }
                                                </Box>
                                                <Box>
                                                    <Button /*onClick={() => deleteHander(e)}*/ variant="primary">Delete Course</Button>
                                                </Box>
                                            </Box>
                                        </Card>
                                    )
                                })
                            }
                        </Box>
                }
            </Box>
        </div >
    
      </Box>
    </Box>
  );
}

Institutedashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Institutedashboard;