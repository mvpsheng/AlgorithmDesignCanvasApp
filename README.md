## Algorithm Degisn Canvas
页面：（CURD， 添加，更新，删除）
* 数据展示页面（主页）
* 添加canvas页面（点击添加按钮时）
* 删除Canvas
* 查看具体Canvas页面（点击某一个canvas进入）
* 编辑/更新Canvas页面（编辑页面就是将原来的查看页面展示的内容，通过DOM更换为输入框加内容）（在具体的某一个canvas页面中，可以进行点击编辑，进入编辑页面）
* 搜索Canvas （点击tag标签进行搜索，或者搜索框搜索关键字查看）

## TODO Features
* 查看所有Canvas
* 添加Canvas click the add canvas button to see the panel to add new canvas
* 搜索Canvas （内容，或者tags）search canvases by tags
* 查看Canvas详细信息  click canvas model to see the full content of a canvas
* 删除Canvas
* 更新/编辑Canvas （）
记录你对于一个算法问题的想法，核心的编码，不需要完整可运行，主要在于思维逻辑的训练。

## CSS todo
* make canvas panel pretty
* canvasPage边框大小需要调整 ，让每一个内容展示一个markdown板块，点击就可以编辑。


## To learn
1. react 项目中组件的样式写在哪里
2. react 组件的数据部分写在哪里
2. React 路由，切换页面， 当点击addCanvas时，切换到添加页面中来。

* 子组件如何给父组件传值

## 技术点
1. 调接口
2. 组件传值，父组件传给子组件， 子组件传给父组件
3. 生命周期  控制 渲染时机
4. 显示控制（备份一个数组，通过条件过滤来控制显示内容）

## 主页内容展示思路
1. 通过调接口获取所有Canvas数据（利用生命周期控制显示时机）
1.1 每个数据卡可点击，点击后进入详细页， 详细页可以进行编辑，可以进行删除

查询、删除、更新

->   搜索（tag， key words）

2. 设置selectedCanvas ，通过这个来设置要显示的canvas（之后要筛选Tag，或者根据内容搜索显示相关canvas时用到）
3. 通过点击添加按钮，设置打开显示 添加表单（条件显示）
4. 表单提交，添加接口


## 数据更新思路
在子组件发起了更新请求，更新请求之后会返回更新后的数据，但是如果只有子组件获取到了数据，那我返回父组件时，展示的数据是没有被更新的，当我展示父组件时，我想让父组件展示的数据也更新，如何做？