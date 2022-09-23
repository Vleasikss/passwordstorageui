import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import "./styles.css";

const Loading:React.FC = () => {
    return (
        <div className={"loading-centered"}>
            <CircularProgress style={{}}/>
        </div>
    );
}
export default Loading