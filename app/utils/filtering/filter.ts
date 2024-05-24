export function filter<Type, Func extends (arg: Type) => boolean>(arr: Type[], func: Func): Type[] {
    return arr.filter(func);
}
