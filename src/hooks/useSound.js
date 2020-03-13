// Import the react-native-sound module
import Sound from 'react-native-sound';

// Enable playback in silence mode
const useSound = file => {
  Sound.setCategory('Playback');
  // Load the sound file 'sound.mp3' from the app bundle
  // See notes below about preloading sounds within initialization code below.
  const sound = new Sound(file, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log(
      'duration in seconds: ' +
        sound.getDuration() +
        'number of channels: ' +
        sound.getNumberOfChannels(),
    );

    // // Play the sound with an onEnd callback
    // sound.play(success => {
    //   if (success) {
    //     console.log('successfully finished playing');
    //   } else {
    //     console.log('playback failed due to audio decoding errors');
    //   }
    // });
  });
  return sound;
  // // Reduce the volume by half
  // sound.setVolume(0.5);

  // // Position the sound to the full right in a stereo field
  // sound.setPan(1);

  // // Loop indefinitely until stop() is called
  // sound.setNumberOfLoops(-1);

  // // Get properties of the player instance
  // console.log('volume: ' + sound.getVolume());
  // console.log('pan: ' + sound.getPan());
  // console.log('loops: ' + sound.getNumberOfLoops());

  // // Seek to a specific point in seconds
  // sound.setCurrentTime(2.5);

  // // Get the current playback point in seconds
  // sound.getCurrentTime(seconds => console.log('at ' + seconds));

  // // Pause the sound
  // sound.pause();

  // // Stop the sound and rewind to the beginning
  // sound.stop(() => {
  //   // Note: If you want to play a sound after stopping and rewinding it,
  //   // it is important to call play() in a callback.
  //   sound.play();
  // });

  // // Release the audio player resource
  // sound.release();
};

export default useSound;