"use client";

import React from 'react';
import { Heart } from 'lucide-react';
import { Service } from '@/types';
import { ServiceThumbnail } from './ServiceThumbnail';
import { THEME_COLORS } from '@/utils/constants';

interface ServiceCardProps {
    service: Service;
    isStocked: boolean;
    isFav: boolean;
    onSelect: (service: Service) => void;
    onToggleFav: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
    service, isStocked, isFav, onSelect, onToggleFav
}) => {
    return (
        <div
            className="border rounded-xl p-3 flex gap-4 hover:shadow-md transition-all bg-white relative group"
        >
            <div
                className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden relative cursor-pointer"
                onClick={() => onSelect(service)}
            >
                <ServiceThumbnail
                    src={service.image}
                    iconType={service.iconType}
                    category={service.category}
                    className="w-full h-full"
                    alt={service.title}
                />
                {isStocked && (
                    <div className="absolute top-0 left-0 bg-gray-800/70 text-white p-1 rounded-br-lg text-[10px] font-bold px-2">
                        Stock
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onSelect(service)}>
                <div className="text-xs mb-1" style={{ color: THEME_COLORS.textSub }}>
                    {service.provider || '一般サービス'}
                </div>
                <h3 className="font-bold text-sm leading-tight mb-2 truncate" style={{ color: THEME_COLORS.textMain }}>
                    {service.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">{service.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                    {service.tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
            <button
                onClick={(e) => { e.stopPropagation(); onToggleFav(service); }}
                className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
                {isFav ? (
                    <Heart size={20} className="text-red-500 fill-red-500" />
                ) : (
                    <Heart size={20} className="text-gray-300" />
                )}
            </button>
        </div>
    );
};
