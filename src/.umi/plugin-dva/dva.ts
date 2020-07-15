// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from '/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'global', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/models/global.js').default) });
app.model({ namespace: 'login', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/models/login.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/models/user.js').default) });
app.model({ namespace: 'model', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/pages/account/center/model.js').default) });
app.model({ namespace: 'model', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/pages/account/settings/model.js').default) });
app.model({ namespace: 'model', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/pages/dashboard/analysis/model.jsx').default) });
app.model({ namespace: 'model', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/pages/dashboard/monitor/model.js').default) });
app.model({ namespace: 'model', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/pages/dashboard/workplace/model.js').default) });
app.model({ namespace: 'model', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/pages/form/advanced-form/model.js').default) });
app.model({ namespace: 'model', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/pages/form/basic-form/model.js').default) });
app.model({ namespace: 'model', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/pages/form/step-form/model.js').default) });
app.model({ namespace: 'model', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/pages/list/basic-list/model.js').default) });
app.model({ namespace: 'model', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/pages/list/card-list/model.js').default) });
app.model({ namespace: 'model', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/pages/list/search/applications/model.js').default) });
app.model({ namespace: 'model', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/pages/list/search/articles/model.js').default) });
app.model({ namespace: 'model', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/pages/list/search/projects/model.js').default) });
app.model({ namespace: 'model', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/pages/profile/advanced/model.js').default) });
app.model({ namespace: 'model', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/pages/profile/basic/model.js').default) });
app.model({ namespace: 'model', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/pages/user/login/model.js').default) });
app.model({ namespace: 'model', ...(require('/Users/vulong/Documents/Projects/tool-xxx/Amz-app-client-andt/src/pages/user/register/model.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (typeof window !== 'undefined') {
      _onCreate();
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
