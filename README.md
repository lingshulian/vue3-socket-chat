# vue3-socket-chat

> 这是一款响应式开源的 web 即时聊天应用，该应用使用全新技术构建，前端使用 `element-plus`+ `vue3` + `vite` + `ts` + `pinia` + `socket.io` + `unocss ` 等开发，后端使用 `nodejs` + `express` + `socket.io` + `express-jwt` 等开发，数据库使用 `mysql`，可自定义聊天主题，支持图片、视频等文件发送，文件存储方面还支持对接兼容 AWS s3 的对象存储平台，只需修改相应配置即可将文件存储到对象存储，能够很方便的进行二次开发和集成，也很适合新手交流学习

### 项目列表

#### 客户端项目

- chat-client 支持发送图片、视频、token权限登录，响应式聊天页面，可自定义主题，代码结构清晰、易上手

#### 服务端项目

- chat-service  支持 jwt 认证，聊天权限认证， s3 对象存储，提交数据校验等，代码结构清晰、易上手

#### 数据库

- chat-db

### 项目截图



![登录](https://github.com/lingshulian/vue3-socket-chat/blob/main/image/登录.gif)

![聊天](https://github.com/lingshulian/vue3-socket-chat/blob/main/image/聊天.gif)

![项目截图2](https://github.com/lingshulian/vue3-socket-chat/blob/main/image/项目截图2.jpg)

![项目截图1](https://github.com/lingshulian/vue3-socket-chat/blob/main/image/项目截图1.jpg)

###  功能列表

| 主功能             | 功能说明                 | web  |
| ------------------ | ------------------------ | ---- |
| 登录               | jwt token 授权认证       | √    |
| 注册               | 发送自动获取验证码注册   | √    |
| 消息提醒           | 声音、弹窗提示           | √    |
| 用户列表           | 目前获取的是所有用户列表 | √    |
| 切换主题           | 可随心修改和切换主题     | √    |
| 发送视频           | 支持对象存储             | √    |
| 发送表情           | 动态、静态表情           | √    |
| 发送图片、查看大图 | 支持对象存储             | √    |
| 标记未读消息       | 自动标记                 | √    |

### 技术栈

| 前端         | 描述                                   | 学习网站                                                     |
| ------------ | -------------------------------------- | ------------------------------------------------------------ |
| Vue3         | 渐进式 JavaScript 框架                 | [https://v3.cn.vuejs.org/](https://v3.cn.vuejs.org/)         |
| TypeScript   | JavaScript 的一个超集                  | [https://www.tslang.cn/](https://www.tslang.cn/)             |
| Vite         | 前端开发与构建工具                     | [https://cn.vitejs.dev/](https://cn.vitejs.dev/)             |
| Element Plus | 基于 Vue 3，面向设计师和开发者的组件库 | [https://element-plus.gitee.io/zh-CN/](https://element-plus.gitee.io/zh-CN/) |
| Pinia        | 新一代状态管理工具                     | [https://pinia.vuejs.org/](https://pinia.vuejs.org/)         |
| Vue Router   | Vue.js 的官方路由                      | [https://router.vuejs.org/zh/](https://router.vuejs.org/zh/) |
| Uno css      | 即时按需原子 CSS 引擎                  | [https://github.com/unocss/unocss](https://github.com/unocss/unocss) |

| 后端      | 描述                                                         | 学习网站                                                     |
| --------- | ------------------------------------------------------------ | :----------------------------------------------------------- |
| express   | 基于 [Node.js](https://nodejs.org/zh-cn/) 平台，快速、开放、极简的 Web 开发框架 | [https://www.expressjs.com.cn/](https://www.expressjs.com.cn/) |
| socket.io | 支持及时、双向与基于事件的交流                               | [https://socket.io/](https://socket.io/)                     |

### 环境准备

- 服务端：node.js（版本建议：>= v14.17.3）、兼容s3的对象存储（用于存储图片、视频等文件）
- web端：node.js（版本建议：>= v14.17.3）
- 数据库：mysql（版本建议：>= v8.0，可导入sql文件即可）

### 拉取项目

```bash
git clone https://github.com/lingshulian/vue3-socket-chat.git
```

### 基本目录

```
vue3-socket-chat     
├──chat-client    // web端项目
├──chat-service   // 服务端项目
├──chat-db        // 数据库
```

### 启动项目

#### web端

> 采用按需导入组件、css、icon的方式进行构建，首次运行时编译时间可能较长，但该方式不仅能够提高开发效率，在打包后还能够大大减少项目体积，是一种很好的开发方式

- 进入web端目录

```bash
cd vue3-socket-chat/chat-client
```

- 安装依赖

```bash
npm install
```

- 运行项目

```bash
npm run dev
```

- 打包项目（动态表情占14M多，代码体积不到1M)

```bash
npm run build
```

#### 数据库

这里我们使用的是 `MySQL Front` 导入数据表，具体可根据您的使用习惯来导入相应数据表

- 创建并连接好数据库

- 导入用户表

  - 进入MySQL Front 选择 `文件 -> 导入 ->SQL文件  `

  ![导入mysql](https://github.com/lingshulian/vue3-socket-chat/blob/main/image/导入mysql.png)

  - 选择 `vue3-socket-chat/chat-db/user.sql`导入即可

- 导入聊天记录表

  - 选择 `vue3-socket-chat/chat-db/chat.sql`导入即可

#### 服务端

- 进入服务端项目

```bash
cd vue3-socket-chat/chat-service
```

- 安装依赖

```bash
npm install
```

- 配置数据库

进入 `vue3-socket-chat/chat-service/config.js` 进行如下配置

```js
// 数据库配置
  dbConfig: {
      host: "localhost", 
      user: "lingshulian", // 数据库登录用户
      password: "lingshulian.com", // 数据库登录密码
      database: "lingshulian" // 数据库名称
  }
```

- 配置对象存储（不使用发送文件功能可跳过该步骤）

> 项目所使用的存储平台为 [棱束链对象存储](https://www.lingshulian.com/help-document?d_id=b2a6de5955c7dea64eaba8c9186f6f08)，该存储平台最大的优点就是存储成本低，不管是存储空间还是使用流量都远低于市场所有对象存储平台，活动期间对象存储空间低至  `0.06元/GB`，流量更是低至 `0.05元/GB`，拥有稳定可靠的存储能力，传输速度快，而且境外传输免流，是各大站长、企业、个人不二之选，有兴趣的话可戳 [www.lingshulian.com](https://www.lingshulian.com) 官网了解下

1. 创建存储桶 - [官方教程](https://www.lingshulian.com/help-document?d_id=fbf3eba4ef5ac21d42cf86447044c961)

2. 获取 `secretId` 和 `secretKey`

   - 创建好存储桶后，登录 [棱束链个人中心](https://console.lingshulian.com/user-center)，打开 **功能设置** 区域的 `API开启状态`，即可获得密钥

   ![获取棱束链对象存储密钥](https://github.com/lingshulian/vue3-socket-chat/blob/main/image/获取棱束链对象存储密钥.png)
   
3. 获取 `地域` 和 `端点`

   - 登录 [棱束链存储桶列表](https://console.lingshulian.com/bucket-list)，点击目标存储桶右侧的 `配置` 按钮，即可在桶配置页的桶信息区域获得相应桶的 `地域` 和 `端点`

   ![获取棱束链地域和端点](https://github.com/lingshulian/vue3-socket-chat/blob/main/image/获取棱束链地域和端点.png)

```js
  s3Config: {
    config: {
      credentials: {
        accessKeyId: 'ff6c3c04ea43b9811ef1f9132a5a05fe', // 上述获取的secretId
        secretAccessKey: 'e0a4095791261062f478767c60fdc9684f21524a0b5f9f0f4c2e0d39cecb6ba4' // 上述获取的secretKey
      },
      endpoint: 'https://s3-us-east-1.ossfiles.com', // https:// + 上述获取的的端点
      region: 'us-east-1' // 上述获取的地域
    },
    path: 'chat', // 上传的目录，可自定义
    bucket: "lingshuliantest" // 上述创建的存储桶
  }
```

- 启动服务

```bash
node app.js
```

### 测试

打开浏览器输入 http://localhost:3000 即可，以下提供几个默认测试账号

- 账号：123@lingshulian.com，密码：123456
- 账号：456@lingshulian.com，密码：123456
- 账号：789@lingshulian.com，密码：123456

### 浏览器支持

本地开发推荐使用 `Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

