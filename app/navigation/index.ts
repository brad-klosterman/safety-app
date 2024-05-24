import NavigationProvider from './NavigationProvider';
import { RootRouter } from './Router.Root';
import { NavbarRouter } from './Router.Navbar';

const Router = {
    Root: RootRouter.Navigator,
    Navbar: NavbarRouter.Navigator,
};

const RouteGroup = RootRouter.Group;
const Route = RootRouter.Screen;
const NavbarRoute = NavbarRouter.Screen;

export { Router, RouteGroup, Route, NavbarRoute };
export default NavigationProvider;
export type * from './type.Navigation';
