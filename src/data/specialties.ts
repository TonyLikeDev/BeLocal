// Full list of 63 provinces / centrally-run cities in Vietnam and sample specialties.
export const locations = [
  'Ha Noi',
  'TP. Ho Chi Minh',
  'Hai Phong',
  'Da Nang',
  'Can Tho',
  'An Giang',
  'Ba Ria – Vung Tau',
  'Bac Giang',
  'Bac Kan',
  'Bac Lieu',
  'Bac Ninh',
  'Ben Tre',
  'Binh Dinh',
  'Binh Duong',
  'Binh Phuoc',
  'Binh Thuan',
  'Ca Mau',
  'Cao Bang',
  'Dak Lak',
  'Dak Nong',
  'Dien Bien',
  'Dong Nai',
  'Dong Thap',
  'Gia Lai',
  'Ha Giang',
  'Ha Nam',
  'Ha Tinh',
  'Hai Duong',
  'Hau Giang',
  'Hoa Binh',
  'Hung Yen',
  'Khanh Hoa',
  'Kien Giang',
  'Kon Tum',
  'Lai Chau',
  'Lam Dong',
  'Lang Son',
  'Lao Cai',
  'Long An',
  'Nam Định',
  'Nghe An',
  'Ninh Binh',
  'Ninh Thuan',
  'Phu Tho',
  'Phu Yen',
  'Quang Binh',
  'Quang Nam',
  'Quang Ngai',
  'Quang Ninh',
  'Quang Tri',
  'Soc Trang',
  'Son La',
  'Tay Ninh',
  'Thai Binh',
  'Thai Nguyen',
  'Thanh Hoa',
  'Thua Thien Hue',
  'Tien Giang',
  'Tra Vinh',
  'Tuyen Quang',
  'Vinh Long',
  'Vinh Phuc',
  'Yen Bai',
];

