import { Button, Input, Modal, Space, Table } from "antd";
import { omit } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove, save, updateForm } from "../redux/studentSlice";
import "../styles/list-user.css";
import EditStudentForm from "./EditStudentForm";

function ListStudent() {
	const dispatch = useDispatch();

	const [keyword, setKeyword] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const allStudents = useSelector((state) => state.students);

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		const { form: data } = allStudents;

		dispatch(save(data));
		dispatch(updateForm({}));
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const onSearch = (value) => {
		setKeyword(value.trim());
	};
	const getData = () => {
		return keyword.length > 0
			? allStudents.students.filter((d) =>
					Object.values(omit(d, ["key"])).some((v) =>
						v.toString().includes(keyword),
					),
			  )
			: allStudents.students;
	};

	const columns = [
		{
			title: "MaSv",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Họ tên",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Số điện thoại",
			dataIndex: "phoneNumber",
			key: "phoneNumber",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					<Button
						htmlType="button"
						onClick={() => {
							dispatch(updateForm(record));
							showModal();
						}}
					>
						Edit
					</Button>
					<Button
						htmlType="button"
						onClick={() => {
							dispatch(remove(record));
						}}
					>
						Delete
					</Button>
				</Space>
			),
		},
	];

	return (
		<>
			<Input.Search
				allowClear
				style={{
					width: "40%",
				}}
				defaultValue=""
				onSearch={onSearch}
			/>
			<Table columns={columns} dataSource={getData()} />;
			<Modal
				title="Edit Student "
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<EditStudentForm />
			</Modal>
		</>
	);
}

export default ListStudent;
