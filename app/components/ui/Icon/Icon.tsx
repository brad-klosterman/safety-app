import { withIconWrapper } from './wrapper';
import * as svgs from './svgs';

const Icon = Object.entries(svgs).reduce(
    (accumulator, [name, svg]) => ({
        ...accumulator,
        [name]: withIconWrapper({ name, ...svg }),
    }),
    {} as {
        [key in keyof typeof svgs]: ReturnType<typeof withIconWrapper>;
    }
);

export { Icon };
