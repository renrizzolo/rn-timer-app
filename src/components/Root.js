import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {View, Text, ScrollView} from '../UI';
import theme from '../commons/theme';

const Root = ({children, style, afterScrollView, ...rest}) => (
  <ThemeProvider theme={theme}>
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={[styles.scrollView, style]} {...rest}>
        {children}
      </ScrollView>
      {afterScrollView && afterScrollView()}
    </SafeAreaView>
  </ThemeProvider>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'flex-start',
    padding: 24,
  },
});

export default Root;
