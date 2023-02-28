import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <section className='pb-3'>
            <h1 className='text-center fs-6'>&copy; <a href="https://www.google.com/search?q=sebin+Dcunja" className="text-decoration-none text-muted" target="_blank" rel="noreferrer">Sebin Dcunja . All Rights Reserved</a> | {(new Date()).getFullYear()}</h1>
        </section>
    );
};

export default Footer;