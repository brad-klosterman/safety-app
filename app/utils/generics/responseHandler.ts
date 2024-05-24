const responseHandler =
    <TFunc extends (...args: any[]) => any>(func: TFunc) =>
    (
        ...args: Parameters<TFunc>
    ):
        | {
              type: 'success';
              result: ReturnType<TFunc>;
          }
        | {
              type: 'failure';
              error: Error;
          } => {
        try {
            const result = func(...args);

            return {
                type: 'success',
                result,
            };
        } catch (e) {
            return {
                type: 'failure',
                error: e as Error,
            };
        }
    };

export { responseHandler };
