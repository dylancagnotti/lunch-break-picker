import { Component, JSXElement } from 'solid-js';
import Header from './components/Header';
import { ToastRegion, ToastList } from '@/components/ui/toast';

interface AppProps {
  children?: JSXElement;
}

const App: Component<AppProps> = (props) => {
  return (
    <>
      <Header />
      {props.children}
      <ToastRegion>
        <ToastList />
      </ToastRegion>
    </>
  );
};

export default App;
