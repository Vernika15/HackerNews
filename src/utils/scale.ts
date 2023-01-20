import {Dimensions, Platform} from 'react-native';
const {height, width} = Dimensions.get('window');

//Screen Constatnts
const guidelineBaseWidth = 360;
const guidelineBaseHeight =
  Platform.OS === 'ios' ? 800 : height <= 550 ? 667 : 800;
/**
 * Function to scale a value based on the size of the screen size and the original
 * size used on the design.
 */

const scale = (size: number) => Math.ceil((width / guidelineBaseWidth) * size);
const verticalScale = (size: number) =>
  Math.ceil((height / guidelineBaseHeight) * size);

export {scale, verticalScale};
