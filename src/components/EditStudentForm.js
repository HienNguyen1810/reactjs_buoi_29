import { Col, Form, Input, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../redux/studentSlice";

function EditStudentForm() {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { students, form: data } = useSelector((state) => state.students);

	useEffect(() => {
		form.setFieldsValue(data);
	}, [form, data]);

	const onChange = (value) => {
		dispatch(updateForm(value));
	};

	return (
		<Form form={form} layout="vertical" onValuesChange={onChange}>
			<Row>
				<Col flex={6}>
					<Form.Item
						label="Mã SV"
						name="id"
						rules={[
							{
								required: true,
								message: "id không được rỗng",
							},
							{
								pattern: /^\d*$/,
								message: "id là số",
							},
							() => ({
								validator(_, value) {
									return students
										.filter((d) => d.key !== data.key)
										.some((d) => d.id === value)
										? Promise.reject(new Error("mã sinh viên đã tồn tại"))
										: Promise.resolve();
								},
							}),
						]}
					>
						<Input placeholder="Nhập mã sinh viên" />
					</Form.Item>
				</Col>
				<Col flex={6}>
					<Form.Item
						label="Họ tên"
						name="name"
						rules={[
							{
								required: true,
								message: "họ và tên không được rỗng",
							},
						]}
					>
						<Input placeholder="nhập họ tên" />
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col flex={6}>
					<Form.Item
						label="Số điện thoại"
						name="phoneNumber"
						rules={[
							{
								required: true,
								message: "Số điện thoại không được rỗng",
							},
							{
								pattern:
									/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
								message: "số điện thoại không hợp lệ",
							},
							() => ({
								validator(_, value) {
									return students
										.filter((d) => d.key !== data.key)
										.some((d) => d.phoneNumber === value)
										? Promise.reject(new Error("số điện thoại đã đăng ký"))
										: Promise.resolve();
								},
							}),
						]}
					>
						<Input placeholder="Nhâp số điên thoại" />
					</Form.Item>
				</Col>
				<Col flex={6}>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: "email không được rỗng",
							},
							{
								type: "email",
								message: "email không đúng",
							},
							() => ({
								validator(_, value) {
									return students
										.filter((d) => d.key !== data.key)
										.some((d) => d.email === value)
										? Promise.reject(new Error("email đã đăng ký"))
										: Promise.resolve();
								},
							}),
						]}
					>
						<Input placeholder="nhập email" />
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
}

export default EditStudentForm;
