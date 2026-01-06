"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { Service, Need, SolutionType } from '@/types';
import { NEEDS_MASTER as MOCK_NEEDS, SERVICES_DATA as MOCK_SERVICES, SOLUTION_TYPES as MOCK_SOLUTIONS } from '@/data/mockData';

export const useAppData = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [needs, setNeeds] = useState<Record<string, Need>>({});
    const [solutions, setSolutions] = useState<Record<string, SolutionType>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
                    console.warn("Firebase Config missing using Mock Data.");
                    setServices(MOCK_SERVICES);
                    setNeeds(MOCK_NEEDS);
                    setSolutions(MOCK_SOLUTIONS);
                    setLoading(false);
                    return;
                }

                const [sSnap, nSnap, solSnap] = await Promise.all([
                    getDocs(collection(db, 'services')),
                    getDocs(collection(db, 'needs')),
                    getDocs(collection(db, 'solution_types'))
                ]);

                const servicesData = sSnap.docs.map(change => change.data() as Service);

                const needsData: Record<string, Need> = {};
                nSnap.docs.forEach(doc => {
                    needsData[doc.id] = doc.data() as Need;
                });

                const solutionsData: Record<string, SolutionType> = {};
                solSnap.docs.forEach(doc => {
                    solutionsData[doc.id] = doc.data() as SolutionType;
                });

                setServices(servicesData);
                setNeeds(needsData);
                setSolutions(solutionsData);
            } catch (err: any) {
                console.error("Error fetching data:", err);
                setError(err.message);
                setServices(MOCK_SERVICES);
                setNeeds(MOCK_NEEDS);
                setSolutions(MOCK_SOLUTIONS);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { services, needs, solutions, loading, error };
};
