import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'twilio-video';
import './VideoCall.css';

const VideoCall = () => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [identity, setIdentity] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState(null);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    // Cleanup function to disconnect from room when component unmounts
    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, [room]);

  const handleIdentityChange = (event) => {
    setIdentity(event.target.value);
  };

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const getToken = async () => {
    try {
      const response = await fetch(`http://localhost:5000/token?identity=${identity}&roomName=${roomName}`);
      const data = await response.json();
      return data.token;
    } catch (err) {
      console.error('Error getting token:', err);
      throw new Error('Could not get access token');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsJoining(true);
    setError(null);

    try {
      const token = await getToken();
      const room = await joinVideoRoom(token);
      setRoom(room);
      setParticipants(Array.from(room.participants.values()));
      
      // Handle participants joining
      room.on('participantConnected', participant => {
        console.log(`Participant ${participant.identity} connected`);
        setParticipants(prevParticipants => [...prevParticipants, participant]);
        handleParticipantConnected(participant);
      });

      // Handle participants leaving
      room.on('participantDisconnected', participant => {
        console.log(`Participant ${participant.identity} disconnected`);
        setParticipants(prevParticipants =>
          prevParticipants.filter(p => p !== participant)
        );
      });
    } catch (err) {
      console.error('Error joining room:', err);
      setError('Failed to join video room. Please try again.');
    } finally {
      setIsJoining(false);
    }
  };

  const joinVideoRoom = async (token) => {
    try {
      const room = await connect(token, {
        name: roomName,
        audio: true,
        video: { width: 640, height: 480 }
      });

      // Handle local participant
      handleLocalParticipant(room.localParticipant);
      
      return room;
    } catch (err) {
      throw new Error('Could not connect to video room');
    }
  };

  const handleLocalParticipant = (participant) => {
    participant.tracks.forEach(publication => {
      if (publication.track) {
        publication.track.attach(localVideoRef.current);
      }
    });

    participant.on('trackPublished', publication => {
      if (publication.track) {
        publication.track.attach(localVideoRef.current);
      }
    });
  };

  const handleParticipantConnected = (participant) => {
    participant.tracks.forEach(publication => {
      if (publication.track) {
        publication.track.attach(remoteVideoRef.current);
      }
    });

    participant.on('trackPublished', publication => {
      if (publication.track) {
        publication.track.attach(remoteVideoRef.current);
      }
    });
  };

  const handleDisconnect = () => {
    if (room) {
      room.disconnect();
      setRoom(null);
      setParticipants([]);
    }
  };

  return (
    <div className="video-call-container">
      {!room ? (
        <div className="join-form">
          <h3>Join Video Call</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name:</label>
              <input
                type="text"
                value={identity}
                onChange={handleIdentityChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label>Room Name:</label>
              <input
                type="text"
                value={roomName}
                onChange={handleRoomNameChange}
                placeholder="Enter room name"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isJoining || !identity || !roomName}
              className="join-button"
            >
              {isJoining ? 'Joining...' : 'Join Call'}
            </button>
          </form>
          {error && <div className="error-message">{error}</div>}
        </div>
      ) : (
        <div className="video-room">
          <div className="video-grid">
            <div className="local-participant">
              <video ref={localVideoRef} autoPlay playsInline />
              <div className="participant-name">You ({identity})</div>
            </div>
            {participants.map(participant => (
              <div key={participant.identity} className="remote-participant">
                <video ref={remoteVideoRef} autoPlay playsInline />
                <div className="participant-name">{participant.identity}</div>
              </div>
            ))}
          </div>
          <div className="controls">
            <button onClick={handleDisconnect} className="disconnect-button">
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall; 