import React, { useCallback, useContext } from 'react';

import {
  IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonRange,
  IonButtons, IonButton, IonIcon 
} from '@ionic/react';

import {
  arrowDown, heart, heartOutline, playSkipBack,
  play, pause, playSkipForward, removeCircleOutline
} from 'ionicons/icons';

import {
  AppContext, isPlayerOpen, closePlayer, getPlaying, getCurrentTrack, isFavTrack, 
favTrack, pauseTrack, playTrack, seekTrack, nextTrack, prevTrack } from '../State';

import { img, msToTime } from '../util';

import './TrackPlayer.css';

const TrackProgress = ({ playing, track, onSeek }) => {
  const progress = playing.progress;
  const left = track.time - progress;
  const percent = (progress / track.time) * 100;

  const s = (p) => {
    const newTime = (p / 100) * track.time;
    onSeek(newTime);
  }
  return (
  <div className="track-progress">
    <IonRange
      value={percent}
      onIonChange={(e) => { s(e.target.value)}} />
    <div className="track-progress-time">
      <div className="track-progress-time-current">
        {msToTime(progress)}
      </div>
      <div className="track-progress-time-left">
        -{msToTime(left)}
      </div>
    </div>
  </div>
  )
};

const TrackControls = ({ playing, isFav, onPause, onPlay, onPrev, onNext, onFav }) => {
  return (
  <div className="track-controls">
    <IonIcon onClick={onFav} icon={isFav ? heart : heartOutline} />
    <IonIcon onClick={onPrev} icon={playSkipBack} />
    {playing.paused ? (
      <IonIcon onClick={onPlay} className="play-pause" icon={play} />
    ): (
      <IonIcon onClick={onPause} className="play-pause" icon={pause} />
    )}
    <IonIcon onClick={onNext} icon={playSkipForward} />
    <IonIcon icon={removeCircleOutline} />
  </div>
  );
}



const TrackPlayer = ({ track, closed }) => {
  const { state, dispatch } = useContext(AppContext);

  const playing = getPlaying(state);

  if (!playing) {
    return null;
  }

  const open = isPlayerOpen(state);
  const track = getCurrentTrack(state);
  const isFav = isFavTrack(state, track);

  return (
    <IonModal
      isOpen={open}
      onDidDismiss={closed}
      className="track-player">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton fill="clear" onClick={() => dispatch(closePlayer())}>
              <IonIcon icon={arrowDown} />
            </IonButton>
          </IonButtons>
          <IonTitle>
            {track.title}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="track-content">
        <img src={img(track.img)} />
        <h2>{track.title}</h2>
        <h4>{track.artist}</h4>
        <TrackProgress
          playing={playing}
          track={track}
          onSeek={(n) => dispatch(seekTrack(n))} />
        <TrackControls
          playing={playing}
          track={track}
          isFav={isFav}
          onPause={() => dispatch(pauseTrack())}
          onPlay={() => dispatch(playTrack())}
          onPrev={() => dispatch(prevTrack())}
          onNext={() => dispatch(nextTrack())}
          onFav={() => dispatch(favTrack(track))}
          />
      </IonContent>
    </IonModal>
  )
};

export default TrackPlayer;