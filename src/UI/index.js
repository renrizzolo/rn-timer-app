import React from 'react';
import * as N from 'react-native';
import styled from 'styled-components/native';
import {
  compose,
  space,
  color,
  layout,
  typography,
  flexbox,
  border,
  background,
  position,
  grid,
  shadow,
  buttonStyle,
  colorStyle,
  textStyle,
} from 'styled-system';


const View = styled(N.View)(
  compose(
    space,
    color,
    layout,
    typography,
    flexbox,
    border,
    background,
    position,
    grid,
    shadow,
    buttonStyle,
    colorStyle,
    textStyle,
  ),
);

const Text = props => <View as={N.Text} {...props} />;
const Image = props => <View as={N.Image} {...props} />;
const TextInput = props => <View as={N.TextInput} {...props} />;
const ScrollView = props => <View as={N.ScrollView} {...props} />;
const Picker = props => <View as={N.Picker} {...props} />;
const Slider = props => <View as={N.Slider} {...props} />;
const Switch = props => <View as={N.Switch} {...props} />;
const FlatList = props => <View as={N.FlatList} {...props} />;
const SectionList = props => <View as={N.SectionList} {...props} />;
const ActivityIndicator = props => <View as={N.ActivityIndicator} {...props} />;
const Alert = props => <View as={N.Alert} {...props} />;
const Modal = props => <View as={N.Modal} {...props} />;
const StatusBar = props => <View as={N.StatusBar} {...props} />;

const H1 = styled(Text)``;
const H2 = styled(Text)``;
const H3 = styled(Text)``;

const Button = ({
  children,
  color,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textAlign,
  fontStyle,
  native,
  onPress,
  ...props
}) =>
  native ? (
    <View
      onPress={onPress}
      as={
        N.Platform.OS === 'android'
          ? N.TouchableNativeFeedback
          : N.TouchableOpacity
      }>
      <View {...props}>
        <View
          as={N.Text}
          color={color}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          lineHeight={lineHeight}
          letterSpacing={letterSpacing}
          textAlign={textAlign}
          fontStyle={fontStyle}>
          {children}
        </View>
      </View>
    </View>
  ) : (
    <View onPress={onPress} as={N.TouchableOpacity} {...props}>
      <View
        as={N.Text}
        color={color}
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontWeight={fontWeight}
        lineHeight={lineHeight}
        letterSpacing={letterSpacing}
        textAlign={textAlign}
        fontStyle={fontStyle}>
        {children}
      </View>
    </View>
  );
Button.defaultProps = {
  bg: 'secondary',
  color: 'text',
  borderRadius: 5,
  fontWeight: 'bold',
  px: 3,
  py: 2,
}

Text.defaultProps = {
  color: 'text',
  fontSize: 2,
  lineHeight: 2,
  mb: 2,
}

H1.defaultProps = {
  fontSize: 5,
  fontWeight: 'bold',
  lineHeight: 5,
  mb: 4,
};

H2.defaultProps = {
  fontSize: 4,
  lineHeight: 4,

  fontWeight: 'bold',
  mb: 3,
};
H3.defaultProps = {
  fontSize: 3,
  lineHeight: 3,

  fontWeight: 'bold',
  mb: 2,
};

TextInput.defaultProps = {
  color: 'text',
  fontSize: 2,
  selectionColor: 'rgba(255,255,255,0.3)',
  borderBottomColor: 'text',
  borderBottomWidth: 1,
  width: 1,
  mb: 3,
}
export {
  View,
  Text,
  H1,
  H2,
  H3,
  Image,
  TextInput,
  ScrollView,
  Picker,
  Slider,
  Switch,
  FlatList,
  SectionList,
  ActivityIndicator,
  Alert,
  Modal,
  StatusBar,
  Button,
};
