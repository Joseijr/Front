interface FiltersSectionProps {
    filters: string[];
    selectedFilter: string | null;
    onSelectFilter: (filter: string | null) => void;
    selectedType: "Todos" | "Perdido" | "Encontrado";
    onSelectType: (type: "Todos" | "Perdido" | "Encontrado") => void;
}

function FiltersSection({ filters, selectedFilter, onSelectFilter, selectedType, onSelectType }: FiltersSectionProps) {
    const buttonClass = (active: boolean) =>
        `px-4 py-1 rounded-full text-sm font-medium transition ${active ? 'bg-red-500 text-white' : 'bg-zinc-700 text-white hover:bg-red-500'}`;

    return (
        <section className="flex justify-between items-center mt-10">
            <div>
                <h2 className="text-3xl font-bold text-white">
                    Objetos Recientes
                </h2>
                <p className="text-gray-400 mt-2">
                    Explora los últimos reportes en tu comunidad.
                </p>
                <div className="flex gap-2 mt-4 flex-wrap">
                    <button
                        type="button"
                        onClick={() => onSelectType("Todos")}
                        className={buttonClass(selectedType === "Todos")}
                    >
                        Todos
                    </button>
                    <button
                        type="button"
                        onClick={() => onSelectType("Encontrado")}
                        className={buttonClass(selectedType === "Encontrado")}
                    >
                        Encontrados
                    </button>
                    <button
                        type="button"
                        onClick={() => onSelectType("Perdido")}
                        className={buttonClass(selectedType === "Perdido")}
                    >
                        Perdidos
                    </button>
                </div>
                <div className="flex gap-2 mt-4 flex-wrap">
                    <button
                        type="button"
                        onClick={() => onSelectFilter(null)}
                        className={buttonClass(selectedFilter === null)}
                    >
                        Todos
                    </button>
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            onClick={() => onSelectFilter(filter)}
                            className={buttonClass(selectedFilter === filter)}
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