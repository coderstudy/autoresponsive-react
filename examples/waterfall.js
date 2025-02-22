/* ================================================================
 * autoresponsive-react by xdf(xudafeng[at]126.com)
 *
 * first created at : Mon Jun 02 2014 20:15:51 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright 2014 xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

let React = require('react');
let AutoResponsive = require('..');
let Util = require('./util');

let arrayList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let styleList = {};
let getItemStyle = function() {
  return {
    width: 180,
    height: parseInt(Math.random() * 20 + 15) * 10,
    color: '#3a2d5b',
    cursor: 'default',
    borderRadius: 5,
    boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset',
    backgroundColor: '#5c439b',
    borderColor: '#796b1d',
    fontSize: '80px',
    lineHeight: '100px',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadow: '1px 1px 0px #816abe'
  };
}

const events = [];

arrayList.map(function(i) {
  styleList[i] = getItemStyle();
});

class WaterfallExampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.bindEventMap();
    this.state = {
      styleList: styleList
    };
  }

  bindEventMap() {
    events.forEach(function(i) {
      this[i] = this[i].bind(this);
    }.bind(this));
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    Util.ajax('./data.json', function(d) {
      let data = JSON.parse(d).data;
      this.setState({
        data: data
      });
    }.bind(this));
  }

  componentDidMount() {
    window.addEventListener('resize', function() {
      this.setState({
        containerWidth: React.findDOMNode(this.refs.container).clientWidth
      });
    }.bind(this), false);
  }

  getAutoResponsiveProps() {
    return {
      itemMargin: 10,
      containerWidth: this.state.containerWidth || document.body.clientWidth,
      itemClassName: 'item',
      gridWidth: 100,
      transitionDuration: '.5'
    };
  }

  render() {

    if (!this.state.data) {
      return <div>loading...</div>;
    }

    return (
      <div className="albumPanel">
        <AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
          {
            this.state.data.map(function(i, index) {
              let style = {
                width: i.w === 'w1' ? '190' : '390',
                height: i.w === 'w1' ? '240' : '490'
              };
              return (
                <a href="#" className={`${i.w} album item`} style={style}>
                  <img className="a-cont j_ACont" src="images/a.jpg"/>
                  <img className="a-cover" src={i.src}/>
                  <p className="a-mask">{index}<i></i></p>
                  <p className="a-layer">
                    <span className="al-brand">{i.brand}</span>
                    <span className="al-title">{i.title}</span>
                    <span className="al-count">{i.count}件商品</span>
                  </p>
                  <p className="a-more j_ALMore"></p>
                </a>
              );
            }, this)
          }
        </AutoResponsive>
      </div>
    );
  }
}

module.exports = WaterfallExampleComponent;
