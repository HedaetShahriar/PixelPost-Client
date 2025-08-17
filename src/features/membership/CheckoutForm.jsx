import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get Stripe client secret
  const { data: clientSecret, isLoading: isClientSecretLoading, isError } = useQuery({
    queryKey: ['stripe-payment-intent', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.post(`/create-payment-intent?email=${user.email}`);
      return res.data.clientSecret;
    },
    enabled: !!user?.email,
  });

  // Get membership data
  const { data: membershipData, isLoading: isMembershipLoading } = useQuery({
    queryKey: ['membership-data', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/membership?email=${encodeURIComponent(user.email)}`);
      return res.data; // e.g. { membership: 'gold', last_payment: '...' }
    },
    enabled: !!user?.email,
  });

  const isMembershipActive = membershipData?.membership === 'gold';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!user?.email) {
      Swal.fire('Error', 'You must be logged in to make a payment.', 'error');
      return;
    }

    setIsSubmitting(true);

    if (!stripe || !elements || !clientSecret) {
      setMessage('Payment initialization failed.');
      setIsSubmitting(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setMessage('Card input is not ready.');
      setIsSubmitting(false);
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (result.error) {
      setMessage(result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      setMessage('✅ Payment successful!');
      Swal.fire(
        'Success',
        'Your payment was successful! You are now a Gold member.',
        'success'
      );
    }

    setIsSubmitting(false);
  };

  // CardElement options
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        fontSize: '16px',
        fontFamily: 'inherit',
        '::placeholder': { color: '#a0aec0' },
      },
      invalid: { color: '#e53e3e' },
    },
    hidePostalCode: true,
    disabled: isMembershipActive, // ✅ disable input from Stripe itself
  };

  return (
    <>
      {isMembershipActive && (
        <div className="mb-4 text-sm text-green-600 font-semibold">
          ✅ You are already a Gold member!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="text-sm font-medium block">
          Card Details
          <div
            className={`mt-2 bg-base-100 px-3 py-2 rounded-md shadow-sm border border-base-300 ${isMembershipActive ? 'pointer-events-none opacity-50' : 'focus-within:ring-2 focus-within:ring-green-500'
              }`}
          >
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </label>

        <button
          type="submit"
          disabled={
            !stripe || !user || isSubmitting || isClientSecretLoading || isMembershipActive
          }
          className="w-full flex justify-center items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 transition disabled:opacity-50"
        >
          {(isSubmitting || isClientSecretLoading) ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              {isClientSecretLoading ? 'Loading...' : 'Processing...'}
            </>
          ) : (
            isMembershipActive ? 'Upgraded' : 'Pay $10'
          )}
        </button>
        {/* <button
          type="button"
          disabled={!stripe || isSubmitting || isClientSecretLoading || isMembershipActive}
          onClick={handleTestPayment}
          className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting || isClientSecretLoading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              {isClientSecretLoading ? 'Loading...' : 'Processing...'}
            </>
          ) : 'Use Test Card'}
        </button> */}

        {message && (
          <div
            className={`text-sm font-medium ${message.includes('successful') ? 'text-green-400' : 'text-red-400'
              }`}
          >
            {message}
          </div>
        )}

        {isError && (
          <p className="text-sm text-red-400">⚠️ Failed to load payment info.</p>
        )}
      </form>
    </>
  );
}
export default CheckoutForm;
