import React from 'react';
import Item from './PCItem';

export const PCSpecification: React.FC = () => (
    <div className="main">
        <h1 className="header">My pc specification</h1>
        <div className="container">
            <Item
                imgSrc="https://cdn.mos.cms.futurecdn.net/BekcfeBawwJ5mfZdV7ShMg.png"
                imgAlt="cpu"
                title="CPU"
                desc="AMD Ryzen 5 3600"
                link="https://www.amazon.com/dp/B07STGGQ18"
                linkText="Buy on Amazon"
            />
            <Item
                imgSrc="https://us-east-1.tixte.net/uploads/cx.tixte.co/spc272-spc-spartan-4-max-01b-removebg-preview.png"
                imgAlt="cpu cooler"
                title="CPU Cooler"
                desc="SilentiumPC Spartan 4 MAX"
                link="https://www.x-kom.pl/p/562914-chlodzenie-procesora-silentiumpc-spartan-4-max-120mm.html"
                linkText="See on x-kom"
            />
            <Item
                imgSrc="https://dlcdnimgs.asus.com/websites/global/products/afwaj0qnsbp72phf/intro-main.png"
                imgAlt="motherboard"
                title="Motherboard"
                desc="ASUS Prime B450M-A II"
                link="https://www.amazon.com/dp/B08KH12V25"
                linkText="Buy on Amazon"/>
            <Item 
                imgSrc="https://dlcdnwebimgs.asus.com/gain/0747863d-64ac-4ed8-b647-7a574d90d5a9/"
                imgAlt="gpu"
                title="GPU"
                desc="ASUS DUAL OC V2 Radeon RX 7600 8GB"
                link="https://www.amazon.com/dp/B0C7JP2SQ2"
                linkText="Buy on Amazon"/>
            <Item 
                imgSrc="https://www.safepcdirect.co.uk/media/catalog/product/cache/1/thumbnail/180x240/9df78eab33525d08d6e5fb8d27136e95/4/_/4_13.png"
                imgAlt="ram"
                title="RAM"
                desc="Corsair Vengeance LPX 16 GB (2 x 8 GB) DDR4-3200 CL16"
                link="https://www.amazon.com/dp/B0143UM4TC"
                linkText="Buy on Amazon"/>
            <Item
                imgSrc="https://us-east-1.tixte.net/uploads/cx.tixte.co/px500-1-1920x960-removebg-preview.png"
                imgAlt="nvme"
                title="Storage: NVMe"
                desc="Goodram PX500 PCIe GEN 3 x4 NVMe 256GB"
                link="https://www.x-kom.pl/p/1078055-dysk-ssd-goodram-256gb-m2-pcie-nvme-px500-g2.html"
                linkText="Buy on x-kom"
            />
            <Item
                imgSrc="https://us-east-1.tixte.net/uploads/cx.tixte.co/71xUljwiMTL-removebg-preview.png"
                imgAlt="hdd"
                title="Storage: HDD"
                desc="TOSHIBA MQ01ABD100 1TB 2,5"
                link="https://www.amazon.com/dp/B009AYVNMQ"
                linkText="Buy on Amazon"
            />
            <Item
                imgSrc="https://a.storyblok.com/f/281110/2a55d7361e/1-500w-mwe-white-230v-v2.png/m/960x0/smart"
                imgAlt="power supply"
                title="Power Supply"
                desc="Cooler Master MWE V2 500W 80 Plus"
                link="https://www.amazon.com/dp/B082NK1QWG"
                linkText="Buy on Amazon"
            />
            <Item
                imgSrc="https://a.storyblok.com/f/281110/5c1192c34c/gallery-2-min.png/m/960x0/smart"
                imgAlt="pc case"
                title="PC Case"
                desc="Cooler Master MasterBox Q300L"
                link="https://www.amazon.com/dp/B0785GRMPG"
                linkText="See on Amazon"
            />
        </div>
    </div>
);

export default PCSpecification;