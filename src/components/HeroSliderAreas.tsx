import { MdPlayArrow, MdPause } from 'react-icons/md';
import ServicesSection from './ServicesSection';

interface BannerItem {
    id: string;
    url: string;
    title?: string;
    subtitle?: string;
    link?: string;
    target?: string;
    buttonText?: string;
    buttonColor?: string;
}

const FIXED_SLOGAN =
    'Na Machado - Advogados Associados, transformamos desafios em conquistas jurídicas com seriedade, dedicação e inovação.';

const STATIC_SLIDES: BannerItem[] = [
    {
        id: 'static-sobre-1',
        url: '/images/bg-areas1.jpg',
        title: 'Áreas de Atuação',
    },
];

export default function HeroSliderAreas() {
    const slide = STATIC_SLIDES[0];

    return (
        <div className="relative w-full" id="inicio">
            {/* Imagem de Fundo */}
            <div className="absolute inset-0 opacity-100 z-10">
                <img
                    src={slide.url}
                    alt={slide.title || 'Banner Sobre'}
                    className="object-cover object-[center_bottom] w-full h-full"
                />
            </div>

            {/* Conteúdo */}
            <div className="relative z-20 flex flex-col justify-start pt-40">
                <div className="container flex flex-col items-start w-full mx-auto">
                    <div>
                        {slide.title && (
                            <h2 className="font-sans text-3xl md:text-5xl lg:text-5xl font-extrabold text-black/80 drop-shadow-lg mb-4 leading-tight">
                                {slide.title}
                            </h2>
                        )}
                    </div>
                </div>

                <ServicesSection />
            </div>
        </div>
    );
}
