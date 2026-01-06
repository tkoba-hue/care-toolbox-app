"use client";

import React, { useState, useEffect } from 'react';
import {
    Bot, Bird, Utensils, Layers, MonitorPlay, Sprout, Bike, Camera, Palette, Armchair,
    Footprints, Ear, Pill, MessageCircle, Eye, Bell, Activity, Shirt, Home, Smile,
    User, Coffee, Scissors, Shield, Info, ShoppingCart, MoreHorizontal, LucideIcon, Heart
} from 'lucide-react';

const getServiceIcon = (iconType: string, category: string): LucideIcon => {
    switch (iconType) {
        case 'Bot': return Bot;
        case 'Bird': return Bird;
        case 'Utensils': return Utensils;
        case 'Layers': return Layers;
        case 'MonitorPlay': return MonitorPlay;
        case 'Sprout': return Sprout;
        case 'Bike': return Bike;
        case 'Camera': return Camera;
        case 'Palette': return Palette;
        case 'Armchair': return Armchair;
        case 'Footprints': return Footprints;
        case 'Ear': return Ear;
        case 'Pill': return Pill;
        case 'Coffee': return Coffee;
        case 'Scissors': return Scissors;
        case 'Shield': return Shield;
        case 'MessageCircle': return MessageCircle;
        case 'Heart': return Heart; // Added
        case 'Home': return Home; // Added
        case 'ShoppingCart': return ShoppingCart; // Added
        default: break;
    }
    if (category && category.includes('コミュニケーション')) return MessageCircle;
    if (category && category.includes('見守り')) return Eye;
    if (category && (category.includes('緊急') || category.includes('安全'))) return Bell;
    if (category && (category.includes('身体') || category.includes('健康'))) return Activity;
    if (category && category.includes('食事')) return Utensils;
    if (category && category.includes('認知症')) return Smile;
    if (category && category.includes('衣類')) return Shirt;
    if (category && (category.includes('生活') || category.includes('住環境'))) return Home;
    if (category && category.includes('趣味')) return Smile;
    if (category && category.includes('移動')) return Bike;
    if (category && (category.includes('用品') || category.includes('買い物'))) return ShoppingCart;
    if (category && (category.includes('相談') || category.includes('手続き'))) return Info;
    if (category === 'その他') return Layers;
    return Info;
};

interface ServiceThumbnailProps {
    src: string;
    iconType: string;
    category: string;
    alt: string;
    className?: string;
}

export const ServiceThumbnail: React.FC<ServiceThumbnailProps> = ({ src, iconType, category, alt, className }) => {
    const [imageError, setImageError] = useState(false);
    useEffect(() => { setImageError(false); }, [src]);
    const IconComp = getServiceIcon(iconType, category);

    if (src && !imageError) {
        return (
            <img
                src={src}
                alt={alt}
                className={`${className} object-cover`}
                onError={() => setImageError(true)}
            />
        );
    }
    return (
        <div className={`${className} flex items-center justify-center bg-slate-100`}>
            <IconComp strokeWidth={1.5} className="w-1/2 h-1/2 text-slate-400" />
        </div>
    );
};
