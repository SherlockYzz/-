
const workshopSteps = [
    {
        id: 1,
        icon: 'fa-mountain-sun',
        title: { zh: '选料', en: 'Material Selection' },
        desc: {
            zh: '精选优质高岭土和瓷石，经过严格筛选和配比，确保原料纯净度达到官瓷标准。',
            en: 'Selecting premium kaolin and porcelain stone, rigorously screened to meet imperial standards.'
        },
        img: './images/2.jpg',
        videoUrl: null
    },
    {
        id: 2,
        icon: 'fa-hand',
        title: { zh: '揉泥', en: 'Clay Kneading' },
        desc: {
            zh: '反复揉练排除气泡，使泥料均匀致密，需经百余次手工揉制方可使用。',
            en: 'Repeated kneading to eliminate air bubbles, requiring over a hundred manual cycles.'
        },
        img: './images/7.jpg',
        videoUrl: null
    },
    {
        id: 3,
        icon: 'fa-circle',
        title: { zh: '拉坯', en: 'Wheel Throwing' },
        desc: {
            zh: '在转盘上凭手感塑造器型，一气呵成，厚薄均匀，造型端庄。',
            en: 'Shaping on the wheel by feel, achieving uniform thickness and elegant form.'
        },
        img: './images/8.jpg',
        videoUrl: null
    },
    {
        id: 4,
        icon: 'fa-pen-nib',
        title: { zh: '修坯', en: 'Trimming' },
        desc: {
            zh: '精细修整坯体表面，去除多余泥料，确保器型线条流畅优美。',
            en: 'Meticulously refining the surface for smooth, elegant lines.'
        },
        img: './images/9.jpg',
        videoUrl: null
    },
    {
        id: 5,
        icon: 'fa-sun',
        title: { zh: '施釉', en: 'Glazing' },
        desc: {
            zh: '采用独特的天青色釉料配方，多次施釉确保釉层均匀，色泽温润如玉。',
            en: 'Applying the signature celadon glaze formula, multiple coats for a jade-like finish.'
        },
        img: './images/10.jpg',
        videoUrl: null
    },
    {
        id: 6,
        icon: 'fa-fire',
        title: { zh: '素烧', en: 'Bisque Firing' },
        desc: {
            zh: '低温素烧定型坯体，温度约800°C，增强坯体强度便于施釉。',
            en: 'Low-temperature bisque firing at ~800°C to strengthen the body for glazing.'
        },
        img: './images/11.jpg',
        videoUrl: null
    },
    {
        id: 7,
        icon: 'fa-fire-flame-curved',
        title: { zh: '烧制', en: 'Final Firing' },
        desc: {
            zh: '高温还原焰烧制，温度达1280-1320°C，窑内气氛精妙控制，成就天青釉色。',
            en: 'High-temperature reduction firing at 1280-1320°C, precise atmosphere control for celadon.'
        },
        img: './images/13.jpg',
        videoUrl: null
    }
];
const historyPeriods = [
    {
        id: 'song',
        year: '960-1279',
        label: { zh: '北宋', en: 'Northern Song' },
        title: { zh: '官窑肇始', en: 'Origin of Imperial Kilns' },
        desc: {
            zh: '北宋末年，宋徽宗设官窑于汴京，以天青釉色为至高标准，开创了中国官瓷的辉煌历史。官窑瓷器"紫口铁足"，釉色温润如玉，被视为宋代美学的巅峰之作。',
            en: 'In the late Northern Song, Emperor Huizong established imperial kilns in Bianjing, setting celadon as the pinnacle standard and inaugurating China\'s glorious imperial porcelain history.'
        },
        img: './images/3.jpg'
    },
    {
        id: 'nan',
        year: '1127-1279',
        label: { zh: '南宋', en: 'Southern Song' },
        title: { zh: '南渡传承', en: 'Southern Migration Heritage' },
        desc: {
            zh: '宋室南渡后，在临安重建官窑体系。修内司和郊坛下官窑继承北宋技艺，并在釉色和造型上进一步精进，形成了独特的南宋官瓷风格。',
            en: 'After the court\'s southward migration, the imperial kiln system was rebuilt in Lin\'an, inheriting Northern Song techniques while advancing glaze and form.'
        },
        img: './images/15.jpg'
    },
    {
        id: 'yuan',
        year: '1271-1368',
        label: { zh: '元代', en: 'Yuan Dynasty' },
        title: { zh: '技艺融合', en: 'Technique Fusion' },
        desc: {
            zh: '元代统治者虽偏好白瓷和青花瓷，但官窑技艺在民间得以保存和传承，为后世复兴奠定了基础。',
            en: 'Though Yuan rulers favored white and blue-and-white porcelain, imperial kiln techniques were preserved among the people.'
        },
        img: './images/11.jpg'
    },
    {
        id: 'ming',
        year: '1368-1644',
        label: { zh: '明代', en: 'Ming Dynasty' },
        title: { zh: '复兴之路', en: 'Path of Revival' },
        desc: {
            zh: '明代景德镇官窑逐渐恢复宋代官瓷烧制传统，在继承中创新，青花、斗彩等新品种层出不穷。',
            en: 'Ming imperial kilns at Jingdezhen gradually revived Song porcelain traditions, innovating with blue-and-white and doucai techniques.'
        },
        img: './images/5.jpg'
    },
    {
        id: 'qing',
        year: '1644-1912',
        label: { zh: '清代', en: 'Qing Dynasty' },
        title: { zh: '技艺巅峰', en: 'Technical Pinnacle' },
        desc: {
            zh: '清代康雍乾三朝，官瓷烧制技术达到历史最高水平。仿宋天青釉等名品频出，工艺精益求精。',
            en: 'During the Kangxi-Yongzheng-Qianlong era, imperial porcelain reached its technical zenith with exquisite Song-style celadon reproductions.'
        },
        img: './images/8.jpg'
    },
    {
        id: 'modern',
        year: '1912-至今',
        label: { zh: '近现代', en: 'Modern Era' },
        title: { zh: '数字传承', en: 'Digital Heritage' },
        desc: {
            zh: '近现代以来，宋煌官瓷传统技艺面临失传危机。如今，通过数字化技术赋能，72道核心工序得以完整记录与活态传承。',
            en: 'Facing near-extinction, Song Huang Guan Ci techniques are now being digitally preserved and transmitted through cutting-edge technology.'
        },
        img: './images/1.jpg'
    }
];
const exhibitions = [
    {
        id: 1,
        title: { zh: '天青如梦 — 宋代官窑特展', en: 'Celadon Dreams — Song Imperial Kiln Exhibition' },
        location: { zh: '北京故宫博物院', en: 'Beijing Palace Museum' },
        date: '2026.06.01 - 2026.09.30',
        items: 128,
        img: './images/4.jpg'
    },
    {
        id: 2,
        title: { zh: '器道合一 — 宋瓷与当代设计', en: 'Unity of Vessel & Way — Song Porcelain & Contemporary Design' },
        location: { zh: '上海当代艺术博物馆', en: 'Shanghai PSA' },
        date: '2026.07.15 - 2026.10.15',
        items: 86,
        img: './images/9.jpg'
    },
    {
        id: 3,
        title: { zh: '丝路瓷韵 — 宋瓷海外巡展', en: 'Silk Road Porcelain — Song Ceramics World Tour' },
        location: { zh: '巴黎吉美博物馆', en: 'Musée Guimet, Paris' },
        date: '2026.08.01 - 2026.11.30',
        items: 64,
        img: './images/1.jpg'
    }
];
const products = [
    {
        id: 1,
        name: { zh: '天青釉梅瓶', en: 'Celadon Plum Vase' },
        price: 12800,
        tag: { zh: '经典复刻', en: 'Classic Reproduction' },
        tagColor: 'bg-tianqing-deep',
        img: './images/10.jpg',
        desc: {
            zh: '复刻北宋官窑经典器型，天青釉色温润如玉，瓶身线条优雅流畅。',
            en: 'Reproduction of Northern Song imperial kiln classic, with jade-like celadon glaze and elegant lines.'
        }
    },
    {
        id: 2,
        name: { zh: '莲花纹碗', en: 'Lotus Pattern Bowl' },
        price: 6800,
        tag: { zh: '热销', en: 'Bestseller' },
        tagColor: 'bg-tianqing',
        img: './images/11.jpg',
        desc: {
            zh: '碗内刻有精美的莲花纹饰，釉色粉青，手感温润，极具收藏价值。',
            en: 'Exquisite lotus engravings inside, with powder-blue glaze and a warm feel.'
        }
    },
    {
        id: 3,
        name: { zh: '圆颈绿瓶', en: 'Tripod Incense Censer' },
        price: 9600,
        tag: { zh: '匠心之作', en: 'Masterwork' },
        tagColor: 'bg-tianqing-deep',
        img: './images/13.jpg',
        desc: {
            zh: '仿宋代官窑造型，器型端庄古朴，可作香道雅器或案头清供。',
            en: 'Modeled after Song imperial tripod censers, suitable for incense rituals or desk display.'
        }
    },
    {
        id: 4,
        name: { zh: '天青茶盏', en: 'Celadon Tea Cup' },
        price: 3200,
        tag: { zh: '新品', en: 'New' },
        tagColor: 'bg-tianqing',
        img: './images/15.jpg',
        desc: {
            zh: '小巧精致的茶盏，天青釉面开片自然，品茗赏器两相宜。',
            en: 'Delicate tea cup with natural crackle glaze, perfect for tea appreciation.'
        }
    }
];
