import React, { useState, useMemo } from "react";
import useResource from "../../hooks/useResource";
import PageButtons from "../util_components/PageButtons";
import ServicesTable from "./ServicesTable";
import ServiceForm from "./ServiceForm";
import Limiter from "../util_components/Limiter";
import Loader from "../util_components/Loader";
import Modal from "../util_components/modal/Modal";
import server from "../../apis/server";

function ServicesList(props) {
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState("");

	const url = useMemo(() => {
		let url = `/services?limit=${limit}`;
		if (typeof limit === "number") url += `&skip=${limit * page}`;
		return url;
	}, [limit, page]);

	const [{ count, services }, error, isLoading] = useResource(url, {
		count: 0,
		services: []
	});

	async function onSubmit(formValues) {
		setIsSubmitting(true);
		try {
			const response = await server.post("/services", formValues);
			console.log(response);
			// console.log("placeholder");
		} catch (e) {
			let message = e.response ? e.response.data.message : e.message;
			setSubmitError(message);
		}
		setIsSubmitting(false);
	}

	return (
		<section className="container relative py-3">
			<h4>Services</h4>
			{error ||
				(submitError && (
					<p className="alert alert-danger my-2 p-2">{error || submitError}</p>
				))}
			<div className="d-flex justify-content-between align-items-start">
				<button
					className="btn btn-sm btn-outline-primary"
					onClick={() => setIsModalOpen(true)}
				>
					<i className="ui plus icon" /> Add Service
				</button>
				<Limiter
					limit={limit}
					setLimit={setLimit}
					setPage={setPage}
					limitButtons={[5, 10, 20]}
				/>
			</div>
			<div className="relative">
				<Loader loading={isLoading || isSubmitting}>
					<ServicesTable services={services} />
				</Loader>
			</div>
			<PageButtons
				page={page}
				pagesNum={Math.ceil(count / limit)}
				setPage={setPage}
			/>
			<Modal
				isOpen={isModalOpen}
				onDismiss={() => setIsModalOpen(false)}
				large
				title="New Service"
			>
				<ServiceForm
					onDismiss={() => setIsModalOpen(false)}
					onSubmit={onSubmit}
				/>
			</Modal>
		</section>
	);
}

export default ServicesList;
