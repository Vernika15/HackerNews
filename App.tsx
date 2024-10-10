import * as React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store} from '@store';
import {RootNavigator} from '@navigators';
import {colors} from '@theme';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={false}
      />
      <RootNavigator />
    </Provider>
  );
};

export default App;
