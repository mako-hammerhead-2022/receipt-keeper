import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  styled,
  TextField,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import { Close, ReceiptLong } from '@mui/icons-material'

import ViewImage from './ViewImage'
import EditReceipt from './EditReceipt'

export default function ViewReceipt({
  currentReceipt: receipt,
  modalState,
  close,
}) {
  const [viewImage, setViewImage] = useState(false)
  function setViewMode(e) {
    e.preventDefault()
    setViewImage(!viewImage)
  }

  const [editMode, setEditMode] = useState(false)
  function handleClickOpen(e) {
    e.preventDefault()
    setEditMode(true)
  }

  function handleClose(e, bool) {
    e.preventDefault()
    setEditMode(bool)
  }
  return (
    <>
      <StyledModal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={modalState}
        onClose={(e) => {
          close(e, false)
        }}
      >
        <Box
          sx={{
            '& .MuiTextField-root': { my: 0.5, width: '100%' },
            '& > :not(style)': { my: 0.5, width: '100%' },
            width: { xs: '250px', sm: '400px', md: '400px' },
            height: { xs: '500px', sm: '600px', md: '600px' },
            position: 'relative',
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
            component="div"
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
              onClick={(e) => close(e, false)}
            />
          </Box>
          {/* Receipt Name */}

          <Typography variant="h6" color="primary" sx={{ textAlign: 'center' }}>
            {receipt.name}
          </Typography>

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
              image={
                typeof receipt.image === 'object'
                  ? receipt.image.url
                  : receipt.image
              }
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
                    component="div"
                    color="text.secondary"
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
                    component="div"
                    color="text.secondary"
                  >
                    {new Date(receipt.purchaseDate).toLocaleDateString('en-NZ')}
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
                    component="div"
                    color="text.secondary"
                  >
                    {receipt.expiryDate
                      ? `Expired on ${new Date(
                          receipt.expiryDate
                        ).toLocaleDateString('en-NZ')}`
                      : 'No warranty'}
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
                    component="div"
                    color="text.secondary"
                  >
                    {receipt.store}
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
            <ListItem
              alignItems="flex-start"
              sx={{ display: 'block', height: '100px' }}
            >
              <ListItemText
                primary="Note"
                secondary={
                  <Typography
                    sx={{
                      paddingLeft: '20px',
                      paddingTop: '10px',
                      overflow: 'auto',
                    }}
                    variant="body1"
                    component="div"
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
            {/* Edit Button */}
            <Button variant="contained" onClick={handleClickOpen}>
              Edit
            </Button>

            {/* Del Button */}
            <Button variant="contained">Del</Button>
          </Stack>
        </Box>
      </StyledModal>
      <EditReceipt
        currentReceipt={receipt}
        modalState={editMode}
        close={handleClose}
      />
    </>
  )
}
const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
