import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import './Dog.scss';

// Dog Products Data
const DogProducts = [
  {
    id: 1,
    name: "Purina Pro Plan Sensitive Skin & Stomach Adult Dry Dog Food",
    sizes: "4 sizes",
    reviews: 2693,
    price: 89.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5339575?$sclp-prd-main_large$"
  },
  {
    id: 2,
    name: "Hill's® Science Diet® Sensitive Stomach & Skin Adult Dry Dog Food",
    sizes: "4 sizes",
    reviews: 768,
    price: 83.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5154856?$sclp-prd-main_large$"
  },
  {
    id: 3,
    name: "Blue Buffalo® Life Protection Formula™ Adult Dry Dog Food - Chicken",
    sizes: "5 sizes",
    reviews: 937,
    price: 64.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5066968?$sclp-prd-main_large$"
  },
  {
    id: 4,
    name: "Royal Canin Size Health Nutrition Small Breed Adult Dry Dog Food",
    sizes: "2 sizes",
    reviews: 760,
    price: 59.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5173207?$sclp-prd-main_large$"
  },
  {
    id: 5,
    name: "KONG Classic Dog Toy",
    sizes: "6 sizes",
    reviews: 1245,
    price: 14.99,
    image: "https://headsupfortails.com/cdn/shop/products/T4_KONG_Classic_XS-20200602180514-20200602180538-1000x1000.jpg?v=1663043787&width=1445"
  },
  {
    id: 6,
    name: "Greenies Original Regular Size Dog Dental Treats",
    sizes: "4 sizes",
    reviews: 1824,
    price: 42.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5290104?$sclp-prd-main_large$"
  },
  {
    id: 7,
    name: "Nylabone Power Chew Durable Dog Chew Toy",
    sizes: "3 sizes",
    reviews: 982,
    price: 11.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5298786?$sclp-prd-main_large$"
  },
  {
    id: 8,
    name: "PetSafe Easy Walk Dog Harness",
    sizes: "8 sizes",
    reviews: 2156,
    price: 29.99,
    image: "https://s7d2.scene7.com/is/image/PetSmart/5291701?$sclp-prd-main_large$"
  }
];

// Electronics Products Data (These are general electronics, not pet-specific)
const ElectronicsProducts = [
  {
    id: 101,
    name: "Ultra HD 55\" Smart TV with HDR",
    sizes: "4 sizes",
    reviews: 1256,
    price: 499.99,
    image: "https://www.electrical-deals.co.uk/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/U/E/UE49MU6220KXXU-right_1.jpg"
  },
  // Electronics Products (continued)
  {
    id: 102,
    name: "Premium Wireless Noise-Cancelling Headphones",
    sizes: "1 size",
    reviews: 948,
    price: 249.99,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6029/6029012cv11d.jpg"
  },
  {
    id: 103,
    name: "Professional Gaming Laptop 15.6\" 165Hz",
    sizes: "3 configurations",
    reviews: 763,
    price: 1299.99,
    image: "https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/mg/gm/3pp/asr/9d3ed4e9-1977-4a55-8881-512d4deca85d.087f1febb0aca167689f9681881dfafc.jpeg?odnHeight=2000&odnWidth=2000&odnBg=ffffff"
  },
  {
    id: 104,
    name: "Smart Home Security System with 4 Cameras",
    sizes: "2 packages",
    reviews: 1048,
    price: 359.99,
    image: "https://m.media-amazon.com/images/I/61gjV71YDEL._SL1500_.jpg"
  },
  {
    id: 105,
    name: "Wireless Charging Pad for Smartphones",
    sizes: "1 size",
    reviews: 872,
    price: 39.99,
    image: "https://i5.walmartimages.com/asr/d493dbcf-87a9-49d6-a3d9-ce24b976e839.decbcde8849150199b8f1e0d47787236.jpeg"
  },
  {
    id: 106,
    name: "Smart Watch with Fitness Tracking",
    sizes: "2 sizes",
    reviews: 694,
    price: 179.99,
    image: "https://m.media-amazon.com/images/I/71JU-bUt-sL._AC_SL1500_.jpg"
  }
];

