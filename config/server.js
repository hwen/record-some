/**
 * config
 */

const path = require('path');

const config = {
  // debug 为 true 时，用于本地调试
  debug: false,

  get mini_assets() {
    return !this.debug;
  }, // 是否启用静态文件的合并压缩，详见视图中的Loader

  name: '', // 社区名字
  description: '', // 社区的描述
  keywords: '',
  xtoken: '',

  // 添加到 html head 中的信息
  site_headers: ['<meta name="author" content="hwen" />'],
  site_logo: '', // default is `name`
  site_icon: '', // 默认没有 favicon, 这里填写网址

  // cdn host，如 http://cnodejs.qiniudn.com
  site_static_host: '', // 静态文件存储域名
  // 社区的域名
  host: 'localhost',
  // 默认的Google tracker ID，自有站点请修改，申请地址：http://www.google.com/analytics/
  google_tracker_id: '',
  // 默认的cnzz tracker ID，自有站点请修改
  cnzz_tracker_id: '',

  // mongodb 配置
  db: 'mongodb://127.0.0.1:27017/record_some',

  // redis 配置，默认是本地
  redis_host: '127.0.0.1',
  redis_port: 6379,
  redis_db: 0,
  redis_password: '',

  session_secret: 'record_secret', // 务必修改
  auth_cookie_name: 'record_cookie',

  // 程序运行的端
  // 额 6666 端口在我的win10不知怎么在chrome访问有问题
  // 而在 edge 和 postman 是没问题的。。。
  port: 7777,

  // log_dir: path.join(__dirname, 'logs'),
  log_dir: path.resolve(__dirname, '..', 'logs'),

  // 邮箱配置
  mail_opts: {
    host: 'smtp.126.com',
    port: 25,
    auth: {
      user: 'club@126.com',
      pass: 'club'
    },
    ignoreTLS: true
  },

  // github 登陆的配置
  GITHUB_OAUTH: {
    clientID: 'your GITHUB_CLIENT_ID',
    clientSecret: 'your GITHUB_CLIENT_SECRET',
    callbackURL: ''
  },
  // 是否允许直接注册（否则只能走 github 的方式）
  allow_sign_up: true,

  // 下面两个配置都是文件上传的配置

  // 7牛的access信息，用于文件上传
  qn_access: {
    accessKey: 'your access key',
    secretKey: 'your secret key',
    bucket: 'your bucket name',
    origin: 'http://your qiniu domain',
    // 如果vps在国外，请使用 http://up.qiniug.com/ ，这是七牛的国际节点
    // 如果在国内，此项请留空
    uploadURL: 'http://xxxxxxxx'
  },

  // 文件上传配置
  // 注：如果填写 qn_access，则会上传到 7牛，以下配置无效
  upload: {
    path: path.join(__dirname, 'public/upload/'),
    url: '/public/upload/'
  },

  file_limit: '1MB',
  visit_per_day: 1000 // 每个 ip 每天能访问的次数
};

if (process.env.NODE_ENV === 'test') {
  config.db = 'mongodb://127.0.0.1/record_test';
}

module.exports = config;
