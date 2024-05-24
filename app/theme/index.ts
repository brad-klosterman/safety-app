import { useThemeContext } from './ThemeProvider';
import { createTheme } from './createTheme';

export { styled } from './styled';
export { MAP_THEME } from './map';
export default {
    create: createTheme,
    useContext: useThemeContext,
};
export type * from './type.Theme';
