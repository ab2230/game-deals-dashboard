"use client"; // Enable client-side rendering

import { useEffect, useState } from 'react';
import { useGetDealsQuery } from './reduxToolkit/features/apiSlice';
import Loading from './common/Loading';
import ErrorMessage from './common/ErrorMessage';
import SortDropdown from './common/SortDropDown';
import DealCard from './common/DealCard';
import PaginationControls from './common/PaginationControl';

const DealsList = () => {
    const { data, error, isLoading } = useGetDealsQuery();
    const [sortBy, setSortBy] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const dealsPerPage = 12;

    // Custom debounce implementation
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 300); // 300ms delay

        return () => {
            clearTimeout(handler); // Clear timeout if searchTerm changes before the delay completes
        };
    }, [searchTerm]);

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage message="Error loading deals. Please try again later." />;

    // Sorting and pagination
    const sortDeals = (deals) => {
        return [...deals].sort((a, b) => {
            if (sortBy === 'price') return parseFloat(a.salePrice) - parseFloat(b.salePrice);
            if (sortBy === 'savings') return parseFloat(b.savings) - parseFloat(a.savings);
            return 0;
        });
    };

    const filteredDeals = data.filter(deal =>
        deal.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    const bestDeals = sortDeals(filteredDeals.filter((deal) => deal.isOnSale === '1')).slice(0, 5);
    const sortedDeals = sortDeals(filteredDeals);
    const indexOfLastDeal = currentPage * dealsPerPage;
    const indexOfFirstDeal = indexOfLastDeal - dealsPerPage;
    const currentDeals = sortedDeals.slice(indexOfFirstDeal, indexOfLastDeal);
    const totalPages = Math.ceil(sortedDeals.length / dealsPerPage);

    return (
        <div className="flex flex-col md:flex-row">
            {/* Best Deals Section */}
            <div className="w-full md:w-1/4 p-4">
                <h2 className="text-lg font-bold mb-2">Best Deals</h2>
                <div className="grid gap-2">
                    {bestDeals.map((deal) => <DealCard key={deal.dealID} deal={deal} />)}
                </div>
            </div>

            {/* Main Deals Section */}
            <div className="w-full md:w-3/4 p-4">
                <input
                    type="text"
                    placeholder="Search for games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full text-black mb-4"
                />
                <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />

                {/* Paginated Deals List */}
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {currentDeals.map((deal) => <DealCard key={deal.dealID} deal={deal} />)}
                </div>

                <PaginationControls totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
};

export default DealsList;
