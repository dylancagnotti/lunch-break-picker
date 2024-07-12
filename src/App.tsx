import { Component, JSXElement } from 'solid-js';
import Header from './components/Header';

interface AppProps {
  children?: JSXElement;
}

const App: Component<AppProps> = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default App;
