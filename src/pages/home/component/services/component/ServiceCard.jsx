

const ServiceCard = ({service}) => {
	const {title,image,description} = service;

	

    return (
        <div className="flex justify-center">
            <div className="max-w-xs p-6 rounded-md shadow-lg">
	<img src={image} alt="" className="object-cover object-center w-full rounded-md h-72 bg-gray-500" />
	<div className="mt-6 mb-2">
		
		<h2 className="text-xl font-semibold tracking-wide">{title}</h2>
	</div>
	<p>{description}</p>
</div>
        </div>
    );
};

export default ServiceCard;