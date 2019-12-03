import React, { PureComponent } from 'react';
import { Input, Table, Divider, Button, Popconfirm, Tag } from "antd";
import moment from "moment";
import UserModal from './UserModal';

const { Search } = Input;
interface IUserListState {
    userList: Array<any>
}
class UserList extends PureComponent<{}, IUserListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            userList: []
        }
    }
    componentDidMount() {
        this.setState({
            userList: [
                {
                    key: 1,
                    index: "1",
                    name: "Brown",
                    sex: "女",
                    job: "会计",
                    birthday: "2019/11/21",
                    hobby: ["羽毛球", "篮球"]
                },
                {
                    key: 2,
                    index: "2",
                    name: "Green",
                    sex: "男",
                    job: "老师",
                    birthday: "2019/11/21",
                    hobby: ["篮球", "乒乓球"]
                },
                {
                    key: 3,
                    index: "3",
                    name: "Black",
                    sex: "女",
                    job: "司机",
                    birthday: "2019/11/21",
                    hobby: ["羽毛球", "乒乓球"]
                }
            ]
        })
    }

    //删除用户
    deleteHandler = (key: number) => {
        this.setState({
            userList: this.state.userList.filter(item => item.key !== key)
        })
    };

    //根据用户姓名搜索用户
    searchHandler = (value: string) => {
        this.setState({
            userList: this.state.userList.filter(item => item.name === value)
        })
    };

    //编辑用户
    editHandler = (values: any) => {
        console.log("editHandlervalues", values)
        const userList = this.state.userList.filter(item => item.key !== values.key);
        console.log("editHandleruserList", userList)
        this.setState({
            userList: [...userList, values.values]
        })

    };

    //添加
    createHandler = (values: any) => {
        console.log("createHandler", values.values)
        const { sex, birthday } = values.values;
        values.values.sex = sex === "man" ? "男" : "女";
        values.values.birthday = moment(birthday).format("YYYY/MM/DD")
        const { userList } = this.state;
        this.setState({
            userList: [...userList, values.values]
        })
    };
    render() {
        console.log('this.state.userList', this.state.userList)
        console.log('props', this.props)
        const columns = [
            //   {
            //     title: "序号",
            //     dataIndex: "index",
            //     key: "index"
            //   },
            {
                title: "姓名",
                dataIndex: "name",
                key: "name"
            },
            {
                title: "性别",
                dataIndex: "sex",
                key: "sex"
            },
            {
                title: "职业",
                dataIndex: "job",
                key: "job"
            },
            {
                title: "出生日期",
                dataIndex: "birthday",
                key: "birthday"
            },
            {
                title: "爱好",
                dataIndex: "hobby",
                key: "hobby",
                render: (hobby: Array<string>) => (
                    <span>
                        {hobby && hobby.map(hobby => {
                            return <Tag key={hobby}>{hobby.toUpperCase()}</Tag>;
                        })}
                    </span>
                )
            },
            {
                title: "操作",
                key: "action",
                render: (text: any, record: any) => (

                    <span>
                        <UserModal record={record} onOk={this.editHandler}>
                            <Button className="btn-table-edit" >编辑</Button>
                        </UserModal>

                        <Divider type="vertical" />
                        <Popconfirm
                            title="Confirm to delete?"
                            onConfirm={() => this.deleteHandler(record.key)}
                        >
                            <Button>删除</Button>
                        </Popconfirm>
                    </span>
                )
            }
        ];
        return (
            <div>
                <div style={{ margin: 40 }}>
                    <UserModal record={{}} onOk={this.createHandler}>
                        <Button type="primary" style={{ marginRight: 40 }}>增加</Button>
                    </UserModal>
                    <Search
                        placeholder="input search text"
                        onSearch={value => {
                            this.searchHandler(value);
                        }}
                        style={{ width: 400 }}
                        enterButton
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={this.state.userList}
                    rowKey={(record, index) => `complete${record.key}${index}`}
                />
            </div>
        )
    }
}

export default UserList;