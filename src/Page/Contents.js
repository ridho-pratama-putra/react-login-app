import React from 'react';
import VideoJS from '../UniversalComponents/VideoJS'

function Contents() {

    const playerRef = React.useRef(null);

    const videoJsOptions = { // lookup the options in the docs for more options
        autoplay: true,
        controls: true,
        responsive: "vjs-layout-medium",
        fluid: true,
        sources: [{
            src: './Ello.mp4',
            type: 'video/mp4'
        }]
    }

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // you can handle player events here
        player.on('waiting', () => {
            console.log('player is waiting');
        });

        player.on('dispose', () => {
            console.log('player will dispose');
        });
    };
    return (
        <div>THIS IS CONTENTS
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </div>
    );
}

export default Contents;
