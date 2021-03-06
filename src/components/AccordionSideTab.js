import React, { useState} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import firebase from '../firebase';


function AccordionSideTab() {

  const [typing, setTyping] = useState(false);
  const [siteTitle, setSiteTitle] = useState("");
  const [headerTitle, setHeaderTitle] = useState("");
  const [subHeaderTitle, setSubHeaderTitle] = useState("");
  const [aboutMainText, setAboutMainText] = useState("");
  const [aboutSubText, setAboutSubText] = useState("");
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");
  const [siteEmail, setSiteEmail] = useState("");

  const [contactPerson1, setContactPerson1] = useState("");
  const [contactPerson2, setContactPerson2] = useState("");
  const [contactPerson3, setContactPerson3] = useState("");


  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  function saveChanges(e) {
    e.preventDefault();
    const dbRef = firebase.database().ref("generated-data");
   
    if (siteTitle !== "") {
      dbRef.update({ savedSiteTitle: siteTitle })
    }
    if (headerTitle !== "") {
      dbRef.update({ savedHeaderTitle: headerTitle });
    }if (subHeaderTitle !== "") {
      dbRef.update({ savedSubHeaderTitle: subHeaderTitle });
    }if (aboutMainText !== "") {
      dbRef.update({ savedAboutMainText: aboutMainText });
    }if (aboutSubText !== "") {
      dbRef.update({ savedAboutSubText: aboutSubText });
    }if (location !== "") {
      dbRef.update({ savedLocation: location });
    }if (number !== "") {
      dbRef.update({ savedNumber: number });
    }if (siteEmail !== "") {
      dbRef.update({ savedSiteEmail: siteEmail });
    }if (contactPerson1 !== "") {
      dbRef.update({ contactPerson1: contactPerson1 });
    }if (contactPerson2 !== "") {
      dbRef.update({ contactPerson2: contactPerson2 });
    }if (contactPerson3 !== "") {
      dbRef.update({ contactPerson3: contactPerson3 });
    }
    
    
    
    
    setSiteTitle("");
    setHeaderTitle("")
    setSubHeaderTitle("")
    setAboutMainText("")
    setAboutSubText("")
    setLocation("")
    setNumber("")
    setSiteEmail("")
    setContactPerson1("")
    setContactPerson2("")
    setContactPerson3("")
    setTyping(false);

  }
 
   return (
    
     <div className="box-default-width-accordion">
       <div className="modal-footer plain-white-color-bg  pad-x-sm ">
           <div className="flex-space-between pad-y-sm full-width box-default-width-accordion">
           <div>
             
            </div>
           <Button
                  onClick={saveChanges}
                  disabled={!typing}
                  variant="outlined"
                  color="secondary"
                  size="small">
                  <Typography variant="subtitle2">Save</Typography>
                  
            </Button>
          </div>
        </div>
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className="box-shadow-light ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
           
        >
          <Typography variant="subtitle2">Site Title</Typography>
        </AccordionSummary>
         <AccordionDetails>
           <div>
            <Typography variant="body2" className="pad-l-t ">
              <i>Set your website's title here. This will be saved and displayed at the top left corner of your website.</i>
            </Typography>
                  <div className="pad-l-t ">
                      <TextField value={siteTitle} onChange={(e) => { setSiteTitle(e.target.value); setTyping(true)}} fullWidth id="outlined-full-width"  label="Site title" size="small" variant="outlined" className="text-input-deafult full-width"/>
                  </div>
            </div>

        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className="box-shadow-light ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography variant="subtitle2">Header: Tagline</Typography>
        </AccordionSummary>
        <AccordionDetails>
           <div>
            <Typography variant="body2" className="pad-l-t ">
              <i>Enter your website's tagline here. We suggest it is referenced as to how you want your audiences to remember.</i>
            </Typography>
            <div className="pad-l-t ">
               <TextField value={headerTitle} onChange={(e) => { setHeaderTitle(e.target.value); setTyping(true)}}  id="outlined-full-width"  label="Tagline" size="small" variant="outlined" className="text-input-deafult full-width"/>
                  </div>
           </div>

        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className="box-shadow-light ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography variant="subtitle2">Header: Subtitle</Typography>

        </AccordionSummary>
        <AccordionDetails>
           <div>
            <Typography variant="body2" className="pad-l-t ">
              <i>This section is the phrase under your tagline. Ideally, this will have a brief description of your services and overall info about the website</i>
            </Typography>
            <div className="pad-l-t ">
               <TextField value={subHeaderTitle} onChange={(e) => { setSubHeaderTitle(e.target.value); setTyping(true)}}  id="outlined-full-width" fullWidth label="Sub title" size="small" variant="outlined" className="text-input-deafult full-width"/>
                  </div>
           </div>
        </AccordionDetails>
       </Accordion>
       <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} className="box-shadow-light ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography variant="subtitle2">Announcements & Events</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <i>This section requires you to visit the posts and announcements tab. There you could have a specific forms which you could fill to dynamically post the articles</i>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} className="box-shadow-light ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography variant="subtitle2">About Us: Main text</Typography>
        </AccordionSummary>
         <AccordionDetails>
           <div>
            <Typography variant="body2" className="pad-l-t ">
              <i>In this section briefly indicate what the institution's  Mission or Vision.</i>
            </Typography>
            <div className="pad-l-t ">
               <TextField value={aboutMainText} onChange={(e) => { setAboutMainText(e.target.value); setTyping(true)}}   id="outlined-full-width" fullWidth label="About us" size="small" variant="outlined" className="text-input-deafult full-width"/>
                  </div>
           </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')} className="box-shadow-light ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography variant="subtitle2">About Us: Description</Typography>
        </AccordionSummary>
         <AccordionDetails>
           <div>
            <Typography variant="body2" className="pad-l-t ">
              <i>Under your main text dictates either of your Mission or Vissions's undertakings.</i>
            </Typography>
            <div className="pad-l-t ">
               <TextField value={aboutSubText} onChange={(e) => { setAboutSubText(e.target.value); setTyping(true)}}   id="outlined-full-width"  label="Description" size="small" variant="outlined" className="text-input-deafult full-width"/>
                  </div>
           </div>
        </AccordionDetails>
       </Accordion>
       <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')} className="box-shadow-light ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography variant="subtitle2">Contact Us: Contact Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
           <div>
            <Typography variant="body2" className="pad-l-t ">
              <i>Input your organization's details here.</i>
            </Typography>
             <div className="m-t-sm">
                  <Typography variant="subtitle2">Location</Typography>
               <TextField value={location} onChange={(e) => { setLocation(e.target.value); setTyping(true)}}  id="outlined-full-width" fullWidth label="Location" size="small" variant="outlined" className="text-input-deafult full-width"/>

             </div>
             <div className="pad-y-sm ">
                    <Typography variant="subtitle2">Contact Details</Typography>
                      
                    <TextField value={number} onChange={(e) => { setNumber(e.target.value); setTyping(true)}}  id="outlined-full-width" fullWidth label="Contact Number" size="small" variant="outlined" className="text-input-deafult full-width"/>
                    <div className="pad-l-t">
                    </div>
                    
                     <TextField value={siteEmail} onChange={(e) => { setSiteEmail(e.target.value); setTyping(true) }}  id="outlined-full-width" fullWidth label="Email" size="small" variant="outlined" className="text-input-deafult full-width" />

                  

             </div>
             <div className="">
                    <Typography  Typography variant="subtitle2">Contact Personnel</Typography>
                    
                    <div className="pad-l-t">
                    </div>
                    <TextField value={contactPerson1} onChange={(e) => { setContactPerson1(e.target.value); setTyping(true)}}  id="outlined-full-width" fullWidth label="Contact Person 1" size="small" variant="outlined" className="text-input-deafult full-width"/>

                    <div className="pad-l-t">
                    </div>
                    <TextField value={contactPerson2} onChange={(e) => { setContactPerson2(e.target.value); setTyping(true)}}  id="outlined-full-width" fullWidth label="Contact Person 2" size="small" variant="outlined" className="text-input-deafult full-width"/>

                    <div className="pad-l-t">
                    </div>
                    <TextField value={contactPerson3} onChange={(e) => { setContactPerson3(e.target.value); setTyping(true)}}  id="outlined-full-width" fullWidth label="Contact Person 3" size="small" variant="outlined" className="text-input-deafult full-width"/>

             </div>
           </div>
        </AccordionDetails>
       </Accordion>
      
    </div>
  );
}

export default AccordionSideTab;