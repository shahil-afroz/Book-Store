import { useState } from "react"
import { AiFillDelete } from "react-icons/ai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader/Loader";
import StripeCheckout from "react-stripe-checkout"



export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  //for payment
  const makePayment = async (token) => {
  try {
    const body = {
      token,
      cart,
      totalAmount: Total
    };

    const response = await fetch(`http://localhost:8081/api/v1/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (response.ok) {
      // Payment successful
      alert("Payment Successful!");
      // Place order after successful payment
      await placeOrder();
    } else {
      // Payment failed
      alert("Payment Failed: " + data.message);
    }
  } catch (error) {
    console.error("Payment Error:", error);
    alert("Payment Error. Please try again.");
  }
};
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8081/api/v1/get-cart-books", { headers }
      );
      setCart(response.data.data);
    }
    fetch();
  }
    , [cart])
  const deleteItems = async (bookid) => {
    const response = await axios.delete(
      `http://localhost:8081/api/v1/delete-book-from-cart/${bookid}`,

      { headers }
    );
  }

  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      cart.map((items) => {
        total += items.price;
      })
      setTotal(total);
      total = 0;
    }
  }, [cart]);

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/place-order",
        { order: cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/Profile/OrderHistory")

    } catch (error) {

      console.error(error);
    }
  }
  return (
    <div className="px-12  font-custom h-screen py-8">
      {
        !cart && (<div className="flex flex-col justify-center h-screen text-5xl w-full items-center"><Loader /></div>)
      }
      {
        cart && cart.length === 0 && (
          <div className="h-screen">
            <div className="h-[100%] flex flex-col items-center justify-center">
              <h1 className="text-5xl font-semibold text-zinc-700" >Empty Cart</h1>
            </div>
          </div>
        )
      }
      {
        cart && cart.length > 0 && (
          <>
            <h1 className="text-5xl font-semibold text-black mb-8">Your Cart</h1>
            {cart.map((items, i) => (
              <div
                className="w-full my-4 rounded flex h-[20%] flex-row bg-yellow-500 justify-between items-center"
                key={i}>
                <img src={items.url} alt="/fd" className="h-[20vh] object-cover" />
                <div className="w-full">
                  <h1 className="text-2xl text-black font-medium text-start mt-2 ">{items.title}</h1>
                  <p className="text-black mt-2 hidden">
                    {items.description.slice(0, 100)}...
                  </p>
                  <p className="text-black mt-2 hidden ">
                    {items.description.slice(0, 65)}...
                  </p>
                  <p className="text-black mt-2 block">
                    {items.description.slice(0, 100)}...
                  </p>
                </div>
                <div className="flex mt-4 w-full items-center justify-between"></div>
                <h2 className="text-black text-3xl font-medium flex mr-4">${items.price}</h2>
                <button className="bg-red-100 text-red-700 border-red-700 border rounded p-2  mr-7" onClick={() => deleteItems(items._id)}><AiFillDelete /></button>
              </div>
            ))}
          </>
        )
      }
      {
        cart && cart.length > 0 && (
          <div className="mt-4 w-full flex items-center justify-end">

            <div className="p-4 bg-yellow-700 rounded">
              <h1 className="text-3xl text-zinc-300 font-semibold">Total Amount</h1>
              <div className="mt-3 flex items-center justify-between text-xl text-zinc-300 gap-3 ">
                <h2 >{cart.length} books</h2> <h2>${Total}</h2>
              </div>
              <div className="w-[100%] mt-3">
                <StripeCheckout
                  stripeKey={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
                  token={makePayment}
                  name="Buy"
                  amount={Total * 100}
                >
                  <button
                    className="bg-zinc-300 rounded w-full py-2 px-4 flex justify-center font-semibold hover:bg-zinc-500"

                  >
                    Place Your Order
                  </button>
                </StripeCheckout>
              </div>

            </div>
          </div>
        )
      }
    </div>

  )
}