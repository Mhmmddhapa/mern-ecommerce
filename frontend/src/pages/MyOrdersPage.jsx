import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slices/orderSlice";

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) return <p>Sedang Memuat ...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">Pesanan Saya</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-sm text-gray-500 text-center">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Gambar</th>
              <th className="py-3 px-4">Nomor Pesanan</th>
              <th className="py-3 px-4">Tanggal Pembuatan</th>
              <th className="py-3 px-4">Alamat Pengiriman</th>
              <th className="py-3 px-4">Barang</th>
              <th className="py-3 px-4">Biaya</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b hover:bg-gray-50 text-center align-middle cursor-pointer"
                >
                  <td className="py-4 px-4 align-middle">
                    {order.ordersItems &&
                    order.ordersItems.length > 0 &&
                    order.ordersItems[0].image ? (
                      <img
                        src={order.ordersItems[0].image}
                        alt={order.ordersItems[0].name || "Produk"}
                        className="w-12 h-12 object-cover rounded-lg mx-auto"
                      />
                    ) : (
                      <span className="text-gray-400">Tidak ada gambar</span>
                    )}
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900 align-middle">
                    #{order._id}
                  </td>
                  <td className="py-4 px-4 align-middle">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-4 px-4 align-middle">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  <td className="py-4 px-4 align-middle">
                    {order.ordersItems ? order.ordersItems.length : 0}
                  </td>
                  <td className="py-4 px-4 align-middle whitespace-nowrap text-gray-900 font-semibold">
                    Rp.{" "}
                    {order.totalPrice ? order.totalPrice.toLocaleString() : "0"}
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        order.ispaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.ispaid ? "Sudah dibayar" : "Dalam proses"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500">
                  Pesananmu masih kosong, nih!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
