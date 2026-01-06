"use client";

import React from 'react';
import { Heart, ChevronLeft, Phone, MapPin, ShoppingCart, Globe, ExternalLink } from 'lucide-react';
import { Service } from '@/types';
import { ServiceThumbnail } from './ServiceThumbnail';
import { THEME_COLORS } from '@/utils/constants';

interface DetailModalProps {
    service: Service;
    isFav: boolean;
    onToggleFav: () => void;
    onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ service, isFav, onToggleFav, onClose }) => {
    const isGeneric = !service.provider;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
            <div className="w-full max-w-lg bg-white h-full overflow-y-auto animate-in slide-in-from-right duration-300 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 z-10 bg-black/50 text-white p-2 rounded-full shadow-lg backdrop-blur-md hover:bg-black/70 transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>

                <div className="relative h-64 bg-slate-100">
                    <ServiceThumbnail
                        src={service.image}
                        iconType={service.iconType}
                        category={service.category}
                        className="w-full h-full"
                        alt={service.title}
                    />
                    <button
                        onClick={onToggleFav}
                        className="absolute bottom-[-24px] right-6 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 border-4 border-white"
                        style={{ backgroundColor: isFav ? '#EF4444' : 'white' }}
                    >
                        <Heart size={28} className={isFav ? 'text-white fill-white' : 'text-gray-400'} />
                    </button>
                </div>

                <div className="p-6 pt-10">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span
                                className="px-2 py-1 text-xs font-bold rounded-md mb-2 inline-block"
                                style={{ backgroundColor: THEME_COLORS.background, color: THEME_COLORS.secondary }}
                            >
                                {service.category}
                            </span>
                            <h2 className="text-2xl font-bold" style={{ color: THEME_COLORS.textMain }}>{service.title}</h2>
                            {!isGeneric && <p className="text-gray-500">{service.provider}</p>}
                        </div>
                    </div>

                    <div className="prose prose-sm mb-8" style={{ color: THEME_COLORS.textSub }}>
                        <p>{service.description}</p>
                        <p className="mt-4">
                            ここに詳細なサービス内容、料金体系、利用の流れなどが記載されます。
                        </p>
                    </div>

                    <div className="space-y-4">
                        {isGeneric ? (
                            <div className="p-4 rounded-xl flex flex-col gap-3 items-center justify-center text-center bg-orange-50 border border-orange-100">
                                <p className="text-xs text-gray-500 mb-1">
                                    具体的な商品はECサイト等で比較・購入できます
                                </p>
                                <div className="grid grid-cols-1 gap-2 w-full">
                                    <a
                                        href={`https://www.amazon.co.jp/s?k=${encodeURIComponent(service.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#FF9900] text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#E68A00] transition-colors shadow-md"
                                    >
                                        <ShoppingCart size={20} />
                                        Amazonで検索
                                        <ExternalLink size={16} />
                                    </a>
                                    <a
                                        href={`https://www.google.com/search?q=${encodeURIComponent(service.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#4285F4] text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#3367D6] transition-colors shadow-md"
                                    >
                                        <Globe size={20} />
                                        Googleで検索
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="p-4 rounded-xl flex items-center justify-between" style={{ backgroundColor: THEME_COLORS.background }}>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg" style={{ color: THEME_COLORS.secondary }}>
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500">お問い合わせ</div>
                                            <div className="font-bold">03-xxxx-xxxx</div>
                                        </div>
                                    </div>
                                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold">発信</button>
                                </div>

                                <div className="p-4 rounded-xl flex items-center justify-between" style={{ backgroundColor: THEME_COLORS.background }}>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg" style={{ color: THEME_COLORS.secondary }}>
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500">公式サイト</div>
                                            <div className="font-bold">ウェブで見る</div>
                                        </div>
                                    </div>
                                    <button className="text-white px-4 py-2 rounded-lg text-sm font-bold" style={{ backgroundColor: THEME_COLORS.secondary }}>開く</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="p-6 border-t bg-gray-50 text-center">
                    <button onClick={onClose} className="text-gray-500 underline text-sm font-bold">閉じる</button>
                </div>
            </div>
        </div>
    );
};
