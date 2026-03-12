import { AboutSection } from '@components/about-section/about-section';
import { HeroSlideshow } from '@components/hero-slideshow/hero-slideshow';
import { LocationSection } from '@components/location-section/location-section';
import { PhotoGallery } from '@components/photo-gallery/photo-gallery';
import { SignupCta } from '@components/signup-cta/signup-cta';

import css from './page.module.scss';

export default function Home() {
    return (
        <div className={css.root}>
            <HeroSlideshow />
            <AboutSection />
            <PhotoGallery />
            <LocationSection />
            <SignupCta />
        </div>
    );
}
