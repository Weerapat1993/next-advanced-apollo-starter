import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";

const CardCollaspe = ({ defaultVisible, title, children, sx, action }) => {
    const [open, setOpen] = useState(defaultVisible)
    return (
        <Card sx={{ background: '#ccc', borderRadius: 0 }}> 
            <Collapse sx={{ background: '#ccc' }} in={open} timeout="auto" unmountOnExit> 
                <CardContent style={{ padding: '10px 5px' }}> 
                    <Container> 
                        {children}
                    </Container> 
                </CardContent> 
            </Collapse>
            <CardHeader 
                title={title}
                sx={sx || { height: 0 }}
                titleTypographyProps={{ variant:'inherit' }}
                action={action ? (
                    <IconButton 
                    onClick={() => setOpen(!open)} 
                        aria-label="expand"
                        size="small"
                    > 
                        {action} 
                    </IconButton>
                ) : null} 
            />
        </Card> 
    )
}


CardCollaspe.defaultProps = {
    defaultVisible: false
}

export default CardCollaspe