import React,{ useState  }from 'react';
import { Text, StyleSheet, Platform, StatusBar, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/utils/colors';
import Focus from './src/Features/focus';
import { Countdown } from './src/components/countdown';
import { Timer } from './src/Features/timer';
import { FocusHistory } from './src/Features/focushistory';

export default function App() {
  const [currentSubject,setCurrentSubject] = useState ();
  const [history, setHistory] = useState([]);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>Hello!!</Text>
          {!currentSubject ? (
            <>
          <Focus addSubject={setCurrentSubject} />
          <FocusHistory history={history} />
        </>
          ) : (
        <Timer 
          focusSubject={currentSubject}
          onTimerEnd={(subject) => {
            setHistory([...history, subject])
          }}
         clearSubject={() => setCurrentSubject(null)}
        />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkblue,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,  
  },
  text: {
    color: colors.white,
    fontSize: 24,
  },
});
