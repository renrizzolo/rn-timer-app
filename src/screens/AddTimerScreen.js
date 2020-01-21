import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';

import {Text, TextInput, Button, H1, H2, H3, View} from '../UI';
import Root from '../components/Root';
import NumberPad from '../components/NumberPad';
import {Navigation} from 'react-native-navigation';

const AddTimerScreen = ({componentId}) => {
  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  const [form, setForm] = useState({});
  console.log('addtimers form', form);

  const submit = () => {
    // if(error) return;
    if (form.text && form.timeArray) {
      const payload = {
        ...form,
      };
      dispatch({type: 'timers/add', payload});
      setForm({});
      setError(false);
      console.log('added', form);
      close();
    } else {
      console.log('err');
      setError(true);
    }

  };

  const close = () => {
    Navigation.dismissModal(componentId);
  };
  return (
    <Root m={0} bg={'rgba(0,0,0,0.5)'}>
      <View
        m={5}
        borderRadius={2}
        p={3}
        flex={1}
        width={1}
        alignSelf="center"
        boxShadow={'large'}
        bg={'tertiary'}>
        <View
          m={-3}
          mb={2}
          p={3}
          bg={'primary'}
          borderTopRightRadius={2}
          borderTopLeftRadius={2}>
          <Button
            style={{zIndex: 2}}
            position="absolute"
            right={2}
            top={2}
            p={2}
            fontSize={0}
            bg={'secondary'}
            onPress={close}>
            Close
          </Button>
          <H2 mb={0}>Add Timer</H2>
        </View>

        <NumberPad
          error={error && !form.timeArray}
          setForm={setForm}
          form={form}
          settings={{timerLength: 6}}
        />
        <Text accessibilityLabel="Timer title">Title</Text>
        <TextInput
          borderBottomColor={error && !form.text ? 'crimson' : undefined}
          value={form.text}
          onChangeText={text => setForm({...form, text})}
        />
        {/*   <TextInput
          multiline
          value={form.description}
          onChangeText={description => setForm({...form, description})}
        /> */}
        <Button mb={1} textAlign="center" onPress={submit}>
          Start
        </Button>
      </View>
    </Root>
  );
};

export default AddTimerScreen;
