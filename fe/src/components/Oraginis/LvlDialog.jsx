import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import LvlButton from './LvlButton';

export default function LvlDialog(props) {
  const {disabledButtonAction=true,visible=true,header="",desciption,labelBtnCancel = "Cancel",labelBtnSubmit="Submit",handleSubmit,handleCancel} = props;

  return (
    <React.Fragment>
      <Dialog
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
            <DialogActions>
                <LvlButton onClick={handleCancel} label={labelBtnCancel}/>
                <LvlButton onClick={handleSubmit} label={labelBtnSubmit} primary={true}/>
            </DialogActions>
            : <></>      
          }
      </Dialog>
    </React.Fragment>
  );
}   