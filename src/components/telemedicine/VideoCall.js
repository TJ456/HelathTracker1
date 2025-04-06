import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'twilio-video';
import './VideoCall.css';

const VideoCall = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [room, setRoom] = useState(null);
  const [callStarted, setCallStarted] = useState(false);

  const startCall = async () => {
    try {
      // Fetch the access token from your backend
      const response = await fetch('http://localhost:5000/token?identity=user&roomName=health-tracker-room');
      const data = await response.json();
      const accessToken = data.token;

      // Connect to the Twilio room
      const room = await connect(accessToken, {
        name: 'health-tracker-room',
        audio: true,
        video: { width: 640 },
      });

      setRoom(room);
      setCallStarted(true);

      // Attach local video
      const localTrack = Array.from(room.localParticipant.videoTracks.values())[0].track;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = new MediaStream([localTrack]);
      }

      // Attach remote video
      room.on('participantConnected', (participant) => {
        participant.tracks.forEach((track) => {
          if (track.kind === 'video') {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = new MediaStream([track.track]);
            }
          }
        });
      });
    } catch (error) {
      console.error('Error connecting to the room:', error);
    }
  };

  const endCall = () => {
    if (room) {
      room.disconnect();
      setRoom(null);
      setCallStarted(false);
    }
  };

  useEffect(() => {
    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, [room]);

  return (
    <div className="video-call">
      <h2>Video Consultation</h2>
      <div className="video-container">
        {/* Local Video */}
        <div className="video-wrapper">
          <h3>You</h3>
          <video ref={localVideoRef} autoPlay muted className="video"></video>
        </div>

        {/* Remote Video */}
        <div className="video-wrapper">
          <h3>Doctor</h3>
          <video ref={remoteVideoRef} autoPlay className="video"></video>
        </div>
      </div>

      {/* Call Controls */}
      <div className="call-controls">
        {!callStarted ? (
          <button className="start-call-button" onClick={startCall}>
            Start Call
          </button>
        ) : (
          <button className="end-call-button" onClick={endCall}>
            End Call
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCall;