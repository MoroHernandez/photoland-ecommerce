import { useParams } from 'react-router-dom';

import useFetch from '../hooks/useFetch';

import RelatedProducts from '../components/RelatedProducts';

import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
	const { id } = useParams();

	const { data } = useFetch(`/products?populate=*&filters[id][$eq]=${id}`);

	if (!data) {
		return <div className='container mx-auto'>loading...</div>;
	}

	return (
		<div className='mb-16 pt-44 lg:pt-[30px] xl:pt-0'>
			<section className='container mx-auto'>
				<div className='flex flex-col lg:flex-row gap-[30px] mb-[30px]'>
					<div
						className='flex-1 lg:max-w-[40%] lg:h-[540px] grad rounded-lg
					flex justify-center items-center'
					>
						<img
							src={`http://localhost:1337${data[0].attributes.image.data.attributes.url}`}
							alt={data[0].attributes.title}
							className='w-full max-w-[65%]'
						/>
					</div>
					<div
						className='flex-1 bg-primary p-12 xl:p-20 rounded-lg flex flex-col
					justify-center'
					>
						<div className='uppercase text-accent text-lg font-medium mb-2'>
							{data[0].attributes.categories.data[0].attributes.title} cameras
						</div>
						<h2 className='h2 mb-4'>{data[0].attributes.title}</h2>
						<p>{data[0].attributes.description}</p>
						<div>
							<div>${data[0].attributes.price}</div>
						</div>
						<button className='btn btn-accent'>Add to cart</button>
					</div>
					<RelatedProducts />
				</div>
			</section>
		</div>
	);
};

export default ProductDetails;
