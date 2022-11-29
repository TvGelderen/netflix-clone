import React, { useState, useEffect } from 'react'
import { db } from '../firebase';
import { addDoc, collection, doc, DocumentData, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { useAuthContext } from '../context/AuthContext';
import { loadStripe } from '@stripe/stripe-js'

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

const Plans: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<ProductType[]>([]);
    const [currentSubscription, setCurrentSubscription] = useState<SubscriptionType>();
    
    const { user } = useAuthContext();

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
    )
}

export default Plans