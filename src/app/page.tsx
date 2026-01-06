"use client";

import React, { useState, useEffect } from 'react';
import {
    Package, List, X, FolderPlus, RotateCcw, Info, CheckCircle, ArrowRight,
    ChevronLeft, FileText, Maximize2, Heart
} from 'lucide-react';
import { useAppData } from '@/hooks/useAppData';
import { ServiceThumbnail } from '@/components/ServiceThumbnail';
import { ServiceCard } from '@/components/ServiceCard';
import { DetailModal } from '@/components/DetailModal';
import { THEME_COLORS } from '@/utils/constants';
import { Service, Need } from '@/types';

// --- MAIN PAGE COMPONENT ---
export default function Home() {
    const { services, needs, solutions, loading } = useAppData();

    const [view, setView] = useState<'discovery' | 'break' | 'list'>('discovery');
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const [tempStock, setTempStock] = useState<Service[]>([]);
    const [favorites, setFavorites] = useState<Service[]>([]);
    const [history, setHistory] = useState<string[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [inferredNeeds, setInferredNeeds] = useState<Record<string, number>>({});
    const [shuffledServices, setShuffledServices] = useState<Service[]>([]);
    const [breakReason, setBreakReason] = useState<Need[]>([]);

    const [activeFilterNeed, setActiveFilterNeed] = useState<Need | null>(null);
    const [showStockOnly, setShowStockOnly] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    useEffect(() => {
        if (services.length > 0) {
            // Separate priority items from normal items
            const priorityItems = services.filter(s => (s.priority || 0) > 0).sort((a, b) => (b.priority || 0) - (a.priority || 0));
            const normalItems = services.filter(s => !(s.priority || 0) || s.priority <= 0);

            // Shuffle normal items
            const shuffledNormal = [...normalItems].sort(() => 0.5 - Math.random());

            // Combine: Priority first, then shuffled normal
            setShuffledServices([...priorityItems, ...shuffledNormal]);
        }
    }, [services]);

    const updateNeedsScore = (service: Service) => {
        const newScores = { ...inferredNeeds };
        if (service.solutionIds) {
            service.solutionIds.forEach(solId => {
                const solution = solutions[solId];
                if (solution && solution.relatedNeeds) {
                    solution.relatedNeeds.forEach(needId => {
                        newScores[needId] = (newScores[needId] || 0) + 1;
                    });
                }
            });
        }
        setInferredNeeds(newScores);
        return newScores;
    };

    const getTopNeeds = (scores: Record<string, number>) => {
        const sortedNeedIds = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
        let topNeeds = sortedNeedIds.slice(0, 3).map(id => needs[id]).filter(Boolean);

        // Guarantee 3 hints by padding with random needs from the last swiped service's category if necessary
        if (topNeeds.length < 3) {
            const lastService = shuffledServices[currentCardIndex];
            const allNeedsArr = Object.values(needs);
            const categoryNeeds = allNeedsArr.filter(n => n.category === lastService?.category && !topNeeds.some(tn => tn.id === n.id));
            const genericNeeds = allNeedsArr.filter(n => !topNeeds.some(tn => tn.id === n.id));

            const pool = [...categoryNeeds, ...genericNeeds];
            while (topNeeds.length < 3 && pool.length > 0) {
                const idx = Math.floor(Math.random() * pool.length);
                topNeeds.push(pool.splice(idx, 1)[0]);
            }
        }
        return topNeeds.slice(0, 3);
    };

    // Guard for loading
    if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

    const handleStock = () => {
        if (shuffledServices.length === 0) return;
        const service = shuffledServices[currentCardIndex];
        if (!service) return; // Guard

        const newStock = [...tempStock, service];
        setTempStock(newStock);
        setHistory([...history, service.id]);

        const newScores = updateNeedsScore(service);

        if (newStock.length > 0 && newStock.length % 5 === 0) {
            const topNeeds = getTopNeeds(newScores);
            setBreakReason(topNeeds);
            setView('break');
        } else {
            nextCard();
        }
    };

    const handlePass = () => {
        if (shuffledServices.length === 0) return;
        const service = shuffledServices[currentCardIndex];
        if (!service) return; // Guard

        setHistory([...history, service.id]);
        nextCard();
    };

    const nextCard = () => {
        if (currentCardIndex < shuffledServices.length - 1) {
            setCurrentCardIndex(prev => prev + 1);
        } else {
            alert('全てのカードを見終わりました。リスト画面へ移動します。');
            setView('list');
        }
    };

    const toggleFavorite = (service: Service) => {
        const isFav = favorites.some(f => f.id === service.id);
        if (isFav) {
            setFavorites(favorites.filter(f => f.id !== service.id));
        } else {
            setFavorites([...favorites, service]);
        }
    };

    const handleBreakSelectNeed = (need: Need) => {
        setActiveFilterNeed(need);
        setShowStockOnly(false);
        setActiveCategory(null);
        setView('list');
    };

    const handleBreakContinue = () => {
        setView('discovery');
        nextCard();
    };

    // --- SUB-VIEWS ---

    const DiscoveryView = () => {
        if (shuffledServices.length === 0) return <div className="p-10 text-center">Loading...</div>;
        const card = shuffledServices[currentCardIndex];
        if (!card) return <div className="p-10 text-center">No more cards.</div>;

        return (
            <div className="flex flex-col h-full" style={{ backgroundColor: THEME_COLORS.background }}>
                <header className="p-4 flex justify-between items-center shadow-sm sticky top-0 z-10" style={{ backgroundColor: THEME_COLORS.primary }}>
                    <div className="flex items-center gap-2">
                        <Package size={20} className="text-white" />
                        <div>
                            <h1 className="text-xl font-bold text-white leading-none">ケアの道具箱</h1>
                            <p className="text-[10px] text-blue-100 font-medium tracking-wider leading-none mt-0.5">disCAREvery</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setView('list')}
                        className="px-4 py-2 text-sm bg-white/20 text-white rounded-full flex items-center gap-2 hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30"
                    >
                        <List size={16} /> リストを見る
                    </button>
                </header>

                <main className="flex-1 flex flex-col p-4 pb-0 overflow-hidden relative">
                    <div className="w-full max-w-md mx-auto rounded-2xl shadow-xl overflow-hidden flex flex-col h-full mb-24 relative" style={{ backgroundColor: THEME_COLORS.cardBg }}>
                        {/* メインカード画像クリックで詳細モーダル */}
                        <div
                            className="h-1/2 relative bg-slate-50 cursor-pointer group"
                            onClick={() => setSelectedService(card)}
                        >
                            <ServiceThumbnail
                                src={card.image} iconType={card.iconType} category={card.category} alt={card.title}
                                className="w-full h-full transition-opacity group-hover:opacity-90"
                            />
                            <div className="absolute top-2 left-2 text-white text-xs px-2 py-1 rounded-full bg-slate-600/80 backdrop-blur-sm">
                                {card.category}
                            </div>
                            {/* 拡大アイコン */}
                            <div className="absolute bottom-2 right-2 bg-black/40 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <Maximize2 size={16} />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col relative bg-white">
                            <div className="p-4 pb-2 bg-white">
                                <h2 className="text-xl font-bold leading-tight" style={{ color: THEME_COLORS.secondary }}>{card.title}</h2>
                                <p className="text-sm mt-1" style={{ color: THEME_COLORS.textSub }}>
                                    {card.provider || '一般サービス'}
                                </p>
                            </div>
                            <div className="px-4 pb-4 flex-1 overflow-y-auto">
                                <p className="text-base leading-relaxed" style={{ color: THEME_COLORS.textMain }}>
                                    {card.description}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {card.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 border-t border-gray-100 grid grid-cols-2 gap-4 bg-white">
                                <button
                                    onClick={handlePass}
                                    className="flex flex-col items-center justify-center p-3 rounded-xl border-2 hover:bg-gray-50 active:scale-95 transition-all"
                                    style={{ borderColor: '#E0E0E0', color: '#9CA3AF' }}
                                >
                                    <X size={28} />
                                    <span className="text-xs font-bold mt-1">興味なし</span>
                                </button>
                                <button
                                    onClick={handleStock}
                                    className="flex flex-col items-center justify-center p-3 rounded-xl shadow-lg active:scale-95 transition-all"
                                    style={{ backgroundColor: THEME_COLORS.secondary, color: THEME_COLORS.secondaryText }}
                                >
                                    <FolderPlus size={28} />
                                    <span className="text-xs font-bold mt-1">気になる</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 下部ストックリスト */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t p-3 flex items-center gap-3 shadow-lg z-20 overflow-x-auto h-24">
                        <div className="flex-shrink-0 text-xs font-bold text-gray-500 w-12 text-center leading-tight">
                            気になる<br />リスト
                        </div>
                        {tempStock.length === 0 ? (
                            <div className="text-xs text-gray-400 italic pl-2">「気になる」ボタンで<br />ここに追加されます</div>
                        ) : (
                            tempStock.map((item, idx) => (
                                // ストック画像クリックで詳細モーダル
                                <div
                                    key={`${item.id}-${idx}`}
                                    className="flex-shrink-0 w-16 h-16 rounded-lg bg-gray-100 overflow-hidden border border-gray-300 relative shadow-sm cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => setSelectedService(item)}
                                >
                                    <ServiceThumbnail src={item.image} iconType={item.iconType} category={item.category} className="w-full h-full" alt="" />
                                    <div className="absolute bottom-0 right-0 bg-secondary w-4 h-4 rounded-tl-lg flex items-center justify-center" style={{ backgroundColor: THEME_COLORS.secondary }}>
                                        <CheckCircle size={10} className="text-white" />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </main>
            </div>
        );
    };

    const BreakView = () => {
        return (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: THEME_COLORS.background, color: THEME_COLORS.secondary }}>
                            <Info size={32} />
                        </div>
                        <h2 className="text-xl font-bold" style={{ color: THEME_COLORS.textMain }}>探索のヒント</h2>
                        <p className="mt-3 text-sm leading-relaxed" style={{ color: THEME_COLORS.textSub }}>
                            あなたの傾向に近い方は<br />
                            こんなことにお困りの傾向があるようです。
                        </p>
                    </div>
                    <div className="mb-6 space-y-3">
                        {breakReason.map((need, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleBreakSelectNeed(need)}
                                className="w-full p-4 rounded-xl border text-left flex items-start gap-3 hover:bg-gray-50 active:scale-[0.98] transition-all shadow-sm group"
                                style={{ borderColor: THEME_COLORS.border, backgroundColor: '#FAFAFA' }}
                            >
                                <CheckCircle size={20} className="flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" style={{ color: THEME_COLORS.secondary }} />
                                <div>
                                    <div className="text-xs font-bold mb-0.5 text-gray-500">関連するお悩み</div>
                                    <div className="font-bold text-sm leading-tight" style={{ color: THEME_COLORS.textMain }}>
                                        {need.content}
                                    </div>
                                    <div className="text-xs text-blue-500 mt-2 font-bold flex items-center gap-1">
                                        これに沿ったサービスを見る <ArrowRight size={12} />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                    <div>
                        <button
                            onClick={handleBreakContinue}
                            className="w-full py-3.5 font-bold rounded-xl shadow-md flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all text-white"
                            style={{ backgroundColor: THEME_COLORS.secondary }}
                        >
                            <RotateCcw size={18} />
                            もっと探索を続ける
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const ListView = () => {
        let baseList = showStockOnly ? tempStock : services;
        let displayList = baseList;

        if (activeFilterNeed) {
            displayList = displayList.filter(service => {
                return service.solutionIds.some(solId => {
                    const sol = solutions[solId];
                    return sol && sol.relatedNeeds && sol.relatedNeeds.includes(activeFilterNeed.id);
                });
            });
        }

        if (activeCategory) {
            displayList = displayList.filter(service => service.category === activeCategory);
        }

        // Get unique categories dynamically from fetched services
        const uniqueCategories = Array.from(new Set(services.map(s => s.category))).sort();
        if (!uniqueCategories.includes('その他')) uniqueCategories.push('その他');

        return (
            <div className="flex flex-col h-full bg-white">
                <header className="p-4 border-b sticky top-0 z-10 space-y-3" style={{ backgroundColor: THEME_COLORS.primary }}>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setView('discovery')}
                                className="px-3 py-2 bg-white/20 rounded-lg shadow-sm text-white hover:bg-white/30 transition-colors flex items-center gap-1 backdrop-blur-sm border border-white/30"
                            >
                                <ChevronLeft size={20} />
                                <span className="text-sm font-bold">探索に戻る</span>
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => alert('PDF出力機能')}
                                className="p-2 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm bg-white/20 text-white hover:bg-white/30"
                            >
                                <FileText size={14} /> PDF出力
                            </button>
                        </div>
                    </div>

                    {/* フィルタエリア */}
                    <div className="flex flex-wrap gap-2 pb-2">
                        <button
                            onClick={() => { setActiveFilterNeed(null); setShowStockOnly(false); setActiveCategory(null); }}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${!activeFilterNeed && !showStockOnly && !activeCategory ? 'bg-white text-gray-800 border-white' : 'bg-black/10 text-white border-white/30'}`}
                        >
                            すべて
                        </button>
                        <button
                            onClick={() => { setActiveFilterNeed(null); setShowStockOnly(true); setActiveCategory(null); }}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1 transition-colors border ${showStockOnly ? 'bg-white text-gray-800 border-white' : 'bg-black/10 text-white border-white/30'}`}
                        >
                            <FolderPlus size={14} />
                            気になる ({tempStock.length})
                        </button>

                        {activeFilterNeed && (
                            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-white text-blue-800 shadow whitespace-nowrap">
                                <CheckCircle size={14} className="text-blue-600" />
                                悩み: {activeFilterNeed.content.substring(0, 8)}...
                                <button onClick={() => setActiveFilterNeed(null)} className="ml-1 hover:text-red-500"><X size={14} /></button>
                            </div>
                        )}

                        <div className="w-px h-6 bg-white/20 mx-1 hidden sm:block"></div>

                        {uniqueCategories.map(cat => {
                            // const Icon = getServiceIcon(null, cat); // Removed explicit icon for simplicity in filter or need to import
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => { setActiveCategory(isActive ? null : cat); }}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors border ${isActive ? 'bg-white text-gray-800 border-white shadow' : 'bg-black/10 text-white border-white/30'}`}
                                >
                                    {/* <Icon size={14} /> */}
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    {displayList.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            条件に一致するサービスが見つかりませんでした。
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {displayList.map(item => {
                                const isStocked = tempStock.some(s => s.id === item.id);
                                const isFav = favorites.some(f => f.id === item.id);

                                return (
                                    <ServiceCard
                                        key={item.id}
                                        service={item}
                                        isStocked={isStocked}
                                        isFav={isFav}
                                        onSelect={setSelectedService}
                                        onToggleFav={toggleFavorite}
                                    />
                                );
                            })}
                        </div>
                    )}
                </main>
            </div>
        );
    };

    return (
        <div className="w-full h-screen overflow-hidden font-sans" style={{ color: THEME_COLORS.textMain }}>
            {view === 'discovery' && <DiscoveryView />}
            {view === 'break' && <BreakView />}
            {view === 'list' && <ListView />}

            {selectedService && (
                <DetailModal
                    service={selectedService}
                    isFav={favorites.some(f => f.id === selectedService.id)}
                    onToggleFav={() => toggleFavorite(selectedService)}
                    onClose={() => setSelectedService(null)}
                />
            )}
        </div>
    );
}
