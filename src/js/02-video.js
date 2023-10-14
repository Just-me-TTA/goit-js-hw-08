import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const LOCALESTORAGE_KEY = 'videoplayer-current-time';
const time = localStorage.getItem(LOCALESTORAGE_KEY);

player.on(
  'timeupdate',
  throttle(() => {
    player.getCurrentTime().then(function (seconds) {
      localStorage.setItem(LOCALESTORAGE_KEY, seconds);
    });
  }, 1000)
);

if (time !== null) {
  player.setCurrentTime(time);
}
