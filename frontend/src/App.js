import React, { useEffect, useState } from "react";
import axios from "axios";

import { Layout, Input, Button, Modal } from "antd";
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

const App = () => {
	const [visible, setVisible] = React.useState(false);
	const [confirmLoading, setConfirmLoading] = React.useState(false);
	const [modalText, setModalText] = React.useState("Content of the modal");

	const [data, setData] = useState();
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		async function fetchData() {
			let postData = await fetch("localhost://8082/post/all");
			console.log("postData:" + postData);
			setData(postData);
			setLoading(false);
		}
		fetchData();
	}, []);

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
					title="Test Title"
					visible={visible}
					onOk={handleOk}
					confirmLoading={confirmLoading}
					onCancel={handleCancel}
					okText="Submit"
				>
					<p>{modalText}</p>
				</Modal>
			</Header>
			<Content>{isLoading ? <p>Loading</p> : <p>{data}</p>}</Content>
		</Layout>
	);
};

export default App;
