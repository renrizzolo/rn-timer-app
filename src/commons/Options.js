import { Navigation } from 'react-native-navigation';
import theme from './theme';
import { Dimensions, PixelRatio } from 'react-native';
const height = PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').height) * 0.7;
const width =
  PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').width);

const { colors } = theme;
const useSlowOpenScreenAnimations = true;
const SHOW_DURATION = 230;

export const setDefaultOptions = () =>
         Navigation.setDefaultOptions({
           layout: {
             componentBackgroundColor: colors.background,
             orientation: ['portrait'],
             direction: 'locale',
           },
           topBar: {
             hideOnScroll: true,
             background: {
               color:  colors.backgroundDark,
             },
             title: {
               color: colors.text,
             }
           },
           bottomTabs: {
             backgroundColor: colors.backgroundDark,
             titleDisplayMode: 'alwaysShow',
           },
           bottomTab: {
             iconColor: colors.tertiary,
             textColor: colors.tertiary,

             selectedIconColor: colors.primaryLight,
             selectedTextColor: colors.primaryLight,
           },
           animations: {
             showModal: {
               waitForRender: true,
               y: {
                 from: height,
                 to: 0,
                 duration: SHOW_DURATION,
                 interpolation: 'accelerateDecelerate',
               },
               alpha: {
                 from: 0,
                 to: 1,
                 duration: SHOW_DURATION,

                 interpolation: 'accelerate',
               },
             },
             push: {
               waitForRender: true,
               content: {
                 alpha: {
                   from: 0,
                   to: 1,
                   duration: SHOW_DURATION,
                 },
                 x: {
                   from: width,
                   to: 0,
                   duration: SHOW_DURATION,
                 },
               },
             },
           },
         });
