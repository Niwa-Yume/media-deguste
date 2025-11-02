"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const poles = [
	{ key: "charcuterie", title: "Charcuterie", color: "#8a1e1e", image: { src: "https://cdn.pixabay.com/photo/2017/01/31/21/45/jamon-2027499_1280.jpg", alt: "Planche de charcuterie" } },
	{ key: "vin", title: "Vin", color: "#caa660", image: { src: "/image/AdobeStock_695971119.jpeg", alt: "Verres de vin" } },
	{ key: "fromage", title: "Fromage", color: "#b87333", image: { src: "https://www.gruyere.com/fileadmin/_processed_/e/0/csm_Gruyere_AOP_Preemballe_F12_cmyk_7fddce5f3c.jpg", alt: "Gruyère AOP" } },
	{ key: "gastronomie", title: "Gastronomie", color: "#1a1a18", image: { src: "https://cdn.pixabay.com/photo/2019/06/18/10/46/platting-4282016_1280.jpg", alt: "Assiette gastronomique" } },
];

export default function Cartographie() {
	return (
		<section className="relative py-24 md:py-40 px-6">
			<div className="max-w-5xl mx-auto">
				{/* Ancres cachées pour la navigation intra-page */}
				<div className="sr-only" aria-hidden>
					<a id="charcuterie" tabIndex={-1} />
					<a id="vin" tabIndex={-1} />
					<a id="fromage" tabIndex={-1} />
					<a id="gastronomie" tabIndex={-1} />
				</div>
				<h2 className="type-display text-3xl md:text-5xl mb-10 text-strong">
					Cartographie des saveurs
				</h2>
				<div
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
					role="navigation"
					aria-label="Univers sensoriels"
				>
					{poles.map((p, i) => (
						<motion.a
							key={p.key}
							href={`/#${p.key}`}
							className="group relative aspect-square rounded-2xl overflow-hidden soft-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--copper)]"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-10%" }}
							transition={{ duration: 0.6 }}
							aria-label={`${p.title} — explorer`}
						>
							{/* Image de fond si disponible */}
							{p.image && (
								<Image
									src={p.image.src}
									alt={p.image.alt}
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
									className="object-cover"
									priority={p.key === "vin"}
								/>
							)}
							{/* Dégradé d'ambiance très léger pour teinte */}
							<div
								className="absolute inset-0"
								style={{
									background: `radial-gradient(800px 400px at 60% 60%, ${p.color}22, transparent 60%), linear-gradient(180deg, rgba(0,0,0,0.00), rgba(0,0,0,0.08))`,
								}}
								aria-hidden
							/>
							{/* Hover subtil */}
							<motion.div
								className="absolute inset-0"
								initial={{ scale: 1 }}
								whileHover={{ scale: 1.03 }}
								transition={{ type: "spring", stiffness: 180, damping: 18 }}
								aria-hidden
							/>
							{/* Dégradé de bas pour la lisibilité du titre */}
							<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" aria-hidden />

							{/* Badge d'ordre */}
							<div className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-medium bg-black/35 text-white backdrop-blur-sm border border-white/15">
								{String(i + 1).padStart(2, "0")}
							</div>
							{/* Barre d'accent en bas */}
							<div className="absolute left-0 right-0 bottom-0 h-0.5 opacity-80" style={{ backgroundColor: p.color }} aria-hidden />

							{/* En-tête */}
							<div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
								<div className="transform transition-all duration-300 translate-y-0 group-hover:translate-y-[-2px]">
									<h3 className="type-display text-lg sm:text-xl md:text-2xl text-white">{p.title}</h3>
								</div>
								<div className="flex items-center gap-2">
									<motion.div
										className="w-2 h-2 rounded-full"
										style={{ backgroundColor: p.color }}
										animate={{ scale: [1, 1.15, 1] }}
										transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
										aria-hidden
									/>
									<span className="text-white/90 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
								</div>
							</div>
						</motion.a>
					))}
				</div>
			</div>
		</section>
	);
}
