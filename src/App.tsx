import { Component, JSXElement } from 'solid-js';

interface AppProps {
  children?: JSXElement;
}

const App: Component<AppProps> = (props) => {
  console.log('App');

  return <>{props.children}</>;
};

export default App;