// Clothing Products Data (General clothing, not pet-specific)
const ClothingProducts = [
  {
    id: 201,
    name: "Premium Cotton T-Shirt",
    sizes: "5 sizes",
    reviews: 642,
    price: 24.99,
    image: "https://gildan.my/wp-content/uploads/2020/03/76000-24C-Gold.png"
  },
  {
    id: 202,
    name: "Classic Slim Fit Jeans",
    sizes: "8 sizes",
    reviews: 487,
    price: 59.99,
    image: "https://www.squareformen.com/wp-content/uploads/2023/10/outfit151-2701315-5.jpg"
  },
  {
    id: 203,
    name: "Waterproof Jacket with Hood",
    sizes: "4 sizes",
    reviews: 523,
    price: 89.99,
    image: "https://cdn.ecommercedns.uk/files/9/243879/7/13545127/grey-regatta.jpg"
  },
  {
    id: 204,
    name: "Running Shoes with Flex Support",
    sizes: "7 sizes",
    reviews: 862,
    price: 119.99,
    image: "https://s.catch.com.au/images/product/0067/67223/633bb90f386a5332027563.jpg"
  },
  {
    id: 205,
    name: "Casual Dress Shirt",
    sizes: "6 sizes",
    reviews: 378,
    price: 44.99,
    image: "https://d3d71ba2asa5oz.cloudfront.net/12031895/images/q04a17t02-2.jpg"
  },
  {
    id: 206,
    name: "Winter Knit Beanie",
    sizes: "2 sizes",
    reviews: 492,
    price: 19.99,
    image: "https://i.etsystatic.com/15035761/r/il/a547c9/2823421170/il_1588xN.2823421170_clm5.jpg"
  }
];

