1.  What is the difference between Component and PureComponent? Give an example where it might break my app.

    `PureComponent` implements `shouldComponentUpdate`
    with a shallow prop and state comparison. This means that the
    component will not re-render if the props and state have not changed.

    (b) Give an example where it might break my app.

    `Component` does not implement `shouldComponentUpdate` method, so it
    will always return true by default. This means that the component will
    always re-render when the parent component re-renders. `PureComponent`
    implements `shouldComponentUpdate` with a shallow prop and state
    comparison. This means that the component will not re-render if the
    props and state have not changed. This can break your app if you
    mutate objects in the props or state, because the shallow comparison
    will not detect the changes.

    ```jsx
    class App extends React.Component {
      state = {
        person: {
          name: "John",
          age: 28,
        },
      };

      handleClick = () => {
        const person = this.state.person;
        person.age = 29;
        this.setState({ person });
      };

      render() {
        return (
          <div>
            <button onClick={this.handleClick}>Change Age</button>
            <Person person={this.state.person} />
          </div>
        );
      }
    }

    class Person extends React.PureComponent {
      render() {
        console.log("Rendering");
        return (
          <div>
            {this.props.person.name} - {this.props.person.age}
          </div>
        );
      }
    }
    ```

    In the above example, the `Person` component will not re-render when
    the button is clicked because the `person` object is mutated. This
    means that the age update will not be reflected in the UI.

2.  Context + ShouldComponentUpdate might be dangerous. Why is
    that?

    When a component is connected to the context it will re-render whenever the
    context value changes. If the component also implements
    `shouldComponentUpdate` or uses `React.memo` to optimize rendering,
    it can lead to unexpected behavior because the component may not
    re-render when the context value changes.

3.  Describe 3 ways to pass information from a component to its
    PARENT.

    1. **Callback Functions Via Props**: Pass a callback function from
       the parent component to the child component as a prop. The child
       component can call the callback function with the information
       that needs to be passed to the parent component.

    2. **State Lifting**: You can use state lifting to manage
       the state in the parent component. The parent component can
       pass down the state value and a function to update the state
       as props to the child component, allowing the child component
       to update the state in the parent component.

    3. **Context**: If the child component is deeply nested
       within the component tree and passing props through multiple
       levels becomes cumbersome, you can use React context to pass
       information from a child component to its parent. The child
       component can update the context value, and the parent component
       can consume this value using the `useContext` hook or the
       `Context.Consumer` component.

4.  Give 2 ways to prevent components from re-rendering.

    1. **React.memo**: You can prevent a component from re-rendering
       by using the `React.memo` higher-order component. `React.memo`
       is a higher-order component that memoizes the component based
       on its props. If the props have not changed, the component will
       not re-render.

    2. **PureComponent**: If you are using class components, you can
       prevent a component from re-rendering by extending the
       `React.PureComponent` class instead of the `React.Component`
       class. `PureComponent` implements a `shouldComponentUpdate`
       method with a shallow prop and state comparison, so the component
       will not re-render if the props and state have not changed.

5.  What is a fragment and why do we need it? Give an example where it
    might break my app.

    A fragment is a way to group multiple children elements under a
    single parent element without adding extra nodes to the DOM. Fragments
    are useful when you need to return multiple elements from a component
    but don't want to add an additional wrapper element to the DOM.

    ```jsx
    function App() {
      return (
        <>
          <Header />
          <Main />
          <Footer />
        </>
      );
    }
    ```

    Example where it might break: Using keys or attributes (like class or style) directly on Fragment can lead to issues because Fragment doesn't support these attributes.

6.  Give 3 examples of the HOC pattern.

    1. **withRouter**: The `withRouter` higher-order component is used
       to pass the `history`, `location`, and `match` props to a component
       that is not directly rendered by a `Route` component. This allows
       the component to access the routing information provided by React
       Router.

    2. **connect**: The `connect` higher-order component is used in
       Redux to connect a component to the Redux store. It takes two
       functions as arguments, `mapStateToProps` and `mapDispatchToProps`,
       and returns a new component that has access to the Redux store
       state and dispatch functions.

    3. **withStyles**: The `withStyles` higher-order component is used
       in Material-UI to apply styles to a component. It takes a styles
       object as an argument and returns a new component that has the
       specified styles applied.

    4. **withLogProps**: A higher-order component that logs the props of a component before rendering it.

    ```jsx
    function logProps(Component) {
      return function (props) {
        console.log("Props:", props);
        return <Component {...props} />;
      };
    }

    const EnhancedComponent = logProps(MyComponent);
    ```

