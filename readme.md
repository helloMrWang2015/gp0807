readme
+ 项目说明文档；hello world
    1. 一半会随着项目放在一起
    2. 项目说明文档

## git init
1. 把当前目录初始化为版本库
2. 当前目录下回生成一个隐藏文件 .git

## git add 文件名
1. 把当前目录下的某个文件提交到暂存区
2. git add readme.md 把这个文件提交到暂存区
3. git add . 把当前目录所有变动提交到暂存区

## git status
1. 查看当前目录状态（新增、删除、修改）；

## git commit -m '提交注释'
1. 把暂存区内容提交到本地仓库

## 本地仓库的三个组成部分
1. 工作区（实际持有文件）
2. 暂存区（隐藏的一个区域）

## git log
1. 查看操作日志

## git reflog
1. 查看操作日志（简单版）

## git diff 文件名
1. 查看文件变更信息

## git reset --hard HEAD^^ 回退两个版本
## git reset --hard 191e0c7 回退到指定版本


## 远程仓库

## git remote add origin 仓库地址
1. 把本地仓库与远程仓库关联
2. origin仓库名可以自定义

## git remote -v
1. 查看本地仓库关联的远程仓库地址

## git push -u origin master
1. `git push` 本地仓库提交到远程仓库
2. `-u origin master` 设置默认的远程仓库和分支
3. 执行完这个命令之后，以后可以直接`git push`提交到远程仓库的master分支
4. upstream : 关联，设置成默认关联


## 更新代码
1. 把远程代码更新到本地时，一定要先提交本地代码再更新
2. git fetch：相当于是从远程仓库更新到本地，不会自动merge（合并到工作区）
2. git pull：从远程获取最新版本并merge到本地
