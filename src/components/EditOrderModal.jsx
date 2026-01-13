
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, updateOrder } from "../features/orderSlice";

const EditOrderModal = ({ data, close }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(s => s.auth.currentUser);

  const isEdit = Boolean(data);

  const [customerName, setCustomerName] = useState(data?.customerName || "");
  const [email, setEmail] = useState(data?.email || "");

  const [address, setAddress] = useState(data?.address || {
    city: "",
    state: "",
    pincode: "",
    landmark: ""
  });



  const [items, setItems] = useState(
    data?.items || [{ productName: "", price: 0, quantity: 0 }]
  );
  const [discount, setDiscount] = useState(data?.discount || 0);


  const addMoreProduct = () => {
    setItems(prev => [
      ...prev,
      { productName: "", price: 0, quantity: 1 }
    ]);
  };

  const updateAddress = (field, value) => {
    setAddress({
      ...address,
      [field]: value
    });
  };


  const updateItem = (index, field, value) => {
    setItems(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, [field]: value }
          : item
      )
    );
  };


  const saveData = () => {
    const payload = {
      id: isEdit ? data.id : Date.now(),
      userId: currentUser.id,
      customerName,
      email,
      address,
      items,
      discount
    };

    if (isEdit) {
      dispatch(updateOrder(payload));
    } else {
      dispatch(addOrder(payload));
    }
    close();
  };

  function formsubmit(e) {
    e.preventDefault()
    saveData();
  }


  const totalQty = items.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const subtotal = items.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const discountAmount = (subtotal * (discount || 0)) / 100;
  const finalTotal = subtotal - discountAmount;

  return (
    <div className="d-flex justify-content-center align-items-center">

      <Modal show onHide={close} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Order" : "Add Order"}</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={formsubmit}
          className="">
          <Modal.Body className="p-4">

            <div className="d-flex gap-2 align-items-center">
              <h6>Name</h6>
              <input
                className="form-control mb-2"
                placeholder="Customer Name"
                value={customerName}
                required
                onChange={e => setCustomerName(e.target.value)}
              />
            </div>

            <div className="d-flex gap-2 align-items-center">
              <h6>Email</h6>
              <input
                className="form-control mb-2"
                placeholder="Email"
                type="email"
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
              />
            </div>


            <h6 className="mt-3">Address</h6>
            <input
              className="form-control mb-2"
              placeholder="City"
              value={address.city}
              type="text"
              required
              onChange={e => updateAddress("city", e.target.value)}
            />
            <input
              className="form-control mb-2"
              placeholder="State"
              value={address.state}
              type="text"
              required
              onChange={e => updateAddress("state", e.target.value)}
            />

            <input
              className="form-control mb-2"
              placeholder="Pincode"
              value={address.pincode}
              type="number"
              required
              onChange={e => updateAddress("pincode", e.target.value)}
            />

            <input
              className="form-control mb-2"
              placeholder="Landmark"
              value={address.landmark}
              type="text"
              required
              onChange={e => updateAddress("landmark", e.target.value)}
            />




            <h6>Products</h6>
            {items.map((item, i) => (
              <div className="row mb-2" key={i}>
                <div className="col">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Product"
                    value={item.productName}
                    onChange={e => updateItem(i, "productName", e.target.value)}
                  />

                </div>

                <div className="col">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={e => updateItem(i, "quantity", Number(e.target.value))}
                  />
                </div>

                <div className="col">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    onChange={e => updateItem(i, "price", Number(e.target.value))}
                  />
                </div>


              </div>
            ))}

            <button
              type="button"
              className="btn btn-sm btn-secondary" onClick={addMoreProduct}>
              + Add More
            </button>

            <h6 className="mt-3">Discount</h6>

            <input
              className="form-control"
              type="number"
              placeholder=" %"
              onChange={e => setDiscount(Number(e.target.value))}
            />

            <hr />

            <h6 className="fw-bold mt-3">Order Summary</h6>

            <div className="d-flex justify-content-between">
              <span>Total Quantity</span>
              <span>{totalQty}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between text-success">
              <span>Discount ({discount || 0}%)</span>
              <span>- ₹{discountAmount.toFixed(2)}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total Payable</span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>






          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={close}>Cancel</Button>


            <button className="btn btn-primary"
              variant="primary"
              type="submit"

            >
              {isEdit ? "Update" : "Add"}
            </button>

          </Modal.Footer>
        </form>

      </Modal>

    </div>

  );
};

export default EditOrderModal;
