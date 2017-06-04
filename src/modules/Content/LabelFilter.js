import React from 'react';
// import { Link } from 'react-router-dom';

import './LabelFilter.less';
import config from '../../../config/config';
import axios from 'axios';
import { Tag } from 'antd';
const CheckableTag = Tag.CheckableTag;
import '../Content/CheckableTag.less';


class LabelFilter extends React.Component {

    constructor(props) {
        super(props);
        this.filterNames = [`尺寸筛选：`, `平台：`];
        this.state = {
            labels: [],
            currentSizeChecked: '全部',
            currentPlatformChecked: '全部',
        };
    }

    componentWillMount() {
        let self = this;
        axios.get(`${config.serverHost}/api/getLabels`)
            .then((res) => {
                if(res.status == 200 && res.data.code == 0) {
                    self.setState({
                        labels: res.data.labels
                    })
                    // console.log(res.data.labels);
                }
            }).catch((res) => {

            });
    }

    getFilterNamesList = () => {
        return this.filterNames.map((value, index) => {
                return (
                    <span 
                        key={index}
                        className={`filter-name`}
                        >
                        {value}
                    </span>
                    );
            });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.resetFilterFlag) {
            this.resetFilter();
        }
    }

    resetFilter = () => {
        this.setState({
            currentSizeChecked: '全部',
            currentPlatformChecked: '全部',
        });
    }
    


    handleCheckableTagCheck = (value, classification) => {
        let { currentSizeChecked, currentPlatformChecked } = this.state;
        let { onSearch } = this.props;

        let filterObj = {
            size: currentSizeChecked == '全部' ? undefined : currentSizeChecked,
            platform: currentPlatformChecked == '全部' ? undefined : currentPlatformChecked,
        };
        switch(classification) {
            case `尺寸`:
                this.setState({
                    currentSizeChecked: value,
                });
                filterObj.size = value == '全部' ? undefined : value;
                onSearch(undefined, filterObj);
                break;
            case `平台`:
                this.setState({
                    currentPlatformChecked: value,
                });
                filterObj.platform = value == '全部' ? undefined : value;
                onSearch(undefined, filterObj);
                break;
            default:
                break;
        }
    }   

    render() {
        let { labels, currentSizeChecked, currentPlatformChecked } = this.state;

        let sizeLabelsList = [];
        let platformLabelsList = [];
        labels.forEach((label, index) => {
            if(index == 0) {
                sizeLabelsList.push(
                    <CheckableTag 
                        key={Date.now().toString()}
                        className={`label-tag`}
                        checked={currentSizeChecked==`全部`}
                        onChange={() => this.handleCheckableTagCheck(`全部`, '尺寸')}
                        >
                        {`全部`}
                    </CheckableTag>
                );
                platformLabelsList.push(
                    <CheckableTag 
                        key={Date.now().toString()}
                        className={`label-tag`}
                        checked={currentPlatformChecked==`全部`}
                        onChange={() => this.handleCheckableTagCheck(`全部`, '平台')}
                        >
                        {`全部`}
                    </CheckableTag>
                );
            }

            if(label.classification == '尺寸') {
                sizeLabelsList.push(
                    <CheckableTag 
                        key={label._id}
                        className={`label-tag`}
                        checked={currentSizeChecked==label.labelName}
                        onChange={() => this.handleCheckableTagCheck(label.labelName, label.classification)}
                        >
                        {label.labelName}
                    </CheckableTag>
                );
            } else if(label.classification == '平台') {
                platformLabelsList.push(
                    <CheckableTag 
                        key={label._id}
                        className={`label-tag`}
                        checked={currentPlatformChecked==label.labelName}
                        onChange={() => this.handleCheckableTagCheck(label.labelName, label.classification)}
                        >
                        {label.labelName}
                    </CheckableTag>
                );
            }
            
        });
        return (
            <div className={`label-filter-container`}>
                <div className={`filter-name-div`}>
                    {this.getFilterNamesList()}
                </div>
                <div className={`filter-labels-div`}>
                    <div className={`filter-labels`}>
                        {sizeLabelsList}
                    </div>
                    <div className={`filter-labels`}>
                        {platformLabelsList}
                    </div>
                </div>
            </div>
        );
    }
}

export default LabelFilter;