import React from 'react';
import { Typography } from 'antd';
import { SwapLeftOutlined } from '@ant-design/icons'

export default class Title extends React.Component {
	render() {
		return (
			<div className="col-md-7">
				<div className="col-md-6">
					<Typography.Title className="text-white" level={4}>冰纹登录</Typography.Title>
					<p>远足天际，始于脚下......</p>
					<a href="/" className="ant-btn text-white ant-btn-ghost ant-btn-round">
						<SwapLeftOutlined className="mr-2" />
						返回首页
					</a>
				</div>
			</div>
		);
	}
}