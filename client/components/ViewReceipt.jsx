import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Button,
  Modal,
  styled,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import { Close, ReceiptLong } from '@mui/icons-material'

import ViewImage from './ViewImage'
import EditReceipt from './EditReceipt'
import { removeReceipt } from '../actions'

export default function ViewReceipt({
  currentReceipt: receipt,
  modalState,
  close,
}) {
  const token = useSelector((state) => state.loggedInUser.token)
  const dispatch = useDispatch()
  const [viewImage, setViewImage] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)

  function setViewMode(e) {
    e.preventDefault()
    setViewImage(!viewImage)
  }

  const [editMode, setEditMode] = useState(false)
  function handleClickOpen(e) {
    e.preventDefault()
    setEditMode(true)
  }

  function handleClose(e) {
    e.preventDefault()
    setEditMode(false)
  }

  function handleDelete(e) {
    dispatch(removeReceipt(receipt, token))
    setOpenConfirm(false)
    close(e)
  }
  return (
    <>
      <StyledModal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={modalState}
        onClose={(e) => close(e)}
      >
        <Box
          sx={{
            '& .MuiTextField-root': { my: 0.5, width: '100%' },
            '& > :not(style)': { my: 0.5, width: '100%' },
            width: { xs: '250px', sm: '400px', md: '400px' },
            height: { xs: '500px', sm: '600px', md: '600px' },
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          bgcolor="white"
          p={3}
          borderRadius={5}
        >
          <Box
            color="primary"
            sx={{
              position: 'fixed',
              width: '30px',
              height: '30px',
              display: 'inline',
              '&:hover': 'none',
            }}
          >
            <Close
              color="primary"
              sx={{
                position: 'fixed',
                width: '30px',
                height: '30px',
                display: 'inline',
              }}
              onClick={(e) => close(e)}
            />
          </Box>
          <Box textAlign="center">
            <Typography
              variant="h6"
              color="primary"
              component="div"
              sx={{
                textAlign: 'center',
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '300px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {receipt.name}
            </Typography>
          </Box>

          <Box
            color="primary"
            sx={{
              width: '30px',
              height: '50px',
              textAlign: 'center',
            }}
            onClick={setViewMode}
          >
            <ReceiptLong
              color="primary"
              sx={{ width: '30px', height: '30px', paddingTop: '10px' }}
            />
            <ViewImage
              viewImageMode={viewImage}
              setViewMode={setViewMode}
              image={receipt.image.url}
            />
          </Box>

          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Price"
                secondary={
                  <Typography
                    sx={{ paddingLeft: '20px', paddingTop: '10px' }}
                    variant="body1"
                    color="text.secondary"
                    component="div"
                  >
                    $ {receipt.price}
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Purchase Date"
                secondary={
                  <Typography
                    sx={{ paddingLeft: '20px', paddingTop: '10px' }}
                    variant="body1"
                    color="text.secondary"
                    component="div"
                  >
                    {new Date(receipt.purchaseDate).toLocaleDateString(
                      'en-NZ',
                      {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      }
                    )}
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Warranty"
                secondary={
                  <Typography
                    sx={{ paddingLeft: '20px', paddingTop: '10px' }}
                    variant="body1"
                    color="text.secondary"
                    component="div"
                  >
                    {receipt.expiryDate
                      ? `Expired on ${new Date(
                          receipt.expiryDate
                        ).toLocaleDateString('en-NZ', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}`
                      : 'No warranty'}
                  </Typography>
                }
              />
            </ListItem>
            <Divider />

            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Category"
                secondary={
                  <Typography
                    sx={{ paddingLeft: '20px', paddingTop: '10px' }}
                    variant="body1"
                    color="text.secondary"
                    component="div"
                  >
                    {receipt.categoryType}
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Store"
                secondary={
                  <Typography
                    sx={{ paddingLeft: '20px', paddingTop: '10px' }}
                    variant="body1"
                    color="text.secondary"
                    component="div"
                  >
                    {receipt.store}
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
            <ListItem alignItems="flex-start" sx={{ maxHeight: '120px' }}>
              <ListItemText
                primary="Note"
                secondary={
                  <Typography
                    sx={{
                      paddingLeft: '20px',
                      paddingTop: '10px',
                      height: '65px',
                      overflow: 'auto',
                      textOverflow: 'ellipsis',
                    }}
                    variant="body1"
                    color="text.secondary"
                  >
                    {receipt.note ? receipt.note : ''}
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
          </List>
          <Stack direction="row" justifyContent="space-around">
            <Button variant="contained" onClick={handleClickOpen}>
              Edit
            </Button>
            <Button variant="contained" onClick={() => setOpenConfirm(true)}>
              Delete
            </Button>
          </Stack>
        </Box>
      </StyledModal>
      <EditReceipt
        currentReceipt={receipt}
        modalState={editMode}
        close={handleClose}
        closeView={close}
      />
      <Dialog
        open={openConfirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete Receipt'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this receipt?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
