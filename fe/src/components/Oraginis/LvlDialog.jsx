import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import LvlButton from './LvlButton';

export default function LvlDialog(props) {
  const {
    disabledButtonAction=true,
    visible=true,
    header="",
    desciption,
    labelBtnCancel = "Cancel",
    labelBtnSubmit="Submit",
    size,
    fullWidth=true,
    handleSubmit,
    handleCancel,
    style
  } = props;
  const dialogSize = ['xs','sm','md','lg','xl'];
  
  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={dialogSize.includes(size) ? size : "sm"}
        sx={style}
        open={visible}
        onClose={handleCancel}
      >
        <DialogTitle>{header}</DialogTitle> 
        <DialogContent>
          {
            desciption ?
            <DialogContentText>{desciption}</DialogContentText> : <></>
          }
          {props?.children}
        </DialogContent>
          {
            disabledButtonAction ? 
            <DialogActions className='mb-3 mr-3'>
                <LvlButton onClick={handleCancel} label={labelBtnCancel}/>
                <LvlButton onClick={handleSubmit} label={labelBtnSubmit} primary={true}/>
            </DialogActions>
            : <></>      
          }
      </Dialog>
    </React.Fragment>
  );
}   