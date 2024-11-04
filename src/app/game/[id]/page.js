"use client";

import { useParams } from 'next/navigation';
import { useGetGameByIdQuery } from '../../../components/reduxToolkit/features/apiSlice';
import Loading from '@/components/common/Loading';
import ErrorMessage from '@/components/common/ErrorMessage';

const GameDetails = () => {
    const params = useParams();
    const { id } = params;

    // Fetch the game details using the ID
    const { data, error, isLoading } = useGetGameByIdQuery(id);

    // Handle loading state
    if (isLoading) return <Loading/>;

    // Handle error state
    if (error) return <ErrorMessage message="Error loading game details. Please try again later." />;

    // Ensure we have valid data
    if (!data || !data.info) {
        return <p className="text-center">No game information found.</p>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">{data.info.title}</h1>
            <img src={data.info.thumb} alt={data.info.title} className="w-full h-64 object-cover rounded-md my-4" />

            <h2 className="text-lg font-semibold mt-6">Price Information:</h2>
            <p className="text-lg">Normal Price: ${data.deals[0]?.retailPrice || 'N/A'}</p>
            <p className="text-lg">Cheapest Price Ever: ${data.cheapestPriceEver?.price || 'N/A'}</p>

            <h2 className="text-lg font-semibold mt-4">Available Deals:</h2>
            <ul className="list-disc list-inside">
                {data.deals.map(deal => (
                    <li key={deal.dealID}>
                        <span className="font-medium">Store ID: {deal.storeID}</span> - 
                        <span className="text-green-500"> Sale Price: ${deal.price}</span> 
                        <span className="text-gray-500"> (Savings: {deal.savings}%)</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameDetails;
