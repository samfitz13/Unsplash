import React, { useEffect, useState } from "react";
import axios from "axios";

import { Layout, Input, Button, Modal, Empty, Card, Col, Row } from "antd";
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
					<Card
						key={post._id}
						hoverable
						style={{ width: 360 }}
						cover={<img alt="imageholder" src={post.url} />}
					>
						<h3>{post.label}</h3>
					</Card>
				</Col>
			);
		});
	} else {
		return <Empty />;
	}
};

const App = () => {
	const [visible, setVisible] = React.useState(false);
	const [confirmLoading, setConfirmLoading] = React.useState(false);
	const [modalText, setModalText] = React.useState("Content of the modal");

	const [posts, getPosts] = useState("");

	useEffect(() => {
		getAllPosts();
	}, []);

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

	const handleOk = () => {
		setModalText("Modal Text Here");
		setConfirmLoading(true);
		//insert function here
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
					title="Add a New Photo"
					visible={visible}
					onOk={handleOk}
					confirmLoading={confirmLoading}
					onCancel={handleCancel}
					okText="Submit"
				>
					<p>{modalText}</p>
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
