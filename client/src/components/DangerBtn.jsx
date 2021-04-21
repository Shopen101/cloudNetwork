import React from 'react';
import Button from '@material-ui/core/Button';

function DangerBtn({ onClick }) {
    return (
        <Button variant="contained" color="secondary" onClick={onClick}>Раскрыть схему с базы</Button>
    );
}

export default DangerBtn