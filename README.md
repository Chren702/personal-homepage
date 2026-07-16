# 个人主页

这是一个不需要服务器、数据库或构建工具的静态个人主页。

## 打开页面

直接双击根目录中的 `index.html` 即可。

也可以右键运行 `serve.ps1`，然后在浏览器访问 `http://localhost:4173/`。

## 修改个人信息

打开 `site-config.js`，替换姓名、邮箱、GitHub 地址、项目和文章数据。保存后刷新网页即可看到变化。

## 发布

推送到 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。

自动部署配置位于 `.github/workflows/deploy-pages.yml`。