export const specialtiesByLocation: Record<string, Array<{ id: string; title: string; description: string; image?: string }>> = {
  'Hà Nội': [
    { id: 'pho', title: 'Phở (Beef Noodle Soup)', description: 'Classic Hanoi-style beef noodle soup with clear aromatic broth.' },
    { id: 'bun-cha', title: 'Bún Chả', description: 'Grilled pork served with rice vermicelli and herbs.' },
    { id: 'cha-ca', title: 'Chả Cá Lã Vọng', description: 'Turmeric fish served with dill and rice noodles.' },
    { id: 'bun-thang', title: 'Bún Thang', description: 'Delicate chicken and egg noodle soup.' },
  ],
  'TP. Hồ Chí Minh': [
    { id: 'com-tam', title: 'Cơm Tấm (Broken Rice)', description: 'Broken rice served with grilled pork, egg and greens.' },
    { id: 'banh-mi-sai-gon', title: 'Sài Gòn Bánh Mì', description: 'Crispy baguette with varied fillings and fresh herbs.' },
    { id: 'hu-tieu', title: 'Hủ Tiếu Nam Vang', description: 'Clear noodle soup influenced by Khmer & Chinese cuisines.' },
    { id: 'goi-cuon', title: 'Fresh Spring Rolls', description: 'Rice paper rolls with shrimp, pork and fresh herbs.' },
  ],
  'Hải Phòng': [
    { id: 'banh-da-cua', title: 'Bánh Đa Cua (Crab Noodle Soup)', description: 'Thick rice noodle soup with crab and shrimp.' },
    { id: 'nem-hai-phong', title: 'Fried Crab Spring Rolls', description: 'Crispy spring rolls filled with crab.' },
    { id: 'banh-mi-cay', title: 'Spicy Stick Bánh Mì', description: 'Spicy baguette snack popular in Hải Phòng.' },
  ],
  'Da Nang': [
    { id: 'mi-quang', title: 'Mì Quảng', description: 'Turmeric noodles with pork, shrimp, herbs and crunchy rice crackers.' },
    { id: 'banh-xeo', title: 'Bánh Xèo', description: 'Crispy savory pancake filled with pork, shrimp and bean sprouts.' },
    { id: 'banh-trang-cuon-thit-heo', title: 'Bánh Tráng Cuốn Thịt Heo', description: 'Rice paper rolls filled with boiled pork, herbs and dipping sauce.' },
    { id: 'goi-ca-nam-o', title: 'Gỏi Cá Nam Ô', description: 'Fresh fish salad from Nam Ô with local herbs and lime.' },
    { id: 'seafood', title: 'Fresh Seafood', description: 'Local seafood dishes from the coast.' },
  ],
  'Cần Thơ': [
    { id: 'lau-mam', title: 'Lẩu Mắm (Fermented Fish Hotpot)', description: 'Strong-flavored Mekong hotpot with fermented fish broth.' },
    { id: 'banh-cong', title: 'Bánh Cống (Shrimp Cake)', description: 'Deep-fried rice cake with shrimp.' },
    { id: 'ca-nuong', title: 'Grilled Snakehead Fish', description: 'Mekong river fish grilled over coal.' },
  ],
  'An Giang': [
    { id: 'chau-doc', title: 'Cháo Cá Châu Đốc', description: 'Châu Đốc fish porridge and fermented fish specialties.' },
    { id: 'palm-sugar-cake', title: 'Palm Sugar Cake', description: 'Local sweet made from palm sugar.' },
  ],
  'Bà Rịa – Vũng Tàu': [
    { id: 'banh-khot', title: 'Bánh Khọt', description: 'Mini savory pancakes topped with shrimp.' },
    { id: 'seafood-hotpot', title: 'Seafood Hotpot', description: 'Fresh seafood in a communal hotpot.' },
  ],
  'Bắc Giang': [
    { id: 'luc-ngan-lychee', title: 'Lục Ngạn Lychee', description: 'Famous lychee variety from Bắc Giang.' },
    { id: 'ke-crackers', title: 'Kẹ Rice Crackers', description: 'Local rice crackers and snacks.' },
  ],
  'Bắc Kạn': [
    { id: 'arrowroot', title: 'Arrowroot Vermicelli', description: 'Local noodle and smoked pork specialties.' },
  ],
  'Bạc Liêu': [
    { id: 'spicy-beef', title: 'Spicy Beef Noodle Soup', description: 'Local spicy beef noodle variations and mudfish hotpot.' },
  ],
  'Bắc Ninh': [
    { id: 'phu-the', title: 'Phu Thê Cake', description: 'Husband & Wife cake, a traditional sweet.' },
  ],
  'Bến Tre': [
    { id: 'coconut-candy', title: 'Coconut Candy', description: 'Coconut-based sweets and desserts.' },
  ],
  'Bình Định': [
    { id: 'jumping-shrimp', title: 'Jumping Shrimp Pancakes', description: 'Local savory pancakes and fish cake noodle soups.' },
  ],
  'Bình Dương': [
    { id: 'lai-thieu', title: 'Lai Thiêu Fermented Pork & Fruits', description: 'Famous fermented pork and fruit orchards.' },
  ],
  'Bình Phước': [
    { id: 'cashew', title: 'Cashew Nuts & Bamboo-tube Grilled Chicken', description: 'Local cashew production and grilled dishes.' },
  ],
  'Bình Thuận': [
    { id: 'dragon-fruit', title: 'Dragon Fruit & Fish Sauce', description: 'Dragon fruit farms and Phan Thiết fish sauce.' },
  ],
  'Cà Mau': [
    { id: 'ca-mau-crab', title: 'Cà Mau Crab & U Minh Hotpot', description: 'Mangrove crab specialties and fermented fish hotpots.' },
  ],
  'Cao Bằng': [
    { id: 'trung-khanh', title: 'Trung Khánh Chestnuts & Egg Rice Rolls', description: 'Mountain specialties and smoked pork.' },
  ],
  'Đắk Lắk': [
    { id: 'buon-ma-thuot-coffee', title: 'Buôn Ma Thuột Coffee', description: 'Famous highland coffee and bamboo rice dishes.' },
  ],
  'Đắk Nông': [
    { id: 'dak-nong-avocado', title: 'Avocado & Pepper', description: 'Avocado orchards, pepper and bamboo rice.' },
  ],
  'Điện Biên': [
    { id: 'dien-bien-rice', title: 'Điện Biên Sticky Rice & Smoked Buffalo', description: 'Highland sticky rice and smoked meats.' },
  ],
  'Đồng Nai': [
    { id: 'pomelo', title: 'Tan Trieu Pomelo & Pomelo Chicken', description: 'Pomelo varieties and local savory dishes.' },
  ],
  'Đồng Tháp': [
    { id: 'lotus', title: 'Lotus Dishes & Grilled Fish', description: 'Lotus-based specialties and river fish.' },
  ],
  'Gia Lai': [
    { id: 'dry-pho', title: 'Gia Lai Dry Pho & Sun-dried Beef', description: 'Highland variants and rice wine.' },
  ],
  'Hà Giang': [
    { id: 'thang-co', title: 'Thắng Cố (Horse Meat Stew)', description: 'Mountain specialties and buckwheat cakes.' },
  ],
  'Hà Nam': [
    { id: 'vu-dai', title: 'Vụ Đại Braised Fish & Rice Rolls', description: 'Local braised fish and rice roll specialties.' },
  ],
  'Hà Tĩnh': [
    { id: 'cu-do', title: 'Cù Độ Peanut Candy & Small Fish Salad', description: 'Coastal snacks and candies.' },
  ],
  'Hải Dương': [
    { id: 'green-bean', title: 'Green Bean Cake & Lychee', description: 'Confections and lychee from Thanh Hà.' },
  ],
  'Hậu Giang': [
    { id: 'featherback', title: 'Featherback Fish & Fermented Hotpot', description: 'River fish specialties and fermented fish hotpot.' },
  ],
  'Hòa Bình': [
    { id: 'bamboo-rice', title: 'Bamboo Rice & Mountain Pork', description: 'Ethnic highland dishes and rice wine.' },
  ],
  'Hưng Yên': [
    { id: 'longan', title: 'Longan & Dong Tao Chicken', description: 'Longan orchards and specialty chicken.' },
  ],
  'Khánh Hòa': [
    { id: 'nem-ninh-hoa', title: 'Nem Ninh Hòa & Fish Cake Soup', description: 'Nha Trang coastal specialties and bird’s nest products.' },
  ],
  'Kiên Giang': [
    { id: 'phu-quoc', title: 'Phú Quốc Fish Sauce & Seafood', description: 'Phú Quốc fish sauce and island seafood.' },
  ],
  'Kon Tum': [
    { id: 'kon-tum-leaf-salad', title: 'Leaf Salad & Grilled Stream Fish', description: 'Highland salads and grilled fish.' },
  ],
  'Lai Châu': [
    { id: 'ash-goby', title: 'Ash-baked Goby & Smoked Buffalo', description: 'Mountain fish and smoked meats.' },
  ],
  'Lâm Đồng': [
    { id: 'da-lat-strawberry', title: 'Đà Lạt Strawberries & Coffee', description: 'Da Lat fruits, artichoke and coffee culture.' },
  ],
  'Lạng Sơn': [
    { id: 'lang-son-duck', title: 'Roast Duck with Mac Mat Leaves', description: 'Regional roast pork and sour pho.' },
  ],
  'Lào Cai': [
    { id: 'sapa-salmon', title: 'Sapa Salmon & Thắng Cố', description: 'Highland trout and meat stews.' },
  ],
  'Long An': [
    { id: 'long-an-fermented', title: 'Fermented Fish Hotpot & Grilled Fish', description: 'Mekong delta specialties and sticky rice cakes.' },
  ],
  'Nam Định': [
    { id: 'nam-dinh-pho', title: 'Nam Định Beef Phở & Nem', description: 'Regional phở and fermented pork products.' },
  ],
  'Nghệ An': [
    { id: 'nghe-an-eel', title: 'Eel Porridge & Pickled Jackfruit', description: 'Riverside specialties and preserved fruits.' },
  ],
  'Ninh Bình': [
    { id: 'ninh-binh-goat', title: 'Mountain Goat Meat & Crispy Rice', description: 'Karst-region specialties and rice wine.' },
  ],
  'Ninh Thuận': [
    { id: 'ninh-thuan-grapes', title: 'Grapes & Bánh Căn', description: 'Dry region fruits and coastal grilled lamb.' },
  ],
  'Phú Thọ': [
    { id: 'phu-tho-tai', title: 'Tái Cake & Fermented Pork', description: 'Sticky rice wine and braised specialties.' },
  ],
  'Phú Yên': [
    { id: 'phu-yen-tuna', title: 'Tuna Eyeball Dish & O Loan Clams', description: 'Oceanic dishes and local clam specialties.' },
  ],
  'Quảng Bình': [
    { id: 'chao-canh', title: 'Cháo Canh & Nhat Le Seafood', description: 'Thick noodle soup and coastal seafood.' },
  ],
  'Quảng Nam': [
    { id: 'cao-lau-quang-nam', title: 'Cao Lầu & Mì Quảng', description: 'Hoi An and Quang Nam noodle specialties.' },
  ],
  'Quảng Ngãi': [
    { id: 'don-clam', title: 'Don Clam Soup & Peanut Brittle', description: 'River clams and sweet snacks.' },
  ],
  'Quảng Ninh': [
    { id: 'halong-squid', title: 'Hạ Long Squid Sausage & Giant Clams', description: 'Seafood products from Hạ Long Bay.' },
  ],
  'Quảng Trị': [
    { id: 'clam-vermicelli', title: 'Clam Vermicelli & Rice Porridge', description: 'Coastal vermicelli and porridge dishes.' },
  ],
  'Sóc Trăng': [
    { id: 'pia-cake', title: 'Pía Cake & Fermented Fish Noodle Soup', description: 'Southern sweet pies and fermented fish soups.' },
  ],
  'Sơn La': [
    { id: 'moc-chau', title: 'Mộc Châu Milk & Smoked Buffalo', description: 'Highland dairy and smoked specialties.' },
  ],
  'Tây Ninh': [
    { id: 'tay-ninh-chili', title: 'Chili Shrimp Salt & Dew-dried Rice Paper', description: 'Spicy condiments and local snacks.' },
  ],
  'Thái Bình': [
    { id: 'cay-cake', title: 'Cây Cake & Fish Soup', description: 'Coastal sweets and fermented fish products.' },
  ],
  'Thái Nguyên': [
    { id: 'tan-cuong-tea', title: 'Tân Cương Tea & Sticky Rice Cake', description: 'Famous tea region with rice cake specialties.' },
  ],
  'Thanh Hóa': [
    { id: 'nem-chua', title: 'Nem Chua & Shrimp Rolls', description: 'Fermented pork rolls and regional snacks.' },
  ],
  'Thừa Thiên Huế': [
    { id: 'bun-bo-hue', title: 'Bún Bò Huế & Steamed Hue Cakes', description: 'Royal cuisine and Huế noodle soups.' },
  ],
  'Tiền Giang': [
    { id: 'my-tho-hu-tieu', title: 'Mỹ Tho Hủ Tiếu & Orchard Fruits', description: 'Mekong noodle soups and fruit orchards.' },
  ],
  'Trà Vinh': [
    { id: 'tra-vinh-fermented', title: 'Fermented Fish Noodle Soup & Sticky Rice Cake', description: 'Mekong delta fermented fish and desserts.' },
  ],
  'Tuyên Quang': [
    { id: 'ham-yen', title: 'Ham Yen Oranges & Gai Cake', description: 'Mountain fruits and local cakes.' },
  ],
  'Vĩnh Long': [
    { id: 'vinh-long-sweet', title: 'Sweet Potatoes & Bánh Xèo', description: 'Mekong desserts and crispy pancakes.' },
  ],
  'Vĩnh Phúc': [
    { id: 'vinh-phuc-lap-thach', title: 'Lạp Thạch Fermented Fish & Hill Chicken', description: 'Local fermented fish and poultry dishes.' },
  ],
  'Yên Bái': [
    { id: 'yen-bai-tea', title: 'Shan Snow Tea & Five-color Sticky Rice', description: 'Highland tea and colorful sticky rice.' },
  ],
};

export default {};
