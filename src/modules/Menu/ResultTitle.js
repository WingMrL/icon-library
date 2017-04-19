import React from 'react';

import './ResultTitle.less';

class ResultTitle extends React.Component {
    render() {
        return (
            <div className={`result-title-container`}>
                <span className={`title`}>
                    “<span className={`inner-title`}>EasiNote5</span>”
                </span>
                <span className={`result-text`}>搜索结果</span>
            </div>
        );
    }
}

export default ResultTitle;