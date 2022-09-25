import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import "./styles.css";

type LoadingProps = {
    centered?: boolean
}

const Loading: React.FC<LoadingProps> = ({centered = true}) => {

    if (centered) {
        return <div className={"loading-centered"}>
            <CircularProgress style={{}}/>
        </div>
    }

    return (
        <CircularProgress style={{}}/>
    );
}
export default Loading