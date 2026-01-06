import { Need, SolutionType, Service } from '@/types';

// needs.csv より抽出
export const NEEDS_MASTER: Record<string, Need> = {
    n001: { id: 'n001', content: '周囲の人との対話の機会が少ないように思う', category: 'コミュニケーション', tag: '対話機会の不足' },
    n003: { id: 'n003', content: '離れて暮らす親の様子が心配', category: '見守り', tag: '離れて暮らす親の安否' },
    n005: { id: 'n005', content: '足腰が弱ってきて転倒しないか心配', category: '移動支援', tag: '足腰低下・転倒不安' },
    n006: { id: 'n006', content: '食事の準備が負担になっているように思う', category: '食事', tag: '食事準備の負担' },
};

export const SOLUTION_TYPES: Record<string, SolutionType> = {
    s004: { id: 's004', name: '移動支援ツール', relatedNeeds: ['n005'] },
};

export const SERVICES_DATA: Service[] = [
    {
        id: 'sv-vivi-l',
        title: 'ビビL押し歩き',
        provider: 'パナソニック',
        priority: 1000,
        description: '電動アシスト自転車。押して歩く際のアシスト機能で坂道も楽々。いつまでも自分の足で買い物へ。',
        category: '移動支援',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
        iconType: 'Bike',
        solutionIds: ['s004'],
        tags: ['電動自転車', '移動支援', 'お買い物']
    },
    {
        id: 'sv-lovot',
        title: 'LOVOT',
        provider: 'GROOVE X',
        priority: 0,
        description: '「役に立たない、でも愛される」を目指した癒やしロボット。家族の安否確認も可能です。',
        category: 'コミュニケーション',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
        iconType: 'Bot',
        solutionIds: [],
        tags: ['ロボット', '癒やし']
    },
    {
        id: 'sv-hato',
        title: 'OQTA HATO',
        provider: 'oqta',
        priority: 0,
        description: 'スマホで鳴らせる鳩時計。遠く離れた家族に「今思ってるよ」を鳩の鳴き声で伝えます。',
        category: 'コミュニケーション',
        image: 'https://images.unsplash.com/photo-1578323769772-2438cb238c96?auto=format&fit=crop&q=80&w=800',
        iconType: 'Bird',
        solutionIds: [],
        tags: ['コミュニケーション', '見守り']
    },
    {
        id: 'sv-delisofter',
        title: 'デリソフター',
        provider: 'ギフモ',
        priority: 0,
        description: '家庭料理をそのままの見た目で柔らかくできる調理家電。噛む力が弱まっても、家族と同じ食事を。',
        category: '食事',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800',
        iconType: 'Utensils',
        solutionIds: [],
        tags: ['やわらか食', '調理家電']
    },
    {
        id: 'sv-koroyawa',
        title: 'ころやわ',
        provider: 'Magic Shields',
        priority: 0,
        description: '転倒した時だけ衝撃を吸収する特殊な床材。自宅での骨折事故を未然に防ぎます。',
        category: '生活支援',
        image: 'https://images.unsplash.com/photo-1517541793740-42aa637fa7df?auto=format&fit=crop&q=80&w=800',
        iconType: 'Layers',
        solutionIds: [],
        tags: ['転倒予防', 'バリアフリー']
    },
    {
        id: 'sv-echo',
        title: 'Echo Show 8',
        provider: 'Amazon',
        priority: 0,
        description: '画面付きスマートスピーカー。ビデオ通話で顔を見ながら会話ができ、見守りにも活用できます。',
        category: '生活支援',
        image: 'https://images.unsplash.com/photo-1543512214-318c77a07298?auto=format&fit=crop&q=80&w=800',
        iconType: 'MonitorPlay',
        solutionIds: [],
        tags: ['ビデオ通話', '見守り']
    },
    {
        id: 'sv-piyocame',
        title: 'ぴよかめ',
        provider: '株式会社NSK',
        priority: 0,
        description: '可愛らしい見た目の見守りカメラ。威圧感がなく、お部屋になじみながら安否を確認できます。',
        category: '見守り',
        image: 'https://images.unsplash.com/photo-1510166089176-b57564a542b1?auto=format&fit=crop&q=80&w=800',
        iconType: 'Camera',
        solutionIds: [],
        tags: ['見守りカメラ', '防犯']
    },
    {
        id: 'sv-curara',
        title: 'curara',
        provider: 'AssistMotion',
        priority: 0,
        description: '歩行をサポートする軽量な装着型ロボット。自分の足で歩く喜びをサポートします。',
        category: '移動支援',
        image: 'https://images.unsplash.com/photo-1529422643029-d4585747aaf2?auto=format&fit=crop&q=80&w=800',
        iconType: 'Activity',
        solutionIds: [],
        tags: ['歩行補助', 'パワーアシスト']
    }
];
