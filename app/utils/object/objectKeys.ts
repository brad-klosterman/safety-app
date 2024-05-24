export const objectKeys = <Obj>(obj: Obj): (keyof Obj)[] => {
    // @ts-ignore
    return Object.keys(obj) as (keyof Obj)[];
};
