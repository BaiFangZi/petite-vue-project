## 简介

### 概述

`petite-vue`是前段时间刚推出的一个轻量版vue，用法与vue几乎相同，没有`jquery`那些繁琐的操作和语法，对于熟悉vue语法的用户来说，两分钟就可以上手，唯一的痛点是目前没有什么ui框架可以配套使用，需要自己写一套页面。

为了方便开发，我自己用`webpack`搭建了一套项目模板，有一说一，确实好用，终归还是抛弃了jquery。

### 适用情况

+ 项目较小，页面逻辑简单
+ 希望使用vue，但是用vue-cli搭建一套项目又觉得繁琐
+ 替代jquery进行开发

## petite-vue

### 指令

![image-20210826153639446](https://gitee.com/baifangzi/blogimage/raw/master/img/20210826153647.png)

### 自定义指令

使用方法完全一样，注册指令略有区别

~~~js
// 自定义指令
const vFocus = (ctx) => {
    console.log(ctx)
    ctx.el.focus()
}

createApp({
    store,
})
    .directive('focus', vFocus)
    .mount('#global-state-example')
~~~

### 生命周期

生命周期钩子函数只有两个：`mounted`和`unmounted`

~~~html
<div v-if="flag" @mounted="handleMount" @unmounted="handleUnmount">
    组件
</div>
~~~

~~~js
createApp({
    flag: false,
    handleSwitchLifeCycle() {
        this.flag = !this.flag
    },
    handleMount() {
        alert('组件被渲染了')
    },
    handleUnmount() {
        alert('组件被销毁了')
    },
}).mount('#lifecycle-example')
~~~

### 组件

分为带模板和不带模板的组件

~~~js
// 自定义组件
function WButton(props) {
    // clsssName
    console.log(props)
    return {
        $template: '#w-button',
        ...props,
    }
}
// 注册组件
createApp({
    WButton,
}).mount('#component-example')
~~~

~~~html
<!-- 按钮组件 -->
<template id="w-button">
    <button class="btn" :class="`btn-${type}`">
        <span>{{label}}</span>
    </button>
</template>

<!-- 使用组件 -->
<div id="component-example">
    <div
         class="btn-wrapper"
         v-scope="WButton({type:'primary',label:'普通按钮'})"
         ></div>
    <div
         class="btn-wrapper"
         v-scope="WButton({type:'success',label:'成功按钮'})"
         ></div>
    <div
         class="btn-wrapper"
         v-scope="WButton({type:'danger',label:'危险按钮'})"
         ></div>
</div>
~~~

### 状态管理

使用·`reactive`方法来创建全局状态管理

~~~js
// 全局状态管理
const store = reactive({
  text: '',
})

// 注册 store
createApp({
  store,
}).mount('#global-state-example')
~~~

使用时通过`store`对象找到对应状态

~~~html
<input type="text"  v-model="store.text" placeholder="输入一些值试试" />
~~~

至此为止介绍了`petite-vue`的一些关键语法，还有一些细节东西没有仔细了解，但是掌握这些基本差不多了

## 快速开发的脚手架

对于`petite-vue`没有像`vue-cli`那样用于快速开发的脚手架，自己写一套简单的。

### 多页面入口

说白了，这就是类似`jquery`的一个库，他不是vue那种单页面的应用，所以需要配置多入口

~~~js
  entry: {
    index: path.resolve(__dirname, '../src/pages/index/index.js'),
    dashboard: path.resolve(__dirname, '../src/pages/dashboard/index.js'),
  },

~~~

### html模板

针对不同页面配置了不同的模板

~~~js
new HtmlWebpackPlugin({
    title: '登陆',
    filename: 'index.html',
    template: path.resolve(__dirname, '../src/pages/index/index.html'),
    // chunks: ['index', 'petiteVue'],
    chunks: ['index'],
    hash: true,
    minify: {
        collapseWhitespace: true,
        removeComments: true,
    },
}),
    new HtmlWebpackPlugin({
    title: '远程控制',
    filename: 'dashboard.html',
    template: path.resolve(__dirname, '../src/pages/dashboard/index.html'),

    chunks: ['dashboard'],
    hash: true,
    minify: {
        collapseWhitespace: true,
        removeComments: true,
    },
}),
~~~

### 提取公共部分代码

每个页面都需要引入一次`petite-vue`,还有一些公共样式，这些都需要把他们提取出来

~~~json
optimization: {
    splitChunks: {
        cacheGroups: {
            common: {
                name: 'commons',
                chunks: 'all',
                minChunks: 2,
            },
        },
    },
},
~~~

### devServer

为了避免每次更改页代码都需要手动去刷新浏览器页面

~~~json
devServer: {
    // hot: true,
    disableHostCheck: true,
    inline: true,
    port: 4001,
    open: true,
    openPage: 'index.html',
    contentBase: [
        path.resolve(__dirname, '../src/pages/index'),
        path.resolve(__dirname, '../src/dashboard/index'),
    ],
},
~~~

### 全局环境变量

webpack5 不兼容`process.env`，手动去定义全局变量

~~~js
new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    'process.env.BASE_URL': JSON.stringify(EnvConfig.DEV_URL),
}),
~~~

### 本地跨域

最常见的跨域问题

~~~json
proxy: {
    '/dev': {
        target: EnvConfig.DEV_URL,
        changeOrigin: true,
        pathRewrite: {
            '^/dev': '',
        },
        logLevel: 'debug',
    },
},
~~~

### 打包时压缩css，通过link标签引入

~~~js
  new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
    }),
~~~

支持scss

~~~json
{
    test: /\.scss$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
},
~~~

### js兼容问题

babel-loader+ core-js实现兼容

~~~json
  {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: {
                  version: 3,
                },
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17',
                },
              },
            ],
          ],
        },
      },
~~~

## 总结

整个项目已经上传到了github上：[项目地址](https://github.com/BaiFangZi/petite-vue-project)

至此为止，一个项目的骨架基本算是完成了。









