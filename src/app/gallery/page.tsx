"use client";

import React from 'react';
import { THEME_COLORS } from '@/utils/constants';

const VARIETY_POOL = [
    '1516627145497-ae696889eb74', '1518005020250-675f04029711', '1449824913935-59a10b8d2000',
    '1505751172107-59d025b907d6', '1504674900247-0877df9cc836', '1581578731548-c64695cc6958',
    '1573197173934-6db027568571', '1556910103-1c02745a30bf', '1485827404703-89b55fcc595e',
    '1578323769772-2438cb238c96', '1517541793740-42aa637fa7df', '1543512214-318c77a07298',
    '1622383563227-0440114a090b', '1516549655169-df83a0774514', '1534214526114-02421237f04f',
    '1527515637462-cff94eecc1ac', '1584622650111-993a426fbf0a', '1557597774-9d2739f42a7a',
    '1510166089176-b57564a542b1', '1529422643029-d4585747aaf2', '1469813282276-839d4149067e',
    '1450175002312-3599cf06b99b', '1533036730030-746a5122709e', '1504439268584-b72c501e3e0e',
    '1584036561566-baf2418309a0', '1519389950473-47ba0277781c', '1522202176988-66273c2fd55f',
    '1472214103451-9374bd1c798e', '1506126613408-eca07ce68773', '1511317559916-56d926227080',
    '1438029071396-1e831a7fa6d8', '1493676303990-dd58af99452c', '1452423665511-09aaa01fc16d',
    '1491404419955-46f90352da69', '1445510861639-5651173bc5d5', '1493676343513-ef377227c8a6',
    '1441432412852-5a46279f7238', '1542317727-440995687221', '1514753750501-4439f8e4ad5d',
    '1504159506929-da238aca7b05', '1501676412087-0a152c214e13', '1520607163960-0d1203b9ad7d',
    '1611094974594-1bb04b12574e', '1444312645960-5af7ae57c9b9', '1504670073043-f63054bb3be7'
];

const KEYWORD_MAPPING = [
    { keywords: ['ロボット', 'bot', 'lovot'], id: '1485827404703-89b55fcc595e', label: 'ロボット/LOVOT' },
    { keywords: ['料理', '調理', '弁当', '食事'], id: '1556910103-1c02745a30bf', label: '食事/キッチン' },
    { keywords: ['カメラ', '見守り', 'センサー'], id: '1557597774-9d2739f42a7a', label: '見守り/防犯' },
    { keywords: ['車椅子', '移動', 'タクシー'], id: '1529422643029-d4585747aaf2', label: '移動/交通' },
    { keywords: ['自転車', 'バイク'], id: '1519389950473-47ba0277781c', label: '自転車/外遊び' },
    { keywords: ['家事', '掃除', '洗濯'], id: '1584622650111-993a426fbf0a', label: '家事/清掃' },
    { keywords: ['会話', '電話', 'スマホ'], id: '1573497019940-1c28c88b4f3e', label: 'コミュニケーション' }
];

export default function GalleryPage() {
    return (
        <div className="min-h-screen bg-white p-8">
            <h1 className="text-3xl font-bold mb-8" style={{ color: THEME_COLORS.primary }}>画像プール・ギャラリー</h1>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">キーワード優先割り当て</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {KEYWORD_MAPPING.map((item, idx) => (
                        <div key={idx} className="border rounded-lg overflow-hidden shadow-sm">
                            <img
                                src={`https://images.unsplash.com/photo-${item.id}?auto=format&fit=crop&q=80&w=400`}
                                className="w-full h-40 object-cover"
                                alt={item.label}
                            />
                            <div className="p-2 bg-gray-50">
                                <div className="text-xs font-bold text-gray-700">{item.label}</div>
                                <div className="text-[10px] text-gray-400">{item.keywords.join(', ')}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4 border-b pb-2">汎用画像プール (Random Variety)</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {VARIETY_POOL.map((id, idx) => (
                        <div key={idx} className="border rounded-lg overflow-hidden shadow-sm aspect-square">
                            <img
                                src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=300`}
                                className="w-full h-full object-cover"
                                alt={`pool-${idx}`}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
