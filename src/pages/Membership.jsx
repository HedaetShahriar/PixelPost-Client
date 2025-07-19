// Pages/Membership/Membership.jsx
// import CheckoutForm from './CheckoutForm';
import { ShieldCheck } from 'lucide-react';
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Membership = () => {
    return (
        <div className="bg-base-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold sm:text-4xl">
                        Unlock Your Full Potential
                    </h2>
                    <p className="mt-4 text-lg">
                        Become a Gold Member and enjoy exclusive benefits.
                    </p>
                </div>

                <div className="mt-10 bg-base-200 rounded-2xl shadow-lg overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
                    <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-10 lg:p-16">
                        <div className="lg:self-center">
                            <h3 className="text-2xl font-boldsm:text-3xl">
                                Gold Membership
                            </h3>
                            <p className="mt-4 text-lg">
                                Supercharge your forum experience with features designed for power users.
                            </p>
                            <div className="mt-8 space-y-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <ShieldCheck className="h-6 w-6 text-green-500" />
                                    </div>
                                    <p className="ml-3 text-base">
                                        <span className="font-bold">Gold Badge</span> on your profile to showcase your status.
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <ShieldCheck className="h-6 w-6 text-green-500" />
                                    </div>
                                    <p className="ml-3 text-base ">
                                        <span className="font-bold">Unlimited Posts</span> - Share your thoughts without any limits.
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <ShieldCheck className="h-6 w-6 text-green-500" />
                                    </div>
                                    <p className="ml-3 text-base">
                                        Priority support from our team.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative bg-base-300 pt-12 pb-12 px-6 sm:px-10 lg:p-16">
                        <div className="text-center mb-8">
                            <h4 className="text-lg leading-6 font-medium">One-time payment</h4>
                            <p className="mt-2 text-5xl font-extrabold">
                                $10
                                <span className="text-xl font-medium">/lifetime</span>
                            </p>
                        </div>
                        {/* <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Membership;
