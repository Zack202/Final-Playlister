import { useContext } from 'react'
import AuthContext from '../auth';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p:1
};

export default function MUIErrorModal() {
    const { auth } = useContext(AuthContext);
    let errorDescription = "";
    if (auth.errorFound !=="") {
        errorDescription = auth.errorFound;
    }
    function handleCloseModal(event) {
        auth.unErrorFound();
    }

    return (
        <Modal
            open={auth.errorFound !== ""}
        >
            <Box sx={style}>
                <div className="modal-dialog">
                <header className="dialog-header">
                    Error: {errorDescription}
                </header>
                <div id="confirm-cancel-container">
                    <button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCloseModal}
                    >Close</button>
                </div>
            </div>
            </Box>
        </Modal>
    );
}