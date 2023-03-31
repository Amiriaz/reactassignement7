
import {Box,Button,Grid,Typography} from '@mui/material';
import { useState,useEffect } from 'react';
import { GetFBData, postFBData } from '../config/firebasemethods';
import SMGrid from '../components/SMGrid'
import SMInput from '../components/SMInput'
import SMButton from '../components/SMButton'
import SModal from '../components/SModal'


function Feedback() {
const [open,setOpen] = useState(false)
const [modal,setModal] = useState({});
const [loader,setLoader] = useState(false);   
const [listData,setListData] = useState([]);   
const [displayObj,setDisplayObj] = useState({})
const col = [
{
userName: "",
email: "",
message: ""
}
]
let saveFeed = () =>{
  setLoader(true)
  postFBData("Feeds" , modal)
  .then(() =>{
    console.log("Save successfully")
setOpen(false)
setLoader(false)
  })
  .catch((err) =>{
    console.log(err);
    setLoader(false)
  })
} 
let showFbData = () =>{
  GetFBData("Feeds")
  .then((res) =>{
    console.log(res);
    setListData([...res])
  })
}
useEffect(() =>{
  showFbData();
},[]);
const showSingleDataCard = () => {};

  return (
    <>
    <SModal title="Dummy Modal"innerContent={
      <Box>
        <Grid container>
          <Grid className='p-2' item md={6}>
            <SMInput value={modal.userName}
            onChange={(e) =>
            setModal({ ...modal, userName: e.target.value})
            }
            label="User Name"/>
        </Grid>
          <Grid className='p-2' item md={6}>
          <SMInput value={modal.email}
          onChange={(e) =>
          setModal({ ...modal, email: e.target.value})
        }
        label="Email">
        </SMInput>
        </Grid>
        <Grid className='p-2' item md={12}>
          <SMInput value={modal.message}
          onChange={(e) =>
          setModal({ ...modal, message: e.target.value})
        }
        label="Message"/>
        </Grid>
        </Grid>
      </Box>
    }
    modalFooter={
<Box align="right">
  <SMButton label="save" onClick={saveFeed} loading={loader} />
    </Box>
    }
close={(e) => setOpen(e)}
open={open}
/>
<Box>
  <h1>Feedback</h1>
  <Button onClick={() => setOpen(true)} variant="contained">
    Add  Feedback
  </Button>
</Box>
<Box>
  <Grid container>
    <Grid onClick={() => showSingleDataCard()} item md={9}>
      <SMGrid datasource={listData} column={col}/>
    </Grid>
    <Grid item md={3} className="p-2">
      <Box sx={{ borderRadius: "20px", height: 500 }}
        className="text-center showdow-lg bg-white p-2"
        >
          <Typography variant='h5' className='fw-bold'>
            {displayObj.userName}
          </Typography>

          <Typography variant='h6' className='text-muted'>
            {displayObj.email}
          </Typography>

          <Typography variant='body1' className=''>
            {displayObj.message}
          </Typography>
      </Box>
    </Grid>
  </Grid>
</Box>
    </>
    
  )
} 
  export default Feedback;