import React, { useState } from 'react';
import { View, StyleSheet, Text , Vibration} from 'react-native';
import { Countdown } from '../components/countdown';
import { RoundedButton } from '../components/Roundedbutton';
import { colors } from '../utils/colors';  
import { Sizes } from '../utils/Sizes';    
import { ProgressBar } from 'react-native-paper';
import{Timing} from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject,onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.4);
  
  const onEnd = () => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
          }; 


  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
        minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}  
          onEnd={onEnd}
        />
        <View style={{ paddingTop: 30 }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: 100 }}>
        <ProgressBar 
          progress={progress}
          color={colors.progressBar}  
          style={{ height: 15 }}
          
        />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={50} title="-" onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,  
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdown: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,  
  },
  task: {
    color: colors.white,
    fontSize: 20, 
  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: 50,
  },
  clearSubjectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
   
});
