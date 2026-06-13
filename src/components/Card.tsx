interface CardProps {
    imageName: string;
    status: string;
    name: string;
    location: string;
    date: string;
}

function Card(props: CardProps) {
    return (
        <div className="w-72 bg-zinc-900 rounded-2xl overflow-hidden shadow-lg border border-zinc-800 hover:scale-105 transition-transform">       
            <div className="relative">
                <img
                    src="https://fastly.picsum.photos/id/677/1920/1080.jpg?hmac=Lte2-R4x1WPOMziMp-aMJgWU-KhXb-jTaEghalbeCJQ"
                    alt={props.name}
                    className="w-full h-52 object-cover"
                />

             
                <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    {props.status}
                </span>
            </div>

           
            <div className="p-5 text-white">
                <h2 className="text-2xl font-semibold mb-2">
                    
                </h2>

                <h2 className="text-gray-100 flex items-center gap-1 text-2xl ">
                     {props.name}
                </h2>
                <p className="text-gray-400 flex items-center gap-1 mb-6">
                     {props.location}
                </p>

                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                        {props.date}
                    </span>

                    <button className="font-semibold hover:text-blue-400 transition">
                        Ver detalles
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;