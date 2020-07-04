import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'auth', ...(require('/Users/luantnguyen/Documents/2020/javascript/reactjs/huyefen-trolle/frontend/src/models/auth.js').default) });
app.model({ namespace: 'members', ...(require('/Users/luantnguyen/Documents/2020/javascript/reactjs/huyefen-trolle/frontend/src/models/members.js').default) });
app.model({ namespace: 'messages', ...(require('/Users/luantnguyen/Documents/2020/javascript/reactjs/huyefen-trolle/frontend/src/models/messages.js').default) });
app.model({ namespace: 'notifications', ...(require('/Users/luantnguyen/Documents/2020/javascript/reactjs/huyefen-trolle/frontend/src/models/notifications.js').default) });
app.model({ namespace: 'project', ...(require('/Users/luantnguyen/Documents/2020/javascript/reactjs/huyefen-trolle/frontend/src/models/project.js').default) });
app.model({ namespace: 'projects', ...(require('/Users/luantnguyen/Documents/2020/javascript/reactjs/huyefen-trolle/frontend/src/models/projects.js').default) });
app.model({ namespace: 'user', ...(require('/Users/luantnguyen/Documents/2020/javascript/reactjs/huyefen-trolle/frontend/src/models/user.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