// Dog Deals Data
const DogDeals = [
  {
    id: 1,
    title: "Toy deals",
    label: "Toy deals",
    background: "#e31837",
    link: "/dog/toy-deals",
    dealItems: [
      {
        id: 501,
        name: "KONG Wobbler Treat Dispensing Dog Toy",
        originalPrice: 19.99,
        salePrice: 14.99,
        savings: "25% OFF",
        reviews: 876,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5290734?$sclp-prd-main_large$"
      },
      {
        id: 502,
        name: "Nylabone Dura Chew Textured Dog Chew",
        originalPrice: 13.99,
        salePrice: 9.99,
        savings: "29% OFF",
        reviews: 632,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5298743?$sclp-prd-main_large$"
      },
      {
        id: 503,
        name: "Outward Hound Hide-A-Squirrel Plush Dog Toy",
        originalPrice: 24.99,
        salePrice: 17.99,
        savings: "28% OFF",
        reviews: 945,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5297349?$sclp-prd-main_large$"
      }
    ]
  },
  {
    id: 2,
    title: "Food deals",
    label: "Food deals",
    background: "#e31837",
    link: "/dog/food-deals",
    dealItems: [
      {
        id: 504,
        name: "Blue Buffalo Life Protection Formula Dog Food",
        originalPrice: 59.99,
        salePrice: 49.99,
        savings: "17% OFF",
        reviews: 1243,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5066968?$sclp-prd-main_large$"
      },
      {
        id: 505,
        name: "Purina ONE SmartBlend Dry Dog Food",
        originalPrice: 42.99,
        salePrice: 34.99,
        savings: "19% OFF",
        reviews: 932,
        image: "https://i5.walmartimages.com/asr/70fe3fe7-bc88-4c77-9b28-f88344e09770_1.64b3b82016f40d0b3d08c04aeeed74da.jpeg"
      },
      {
        id: 506,
        name: "Hill's Science Diet Adult Dry Dog Food",
        originalPrice: 74.99,
        salePrice: 59.99,
        savings: "20% OFF",
        reviews: 864,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5154856?$sclp-prd-main_large$"
      }
    ]
  },
  {
    id: 3,
    title: "Treat deals",
    label: "Treat deals",
    background: "#e31837",
    link: "/dog/treat-deals",
    dealItems: [
      {
        id: 507,
        name: "Milk-Bone Original Dog Biscuits",
        originalPrice: 14.99,
        salePrice: 10.99,
        savings: "27% OFF",
        reviews: 753,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5290356?$sclp-prd-main_large$"
      },
      {
        id: 508,
        name: "Greenies Regular Dental Dog Treats",
        originalPrice: 39.99,
        salePrice: 32.99,
        savings: "18% OFF",
        reviews: 1076,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5290104?$sclp-prd-main_large$"
      },
      {
        id: 509,
        name: "Blue Buffalo Blue Bits Training Dog Treats",
        originalPrice: 9.99,
        salePrice: 7.49,
        savings: "25% OFF",
        reviews: 584,
        image: "https://www.bing.com/images/search?view=detailV2&ccid=aTR8eDgf&id=FE0817335DCD4011C1914AA7715B8122A92EF36E&thid=OIP.aTR8eDgfEm-bd8OmLaAM3wHaHa&mediaurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.69347c78381f126f9b77c3a62da00cdf%3Frik%3DbvMuqSKBW3GnSg%26riu%3Dhttp%253a%252f%252fs7d1.scene7.com%252fis%252fimage%252fPETCO%252f2286137-center-1%26ehk%3DRvYyzbFvEKYhIKffGhCsxSCwms8MPW5LJibEJoMcseo%253d%26risl%3D%26pid%3DImgRaw%26r%3D0&exph=2000&expw=2000&q=blue+buffalo+dog+food&simid=608010668273463123&FORM=IRPRST&ck=B967695934DA4CA5CC5B0409F8A4CBA5&selectedIndex=2&itb=0&cw=1145&ch=535&mode=overlay"
      }
    ]
  },
  {
    id: 4,
    title: "Cleaning\nsupplies",
    label: "Cleaning supplies deals",
    background: "#e31837",
    link: "/dog/cleaning-deals",
    dealItems: [
      {
        id: 510,
        name: "Nature's Miracle Stain & Odor Remover",
        originalPrice: 19.99,
        salePrice: 14.99,
        savings: "25% OFF",
        reviews: 867,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5292381?$sclp-prd-main_large$"
      },
      {
        id: 511,
        name: "Bissell Pet Stain Eraser Portable Carpet Cleaner",
        originalPrice: 89.99,
        salePrice: 69.99,
        savings: "22% OFF",
        reviews: 743,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5302765?$sclp-prd-main_large$"
      },
      {
        id: 512,
        name: "Arm & Hammer Pet Fresh Carpet Odor Eliminator",
        originalPrice: 11.99,
        salePrice: 8.99,
        savings: "25% OFF",
        reviews: 592,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5301234?$sclp-prd-main_large$"
      }
    ]
  },
  {
    id: 5,
    title: "Crate &\ncarrier",
    label: "Crate & carrier deals",
    background: "#e31837",
    link: "/dog/crate-carrier-deals",
    dealItems: [
      {
        id: 513,
        name: "Petmate Two Door Top Load Pet Kennel",
        originalPrice: 49.99,
        salePrice: 39.99,
        savings: "20% OFF",
        reviews: 654,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5291321?$sclp-prd-main_large$"
      },
      {
        id: 514,
        name: "MidWest iCrate Folding Metal Dog Crate",
        originalPrice: 89.99,
        salePrice: 69.99,
        savings: "22% OFF",
        reviews: 872,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5142987?$sclp-prd-main_large$"
      },
      {
        id: 515,
        name: "Sherpa Original Deluxe Pet Carrier",
        originalPrice: 59.99,
        salePrice: 44.99,
        savings: "25% OFF",
        reviews: 743,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5293421?$sclp-prd-main_large$"
      }
    ]
  },
  {
    id: 6,
    title: "Food\ntopper",
    label: "Food topper deals",
    background: "#e31837",
    link: "/dog/food-topper-deals",
    dealItems: [
      {
        id: 516,
        name: "The Honest Kitchen Proper Toppers",
        originalPrice: 16.99,
        salePrice: 12.99,
        savings: "24% OFF",
        reviews: 523,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5301987?$sclp-prd-main_large$"
      },
      {
        id: 517,
        name: "Stella & Chewy's Meal Mixers Freeze-Dried Raw Dog Food Topper",
        originalPrice: 24.99,
        salePrice: 19.99,
        savings: "20% OFF",
        reviews: 678,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5302876?$sclp-prd-main_large$"
      },
      {
        id: 518,
        name: "Blue Buffalo Wilderness Wild Cuts Dog Food Topper",
        originalPrice: 19.99,
        salePrice: 15.99,
        savings: "20% OFF",
        reviews: 432,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5304329?$sclp-prd-main_large$"
      }
    ]
  }
];
// Electronics Deals Data
const ElectronicsDeals = [
  {
    id: 101,
    title: "Smart\nTVs",
    label: "Smart TVs",
    background: "#0078d7",
    link: "/electronics/smart-tvs",
    dealItems: [
      {
        id: 601,
        name: "Samsung 65\" 4K Ultra HD Smart TV",
        originalPrice: 899.99,
        salePrice: 699.99,
        savings: "22% OFF",
        reviews: 1243,
        image: "https://i5.walmartimages.com/seo/SAMSUNG-65-Class-4K-UHD-2160p-LED-Smart-TV-with-HDR-UN65NU6900_ebde9124-1364-4bfb-860d-216e1cb49147_2.b2074f85d2eed9347bcedc169444b11e.jpeg"
      },
      {
        id: 602,
        name: "LG 55\" OLED 4K Smart TV",
        originalPrice: 1299.99,
        salePrice: 999.99,
        savings: "23% OFF",
        reviews: 876,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5298754?$sclp-prd-main_large$"
      },
      {
        id: 603,
        name: "Sony 50\" LED 4K HDR TV",
        originalPrice: 749.99,
        salePrice: 599.99,
        savings: "20% OFF",
        reviews: 765,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5297654?$sclp-prd-main_large$"
      }
    ]
  },

    // Electronics Deals Data (continued)
  {
    id: 102,
    title: "Audio\nDevices",
    label: "Audio Devices",
    background: "#0078d7",
    link: "/electronics/audio-devices",
    dealItems: [
      {
        id: 604,
        name: "Bose QuietComfort Wireless Headphones",
        originalPrice: 349.99,
        salePrice: 279.99,
        savings: "20% OFF",
        reviews: 932,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5168097?$sclp-prd-main_large$"
      },
      {
        id: 605,
        name: "Sony WH-1000XM4 Noise Cancelling Headphones",
        originalPrice: 329.99,
        salePrice: 249.99,
        savings: "24% OFF",
        reviews: 843,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5169876?$sclp-prd-main_large$"
      },
      {
        id: 606,
        name: "JBL Charge 5 Portable Bluetooth Speaker",
        originalPrice: 179.99,
        salePrice: 139.99,
        savings: "22% OFF",
        reviews: 654,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5167543?$sclp-prd-main_large$"
      }
    ]
  },
  {
    id: 103,
    title: "Smart\nPhones",
    label: "Smart Phones",
    background: "#0078d7",
    link: "/electronics/smart-phones",
    dealItems: [
      {
        id: 607,
        name: "Samsung Galaxy S22 Ultra 256GB",
        originalPrice: 1199.99,
        salePrice: 999.99,
        savings: "17% OFF",
        reviews: 1654,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5304054?$sclp-prd-main_large$"
      },
      {
        id: 608,
        name: "Google Pixel 7 Pro 128GB",
        originalPrice: 899.99,
        salePrice: 749.99,
        savings: "17% OFF",
        reviews: 987,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5305234?$sclp-prd-main_large$"
      },
      {
        id: 609,
        name: "Apple iPhone 14 Pro 128GB",
        originalPrice: 999.99,
        salePrice: 899.99,
        savings: "10% OFF",
        reviews: 2143,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5306732?$sclp-prd-main_large$"
      }
    ]
  },
  {
    id: 104,
    title: "Laptops &\nComputers",
    label: "Laptops & Computers",
    background: "#0078d7",
    link: "/electronics/laptops-computers",
    dealItems: [
      {
        id: 610,
        name: "Dell XPS 15 Laptop (i7, 16GB, 512GB SSD)",
        originalPrice: 1799.99,
        salePrice: 1499.99,
        savings: "17% OFF",
        reviews: 865,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5316742?$sclp-prd-main_large$"
      },
      {
        id: 611,
        name: "Apple MacBook Pro 14\" M1 Pro Chip",
        originalPrice: 1999.99,
        salePrice: 1699.99,
        savings: "15% OFF",
        reviews: 1243,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5317543?$sclp-prd-main_large$"
      },
      {
        id: 612,
        name: "HP Spectre x360 Convertible Laptop",
        originalPrice: 1399.99,
        salePrice: 1149.99,
        savings: "18% OFF",
        reviews: 732,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5318432?$sclp-prd-main_large$"
      }
    ]
  },
  {
    id: 105,
    title: "Smart\nWearables",
    label: "Smart Wearables",
    background: "#0078d7",
    link: "/electronics/smart-wearables",
    dealItems: [
      {
        id: 613,
        name: "Apple Watch Series 8 GPS + Cellular",
        originalPrice: 499.99,
        salePrice: 429.99,
        savings: "14% OFF",
        reviews: 976,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5299821?$sclp-prd-main_large$"
      },
      {
        id: 614,
        name: "Samsung Galaxy Watch 5 Pro",
        originalPrice: 449.99,
        salePrice: 379.99,
        savings: "16% OFF",
        reviews: 765,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5298765?$sclp-prd-main_large$"
      },
      {
        id: 615,
        name: "Fitbit Versa 4 Fitness Smartwatch",
        originalPrice: 249.99,
        salePrice: 199.99,
        savings: "20% OFF",
        reviews: 876,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5297654?$sclp-prd-main_large$"
      }
    ]
  },
  {
    id: 106,
    title: "Gaming\nConsoles",
    label: "Gaming Consoles",
    background: "#0078d7",
    link: "/electronics/gaming-consoles",
    dealItems: [
      {
        id: 616,
        name: "PlayStation 5 Digital Edition",
        originalPrice: 399.99,
        salePrice: 379.99,
        savings: "5% OFF",
        reviews: 1543,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5142363?$sclp-prd-main_large$"
      },
      {
        id: 617,
        name: "Xbox Series X 1TB Console",
        originalPrice: 499.99,
        salePrice: 469.99,
        savings: "6% OFF",
        reviews: 1232,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5143657?$sclp-prd-main_large$"
      },
      {
        id: 618,
        name: "Nintendo Switch OLED Model",
        originalPrice: 349.99,
        salePrice: 319.99,
        savings: "9% OFF",
        reviews: 987,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5144976?$sclp-prd-main_large$"
      }
    ]
  }
];

