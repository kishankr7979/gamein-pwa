import React, { useEffect } from 'react'
import LinearProgress from '@mui/material/LinearProgress';
const GameInLoader = () => {
    var i = 0;
    var txt = 'GameIN';
    var speed = 100;

    function typeWriter() {
        if (i < txt.length) {
            document.getElementById("demo").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    useEffect(() => {
        setTimeout(() => {
            typeWriter();
        }, 1000)
    }, [])
    const style = {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '10px',
    }
    return (
        <div style={style}>
            <LinearProgress width='100%' />
            {/* <div className="typewriter"> */}
            <p id="demo"></p>
            {/* </div> */}
        </div>
    )
}

export default GameInLoader
