import React, { useState, useEffect } from 'react'
import { db } from '../firebase';
import { collection, DocumentData, getDocs, onSnapshot, query, QueryDocumentSnapshot, where } from 'firebase/firestore';

type PriceType = {
    priceId: string | null;
    priceData: DocumentData | null;
}

type ProductType = {
    productData: DocumentData | null;
    priceData: PriceType[];
}

const Plans: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<ProductType[]>([])
    //let subscriptions: ProductType[] = [];

    const handleDuplicates = () => {
        const newArray = subscriptions.filter((item, index) => {
            console.log(index, ": ", item.productData?.name)
            console.log(subscriptions.findIndex(item2 => item2.productData?.name === item.productData?.name) === index)

            return subscriptions.findIndex(item2 => item2.productData?.name === item.productData?.name) === index
        })

        setSubscriptions(newArray)
    }

    useEffect(() => {
        const productRef = collection(db, "products");
        const activeProductQuery = query(productRef, where("active", "==", true));

        onSnapshot(activeProductQuery,  { includeMetadataChanges: false }, (querySnapshot) => {
            console.log("Start onSnapshot")
            setSubscriptions([])
            
            querySnapshot.forEach((productDoc) => {
                let productData = productDoc.data();
                let priceData: PriceType[] = [];

                console.log('forEach')
                
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
                        setSubscriptions(oldArray => [...oldArray, {productData, priceData}])
                    });
            });
        })

        handleDuplicates();
    }, [])

    return (
        <div>
            {subscriptions.map((subscription, index) => (
                <div key={index}>
                    {subscription.productData?.name}
                </div>
            ))}
        </div>
    )
}

export default Plans