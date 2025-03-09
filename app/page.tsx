'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { apiWithClientToken } from '@/apis/clientActions';

import ModalArea from './ModalArea';

export default function Home() {
  const [valid, setValid] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleValidCheck = async () => {
      try {
        const { data } = await apiWithClientToken.get('/user');
        console.log(data.id);
        setValid(data ? true : false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setValid(false);
      }
    };
    handleValidCheck();
  }, []);

  return (
    <>
      <ModalArea />
      <div className="grid min-h-screen items-center justify-items-center">
        <div
          onClick={() => router.push(valid ? '/dashboard' : '/login')}
          className="cursor-pointer text-[15vw] transition-transform duration-300 hover:scale-125"
        >
          🍅
        </div>
      </div>
    </>
  );
}
