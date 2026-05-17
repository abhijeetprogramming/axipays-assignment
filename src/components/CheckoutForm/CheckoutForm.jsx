import { useState } from "react";

import "./CheckoutForm.css";

import luhnCheck from "../../utils/luhnCheck";

import generateHash from "../../utils/generateHash";

import { initiatePayment } from "../../api/paymentApi";

import StatusModal from "../Modal/StatusModal";

import Navbar from "../Navbar/Navbar";

function CheckoutForm() {
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState("");

  const [paymentMessage, setPaymentMessage] = useState("");

  const [formData, setFormData] = useState({
    card_holder_name: "",

    email: "",

    card_number: "",

    expiry_month: "",

    expiry_year: "",

    cvv: "",

    amount: "",

    currency: "USD",

    country: "",

    address: "",

    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const handleCardChange = (e) => {
    setFormData({
      ...formData,

      card_number: formatCardNumber(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanCard = formData.card_number.replace(/\s/g, "");

    if (!luhnCheck(cleanCard)) {
      setPaymentStatus("failed");

      setPaymentMessage("Invalid Card Number");

      setShowModal(true);

      return;
    }

    const month = Number(formData.expiry_month);

    if (month < 1 || month > 12) {
      setPaymentStatus("failed");

      setPaymentMessage("Expiry month must be between 1 and 12");

      setShowModal(true);

      return;
    }

    try {
      setLoading(true);

      const hash = generateHash(cleanCard, formData.email);

      const payload = {
        orderId: "ORD-" + Date.now(),

        cardHolderName: formData.card_holder_name,

        email: formData.email,

        cardNumber: cleanCard,

        expiryMonth: formData.expiry_month,

        expiryYear: formData.expiry_year,

        cardCVC: formData.cvv,

        amount: Number(formData.amount),

        currency: formData.currency,

        country: formData.country,

        address: formData.address,

        phone: formData.phone,
      };

      const response = await initiatePayment(payload, hash);

      if (response.redirect_url) {
        const finalResponse = await fetch(response.redirect_url);

        const finalData = await finalResponse.json();

        setPaymentStatus(finalData.status);

        setPaymentMessage(finalData.message);

        setShowModal(true);
      }
    } catch (error) {
      setPaymentStatus("failed");

      setPaymentMessage(error.response?.data?.message || "Payment Failed");

      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="checkout-container">
        <div className="checkout-content">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>AXIPAYS Secure Checkout</h2>

            <input
              type="text"
              name="card_holder_name"
              placeholder="Card Holder Name"
              value={formData.card_holder_name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="card_number"
              placeholder="Card Number"
              maxLength="23"
              value={formData.card_number}
              onChange={handleCardChange}
              required
            />

            <div className="row">
              <input
                type="text"
                name="expiry_month"
                placeholder="MM"
                maxLength="2"
                value={formData.expiry_month}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  if (
                    value === "" ||
                    (Number(value) >= 1 && Number(value) <= 12)
                  ) {
                    setFormData({
                      ...formData,

                      expiry_month: value,
                    });
                  }
                }}
                required
              />

              <input
                type="text"
                name="expiry_year"
                placeholder="YYYY"
                maxLength="4"
                value={formData.expiry_year}
                onChange={(e) =>
                  setFormData({
                    ...formData,

                    expiry_year: e.target.value.replace(/\D/g, ""),
                  })
                }
                required
              />

              <input
                type="password"
                name="cvv"
                placeholder="CVV"
                maxLength="3"
                value={formData.cvv}
                onChange={(e) =>
                  setFormData({
                    ...formData,

                    cvv: e.target.value.replace(/\D/g, ""),
                  })
                }
                required
              />
            </div>

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
            >
              <option value="USD">USD</option>

              <option value="EUR">EUR</option>

              <option value="GBP">GBP</option>
            </select>

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
            />

            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,

                  phone: e.target.value.replace(/\D/g, ""),
                })
              }
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>

        <StatusModal
          isOpen={showModal}
          status={paymentStatus}
          message={paymentMessage}
          onClose={() => setShowModal(false)}
        />
      </div>
    </>
  );
}

export default CheckoutForm;
