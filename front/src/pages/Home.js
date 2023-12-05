import React from 'react';
import Header from '../components/Header';
import Navbar from "../components/Navbar";
import PhotoCarousel from "../components/PhotoCarousel";
import PhotographerExperience from "../components/PhotographerExperience";
import BlogList from "../components/BlogList";
import Comments from "../components/Comments";
import OrderButton from "../components/OrderButton";
import Footer from "../components/Footer"; // Подставьте правильный путь к вашему компоненту Header

function Home() {
    return (
        <div>
            <Header />
            <Navbar />
            <PhotoCarousel />
            <PhotographerExperience />
            <BlogList />
            <Comments />
            <OrderButton />
            <Footer />

        </div>
    );
}

export default Home;
