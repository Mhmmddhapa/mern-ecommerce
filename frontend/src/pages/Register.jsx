import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import register from "../assets/register.jpg";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get Redirect parameter and check if it's checkout or somthing
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">DhapaSync</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Halo, Sob!👋</h2>
          <p className="text-center mb-6">
            Masukkan nama, email dan password kamu buat daftar akun ya!
          </p>

          {/* NAMA */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Nama</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan nama kamu"
            />
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan alamat email kamu"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Katasandi
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Masukkan katasandi kamu"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-center mb-4">
              {typeof error === "string"
                ? error
                : error.message ||
                  "Wah, ada masalah waktu daftar tadi. Coba lagi ya!"}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Memproses..." : "Daftar Sekarang"}
          </button>

          <p className="mt-6 text-center text-sm">
            Sudah punya akun?{" "}
            <Link
              to={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-500"
            >
              Masuk di sini
            </Link>
          </p>
        </form>
      </div>

      {/* GAMBAR */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={register}
            alt="Ilustrasi masuk ke akun DhapaSync"
            className="h-[450px] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
