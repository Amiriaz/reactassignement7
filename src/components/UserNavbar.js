import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
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
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;

function UserAppBar(props) {

  
    const navigate = useNavigate();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
            Students dashboard
            </Typography>
            <Divider />
            <List>


                {[
              
                { route: '/quizform', name: 'Quiz' },
                { route: '/quizdetail', name: 'Quiz Detail' },
            ].map((page, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText onClick={() => navigate(page.route)} primary={page.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
                {/* {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))} */}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { sm: 'block' } }}
                    >
                       Students dashboard
                   
                    </Typography>
                    
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
  
                              {
                            [
                { route: '/quizform', name: 'Quiz' },
                                { route: '/quizdetail', name: 'Quiz Detail' },
  
                        
                        
                        ].map((page, index) => (
                                <Button key={index} onClick={() => navigate(page.route)} sx={{ color: '#fff' }}>
                                    {page.name}
                               
                                </Button>
                                
                            ))
                       
                       }
                    
                    </Box>
                    
                </Toolbar>
                
            </AppBar>
            
            <Box component="nav">
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
                    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Students List</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Student Name
          </Typography>
          <Typography>
          Father Name
          </Typography>
          <Typography>
          Cource
          </Typography>
        </AccordionDetails>
      </Accordion>
                </Drawer>
            </Box>
            <Box component="main" className='adminmaintext'>
                <Toolbar />
            </Box>
        </Box >
    );
}

UserAppBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default UserAppBar;