import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useVerifyEnrollMutation } from '../../redux/api/payment/paymentApi';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [message, setMessage] = useState('Processing payment...');
  const [verifyEnroll] = useVerifyEnrollMutation();

  useEffect(() => {
    if (!sessionId) {
      setMessage('No session ID found.');
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await verifyEnroll({sessionId});
        setMessage(res.message || "Payment successful.");
      } catch (error) {
        setMessage(error?.data?.message || "Payment verification failed.");
        console.error(error);
      }
    };

    verifyPayment();
  }, [sessionId, verifyEnroll]);

  return <div>{message}</div>;
};

export default PaymentSuccess;