7.  What's the difference in handling exceptions in promises,
    callbacks and async...await?

    - **Promises**: When handling exceptions in promises, you can use
      the `catch` method to catch any errors that occur during the
      promise chain. If an error occurs in any of the `then` callbacks,
      the error will be caught by the `catch` method.

      ```js
      fetch("https://api.example.com/data")
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
      ```

    - **Callbacks**: Error first approach is used in callbacks where
      the first argument of the callback function is reserved for an
      error object. If an error occurs during the callback execution,
      the error object will be passed to the callback function.

      ```js
      fs.readFile("file.txt", (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log(data);
        }
      });
      ```

    - **Async/Await**: When handling exceptions in async/await functions,
      you can use the `try...catch` statement to catch any errors that
      occur in the async function. If an error occurs in the async function,
      the `catch` block will be executed.

      ```js
      async function fetchData() {
        try {
          const response = await fetch("https://api.example.com/data");
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }
      ```

8.  How many arguments does setState take and why is it async.

    `setState` takes two arguments: an object that represents the new
    state values to be merged with the current state, and an optional
    callback function that will be executed after the state has been
    updated.

    `setState` is asynchronous because React batches multiple `setState`
    calls into a single update for better performance. When you call
    `setState`, React schedules an update to the component's state and
    re-renders the component. If you call `setState` multiple times in
    the same event handler or lifecycle method, React will batch the
    updates together and perform a single re-render at the end of the
    event handler or lifecycle method.

9.  List the steps needed to migrate a Class to Function
    Component.

    0. **Backup the code**:
       Before migrating a class component to a function component,
       make sure to back up the code to avoid losing any changes.

    1. **Unit tests**:
       Make sure you have unit tests in place to ensure that the
       functionality of the component is maintained after the migration.

    2. **Convert the class component to a function component**:
       Convert the class component to a function component by removing
       the `class` keyword, extending `React.Component`, and the `render`
       method. Replace it with a function that returns JSX.

    3. **Convert lifecycle methods to hooks**:
       Replace the lifecycle methods with equivalent hooks. For example,
       you can replace `componentDidMount` with the `useEffect` hook.

    4. **Convert state to useState**:
       Replace the class component's state with the `useState` hook.

    5. **Convert props to function arguments**:
       Replace the class component's props with function arguments in
       the function component.

    6. **Convert class methods to functions**:
       Convert the class methods to regular functions within the function  
        component.

    7. **Remove `this` keyword**:
       Remove the `this` keyword from the function component.

    8. **Remove `this.setState`**:
       Replace `this.setState` with the `useState` hook to update the state.

    9. **Remove `this.props`**:
       Replace `this.props` with the function arguments in the function component.

10. List a few ways styles can be used with components.

    1.  **Inline Styles**: You can apply styles directly to JSX elements
        using the `style` attribute. The `style` attribute takes an object
        with CSS properties as key-value pairs.

        ```jsx
        function App() {
          const styles = {
            color: "red",
            fontSize: "16px",
          };

          return <div style={styles}>Hello World</div>;
        }
        ```

    2.  **CSS Classes**: You can apply styles to JSX elements using CSS

        ```jsx
        import "./styles.css";

        function App() {
          return <div className="container">Hello World</div>;
        }
        ```

    3.  **CSS Modules**: CSS Modules allow you to scope CSS styles to a
        specific component by importing the CSS file as a module.

        ```jsx
        import styles from "./App.module.css";

        function App() {
          return <div className={styles.container}>Hello World</div>;
        }
        ```

    4.  **Styled Components**: Styled components are a way to style
        components using JavaScript. You can define styled components
        using the `styled` function from the `styled-components` library.

            ```jsx
            import styled from "styled-components";

            const Container = styled.div`
            color: red;
            font-size: 16px;
            `;

            function App() {
            return <Container>Hello World</Container>;
            }
            ```

    5.  **CSS-in-JS Libraries**: There are several CSS-in-JS libraries
        like `styled-components`, `emotion`, and `styled-jsx` that allow
        you to write CSS styles directly in JavaScript.

11. How to render an HTML string coming from the server.

    To render an HTML string coming from the server in React, use the `dangerouslySetInnerHTML` attribute.

    ```jsx
    function App() {
      const htmlString = "<h1>Hello World</h1>";

      return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
    }
    ```

    `dangerouslySetInnerHTML` can expose your application to cross-site scripting (XSS) attacks if
    the HTML string is not sanitized properly.

    Use `DOMPurify` to sanitize the HTML string before rendering it.

    ```jsx
    import DOMPurify from "dompurify";

    function App() {
      const htmlString = "<h1>Hello World</h1>";
      const sanitizedHtml = DOMPurify.sanitize(htmlString);

      return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
    }
    ```
