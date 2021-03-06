import React, {useState, useEffect} from 'react'
import ItemsCarousel from 'react-items-carousel';
import Container from "@material-ui/core/Container";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import firebase from 'firebase';
import "../style/style.css";
import "../style/themes.css"

function Carousel() {
    const [announcementArray, setAnnouncementArray] = useState();
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [activeDesign, setActiveDesign] = useState("")
    useEffect(() => {

        const dbRef = firebase.database().ref("announcements" );
        dbRef.once("value")
            .then(function (snapshot) {
                const postSnap = snapshot.val();
                const announcementArray = [];
                for (let id in postSnap) {
                    announcementArray.push({id, ...postSnap[id]});
                }
                setAnnouncementArray(announcementArray)
            });
        
        const dbTheme = firebase.database().ref("themeChosen")
            dbTheme.on('value', snap => {
                setActiveDesign(snap.val().designName)      
            })
    }, [])
  
    return (
        <div>
            <Container>
                <div style={{ padding: `0 40px` }}>
                    <ItemsCarousel
                        requestToChangeActive={setActiveItemIndex}
                        activeItemIndex={activeItemIndex}
                        numberOfCards={2}
                        gutter={20}
                        leftChevron={<Tooltip title="previous">
                                                <IconButton >
                                                             <ArrowLeftIcon id = {activeDesign === "design3" ? "font-light": "font-dark"}/>
                                                </IconButton>
                                                </Tooltip>}
                        rightChevron={<Tooltip title="next">
                                                <IconButton >
                                                             <ArrowRightIcon id = {activeDesign === "design3" ? "font-light": "font-dark"}/>
                                                </IconButton>
                                                </Tooltip>}
                        outsideChevron
                        chevronWidth={40}
                    >
                          {announcementArray ? announcementArray.map((data)=> {
                             if (data.announcementTitle) {
                                 return (
                                 <div key={data.id} className="box m-xy-sm">
                                    <div className ="flex-space-between ">   
                                        <div className="box-default-width">
                                            <div className="  pad-xy-sm text-custom-width " id = {activeDesign === "design3" ? "font-dark": ""}>
                                                <div >
                                                    <b><h2>{data.announcementTitle}</h2></b>
                                                </div>
                                                <div className="subtitle">
                                                    <p>{data.announcementDescription}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                 </div>
                                )
                              }
                              return null;
                        }) : "No anouncements yet"}
                    
                    </ItemsCarousel>
                </div>
            </Container>
        </div>
    )
}

export default Carousel
