// @ts-check
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import { Platform } from 'react-native';
import { setDefaultOptions } from './commons/Options';

// if (Platform.OS === 'android') {
//   alert = (title) => {
//     Navigation.showOverlay({
//       component: {
//         name: Screens.Alert,
//         passProps: {
//           title
//         },
//         options: {
//           layout: {
//             componentBackgroundColor: 'transparent'
//           },
//           overlay: {
//             interceptTouchOutside: true
//           }
//         }
//       }
//     });
//   };
// }

const start = () => {
  registerScreens();
  Navigation.events().registerAppLaunchedListener(async () => {
    setDefaultOptions();

    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'Timers',
                    },
                  },
                ],
                options: {
                  topBar: {
                    title: {
                      text: 'Timers',
                    },
                    visible: false,
                  },
                  bottomTab: {
                    text: 'Timers',
                    icon: require('../img/layouts.png'),
                  },
                },
              },
            },
          ],
        },
      },
    });
  });
}

export default start;