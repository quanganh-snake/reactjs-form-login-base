import { useState } from "react";
import { toast } from "react-toastify";
const fetchLoginApi = async ({ username, password }) => {
	const response = await fetch("https://dummyjson.com/auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			username,
			password,
			expiresInMins: 60,
		}),
	});
	const data = await response.json();
	return {
		success: response.ok,
		successText: response.statusText,
		data,
	};
};

function App() {
	const [showPassword, setShowPassword] = useState(false);

	const [loading, setLoading] = useState(false);
	const [dataUser, setDataUser] = useState({
		username: "",
		password: "",
	});

	// useEffect(() => {
	// 	fetchLoginApi({
	// 		username: "emilys",
	// 		password: "emilyspass",
	// 	}).then((data) => console.log(data));
	// });

	const validateLogin = () => {
		if (!dataUser.username) {
			toast.error("Username không được để trống", {
				closeOnClick: true,
				pauseOnHover: false,
			});
			return false;
		}

		if (!dataUser.password) {
			toast.error("Password không được để trống", {
				closeOnClick: true,
				pauseOnHover: false,
			});
			return false;
		}

		return true;
	};

	const handleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	const handleChangeValue = (e) => {
		const { name, value } = e.target;
		setDataUser((prev) => ({ ...prev, [name]: value }));
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		if (!validateLogin()) return;
		try {
			setLoading(true);
			const result = await fetchLoginApi({
				username: dataUser.username,
				password: dataUser.password,
			});

			if (!result.success) {
				toast.error("Tài khoản hoặc mật khẩu không chính xác!", {
					closeOnClick: true,
					pauseOnHover: false,
				});
				return;
			}
			toast.success("Đăng nhập thành công!", {
				closeOnClick: true,
				pauseOnHover: false,
			});
		} catch (error) {
			console.log(">>> error: ", error);
			setLoading(false);
			toast.error("Tài khoản hoặc mật khẩu không chính xác!", {
				closeOnClick: true,
				pauseOnHover: false,
			});
		} finally {
			setLoading(false);
		}
	};

	const handleSaveAccount = (e) => {
		const checked = e.target.checked;
		if (checked && dataUser.username && dataUser.password) {
			localStorage.setItem("username", dataUser.username);
			localStorage.setItem("password", dataUser.password);
		} else {
			localStorage.removeItem("username");
			localStorage.removeItem("password");
		}
	};

	const handleResetFormLogin = () => {
		setDataUser({
			username: "",
			password: "",
		});
	};

	return (
		<div className="w-full h-screen bg-white">
			<div className="grid grid-cols-2">
				<div className="hidden md:block md:col-span-1">
					<div className="w-full bg-gray-200 flex items-center justify-center h-screen">
						<img src="/login.png" />
					</div>
				</div>
				<div className="col-span-2 md:col-span-1">
					<div className="w-full flex flex-col items-center justify-center h-screen">
						<div className="w-3xl mx-auto">
							<h3 className="text-5xl font-bold uppercase text-sky-800 mb-6">Uneti Online</h3>
							<div className="">
								<div className="font-semibold text-gray-500 text-xl flex items-center gap-x-1">
									<img src="log-in.png" />
									<span>Đăng nhập hệ thống</span>
								</div>
								<small>Chào mừng đến với hệ thống Uneti Online</small>
							</div>

							<form onSubmit={handleLogin} onReset={handleResetFormLogin} className="flex flex-col gap-y-4 my-4">
								<div className="username-input">
									<label htmlFor="username" className="font-semibold">
										Username
									</label>
									<div className="relative w-full border border-slate-200 rounded pl-9 pr-8 py-2">
										<i className="absolute left-2 top-2">
											<img src="user.png" />
										</i>
										<input
											onChange={handleChangeValue}
											value={dataUser.username}
											type="text"
											name="username"
											id="username"
											placeholder="Username"
											className="w-full h-full border-none focus:outline-none focus:border-none"
										/>
									</div>
								</div>
								{/* END: username */}
								<div className="password-input">
									<label htmlFor="password" className="font-semibold">
										Password
									</label>
									<div className="relative w-full border border-slate-200 rounded pl-9 pr-8 py-2">
										<i className="absolute left-2 top-2">
											<img src="lock.png" />
										</i>
										<input
											onChange={handleChangeValue}
											value={dataUser.password}
											type={showPassword ? "text" : "password"}
											name="password"
											id="password"
											placeholder="Password"
											className="w-full h-full border-none focus:outline-none focus:border-none"
										/>
										<i onClick={handleShowPassword} className="absolute right-2 top-2">
											<img src={`${showPassword ? "eye" : "eye-off"}.png`} />
										</i>
									</div>
								</div>
								{/* END: password */}
								<div className="">
									<label htmlFor="save-account">
										<input type="checkbox" onChange={handleSaveAccount} name="save-account" id="save-account" />
										<span className="ml-2">Nhớ tài khoản</span>
									</label>
								</div>
								<button disabled={loading} type="submit" className={`w-full bg-emerald-400 text-white py-2 rounded uppercase font-semibold hover:opacity-70`}>
									{loading ? "Đang xử lý..." : "Đăng nhập"}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
