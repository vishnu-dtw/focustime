// src/components/countdown.js
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, View } from 'react-native';

export const Countdown = ({ minutes = 1, onEnd }) => {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (secondsLeft === 0) {
      if (onEnd) onEnd();
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [secondsLeft, onEnd]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formatTime(secondsLeft)}</Text>
    </View>
  );
};

Countdown.propTypes = {
  minutes: PropTypes.number,
  onEnd: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  text: {
    color: 'white',
    fontSize: 48,
  },
});