// Clothing Deals Data
const ClothingDeals = [
  {
    id: 201,
    title: "Summer\nCollection",
    label: "Summer Collection",
    background: "#00a651",
    link: "/clothing/summer-collection",
    dealItems: [
      {
        id: 701,
        name: "Men's Premium Cotton T-Shirt Pack",
        originalPrice: 39.99,
        salePrice: 29.99,
        savings: "25% OFF",
        reviews: 876,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5303542?$sclp-prd-main_large$"
      },
      {
        id: 702,
        name: "Women's Sleeveless Summer Dress",
        originalPrice: 49.99,
        salePrice: 34.99,
        savings: "30% OFF",
        reviews: 654,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5302543?$sclp-prd-main_large$"
      },
      {
        id: 703,
        name: "Unisex Lightweight Linen Shorts",
        originalPrice: 34.99,
        salePrice: 24.99,
        savings: "29% OFF",
        reviews: 543,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5301654?$sclp-prd-main_large$"
      }
    ]
  },
  {
    id: 202,
    title: "Denim\nCollection",
    label: "Denim Collection",
    background: "#00a651",
    link: "/clothing/denim-collection",
    dealItems: [
      {
        id: 704,
        name: "Men's Slim Fit Stretch Jeans",
        originalPrice: 69.99,
        salePrice: 49.99,
        savings: "29% OFF",
        reviews: 765,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5331246?$sclp-prd-main_large$"
      },
      {
        id: 705,
        name: "Women's High-Waisted Skinny Jeans",
        originalPrice: 59.99,
        salePrice: 44.99,
        savings: "25% OFF",
        reviews: 876,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5330876?$sclp-prd-main_large$"
      },
      {
        id: 706,
        name: "Unisex Denim Jacket with Pockets",
        originalPrice: 79.99,
        salePrice: 59.99,
        savings: "25% OFF",
        reviews: 654,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5329865?$sclp-prd-main_large$"
      }
    ]
  },
  {
    id: 203,
    title: "Outerwear",
    label: "Outerwear",
    background: "#00a651",
    link: "/clothing/outerwear",
    dealItems: [
      {
        id: 707,
        name: "Waterproof Rain Jacket with Hood",
        originalPrice: 99.99,
        salePrice: 74.99,
        savings: "25% OFF",
        reviews: 876,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5319654?$sclp-prd-main_large$"
      },
      {
        id: 708,
        name: "Insulated Winter Parka with Fur Hood",
        originalPrice: 149.99,
        salePrice: 119.99,
        savings: "20% OFF",
        reviews: 765,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5318743?$sclp-prd-main_large$"
      },
      {
        id: 709,
        name: "Windbreaker Jacket with Reflective Details",
        originalPrice: 69.99,
        salePrice: 49.99,
        savings: "29% OFF",
        reviews: 543,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5317832?$sclp-prd-main_large$"
      }
    ]
  },
  {
    id: 204,
    title: "Athletic\nShoes",
    label: "Athletic Shoes",
    background: "#00a651",
    link: "/clothing/athletic-shoes",
    dealItems: [
      {
        id: 710,
        name: "Men's Running Shoes with Cushioning",
        originalPrice: 129.99,
        salePrice: 99.99,
        savings: "23% OFF",
        reviews: 987,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5315786?$sclp-prd-main_large$"
      },
      {
        id: 711,
        name: "Women's Cross-Training Shoes",
        originalPrice: 119.99,
        salePrice: 89.99,
        savings: "25% OFF",
        reviews: 765,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5314987?$sclp-prd-main_large$"
      },
      {
        id: 712,
        name: "Unisex Weightlifting Shoes",
        originalPrice: 149.99,
        salePrice: 119.99,
        savings: "20% OFF",
        reviews: 654,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5313876?$sclp-prd-main_large$"
      }
    ]
  },
  {
    id: 205,
    title: "Accessories",
    label: "Accessories",
    background: "#00a651",
    link: "/clothing/accessories",
    dealItems: [
      {
        id: 713,
        name: "Premium Leather Wallet",
        originalPrice: 49.99,
        salePrice: 34.99,
        savings: "30% OFF",
        reviews: 765,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5327985?$sclp-prd-main_large$"
      },
      {
        id: 714,
        name: "Designer Sunglasses with UV Protection",
        originalPrice: 89.99,
        salePrice: 64.99,
        savings: "28% OFF",
        reviews: 543,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5326876?$sclp-prd-main_large$"
      },
      {
        id: 715,
        name: "Canvas Backpack with Laptop Compartment",
        originalPrice: 59.99,
        salePrice: 44.99,
        savings: "25% OFF",
        reviews: 654,
        image: "https://s7d2.scene7.com/is/image/PetSmart/5325765?$sclp-prd-main_large$"
      }
    ]
  },
  {
    id: 206,
    title: "Winter\nEssentials",
    label: "Winter Essentials",
    background: "#00a651",
    link: "/clothing/winter-essentials",
    dealItems: [
        {
          id: 716,
          name: "Winter Knit Beanie with Fleece Lining",
          originalPrice: 24.99,
          salePrice: 17.99,
          savings: "28% OFF",
          reviews: 876,
          image: "https://s7d2.scene7.com/is/image/PetSmart/5329876?$sclp-prd-main_large$"
        },
        {
          id: 717,
          name: "Wool Blend Scarf with Fringe",
          originalPrice: 34.99,
          salePrice: 24.99,
          savings: "29% OFF",
          reviews: 654,
          image: "https://s7d2.scene7.com/is/image/PetSmart/5328987?$sclp-prd-main_large$"
        },
        {
          id: 718,
          name: "Touchscreen Compatible Winter Gloves",
          originalPrice: 29.99,
          salePrice: 21.99,
          savings: "27% OFF",
          reviews: 543,
          image: "https://s7d2.scene7.com/is/image/PetSmart/5327645?$sclp-prd-main_large$"
        }
      ]
    }
  ];
  
  const Dog: React.FC = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [activeDeals, setActiveDeals] = useState<{ category: string, items: any[] | null }>({
      category: '',
      items: null
    });
  
    const handleProductClick = (product: any, category: string) => {
      navigate(`/product/${product.id}`, { 
        state: { 
          product,
          category: category
        } 
      });
    };
  
    const handleDealClick = (deal: any, category: string) => {
      // Instead of navigating, show the modal with deals
      setActiveDeals({
        category: deal.label,
        items: deal.dealItems
      });
    };
  
    const closeDealsModal = () => {
      setActiveDeals({
        category: '',
        items: null
      });
    };
  
    const handleAddToCart = (product: any, e: React.MouseEvent) => {
      e.stopPropagation();
      addToCart(product);
      // Optional: Show a toast or notification that item was added
    };
  
    // Render the deals modal if activeDeals.items exists
    const renderDealsModal = () => {
      if (!activeDeals.items) return null;
      
      return (
        <div className="deals-modal" onClick={closeDealsModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeDealsModal}>×</button>
            <h2>{activeDeals.category}</h2>
            <div className="deal-items-grid">
              {activeDeals.items.map((item) => (
                <div 
                  key={item.id} 
                  className="deal-item"
                  onClick={() => handleProductClick(item, 'deal')}
                >
                  <div className="deal-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="deal-item-info">
                    <h4>{item.name}</h4>
                    <div className="deal-price">
                      <span className="original-price">${item.originalPrice}</span>
                      <span className="sale-price">${item.salePrice}</span>
                    </div>
                    <div className="deal-savings">{item.savings}</div>
                    <div className="deal-reviews">{item.reviews} Reviews</div>
                    <div className="deal-cta">
                      <button 
                        className="add-to-cart"
                        onClick={(e) => handleAddToCart(item, e)}
                      >
                        Add to Cart
                      </button>
                      <button 
                        className="view-details"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(item, 'deal');
                        }}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };
  
    return (
      <div className="dog-page">
        <h1>Shop by Category</h1>
  
        {/* Dog Deals Section */}
        <div className="deals-section">
          <div className="deals-header">
            <h2>Dog Products & Supplies</h2>
            <a href="#" className="shop-all">Shop all</a>
          </div>
          <div className="deals-grid">
            {DogDeals.map((deal) => (
              <div 
                key={deal.id} 
                className="deal-card" 
                onClick={() => handleDealClick(deal, 'dog')}
              >
                <div className="deal-circle">
                  <span className="deal-text">{deal.title}</span>
                </div>
                <span className="deal-label">{deal.label}</span>
              </div>
            ))}
          </div>
        </div>
  
        {/* Dog Products Section */}
        <div className="products-section">
          <div className="section-header">
            <h2>Popular Dog Products</h2>
            <a href="#" className="shop-all">View all</a>
          </div>
          <div className="products-grid">
            {DogProducts.map((product) => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => handleProductClick(product, 'dog')}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-meta">
                    <span className="sizes">{product.sizes}</span>
                    <span className="reviews">{product.reviews} Reviews</span>
                  </div>
                  <div className="price">${product.price}</div>
                  <button 
                    className="view-details"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product, 'dog');
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Dog Hero Banner */}
        <div className="hero-banner">
          <img 
            src="https://s7d2.scene7.com/is/image/PetSmart/WEB-2679600-Jan25_dPCS_CONs_DT" 
            alt="Dog Food Promotion"
          />
          <div className="promo-content">
            <h1>Dog Shop</h1>
            <h2>Food, treats, supplies, toys & more</h2>
            <div className="offer-banner">
              <h3>$10 back in savings</h3>
              <p>EARN 5,000 pts ($10 back in savings) when you spend $60+ on all dog food PER DAY thru 3/2*</p>
              <button className="activate-btn">Activate</button>
            </div>
          </div>
        </div>
  
        {/* Electronics Deals Section */}
        <div className="deals-section electronics-deals">
          <div className="deals-header">
            <h2>Electronics Deals</h2>
            <a href="#" className="shop-all">Shop all</a>
          </div>
          <div className="deals-grid">
            {ElectronicsDeals.map((deal) => (
              <div 
                key={deal.id} 
                className="deal-card" 
                onClick={() => handleDealClick(deal, 'electronics')}
              >
                <div className="deal-circle electronics-circle">
                  <span className="deal-text">{deal.title}</span>
                </div>
                <span className="deal-label">{deal.label}</span>
              </div>
            ))}
          </div>
        </div>
  
        {/* Electronics Products Section */}
        <div className="products-section electronics-section">
          <div className="section-header">
            <h2>Featured Electronics</h2>
            <a href="#" className="shop-all">View all</a>
          </div>
          <div className="products-grid">
            {ElectronicsProducts.map((product) => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => handleProductClick(product, 'electronics')}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-meta">
                    <span className="sizes">{product.sizes}</span>
                    <span className="reviews">{product.reviews} Reviews</span>
                  </div>
                  <div className="price">${product.price}</div>
                  <button 
                    className="view-details"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product, 'electronics');
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Electronics Hero Banner */}
        <div className="hero-banner electronics-banner">
          <img 
            src="https://s7d2.scene7.com/is/image/PetSmart/WEB-2679605-Jan25_dPCS_ELEC_DT" 
            alt="Electronics Promotion"
          />
          <div className="promo-content">
            <h1>Electronics Shop</h1>
            <h2>TVs, Smartphones, Laptops & more</h2>
            <div className="offer-banner">
              <h3>20% off select electronics</h3>
              <p>Save on TVs, headphones, smartphones and more when you shop online thru 3/15*</p>
              <button className="activate-btn">Shop Now</button>
            </div>
          </div>
        </div>
  
        {/* Clothing Deals Section */}
        <div className="deals-section clothing-deals">
          <div className="deals-header">
            <h2>Clothing & Apparel</h2>
            <a href="#" className="shop-all">Shop all</a>
          </div>
          <div className="deals-grid">
            {ClothingDeals.map((deal) => (
              <div 
                key={deal.id} 
                className="deal-card" 
                onClick={() => handleDealClick(deal, 'clothing')}
              >
                <div className="deal-circle clothing-circle">
                  <span className="deal-text">{deal.title}</span>
                </div>
                <span className="deal-label">{deal.label}</span>
              </div>
            ))}
          </div>
        </div>
  
        {/* Clothing Products Section */}
        <div className="products-section clothing-section">
          <div className="section-header">
            <h2>Trending Fashion</h2>
            <a href="#" className="shop-all">View all</a>
          </div>
          <div className="products-grid">
            {ClothingProducts.map((product) => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => handleProductClick(product, 'clothing')}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-meta">
                    <span className="sizes">{product.sizes}</span>
                    <span className="reviews">{product.reviews} Reviews</span>
                  </div>
                  <div className="price">${product.price}</div>
                  <button 
                    className="view-details"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product, 'clothing');
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Clothing Hero Banner */}
        <div className="hero-banner clothing-banner">
          <img 
            src="https://s7d2.scene7.com/is/image/PetSmart/WEB-2679610-Jan25_dPCS_CLOTH_DT" 
            alt="Clothing Promotion"
          />
          <div className="promo-content">
            <h1>Fashion Shop</h1>
            <h2>Stylish apparel for every occasion</h2>
            <div className="offer-banner">
              <h3>Buy 2, Get 1 Free</h3>
              <p>Mix & match clothing, accessories, and footwear. Lowest priced item is free!</p>
              <button className="activate-btn">Shop Collection</button>
            </div>
          </div>
        </div>
  
        {/* Special Offer Section */}
        <div className="special-offers-section">
          <h2>Limited Time Offers</h2>
          <div className="offers-grid">
            <div className="offer-card">
              <div className="offer-badge">SAVE 30%</div>
              <h3>New Customer Special</h3>
              <p>First-time customers save 30% on their first order of $50 or more</p>
              <button className="offer-btn">Get Code</button>
            </div>
            <div className="offer-card">
              <div className="offer-badge">FREE SHIPPING</div>
              <h3>Orders $49+</h3>
              <p>Enjoy free standard shipping on all orders over $49</p>
              <button className="offer-btn">Shop Now</button>
            </div>
            <div className="offer-card">
              <div className="offer-badge">BUNDLE & SAVE</div>
              <h3>Complete Your Collection</h3>
              <p>Save 25% when you purchase any three items from our featured collections</p>
              <button className="offer-btn">View Bundles</button>
            </div>
          </div>
        </div>
  
        {/* Featured Brands Section */}
        <div className="featured-brands">
          <h2>Featured Brands</h2>
          <div className="brands-slider">
            <div className="brand">
              <img src="https://logos-world.net/wp-content/uploads/2024/01/Purina-Logo.png" alt="Purina" />
            </div>
            <div className="brand">
              <img src="https://cdn.1min30.com/wp-content/uploads/2018/11/Royal-Canin.jpg" alt="Royal Canin" />
            </div>
            <div className="brand">
              <img src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png" alt="Hill's Science Diet" />
            </div>
            <div className="brand">
              <img src="https://wallpaperaccess.com/full/7614837.jpg" alt="Blue Buffalo" />
            </div>
            <div className="brand">
              <img src="https://logowik.com/content/uploads/images/peter-england4491.logowik.com.webp" alt="KONG" />
            </div>
            <div className="brand">
            <img src="https://mma.prnewswire.com/media/1227507/Linen_Club_Logo.jpg?p=facebook" alt="PetSafe" />
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="newsletter-signup">
        <div className="newsletter-content">
          <h2>Get exclusive deals</h2>
          <p>Sign up for our newsletter to receive special offers, shopping tips, and new product alerts!</p>
          <div className="signup-form">
            <input type="email" placeholder="Enter your email address" />
            <button className="signup-btn">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="recently-viewed">
        <h2>Recently Viewed</h2>
        <div className="recently-viewed-products">
          <div className="product-thumbnail">
            <img src="https://s7d2.scene7.com/is/image/PetSmart/5339575?$sclp-prd-main_small$" alt="Recently viewed product" />
          </div>
          <div className="product-thumbnail">
            <img src="https://s7d2.scene7.com/is/image/PetSmart/5173207?$sclp-prd-main_small$" alt="Recently viewed product" />
          </div>
          <div className="product-thumbnail">
            <img src="https://s7d2.scene7.com/is/image/PetSmart/5304054?$sclp-prd-main_small$" alt="Recently viewed product" />
          </div>
          <div className="product-thumbnail">
            <img src="https://s7d2.scene7.com/is/image/PetSmart/5303542?$sclp-prd-main_small$" alt="Recently viewed product" />
          </div>
        </div>
      </div>

      {/* Deals Modal */}
      {renderDealsModal()}
    </div>
  );
};

export default Dog;