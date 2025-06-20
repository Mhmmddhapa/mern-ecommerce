import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {checkout} = useSelector((state) => state.checkout );

  // Clear the cart when the order is confirmed
  useEffect(() => {
    if(checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders")
    }
  }, [checkout, dispatch, navigate]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Terima kasih sudah belanja di toko kami!
      </h1>

      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20">
            {/* Nomor Pesanan dan Tanggal */}
            <div>
              <h2 className="text-xl font-semibold">
                Nomor Pesanan: {checkout._id}
              </h2>
              <p className="text-gray-500">
                Tanggal Pesanan:{" "}
                {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* Estimated Delivery */}
            <div>
              <p className="text-emerald-700 text-sm">
                Paket Bakal Nyampe Sekitar Tanggal...{" "}
                {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="mb-20">
            {checkout.checkoutItems.map((item) => (
              <div key={item.productId} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-md">
                    Rp.{item.price.toLocaleString("id-ID")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Jumlah Barang: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pembayaran dan Pengiriman Info */}
          <div className="grid grid-cols-2 gap-8">
            {/* Info Pembayaran */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Pembayaran</h4>
              <p className="text-gray-600">Gopay</p>
            </div>

            {/* Info Pengiriman */}
            <div className="border rounded-xl p-4 shadow-sm">
              <h4 className="text-lg font-semibold mb-2">Alamat Pengiriman</h4>
              <p className="text-gray-700 font-medium">
                {checkout.shippingAddress.recipient}
              </p>
              <p className="text-gray-600">
                {checkout.shippingAddress.address}
              </p>
              <p className="text-gray-600">
                {checkout.shippingAddress.kelurahan},{" "}
                {checkout.shippingAddress.kecamatan}
              </p>
              <p className="text-gray-600">{checkout.shippingAddress.city}</p>
              <p className="text-gray-600">
                RT {checkout.shippingAddress.rt} / RW{" "}
                {checkout.shippingAddress.rw}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
