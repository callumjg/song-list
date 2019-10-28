import React from "react";
import { format } from "date-fns";
import "./ServicesTable.scss";

function ServicesTable(props) {
	return (
		<table className="table services-table">
			<tbody>
				{props.services.map(s => {
					return (
						<tr key={s._id}>
							<td style={{ width: "60%" }}>
								{format(new Date(s.date), "dd/MM/yyyy")}
								<ol>
									{s.songs.map((s, i) => (
										<li key={i}>{s.title}</li>
									))}
								</ol>
							</td>
							<td>
								{s.tags && (
									<ul>
										{s.tags.map((t, i) => (
											<li key={i}>{t}</li>
										))}
									</ul>
								)}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default ServicesTable;
