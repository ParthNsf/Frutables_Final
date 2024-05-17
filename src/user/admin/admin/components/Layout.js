import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import MailIcon from '@mui/icons-material/Mail';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import SoupKitchenOutlinedIcon from '@mui/icons-material/SoupKitchenOutlined';
import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const drawerWidth = 240;

const adminDrawerData = [
    {name: 'Fruits', icon:<RestaurantOutlinedIcon />, link: '/admin/fruits'},
    {name: 'Vegetables', icon:<SoupKitchenOutlinedIcon />, link: '/admin/vegetables'},
    {name: 'Category', icon:<FormatListNumberedIcon />, link: '/admin/category'},
    {name: 'Facilties', icon:<AddIcon />, link: '/admin/facilties'},
    {name: 'Groceries', icon:<AddIcon />, link: '/admin/groceries'},
    {name: 'Products', icon:<AddIcon />, link: '/admin/products'},
    {name: 'Counter', icon:<AddIcon />, link: '/admin/counter'},
    {name: 'Coupon', icon:<AddIcon />, link: '/admin/coupon'}
]

export default function Layout({ children }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Admin Panel
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                   {adminDrawerData.map((value, index) => (
                        <ListItem key={index} disablePadding component={NavLink} to={value.link}>
                            <ListItemButton >
                                {value.icon}
                                <ListItemText primary={value.name} />
                            </ListItemButton>
                        </ListItem>

                    ))}
                </List>
     
            </Drawer>
            <Box component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                
                { children }

            </Box>
        </Box>
    );
}
