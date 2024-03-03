import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import Button from '@components/Button';

const ConfirmationModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
        <FormattedMessage id="app_profile_confirm_delete" />
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
        <FormattedMessage id="app_profile_notif_confirm_delete" />
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
          <Button text={<FormattedMessage id="app_profile_confirm" />} onClick={onConfirm} />
          <Button text={<FormattedMessage id="app_profile_cancel" />} onClick={onClose}/>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;