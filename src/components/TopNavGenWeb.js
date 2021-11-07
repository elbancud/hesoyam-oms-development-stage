import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import {   useHistory} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import firebase from "../firebase"
import { yellow } from '@mui/material/colors';


const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer() {
    const [cookies] = useCookies(['user']);

    const history = useHistory();
    const classes = useStyles();
    const [activePage, setActivePage] = useState("")

    const [state, setState] = React.useState({
        top: false,

    });

    useEffect(() => {

        const db = firebase.database().ref("themeChosen")
        db.on("value", snap => {

            setActivePage(snap.val().designName)
        })
    }, [])
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    function getStarted() {
        history.push("/genWebLogin")
    }
    function prayerWall() {
        history.push("/prayerWall")
    }
    function donate() {
        history.push("/donationPage")
    }
    function pod() {
        history.push("/userPodcast")
    }
    function handleServiceRedirect() {
        if (cookies.UserLoginKey) {
            history.push("/userService")
        } else {
            history.push("/genWebLogin")
        }
    }
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >

            <Divider />
            <div className="pad-xy-sm">
                <ul>
                                    <li onClick={prayerWall} className="cursor-pointer">
                                            Prayer Wall
                                    </li>
                                    <li onClick = {donate} className="cursor-pointer">
                                            Donate
                                    </li>
                                    <li onClick={handleServiceRedirect} className="cursor-pointer">
                                            Services
                                    </li>
                                    <li onClick={pod} className="cursor-pointer">
                                            Podcast
                                    </li>
                                   
                </ul>
            </div>
        </div>
    );

    return (
        <div className="flex-space-between ">
            
            {['top'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                        <MenuIcon sx={{ color: 'grey.900' }}/>
                    </Button>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
