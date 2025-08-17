import { ShieldCheck } from 'lucide-react';
import CardElement from '../features/membership/CardElement';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const Membership = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className="bg-base-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold sm:text-4xl">
                        Unlock Your Full Potential
                    </h2>
                    <p className="mt-4 text-lg">
                        Become a Gold Member and enjoy exclusive benefits.
                    </p>
                </div>

                <div className="mt-10 bg-base-200 rounded-2xl shadow-lg overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
                    {/* Left: Membership Benefits */}
                    <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-10 lg:p-16 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold sm:text-3xl mb-4">
                            Gold Membership
                        </h3>
                        <p className="mb-8 text-lg">
                            Supercharge your forum experience with features designed for power users.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <ShieldCheck className="h-6 w-6 text-green-500 flex-shrink-0" />
                                <span className="ml-3 text-base">
                                    <span className="font-bold">Gold Badge</span> on your profile to showcase your status.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <ShieldCheck className="h-6 w-6 text-green-500 flex-shrink-0" />
                                <span className="ml-3 text-base">
                                    <span className="font-bold">Unlimited Posts</span> - Share your thoughts without any limits.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <ShieldCheck className="h-6 w-6 text-green-500 flex-shrink-0" />
                                <span className="ml-3 text-base">
                                    Priority support from our team.
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Right: Payment Section */}
                    <div className="relative bg-base-300 pt-12 pb-12 px-6 sm:px-10 lg:p-16 flex flex-col justify-center">
                        <div className="text-center mb-8">
                            <h4 className="text-lg leading-6 font-medium">One-time payment</h4>
                            <p className="mt-2 text-5xl font-extrabold">
                                $10
                                <span className="text-xl font-medium">/lifetime</span>
                            </p>

                            {/* Test Card Info */}
                            <div className="mt-4 p-4 bg-base-100 rounded-lg shadow-inner text-left">
                                <h5 className="font-semibold mb-2 text-green-600">Test Card Details</h5>
                                <div className="grid grid-cols-1  gap-2 text-sm">
                                    <div>
                                        <span className="font-medium">Card Number:</span> 4242 4242 4242 4242
                                    </div>
                                    <div>
                                        <span className="font-medium">Expiry:</span> 12/26
                                    </div>
                                    <div>
                                        <span className="font-medium">CVC:</span> 123
                                    </div>
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    Use this card in test mode to simulate payments.
                                </p>
                            </div>
                        </div>

                        {user ? (
                            <CardElement />
                        ) : (
                            <div className="flex justify-center items-center h-3/5">
                                <button
                                    onClick={() =>
                                        navigate('/auth/login', {
                                            state: { from: '/membership' },
                                            replace: true,
                                        })
                                    }
                                    className="btn btn-primary"
                                    type="button"
                                >
                                    Login to Upgrade
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Membership;
