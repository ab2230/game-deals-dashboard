
import Link from 'next/link';

const DealCard = ({ deal }) => (
    <Link href={`/game/${deal.gameID}`} passHref>
        <div className="p-4 bg-white rounded shadow-lg cursor-pointer">
            <img src={deal.thumb} alt={deal.title} className="w-full h-40 object-cover rounded-md" />
            <h3 className="mt-2 text-lg font-bold text-gray-900">{deal.title}</h3>
            <p className="text-gray-600">
                <span className="line-through">${deal.normalPrice}</span> ➔ <span className="text-green-600 font-semibold">${deal.salePrice}</span>
            </p>
            <p className="text-sm text-gray-500">Savings: {Math.round(deal.savings)}%</p>
            <p className="text-sm text-gray-500">Rating: {deal.steamRatingText} ({deal.steamRatingPercent}%)</p>
        </div>
    </Link>
);

export default DealCard;
