import { Need, SolutionType, Service } from '@/types';

// needs.csv より抽出
export const NEEDS_MASTER: Record<string, Need> = {
    n001: { id: 'n001', content: '周囲の人との対話の機会が少ないように思う', category: 'コミュニケーション・メンタルケア', tag: '対話機会の不足' },
    n002: { id: 'n002', content: '家に閉じこもりがちで外出をあまりしなくなった', category: 'コミュニケーション・メンタルケア', tag: '閉じこもり・外出減少' },
    n003: { id: 'n003', content: '離れて暮らす親の様子が心配', category: '見守り・安否', tag: '離れて暮らす親の安否' },
    n004: { id: 'n004', content: '緊急時の対応に不安がある', category: '緊急対応', tag: '緊急時の対応' },
    n005: { id: 'n005', content: '足腰が弱ってきて転倒しないか心配', category: '身体機能', tag: '足腰低下・転倒不安' },
    n006: { id: 'n006', content: '食事の準備が負担になっているように思う', category: '食事', tag: '食事準備の負担' },
    n007: { id: 'n007', content: '薬の飲み忘れや飲み間違いがある', category: '健康管理', tag: '薬の飲み忘れ' },
    n008: { id: 'n008', content: '認知症の進行が心配', category: '認知症ケア', tag: '認知症の進行' },
    n032: { id: 'n032', content: '冬場の除雪などが負担', category: '生活支援', tag: '除雪の負担' },
};

// solutions.csv & solution_need_map.csv よりロジックを抽出
export const SOLUTION_TYPES: Record<string, SolutionType> = {
    s001: { id: 's001', name: '傾聴ボランティア', relatedNeeds: ['n001', 'n002', 'n011', 'n053'] },
    s002: { id: 's002', name: '見守りカメラ・センサー', relatedNeeds: ['n003', 'n004', 'n008', 'n023', 'n021'] },
    s003: { id: 's003', name: '配食サービス', relatedNeeds: ['n006', 'n003'] },
    s004: { id: 's004', name: '訪問リハビリ', relatedNeeds: ['n005', 'n038', 'n036'] },
    s005: { id: 's005', name: '服薬カレンダー・ロボット', relatedNeeds: ['n007'] },
    s006: { id: 's006', name: '転倒予防グッズ', relatedNeeds: ['n005'] },
    s007: { id: 's007', name: '福祉用具・自助具', relatedNeeds: ['n005', 'n006'] },
    s129: { id: 's129', name: '雪かきのサポート', relatedNeeds: ['n032'] },
    s131: { id: 's131', name: 'シニア向け食品・介護食', relatedNeeds: ['n006'] },
};

// 100選候補.csv / 2021SB事業商品リスト.csv / 2019シニア向け商品リスト.csv より
export const SERVICES_DATA: Service[] = [
    // --- 特定商品 ---
    {
        id: 'sv001',
        title: 'LOVOT',
        provider: 'GROOVE X',
        description: '役にたつことを捨てて愛らしさに振り切った、現時点最強のコミュニケーションロボット。日々の癒やしと、離れて暮らす家族の話題作りに。',
        category: 'コミュニケーション',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
        iconType: 'Bot',
        solutionIds: ['s001'],
        tags: ['コミュニケーション', '対話機会の不足']
    },
    {
        id: 'sv002',
        title: 'OQTA HATO',
        provider: 'oqta',
        description: 'スマホで鳴らせる鳩時計。「ただそこにいること」の価値を遠隔で伝えられる、知る限り一番ゆるい家族のコミュニケーションツール。互いの気配を感じる安心感を。',
        category: 'コミュニケーション',
        image: 'https://images.unsplash.com/photo-1578323769772-2438cb238c96?auto=format&fit=crop&q=80&w=800',
        iconType: 'Bird',
        solutionIds: ['s001', 's002'],
        tags: ['コミュニケーション', '対話機会の不足', '離れて暮らす親の安否']
    },
    {
        id: 'sv003',
        title: 'デリソフター',
        provider: 'ギフモ',
        description: 'やわらか調理家電。見た目や味を変えず料理を柔らかくできます。家族みんなで同じメニューを囲む、食卓の幸せを守ります。',
        category: '食事',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800',
        iconType: 'Utensils',
        solutionIds: ['s003', 's131'],
        tags: ['食事', '食事準備の負担']
    },
    {
        id: 'sv004',
        title: 'ころやわ',
        provider: 'Magic Shields',
        description: '転んだ時だけやわらかくなる床材。歩行時は硬さを保ち、転倒時の衝撃を吸収します。自宅での転倒骨折リスクを減らし、家族の心配も軽減。',
        category: '生活支援',
        image: 'https://images.unsplash.com/photo-1517541793740-42aa637fa7df?auto=format&fit=crop&q=80&w=800',
        iconType: 'Layers',
        solutionIds: ['s006', 's004'],
        tags: ['生活支援', '足腰低下・転倒不安']
    },
    {
        id: 'sv005',
        title: 'Echo Show 8',
        provider: 'Amazon',
        description: 'アカウント設定などは必要ですが、画面付きでビデオ通話や見守りに活用可能。顔を見て話せる安心感を、デジタルで繋ぎます。',
        category: '生活支援',
        image: 'https://images.unsplash.com/photo-1543512214-318c77a07298?auto=format&fit=crop&q=80&w=800',
        iconType: 'MonitorPlay',
        solutionIds: ['s002', 's001'],
        tags: ['生活支援', '離れて暮らす親の安否']
    },
    {
        id: 'sv006',
        title: 'シェア畑',
        provider: 'アグリメディア',
        description: '気軽に畑を借りて、畑作業。趣味としても、健康維持としても、セカンドライフのシニア向けに。土に触れる暮らしが心身の元気に繋がります。',
        category: '趣味・健康',
        image: 'https://images.unsplash.com/photo-1622383563227-0440114a090b?auto=format&fit=crop&q=80&w=800',
        iconType: 'Sprout',
        solutionIds: ['s001', 's004'],
        tags: ['趣味・健康', '対話機会の不足']
    },
    {
        id: 'sv007',
        title: 'ビビL押し歩き',
        provider: 'パナソニック',
        description: '電動アシスト自転車。サドルにまたがらなくても、押して歩く際のアシスト機能が付いています。重い荷物も坂道も楽々、いつまでも自分の足で買い物へ。',
        category: '移動支援',
        image: 'https://images.unsplash.com/photo-1529422643029-d4585747aaf2?auto=format&fit=crop&q=80&w=800',
        iconType: 'Bike',
        solutionIds: ['s004'],
        tags: ['移動支援', '足腰低下・転倒不安']
    },
    {
        id: 'sv008',
        title: 'ぴよかめ',
        provider: '株式会社NSK',
        description: '見守りカメラ。かわいらしい見た目で威圧感がなく、見守られる側の抵抗感を減らします。離れていても、そっと寄り添うような安心を。',
        category: '見守り',
        image: 'https://images.unsplash.com/photo-1510166089176-b57564a542b1?auto=format&fit=crop&q=80&w=800',
        iconType: 'Camera',
        solutionIds: ['s002'],
        tags: ['見守り', '離れて暮らす親の安否']
    },
    // ... 他のデータ（省略せず、必要に応じて追加）
];
