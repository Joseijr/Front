interface FiltersSectionProps {
    filters: string[];
}

function FiltersSection({ filters }: FiltersSectionProps) {
    return (
        <section className="flex justify-between items-center mt-10">
            <div>
                <h2 className="text-3xl font-bold text-white">
                    Objetos Recientes
                </h2>

                <p className="text-gray-400 mt-2">
                    Explora los últimos reportes en tu comunidad.
                </p>

                <div className="flex gap-2 mt-4">
                    <button className="mt-4 px-4 py-1 bg-zinc-700 text-white rounded-full font-medium hover:bg-red-600 transition">
                        Encontrados
                    </button>
                    <button className="mt-4 px-4 py-1 bg-zinc-700 text-white rounded-full font-medium hover:bg-red-600 transition">
                        Perdidos
                    </button>
                </div>
                <div className="flex gap-2 mt-4">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            className="px-4 py-1 rounded-full bg-zinc-700 text-sm text-white hover:bg-red-500 "
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

    
        </section>
    );
}

export default FiltersSection;