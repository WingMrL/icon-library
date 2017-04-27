import React from 'react';
import { Select, Icon } from 'antd';
import axios from 'axios';
// import jsonp from 'fetch-jsonp';
// import querystring from 'querystring';

const Option = Select.Option;

import styles from './SearchBar.less';
import { Link } from 'react-router-dom';
import config from '../../../config/config';

let timeout;
let currentValue;

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.timeout;
        this.currentValue;
        onSelect: false;
        this.state = {
            data: [],
            value: '',
        }
    }

    componentWillMount() {
        
    }

    fetch = (value, callback) => {
        let self = this;
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.currentValue = value;

        function fake() {
            let data = {
                searchName: value
            };
            axios.post(`${config.serverHost}/api/suggest`, data)
                    .then((res) => {
                        if(res.data.code == 0) {
                            callback(res.data.data);
                        } else if(res.data.code == -1) {
                            self.setState({
                                data: self.getSearchHistory()
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
        }

        this.timeout = setTimeout(fake, 500);
    }

    handleSelectOnFocus = () => {
        if(this.state.value == '') {
            this.setState({
                data: this.getSearchHistory()
            });
        }
    }

    getSearchHistory = () => {
        let history = localStorage.getItem('searchHistory');
        if(history) {
            history = JSON.parse(history);
        } else {
            history = [];
        }
        return history;
    }

    handleOnSelect = () => {
        this.onSelect = true;
    }

    handleSearchOnClick = (e) => {
        let { value } = this.state;
        let history = this.getSearchHistory();
        value = {
            _id: history.length == 0 ? 1 : history[0]._id + 1,
            text: value
        }
        history.unshift(value);
        history = JSON.stringify(history);
        localStorage.setItem('searchHistory', history);
    }

    handleChange = (value) => {
        this.setState({ value });
        if(this.onSelect) {
            this.onSelect = false;
            return;
        }
        this.fetch(value, data => this.setState({ data }));
    }

    render() {
        const options = this.state.data.map((d) => {
                return <Option key={d._id} value={d.text}>{d.text}</Option>
            });
        const { value } = this.state;
        return (
            <div style={{display: "flex", position: "relative",}}>
                <Select
                    mode="combobox"
                    value={value}
                    placeholder={"输入图标的名称或标签"}
                    notFoundContent=""
                    onFocus={this.handleSelectOnFocus}
                    style={{
                        width: 420,
                        height: 48,
                        marginLeft: 45,
                        borderRadius: 100,
                    }}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onChange={this.handleChange}
                    className={`asdfaskjdfakshdfkjahsf`}
                    dropdownStyle={{
                        maxHeight: 224
                    }}
                    onSelect={this.handleOnSelect}
                    >
                    {options}
                </Select>
                <Link 
                    to={{
                        pathname: '/searchresult',
                        search: `?search=${value}`
                    }} 
                    className={"custom-search-bar-search-link"}
                    onClick={this.handleSearchOnClick}
                    disabled={value == ''}
                    >
                    <Icon type="search" className={"custom-search-bar-search-icon"}/>
                </Link>
            </div>
        );
    }
}

export default SearchBar;