import React, { useEffect, useState}from 'react'
import "../style/style.css";
import "../style/themes.css"
import Container from "@material-ui/core/Container";
import { useCookies } from 'react-cookie';
import firebase from "../firebase"
import {  Link, useHistory} from 'react-router-dom';
import UserProfile from './UserProfile';
import { Button } from "@material-ui/core";
import TopNavGenWeb from './TopNavGenWeb'
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayer from 'react-h5-audio-player';
import QuickLinks from './QuickLinks';

function UserPodcast() {
        const [siteTitle, setSiteTitle] = useState("");
    
    const history = useHistory();
    const [cookies] = useCookies(['user']);
    const [activeCookies, setActiveCookes] = useState(false)
    const [podcastArray, setPodcastArray] = useState()
    const [activeDesign, setActiveDesign] = useState("")
    
    useEffect(() => {
                     const dbRef = firebase.database().ref("generated-data");
                        dbRef.on('value', snapshot => {

                                    setSiteTitle(snapshot.val().savedSiteTitle)
                            });
                        if(cookies.UserLoginKey) {
                            setActiveCookes(true)
                        }
        const dbRefPod = firebase.database().ref("podcast-audios-upload");
        dbRefPod.once("value").then(function (snapshot) {
                const postSnap = snapshot.val();
                const podcastArray = [];
                for (let id in postSnap) {
                    podcastArray.push({id, ...postSnap[id]});
                }
                setPodcastArray(podcastArray)
        });
          const dbTheme = firebase.database().ref("themeChosen")
            dbTheme.on('value', snap => {
            })

        
    }, []);
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
    return (
        <div className="design1-properties">
            <header>

            <div className="position-relative font-light">
                    <Container> 

                    <div className="pad-xy-sm position-fixed-top-z-1 full-width under-garment-gradient height-90">
                    </div>
                    
                            <nav className="pad-y-md flex-space-between " >
                                <div className="logo flex-default">
                                    <div className="icon"></div>
                                    <div className="app-name cursor-pointer">
                                        <Link to={activeDesign === "design1" ? "/design1" : activeDesign === "design2" ? "/design2" :"/design3"}>

                                            <h3 className="" id =""> {typeof(siteTitle) === 'undefined'? "Site title": siteTitle}</h3>
                                            
                                        </Link>
                                    </div>
                                </div>
                                <div className="nav-desktop-active">
                                    
                                    <ul className="flex-default">
                                            <li onClick={prayerWall}>
                                                    Prayer Wall
                                            </li>
                                            <li onClick = {donate}>
                                                    Donate
                                            </li>
                                            <li onClick={handleServiceRedirect}>
                                                    Services
                                            </li>
                                            <li onClick={pod}>
                                                    Podcast
                                            </li>
                                            {/* <li onClick={livestream}>
                                                    Streams
                                            </li> */}
                                            <li className = "flex-space-between" >
                                                    <QuickLinks/>
                                            </li>
                                            

                            </ul>
                                </div>
                                <div className="nav-desktop-active">
                                {
                                    activeCookies? <div> <UserProfile/></div>:  <Button
                                    onClick = {getStarted}
                                    variant="outlined"
                                    className="btn-large primary-color"
                                    color="primary"
                                    size="large"
                                    id="btn-large-primary-outline-white"
                                    >
                                    Get Started
                                    </Button>
                                }
                            
                                </div>
                                <div className="burger-nav ">
                                    <div className="flex-default">
                                        <div className="pad-x-sm">
                                        {
                                            activeCookies? <UserProfile/> : ""

                                        }
                                        </div>
                                        <TopNavGenWeb></TopNavGenWeb>
                                        
                                    </div>
                                </div>
                            </nav>
                        
                        <div className="align-text-center pad-y-lg">
                            <h1 className="" id ="dynamic-h1"> My sheep hear My voice, and I know them, and they follow Me. </h1>
                            <p><i>John 10:27</i></p>
                        </div>
                        <div>
                        <div className="">
                        {podcastArray ? podcastArray.map((data)=> {
                                 return (
                                 <div key={data.id} className="m-xy-md">
                                            
                                    <div  className="box width-sm ">
                                                <div className="pad-xy-sm" id="font-dark">
                                                    <b><h4 className="m-r-sm">{data.audioTitle}</h4></b>

                                                    <div>
                                                        <AudioPlayer
                                                            id="full-width"
                                                            src={data.audioLink}
                                                        />
                                                    
                                                    </div>    
                                                </div>
                                            

                                    </div>
                                 </div>

                                 )
                        }) : "No podcasts uploaded yet"}
                    </div>
                        </div>
                    </Container>

                    
                
            </div>
            </header>

        </div>
    )
}

export default UserPodcast
