
import React, { Component } from 'react'
import AbcCandlechart from '../../components/AbcCandlechart';
import Highcharts from 'highcharts'
import ReactHighstock from 'react-highcharts/ReactHighstock.src'
import axios from 'axios'
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
          chartData:{},
          modalData:{}
        }
    }
    
    componentDidMount(){
      // console.log(this.props.match.params.id);
      var self = this;
      //请求蜡烛图数据
      axios.get('https://data.jianshukeji.com/stock/history/000001')
      .then(function(res){
      //    console.log(res);
         if(res.data.code !== 1) {
          alert('读取股票数据失败！');
          return false;
          }
          var data = res.data.data;
          var ohlc = [];
          var volume = [];
          var dataLength = data.length;
              for (var i=0; i < dataLength; i += 1) {
                  ohlc.push([
                          data[i][0], // 日期
                          data[i][1], // 开盘
                          data[i][2], // 最高
                          data[i][3], // 最低
                          data[i][4] // 收盘
                  ]);
                  volume.push(
                  {
                      x:data[i][0], //日期
                      y:data[i][5], // 成交量
                      color:(data[i][4]) - (data[i][1]) > 0 ? 'red' : 'green' //颜色
                   }
                 );
          }
        
        self.setState({
          chartData: {
            credits: {
              enabled: false
            },
            title: {
              text: '平安银行历史股价'
            },
            xAxis: {
              dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%y-%m',
                year: '%Y'
              }
            },
           // 鼠标悬放，提示的内容 根据实际需要来设置提示内容
           tooltip:{
            split:false,
            shared: true,
            formatter : function() {
               var s = Highcharts.dateFormat('<span> %Y-%m-%d %H:%M:%S</span>',this.x);
               for(let i = 0;i<this.points.length;i++){
                  if(this.points[i].series.userOptions.type === "candlestick"){
                    s += '<br /><b>' + this.points[i].series.name +'<b/><br />开盘:<b>'
                    +this.points[i].point.open
                    + '</b><br />最高:<b>'
                    + this.points[i].point.high
                    + '</b><br />最低:<b>'
                    + this.points[i].point.low
                    + '</b><br />收盘:<b>'
                    + this.points[i].point.close
                    + '</b><br />';
               }else{
                 s += '<br />' + this.points[i].series.name + ':<b>' + this.points[i].y + '<b/><br/>'
               }
             }
             return s;
             }
           },
            navigator: {
              enabled: false
            },
            scrollbar: {
              enabled: false
            },
            rangeSelector: {
              buttonSpacing: 20,
              buttonTheme: {
                width: 50,
                fill: 'none',
                stroke: '#ccc',
                'stroke-width': 1,
                r: 0,
                style: {
                  color: '#4C4C4C',
                  fontWeight: 'bold',
                  lineHeight: 30,
                },
                states: {
                  hover: {
                  },
                  select: {
                    fill: '#E6EFFF',
                    style: {
                      color: '#4C4C4C'
                    }
                  }
                }
              },
              labelStyle: {
                visibility: 'hidden'
              }
            },

            yAxis: [{
              labels: {
                align: 'right',
                x: -3
              },
              title: {
                text: '股价'
              },
              height: '65%',
              resize: {
                enabled: true
              },
              lineWidth: 2
            }, {
              labels: {
                align: 'right',
                x: -3
              },
              title: {
                text: '成交量'
              },
              top: '65%',
              height: '35%',
              offset: 0,
              lineWidth: 2
            }],
            series: [{
              type: 'candlestick',
              name: '平安银行',
              color: 'green',
              lineColor: 'green',
              upColor: 'red',
              upLineColor: 'red',
              tooltip: {
              },
              data: ohlc,
              id: 'sz'
            }, {
              type: 'column',
              name: '成交量',
              data: volume,
              yAxis: 1,
            },
           ],
            //商标水印，设置为不显示
            credits: {
              enabled: false
            },
            // 原本图表自带的底部滚动条，不需要，不使用
            scrollbar: {
              enabled: false
            },
            navigator: {
              enabled: false
            },
            // 导出 设置为不导出
            exporting: {
              enabled: false
            },
            legend:{
              enabled:false
            }
          },
          modalData: {
            credits: {
              enabled: false
            },
            title: {
              text: '平安银行历史股价'
            },
            xAxis: {
              dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%y-%m',
                year: '%Y'
              }
            },
           // 鼠标悬放，提示的内容 根据实际需要来设置提示内容
           tooltip:{
            split:false,
            shared: true,
            formatter : function() {
               var s = Highcharts.dateFormat('<span> %Y-%m-%d %H:%M:%S</span>',this.x);
               for(let i = 0;i<this.points.length;i++){
                  if(this.points[i].series.userOptions.type === "candlestick"){
                    s += '<br /><b>' + this.points[i].series.name +'<b/><br />开盘:<b>'
                    +this.points[i].point.open
                    + '</b><br />最高:<b>'
                    + this.points[i].point.high
                    + '</b><br />最低:<b>'
                    + this.points[i].point.low
                    + '</b><br />收盘:<b>'
                    + this.points[i].point.close
                    + '</b><br />';
               }else{
                 s += '<br />' + this.points[i].series.name + ':<b>' + this.points[i].y + '<b/><br/>'
               }
             }
             return s;
             }
           },
            navigator: {
              enabled: false
            },
            scrollbar: {
              enabled: false
            },
            rangeSelector: {
              buttonSpacing: 20,
              buttonTheme: {
                width: 50,
                fill: 'none',
                stroke: '#ccc',
                'stroke-width': 1,
                r: 0,
                style: {
                  color: '#4C4C4C',
                  fontWeight: 'bold',
                  lineHeight: 30,
                },
                states: {
                  hover: {
                  },
                  select: {
                    fill: '#E6EFFF',
                    style: {
                      color: '#4C4C4C'
                    }
                  }
                }
              },
              labelStyle: {
                visibility: 'hidden'
              }
            },

            yAxis: [{
              labels: {
                align: 'right',
                x: -3
              },
              title: {
                text: '股价'
              },
              height: '65%',
              resize: {
                enabled: true
              },
              lineWidth: 2
            }, {
              labels: {
                align: 'right',
                x: -3
              },
              title: {
                text: '成交量'
              },
              top: '65%',
              height: '35%',
              offset: 0,
              lineWidth: 2
            }],
            series: [{
              type: 'candlestick',
              name: '平安银行',
              color: 'green',
              lineColor: 'green',
              upColor: 'red',
              upLineColor: 'red',
              tooltip: {
              },
              data: ohlc,
              id: 'sz'
            }, {
              type: 'column',
              name: '成交量',
              data: volume,
              yAxis: 1,
            },
         
           ],
            //商标水印，设置为不显示
            credits: {
              enabled: false
            },
            // 原本图表自带的底部滚动条，不需要，不使用
            scrollbar: {
              enabled: false
            },
            navigator: {
              enabled: false
            },
            // 导出 设置为不导出
            exporting: {
              enabled: false
            },
            legend:{
              enabled:false
            }
          },
        })
      })
      .catch(function(error){
      })
  }

    render() {
        // chartData和modalData是同一组数据，为了解决弹出框图表样式修改不会影响到原页面中的图表才分了两组，
        // chartData是原页面中图表所用数据
        // modalData是导出模块弹出框图表所用数据
        return (
          <div className="App">
              <AbcCandlechart  chartData={this.state.chartData} modalData={this.state.modalData}/>
          </div>
        )
    }
}
export default Home