import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import { useAuthContext } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, DocumentData, getDocs, query, QueryDocumentSnapshot, where } from 'firebase/firestore';

type PriceType = {
    priceId: string | null;
    priceData: DocumentData | null;
}

type ProductType = {
    productData: DocumentData | null;
    priceData: PriceType[];
}

const DefaultProduct: ProductType = {
    productData: null,
    priceData: [{priceId: null, priceData: null}]
}

const Profile: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<ProductType[]>([]);
    const { user, logOut } = useAuthContext();

    useEffect(() => {
        const productRef = collection(db, "products");
        const q = query(productRef, where("active", "==", true));

        getDocs(q).then((querySnapshot) => {
            let products: ProductType[] = [];
            let index = 0;
            querySnapshot.forEach(productDoc => {
                let productData = productDoc.data();
                let priceData: PriceType[] = [];

                const pricesRef = collection(productDoc.ref, "prices")

                getDocs(pricesRef).then(priceSnapshot => {
                    priceSnapshot.docs.forEach(price => {
                        priceData.push({
                            priceId: price.id,
                            priceData: price.data(),
                        });
                    });
                }).then(() => setSubscriptions(prevSubscriptions => [...prevSubscriptions, {productData, priceData}]));

                index++;
            });
        });
        
    }, [])
    
    console.log(subscriptions)

    useEffect(() => {
        if (!user)
            Router.push('/');
    }, [user])

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
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
                    <div className='col-span-5 mx-4'>
                        <p className='text-xl font-semibold pb-1 border-b-2 border-[#202020]'>Subscription Plans</p>
                        <p className='text-[#aaaaaa] py-2'>Renewal date: (dd/mm/yyyy)</p>

                        

                        <button className='w-full py-2 mt-8 rounded bg-[#e50914]' onClick={logOut}>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile