const products = {
    processors: [
      { id: 'cpu1', name: 'Intel Core i9-13900K', price: 589.99, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400' },
      { id: 'cpu2', name: 'AMD Ryzen 9 7950X', price: 549.99, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400' },
      { id: 'cpu3', name: 'Intel Core i7-13700K', price: 409.99, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400' },
      { id: 'cpu4', name: 'AMD Ryzen 7 7800X3D', price: 449.99, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400' },
      { id: 'cpu5', name: 'Intel Core i5-13600K', price: 319.99, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400' },
      { id: 'cpu6', name: 'AMD Ryzen 5 7600X', price: 299.99, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400' }
    ],
    graphicsCards: [
      { id: 'gpu1', name: 'NVIDIA RTX 4090', price: 1599.99, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=400' },
      { id: 'gpu2', name: 'AMD RX 7900 XTX', price: 999.99, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=400' },
      { id: 'gpu3', name: 'NVIDIA RTX 4080', price: 1199.99, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=400' },
      { id: 'gpu4', name: 'AMD RX 7900 XT', price: 849.99, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=400' },
      { id: 'gpu5', name: 'NVIDIA RTX 4070 Ti', price: 799.99, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=400' },
      { id: 'gpu6', name: 'AMD RX 7800 XT', price: 499.99, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=400' }
    ],
    motherboards: [
      { id: 'mb1', name: 'ASUS ROG Maximus Z790', price: 599.99, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400' },
      { id: 'mb2', name: 'MSI MEG X670E ACE', price: 699.99, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400' },
      { id: 'mb3', name: 'GIGABYTE Z790 AORUS', price: 399.99, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400' },
      { id: 'mb4', name: 'ASRock X670E Taichi', price: 499.99, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400' },
      { id: 'mb5', name: 'ASUS TUF Gaming B650', price: 229.99, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400' },
      { id: 'mb6', name: 'MSI PRO B760', price: 179.99, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400' }
    ],
    memory: [
      { id: 'ram1', name: 'G.SKILL Trident Z5 RGB 32GB', price: 189.99, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=400' },
      { id: 'ram2', name: 'Corsair Dominator 64GB', price: 339.99, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=400' },
      { id: 'ram3', name: 'Crucial 32GB', price: 149.99, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=400' },
      { id: 'ram4', name: 'Kingston FURY Beast 16GB', price: 89.99, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=400' }
    ],
    storage: [
      { id: 'storage1', name: 'Samsung 990 PRO 2TB', price: 219.99, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=400' },
      { id: 'storage2', name: 'WD Black SN850X 1TB', price: 159.99, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=400' },
      { id: 'storage3', name: 'Crucial P5 Plus 2TB', price: 189.99, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=400' },
      { id: 'storage4', name: 'Seagate FireCuda 530 1TB', price: 179.99, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=400' },
      { id: 'storage5', name: 'Samsung 870 EVO 1TB', price: 99.99, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=400' },
      { id: 'storage6', name: 'WD Blue 4TB', price: 89.99, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=400' }
    ]
  };