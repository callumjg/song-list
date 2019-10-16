import { useEffect, useState } from "react";
import server from "../apis/server";
export default function useResource(url, defaultData) {
	const [data, setData] = useState(defaultData);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const response = await server.get(url);
				setData(response.data);
			} catch (e) {
				console.error(e);
				let message = e.response ? e.response.data.message : e.message;
				setError(message);
			}
			setIsLoading(false);
		})();
	}, [url]);
	return [data, error, isLoading];
}
