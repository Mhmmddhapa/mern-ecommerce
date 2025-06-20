import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {orderDetails, loading, error} = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if(loading) return <p>Sedang Memuat ...</p>
  if(error) return <p>Error: {error}</p>

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Detail Belanjaan Kamu!
      </h2>

      {!orderDetails ? (
        <p>Kosong... Belum belanja ya?</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          {/* Info Pesanan */}
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Nomer Pesanan: #{orderDetails._id}
              </h3>
              <p className="text-gray-600">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  orderDetails.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isPaid ? "Pesanan Di Setujui" : "Sedang Proses"}
              </span>
              <span
                className={`${
                  orderDetails.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isDelivered
                  ? "Pesanan Kamu Udah Sampai di Tujuan"
                  : "Pengiriman Segera Dilakukan"}
              </span>
            </div>
          </div>

          {/* Informasi Pembayaran */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-2">Informasi Pembayaran</h4>
            <p>Metode Pembayaran: {orderDetails.paymentMethod}</p>
            <p>
              Status:{" "}
              {orderDetails.isPaid
                ? "Pembayaran Kamu Sudah Kami Terima"
                : "Yuk Selesaikan Pembayarannya Dulu"}
            </p>
          </div>

          {/* Informasi Pengiriman */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-2">Informasi Pengiriman</h4>
            <p>Metode Pengiriman: {orderDetails.shippingMethod}</p>
            <p>
              Alamat:
              <br />
              {orderDetails.shippingAddress.kelurahan},{" "}
              {orderDetails.shippingAddress.kecamatan}
              <br />
              RT {orderDetails.shippingAddress.rt} / RW{" "}
              {orderDetails.shippingAddress.rw}
              <br />
              {orderDetails.shippingAddress.kota}
            </p>
          </div>

          {/* Produk list */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Barang</h4>
            <table className="min-w-full text-gray-600 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left">Nama</th>
                  <th className="py-2 px-4 text-center">Harga Satuan</th>
                  <th className="py-2 px-4 text-center">Jumlah Barang</th>
                  <th className="py-2 px-4 text-center">Jumlah Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId} className="border-b">
                    <td className="py-2 px-4">
                      <div className="flex items-center space-x-4 min-h-[56px]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-blue-500 hover:underline"
                        >
                          {item.name}
                        </Link>
                      </div>
                    </td>
                    <td className="py-2 px-4 text-center align-middle">
                      Rp {item.price.toLocaleString("id-ID")}
                    </td>
                    <td className="py-2 px-4 text-center align-middle">
                      {item.quantity}
                    </td>
                    <td className="py-2 px-4 text-center align-middle">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Back To order link */}
          <Link to="/my-orders" className="text-blue-500 hover:underline">
            Balik Lagi ke Daftar Belanjaan Kamu!
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
