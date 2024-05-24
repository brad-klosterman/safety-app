Most Commonly Used Interfaces and Types

ReactNode - anything that is renderable inside of JSX, this is NOT the same as what can be rendered by a component!
Component - base class of all class-based components
PureComponent - base class for all class-based optimized components
FC, FunctionComponent - a complete interface for function components, often used to type external components instead of typing your own
CSSProperties - used to type style objects
all events: used to type event handlers
all event handlers: used to type event handlers
all consts: Children, Fragment, ... are all public and reflect the React runtime namespace
Not Commonly Used but Good to know

Ref - used to type innerRef
ElementType - used for higher order components or operations on components, e.g. Polymorphic Components
ReactElement - can be used if you want to pass it to cloneElement aka it's pretty rarely used
ComponentType - used for higher order components where you don't specifically deal with the intrinsic components
ReactPortal - used if you specifically need to type a prop as a portal, otherwise it is part of ReactNode
ComponentClass - a complete interface for the produced constructor function of a class declaration that extends Component, often used to type external components instead of typing your own
JSXElementConstructor - anything that TypeScript considers to be a valid thing that can go into the opening tag of a JSX expression
ComponentProps - props of a component - most useful for Wrapping/Mirroring a HTML Element
ComponentPropsWithRef - props of a component where if it is a class-based component it will replace the ref prop with its own instance type
ComponentPropsWithoutRef - props of a component without its ref prop
HTMLProps and HTMLAttributes - these are the most generic versions, for global attributes (see a list of attributes marked as "global attribute" on MDN). In general, prefer React.ComponentProps, React.JSX.IntrinsicElements, or specialized HTMLAttributes interfaces:


https://2ality.com/2020/06/computing-with-types.html


https://github.com/alibaba/hooks/blob/master/packages
