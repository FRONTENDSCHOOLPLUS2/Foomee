'use client';

import { AddIcon } from '@/components/icons/IconComponents';
import { getSession } from '@/data/actions/authAction';
import { fetchPosts } from '@/data/fetch/postFetch';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Meal {
  name: string;
  type: string;
  icon: string;
  width: number;
  height: number;
}

interface Food {
  foodNm: string;
  enerc: string;
  nutConSrtrQua: string;
  prot: string;
  fatce: string;
  chocdf: string;
  foodSize: string;
}

interface Total {
  enerc: number;
  prot: number;
  fatce: number;
  chocdf: number;
}

const MealCard = ({ meal }: { meal: Meal }) => {
  const { name, type, icon, width, height } = meal;
  const { data: session } = useSession();
  // TODO: total 칼로리, 탄단지 계산 필요
  const [total, setTotal] = useState<Total | null>(null);

  const getDay = (day = 0) => {
    return moment().add(day, 'days').format('YYYY.MM.DD');
  };

  // foodList 조회
  useEffect(() => {
    const fetchFoodList = async () => {
      const data = await fetchPosts(type, undefined, getDay(0));
      const foodList: Food[] | undefined = Array.isArray(
        data?.[0]?.extra?.foods,
      )
        ? data?.[0]?.extra?.foods
        : undefined;

      if (foodList) {
        // 각 영양소의 총합을 계산
        const totals = foodList.reduce(
          (acc, cur) => {
            acc.enerc += parseInt(cur.enerc);
            acc.prot += parseInt(cur.prot);
            acc.fatce += parseInt(cur.fatce);
            acc.chocdf += parseInt(cur.chocdf);
            return acc;
          },
          { enerc: 0, prot: 0, fatce: 0, chocdf: 0 },
        );

        setTotal({
          enerc: totals.enerc,
          prot: totals.prot,
          fatce: totals.fatce,
          chocdf: totals.chocdf,
        });
      }
    };
    fetchFoodList();
  }, [session]);

  const bgColorClass =
    {
      breakfast: 'bg-point-light-green',
      lunch: 'bg-point-orange',
      dinner: 'bg-point-green',
      snack: 'bg-point-pink',
    }[type] || 'bg-white';

  return (
    <div className="relative h-44">
      <Link href={`/meals/${type}/20240807`}>
        <div
          className={`${bgColorClass} rounded-[20px] px-6 py-6 flex flex-col justify-between relative w-full h-full`}
        >
          <Image src={icon} alt={name} width={width} height={height} />
          <div>
            <h3 className="font-semibold text-white">{name}</h3>
            <p className="text-white">{total?.enerc || 0} kcal</p>
          </div>
        </div>
      </Link>
      <Link href="/search" className="absolute top-6 right-6">
        <AddIcon width="36" height="36" fill="#ffffff" />
      </Link>
    </div>
  );
};

export default MealCard;
