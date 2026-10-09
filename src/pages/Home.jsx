import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Units from '../components/Units';
import UnitTypes from '../components/UnitTypes';
import Location from '../components/Location';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Articles from '../components/Articles';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsAppFab from '../components/WhatsAppFab';
import PromoBanner from '../components/PromoBanner';
import { CONTENT } from '../data/content';

export default function Home() {
  return (
    <>
      <PromoBanner data={CONTENT.promoBanner} contact={CONTENT.contact} />
      <Navigation brand={CONTENT.brand} links={CONTENT.nav} contact={CONTENT.contact} />
      <main>
        <Hero data={CONTENT.hero} contact={CONTENT.contact} />
        <About data={CONTENT.about} />
        <Units data={CONTENT.units} />
        <UnitTypes data={CONTENT.unitTypes} />
        <Location data={CONTENT.location} />
        <Gallery data={CONTENT.gallery} />
        <Testimonials data={CONTENT.testimonials} />
        <Articles data={CONTENT.articles} />
        <Contact data={CONTENT.contactSection} contact={CONTENT.contact} />
      </main>
      <Footer data={CONTENT.footer} brand={CONTENT.brand} contact={CONTENT.contact} />
      <WhatsAppFab
        number={CONTENT.contact.whatsapp}
        message={CONTENT.contact.whatsappMessage}
        label="Chat WhatsApp"
      />
    </>
  );
}
