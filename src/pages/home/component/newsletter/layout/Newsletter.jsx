

const Newsletter = () => {
    return (
        <div className="md:my-12">
            <div className="max-h-96 bg-[url('/newsletter.svg')] rounded-lg bg-no-repeat bg-center">

                <div className='flex flex-col md:flex-row justify-between items-center py-32 gap-10 md:mx-16 lg:mx-60'>
                <div className='text-white text-4xl font-semibold '>
                    <h2>Subcribe to our <br /> newsletter</h2>
                </div>
                
                <div>
                <div className="join">
        <input type="email" placeholder="Enter your email" className="input input-bordered join-item" /> 
        <button className="btn bg-[#6F42C1] text-white join-item">Subscribe</button>
      </div>
                </div>
                </div>

            </div>
        </div>
    );
};

export default Newsletter;