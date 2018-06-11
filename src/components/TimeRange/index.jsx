import React,{Component} from 'react'
import {Row ,Popover} from 'antd'
import './index.scss'


class TimeRange extends Component{
    constructor(props){
        super(props)
        this.state ={
            rangeType:'time'
        }
    }

    onRangeSelect = (rangetype) =>{
        this.setState({
            rangeType: rangetype
        })
        console.log(this.state.rangeType)
    }

    render(){
        const content = (
            <div className="selectbox">
              <p className="select-p" onClick={this.downloadData}>导出数据</p>
              <p className="select-p" onClick={() => {this.setState({showImageSetting:true})}}>导出图片</p>
            </div>
          )

        return(
            <Row type="flex" justify="space-between" align="middle" className="abc-stock-kchart-card-toolbar">
                <div className='time-rangeBox'>
                    <span onClick={(e) => this.onRangeSelect('time')}
                        className={this.state.rangeType==='time' ? 'active' :'range-item'}>分时</span>
                    <span onClick={(e) => this.onRangeSelect('five')}
                        className={this.state.rangeType==='five' ? 'active' :'range-item'}>5分钟</span>
                    <span onClick={(e) => this.onRangeSelect('thirty')}
                        className={this.state.rangeType==='thirty' ? 'active' :'range-item'}>30分钟</span>
                    <span onClick={(e) => this.onRangeSelect('day')}
                        className={this.state.rangeType==='day' ? 'active' :'range-item'}>日线</span>
                    <span onClick={(e) => this.onRangeSelect('month')}
                       className={this.state.rangeType==='month' ? 'active' :'range-item'}>月线</span>
                </div>
                <div className="chart-edite">
                    <Popover content={content} trigger="hover" placement="bottom" overlayClassName="selectList">
                       <div className="edite-text">导出设置</div>   
                    </Popover>
                </div>
            </Row>

            
        )
    }
}

export default TimeRange