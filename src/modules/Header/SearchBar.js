import React from 'react';
import { Select, Icon } from 'antd';
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';

const Option = Select.Option;

import styles from './SearchBar.less';
import { Link } from 'react-router-dom';

let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    });
    jsonp(`https://suggest.taobao.com/sug?${str}`)
      .then(response => response.json())
      .then((d) => {
        if (currentValue === value) {
          const result = d.result;
          const data = [];
          result.forEach((r) => {
            data.push({
              value: r[0],
              text: r[0],
            });
          });
          callback(data);
        }
      });
  }

  timeout = setTimeout(fake, 300);
}

class SearchBar extends React.Component {
    state = {
        data: [],
        value: '',
    }
    handleChange = (value) => {
        this.setState({ value });
        fetch(value, data => this.setState({ data }));
    }
    render() {
        const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
        return (
            <div style={{display: "flex", position: "relative",}}>
                <Select
                    mode="combobox"
                    value={this.state.value}
                    placeholder={"输入图标的名称或标签"}
                    notFoundContent=""
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
                    >
                    {options}
                </Select>
                <Link to="/searchresult" className={"custom-search-bar-search-link"}>
                    <Icon type="search" className={"custom-search-bar-search-icon"}/>
                </Link>
            </div>
        );
    }
}

export default SearchBar;