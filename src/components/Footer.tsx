function Footer() {
    return (
        <footer className="bg-red-500 text-white mt-full">
            <div className="max-w-7xl py-8">

                <div className="flex items-center gap-4">
                    <img
                        src="src/assets/Logo.svg"
                        alt="Lost & Post"
                        className="w-12 h-12 brightness-1000"
                    />

                    <div>
                        <h3 className="font-bold text-lg">
                            Lost & Post
                        </h3>

                        <p className="text-sm opacity-80">
                            Objects recovered, memories restored.
                        </p>
                    </div>
                </div>

            </div>

            <div className="border-t border-red-400">
                <div className="relative max-w-7xl mx-auto px-6 py-4 text-sm">

                    <p className="text-center">
                        © 2026 Lost & Post. All Rights Reserved.
                    </p>

                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-4">
                        <a title="Frontend Repository" href="https://github.com/Joseijr/Front" target="_blank" rel="noreferrer">
                            <img
                                src="https://cdn.simpleicons.org/github/white"
                                alt="Frontend Repository"
                                className="w-8 h-8 hover:scale-110 transition-transform"
                            />
                        </a>

                        <a title="Backend Repository" href="https://github.com/HugoUgalde/ProyectoInt2" target="_blank" rel="noreferrer">
                            <img
                                src="https://cdn.simpleicons.org/github/white"
                                alt="Backend Repository"
                                className="w-8 h-8 hover:scale-110 transition-transform"
                            />
                        </a>
                    </div>

                </div>
            </div>
        </footer>
    );
}

export default Footer;