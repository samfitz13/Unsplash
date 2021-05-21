import React, { useEffect, useState } from "react";
import axios from "axios";

import {
	Form,
	Layout,
	Input,
	Button,
	Modal,
	Empty,
	Image,
	Col,
	Row,
	Popover,
} from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const { Header, Content } = Layout;

const styles = {
	headerstyle: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
};

const DisplayPosts = (props) => {
	const { posts } = props;

	if (posts.length > 0) {
		return posts.map((post) => {
			console.log(post);
			return (
				<Col span={8}>
					<Popover content={post.label}>
						<Image key={post._id} alt={post.label} width={360} src={post.url} />
					</Popover>
				</Col>
			);
		});
	} else {
		return <Empty />;
	}
};

const App = () => {
	const [visible, setVisible] = React.useState(false);
	const [change, setChange] = React.useState(true);
	const [posts, getPosts] = useState("");

	useEffect(() => {
		getAllPosts();
	}, [change]);

	const getAllPosts = () => {
		axios
			.get("http://localhost:8082/post/all")
			.then((response) => {
				const allPosts = response.data;
				console.log(allPosts);
				getPosts(allPosts);
			})
			.catch((error) => console.error(`Error: ${error}`));
	};

	const showModal = () => {
		setVisible(true);
	};

	const handleOk = (e) => {
		console.log(e);
		setChange(false);
		axios
			.post("http://localhost:8082/post/create", {
				label: e.label,
				url: e.url,
			})
			.then((res) => console.log(res))
			.catch((error) => console.error(`Error: ${error}`));

		setVisible(false);
		setChange(true);
	};

	const handleCancel = () => {
		console.log("cancelled");
		setVisible(false);
	};

	return (
		<Layout className="App">
			<Header style={styles.headerstyle}>
				<div className="logo" />
				<Input placeholder="Search using Name" style={{ width: 300 }} />
				<Button
					icon={<CloudUploadOutlined />}
					onClick={showModal}
					type="primary"
					shape="round"
				>
					Add a photo
				</Button>
				<Modal
					title="Test Title"
					visible={visible}
					onOk={handleOk}
					onCancel={handleCancel}
					okText="Submit"
					footer={[
						<Button onClick={handleCancel}>Cancel</Button>,
						<Button form="addPhoto" type="primary" htmlType="submit">
							Submit
						</Button>,
					]}
				>
					<Form id="addPhoto" onFinish={handleOk}>
						<Form.Item
							label="Label"
							name="label"
							rules={[{ required: true, message: "Please input a label" }]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="URL"
							name="url"
							rules={[{ required: true, message: "Please input a link" }]}
						>
							<Input />
						</Form.Item>
					</Form>
				</Modal>
			</Header>
			<Content>
				<Row gutter={16}>
					<DisplayPosts posts={posts} />
				</Row>
			</Content>
		</Layout>
	);
};

export default App;
