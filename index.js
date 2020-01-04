var Event = require('bcore/event');
var $ = require('jquery');
var _ = require('lodash');
//var Chart = require('XXX');

var RED = 'data:image/png;base64,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'

var GREEN = 'data:image/png;base64,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'
/**
 * 马良基础类
 */
module.exports = Event.extend(function Base(container, config) {
  this.config = {
    theme: {}
  }
  this.container = $(container);           //容器
  this.apis = config.apis;                 //hook一定要有
  this._data = null;                       //数据
  this.chart = null;                       //图表
  this.init(config);
}, {
  /**
   * 公有初始化
   */
  init: function (config) {
    //1.初始化,合并配置
    this.mergeConfig(config);
    //2.刷新布局,针对有子组件的组件 可有可无
    this.updateLayout();
    //3.子组件实例化
    //this.chart = new Chart(this.container[0], this.config);
    //4.如果有需要, 更新样式
    this.updateStyle();
  },
  /**
   * 绘制
   * @param data
   * @param options 不一定有
   * !!注意: 第二个参数支持config, 就不需要updateOptions这个方法了
   */
  render: function (data, config) {
    data = this.data(data);
    var cfg = this.mergeConfig(config);
    //更新图表
    //this.chart.render(data, cfg);
    var html = this.createHtml(data)
    this.container.html(html)
    //如果有需要的话,更新样式
    this.updateStyle();
  },

  /**
   * 创建 HTML
  */
  createHtml: function (data) {
    var val = data[0].value
    var html = [
      '<div style="max-width: 150px; display: flex; justify-content: space-between; align-items: center; font-weight: bold; font-family: tahoma, Arial, sans-serif; font-size: 18px; color: rgb(255, 255, 255);">',
        '<div style="width: 64px; height: 32px; font-weight: bold; font-family: tahoma, Arial, sans-serif; font-size: 18px; background-position: center center; background-size: contain; text-align: center; line-height: 32px; padding-right: 10px; background-repeat: no-repeat;',
        'background-image:' + 'url(' + (val >= 0 ? RED : GREEN) + ');',
        '">',
          '同比',
        '</div>',
      (val >=0 ? '+' + val : val),
      '%</div>'
    ].join('')
    return html
  },
  /**
   *
   * @param width
   * @param height
   */
  resize: function (width, height) {
    this.updateLayout(width, height);
    //更新图表
    //this.chart.render({
    //  width: width,
    //  height: height
    //})
  },
  /**
   * 每个组件根据自身需要,从主题中获取颜色 覆盖到自身配置的颜色中.
   * 暂时可以不填内容
   */
  setColors: function () {
    //比如
    //var cfg = this.config;
    //cfg.color = cfg.theme.series[0] || cfg.color;
  },
  /**
   * 数据,设置和获取数据
   * @param data
   * @returns {*|number}
   */
  data: function (data) {
    if (data) {
      this._data = data;
    }
    return this._data;
  },
  /**
   * 更新配置
   * 优先级: config.colors > config.theme > this.config.theme > this.config.colors
   * [注] 有数组的配置一定要替换
   * @param config
   * @private
   */
  mergeConfig: function (config) {
    if (!config) {return this.config}
    this.config.theme = _.defaultsDeep(config.theme || {}, this.config.theme);
    this.setColors();
    this.config = _.defaultsDeep(config || {}, this.config);
    return this.config;
  },
  /**
   * 更新布局
   * 可有可无
   */
  updateLayout: function () {},
  /**
   * 更新样式
   * 有些子组件控制不到的,但是需要控制改变的,在这里实现
   */
  updateStyle: function () {
    var cfg = this.config;
    this.container.css({
      'font-size': cfg.size + 'px',
      'color': cfg.color || '#fff'
    });
  },
  /**
   * 更新配置
   * !!注意:如果render支持第二个参数options, 那updateOptions不是必须的
   */
  //updateOptions: function (options) {},
  /**
   * 更新某些配置
   * 给可以增量更新配置的组件用
   */
  //updateXXX: function () {},
  /**
   * 销毁组件
   */
   destroy: function(){console.log('请实现 destroy 方法')}
});