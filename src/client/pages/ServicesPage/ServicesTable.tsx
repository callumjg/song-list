import React from "react";
import moment from "moment";
import "./ServicesTable.scss";

interface Props {
  services: any[];
  deleteService: (...args: any[]) => void;
}

const ServicesTable: React.FC<Props> = ({ services, deleteService }) => (
  <table className="table services-table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Songs</th>
        <th>Tags</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {services.map(service => (
        <tr key={service._id}>
          <td>{moment(service.date).format("DD/MM/YYYY")}</td>
          <td>
            <ol>
              {service.songs.map((song: any, i: number) => (
                <li key={i}>{song.title}</li>
              ))}
            </ol>
          </td>
          <td>
            {service.tags && (
              <ul>
                {service.tags.map((tag: any, i: number) => (
                  <li key={i}>{tag}</li>
                ))}
              </ul>
            )}
          </td>
          <td>
            <button className="btn btn-sm btn-outline-danger" type="button">
              <i
                className="ui trash icon"
                onClick={() => deleteService(service._id)}
              />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ServicesTable;
