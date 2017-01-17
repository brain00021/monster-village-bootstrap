##MAC CDM ALL POINT & GULP TUTOURIAL
* ls- list directory contents(目錄)
* cd - change dirctory (更換目錄)
* pwd  - print working directory (顯示在哪個目錄)
* rm- remove（直接移除）
* sudo-super user do (強制使用)
* mdir-make diretory （製造目錄）

---

#GULP教學 

###npm-參考資料 

[npm參考資料](https://www.npmjs.com/package)
###安裝參考以及教學
1. http://www.gulpjs.com.cn/docs/getting-started/
2. http://abgne.tw/web/gulp/gulp-tuts-install-gulp-js.html
3. https://kejyuntw.gitbooks.io/gulp-learning-notes/content/start/Start-Watch.html
###專案處理
如果真的一直卡一些奇怪的Ｃrush
請用
`npm install -D`
說不定是環境問題
 先開專案 -> iterm2 Cd當下專案 ->`npm install gulp` -> `gulp watch`
不然就是安裝 
`npm install gulp` 其實是更快的方法

---

###檢查版本
`gulp --version` 或 `npm -v`

###ruby 安裝 compass
https://wcc723.github.io/gulp/2014/11/07/gulp-on-diff-os/

###安裝compass套件
`$ gem update --system`
`$ gem install compass`

gulp default 通常用來預設
用來設定 預設功能

###雜七雜八狀況
要插入json記得注意看標點符號  最後一個逗號 會把你搞死
如果真的不行
`npm cache clean` 確認問題
`npm package.json` 確認package.json

gulp 我個人安裝套件指令

`npm install gulp-uglifycss --save-dev` 
###安裝套件指令

gulp-concat: 合併檔案
gulp-uglify: 壓縮混淆 JavaScript 檔案
gulp-uglifycss: 壓縮 CSS 檔案
gulp-autoprefixer :用來編寫 其他前奏

gulp_broswer 的參考文件
http://www.browsersync.cn/docs/gulp/

###npm教學
`npm install -g browser-sync`
全局安裝