import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { db } from '../firebase';
import { addDoc, collection, doc, DocumentData, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { useAuthContext } from '../context/AuthContext';
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/router';

type PriceType = {
    priceId: string;
    priceData: DocumentData;
}

type ProductType = {
    productId: string;
    productData: DocumentData;
    priceData: PriceType[];
}

type SubscriptionType = {
    role: string;
    current_period_end: any
}

const Profile: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<ProductType[]>([]);
    const [currentSubscription, setCurrentSubscription] = useState<SubscriptionType>();
    
    const { user, logOut } = useAuthContext();
    const router = useRouter();

    const asPrice = (amount: string) => {
        const str = amount.toString();

        return str.substring(0, str.length - 2) + '.' + str.substring(str.length - 2, str.length);
    }

    const handleCheckout = async (product: string, priceId: string) => {
        const userId = user?.uid ? user.uid : '';

        const customerRef = doc(db, "customers", userId);
        const checkoutRef = collection(customerRef, "checkout_sessions");
        const checkoutData = {
            product: product,
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        };

        const ref = await addDoc(checkoutRef, checkoutData);
        
        onSnapshot(ref, async (snapshot) => {
            const { error, sessionId } = snapshot.data() || { error: '', sessionId: '' };
            console.log(sessionId)

            if (error)
                alert(`An error occured: ${error}`);

            if (sessionId)
            {
                const stripe = await loadStripe("pk_test_51M9OUNFksst1XH2JboDL5HW7wLCOUYvqLdlsoIsQjiF2ZOdWXoJxRqaI0GFimbR6lbLw1GzhPFyLlRgBM4ls6pxv00VFgHBX4o");

                stripe?.redirectToCheckout({ sessionId });
            }
        })
    }

    // Get current subscription
    useEffect(() => {
        if (user !== null)
        {
            const userId = user?.uid ? user.uid : '';
        
            const customerRef = doc(db, "customers", userId);
            const subscriptionRef = collection(customerRef, "subscriptions");


            getDocs(subscriptionRef)
                .then(subscriptionSnapshot => {
                    subscriptionSnapshot.forEach(async (subscription) => {
                        setCurrentSubscription({
                            role: subscription.data().role,
                            current_period_end: subscription.data().current_period_end.seconds,
                        });
                    });
                });
        }
        else
            router.push('/');
    }, [user]);

    // Get subscription plans
    useEffect(() => {
        const productRef = collection(db, "products");
        const activeProductQuery = query(productRef, where("active", "==", true));

        const unsubscribe = onSnapshot(activeProductQuery,  { includeMetadataChanges: false }, (querySnapshot) => {
            setSubscriptions([])
            
            querySnapshot.forEach((productDoc) => {
                let productId = productDoc.id
                let productData = productDoc.data();
                let priceData: PriceType[] = [];
                
                const pricesRef = collection(productDoc.ref, "prices");
                getDocs(pricesRef)
                    .then(priceSnapshot => {
                        priceSnapshot.docs.forEach(price => {
                            priceData.push({
                                priceId: price.id,
                                priceData: price.data()
                            });
                        });
                    })
                    .then(() => {
                        setSubscriptions(oldArray => [...oldArray, {productId, productData, priceData}])
                    })
                    .catch(error => console.error(error));
            }, function (error: any) {
                console.error(error)
            });
        });

        return () => unsubscribe();
    }, []);
    
    const sortedSubscriptions = subscriptions.sort((a, b) => a.priceData[0]?.priceData.unit_amount - b.priceData[0]?.priceData.unit_amount);

    return (
        <div className="w-full min-h-screen flex justify-center py-[90px]">
            <div className='w-[95%] max-w-[700px] m-auto'>
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-semibold text-left pb-2 border-b-2 border-[#202020]'>Edit Profile</h1>
                <div className='grid grid-cols-6 py-4 px-2'>
                    <div className='col-span-1'>
                        <Image 
                          src='/netflix-avatar.png'
                          alt='avatar'
                          width={80}
                          height={80}
                          className=''
                        />
                    </div>
                    <div className='col-span-5'>
                        <p className='text-2xl font-semibold pb-1 border-b-2 border-[#202020]'>Subscription Plans</p>
                        {currentSubscription && <p className='text-[#aaaaaa] py-2'>Renewal date: {(new Date(currentSubscription.current_period_end * 1000)).toLocaleDateString()}</p>}

                        <div>
                            {sortedSubscriptions.map((subscription, index) => {
                                const isCurrentSubscription = subscription.productData.name.toLowerCase().includes(currentSubscription?.role);

                                return (
                                    <div key={index} className='flex justify-between items-center mt-8 last:mb-12'>
                                        <div>
                                            <p className='text-xl font-semibold'>{subscription.productData?.name}</p>
                                            <p className='text-sm w-[70%]'>{subscription.productData?.description}</p>
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            <p className='pr-4 text-lg font-semibold'>€{asPrice(subscription.priceData[0].priceData?.unit_amount)}</p>
                                            <button
                                            className={`w-[180px] py-2 font-semibold rounded ${isCurrentSubscription ? 'bg-[#6a6a6a] cursor-not-allowed' : 'bg-[#e50914]'}`}
                                            onClick={() => handleCheckout(subscription.productData?.name, subscription.priceData[0].priceId)}
                                            >
                                                {isCurrentSubscription ? "Current subscription" : "Subscribe"}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            )}
                        </div>

                        <button className='w-full py-2 mt-8 text-lg font-semibold rounded bg-[#e50914]' onClick={logOut}>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile