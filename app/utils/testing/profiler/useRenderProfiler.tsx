import React from 'react';
import { Button } from 'react-native';

const show_console_log = false;

function useRenderProfiler() {
    // const [render_count, setRenderCount] = React.useState(1);
    const [trigger_count, setTriggerCount] = React.useState(1);

    // show_console_log &&
    //     console.log('RenderProfiler', { ...log, location: 'state', render_count, trigger_count });

    React.useEffect(() => {
        show_console_log && console.log('RenderProfiler', { ...log, location: 'useEffect mount' });
        return () => {
            show_console_log &&
                console.log('RenderProfiler', { ...log, location: 'useEffect un-mount' });
        };
    }, []);

    const triggerCount = React.useCallback(() => {
        console.log('------------------------------------- triggered');
        setTriggerCount((prevState) => prevState + 1);
    }, []);

    return React.useMemo(() => ({ triggerCount }), [triggerCount]);

    // return {
    //     //render_count,
    //     //trigger_count,
    //     triggerCount,
    // };
}

const log = {
    hook: 'useRenderProfiler',
};

/**
 * TESTING PROFILER
 * @param App
 */
function withProfiler(App: React.ComponentType<any>) {
    return () => {
        const [render_count, setRenderCount] = React.useState(1);

        function triggerRender() {
            console.log('-------------------------------------------------- triggered');
            setRenderCount((prevState) => prevState + 1);
        }

        return (
            <>
                <App />
                <Button
                    title={`TEST RENDER ${render_count}`}
                    onPress={triggerRender}
                />
            </>
        );
    };
}

export { useRenderProfiler, withProfiler };

/*

====================================================================================================
 useRenderProfiler
====================================================================================================




If you’re writing a custom Hook, it’s recommended to wrap any functions that it returns into useCallback:
This ensures that the consumers of your Hook can optimize their own code when needed.

function useRouter() {
  const { dispatch } = useContext(RouterStateContext);

  const navigate = useCallback((url) => {
    dispatch({ type: 'navigate', url });
  }, [dispatch]);

  const goBack = useCallback(() => {
    dispatch({ type: 'back' });
  }, [dispatch]);

  return {
    navigate,
    goBack,
  };
}


function TodoList({ todos, tab, theme }) {
    const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
    const children = useMemo(() => <List items={visibleTodos} />, [visibleTodos]);
    return (
        <div className={theme}>
            {children}
        </div>
    );
}


function TodoList({ todos, tab, theme }) {
    const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
    const children = useMemo(() => <List items={visibleTodos} />, [visibleTodos]);
    return (
        <div className={theme}>
            {children}
        </div>
    );
}

let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Do nothing for 500 ms to emulate extremely slow code
  }



 */
