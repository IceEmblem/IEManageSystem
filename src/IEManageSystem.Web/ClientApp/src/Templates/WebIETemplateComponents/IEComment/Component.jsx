import React from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import defaultAvatar from 'images/default_avatar.png'
import IComponent from 'IETemplateComponents/IEComment/IComponent'


const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} 条评论`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

class Component extends IComponent {
    render() {
        let comments = this.props.componentData.getSingleDatas("commentData").map(item => ({
            author: item.field2,
            avatar: item.field3 || defaultAvatar,
            content: <p>{item.field4}</p>,
            datetime: item.field5,
        }));
        const { submitting, value } = this.state;

        return (
            <div style={this.baseStyle}>
                <Comment
                    avatar={
                        <Avatar
                            src={defaultAvatar}
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={e => {
                                this.setState({
                                    value: e.target.value,
                                });
                            }}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
                {comments.length > 0 && <CommentList comments={comments} />}
            </div>
        );
    }
}

export default Component;
