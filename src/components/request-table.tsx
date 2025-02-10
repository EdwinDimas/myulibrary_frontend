import React, { useState } from 'react';
import { useGetRequestsQuery, useChangeRequestStatusMutation } from '../store/endpoints/requestsApi';


const RequestsTable: React.FC = () => {
  const { data: requests, error, isLoading } = useGetRequestsQuery({});
  const [changeRequestStatus] = useChangeRequestStatusMutation();
  const [statuses, setStatuses] = useState<{ [key: number]: string }>({}); // Estado individual para cada solicitud

  const handleChangeStatus = async (requestId: number) => {
    const status = statuses[requestId];
    if (!status) {
      alert("Please select a status");
      return;
    }

    try {
      await changeRequestStatus({ requestId, newStatus: status });
      console.log(`Request ${requestId} status changed to ${status}`);
      // Aquí puedes hacer algo después de cambiar el estado, como actualizar el estado o mostrar un mensaje.
    } catch (err) {
      console.error('Error changing status:', err);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, requestId: number) => {
    setStatuses({
      ...statuses,
      [requestId]: e.target.value,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching requests</div>;

  return (
    <div className="container mx-auto my-4">
      <h2 className="text-2xl mb-4">Checkout Requests</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Book</th>
            <th className="px-4 py-2 border-b">Status</th>

            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests?.map((request: any) => (
            <tr key={request.id} className="text-center">
              <td className="border-b px-4 py-2">{request.id}</td>
              <td className="border-b px-4 py-2">{request.book}</td>
              <td className="border-b px-4 py-2">

                <div>
                  <strong>{request.status_details[request.status_details.length - 1].status}</strong>
                  <br />
                  <span>{request.status_details[request.status_details.length - 1].user}</span>
                  <br />
                  <span>{new Date(request.status_details[request.status_details.length - 1].datetime).toLocaleString()}</span>
                </div>

              </td>



              <td className="border-b px-4 py-2">

               {request.status_details[request.status_details.length - 1].status == "APPROVED" ? 
                
                <button
                      onClick={() => handleChangeStatus(request.id)}
                      className="bg-green-900 text-white py-1 px-4 rounded ml-2"
                    >
                      Mark as returned
                </button>
                
                :


                  <>
                    <select
                      onChange={(e) => handleSelectChange(e, request.id)} // Se maneja el cambio individual
                      value={statuses[request.id] || ''}
                      className="border p-2 rounded"
                      hidden={request.status_details.length > 1}
                    >
                      <option value="">Select Status</option>
                      <option value={2}>Accepted</option>
                      <option value={3}>Cancelled</option>
                    </select>
                    <button
                      onClick={() => handleChangeStatus(request.id)}
                      className="bg-blue-500 text-white py-1 px-4 rounded ml-2"
                      hidden={request.status_details.length > 1}
                    >
                      Change Status
                    </button>
                  </>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsTable;
