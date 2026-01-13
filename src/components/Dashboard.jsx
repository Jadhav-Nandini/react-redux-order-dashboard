

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteOrder } from "../features/orderSlice";
import EditOrderModal from "./EditOrderModal";
import { MdEdit, MdDelete } from 'react-icons/md'




const Dashboard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.auth.currentUser);
  const orders = useSelector((s) => s.orders.orders);

  const userOrders = currentUser ? orders.filter
    (o => o.userId === currentUser.id) : [];


  const [editData, setEditData] = useState(null);

  return (
    <div className="container mt-4">
      <h2 className="my-4 border border-0 border-bottom border-dark-subtle p-2 shadow-lg rounded d-inline-block ">Dashboard</h2>

      <div className="table-responsive">


        <table className="table text-center table-bordered table-hover ">
          <thead>
            <tr className="text-center">
              <th>CUSTOMER</th>
              <th>EMAIL</th>
              <th>ADDRESS</th>
              <th>PRODUCTS</th>
              <th>QUANTITY</th>
              <th>PRICE</th>
              <th>DISCOUNT</th>
              <th>FINAL PRICE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody className="text-center ">
            {userOrders.map((order) => {
              const totalQty = order.items.reduce(
                (a, i) => a + i.quantity,
                0
              );

              const totalPrice = order.items.reduce(
                (a, i) => a + i.price * i.quantity,
                0
              );

              const finalPrice =totalPrice - (totalPrice * order.discount) / 100;
                return (
                <tr key={order.id}>
                  <td>{order.customerName}</td>
                  <td>{order.email}</td>

                  <td>
                    {order.address && (
                      <>
                        <div>{order.address.city}, {order.address.state}</div>
                        <div>{order.address.pincode}</div>
                        <small>{order.address.landmark}</small>
                      </>
                    )}
                  </td>

                  <td>
                    {order.items.map((p, i) => (
                      <div key={i}>
                        {p.productName} ({p.quantity})
                      </div>
                    ))}
                  </td>

                  <td>{totalQty}</td>
                  <td>₹{totalPrice}</td>
                  <td>{order.discount}%</td>
                  <td>₹{finalPrice}</td>

                  <td>
                   
                  <div className="d-flex gap-2 justify-content-center border p-2 rounded  ">

                    <MdEdit
                    style={{ fontSize: '1.5rem', color: '#46768bce' }}
                    onClick={() => setEditData(order)}
                  />

                  <MdDelete
                    style={{ fontSize: '1.5rem', color: '#d12e2e' }}
                    onClick={() =>
                      dispatch(deleteOrder(order.id))
                    }
                  />
                  </div>
                </td>
              </tr>
              );
          })}
        </tbody>
      </table>
    </div>

      {
    editData && (
      <EditOrderModal
        data={editData}
        close={() => setEditData(null)}
      />
    )
  }
    </div >
  );
};

export default Dashboard;

