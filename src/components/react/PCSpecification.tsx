import React from 'react';
import Item from './PCItem';

export const PCSpecification: React.FC = () => (
    <div className="main">
        <p className="header-text">My PC Specification</p>
        <div className="container">
            <Item
                imgSrc="https://m.media-amazon.com/images/I/81b75EQJrgL._AC_SL1500_.jpg"
                imgAlt="cpu image"
                title="CPU"
                desc="AMD Ryzen 5 3600"
                link="https://www.amazon.com/dp/B07STGGQ18"
                linkText="Buy on Amazon"
            />
            <Item
                imgSrc="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/4/pr_2020_4_29_14_30_1_600_11.jpg"
                imgAlt="cpu cooler image"
                title="CPU Cooler"
                desc="SilentiumPC Spartan 4 MAX"
                link="https://www.x-kom.pl/p/562914-chlodzenie-procesora-silentiumpc-spartan-4-max-120mm.html"
                linkText="See on x-kom"
            />
            <Item
                imgSrc="https://m.media-amazon.com/images/S/aplus-media/vc/baf493e7-aaf1-4a52-88f1-8ccb8344545a.__CR0,0,300,400_PT0_SX300_V1___.jpg"
                imgAlt="motherboard image"
                title="Motherboard"
                desc="ASUS Prime B450M-A II"
                link="https://www.amazon.com/dp/B08KH12V25"
                linkText="Buy on Amazon"/>
            <Item 
                imgSrc="https://m.media-amazon.com/images/I/81yBmcZTERL._AC_SL1500_.jpg"
                imgAlt="gpu image"
                title="GPU"
                desc="ASUS DUAL OC V2 Radeon RX 7600 8GB"
                link="https://www.amazon.com/dp/B0C7JP2SQ2"
                linkText="Buy on Amazon"/>
            <Item 
                imgSrc="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2017/7/pr_2017_7_21_9_20_19_508.jpg"
                imgAlt="ram image"
                title="RAM"
                desc="Corsair Vengeance LPX 16 GB (2 x 8 GB) DDR4-3200 CL16"
                link="https://www.amazon.com/dp/B0143UM4TC"
                linkText="Buy on Amazon"/>
            <Item
                imgSrc="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/10/pr_2022_10_3_8_58_52_937_00.jpg"
                imgAlt="nvme image"
                title="Storage: NVMe"
                desc="Goodram PX500 PCIe GEN 3 x4 NVMe 256GB"
                link="https://www.x-kom.pl/p/1078055-dysk-ssd-goodram-256gb-m2-pcie-nvme-px500-g2.html"
                linkText="Buy on x-kom"
            />
            <Item
                imgSrc="https://m.media-amazon.com/images/I/61yXRHMJTDL._AC_SL1500_.jpg"
                imgAlt="hdd image"
                title="Storage: HDD"
                desc="TOSHIBA MQ01ABD100 1TB 2,5"
                link="https://www.amazon.com/dp/B009AYVNMQ"
                linkText="Buy on Amazon"
            />
            <Item
                imgSrc="https://m.media-amazon.com/images/I/81WsV5yKboL._AC_SL1500_.jpg"
                imgAlt="power supply image"
                title="Power Supply"
                desc="Cooler Master MWE V2 500W 80 Plus"
                link="https://www.amazon.com/dp/B082NK1QWG"
                linkText="Buy on Amazon"
            />
            <Item
                imgSrc="https://m.media-amazon.com/images/I/81I9Ef0fOIL._AC_SL1500_.jpg"
                imgAlt="pc case image"
                title="PC Case"
                desc="Cooler Master MasterBox Q300L"
                link="https://www.amazon.com/dp/B0785GRMPG"
                linkText="See on Amazon"
            />
        </div>
    </div>
);

export default PCSpecification;