import React from "react";

import * as Realm from "realm-web";

const REALM_APP_ID = "unsplash-wrfxf";
const app = new Realm.App({ id: REALM_APP_ID });

const PostSchema = {
	name: "Post",
	properties: {
		_id: "objectId",
		url: "string",
		label: "string",
	},
};

const run = async () => {
	await app.logIn(new Realm.Credentials.anonymous());

	const realm = await Realm.open({
		schema: [PostSchema],
		sync: {
			user: app.currentUser,
			partitionValue: "myPartition",
		},
	});
};

const UserDetail = ({ user }) => {
	return (
		<div>
			<h1>Logged in with anonymous id: {user.id}</h1>
		</div>
	);
};

// Create a component that lets an anonymous user log in
const Login = ({ setUser }) => {
	const loginAnonymous = async () => {
		const user = await app.logIn(Realm.Credentials.anonymous());
		setUser(user);
	};
	return <button onClick={loginAnonymous}>Log In</button>;
};

const App = () => {
	// Keep the logged in Realm user in local state.
	// whenever the current user changes (e.g. logs in or logs out).
	const [user, setUser] = React.useState(app.currentUser);

	// If a user is logged in, show their details.
	// Otherwise, show the login screen.
	return (
		<div className="App">
			<div className="App-header">
				{user ? <UserDetail user={user} /> : <Login setUser={setUser} />}
			</div>
		</div>
	);
};

export default App;
