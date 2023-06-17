import { Button, Grid, TextField } from '@mui/material';
import ConfirmationDialog from 'ConfirmationDialog';
import { useAuthenticationContext } from 'Contexts/AuthenticationContext';
import { useDatabaseContext } from 'Contexts/DatabaseContext';
import React, { useState } from 'react';

export const WordRootForm = ({ cancelEditing, saveWordRoot, deleteWordRoot }) => {
  const { userIsAdmin } = useAuthenticationContext();
  const { wordRoot } = useDatabaseContext();

  const [newWordRoot, setNewWordRoot] = useState(wordRoot);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = React.useState(false);

  const openDeleteConfirmationDialog = () => {
    setShowDeleteConfirmationDialog(true);
  }

  const closeDeleteConfirmationDialog = () => {
    setShowDeleteConfirmationDialog(false);
  }

  return (
    <>
      {userIsAdmin && (
        <>
          <Grid item xs={4} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label={'Nova kapvorto'}
              value={newWordRoot}
              onChange={(e) => setNewWordRoot(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={8} sx={{ marginTop: '2em', textAlign: 'right' }}>
            <Button variant='outlined' color={'success'} onClick={() => saveWordRoot(wordRoot, newWordRoot)}>
              Konservu kapvorton
            </Button>
            <Button variant={'outlined'} color={'warning'} onClick={cancelEditing} sx={{ ml: 2 }}>
              Nuligu
            </Button>
            <Button variant='outlined' color={'error'} style={{ marginLeft: '1em' }} onClick={openDeleteConfirmationDialog}>
              Forigu kapvorton
            </Button>
          </Grid>
        </>
      )}
      <ConfirmationDialog
        open={showDeleteConfirmationDialog}
        title={'Ĉu vi certas?'}
        contentText1={'Ĉi tio forigos ĉi tiun kapvorton, ĉiujn ĝiajn difinojn, kaj ĉiujn rilatajn bildojn.'}
        contentText2={`Ĉu vi vere volas forigi la kapvorton "${wordRoot}"?`}
        cancelButtonText={'Nuligu'}
        confirmButtonText={'Konfirmu'}
        onClose={closeDeleteConfirmationDialog}
        onConfirm={deleteWordRoot} />
    </>
  );
}